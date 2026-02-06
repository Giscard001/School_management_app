<template>
  <div class="min-h-screen bg-background-light dark:bg-background-dark p-8">
    <div class="max-w-[1600px] mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-black text-[#0e141b] dark:text-white mb-2">Saisie des Notes</h1>
        <p class="text-[#4e7397] dark:text-slate-400">Gérez les évaluations et notes de vos élèves</p>
      </div>

      <!-- Filtres -->
      <div class="bg-white dark:bg-slate-900 rounded-xl p-6 mb-6 shadow-sm border border-slate-200 dark:border-slate-800">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-[#0e141b] dark:text-white mb-2">Classe</label>
            <select v-model="selectedClasse" @change="onClasseChange" class="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-[#0e141b] dark:text-white">
              <option value="">Sélectionner une classe</option>
              <option v-for="classe in classes" :key="classe._id" :value="classe._id">
                {{ classe.niveau }} {{ classe.section }}
              </option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-[#0e141b] dark:text-white mb-2">Matière</label>
            <select v-model="selectedMatiere" @change="onMatiereChange" :disabled="!selectedClasse" class="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-[#0e141b] dark:text-white disabled:opacity-50">
              <option value="">Sélectionner une matière</option>
              <option v-for="matiere in matieres" :key="matiere._id" :value="matiere._id">
                {{ matiere.nom }}
              </option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-[#0e141b] dark:text-white mb-2">Période</label>
            <select v-model="selectedPeriode" @change="loadData" :disabled="!selectedMatiere" class="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-[#0e141b] dark:text-white disabled:opacity-50">
              <option value="">Sélectionner une période</option>
              <option v-for="periode in periodes" :key="periode" :value="periode">{{ periode }}</option>
            </select>
          </div>
          <div class="flex items-end">
            <button 
              @click="showAddEvalModal = true" 
              :disabled="!selectedClasse || !selectedMatiere || !selectedPeriode"
              class="w-full px-4 py-2 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <span class="material-symbols-outlined">add</span>
              Ajouter Évaluation
            </button>
          </div>
        </div>
      </div>

      <!-- Tableau des notes -->
      <div v-if="selectedClasse && selectedMatiere && selectedPeriode" class="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div class="p-6 border-b border-slate-200 dark:border-slate-800">
          <div class="flex justify-between items-center">
            <div>
              <h2 class="text-xl font-bold text-[#0e141b] dark:text-white">Notes des élèves</h2>
              <p class="text-sm text-[#4e7397] mt-1">{{ eleves.length }} élève(s) - {{ evaluations.length }} évaluation(s)</p>
            </div>
            <button 
              @click="saveAllNotes" 
              :disabled="isSaving"
              class="px-6 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              <span class="material-symbols-outlined">save</span>
              {{ isSaving ? 'Enregistrement...' : 'Enregistrer tout' }}
            </button>
          </div>
        </div>

        <div v-if="isLoading" class="p-8 text-center">
          <p class="text-[#4e7397]">Chargement...</p>
        </div>

        <div v-else-if="eleves.length === 0" class="p-8 text-center">
          <span class="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-700 mb-4">school</span>
          <p class="text-[#4e7397]">Aucun élève dans cette classe</p>
        </div>

        <div v-else class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-slate-50 dark:bg-slate-800/50 sticky top-0">
              <tr>
                <th class="px-4 py-3 text-left text-sm font-bold text-[#0e141b] dark:text-white sticky left-0 bg-slate-50 dark:bg-slate-800/50 z-10">
                  Élève
                </th>
                <th 
                  v-for="eval in evaluations" 
                  :key="eval._id" 
                  class="px-4 py-3 text-center text-sm font-bold text-[#0e141b] dark:text-white min-w-[120px]"
                >
                  <div class="flex items-center justify-center gap-2">
                    <span>{{ eval.nom }}</span>
                    <button 
                      @click="deleteEvaluation(eval._id)" 
                      class="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                      title="Supprimer cette évaluation"
                    >
                      <span class="material-symbols-outlined text-sm">close</span>
                    </button>
                  </div>
                </th>
                <th class="px-4 py-3 text-center text-sm font-bold text-primary min-w-[100px]">
                  Moyenne
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
              <tr v-for="eleve in eleves" :key="eleve._id" class="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                <td class="px-4 py-3 text-sm font-medium text-[#0e141b] dark:text-white sticky left-0 bg-white dark:bg-slate-900">
                  <div>
                    <p>{{ eleve.prenom }} {{ eleve.nom }}</p>
                    <p class="text-xs text-[#4e7397]">{{ eleve.matricule }}</p>
                  </div>
                </td>
                <td 
                  v-for="eval in evaluations" 
                  :key="eval._id" 
                  class="px-4 py-3 text-center"
                >
                  <input 
                    v-model.number="notesData[eleve._id][eval.nom]" 
                    type="number" 
                    min="0" 
                    max="20" 
                    step="0.5"
                    class="w-20 px-2 py-1 text-center rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-[#0e141b] dark:text-white focus:ring-2 focus:ring-primary/20"
                    placeholder="-"
                  />
                </td>
                <td class="px-4 py-3 text-center">
                  <span class="text-lg font-bold text-primary">{{ calculateMoyenne(eleve._id) }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Message si aucune évaluation -->
        <div v-if="!isLoading && evaluations.length === 0" class="p-8 text-center border-t border-slate-200 dark:border-slate-800">
          <span class="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-700 mb-4">assignment</span>
          <p class="text-[#4e7397] mb-4">Aucune évaluation créée pour cette période</p>
          <button 
            @click="showAddEvalModal = true"
            class="px-6 py-2 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
          >
            <span class="material-symbols-outlined">add</span>
            Créer votre première évaluation
          </button>
        </div>
      </div>

      <!-- Message initial -->
      <div v-else class="bg-white dark:bg-slate-900 rounded-xl p-12 text-center border border-slate-200 dark:border-slate-800">
        <span class="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-700 mb-4">edit_note</span>
        <p class="text-[#4e7397] text-lg">Sélectionnez une classe, une matière et une période pour commencer</p>
      </div>
    </div>

    <!-- Modal Ajouter Évaluation -->
    <AjouterEvaluationModal 
      :show="showAddEvalModal"
      :matiere="selectedMatiere"
      :classe="selectedClasse"
      :periode="selectedPeriode"
      @close="showAddEvalModal = false"
      @created="onEvaluationCreated"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import api from '@/services/api';
import AjouterEvaluationModal from '@/components/modals/AjouterEvaluationModal.vue';

const classes = ref([]);
const matieres = ref([]);
const eleves = ref([]);
const evaluations = ref([]);
const periodes = ref([]);
const notesData = ref({});

const selectedClasse = ref('');
const selectedMatiere = ref('');
const selectedPeriode = ref('');

const isLoading = ref(false);
const isSaving = ref(false);
const showAddEvalModal = ref(false);

const loadClasses = async () => {
  try {
    const res = await api.getClasses();
    if (res.data.success) {
      classes.value = res.data.data;
    }
  } catch (error) {
    console.error('Erreur chargement classes:', error);
  }
};

const loadMatieres = async () => {
  try {
    const res = await api.getMatieres();
    if (res.data.success) {
      matieres.value = res.data.data;
    }
  } catch (error) {
    console.error('Erreur chargement matières:', error);
  }
};

const onClasseChange = () => {
  selectedMatiere.value = '';
  selectedPeriode.value = '';
  eleves.value = [];
  evaluations.value = [];
  
  if (!selectedClasse.value) return;
  
  const classe = classes.value.find(c => c._id === selectedClasse.value);
  if (classe) {
    periodes.value = classe.filiere === 'Générale'
      ? ['Trimestre 1', 'Trimestre 2', 'Trimestre 3']
      : ['Semestre 1', 'Semestre 2'];
  }
};

const onMatiereChange = () => {
  selectedPeriode.value = '';
  eleves.value = [];
  evaluations.value = [];
};

const loadData = async () => {
  if (!selectedClasse.value || !selectedMatiere.value || !selectedPeriode.value) return;

  isLoading.value = true;

  try {
    // Charger les élèves
    const elevesRes = await api.getUsers({ 
      classe: selectedClasse.value, 
      role: 'ELEVE' 
    });
    if (elevesRes.data.success) {
      eleves.value = elevesRes.data.data;
    }

    // Charger les évaluations (colonnes)
    const evalsRes = await api.getNoteColumns({
      classe: selectedClasse.value,
      matiere: selectedMatiere.value,
      periode: selectedPeriode.value
    });
    if (evalsRes.data.success) {
      evaluations.value = evalsRes.data.data;
    }

    // Charger les notes existantes
    const notesRes = await api.getNotes({
      classe: selectedClasse.value,
      matiere: selectedMatiere.value,
      periode: selectedPeriode.value
    });

    // Initialiser notesData
    const tempNotesData = {};
    eleves.value.forEach(eleve => {
      tempNotesData[eleve._id] = {};
      evaluations.value.forEach(eval => {
        tempNotesData[eleve._id][eval.nom] = null;
      });
    });

    // Remplir avec les notes existantes
    if (notesRes.data.success) {
      notesRes.data.data.forEach(noteDoc => {
        if (tempNotesData[noteDoc.eleve._id]) {
          noteDoc.notes.forEach(note => {
            tempNotesData[noteDoc.eleve._id][note.type] = note.valeur;
          });
        }
      });
    }

    notesData.value = tempNotesData;

  } catch (error) {
    console.error('Erreur chargement données:', error);
  } finally {
    isLoading.value = false;
  }
};

const calculateMoyenne = (eleveId) => {
  const notes = notesData.value[eleveId];
  if (!notes) return '-';

  const validNotes = Object.values(notes).filter(n => n !== null && n !== '');
  if (validNotes.length === 0) return '-';

  const sum = validNotes.reduce((acc, n) => acc + parseFloat(n), 0);
  return (sum / validNotes.length).toFixed(2);
};

const saveAllNotes = async () => {
  isSaving.value = true;

  try {
    for (const eleve of eleves.value) {
      const elevesNotes = notesData.value[eleve._id];
      const notesArray = [];

      // Construire le tableau de notes
      evaluations.value.forEach(eval => {
        const noteValue = elevesNotes[eval.nom];
        if (noteValue !== null && noteValue !== '') {
          notesArray.push({
            valeur: parseFloat(noteValue),
            type: eval.nom,
            coefficient: 1
          });
        }
      });

      if (notesArray.length === 0) continue;

      // Vérifier si une note existe déjà
      const existingNotesRes = await api.getNotes({
        eleve: eleve._id,
        matiere: selectedMatiere.value,
        periode: selectedPeriode.value
      });

      if (existingNotesRes.data.data.length > 0) {
        // Mettre à jour
        const noteId = existingNotesRes.data.data[0]._id;
        await api.updateNote(noteId, { notes: notesArray });
      } else {
        // Créer
        await api.createNotes({
          eleve: eleve._id,
          matiere: selectedMatiere.value,
          classe: selectedClasse.value,
          periode: selectedPeriode.value,
          notes: notesArray
        });
      }
    }

    alert('Notes enregistrées avec succès !');
  } catch (error) {
    console.error('Erreur sauvegarde notes:', error);
    alert('Erreur lors de l\'enregistrement des notes');
  } finally {
    isSaving.value = false;
  }
};

const deleteEvaluation = async (evalId) => {
  if (!confirm('Supprimer cette évaluation ? Toutes les notes associées seront supprimées.')) {
    return;
  }

  try {
    await api.deleteNoteColumn(evalId);
    alert('Évaluation supprimée avec succès !');
    loadData();
  } catch (error) {
    console.error('Erreur suppression évaluation:', error);
    alert('Erreur lors de la suppression de l\'évaluation');
  }
};

const onEvaluationCreated = () => {
  loadData();
};

onMounted(() => {
  loadClasses();
  loadMatieres();

  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);
});
</script>
