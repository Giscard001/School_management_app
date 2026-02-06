<template>
  <div class="flex-1 flex flex-col overflow-y-auto">
    <!-- Header -->
    <header class="flex items-center justify-between px-8 py-4 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 sticky top-0 z-10">
      <div class="flex flex-col">
        <h2 class="text-2xl font-black tracking-tight">Historique des Notes</h2>
        <p class="text-sm text-slate-500 dark:text-slate-400">Suivez l'évolution académique en temps réel.</p>
      </div>
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2">
          <button class="size-10 flex items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-50 border border-slate-200 dark:border-slate-700">
            <span class="material-symbols-outlined">notifications</span>
          </button>
          <button class="size-10 flex items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-50 border border-slate-200 dark:border-slate-700">
            <span class="material-symbols-outlined">settings</span>
          </button>
        </div>
      </div>
    </header>

    <!-- Stats Overview -->
    <div class="px-8 pt-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
          <p class="text-slate-500 dark:text-slate-400 text-sm font-medium">Moyenne Générale</p>
          <div class="flex items-baseline gap-2">
            <p class="text-3xl font-black text-primary">{{ stats.average }}<span class="text-sm text-slate-400">/20</span></p>
            <span class="text-xs font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">{{ stats.averageTrend }}</span>
          </div>
        </div>
        <div class="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
          <p class="text-slate-500 dark:text-slate-400 text-sm font-medium">Rang de la classe</p>
          <p class="text-3xl font-black">{{ stats.rank }}<span class="text-sm text-slate-400 font-normal ml-2">sur {{ stats.totalStudents }} élèves</span></p>
        </div>
        <div class="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
          <p class="text-slate-500 dark:text-slate-400 text-sm font-medium">Évaluations totales</p>
          <p class="text-3xl font-black">{{ stats.totalEvaluations }}<span class="text-sm text-slate-400 font-normal ml-2">ce trimestre</span></p>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="px-8 py-6">
      <div class="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
        <button @click="selectedSubject = 'all'" class="flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-primary text-white px-4 text-sm font-semibold">
          <span class="material-symbols-outlined text-sm">apps</span>
          Toutes les matières
        </button>
        <button v-for="subject in subjects" :key="subject.id" @click="selectedSubject = subject.id" class="flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 text-sm font-medium hover:bg-slate-50 transition-colors" :class="{ 'bg-primary text-white': selectedSubject === subject.id }">
          <span class="material-symbols-outlined text-[18px]" :class="getSubjectIcon(subject.id)"></span>
          {{ subject.name }}
          <span class="material-symbols-outlined text-[18px]" :class="selectedSubject === subject.id ? 'expand_less' : 'expand_more'"></span>
        </button>
        <div class="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>
        <button @click="selectedTrimester = '1'" class="flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 text-sm font-medium hover:bg-slate-50 transition-colors">
          <span class="material-symbols-outlined text-sm">calendar_month</span>
          {{ getTrimesterLabel(selectedTrimester) }}
          <span class="material-symbols-outlined text-[18px] expand_more"></span>
        </button>
      </div>
    </div>

    <!-- Grades List -->
    <div class="px-8 pb-12">
      <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
        <table class="w-full text-left border-collapse">
          <thead class="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
            <tr>
              <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
              <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Matière</th>
              <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Évaluation</th>
              <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Note /20</th>
              <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Coeff.</th>
              <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Moy. Classe</th>
              <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Détails</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 dark:divide-slate-700">
            <tr v-for="grade in filteredGrades" :key="grade.id" class="hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors">
              <td class="px-6 py-4 text-sm font-medium">{{ grade.date }}</td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-2">
                  <div class="size-7 rounded flex items-center justify-center" :class="getSubjectColor(grade.subject)">
                    <span class="material-symbols-outlined text-sm">{{ getSubjectIcon(grade.subject) }}</span>
                  </div>
                  <span class="text-sm font-semibold">{{ grade.subject }}</span>
                </div>
              </td>
              <td class="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{{ grade.evaluation }}</td>
              <td class="px-6 py-4">
                <span class="text-base font-bold" :class="getGradeColor(grade.note)">{{ grade.note }}</span>
              </td>
              <td class="px-6 py-4 text-sm">{{ grade.coefficient }}</td>
              <td class="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{{ grade.classAverage }}</td>
              <td class="px-6 py-4 text-right">
                <button @click="viewDetails(grade)" class="text-slate-500 hover:text-primary transition-colors">
                  <span class="material-symbols-outlined">visibility</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        
        <!-- Pagination-like footer -->
        <div class="px-6 py-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <p class="text-xs text-slate-400 font-medium">Affichage de {{ currentPage }} sur {{ totalPages }} évaluations</p>
          <div class="flex gap-2">
            <button @click="previousPage" :disabled="currentPage === 1" class="px-3 py-1.5 text-xs font-bold rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 disabled:opacity-50">Précédent</button>
            <button v-for="page in visiblePages" :key="page" @click="currentPage = page" class="px-3 py-1.5 text-xs font-bold rounded border" :class="page === currentPage ? 'border-primary bg-primary text-white' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'">
              {{ page }}
            </button>
            <button @click="nextPage" :disabled="currentPage === totalPages" class="px-3 py-1.5 text-xs font-bold rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 disabled:opacity-50">Suivant</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Données réactives
const selectedSubject = ref('all')
const selectedTrimester = ref('1')
const currentPage = ref(1)

// Statistiques
const stats = ref({
  average: '14.5',
  averageTrend: '+0.5',
  rank: '5ème',
  totalStudents: 28,
  totalEvaluations: 24
})

// Matières disponibles
const subjects = ref([
  { id: 'math', name: 'Mathématiques', icon: 'functions' },
  { id: 'french', name: 'Français', icon: 'history_edu' },
  { id: 'history', name: 'Histoire-Géo', icon: 'public' },
  { id: 'english', name: 'Anglais', icon: 'translate' }
])

// Notes des élèves
const grades = ref([
  {
    id: 1,
    date: '12 Oct 2023',
    subject: 'math',
    evaluation: 'Contrôle N°2: Géométrie',
    note: 16.5,
    coefficient: 4.0,
    classAverage: 12.2,
    details: 'Excellent travail sur les démonstrations géométriques'
  },
  {
    id: 2,
    date: '10 Oct 2023',
    subject: 'french',
    evaluation: 'Dissertation: Victor Hugo',
    note: 14.0,
    coefficient: 3.0,
    classAverage: 13.5,
    details: 'Analyse pertinente des personnages'
  },
  {
    id: 3,
    date: '05 Oct 2023',
    subject: 'history',
    evaluation: 'Interrogation: La Guerre Froide',
    note: 9.5,
    coefficient: 2.0,
    classAverage: 10.8,
    details: 'Révision nécessaire sur la chronologie'
  },
  {
    id: 4,
    date: '28 Sep 2023',
    subject: 'english',
    evaluation: 'Compréhension Orale',
    note: 18.0,
    coefficient: 2.0,
    classAverage: 14.1,
    details: 'Très bonne expression orale'
  },
  {
    id: 5,
    date: '25 Sep 2023',
    subject: 'math',
    evaluation: 'Contrôle N°1: Algèbre',
    note: 15.0,
    coefficient: 4.0,
    classAverage: 11.9,
    details: 'Bon niveau général, peut encore progresser'
  }
])

// Computed properties
const filteredGrades = computed(() => {
  if (selectedSubject.value === 'all') {
    return grades.value
  }
  return grades.value.filter(grade => grade.subject === selectedSubject.value)
})

const totalPages = computed(() => {
  return Math.ceil(filteredGrades.value.length / 5)
})

const visiblePages = computed(() => {
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(totalPages.value, currentPage.value + 2)
  const pages = []
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

// Fonctions utilitaires
const getSubjectColor = (subject) => {
  switch (subject) {
    case 'math': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600'
    case 'french': return 'bg-orange-100 dark:bg-orange-900/30 text-orange-600'
    case 'history': return 'bg-green-100 dark:bg-green-900/30 text-green-600'
    case 'english': return 'bg-purple-100 dark:bg-purple-900/30 text-purple-600'
    default: return 'bg-slate-100 dark:bg-slate-800 text-slate-600'
  }
}

const getSubjectIcon = (subject) => {
  switch (subject) {
    case 'math': return 'functions'
    case 'french': return 'history_edu'
    case 'history': return 'public'
    case 'english': return 'translate'
    default: return 'help_outline'
  }
}

const getGradeColor = (note) => {
  if (note >= 16) return 'text-primary'
  if (note >= 14) return 'text-slate-900 dark:text-slate-100'
  if (note >= 10) return 'text-amber-500'
  return 'text-red-500'
}

const getTrimesterLabel = (trimester) => {
  switch (trimester) {
    case '1': return '1er Trimestre'
    case '2': return '2ème Trimestre'
    case '3': return '3ème Trimestre'
    default: return `${trimester}ème Trimestre`
  }
}

// Fonctions d'action
const viewDetails = (grade) => {
  console.log('Voir détails de la note:', grade)
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}
</script>
