<template>
  <div class="flex-1 flex flex-col overflow-y-auto">
    <!-- Top Navigation Bar -->
    <header class="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-8 py-4 sticky top-0 z-10">
      <div class="flex items-center gap-4">
        <h2 class="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Vue d'Ensemble Vie Scolaire</h2>
      </div>
      <div class="flex items-center gap-6">
        <div class="relative max-w-xs">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-lg">search</span>
          <input v-model="searchQuery" class="w-64 bg-slate-100 dark:bg-slate-800 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/50 placeholder:text-slate-500" placeholder="Rechercher un élève..." type="text"/>
        </div>
        <div class="flex items-center gap-2 border-l border-slate-200 dark:border-slate-800 pl-6">
          <button class="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg relative">
            <span class="material-symbols-outlined">notifications</span>
            <span class="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
          </button>
          <button class="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
            <span class="material-symbols-outlined">schedule</span>
          </button>
          <div class="h-8 w-8 rounded-full bg-slate-200 ml-2 overflow-hidden border border-slate-300">
            <img alt="User Profile" class="w-full h-full object-cover" :src="userProfile.avatar"/>
          </div>
        </div>
      </div>
    </header>

    <div class="p-8 space-y-8">
      <!-- KPI Stats Section -->
      <section>
        <div class="flex flex-wrap gap-4">
          <div class="flex-1 min-w-[200px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-xl">
            <div class="flex justify-between items-start mb-2">
              <p class="text-slate-500 text-sm font-medium">Élèves en Retenue</p>
              <span class="material-symbols-outlined text-primary">groups</span>
            </div>
            <div class="flex items-baseline gap-3">
              <h3 class="text-3xl font-bold text-slate-900 dark:text-white">{{ stats.detentionStudents }}</h3>
              <span class="text-green-600 text-sm font-bold">{{ stats.detentionTrend }}</span>
            </div>
            <p class="text-xs text-slate-500 mt-1">vs hier même heure</p>
          </div>
          <div class="flex-1 min-w-[200px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-xl">
            <div class="flex justify-between items-start mb-2">
              <p class="text-slate-500 text-sm font-medium">Surveillants Actifs</p>
              <span class="material-symbols-outlined text-primary">badge</span>
            </div>
            <div class="flex items-baseline gap-3">
              <h3 class="text-3xl font-bold text-slate-900 dark:text-white">{{ stats.activeSupervisors }}</h3>
              <span class="text-red-600 text-sm font-bold">{{ stats.supervisorsTrend }}</span>
            </div>
            <p class="text-xs text-slate-500 mt-1">Équipiers en pause: {{ stats.supervisorsOnBreak }}</p>
          </div>
          <div class="flex-1 min-w-[200px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-xl">
            <div class="flex justify-between items-start mb-2">
              <p class="text-slate-500 text-sm font-medium">Alertes Récentes</p>
              <span class="material-symbols-outlined text-primary">warning</span>
            </div>
            <div class="flex items-baseline gap-3">
              <h3 class="text-3xl font-bold text-slate-900 dark:text-white">{{ stats.recentAlerts }}</h3>
              <span class="text-slate-500 text-sm font-bold">{{ stats.alertsTrend }}</span>
            </div>
            <p class="text-xs text-slate-500 mt-1">Priorité élevée</p>
          </div>
        </div>
      </section>

      <!-- Monitoring & Supervision Grid -->
      <section>
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span class="material-symbols-outlined">videocam</span>
            Points de Vigilance & Monitoring
          </h2>
          <button @click="viewAllCameras" class="text-sm text-primary font-medium hover:underline">Voir toutes les caméras</button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div v-for="camera in cameras" :key="camera.id" class="bg-white dark:bg-slate-900 border rounded-xl overflow-hidden group" :class="getCameraBorderClass(camera.status)">
            <div class="aspect-video bg-slate-200 dark:bg-slate-800 relative">
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div class="absolute top-3 left-3 flex items-center gap-2">
                <span class="w-2 h-2 rounded-full animate-pulse" :class="getCameraStatusColor(camera.status)"></span>
                <span class="text-white text-xs font-bold uppercase tracking-wider">{{ camera.status }}</span>
              </div>
              <div class="absolute bottom-3 left-3">
                <p class="text-white text-sm font-bold">{{ camera.location }}</p>
              </div>
            </div>
            <div class="p-4 flex justify-between items-center" :class="getCameraBgClass(camera.status)">
              <div class="flex flex-col">
                <p class="text-xs text-slate-500 uppercase font-bold">Statut</p>
                <p class="text-sm font-medium" :class="getCameraTextColor(camera.status)">{{ camera.statusText }}</p>
              </div>
              <button @click="viewCamera(camera)" class="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg" :class="camera.status === 'alert' ? 'bg-orange-500 text-white' : ''">
                <span class="material-symbols-outlined">{{ camera.actionIcon }}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Bottom Layout: Detentions & Activity Feed -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Detention Table (2/3 width) -->
        <div class="lg:col-span-2 space-y-4">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span class="material-symbols-outlined">history_edu</span>
              Élèves en Retenue (Actuellement)
            </h2>
            <div class="flex gap-2">
              <span class="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">Salle 102 - 12 élèves</span>
              <span class="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 text-xs font-bold rounded-full">Salle 104 - 2 élèves</span>
            </div>
          </div>
          <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
            <table class="w-full text-left text-sm">
              <thead class="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th class="px-6 py-3 font-bold text-slate-900 dark:text-white">Élève</th>
                  <th class="px-6 py-3 font-bold text-slate-900 dark:text-white">Classe</th>
                  <th class="px-6 py-3 font-bold text-slate-900 dark:text-white">Durée restante</th>
                  <th class="px-6 py-3 font-bold text-slate-900 dark:text-white">Motif</th>
                  <th class="px-6 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
                <tr v-for="student in detentionStudents" :key="student.id" class="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td class="px-6 py-4 font-medium">{{ student.name }}</td>
                  <td class="px-6 py-4">{{ student.class }}</td>
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-2">
                      <div class="w-16 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div class="bg-primary h-full transition-all duration-300" :style="`width: ${student.progress}%`"></div>
                      </div>
                      <span class="text-xs">{{ student.remainingTime }}</span>
                    </div>
                  </td>
                  <td class="px-6 py-4 text-slate-500">{{ student.reason }}</td>
                  <td class="px-6 py-4 text-right">
                    <button @click="viewStudentDetails(student)" class="text-primary hover:text-primary/70 transition-colors">Détails</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Activity Feed (1/3 width) -->
        <div class="space-y-4">
          <h2 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span class="material-symbols-outlined">rss_feed</span>
            Activité Récente
          </h2>
          <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-6">
            <div v-for="(activity, index) in recentActivities" :key="index" class="flex gap-4 relative">
              <div v-if="index < recentActivities.length - 1" class="absolute left-[11px] top-6 bottom-[-24px] w-0.5 bg-slate-100 dark:bg-slate-800"></div>
              <div class="w-6 h-6 rounded-full flex items-center justify-center z-10" :class="getActivityBgClass(activity.type)">
                <span class="material-symbols-outlined text-sm" :class="getActivityIconColor(activity.type)">{{ activity.icon }}</span>
              </div>
              <div class="flex-1">
                <p class="text-sm text-slate-900 dark:text-white font-medium">{{ activity.title }}</p>
                <p class="text-xs text-slate-500">{{ activity.author }} • {{ activity.time }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Staff Status Section -->
      <section class="pb-8">
        <h2 class="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <span class="material-symbols-outlined">person_pin_circle</span>
          Disponibilité des Surveillants
        </h2>
        <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          <div v-for="supervisor in supervisors" :key="supervisor.id" class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl flex items-center gap-3" :class="supervisor.status === 'absent' ? 'opacity-60' : ''">
            <div class="relative">
              <img alt="Surveillant" class="w-10 h-10 rounded-full" :src="supervisor.avatar"/>
              <span class="absolute bottom-0 right-0 w-3 h-3 border-2 border-white dark:border-slate-900 rounded-full" :class="getSupervisorStatusColor(supervisor.status)"></span>
            </div>
            <div>
              <p class="text-xs font-bold">{{ supervisor.name }}</p>
              <p class="text-[10px] text-slate-500">{{ supervisor.location }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Données réactives
const searchQuery = ref('')

// Profil utilisateur
const userProfile = ref({
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMvUtOGN9T9UaMI_jcrhwbaoeBbPPQnLcVaHFjvXmQTLEJkYbiToHc-WWpwH13W7NTgFByB8p0DSFvH5ddBCgEu0wtELfYNj7U561xM5rqVAahfMztere018zNvIpveOtnb7JgUA_chZ2vsFmwUrERCMuExlZE690nfJKunUEIn1w-eikeFtSq7rA1cUuG_sPJQW5XVgE8RQ-Qlefu7tQhxFOxn1s7oPDSqUzz7w3OmrLBoHuibKHYIrrxkg9g5BuDXqtHoDD5F7s'
})

// Statistiques KPI
const stats = ref({
  detentionStudents: 14,
  detentionTrend: '+5%',
  activeSupervisors: 8,
  supervisorsTrend: '-2%',
  supervisorsOnBreak: 2,
  recentAlerts: 2,
  alertsTrend: 'Stable'
})

// Caméras de surveillance
const cameras = ref([
  {
    id: 1,
    location: 'Cour de récréation',
    status: 'live',
    statusText: 'Calme',
    actionIcon: 'zoom_in'
  },
  {
    id: 2,
    location: 'Couloir Nord - Etage 2',
    status: 'alert',
    statusText: 'Affluence inhabituelle',
    actionIcon: 'visibility'
  },
  {
    id: 3,
    location: 'Hall Central',
    status: 'patrol',
    statusText: 'Surveillance agent #04',
    actionIcon: 'radio'
  }
])

// Élèves en retenue
const detentionStudents = ref([
  {
    id: 1,
    name: 'Marc Lefebvre',
    class: '3ème B',
    remainingTime: '45 min',
    progress: 45,
    reason: 'Retard répété'
  },
  {
    id: 2,
    name: 'Léa Martin',
    class: '4ème D',
    remainingTime: '12 min',
    progress: 80,
    reason: 'Bavardages'
  },
  {
    id: 3,
    name: 'Julien Dupont',
    class: '6ème A',
    remainingTime: '1h 10m',
    progress: 20,
    reason: 'Insubordination'
  }
])

// Activités récentes
const recentActivities = ref([
  {
    type: 'success',
    icon: 'check_circle',
    title: 'Appel terminé - 4ème B',
    author: 'M. Robert',
    time: 'Il y a 5 min'
  },
  {
    type: 'warning',
    icon: 'warning',
    title: 'Signalement incident - Cour',
    author: 'Mme. Dubois',
    time: 'Il y a 12 min'
  },
  {
    type: 'info',
    icon: 'info',
    title: 'Prise de poste : Agent #04',
    author: 'Hall Central',
    time: 'Il y a 28 min'
  },
  {
    type: 'more',
    icon: 'more_horiz',
    title: '',
    author: '',
    time: ''
  }
])

// Surveillants
const supervisors = ref([
  {
    id: 1,
    name: 'Mme. Sarah',
    location: 'Cour Sud',
    status: 'active',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4rH4IEfBDPk4T6zWbcCcRQS3MPECElDp5rEC_-ovieZFP8lN-4Hv1JsHrH9r5R1VY02ePc7ZDSFu9hFN9lZymam7ITLqhiHm53JttmvpR3OnqfHmGl-ol1s5cf1eUZwhprFUho4sWyx9YoyhX_vovNU8GPpR8xnGcx7cboAUXoGObnB8APmKBqWDhf0sIoP8TTcJwukVUtkUy1z6gj_N8lqxcrMHK174cN8AEm47C8eVoCc5f1RXqofZW9Gls6n8aY4awhjUeX-c'
  },
  {
    id: 2,
    name: 'M. Marc',
    location: 'Cantine',
    status: 'active',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwPXv7qBNV5tY3uMPfavZI0xcbBj4SPBVKHEAzKXlrTJEcuPppuI6qwHB2zjCvsqbVqN5aiX2YZOO9W_O07QSgnRnMQEk1VXERpmKSTHpBFwLwBNJnF4SrX-aMqk34Aer8x2X0kYqtTxh58GbO1S6uqjDPILqlgeiQE0ARdDiM2vYbZV9jPQA6y7Oqy9W0Aa-RFaQvSa3CrvdlhKOflnkzYSc3Zdd05iZzxXBgKaZ4fRYiNVxZCMQooeSq7vdUdtHSeNrF9xzmhwI'
  },
  {
    id: 3,
    name: 'Mme. Elsa',
    location: 'En pause',
    status: 'break',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApIO7QJWAR6wUhLKt0lHtEB9MXePgmXKqv69dvVo8N12WpYTNB4lXMPPYNlHk1VK1Tm0j68hfDoZ2JU5NKZjQ-YUkSlwODka4PC6U1An2W9etdtpIT4Fg2YohTgnQZjnXNnmxoPxf7TtkQLyCs6I23wEv3dMQFrbJjlrT3DRgsHaySYQLnzdr4Q82a-J7tHsHF2zlr29U0-vQaogre16U2z3Sd3Ih3HTHHZ39oMMXQy75QpXp1uPN7t3_ZM4juTY1D6vovzY12hs4'
  },
  {
    id: 4,
    name: 'M. Thomas',
    location: 'Absent',
    status: 'absent',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCo308mdVhBnlomyWu8oJPDY0cGbKsnn7YtzS0EUcgeh6CjUyx324i3ZEeKUWp-QKg2vIO8z4caySKi-1ynH8UI3LaOwvxBObshx39pDVUxtJ-k9XBSyVJJPfBmXQ6mPwDKBFyj8INdt2SJN5P2z5_gI9YXpJFCon4fnHH24go_-jTOFvq9M8K5zzLO-j-HmIpZL5qsqntjju_LDi6yjwwZTs33oqkYBV_jHy-NTA_CzIK-8ysSoCT2VD9qmGTF_v3dUqTHBYHqSAk'
  }
])

// Fonctions utilitaires
const getCameraBorderClass = (status) => {
  switch (status) {
    case 'alert': return 'border-orange-200 dark:border-orange-900/50'
    default: return 'border-slate-200 dark:border-slate-800'
  }
}

const getCameraStatusColor = (status) => {
  switch (status) {
    case 'live': return 'bg-green-500'
    case 'alert': return 'bg-orange-500'
    case 'patrol': return 'bg-slate-400'
    default: return 'bg-slate-400'
  }
}

const getCameraBgClass = (status) => {
  switch (status) {
    case 'alert': return 'bg-orange-50 dark:bg-orange-900/10'
    default: return ''
  }
}

const getCameraTextColor = (status) => {
  switch (status) {
    case 'alert': return 'text-orange-600'
    case 'live': return 'text-green-600'
    default: return 'text-slate-500'
  }
}

const getActivityBgClass = (type) => {
  switch (type) {
    case 'success': return 'bg-green-100 dark:bg-green-900/30'
    case 'warning': return 'bg-orange-100 dark:bg-orange-900/30'
    case 'info': return 'bg-primary/10'
    case 'more': return 'bg-slate-100 dark:bg-slate-800'
    default: return 'bg-slate-100 dark:bg-slate-800'
  }
}

const getActivityIconColor = (type) => {
  switch (type) {
    case 'success': return 'text-green-600'
    case 'warning': return 'text-orange-600'
    case 'info': return 'text-primary'
    case 'more': return 'text-slate-500'
    default: return 'text-slate-500'
  }
}

const getSupervisorStatusColor = (status) => {
  switch (status) {
    case 'active': return 'bg-green-500'
    case 'break': return 'bg-orange-500'
    case 'absent': return 'bg-slate-300'
    default: return 'bg-slate-300'
  }
}

// Fonctions d'action
const viewAllCameras = () => {
  console.log('Voir toutes les caméras')
}

const viewCamera = (camera) => {
  console.log('Voir caméra:', camera.location)
}

const viewStudentDetails = (student) => {
  console.log('Voir détails élève:', student.name)
}
</script>
