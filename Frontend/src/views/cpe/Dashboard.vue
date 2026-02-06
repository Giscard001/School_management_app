<template>
  <div class="flex-1 flex flex-col overflow-hidden">
    <!-- Common Header -->
    <Header title="Tableau de bord CPE" />
    
    <!-- Scrollable Content -->
    <div class="flex-1 overflow-y-auto p-8 space-y-6">
      <!-- Section Title -->
      <div>
        <h2 class="text-2xl font-bold text-slate-900 dark:text-white">Vue d'ensemble et Alertes</h2>
        <p class="text-slate-500 text-sm">Synthèse des indicateurs scolaires</p>
      </div>


      <!-- Stats Widgets -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-2">
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-slate-500">Taux de présence</span>
            <span class="material-symbols-outlined text-primary">analytics</span>
          </div>
          <p class="text-3xl font-bold text-slate-900 dark:text-white">{{ stats.presence }}%</p>
        </div>
        <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-2">
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-slate-500">Incidents signalés</span>
            <span class="material-symbols-outlined text-red-500">warning</span>
          </div>
          <p class="text-3xl font-bold text-slate-900 dark:text-white">{{ stats.incidents }}</p>
        </div>
        <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-2">
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-slate-500">Retards (Ce matin)</span>
            <span class="material-symbols-outlined text-amber-500">schedule</span>
          </div>
          <p class="text-3xl font-bold text-slate-900 dark:text-white">{{ stats.retards }}</p>
        </div>
      </div>

      <!-- Main Grid Content -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Incident Feed -->
        <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
          <div class="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <h3 class="font-bold text-lg">Incidents récents</h3>
            <button @click="voirTousIncidents" class="text-primary text-sm font-medium hover:underline">Voir tout</button>
          </div>
          <div class="p-4 space-y-4">
            <div v-if="incidents.length === 0" class="py-10 text-center text-slate-400 text-sm italic">
              Aucun incident signalé récemment
            </div>
            <div v-for="incident in incidents" :key="incident.id" class="flex items-start gap-4 p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors border-l-4" :class="getSeverityBorderColor(incident.severity)">
              <div class="h-10 w-10 rounded-full bg-slate-200 bg-cover bg-center shrink-0" :style="`background-image: url('${incident.avatar}')`"></div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-bold truncate">{{ incident.eleve }} ({{ incident.classe }})</p>
                <p class="text-xs text-slate-500">{{ incident.description }}</p>
                <p class="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-wider">{{ incident.time }}</p>
              </div>
              <span class="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-tighter shrink-0" :class="getSeverityBadgeColor(incident.severity)">
                {{ incident.severity }}
              </span>
            </div>
          </div>
        </div>

        <!-- Upcoming Class Councils -->
        <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
          <div class="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <h3 class="font-bold text-lg">Conseils de classe à venir</h3>
            <button @click="voirCalendrier" class="text-primary text-sm font-medium hover:underline">Calendrier complet</button>
          </div>
          <div class="p-6 space-y-6">
            <div v-if="councils.length === 0" class="py-6 text-center text-slate-400 text-sm italic">
              Aucun conseil de classe prévu dans le planning
            </div>
            <div v-else class="relative pl-8 border-l-2 border-slate-200 dark:border-slate-800 space-y-8">
              <div v-for="council in councils" :key="council.id" class="relative">
                <div class="absolute -left-[41px] top-0 h-4 w-4 rounded-full border-4 border-white dark:border-slate-900 shadow-sm" :class="council.isToday ? 'bg-primary' : 'bg-slate-300'"></div>
                <div class="flex justify-between items-start">
                  <div>
                    <p class="text-sm font-bold">{{ council.classe }}</p>
                    <p class="text-xs text-slate-500">{{ council.professeur }}</p>
                  </div>
                  <div class="text-right">
                    <p class="text-sm font-bold">{{ council.date }}</p>
                    <p class="text-xs text-slate-500">{{ council.time }} • {{ council.salle }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-auto p-4 bg-slate-50 dark:bg-slate-800/50 text-center">
            <p class="text-xs text-slate-500">{{ councils.length }} conseils prévus pour cette semaine</p>
          </div>
        </div>
      </div>

      <!-- Quick Actions / Additional Sections -->
      <div class="bg-primary/5 rounded-xl border border-primary/20 p-6">
        <h3 class="text-primary font-bold mb-4 flex items-center gap-2">
          <span class="material-symbols-outlined">bolt</span>
          Actions rapides
        </h3>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <button @click="contacterParents" class="bg-white dark:bg-slate-900 p-4 rounded-lg border border-primary/10 flex flex-col items-center gap-2 hover:shadow-md transition-shadow">
            <span class="material-symbols-outlined text-primary text-3xl">mail</span>
            <span class="text-xs font-bold text-center">Contacter Parents</span>
          </button>
          <button @click="genererRapport" class="bg-white dark:bg-slate-900 p-4 rounded-lg border border-primary/10 flex flex-col items-center gap-2 hover:shadow-md transition-shadow">
            <span class="material-symbols-outlined text-primary text-3xl">print</span>
            <span class="text-xs font-bold text-center">Rapport Semaine</span>
          </button>
          <button @click="fichesEleves" class="bg-white dark:bg-slate-900 p-4 rounded-lg border border-primary/10 flex flex-col items-center gap-2 hover:shadow-md transition-shadow">
            <span class="material-symbols-outlined text-primary text-3xl">assignment_ind</span>
            <span class="text-xs font-bold text-center">Fiches Elèves</span>
          </button>
          <button @click="exportCSV" class="bg-white dark:bg-slate-900 p-4 rounded-lg border border-primary/10 flex flex-col items-center gap-2 hover:shadow-md transition-shadow">
            <span class="material-symbols-outlined text-primary text-3xl">download</span>
            <span class="text-xs font-bold text-center">Export CSV</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Header from '@/components/common/Header.vue'
import api from '@/services/api'

const router = useRouter()
const isLoading = ref(true)

// Données réactives
const currentDate = ref(new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }))

// Statistiques
const stats = ref({
  presence: 0,
  presenceChange: 0,
  incidents: 0,
  incidentsChange: 0,
  retards: 0,
  retardsChange: 0
})

// Incidents récents
const incidents = ref([])

// Conseils de classe à venir
const councils = ref([])

const fetchDashboardData = async () => {
  try {
    isLoading.value = true
    const response = await api.getCPEDashboard()
    const data = response.data.data
    stats.value = data.stats
    incidents.value = data.incidents
    councils.value = data.councils
  } catch (error) {
    console.error('Erreur chargement dashboard:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchDashboardData()
})

// Fonctions utilitaires
const getSeverityBorderColor = (severity) => {
  switch (severity) {
    case 'Sévère': return 'border-red-500'
    case 'Moyen': return 'border-amber-500'
    case 'Mineur': return 'border-blue-500'
    default: return 'border-slate-500'
  }
}

const getSeverityBadgeColor = (severity) => {
  switch (severity) {
    case 'Sévère': return 'bg-red-100 text-red-700'
    case 'Moyen': return 'bg-amber-100 text-amber-700'
    case 'Mineur': return 'bg-blue-100 text-blue-700'
    default: return 'bg-slate-100 text-slate-700'
  }
}

// Fonctions d'action
const voirTousIncidents = () => {
  router.push('/cpe/incidents')
}

const voirCalendrier = () => {
  router.push('/cpe/calendrier')
}

const contacterParents = () => {
  router.push('/cpe/notifications')
}

const genererRapport = () => {
  router.push('/cpe/stats')
}

const fichesEleves = () => {
  router.push('/cpe/eleves')
}

const exportCSV = () => {
  router.push('/cpe/eleves')
}
</script>
