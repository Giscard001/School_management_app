<template>
  <div class="flex-1 ml-72">
    <!-- Header -->
    <header class="h-16 flex items-center justify-between px-8 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10">
      <h2 class="text-lg font-bold">Tableau de bord</h2>
      <div class="flex items-center gap-6">
        <div class="relative hidden lg:block">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
          <input v-model="searchQuery" class="bg-slate-100 dark:bg-slate-800 border-none rounded-lg pl-10 pr-4 py-2 text-sm w-64 focus:ring-2 focus:ring-primary" placeholder="Rechercher..." type="text"/>
        </div>
        <div class="flex items-center gap-3">
          <button class="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg relative">
            <span class="material-symbols-outlined">notifications</span>
            <span class="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button class="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
            <span class="material-symbols-outlined">settings</span>
          </button>
          <div class="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-2"></div>
          <div class="flex items-center gap-3">
            <div class="text-right hidden sm:block">
              <p class="text-sm font-semibold">{{ userProfile.name }}</p>
              <p class="text-xs text-slate-500">{{ userProfile.role }}</p>
            </div>
            <div class="size-10 rounded-full bg-cover bg-center border-2 border-primary/20" :style="`background-image: url('${userProfile.avatar}')`"></div>
          </div>
        </div>
      </div>
    </header>

    <!-- Page Content -->
    <div class="p-8 max-w-6xl mx-auto">
      <div class="mb-8">
        <h1 class="text-3xl font-bold tracking-tight mb-2">Bonjour, {{ userProfile.name }}</h1>
        <p class="text-slate-500 dark:text-slate-400">Voici un aperçu de la progression de vos enfants pour aujourd'hui.</p>
      </div>

      <!-- Children Grid Summary -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Child Card 1: Léo -->
        <div class="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-md transition-shadow">
          <div class="p-6">
            <div class="flex items-start justify-between mb-6">
              <div class="flex items-center gap-4">
                <div class="size-16 rounded-xl bg-cover bg-center border-4 border-primary/10" :style="`background-image: url('${children[0].avatar}')`"></div>
                <div>
                  <h3 class="text-xl font-bold">{{ children[0].name }}</h3>
                  <p class="text-sm text-slate-500">{{ children[0].class }}</p>
                </div>
              </div>
              <div class="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {{ children[0].status }}
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4 mb-6">
              <div class="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl text-center border border-slate-100 dark:border-slate-800">
                <p class="text-xs text-slate-500 uppercase font-semibold mb-1">Moyenne actuelle</p>
                <p class="text-3xl font-bold text-primary">{{ children[0].average }}<span class="text-sm text-slate-400 font-normal">/20</span></p>
              </div>
              <div class="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl text-center border border-slate-100 dark:border-slate-800">
                <p class="text-xs text-slate-500 uppercase font-semibold mb-1">Dernière note</p>
                <p class="text-2xl font-bold text-green-600">{{ children[0].lastNote }}<span class="text-sm text-slate-400 font-normal">/20</span></p>
                <p class="text-[10px] text-slate-400">{{ children[0].lastNoteSubject }} ({{ children[0].lastNoteDate }})</p>
              </div>
            </div>
            <div class="space-y-4">
              <div class="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-900/30 rounded-lg">
                <span class="material-symbols-outlined text-yellow-600">event</span>
                <div class="flex-1">
                  <p class="text-xs font-bold text-yellow-800 dark:text-yellow-400 uppercase">Prochain événement</p>
                  <p class="text-sm font-medium">{{ children[0].nextEvent }}</p>
                </div>
              </div>
              <div class="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-lg">
                <span class="material-symbols-outlined text-slate-400">info</span>
                <div class="flex-1">
                  <p class="text-xs font-bold text-slate-500 uppercase">Note récente</p>
                  <p class="text-sm font-medium">{{ children[0].recentNote }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-slate-50 dark:bg-slate-800/50 px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <button @click="viewReport(children[0])" class="text-sm font-semibold text-primary hover:underline">Voir le bulletin complet</button>
            <button @click="sendMessage(children[0])" class="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
              <span class="material-symbols-outlined text-slate-500">mail</span>
            </button>
          </div>
        </div>

        <!-- Child Card 2: Léa -->
        <div class="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-md transition-shadow">
          <div class="p-6">
            <div class="flex items-start justify-between mb-6">
              <div class="flex items-center gap-4">
                <div class="size-16 rounded-xl bg-cover bg-center border-4 border-pink-100 dark:border-pink-900/30" :style="`background-image: url('${children[1].avatar}')`"></div>
                <div>
                  <h3 class="text-xl font-bold">{{ children[1].name }}</h3>
                  <p class="text-sm text-slate-500">{{ children[1].class }}</p>
                </div>
              </div>
              <div class="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {{ children[1].status }}
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4 mb-6">
              <div class="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl text-center border border-slate-100 dark:border-slate-800">
                <p class="text-xs text-slate-500 uppercase font-semibold mb-1">Moyenne actuelle</p>
                <p class="text-3xl font-bold text-primary">{{ children[1].average }}<span class="text-sm text-slate-400 font-normal">/20</span></p>
              </div>
              <div class="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl text-center border border-slate-100 dark:border-slate-800">
                <p class="text-xs text-slate-500 uppercase font-semibold mb-1">Dernière note</p>
                <p class="text-2xl font-bold text-green-600">{{ children[1].lastNote }}<span class="text-sm text-slate-400 font-normal">/20</span></p>
                <p class="text-[10px] text-slate-400">{{ children[1].lastNoteSubject }} ({{ children[1].lastNoteDate }})</p>
              </div>
            </div>
            <div class="space-y-4">
              <div class="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 rounded-lg">
                <span class="material-symbols-outlined text-blue-600">groups</span>
                <div class="flex-1">
                  <p class="text-xs font-bold text-blue-800 dark:text-blue-400 uppercase">Prochain événement</p>
                  <p class="text-sm font-medium">{{ children[1].nextEvent }}</p>
                </div>
              </div>
              <div class="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-lg">
                <span class="material-symbols-outlined text-slate-400">info</span>
                <div class="flex-1">
                  <p class="text-xs font-bold text-slate-500 uppercase">Note récente</p>
                  <p class="text-sm font-medium">{{ children[1].recentNote }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-slate-50 dark:bg-slate-800/50 px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <button @click="viewReport(children[1])" class="text-sm font-semibold text-primary hover:underline">Voir le bulletin complet</button>
            <button @click="sendMessage(children[1])" class="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
              <span class="material-symbols-outlined text-slate-500">mail</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Recent School Notifications Section -->
      <div class="mt-12">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-bold">Dernières actualités de l'école</h2>
          <button @click="viewAllNews" class="text-sm font-semibold text-primary hover:underline">Tout voir</button>
        </div>
        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl divide-y divide-slate-100 dark:divide-slate-800">
          <div v-for="notification in notifications" :key="notification.id" class="p-4 flex gap-4 items-start">
            <div class="size-10 rounded-full flex items-center justify-center shrink-0" :class="getNotificationIconColor(notification.type)">
              <span class="material-symbols-outlined">{{ notification.icon }}</span>
            </div>
            <div class="flex-1">
              <div class="flex justify-between items-start mb-1">
                <h4 class="text-sm font-bold">{{ notification.title }}</h4>
                <span class="text-xs text-slate-400">{{ notification.time }}</span>
              </div>
              <p class="text-sm text-slate-600 dark:text-slate-400">{{ notification.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Données réactives
const searchQuery = ref('')

// Profil utilisateur
const userProfile = ref({
  name: 'Mme Martin',
  role: 'Parent',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCk5k2Bb9T_EEiNFi4qJN6OU49kSHVDvSVaJZ5t87-mFo0qFwS5CcyREdGrKd28aYRGqtm8wO8LcGvj9ULGI3g7rbDG0dq3BSNT9-FasFEJKb70eDOl1vLUgNU3GwPWrtfdXnVZCk1fu0JazN-cOEQK6hUT7PFy1e5PMnXnxq5fsqbr6c1hKmVo6Jq9LG8vLZNoiK2ScjmDgh_eCSMJTPbSPDmbyI_7vo3LLGQUcm6L7cO0cxOKtBxRHZ2a9RNRTkBZprzQyI5AUy4'
})

// Enfants
const children = ref([
  {
    name: 'Léo Martin',
    class: 'Classe de 4ème B',
    status: 'Actif',
    average: '15.5',
    lastNote: '18',
    lastNoteSubject: 'Histoire-Géo',
    lastNoteDate: 'Hier',
    nextEvent: 'Contrôle de Mathématiques - Demain',
    recentNote: 'Anglais : 14/20 (Lundi)',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGDeQC6PlSiThmMf52JLvnFAyd9Q6ku9ZzHohcG8zPKE2F6OucQ893e5GatwsT8IOseFpgiSV9QYI_3H_bKkEdCMLVOxb2R2m0FXt7BxNGFoo6ixW1Gu0MtQQ2wBrWnWLIEPyuy4DG9CLAYmlxI2WQbpDABzCMJOSRv5icIWjm7OuO0em1iA7vMwsAaYlmvF5qCuBnlQPWHWchpJWF3yQUMQ7FCPYPg2VrLSb9D7uB6xEJlnyxlD_4aW_mRWueYLPhHcpblXchCMQ'
  },
  {
    name: 'Léa Martin',
    class: 'Classe de CM2',
    status: 'Excellence',
    average: '17.8',
    lastNote: '19',
    lastNoteSubject: 'Dictée',
    lastNoteDate: 'Ce matin',
    nextEvent: 'Sortie Scolaire - Vendredi',
    recentNote: 'Sciences : 16.5/20 (Vendredi)',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjnNS75dp0kGUdG9ri0UKWqh39_18NgCMhl3JUVsex_6nDwFpbZqifQL53NHyC-wK5n-OURYrOmGopN6MaQ4niZkO1KFEJ2Yi2866PExSJh1XnXHyEXD-6MrnoOM3bdAJ0h7wy1zRn63xaHNfTF1sXZt1JaT3SX6cD1kIPgAlVZvsUUY8ObHKelUd1XfPc5hBjQ8B0zDLGhainCIB5U1LTkotm4Wy7uv7YBdeAoJ4rompDNFE5XusawjXYykUzrBK5PZePOCHJLlc'
  }
])

// Notifications
const notifications = ref([
  {
    id: 1,
    type: 'info',
    icon: 'campaign',
    title: 'Réunion Parents-Professeurs',
    time: 'Il y a 2 heures',
    description: 'La réunion trimestrielle pour le collège aura lieu le jeudi 14 mars à 18h00 dans l\'amphithéâtre.'
  },
  {
    id: 2,
    type: 'info',
    icon: 'restaurant',
    title: 'Menu de la cantine - Semaine prochaine',
    time: 'Hier',
    description: 'Le menu de la semaine du 11 au 15 mars est désormais disponible dans l\'onglet documents.'
  }
])

// Fonctions utilitaires
const getNotificationIconColor = (type) => {
  switch (type) {
    case 'info': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600'
    case 'success': return 'bg-green-100 dark:bg-green-900/30 text-green-600'
    case 'warning': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600'
    case 'error': return 'bg-red-100 dark:bg-red-900/30 text-red-600'
    default: return 'bg-slate-100 dark:bg-slate-800 text-slate-600'
  }
}

// Fonctions d'action
const viewReport = (child) => {
  console.log('Voir le bulletin complet de:', child.name)
}

const sendMessage = (child) => {
  console.log('Envoyer un message à:', child.name)
}

const viewAllNews = () => {
  console.log('Voir toutes les actualités')
}
</script>
