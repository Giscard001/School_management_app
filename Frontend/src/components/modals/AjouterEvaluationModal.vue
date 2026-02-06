<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" @click.self="close">
    <div class="bg-white dark:bg-slate-900 rounded-xl shadow-2xl max-w-md w-full mx-4 border border-slate-200 dark:border-slate-800">
      <!-- Header -->
      <div class="px-6 py-4 border-b border-slate-200 dark:border-slate-800">
        <div class="flex justify-between items-center">
          <h3 class="text-xl font-bold text-[#0e141b] dark:text-white">Ajouter une Évaluation</h3>
          <button @click="close" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
      </div>

      <!-- Body -->
      <div class="p-6 space-y-4">
        <!-- Nom de l'évaluation -->
        <div>
          <label class="block text-sm font-medium text-[#0e141b] dark:text-white mb-2">
            Nom de l'évaluation <span class="text-red-500">*</span>
          </label>
          <input 
            v-model="form.nom" 
            type="text" 
            placeholder="Ex: Interro Chapitre 3, DS Novembre..."
            class="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-[#0e141b] dark:text-white focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <!-- Mode de saisie -->
        <div>
          <label class="block text-sm font-medium text-[#0e141b] dark:text-white mb-3">
            Mode de saisie <span class="text-red-500">*</span>
          </label>
          <div class="space-y-2">
            <label class="flex items-center gap-3 p-3 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <input 
                type="radio" 
                v-model="form.mode" 
                value="manual" 
                class="text-primary focus:ring-primary"
              />
              <div>
                <p class="font-medium text-[#0e141b] dark:text-white">Saisie manuelle</p>
                <p class="text-xs text-[#4e7397]">Entrer les notes élève par élève</p>
              </div>
            </label>
            <label class="flex items-center gap-3 p-3 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <input 
                type="radio" 
                v-model="form.mode" 
                value="excel" 
                class="text-primary focus:ring-primary"
              />
              <div>
                <p class="font-medium text-[#0e141b] dark:text-white">Import Excel</p>
                <p class="text-xs text-[#4e7397]">Importer depuis un fichier .xlsx</p>
              </div>
            </label>
          </div>
        </div>

        <!-- Upload Excel (si mode Excel) -->
        <div v-if="form.mode === 'excel'" class="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p class="text-sm text-blue-700 dark:text-blue-300 mb-3">
            <span class="font-bold">📋 Format attendu :</span>
          </p>
          <div class="text-xs text-blue-600 dark:text-blue-400 mb-3 font-mono bg-white dark:bg-slate-800 p-2 rounded">
            | Matricule | Note |<br/>
            | 2024-001  | 15   |<br/>
            | 2024-002  | 18.5 |
          </div>
          <input 
            type="file" 
            @change="handleFileUpload" 
            accept=".xlsx,.xls"
            class="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90"
          />
          <p v-if="form.file" class="text-xs text-green-600 dark:text-green-400 mt-2">
            ✓ Fichier sélectionné : {{ form.file.name }}
          </p>
        </div>

        <!-- Message d'erreur -->
        <div v-if="error" class="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p class="text-sm text-red-600 dark:text-red-400">{{ error }}</p>
        </div>
      </div>

      <!-- Footer -->
      <div class="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3">
        <button 
          @click="close" 
          class="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-[#0e141b] dark:text-white rounded-lg font-medium hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
        >
          Annuler
        </button>
        <button 
          @click="submit" 
          :disabled="!canSubmit || isLoading"
          class="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <span v-if="isLoading" class="material-symbols-outlined animate-spin">progress_activity</span>
          <span>{{ isLoading ? 'Création...' : 'Créer' }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import api from '@/services/api';

const props = defineProps({
  show: Boolean,
  matiere: String,
  classe: String,
  periode: String
});

const emit = defineEmits(['close', 'created']);

const form = ref({
  nom: '',
  mode: 'manual',
  file: null
});

const error = ref('');
const isLoading = ref(false);

const canSubmit = computed(() => {
  if (!form.value.nom) return false;
  if (form.value.mode === 'excel' && !form.value.file) return false;
  return true;
});

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    form.value.file = file;
  }
};

const close = () => {
  form.value = { nom: '', mode: 'manual', file: null };
  error.value = '';
  emit('close');
};

const submit = async () => {
  error.value = '';
  isLoading.value = true;

  try {
    // Créer la colonne
    const columnData = {
      nom: form.value.nom,
      matiere: props.matiere,
      classe: props.classe,
      periode: props.periode
    };

    const res = await api.createNoteColumn(columnData);
    const column = res.data.data;

    // Si mode Excel, importer les notes
    if (form.value.mode === 'excel' && form.value.file) {
      const formData = new FormData();
      formData.append('file', form.value.file);

      try {
        await api.importNoteColumnExcel(column._id, formData);
      } catch (importError) {
        console.error('Erreur import:', importError);
        error.value = 'Colonne créée mais erreur lors de l\'import Excel';
      }
    }

    emit('created', column);
    close();
  } catch (err) {
    console.error('Erreur création évaluation:', err);
    error.value = err.response?.data?.error || 'Erreur lors de la création de l\'évaluation';
  } finally {
    isLoading.value = false;
  }
};

// Reset form when modal opens
watch(() => props.show, (newVal) => {
  if (newVal) {
    form.value = { nom: '', mode: 'manual', file: null };
    error.value = '';
  }
});
</script>
