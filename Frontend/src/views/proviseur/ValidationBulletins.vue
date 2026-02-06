<template>
  <div class="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark">
    <div class="max-w-6xl mx-auto px-8 py-8">
      <!-- Page Heading -->
      <div class="flex flex-wrap justify-between items-end gap-4 mb-8">
        <div class="flex flex-col gap-2">
          <h2 class="text-[#0e141b] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">Validation des Bulletins</h2>
          <div class="flex items-center gap-2 text-[#4e7397] dark:text-slate-400">
            <span class="material-symbols-outlined text-lg">calendar_today</span>
            <p class="text-base font-normal">Trimestre 1, Année Scolaire 2023-2024</p>
          </div>
        </div>
        <div class="flex gap-3">
          <button class="flex items-center gap-2 cursor-pointer justify-center rounded-lg h-10 px-5 bg-white dark:bg-slate-800 border border-[#d0dbe7] dark:border-slate-700 text-[#0e141b] dark:text-white text-sm font-bold shadow-sm hover:bg-slate-50">
            <span class="material-symbols-outlined text-xl">help_outline</span>
            <span>Aide</span>
          </button>
          <button @click="toutValider" class="flex items-center gap-2 cursor-pointer justify-center rounded-lg h-10 px-5 bg-primary text-white text-sm font-bold shadow-lg shadow-primary/30 hover:bg-primary/90">
            <span class="material-symbols-outlined text-xl">done_all</span>
            <span>Tout Valider</span>
          </button>
        </div>
      </div>

      <!-- Statistics Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="flex flex-col gap-3 rounded-xl p-6 bg-white dark:bg-slate-800 border border-[#d0dbe7] dark:border-slate-700 shadow-sm">
          <div class="flex justify-between items-start">
            <p class="text-[#4e7397] dark:text-slate-400 text-sm font-semibold uppercase tracking-wider">Classes prêtes</p>
            <span class="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-lg material-symbols-outlined">assignment_turned_in</span>
          </div>
          <p class="text-[#0e141b] dark:text-white tracking-tight text-3xl font-black">{{ stats.classesPretes }}</p>
          <div class="flex items-center gap-1 text-green-600 font-bold text-sm">
            <span class="material-symbols-outlined text-sm font-bold">trending_up</span>
            <span>+80% complété</span>
          </div>
        </div>
        <div class="flex flex-col gap-3 rounded-xl p-6 bg-white dark:bg-slate-800 border border-[#d0dbe7] dark:border-slate-700 shadow-sm">
          <div class="flex justify-between items-start">
            <p class="text-[#4e7397] dark:text-slate-400 text-sm font-semibold uppercase tracking-wider">Élèves concernés</p>
            <span class="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg material-symbols-outlined">groups</span>
          </div>
          <p class="text-[#0e141b] dark:text-white tracking-tight text-3xl font-black">{{ stats.elevesConcernes }}</p>
          <p class="text-[#4e7397] dark:text-slate-400 text-sm">En attente de signature finale</p>
        </div>
        <div class="flex flex-col gap-3 rounded-xl p-6 bg-white dark:bg-slate-800 border border-[#d0dbe7] dark:border-slate-700 shadow-sm">
          <div class="flex justify-between items-start">
            <p class="text-[#4e7397] dark:text-slate-400 text-sm font-semibold uppercase tracking-wider">Moyenne Générale</p>
            <span class="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-lg material-symbols-outlined">monitoring</span>
          </div>
          <p class="text-[#0e141b] dark:text-white tracking-tight text-3xl font-black">{{ stats.moyenneGenerale }}/20</p>
          <div class="flex items-center gap-1 text-green-600 font-bold text-sm">
            <span class="material-symbols-outlined text-sm font-bold">trending_up</span>
            <span>+0.5 pts vs T3</span>
          </div>
        </div>
      </div>

      <!-- Actions Bar -->
      <div class="bg-white dark:bg-slate-800 rounded-t-xl border-x border-t border-[#d0dbe7] dark:border-slate-700 px-6 py-4">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div class="flex items-center gap-6">
            <div class="flex items-center gap-2 group cursor-pointer">
              <div class="w-5 h-5 rounded border-2 border-primary bg-primary flex items-center justify-center">
                <span class="material-symbols-outlined text-white text-xs font-bold">check</span>
              </div>
              <span class="text-[#0e141b] dark:text-slate-200 text-sm font-medium">{{ classesSelectionnees }} classes sélectionnées</span>
            </div>
            <div class="h-6 w-[1px] bg-[#d0dbe7] dark:bg-slate-700"></div>
            <button class="flex items-center gap-2 text-[#4e7397] dark:text-slate-400 hover:text-primary transition-colors text-sm font-medium">
              <span class="material-symbols-outlined text-lg">filter_list</span>
              <span>Filtrer par niveau</span>
            </button>
            <button @click="exporterPDF" class="flex items-center gap-2 text-[#4e7397] dark:text-slate-400 hover:text-primary transition-colors text-sm font-medium">
              <span class="material-symbols-outlined text-lg">download</span>
              <span>Exporter (.pdf)</span>
            </button>
          </div>
          <div class="relative min-w-[280px]">
            <span class="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400">search</span>
            <input v-model="searchQuery" class="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border-[#d0dbe7] dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary" placeholder="Rechercher une classe..." type="text"/>
          </div>
        </div>
      </div>

      <!-- Table Content -->
      <div class="bg-white dark:bg-slate-800 border border-[#d0dbe7] dark:border-slate-700 rounded-b-xl overflow-hidden shadow-sm">
        <table class="w-full text-left border-collapse">
          <thead class="bg-slate-50 dark:bg-slate-900/50 border-b border-[#d0dbe7] dark:border-slate-700">
            <tr>
              <th class="px-6 py-4 w-12"></th>
              <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#4e7397] dark:text-slate-400">Classe & Professeur Principal</th>
              <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#4e7397] dark:text-slate-400">Performance (Moy/Min/Max)</th>
              <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#4e7397] dark:text-slate-400 text-center">Statut</th>
              <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#4e7397] dark:text-slate-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#d0dbe7] dark:divide-slate-700">
            <!-- Row 1 -->
            <tr v-for="classe in classes" :key="classe.id" class="hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors group">
              <td class="px-6 py-4">
                <input v-model="classe.selected" class="h-5 w-5 rounded border-[#d0dbe7] text-primary focus:ring-primary transition-all" type="checkbox"/>
              </td>
              <td class="px-6 py-4 cursor-pointer hover:bg-primary/5 transition-colors" @click="voirDetails(classe.id)">
                <div class="flex flex-col">
                  <span class="text-[#0e141b] dark:text-white font-bold text-sm">{{ classe.nom }}</span>
                  <span class="text-[#4e7397] dark:text-slate-400 text-xs">{{ classe.professeur }}</span>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-2">
                  <div class="text-sm">
                    <span class="font-bold text-primary">{{ classe.moyenne }}</span>
                    <span class="text-slate-300 mx-1">/</span>
                    <span class="text-slate-500 text-xs">{{ classe.min }}</span>
                    <span class="text-slate-300 mx-1">/</span>
                    <span class="text-slate-500 text-xs">{{ classe.max }}</span>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-center">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold" :class="getStatutClass(classe.statut)">
                  <span class="size-1.5 rounded-full mr-1.5" :class="getStatutDotClass(classe.statut)"></span>
                  {{ classe.statut }}
                </span>
              </td>
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end gap-2">
                  <button @click="voirDetails(classe.id)" class="text-primary hover:text-primary/80 text-sm font-medium">Voir</button>
                  <button @click="validerClasse(classe.id)" class="text-[#4e7397] hover:text-primary text-sm font-medium">Valider</button>
                  <button class="text-[#4e7397] hover:text-primary text-sm font-medium">Imprimer</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const searchQuery = ref('')

const stats = ref({
  classesPretes: '12/15',
  elevesConcernes: 342,
  moyenneGenerale: 13.45
})

const classes = ref([
  {
    id: 1,
    nom: '6ème A',
    professeur: 'M. Dupont (Mathématiques)',
    moyenne: '14.2',
    min: '09.0',
    max: '18.5',
    statut: 'Prêt',
    selected: true
  },
  {
    id: 2,
    nom: '6ème B',
    professeur: 'Mme. Laurent (Français)',
    moyenne: '13.8',
    min: '08.5',
    max: '17.2',
    statut: 'Prêt',
    selected: true
  },
  {
    id: 3,
    nom: '5ème A',
    professeur: 'M. Bernard (Histoire)',
    moyenne: '12.5',
    min: '07.0',
    max: '16.8',
    statut: 'En cours',
    selected: false
  },
  {
    id: 4,
    nom: '5ème B',
    professeur: 'Mme. Martin (Sciences)',
    moyenne: '11.2',
    min: '06.5',
    max: '15.9',
    statut: 'En attente',
    selected: false
  },
  {
    id: 5,
    nom: '4ème A',
    professeur: 'M. Dubois (Maths)',
    moyenne: '15.1',
    min: '10.2',
    max: '18.7',
    statut: 'Prêt',
    selected: true
  }
])

const classesSelectionnees = computed(() => {
  return classes.value.filter(c => c.selected).length
})

const getStatutClass = (statut) => {
  switch(statut) {
    case 'Prêt': return 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800'
    case 'En cours': return 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800'
    case 'En attente': return 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800'
    default: return 'bg-slate-50 dark:bg-slate-900/20 text-slate-700 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
  }
}

const getStatutDotClass = (statut) => {
  switch(statut) {
    case 'Prêt': return 'bg-green-500'
    case 'En cours': return 'bg-amber-500'
    case 'En attente': return 'bg-red-500'
    default: return 'bg-slate-500'
  }
}

const toutValider = () => {
  console.log('Tout valider')
  const classesPretes = classes.value.filter(c => c.statut === 'Prêt')
  console.log('Classes à valider:', classesPretes)
}

const voirDetails = (classeId) => {
  console.log('Voir détails de la classe:', classeId)
  router.push(`/proviseur/classe/${classeId}`)
}

const validerClasse = (classeId) => {
  console.log('Valider classe:', classeId)
  const classe = classes.value.find(c => c.id === classeId)
  if (classe) {
    classe.statut = 'Prêt'
  }
}

const exporterPDF = () => {
  console.log('Exporter en PDF')
}
</script>