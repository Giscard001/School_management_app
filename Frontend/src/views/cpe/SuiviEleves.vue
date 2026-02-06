<template>
  <div class="flex-1 flex flex-col overflow-y-auto">
    <!-- Common Header -->
    <Header title="Suivi des Élèves">
      <template #search>
        <div class="relative w-64">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
          <input v-model="searchQuery" class="w-full pl-10 pr-4 py-1.5 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary transition-all" placeholder="Rechercher un élève..." type="text"/>
        </div>
      </template>
    </Header>
    
    <!-- Signaler Incident Modal -->
    <SignalerIncidentModal :is-open="isIncidentModalOpen" @close="isIncidentModalOpen = false" @success="handleIncidentSuccess" />


    <!-- Page Content -->
    <div class="p-8 max-w-7xl mx-auto w-full">
      <!-- Breadcrumbs & Class Selector -->
      <div class="flex items-center justify-between mb-6">
        <nav class="flex items-center gap-2 text-sm font-medium">
          <a class="text-slate-500 hover:text-primary transition-colors" href="#">Classes</a>
          <span class="text-slate-400 material-symbols-outlined text-xs">chevron_right</span>
          <span class="text-slate-900 dark:text-white">{{ currentClass.name }}</span>
        </nav>
        <div class="flex items-center gap-2">
          <label class="text-sm font-bold text-slate-500">Choisir une classe :</label>
          <select v-model="selectedClasseId" class="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm px-4 py-1.5 focus:ring-2 focus:ring-primary transition-all">
            <option v-for="c in classes" :key="c._id" :value="c._id">
              {{ c.niveau }} {{ c.section }}
            </option>
          </select>
        </div>
      </div>

      <!-- Page Heading -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h3 class="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{{ currentClass.name }}</h3>
          <p class="text-slate-500 dark:text-slate-400 mt-1">
            <span class="font-semibold text-slate-700 dark:text-slate-300">{{ currentClass.studentsCount }} élèves</span>
            <span class="mx-2">•</span> 
            Professeur Principal : <span class="text-primary font-medium">{{ currentClass.professor }}</span>
          </p>
        </div>
        <div class="flex items-center gap-3">
          <button @click="exportList" class="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            <span class="material-symbols-outlined text-lg">download</span>
            Exporter la liste
          </button>
          <button @click="createAlert" class="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
            <span class="material-symbols-outlined text-lg">add</span>
            Nouvelle Alerte
          </button>
        </div>
      </div>

      <!-- Tabs Navigation -->
      <div class="border-b border-slate-200 dark:border-slate-800 mb-8">
        <div class="flex gap-8">
          <button @click="activeTab = 'overview'" class="pb-4 text-sm font-bold transition-colors border-b-2" :class="activeTab === 'overview' ? 'text-primary border-primary' : 'text-slate-500 hover:text-primary border-transparent'">
            Vue d'ensemble
          </button>
          <button @click="activeTab = 'students'" class="pb-4 text-sm font-bold transition-colors border-b-2" :class="activeTab === 'students' ? 'text-primary border-primary' : 'text-slate-500 hover:text-primary border-transparent'">
            Liste des élèves
          </button>
          <button @click="activeTab = 'stats'" class="pb-4 text-sm font-bold transition-colors border-b-2" :class="activeTab === 'stats' ? 'text-primary border-primary' : 'text-slate-500 hover:text-primary border-transparent'">
            Statistiques
          </button>
          <button @click="activeTab = 'absences'" class="pb-4 text-sm font-bold transition-colors border-b-2" :class="activeTab === 'absences' ? 'text-primary border-primary' : 'text-slate-500 hover:text-primary border-transparent'">
            Absences groupées
          </button>
        </div>
      </div>

      <!-- Stats Summary Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center">
            <span class="material-symbols-outlined text-2xl">pending_actions</span>
          </div>
          <div>
            <p class="text-sm font-medium text-slate-500 dark:text-slate-400">Total Absences</p>
            <p class="text-2xl font-bold text-slate-900 dark:text-white">{{ stats.totalAbsences }} h</p>
          </div>
        </div>
        <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div class="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-full flex items-center justify-center">
            <span class="material-symbols-outlined text-2xl">warning</span>
          </div>
          <div>
            <p class="text-sm font-medium text-slate-500 dark:text-slate-400">Incidents Disciplinaires</p>
            <p class="text-2xl font-bold text-slate-900 dark:text-white">{{ stats.incidents }} ce mois</p>
          </div>
        </div>
        <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div class="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center">
            <span class="material-symbols-outlined text-2xl">trending_up</span>
          </div>
          <div>
            <p class="text-sm font-medium text-slate-500 dark:text-slate-400">Moyenne de Classe</p>
            <p class="text-2xl font-bold text-slate-900 dark:text-white">{{ stats.average }} / 20</p>
          </div>
        </div>
      </div>

      <!-- Filter Bar -->
      <div class="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div class="flex items-center gap-2">
          <span class="text-sm font-medium text-slate-500">Filtrer par :</span>
          <div class="flex gap-2">
            <button @click="activeFilter = 'all'" class="px-3 py-1.5 text-xs font-bold rounded-full transition-colors" :class="activeFilter === 'all' ? 'bg-primary/10 text-primary' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'">
              Tous
            </button>
            <button @click="activeFilter = 'risk'" class="px-3 py-1.5 text-xs font-bold rounded-full transition-colors" :class="activeFilter === 'risk' ? 'bg-primary/10 text-primary' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'">
              Risque d'échec
            </button>
            <button @click="activeFilter = 'absenteeism'" class="px-3 py-1.5 text-xs font-bold rounded-full transition-colors" :class="activeFilter === 'absenteeism' ? 'bg-primary/10 text-primary' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'">
              Forte Absentéisme
            </button>
          </div>
        </div>
        <div class="text-sm text-slate-500">
          Affichage de <span class="font-bold text-slate-900 dark:text-white">{{ filteredStudents.length }}</span> élèves
        </div>
      </div>

      <!-- Students Table -->
      <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
              <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Élève</th>
              <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Assiduité</th>
              <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Discipline</th>
              <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Moyenne Actuelle</th>
              <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Statut</th>
              <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
            <tr v-for="student in filteredStudents" :key="student.id" class="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 bg-cover bg-center" :style="`background-image: url('${student.avatar}')`"></div>
                  <div class="flex flex-col">
                    <span class="text-sm font-bold text-slate-900 dark:text-white">{{ student.name }}</span>
                    <span class="text-xs text-slate-500">Inscrit le {{ student.registrationDate }}</span>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-2">
                  <span class="text-sm font-medium" :class="getAbsenceColor(student.absences)">{{ student.absences }} h</span>
                  <span v-if="student.absenceTrend" class="material-symbols-outlined text-xs" :class="getTrendColor(student.absenceTrend)">{{ student.absenceTrend }}</span>
                </div>
              </td>
              <td class="px-6 py-4">
                <span v-if="student.reports > 0" class="px-2.5 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-xs font-bold rounded-lg">
                  {{ student.reports }} Rapport{{ student.reports > 1 ? 's' : '' }}
                </span>
                <span v-else class="text-xs text-slate-400 font-medium italic">Aucun incident</span>
              </td>
              <td class="px-6 py-4 font-bold" :class="getAverageColor(student.average)">
                {{ student.average }} / 20
              </td>
              <td class="px-6 py-4">
                <span class="px-2 py-1 text-[10px] uppercase tracking-wider font-bold rounded" :class="getStatusColor(student.status)">
                  {{ student.status }}
                </span>
              </td>
              <td class="px-6 py-4 text-right">
                <button @click="viewDetails(student)" class="text-primary hover:underline text-sm font-bold">Détails</button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Table Pagination -->
        <div class="p-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
          <span class="text-xs text-slate-500">Page {{ currentPage }} sur {{ totalPages }}</span>
          <div class="flex gap-1">
            <button @click="previousPage" :disabled="currentPage === 1" class="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors disabled:opacity-50">
              <span class="material-symbols-outlined text-sm">chevron_left</span>
            </button>
            <button v-for="page in totalPages" :key="page" @click="currentPage = page" class="w-8 h-8 rounded text-xs font-bold transition-colors" :class="currentPage === page ? 'bg-primary text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'">
              {{ page }}
            </button>
            <button @click="nextPage" :disabled="currentPage === totalPages" class="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors disabled:opacity-50">
              <span class="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'
import Header from '@/components/common/Header.vue'
import SignalerIncidentModal from '@/components/modals/SignalerIncidentModal.vue'

const router = useRouter()
const isIncidentModalOpen = ref(false)

// Données réactives
const searchQuery = ref('')
const activeFilter = ref('all')
const currentPage = ref(1)
const totalPages = ref(1)
const isLoading = ref(true)

const classes = ref([])
const selectedClasseId = ref('')
const currentClass = ref({
  name: 'Sélectionnez une classe',
  studentsCount: 0,
  professor: 'N/A'
})

const stats = ref({
  totalAbsences: 0,
  incidents: 0,
  average: 0
})

const students = ref([])

const fetchClasses = async () => {
  try {
    const res = await api.getClasses()
    classes.value = res.data.data
    if (classes.value.length > 0) {
      selectedClasseId.value = classes.value[0]._id
    }
  } catch (error) {
    console.error('Erreur lors du chargement des classes:', error)
  }
}

const fetchClassDetails = async () => {
  if (!selectedClasseId.value) return
  
  try {
    isLoading.value = true
    
    // 1. Get class info
    const classeRes = await api.getClasse(selectedClasseId.value)
    const classeData = classeRes.data.data
    currentClass.value = {
      name: `${classeData.niveau} ${classeData.section}`,
      studentsCount: 0, // Will be updated
      professor: classeData.professeurPrincipal ? `${classeData.professeurPrincipal.prenom} ${classeData.professeurPrincipal.nom}` : 'Non assigné'
    }

    // 2. Get students and their attendance
    const studentsRes = await api.getDetailedAttendanceList(selectedClasseId.value)
    students.value = studentsRes.data.data
    currentClass.value.studentsCount = students.value.length

    // 3. Get class stats
    const statsRes = await api.getAttendanceStats(selectedClasseId.value)
    stats.value = statsRes.data.data

  } catch (error) {
    console.error('Erreur lors du chargement des détails de la classe:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchClasses()
})

watch(selectedClasseId, () => {
  fetchClassDetails()
})

const handleIncidentSuccess = () => {
  fetchClassDetails()
}

// Élèves filtrés
const filteredStudents = computed(() => {
  let filtered = students.value

  // Filtrer par recherche
  if (searchQuery.value) {
    filtered = filtered.filter(student => 
      student.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  // Filtrer par statut
  if (activeFilter.value === 'risk') {
    filtered = filtered.filter(student => student.average < 10 && student.average > 0)
  } else if (activeFilter.value === 'absenteeism') {
    filtered = filtered.filter(student => student.absences > 10)
  }

  return filtered
})

// Fonctions utilitaires
const getAbsenceColor = (absences) => {
  if (absences === 0) return 'text-emerald-500'
  if (absences > 15) return 'text-red-500'
  return 'text-slate-700 dark:text-slate-300'
}

const getTrendColor = (trend) => {
  if (trend === 'trending_up') return 'text-red-400'
  if (trend === 'trending_down') return 'text-emerald-400'
  return 'text-slate-400'
}

const getAverageColor = (average) => {
  if (average === 0) return 'text-slate-400'
  if (average < 10) return 'text-red-600'
  return 'text-slate-700 dark:text-slate-300'
}

const getStatusColor = (status) => {
  switch (status) {
    case 'Excellent': return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
    case 'Régulier': return 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
    case 'À surveiller': return 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400'
    case 'Alerte Décrochage': return 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400'
    default: return 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
  }
}

// Fonctions d'action
const exportList = () => {
  if (students.value.length === 0) return
  
  const headers = ['Nom', 'Absences (h)', 'Signalements', 'Moyenne', 'Statut']
  const rows = students.value.map(s => [
    s.name,
    s.absences,
    s.reports,
    s.average,
    s.status
  ])
  
  let csvContent = "data:text/csv;charset=utf-8," 
    + headers.join(",") + "\n"
    + rows.map(r => r.join(",")).join("\n")

  const encodedUri = encodeURI(csvContent)
  const link = document.createElement("a")
  link.setAttribute("href", encodedUri)
  link.setAttribute("download", `liste_eleves_${currentClass.value.name.replace(/\s+/g, '_')}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const createAlert = () => {
  isIncidentModalOpen.value = true
}

const viewDetails = (student) => {
  router.push(`/cpe/eleves/${student.id}`)
}

const previousPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}
</script>
