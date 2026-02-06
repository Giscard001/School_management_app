<template>
  <aside class="w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col">
    <div class="p-6">
      <div class="flex items-center gap-3 mb-8">
        <div class="bg-primary size-10 rounded-lg flex items-center justify-center text-white">
          <span class="material-symbols-outlined">school</span>
        </div>
        <h1 class="text-lg font-bold">Vie Scolaire</h1>
      </div>
      <nav class="flex flex-col gap-1">
        <router-link to="/cpe" class="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors" :class="isActive('CPEDashboard') ? 'sidebar-active' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'">
          <span class="material-symbols-outlined">dashboard</span>
          <span class="text-sm font-medium">Tableau de bord</span>
        </router-link>
        <router-link to="/cpe/eleves" class="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors" :class="isActive('CPESuiviEleves') || isActive('CPEFicheEleve') ? 'sidebar-active' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'">
          <span class="material-symbols-outlined">groups</span>
          <span class="text-sm font-medium">Suivi des Élèves</span>
        </router-link>
        <router-link to="/cpe/rapports" class="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors" :class="isActive('CPERapports') ? 'sidebar-active' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'">
          <span class="material-symbols-outlined">report</span>
          <span class="text-sm font-medium">Rapports d'Incidents</span>
        </router-link>

        <router-link to="/cpe/calendrier" class="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors" :class="isActive('CPECalendrier') ? 'sidebar-active' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'">
          <span class="material-symbols-outlined">calendar_today</span>
          <span class="text-sm font-medium">Calendrier</span>
        </router-link>
        <router-link to="/cpe/notifications" class="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors" :class="isActive('CPENotifications') ? 'sidebar-active' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'">
          <span class="material-symbols-outlined">notifications</span>
          <span class="text-sm font-medium">Envoi Notifications</span>
        </router-link>
        <router-link to="/cpe/statistiques" class="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors" :class="isActive('CPERapportsStats') ? 'sidebar-active' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'">
          <span class="material-symbols-outlined">bar_chart</span>
          <span class="text-sm font-medium">Rapports & Statistiques</span>
        </router-link>

        <router-link to="/cpe/profil" class="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors" :class="isActive('CPEProfil') ? 'sidebar-active' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'">
          <span class="material-symbols-outlined">account_circle</span>
          <span class="text-sm font-medium">Mon Profil</span>
        </router-link>
      </nav>
    </div>
    <div class="mt-auto p-4">
      <button @click="$emit('logout')" class="flex w-full items-center justify-center gap-2 rounded-lg h-11 bg-slate-100 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-700 dark:text-slate-300 text-sm font-bold transition-all">
        <span class="material-symbols-outlined text-sm">logout</span>
        <span class="truncate">Déconnexion</span>
      </button>
    </div>
  </aside>
</template>

<script setup>
import { useRoute } from 'vue-router'

// Déclarer les événements émis
defineEmits(['logout'])

const route = useRoute()

const isActive = (routeName) => {
  return route.name === routeName
}
</script>
