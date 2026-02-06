<template>
  <div class="flex-1 flex flex-col overflow-hidden">
    <!-- Common Header -->
    <Header title="Suivi & Tri des Incidents">
      <template #search>
        <div class="relative w-64">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
          <input v-model="searchQuery" class="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg pl-9 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary" placeholder="Rechercher un élève..." type="text"/>
        </div>
      </template>
    </Header>


    <!-- Grid Content -->
    <div class="flex-1 flex overflow-hidden p-6 gap-6 bg-slate-50 dark:bg-background-dark">
      <!-- Column 1: Urgents -->
      <section class="flex-1 flex flex-col min-w-[320px]">
        <div class="flex items-center justify-between mb-4 px-2">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-red-500">error</span>
            <h3 class="font-bold text-slate-800 dark:text-slate-200">Urgents</h3>
            <span class="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">{{ urgentIncidents.length }}</span>
          </div>
        </div>
        <div class="flex-1 flex flex-col gap-4 overflow-y-auto no-scrollbar">
          <div v-if="isLoading" class="flex justify-center py-10">
            <span class="material-symbols-outlined animate-spin text-primary">sync</span>
          </div>
          <div v-for="incident in urgentIncidents" :key="incident._id" 
               @click="selectIncident(incident)"
               class="bg-white dark:bg-slate-900 p-4 rounded-xl border-l-4 border-red-500 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
               :class="selectedIncident?._id === incident._id ? 'ring-2 ring-primary' : ''">
            <div class="flex justify-between items-start mb-2">
              <span class="text-[10px] font-bold text-red-500 uppercase tracking-widest bg-red-500/10 px-2 py-0.5 rounded">Priorité Haute</span>
              <span class="text-[10px] text-slate-400">{{ formatDate(incident.date) }}</span>
            </div>
            <h4 class="font-bold text-base">{{ incident.eleve?.prenom }} {{ incident.eleve?.nom }} ({{ incident.eleve?.classe?.niveau }} {{ incident.eleve?.classe?.section }})</h4>
            <div class="flex flex-col gap-1 mt-1">
              <p class="text-xs font-bold text-slate-700 dark:text-slate-300">{{ incident.titre }}</p>
              <p class="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 italic">"{{ incident.description }}"</p>
            </div>
            <div class="mt-4 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-sm text-slate-400">location_on</span>
                <span class="text-xs text-slate-500">{{ incident.lieu || 'Non spécifié' }}</span>
              </div>
              <span class="text-xs font-bold" :class="getStatusColor(incident.statut)">{{ incident.statut }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Column 2: À suivre -->
      <section class="flex-1 flex flex-col min-w-[320px]">
        <div class="flex items-center justify-between mb-4 px-2">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-amber-500">pending_actions</span>
            <h3 class="font-bold text-slate-800 dark:text-slate-200">À suivre</h3>
            <span class="bg-amber-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">{{ followupIncidents.length }}</span>
          </div>
        </div>
        <div class="flex-1 flex flex-col gap-4 overflow-y-auto no-scrollbar">
          <div v-if="isLoading" class="flex justify-center py-10">
            <span class="material-symbols-outlined animate-spin text-primary">sync</span>
          </div>
          <div v-for="incident in followupIncidents" :key="incident._id"
               @click="selectIncident(incident)"
               class="bg-white dark:bg-slate-900 p-4 rounded-xl border-l-4 border-amber-500 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
               :class="selectedIncident?._id === incident._id ? 'ring-2 ring-primary' : ''">
            <div class="flex justify-between items-start mb-2">
              <span class="text-[10px] font-bold text-amber-500 uppercase tracking-widest bg-amber-500/10 px-2 py-0.5 rounded">{{ incident.type }}</span>
              <span class="text-[10px] text-slate-400">{{ formatDate(incident.date) }}</span>
            </div>
            <h4 class="font-bold text-base">{{ incident.eleve?.prenom }} {{ incident.eleve?.nom }} ({{ incident.eleve?.classe?.niveau }} {{ incident.eleve?.classe?.section }})</h4>
            <div class="flex flex-col gap-1 mt-1">
              <p class="text-xs font-bold text-slate-700 dark:text-slate-300">{{ incident.titre }}</p>
              <p class="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 italic">"{{ incident.description }}"</p>
            </div>
            <div class="mt-4 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-sm text-slate-400">person</span>
                <span class="text-xs text-slate-500">Par {{ incident.reportedBy?.prenom }} {{ incident.reportedBy?.nom }}</span>
              </div>
              <span class="text-xs font-bold" :class="getStatusColor(incident.statut)">{{ incident.statut }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Column 3: Detailed View (Selection) -->
      <section class="w-[450px] bg-white dark:bg-slate-900 flex flex-col rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
        <div class="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
          <div>
            <p class="text-[10px] font-bold text-primary uppercase tracking-widest">Incident #{{ selectedIncident?._id?.substring(0, 8) || 'SÉLECTION' }}</p>
            <h3 class="font-bold text-xl">Détails du rapport</h3>
          </div>
          <button @click="selectedIncident = null" class="text-slate-400 hover:text-slate-600">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <div v-if="selectedIncident" class="flex-1 overflow-y-auto p-6 space-y-6">
          <!-- Header Details -->
          <div class="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
            <div class="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
              {{ selectedIncident.eleve?.prenom?.[0] }}{{ selectedIncident.eleve?.nom?.[0] }}
            </div>
            <div>
              <h4 class="font-bold text-base">{{ selectedIncident.eleve?.prenom }} {{ selectedIncident.eleve?.nom }}</h4>
              <p class="text-sm text-slate-500">Classe : {{ selectedIncident.eleve?.classe?.niveau }} {{ selectedIncident.eleve?.classe?.section }}</p>
            </div>
          </div>

          <!-- Incident Content -->
          <div class="space-y-4">
            <div>
              <h5 class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Titre / Motif</h5>
              <p class="text-sm font-bold text-slate-800 dark:text-slate-200">{{ selectedIncident.titre }}</p>
            </div>
            <div>
              <h5 class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Description de l'incident</h5>
              <p class="text-sm leading-relaxed text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-slate-700 italic">
                "{{ selectedIncident.description }}"
              </p>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <h5 class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Lieu</h5>
                <p class="text-xs text-slate-700 dark:text-slate-300">{{ selectedIncident.lieu || 'Non spécifié' }}</p>
              </div>
              <div>
                <h5 class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Signalé par</h5>
                <p class="text-xs text-slate-700 dark:text-slate-300">{{ selectedIncident.reportedBy?.prenom }} {{ selectedIncident.reportedBy?.nom }} ({{ selectedIncident.reportedBy?.role }})</p>
              </div>
            </div>
          </div>

          <!-- Actions Taken -->
          <div v-if="selectedIncident.actionsPrises?.length > 0">
            <h5 class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Actions déjà entreprises</h5>
            <ul class="space-y-2">
              <li v-for="(action, idx) in selectedIncident.actionsPrises" :key="idx" class="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                <span class="material-symbols-outlined text-green-500 text-sm">check_circle</span>
                {{ action }}
              </li>
            </ul>
          </div>
        </div>

        <div v-else class="flex-1 flex items-center justify-center p-6">
          <div class="text-center">
            <span class="material-symbols-outlined text-4xl text-slate-300 mb-4">assignment</span>
            <p class="text-slate-500">Sélectionnez un incident pour voir les détails</p>
          </div>
        </div>

        <!-- Footer Action Button -->
        <div v-if="selectedIncident && selectedIncident.statut !== 'Traité'" class="p-6 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
          <button @click="closeIncident" class="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg shadow-primary/20">
            <span class="material-symbols-outlined">task_alt</span>
            Clôturer le dossier
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '@/services/api'
import Header from '@/components/common/Header.vue'

// Données réactives
const searchQuery = ref('')
const selectedIncident = ref(null)
const incidents = ref([])
const isLoading = ref(false)



const fetchIncidents = async () => {
  try {
    isLoading.value = true
    const response = await api.getIncidents()
    incidents.value = response.data.data
  } catch (error) {
    console.error('Erreur chargement incidents:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchIncidents()
})

// Filtrage
const filteredIncidents = computed(() => {
  return incidents.value.filter(incident => {
    const studentName = `${incident.eleve?.prenom} ${incident.eleve?.nom}`.toLowerCase()
    return studentName.includes(searchQuery.value.toLowerCase())
  })
})

// Séparation des incidents
const urgentIncidents = computed(() => {
  return filteredIncidents.value.filter(i => 
    i.priorite === 'Haute' && (i.statut === 'Non traité' || i.statut === 'En cours')
  )
})

const followupIncidents = computed(() => {
  return filteredIncidents.value.filter(i => 
    i.priorite !== 'Haute' || i.statut === 'Traité'
  )
})

// Fonctions utilitaires
const getStatusColor = (status) => {
  switch (status) {
    case 'En cours': return 'text-primary'
    case 'Non traité': return 'text-slate-400'
    case 'Traité': return 'text-green-500'
    default: return 'text-slate-400'
  }
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })
}

// Fonctions d'action
const selectIncident = (incident) => {
  selectedIncident.value = incident
}

const closeIncident = async () => {
  if (!selectedIncident.value) return
  if (!confirm('Voulez-vous clôturer ce dossier d\'incident ?')) return

  try {
    await api.updateIncident(selectedIncident.value._id, { statut: 'Traité' })
    await fetchIncidents()
    selectedIncident.value = null
  } catch (error) {
    console.error('Erreur clôture incident:', error)
    alert('Erreur lors de la clôture de l\'incident')
  }
}
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>