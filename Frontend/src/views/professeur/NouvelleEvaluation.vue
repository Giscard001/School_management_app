<template>
  <div class="flex-1 flex flex-col overflow-y-auto bg-background-light dark:bg-background-dark">
    <!-- Modal Overlay -->
    <div class="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/40 backdrop-blur-md">
      <div class="bg-white dark:bg-slate-900 w-full max-w-xl mx-4 rounded-2xl shadow-2xl border border-[#d0dbe7] dark:border-slate-800 overflow-hidden flex flex-col">
        <div class="px-8 py-6 border-b border-[#d0dbe7] dark:border-slate-800 flex justify-between items-center">
          <div>
            <h2 class="text-2xl font-bold text-[#0e141b] dark:text-white">Nouvelle Évaluation</h2>
            <p class="text-sm text-[#4e7397] mt-1">Planifiez une nouvelle session d'évaluation pour vos élèves.</p>
          </div>
          <button @click="closeModal" class="text-[#4e7397] hover:bg-[#f6f7f8] dark:hover:bg-slate-800 p-2 rounded-lg transition-colors">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
        <form @submit.prevent="submitEvaluation" class="p-8 space-y-6 overflow-y-auto max-h-[70vh]">
          <div class="space-y-2">
            <label class="text-sm font-semibold text-[#0e141b] dark:text-slate-200" for="eval-title">Titre de l'évaluation</label>
            <input v-model="evaluation.title" id="eval-title" type="text" class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-[#d0dbe7] dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="Ex: DS n°3 - Calcul littéral"/>
          </div>
          
          <div class="space-y-2">
            <label class="text-sm font-semibold text-[#0e141b] dark:text-slate-200" for="eval-type">Type</label>
            <select v-model="evaluation.type" id="eval-type" class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-[#d0dbe7] dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary">
              <option value="Devoir">Devoir</option>
              <option value="Examen">Examen</option>
              <option value="TP">TP</option>
              <option value="Projet">Projet</option>
            </select>
          </div>

          <div class="space-y-2">
            <label class="text-sm font-semibold text-[#0e141b] dark:text-slate-200" for="eval-class">Classe</label>
            <select v-model="evaluation.classeId" @change="updateMatieres" id="eval-class" class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-[#d0dbe7] dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary">
              <option disabled value="">Sélectionner une classe</option>
              <option v-for="c in availableClasses" :key="c.id" :value="c.id">{{ c.nom }}</option>
            </select>
          </div>

          <div class="space-y-2">
            <label class="text-sm font-semibold text-[#0e141b] dark:text-slate-200" for="eval-matiere">Matière</label>
            <select v-model="evaluation.matiereId" id="eval-matiere" class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-[#d0dbe7] dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary" :disabled="!evaluation.classeId">
              <option disabled value="">Sélectionner une matière</option>
              <option v-for="m in availableMatieres" :key="m.id" :value="m.id">{{ m.nom }}</option>
            </select>
          </div>

          <div class="grid grid-cols-3 gap-4">
             <div class="space-y-2 col-span-1">
                <label class="text-sm font-semibold text-[#0e141b] dark:text-slate-200" for="eval-date">Date</label>
                <input v-model="evaluation.date" id="eval-date" type="date" class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-[#d0dbe7] dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"/>
             </div>
             <div class="space-y-2 col-span-1">
                <label class="text-sm font-semibold text-[#0e141b] dark:text-slate-200" for="eval-start">Heure Début</label>
                <input v-model="evaluation.heureDebut" id="eval-start" type="time" class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-[#d0dbe7] dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"/>
             </div>
             <div class="space-y-2 col-span-1">
                <label class="text-sm font-semibold text-[#0e141b] dark:text-slate-200" for="eval-end">Heure Fin</label>
                <input v-model="evaluation.heureFin" id="eval-end" type="time" class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-[#d0dbe7] dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"/>
             </div>
          </div>

          <div class="space-y-2">
            <label class="text-sm font-semibold text-[#0e141b] dark:text-slate-200" for="eval-description">Description (optionnel)</label>
            <textarea v-model="evaluation.description" id="eval-description" rows="4" class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-[#d0dbe7] dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="Précisez les chapitres concernés, les instructions particulières..."></textarea>
          </div>

          <div class="flex items-center gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
            <span class="material-symbols-outlined text-amber-600">info</span>
            <p class="text-sm text-amber-800 dark:text-amber-200">
              L'évaluation sera automatiquement ajoutée à l'emploi du temps des élèves concernés.
            </p>
          </div>

          <div class="flex gap-3 pt-4">
            <button type="button" @click="closeModal" class="flex-1 px-6 py-3 bg-slate-100 dark:bg-slate-800 text-[#0e141b] dark:text-slate-200 font-semibold rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
              Annuler
            </button>
            <button type="submit" class="flex-1 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
              Créer l'évaluation
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'

const router = useRouter()

const evaluation = ref({
  title: '',
  type: 'Devoir',
  classeId: '',
  matiereId: '',
  date: '',
  heureDebut: '08:00',
  heureFin: '10:00',
  description: '',
  duration: 60 // Optional/Legacy
})

const myClasses = ref([])

onMounted(async () => {
    try {
        const res = await api.getProfessorClasses();
        myClasses.value = res.data.data;
    } catch (err) {
        console.error(err);
    }
})

const availableClasses = computed(() => {
    const unique = new Map();
    myClasses.value.forEach(item => {
        if(!unique.has(item.classe._id)) {
            unique.set(item.classe._id, { id: item.classe._id, nom: `${item.classe.niveau} ${item.classe.section}`});
        }
    });
    return Array.from(unique.values());
});

const availableMatieres = computed(() => {
    if(!evaluation.value.classeId) return [];
    return myClasses.value
        .filter(item => item.classe._id === evaluation.value.classeId)
        .map(item => ({ id: item.matiere._id, nom: item.matiere.nom }));
});


const closeModal = () => {
  router.back();
}

const submitEvaluation = async () => {
  if(!evaluation.value.title || !evaluation.value.classeId || !evaluation.value.matiereId || !evaluation.value.date) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
  }
  
  try {
      await api.createEvaluation({
          titre: evaluation.value.title,
          type: evaluation.value.type,
          classeId: evaluation.value.classeId,
          matiereId: evaluation.value.matiereId,
          date: evaluation.value.date,
          heureDebut: evaluation.value.heureDebut,
          heureFin: evaluation.value.heureFin,
          description: evaluation.value.description
      });
      alert("Évaluation créée avec succès ! Elle est maintenant en attente de validation par le Censeur.");
      router.push('/professeur/classes');
  } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Erreur lors de la création");
  }
}
</script>
