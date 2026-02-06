<template>
  <div class="flex-1 flex flex-col overflow-y-auto">
    <!-- Common Header -->
    <Header title="Rapports & Statistiques">
      <template #search>
        <div class="relative hidden lg:block">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
          <input v-model="searchQuery" class="bg-slate-100 dark:bg-slate-800 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary w-64" placeholder="Rechercher un rapport..." type="text"/>
        </div>
      </template>
    </Header>


    <!-- Dashboard Body -->
    <div class="p-8 max-w-[1200px] w-full mx-auto flex flex-col gap-6">
      <!-- Breadcrumbs -->
      <nav class="flex items-center gap-2 text-sm text-slate-500">
        <a class="hover:text-primary transition-colors" href="#">Accueil</a>
        <span class="material-symbols-outlined text-xs">chevron_right</span>
        <span class="text-slate-900 dark:text-white font-medium">Analyse Hebdomadaire</span>
      </nav>

      <!-- Page Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div v-if="isLoading" class="animate-pulse">
          <div class="h-8 w-64 bg-slate-200 dark:bg-slate-800 rounded mb-2"></div>
          <div class="h-4 w-48 bg-slate-100 dark:bg-slate-800 rounded"></div>
        </div>
        <div v-else>
          <h1 class="text-3xl font-bold tracking-tight">Analyse Hebdomadaire</h1>
          <p class="text-slate-500 mt-1">{{ getWeekLabel() }}</p>
        </div>
        <!-- Date Picker Filter -->
        <div class="flex items-center gap-2 bg-white dark:bg-slate-900 p-1 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
          <button @click="previousWeek" class="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg">Précédent</button>
          <div class="px-4 py-2 text-sm font-bold bg-primary/10 text-primary rounded-lg flex items-center gap-2">
            <span class="material-symbols-outlined text-sm">calendar_month</span>
            <span>Semaine en cours</span>
          </div>
          <button @click="nextWeek" class="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg">Suivant</button>
        </div>
      </div>

      <!-- Tabs -->
      <div class="border-b border-slate-200 dark:border-slate-800 flex gap-8">
        <button @click="activeTab = 'overview'" class="border-b-2 px-1 py-4 text-sm font-bold transition-colors" :class="activeTab === 'overview' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700'">
          Vue d'ensemble
        </button>
        <button @click="activeTab = 'incidents'" class="border-b-2 px-1 py-4 text-sm font-bold transition-colors" :class="activeTab === 'incidents' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700'">
          Incidents
        </button>
        <button @click="activeTab = 'absences'" class="border-b-2 px-1 py-4 text-sm font-bold transition-colors" :class="activeTab === 'absences' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700'">
          Absence & Retards
        </button>
        <button @click="activeTab = 'councils'" class="border-b-2 px-1 py-4 text-sm font-bold transition-colors" :class="activeTab === 'councils' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700'">
          Conseils de classe
        </button>
      </div>

      <!-- KPI Tiles -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-white dark:bg-slate-900 p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col gap-1">
          <div class="flex items-center justify-between text-slate-500 mb-2">
            <span class="text-xs font-bold uppercase tracking-wider">Incidents Totaux</span>
            <span class="material-symbols-outlined text-red-500 bg-red-50 p-1 rounded">report_problem</span>
          </div>
          <div class="flex items-end gap-2">
            <span class="text-2xl font-bold">{{ stats.totalIncidents }}</span>
            <span class="text-xs text-green-500 font-medium mb-1 flex items-center">{{ stats.incidentsTrend }}</span>
          </div>
        </div>
        <div class="bg-white dark:bg-slate-900 p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col gap-1">
          <div class="flex items-center justify-between text-slate-500 mb-2">
            <span class="text-xs font-bold uppercase tracking-wider">Taux d'absentéisme</span>
            <span class="material-symbols-outlined text-primary bg-primary/10 p-1 rounded">event_busy</span>
          </div>
          <div class="flex items-end gap-2">
            <span class="text-2xl font-bold">{{ stats.absenteeismRate }}%</span>
            <span class="text-xs text-red-500 font-medium mb-1 flex items-center">{{ stats.absenteeismTrend }}</span>
          </div>
        </div>
        <div class="bg-white dark:bg-slate-900 p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col gap-1">
          <div class="flex items-center justify-between text-slate-500 mb-2">
            <span class="text-xs font-bold uppercase tracking-wider">Élèves signalés</span>
            <span class="material-symbols-outlined text-orange-500 bg-orange-50 p-1 rounded">person_alert</span>
          </div>
          <div class="flex items-end gap-2">
            <span class="text-2xl font-bold">{{ stats.flaggedStudents }}</span>
            <span class="text-xs text-slate-400 font-medium mb-1 flex items-center">{{ stats.flaggedTrend }}</span>
          </div>
        </div>
        <div class="bg-white dark:bg-slate-900 p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col gap-1">
          <div class="flex items-center justify-between text-slate-500 mb-2">
            <span class="text-xs font-bold uppercase tracking-wider">Retards cumulés</span>
            <span class="material-symbols-outlined text-blue-500 bg-blue-50 p-1 rounded">schedule</span>
          </div>
          <div class="flex items-end gap-2">
            <span class="text-2xl font-bold">{{ stats.totalDelays }}</span>
            <span class="text-xs text-green-500 font-medium mb-1 flex items-center">{{ stats.delaysTrend }}</span>
          </div>
        </div>
      </div>

      <!-- Main Charts Grid -->
      <div class="grid grid-cols-1 gap-6">
        <!-- Top Motifs Card -->
        <div class="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col max-w-2xl">
          <div class="p-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <h3 class="font-bold text-slate-800 dark:text-white">Répartition des types d'incidents</h3>
          </div>
          <div class="p-6 flex flex-col gap-4">
            <div v-if="stats.topMotifs?.length === 0" class="py-10 text-center text-slate-400">
              Aucune donnée d'incident cette semaine
            </div>
            <div v-for="motif in stats.topMotifs" :key="motif.name" class="flex flex-col gap-1">
              <div class="flex justify-between text-xs font-bold">
                <span class="capitalize">{{ motif.name }}</span>
                <span>{{ motif.percentage }}%</span>
              </div>
              <div class="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div class="h-full bg-primary transition-all duration-500" :style="`width: ${motif.percentage}%`"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Section: Absenteeism by Class -->
      <div class="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden">
        <div class="p-5 border-b border-slate-100 dark:border-slate-800">
          <h3 class="font-bold text-slate-800 dark:text-white">Absentéisme par niveau</h3>
        </div>
        <div class="p-0 overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-slate-50 dark:bg-slate-800/50">
                <th class="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Niveau / Classe</th>
                <th class="px-6 py-3 text-xs font-bold text-slate-500 uppercase text-center">Présence Moyenne</th>
                <th class="px-6 py-3 text-xs font-bold text-slate-500 uppercase text-center">Absences</th>
                <th class="px-6 py-3 text-xs font-bold text-slate-500 uppercase text-right">Statut</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
              <tr v-if="stats.absenteeismByLevel?.length === 0">
                <td colspan="4" class="px-6 py-10 text-center text-slate-400">Aucune donnée de présence cette semaine</td>
              </tr>
              <tr v-for="level in stats.absenteeismByLevel" :key="level.level">
                <td class="px-6 py-4 font-medium">{{ level.level }}</td>
                <td class="px-6 py-4 text-center">{{ level.presence }}%</td>
                <td class="px-6 py-4 text-center">{{ level.unjustifiedAbsences }}</td>
                <td class="px-6 py-4 text-right">
                  <span class="px-2 py-1 text-[10px] font-bold rounded" :class="getStatusColor(level.status)">
                    {{ level.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Export Action Footer -->
      <div class="flex justify-end pt-4 pb-12">
        <div class="bg-primary/5 border border-primary/20 p-6 rounded-2xl flex items-center justify-between w-full">
          <div class="flex items-center gap-4">
            <div class="bg-primary text-white p-3 rounded-xl">
              <span class="material-symbols-outlined">print</span>
            </div>
            <div>
              <h4 class="font-bold">Rapport hebdomadaire</h4>
              <p class="text-sm text-slate-500">Téléchargez le récapitulatif des incidents et de l'absentéisme.</p>
            </div>
          </div>
          <button @click="downloadReport" :disabled="isDownloading" class="bg-primary text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-primary/30 hover:scale-[1.02] transition-transform flex items-center gap-2">
            <span v-if="isDownloading" class="material-symbols-outlined animate-spin text-sm">sync</span>
            <span>Télécharger le Rapport Semaine</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import api from '@/services/api'
import Header from '@/components/common/Header.vue'

// Données réactives
const searchQuery = ref('')
const activeTab = ref('overview')
const isLoading = ref(false)
const isDownloading = ref(false)
const currentDate = ref(new Date())

// Statistiques KPI
const stats = ref({
  totalIncidents: 0,
  incidentsTrend: 'Calcul...',
  absenteeismRate: 0,
  absenteeismTrend: 'Calcul...',
  flaggedStudents: 0,
  flaggedTrend: 'Stable',
  totalDelays: 0,
  delaysTrend: 'Calcul...',
  topMotifs: [],
  absenteeismByLevel: []
})

const getWeekRange = (date) => {
  const curr = new Date(date)
  const first = curr.getDate() - curr.getDay() + 1
  const last = first + 6

  const firstday = new Date(new Date(curr).setDate(first))
  firstday.setHours(0, 0, 0, 0)
  
  const lastday = new Date(new Date(curr).setDate(last))
  lastday.setHours(23, 59, 59, 999)

  return { start: firstday, end: lastday }
}

const fetchData = async () => {
  try {
    isLoading.value = true
    const { start, end } = getWeekRange(currentDate.value)
    
    const response = await api.getCPEStats({
      startDate: start.toISOString(),
      endDate: end.toISOString()
    })
    
    stats.value = response.data.data
  } catch (error) {
    console.error('Erreur chargement stats:', error)
  } finally {
    isLoading.value = false
  }
}

const downloadReport = async () => {
  try {
    isDownloading.value = true
    const { start, end } = getWeekRange(currentDate.value)
    
    const response = await api.downloadWeeklyReport({
      startDate: start.toISOString(),
      endDate: end.toISOString()
    })
    
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `rapport_hebdomadaire_${start.toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } catch (error) {
    console.error('Erreur téléchargement rapport:', error)
    alert('Erreur lors du téléchargement du rapport')
  } finally {
    isDownloading.value = false
  }
}

const previousWeek = () => {
  currentDate.value = new Date(new Date(currentDate.value).setDate(currentDate.value.getDate() - 7))
}

const nextWeek = () => {
  currentDate.value = new Date(new Date(currentDate.value).setDate(currentDate.value.getDate() + 7))
}

const getWeekLabel = () => {
  const { start, end } = getWeekRange(currentDate.value)
  return `Du ${start.toLocaleDateString('fr-FR')} au ${end.toLocaleDateString('fr-FR')}`
}

const getStatusColor = (status) => {
  switch (status) {
    case 'Excellent': return 'bg-green-100 text-green-700'
    case 'Normal': return 'bg-blue-100 text-blue-700'
    case 'Vigilance': return 'bg-orange-100 text-orange-700'
    case 'Alerte': return 'bg-red-100 text-red-700'
    default: return 'bg-slate-100 text-slate-700'
  }
}

watch(currentDate, fetchData)

onMounted(fetchData)

</script>
