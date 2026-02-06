<template>
  <div class="flex-1 flex flex-col overflow-y-auto">
    <!-- Header & Breadcrumbs -->
    <header class="p-8 pb-4">
      <div class="flex flex-wrap gap-2 mb-4">
        <a class="text-slate-500 text-sm font-medium hover:text-primary transition-colors" href="#">Tableau de bord</a>
        <span class="text-slate-500 text-sm font-medium">/</span>
        <a class="text-slate-500 text-sm font-medium hover:text-primary transition-colors" href="#">Absences</a>
        <span class="text-slate-500 text-sm font-medium">/</span>
        <span class="text-slate-900 dark:text-white text-sm font-medium">Groupées</span>
      </div>
      <div class="flex flex-wrap justify-between items-end gap-4">
        <div class="flex flex-col gap-2">
          <h2 class="text-slate-900 dark:text-white text-4xl font-black tracking-tight">Absences Groupées</h2>
          <p class="text-slate-500 text-base">Marquer une absence pour un groupe d'élèves (ex: sortie, grève, événement exceptionnel)</p>
        </div>
      </div>
    </header>

    <section class="px-8 pb-12 max-w-5xl">
      <!-- Step 1 & 2 Container -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left Column: Settings -->
        <div class="lg:col-span-1 flex flex-col gap-8">
          <!-- Section 1: Target -->
          <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 class="text-slate-900 dark:text-white text-lg font-bold mb-4 flex items-center gap-2">
              <span class="bg-primary/20 text-primary w-6 h-6 rounded text-xs flex items-center justify-center font-bold">1</span>
              Groupe cible
            </h3>
            <div class="flex flex-col gap-4">
              <label class="flex flex-col gap-2">
                <span class="text-sm font-semibold">Classe / Niveau</span>
                <select v-model="targetClass" class="custom-select w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 h-12 px-4 text-sm focus:ring-primary focus:border-primary">
                  <option value="">Sélectionner une classe</option>
                  <option v-for="cls in classes" :key="cls.value" :value="cls.value">{{ cls.label }}</option>
                </select>
              </label>
            </div>
          </div>

          <!-- Section 3: Details -->
          <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 class="text-slate-900 dark:text-white text-lg font-bold mb-4 flex items-center gap-2">
              <span class="bg-primary/20 text-primary w-6 h-6 rounded text-xs flex items-center justify-center font-bold">3</span>
              Détails de l'absence
            </h3>
            <div class="flex flex-col gap-4">
              <label class="flex flex-col gap-2">
                <span class="text-sm font-semibold">Période</span>
                <div class="grid grid-cols-2 gap-2">
                  <input v-model="absenceDetails.startDate" class="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 h-12 px-4 text-sm" type="date"/>
                  <input v-model="absenceDetails.startTime" class="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 h-12 px-4 text-sm" type="time"/>
                </div>
                <div class="grid grid-cols-2 gap-2 mt-1">
                  <input v-model="absenceDetails.endDate" class="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 h-12 px-4 text-sm" type="date"/>
                  <input v-model="absenceDetails.endTime" class="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 h-12 px-4 text-sm" type="time"/>
                </div>
              </label>
              <label class="flex flex-col gap-2 mt-2">
                <span class="text-sm font-semibold">Motif</span>
                <select v-model="absenceDetails.reason" class="custom-select w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 h-12 px-4 text-sm focus:ring-primary focus:border-primary">
                  <option value="">Choisir un motif</option>
                  <option v-for="reason in reasons" :key="reason.value" :value="reason.value">{{ reason.label }}</option>
                </select>
              </label>
              <label class="flex flex-col gap-2 mt-2">
                <span class="text-sm font-semibold">Commentaire (optionnel)</span>
                <textarea v-model="absenceDetails.comment" class="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-4 text-sm h-24 focus:ring-primary focus:border-primary" placeholder="Précisez la nature de l'absence..."></textarea>
              </label>
            </div>
          </div>
        </div>

        <!-- Right Column: Student Selection -->
        <div class="lg:col-span-2 flex flex-col gap-4 bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-slate-900 dark:text-white text-lg font-bold flex items-center gap-2">
              <span class="bg-primary/20 text-primary w-6 h-6 rounded text-xs flex items-center justify-center font-bold">2</span>
              Élèves concernés ({{ getClassName(targetClass) }})
            </h3>
            <div class="flex gap-2">
              <button @click="selectAllStudents" class="text-xs font-bold text-primary px-3 py-1 border border-primary/20 rounded-full hover:bg-primary/5">Tout cocher</button>
              <button @click="deselectAllStudents" class="text-xs font-bold text-slate-500 px-3 py-1 border border-slate-200 rounded-full hover:bg-slate-50">Tout décocher</button>
            </div>
          </div>

          <!-- Search within class -->
          <div class="relative mb-2">
            <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input v-model="searchQuery" class="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm" placeholder="Rechercher un élève dans cette classe..." type="text"/>
          </div>

          <!-- Table of students -->
          <div class="overflow-hidden border border-slate-200 dark:border-slate-800 rounded-lg">
            <table class="w-full text-left text-sm">
              <thead class="bg-slate-50 dark:bg-slate-800/50">
                <tr>
                  <th class="p-3 w-10">
                    <input @change="toggleAllStudents" :checked="allStudentsSelected" class="rounded border-slate-300 text-primary focus:ring-primary" type="checkbox"/>
                  </th>
                  <th class="p-3 font-semibold text-slate-500">Nom / Prénom</th>
                  <th class="p-3 font-semibold text-slate-500">Sexe</th>
                  <th class="p-3 font-semibold text-slate-500">Statut</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                <tr v-for="student in filteredStudents" :key="student.id" class="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td class="p-3">
                    <input v-model="student.selected" class="rounded border-slate-300 text-primary focus:ring-primary" type="checkbox"/>
                  </td>
                  <td class="p-3 font-medium">{{ student.name }}</td>
                  <td class="p-3">{{ student.gender }}</td>
                  <td class="p-3">
                    <span class="px-2 py-0.5 text-xs rounded-full font-medium" :class="getStatusColor(student.status)">
                      {{ student.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="mt-2 text-right">
            <p class="text-sm text-slate-500">Total sélectionné : <span class="font-bold text-primary">{{ selectedCount }} élèves</span></p>
          </div>
        </div>
      </div>

      <!-- Validation Footer bar -->
      <div class="mt-12 flex justify-end items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg">
        <div class="hidden md:flex flex-col items-end mr-4">
          <p class="text-sm text-slate-500 font-medium italic">{{ summaryText }}</p>
        </div>
        <button @click="cancelAbsence" class="px-6 py-3 rounded-lg border border-slate-200 dark:border-slate-700 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
          Annuler
        </button>
        <button @click="validateAbsence" class="px-8 py-3 bg-primary text-white rounded-lg font-bold text-sm shadow-lg shadow-primary/25 hover:brightness-110 active:scale-[0.98] transition-all flex items-center gap-2">
          <span class="material-symbols-outlined text-sm">how_to_reg</span>
          Valider l'absence groupée
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Données réactives
const targetClass = ref('3a')
const searchQuery = ref('')

// Classes disponibles
const classes = ref([
  { value: '6a', label: '6ème A' },
  { value: '6b', label: '6ème B' },
  { value: '5a', label: '5ème A' },
  { value: '4c', label: '4ème C' },
  { value: '3a', label: '3ème A' }
])

// Motifs d'absence
const reasons = ref([
  { value: 'sortie', label: 'Sortie scolaire' },
  { value: 'greve', label: 'Mouvement de grève' },
  { value: 'evenement', label: 'Événement interne' },
  { value: 'autre', label: 'Autre raison...' }
])

// Détails de l'absence
const absenceDetails = ref({
  startDate: '2023-10-24',
  startTime: '08:00',
  endDate: '2023-10-24',
  endTime: '17:00',
  reason: 'greve',
  comment: ''
})

// Élèves de la classe
const students = ref([
  { id: 1, name: 'ADAM Lucas', gender: 'M', status: 'Présent', selected: true },
  { id: 2, name: 'BERNARD Sofia', gender: 'F', status: 'Présent', selected: true },
  { id: 3, name: 'CHEN David', gender: 'M', status: 'Infirmerie', selected: true },
  { id: 4, name: 'DUPUIS Emma', gender: 'F', status: 'Présent', selected: true },
  { id: 5, name: 'GARCIA Matteo', gender: 'M', status: 'Présent', selected: true },
  { id: 6, name: 'LEROY Chloé', gender: 'F', status: 'Présent', selected: true },
  { id: 7, name: 'MARTIN Thomas', gender: 'M', status: 'Présent', selected: true },
  { id: 8, name: 'NGUYEN Anh', gender: 'F', status: 'Déjà Absent', selected: true }
])

// Computed properties
const filteredStudents = computed(() => {
  if (!searchQuery.value) return students.value
  return students.value.filter(student =>
    student.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const selectedCount = computed(() => {
  return students.value.filter(student => student.selected).length
})

const allStudentsSelected = computed(() => {
  return filteredStudents.value.length > 0 && filteredStudents.value.every(student => student.selected)
})

const summaryText = computed(() => {
  const className = getClassName(targetClass.value)
  const reasonLabel = getReasonLabel(absenceDetails.value.reason)
  return `Récapitulatif : ${selectedCount.value} élèves de ${className}, motif "${reasonLabel}", journée entière.`
})

// Fonctions utilitaires
const getClassName = (classValue) => {
  const cls = classes.value.find(c => c.value === classValue)
  return cls ? cls.label : ''
}

const getReasonLabel = (reasonValue) => {
  const reason = reasons.value.find(r => r.value === reasonValue)
  return reason ? reason.label : ''
}

const getStatusColor = (status) => {
  switch (status) {
    case 'Présent': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
    case 'Infirmerie': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
    case 'Déjà Absent': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
    default: return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
  }
}

// Fonctions d'action
const selectAllStudents = () => {
  filteredStudents.value.forEach(student => {
    student.selected = true
  })
}

const deselectAllStudents = () => {
  filteredStudents.value.forEach(student => {
    student.selected = false
  })
}

const toggleAllStudents = () => {
  if (allStudentsSelected.value) {
    deselectAllStudents()
  } else {
    selectAllStudents()
  }
}

const cancelAbsence = () => {
  console.log('Annuler l\'absence groupée')
}

const validateAbsence = () => {
  const selectedStudents = students.value.filter(s => s.selected)
  console.log('Valider l\'absence groupée:', {
    class: targetClass.value,
    students: selectedStudents,
    details: absenceDetails.value
  })
}
</script>

<style scoped>
.custom-select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1.5em;
}
</style>
