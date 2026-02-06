<template>
  <div class="space-y-8">
    <!-- Stats Row -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
        <div class="flex items-center justify-between mb-4">
          <span class="p-2 bg-primary/10 text-primary rounded-lg material-symbols-outlined">groups</span>
          <span class="text-green-600 bg-green-50 dark:bg-green-500/10 text-xs font-bold px-2 py-1 rounded-full">+5%</span>
        </div>
        <p class="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Élèves</p>
        <h3 class="text-3xl font-bold text-slate-900 dark:text-white mt-1">{{ isLoading ? '...' : totalEleves }}</h3>
      </div>
      <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
        <div class="flex items-center justify-between mb-4">
          <span class="p-2 bg-orange-500/10 text-orange-500 rounded-lg material-symbols-outlined">co_present</span>
          <span class="text-green-600 bg-green-50 dark:bg-green-500/10 text-xs font-bold px-2 py-1 rounded-full">+2%</span>
        </div>
        <p class="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Professeurs</p>
        <h3 class="text-3xl font-bold text-slate-900 dark:text-white mt-1">{{ isLoading ? '...' : totalProfesseurs }}</h3>
      </div>
      <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
        <div class="flex items-center justify-between mb-4">
          <span class="p-2 bg-green-500/10 text-green-500 rounded-lg material-symbols-outlined">school</span>
          <span class="text-green-600 bg-green-50 dark:bg-green-500/10 text-xs font-bold px-2 py-1 rounded-full">+1.5%</span>
        </div>
        <p class="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Classes</p>
        <h3 class="text-3xl font-bold text-slate-900 dark:text-white mt-1">{{ isLoading ? '...' : totalClasses }}</h3>
      </div>
    </div>
    
    <!-- Examens Section -->
    <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-lg font-bold text-slate-900 dark:text-white">Examens Planifiés</h2>
          <p class="text-sm text-slate-500 dark:text-slate-400">Consultez les examens planifiés par les professeurs</p>
        </div>
      </div>

      <!-- Class Selector -->
      <div class="mb-6">
        <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Sélectionner une classe</label>
        <select 
          v-model="selectedClasseForExams" 
          @change="loadExamsForClass"
          class="w-full md:w-64 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="">Toutes les classes</option>
          <option v-for="classe in classes" :key="classe._id" :value="classe._id">
            {{ classe.niveau }} {{ classe.section }}
          </option>
        </select>
      </div>

      <!-- Exams List -->
      <div v-if="isLoadingExams" class="text-center py-12">
        <p class="text-slate-500">Chargement des examens...</p>
      </div>

      <div v-else-if="filteredExams.length === 0" class="text-center py-12">
        <span class="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-700 mb-4">event_busy</span>
        <p class="text-slate-500">Aucun examen planifié{{ selectedClasseForExams ? ' pour cette classe' : '' }}</p>
      </div>

      <div v-else class="space-y-3">
        <div 
          v-for="exam in filteredExams" 
          :key="exam._id"
          class="p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-primary dark:hover:border-primary transition-colors"
        >
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <h3 class="font-bold text-slate-900 dark:text-white">{{ exam.nom }}</h3>
                <span class="px-2 py-0.5 text-xs font-bold rounded-full bg-primary/10 text-primary">
                  {{ exam.matiere?.nom }}
                </span>
              </div>
              <div class="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                <span class="flex items-center gap-1">
                  <span class="material-symbols-outlined text-sm">school</span>
                  {{ exam.classe?.niveau }} {{ exam.classe?.section }}
                </span>
                <span class="flex items-center gap-1">
                  <span class="material-symbols-outlined text-sm">event</span>
                  {{ formatDate(exam.date) }}
                </span>
                <span class="flex items-center gap-1">
                  <span class="material-symbols-outlined text-sm">schedule</span>
                  {{ exam.heureDebut }} - {{ exam.heureFin }}
                </span>
                <span class="flex items-center gap-1">
                  <span class="material-symbols-outlined text-sm">person</span>
                  {{ exam.professeur?.prenom }} {{ exam.professeur?.nom }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Quick Stats Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Classes Card -->
      <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-base font-bold text-slate-900 dark:text-white">Classes</h2>
          <router-link to="/admin/classes" class="text-xs text-primary hover:underline">Voir tout →</router-link>
        </div>
        <div class="text-center py-8">
          <div class="text-5xl font-bold text-primary mb-2">{{ totalClasses }}</div>
          <p class="text-sm text-slate-500 dark:text-slate-400">Classes actives</p>
        </div>
      </div>

      <!-- Subjects Card -->
      <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-base font-bold text-slate-900 dark:text-white">Matières</h2>
          <router-link to="/admin/cours" class="text-xs text-primary hover:underline">Voir tout →</router-link>
        </div>
        <div class="text-center py-8">
          <div class="text-5xl font-bold text-orange-500 mb-2">{{ matieres.length }}</div>
          <p class="text-sm text-slate-500 dark:text-slate-400">Matières enseignées</p>
        </div>
      </div>

      <!-- Users Card -->
      <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-base font-bold text-slate-900 dark:text-white">Utilisateurs</h2>
          <router-link to="/admin/utilisateurs" class="text-xs text-primary hover:underline">Voir tout →</router-link>
        </div>
        <div class="text-center py-8">
          <div class="text-5xl font-bold text-green-500 mb-2">{{ users.length }}</div>
          <p class="text-sm text-slate-500 dark:text-slate-400">Comptes actifs</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import api from '@/services/api'

const users = ref([])
const classes = ref([])
const matieres = ref([])
const exams = ref([])
const isLoading = ref(false)
const isLoadingExams = ref(false)
const selectedClasseForExams = ref('')

const fetchDashboardData = async () => {
  isLoading.value = true
  try {
    const [usersRes, classesRes, matieresRes] = await Promise.all([
      api.getUsers(),
      api.getClasses(),
      api.getMatieres()
    ])
    
    users.value = Array.isArray(usersRes.data.data) ? usersRes.data.data : []
    classes.value = Array.isArray(classesRes.data.data) ? classesRes.data.data : []
    matieres.value = Array.isArray(matieresRes.data.data) ? matieresRes.data.data : []
  } catch (error) {
    console.error('Erreur chargement dashboard:', error)
    users.value = []
    classes.value = []
    matieres.value = []
  } finally {
    isLoading.value = false
  }
}

const loadExamsForClass = async () => {
  isLoadingExams.value = true
  try {
    const params = selectedClasseForExams.value ? { classe: selectedClasseForExams.value } : {}
    const res = await api.getExamens(params)
    exams.value = Array.isArray(res.data.data) ? res.data.data : []
  } catch (error) {
    console.error('Erreur chargement examens:', error)
    exams.value = []
  } finally {
    isLoadingExams.value = false
  }
}

const filteredExams = computed(() => {
  return exams.value
})

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
}

const totalEleves = computed(() => {
  return users.value.filter(u => u?.role === 'ELEVE').length
})

const totalProfesseurs = computed(() => {
  return users.value.filter(u => u?.role === 'PROFESSEUR').length
})

const totalClasses = computed(() => {
  return Array.isArray(classes.value) ? classes.value.length : 0
})

onMounted(() => {
  fetchDashboardData()
  loadExamsForClass()
})
</script>
