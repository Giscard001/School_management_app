<template>
  <div class="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark">
    <div class="max-w-[1200px] mx-auto p-8">
      <!-- Page Heading -->
      <div class="flex flex-wrap justify-between items-end gap-4 mb-8">
        <div class="flex flex-col gap-1">
          <p class="text-[#0e141b] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">Tableau de bord</p>
          <p class="text-[#4e7397] dark:text-slate-400 text-lg font-normal">Vue d'ensemble stratégique de l'établissement</p>
        </div>
        <div class="relative">
          <select v-model="selectedTrimestre" @change="fetchDashboardData" class="appearance-none flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 pr-10 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm text-sm font-medium cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            <option value="Trimestre 1">Trimestre 1 - 2023/2024</option>
            <option value="Trimestre 2">Trimestre 2 - 2023/2024</option>
            <option value="Trimestre 3">Trimestre 3 - 2023/2024</option>
          </select>
          <span class="material-symbols-outlined text-primary absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">calendar_today</span>
        </div>
      </div>

      <!-- Stats/KPI Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

        <div class="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div class="flex justify-between items-start">
            <p class="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-wider">Saisie des notes</p>
            <span class="material-symbols-outlined text-orange-500 bg-orange-500/10 p-2 rounded-lg">edit_note</span>
          </div>
          <p class="text-[#0e141b] dark:text-white tracking-tight text-3xl font-bold leading-tight">{{ kpis.saisieNotes }}%</p>

        </div>
        <div class="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div class="flex justify-between items-start">
            <p class="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-wider">Bulletins en attente</p>
            <span class="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">pending_actions</span>
          </div>
          <p class="text-[#0e141b] dark:text-white tracking-tight text-3xl font-bold leading-tight">{{ kpis.bulletinsAttente }}</p>

        </div>
      </div>



      <!-- Strategic Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Left Column: Operations -->
        <div class="flex flex-col gap-6">
        </div>

        <!-- Right Column: Alerts & Notifications -->
        <div class="flex flex-col gap-6">
          <div class="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
            <h2 class="text-[#0e141b] dark:text-white text-xl font-bold mb-6">Alertes & Notifications</h2>
            <div class="space-y-4">
              <div v-for="alerte in alertes" :key="alerte.id" class="flex items-start gap-3 p-4 rounded-lg border" :class="getAlerteClass(alerte.type)">
                <span class="material-symbols-outlined text-xl" :class="getAlerteIconClass(alerte.type)">{{ alerte.icon }}</span>
                <div class="flex-1">
                  <h4 class="font-bold text-[#0e141b] dark:text-white">{{ alerte.titre }}</h4>
                  <p class="text-sm text-[#4e7397] dark:text-slate-400 mt-1">{{ alerte.description }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
            <h2 class="text-[#0e141b] dark:text-white text-xl font-bold mb-6">Actions rapides</h2>
            <div class="grid grid-cols-2 gap-4">
              <button class="flex flex-col items-center gap-2 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                <span class="material-symbols-outlined text-primary text-2xl">download</span>
                <span class="text-sm font-medium text-[#0e141b] dark:text-white">Export</span>
              </button>

              <router-link to="/proviseur/suivi-activite" class="flex flex-col items-center gap-2 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                <span class="material-symbols-outlined text-primary text-2xl">analytics</span>
                <span class="text-sm font-medium text-[#0e141b] dark:text-white">Stats</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Section Footer info -->
      <div class="mt-12 flex justify-between items-center text-slate-400 text-xs">
        <p> 2024 Lycée Excellence - Système de Pilotage Académique</p>
        <p>Dernière mise à jour : Aujourd'hui à 09:42</p>
      </div>
    </div>

    <!-- Modals -->
    <RelancerRetardatairesModal ref="retardatairesModal" :retardataires="retardatairesList" :stats="kpis" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import RelancerRetardatairesModal from '@/components/modals/RelancerRetardatairesModal.vue'
import api from '@/services/api'

const retardatairesModal = ref(null)
const isLoading = ref(true)
const selectedTrimestre = ref('Trimestre 2')

const kpis = ref({
  tauxReussite: 0,
  tauxReussiteEvolution: '0%',
  saisieNotes: 0,
  saisieNotesEvolution: '0%',
  bulletinsAttente: 0,
  retardataires: 0
})

const activite = ref({
  validationGlobale: 0,
  validationGlobaleDetail: 'Chargement...',
  appreciationsConseil: 0,
  appreciationsConseilDetail: 'Chargement...'
})

const departements = ref([])
const alertes = ref([])
const retardatairesList = ref([])
const enseignants = ref([])

const fetchDashboardData = async () => {
  try {
    isLoading.value = true
    
    // Fetch real notifications (not filtered by trimestre)
    const notifRes = await api.getNotifications()
    alertes.value = notifRes.data.data.slice(0, 5).map(n => ({
      id: n._id,
      titre: n.titre,
      description: n.message,
      type: n.type === 'urgent' ? 'danger' : 'info',
      icon: n.type === 'urgent' ? 'error' : 'info'
    }))
    
    // Fetch dashboard stats filtered by trimestre
    try {
      const dashRes = await api.getProviseurDashboard({ trimestre: selectedTrimestre.value })
      const { data } = dashRes.data
      kpis.value = data.kpis
      activite.value = data.activite
    } catch (err) {
      console.log('Dashboard endpoint not available, using defaults')
      // If endpoint doesn't support trimestre filter yet, just fetch without filter
      try {
        const dashRes = await api.getProviseurDashboard()
        const { data } = dashRes.data
        kpis.value = data.kpis
        activite.value = data.activite
      } catch (err2) {
        console.log('Dashboard endpoint not available')
      }
    }
    
  } catch (error) {
    console.error('Erreur lors du chargement du tableau de bord:', error)
  } finally {
    isLoading.value = false
  }
}

const getAlerteClass = (type) => {
  switch(type) {
    case 'danger': return 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
    case 'warning': return 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800'
    case 'info': return 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
    default: return 'bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700'
  }
}

const getAlerteIconClass = (type) => {
  switch(type) {
    case 'danger': return 'text-red-600'
    case 'warning': return 'text-amber-600'
    case 'info': return 'text-blue-600'
    default: return 'text-slate-600'
  }
}

const openRetardatairesModal = () => {
  retardatairesModal.value?.openModal()
}

onMounted(() => {
  fetchDashboardData()
})
</script>