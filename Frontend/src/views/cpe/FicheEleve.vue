<template>
  <div class="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900">
    <div class="max-w-6xl mx-auto p-8 space-y-6">
      <!-- Back Button -->
      <div class="mb-6">
        <button @click="goBack" class="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors font-medium">
          <span class="material-symbols-outlined">arrow_back</span>
          <span>Retour à la liste des élèves</span>
        </button>
      </div>

      <!-- Student Header Profile -->
      <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div class="flex gap-6 items-center">
            <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-xl size-28 border-4 border-slate-50 dark:border-slate-800 shadow-md" :style="`background-image: url('${student.avatar}')`"></div>
            <div class="flex flex-col">
              <div class="flex items-center gap-3">
                <h2 class="text-slate-900 dark:text-white text-2xl font-extrabold tracking-tight">{{ student.name }}</h2>
                <span class="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">{{ student.status }}</span>
              </div>
              <p class="text-slate-500 dark:text-slate-400 text-base font-medium mt-1">Classe: {{ student.class }} | Né le {{ student.birthDate }} ({{ student.age }} ans)</p>
              <div class="flex items-center gap-4 mt-3">
                <div class="flex items-center gap-1.5 text-sm text-slate-500">
                  <span class="material-symbols-outlined text-sm">call</span>
                  <span>{{ student.phone }}</span>
                </div>
                <div class="flex items-center gap-1.5 text-sm text-slate-500">
                  <span class="material-symbols-outlined text-sm">mail</span>
                  <span>{{ student.email }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap gap-3">
            <button @click="editStudent" class="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-bold rounded-lg flex items-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
              <span class="material-symbols-outlined text-sm">edit</span>
              Modifier
            </button>
            <button @click="contactParents" class="px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg flex items-center gap-2 shadow-sm hover:bg-blue-600 transition-colors">
              <span class="material-symbols-outlined text-sm">send</span>
              Contacter Parents
            </button>
          </div>
        </div>
      </div>

      <!-- Stats Overview -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
          <div class="flex items-center justify-between mb-2">
            <p class="text-slate-500 dark:text-slate-400 text-sm font-medium">Incidents (Trimestre)</p>
            <span class="material-symbols-outlined text-orange-500">warning</span>
          </div>
          <div class="flex items-end gap-2">
            <p class="text-slate-900 dark:text-white text-3xl font-bold">{{ stats.incidents }}</p>
            <p class="text-red-500 text-sm font-semibold mb-1">{{ stats.incidentsTrend }}</p>
          </div>
        </div>
        <div class="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
          <div class="flex items-center justify-between mb-2">
            <p class="text-slate-500 dark:text-slate-400 text-sm font-medium">Heures d'absence</p>
            <span class="material-symbols-outlined text-blue-500">schedule</span>
          </div>
          <div class="flex items-end gap-2">
            <p class="text-slate-900 dark:text-white text-3xl font-bold">{{ stats.absences }}</p>
            <p class="text-green-500 text-sm font-semibold mb-1">{{ stats.absencesTrend }}</p>
          </div>
        </div>
        <div class="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
          <div class="flex items-center justify-between mb-2">
            <p class="text-slate-500 dark:text-slate-400 text-sm font-medium">Moyenne Générale</p>
            <span class="material-symbols-outlined text-purple-500">trending_up</span>
          </div>
          <div class="flex items-end gap-2">
            <p class="text-slate-900 dark:text-white text-3xl font-bold">{{ stats.average }}</p>
            <p class="text-red-500 text-sm font-semibold mb-1">{{ stats.averageTrend }}</p>
          </div>
        </div>
      </div>

      <!-- Main Data Tabs -->
      <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
        <div class="flex border-b border-slate-200 dark:border-slate-800 px-6 bg-slate-50/50 dark:bg-slate-800/20">
          <button @click="activeTab = 'discipline'" class="flex items-center gap-2 border-b-[3px] px-4 py-4 text-sm font-medium tracking-wide transition-colors" :class="activeTab === 'discipline' ? 'border-primary text-primary font-bold' : 'border-transparent text-slate-500 hover:text-primary'">
            <span class="material-symbols-outlined text-sm">gavel</span>
            Discipline
          </button>
          <button @click="activeTab = 'attendance'" class="flex items-center gap-2 border-b-[3px] px-4 py-4 text-sm font-medium tracking-wide transition-colors" :class="activeTab === 'attendance' ? 'border-primary text-primary font-bold' : 'border-transparent text-slate-500 hover:text-primary'">
            <span class="material-symbols-outlined text-sm">event_available</span>
            Assiduité
          </button>
          <button @click="activeTab = 'pedagogy'" class="flex items-center gap-2 border-b-[3px] px-4 py-4 text-sm font-medium tracking-wide transition-colors" :class="activeTab === 'pedagogy' ? 'border-primary text-primary font-bold' : 'border-transparent text-slate-500 hover:text-primary'">
            <span class="material-symbols-outlined text-sm">grade</span>
            Pédagogie
          </button>
        </div>

        <!-- Discipline Content View -->
        <div v-if="activeTab === 'discipline'" class="p-6 space-y-8">
          <!-- Disciplinary History -->
          <div>
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-slate-900 dark:text-white text-lg font-bold">Historique des Incidents</h3>
              <button @click="addIncident" class="text-sm font-bold text-primary hover:underline">+ Nouvel incident</button>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full text-left">
                <thead>
                  <tr class="text-slate-500 text-xs font-bold uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                    <th class="px-4 py-3">Date</th>
                    <th class="px-4 py-3">Nature</th>
                    <th class="px-4 py-3">Rapporteur</th>
                    <th class="px-4 py-3">Sanction</th>
                    <th class="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-50 dark:divide-slate-800">
                  <tr v-for="incident in incidents" :key="incident.id" class="text-sm hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                    <td class="px-4 py-4 font-medium">{{ incident.date }}</td>
                    <td class="px-4 py-4">
                      <span class="inline-block px-2 py-0.5 rounded text-xs font-semibold" :class="getIncidentClass(incident.severity)">
                        {{ incident.nature }}
                      </span>
                    </td>
                    <td class="px-4 py-4 text-slate-500">{{ incident.reporter }}</td>
                    <td class="px-4 py-4">{{ incident.sanction }}</td>
                    <td class="px-4 py-4 text-right">
                      <button @click="viewIncident(incident)" class="text-slate-400 hover:text-primary">
                        <span class="material-symbols-outlined">visibility</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Behavior Comments -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
              <h4 class="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <span class="material-symbols-outlined text-sm">notes</span>
                Observations CPE
              </h4>
              <p class="text-sm text-slate-500 italic">"{{ student.observations }}"</p>
              <div class="mt-4 flex justify-between items-center">
                <span class="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Dernière mise à jour: {{ student.lastUpdate }}</span>
                <button @click="editObservations" class="text-xs font-bold text-primary">Modifier</button>
              </div>
            </div>
            <div class="bg-primary/5 p-4 rounded-xl border border-primary/20">
              <h4 class="text-sm font-bold text-primary mb-3 flex items-center gap-2">
                <span class="material-symbols-outlined text-sm">tips_and_updates</span>
                Actions en cours
              </h4>
              <ul class="text-sm space-y-2">
                <li v-for="action in student.actions" :key="action.id" class="flex items-start gap-2 text-slate-500">
                  <span class="material-symbols-outlined text-sm mt-0.5 text-primary">check_circle</span>
                  <span>{{ action.description }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Attendance Content View -->
        <div v-if="activeTab === 'attendance'" class="p-6">
          <div class="text-center py-12">
            <span class="material-symbols-outlined text-6xl text-slate-300 mb-4">event_available</span>
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2">Suivi de l'assiduité</h3>
            <p class="text-slate-500 dark:text-slate-400">Interface de suivi des absences et retards - À implémenter</p>
          </div>
        </div>

        <!-- Pedagogy Content View -->
        <div v-if="activeTab === 'pedagogy'" class="p-6">
          <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-slate-900 dark:text-white text-lg font-bold">Évolution Scolaire</h3>
              <div class="flex gap-2">
                <span class="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                  <span class="size-2 rounded-full bg-primary"></span>
                  Élève
                </span>
                <span class="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                  <span class="size-2 rounded-full bg-slate-300"></span>
                  Moyenne Classe
                </span>
              </div>
            </div>
            <div class="h-48 w-full relative">
              <!-- Placeholder Chart Visualization -->
              <div class="absolute inset-0 flex items-end justify-between px-4 pb-2">
                <div v-for="i in 8" :key="i" class="h-[60%] w-1 bg-slate-100 dark:bg-slate-800 rounded-t"></div>
              </div>
              <!-- Line Path -->
              <svg class="absolute inset-0 h-full w-full" preserveAspectRatio="none">
                <path d="M 50 120 L 150 90 L 250 110 L 350 100 L 450 130 L 550 80 L 650 110 L 750 95" fill="none" stroke="#197fe6" stroke-linecap="round" stroke-width="3"></path>
                <path d="M 50 100 L 150 105 L 250 100 L 350 102 L 450 105 L 550 100 L 650 98 L 750 101" fill="none" stroke="#cbd5e1" stroke-dasharray="4" stroke-width="2"></path>
              </svg>
            </div>
            <div class="flex justify-between text-[10px] text-slate-500 font-bold uppercase mt-2 px-2">
              <span>Sept</span>
              <span>Oct</span>
              <span>Nov</span>
              <span>Déc</span>
              <span>Jan</span>
              <span>Fév</span>
              <span>Mar</span>
              <span>Avr</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Floating Action Button -->
    <div class="fixed bottom-8 right-8">
      <button @click="addNewAction" class="bg-primary text-white size-14 rounded-full shadow-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-transform">
        <span class="material-symbols-outlined text-3xl">add</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Données réactives
const activeTab = ref('discipline')

// Données de l'élève
const student = ref({
  name: 'Jean Dupont',
  class: '3ème B',
  birthDate: '12/05/2009',
  age: '15',
  status: 'En observation',
  phone: '+33 6 12 34 56 78',
  email: 'parents.dupont@email.com',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPBgIkzseM09Vsg3FSpEb9sKfOLctkjGHW-pSBa3tkPG3twxkyOLg_NkW0QZuAKsNJB2oEWB6wEXH1EvscdWEVKXaLNLUKr0_pouUMnqfuv-19K9aDJVWO6TcA91vN6NTcMRRuWrQEhdoj8Ox-OdwaOxZLmnRoGNmf2qCAaI4yLlv44t5Dvb5w-dkpzEvI-UU7psplN2cJC5BaQl5pGRnrariAWFYt_mBNfclAlYP4EHnPP1dyde4rfwxqHM7BtMxcVpgTEUPMRUg',
  observations: 'Jean semble perturbé depuis le début du 2ème trimestre. Le dialogue avec la famille est ouvert mais les résultats disciplinaires stagnent. À suivre de près.',
  lastUpdate: '20/10/2023',
  actions: [
    {
      id: 1,
      description: 'Tutorat avec un élève de 2nde (Prévu le mardi)'
    },
    {
      id: 2,
      description: 'Contrat de comportement signé (Valide jusqu\'à Noël)'
    }
  ]
})

// Statistiques
const stats = ref({
  incidents: '4',
  incidentsTrend: '+2',
  absences: '14h',
  absencesTrend: '-3h',
  average: '11.5/20',
  averageTrend: '-0.5'
})

// Incidents
const incidents = ref([
  {
    id: 1,
    date: '14/10/2023',
    nature: 'Bavardages répétés',
    severity: 'medium',
    reporter: 'M. Martin (Maths)',
    sanction: 'Observation écrite'
  },
  {
    id: 2,
    date: '28/09/2023',
    nature: 'Insolence grave',
    severity: 'high',
    reporter: 'Mme. Durand (Français)',
    sanction: '2h de retenue'
  },
  {
    id: 3,
    date: '12/09/2023',
    nature: 'Oubli matériel',
    severity: 'low',
    reporter: 'M. Morel (EPS)',
    sanction: 'Avertissement'
  }
])

// Fonctions
const editStudent = () => {
  console.log('Modifier les informations de l\'élève')
}

const contactParents = () => {
  console.log('Contacter les parents')
}

const addIncident = () => {
  console.log('Ajouter un nouvel incident')
}

const viewIncident = (incident) => {
  console.log('Voir les détails de l\'incident:', incident.nature)
}

const editObservations = () => {
  console.log('Modifier les observations CPE')
}

const addNewAction = () => {
  console.log('Ajouter une nouvelle action')
}

const getIncidentClass = (severity) => {
  switch (severity) {
    case 'high': return 'bg-red-100 text-red-700'
    case 'medium': return 'bg-orange-100 text-orange-700'
    case 'low': return 'bg-slate-100 text-slate-700'
    default: return 'bg-slate-100 text-slate-700'
  }
}

const goBack = () => {
  router.push('/cpe/eleves')
}
</script>

<style scoped>
.chart-container {
  height: 200px;
  position: relative;
}
</style>
