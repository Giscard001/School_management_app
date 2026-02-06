<template>
  <aside class="w-72 flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 shrink-0">
    <div class="p-6 flex flex-col h-full">

      <!-- Navigation Links -->
      <nav class="flex flex-col gap-1 flex-grow">
        <router-link to="/censeur" class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors" :class="isActive('CenseurDashboard') ? 'bg-primary text-white font-medium shadow-sm shadow-primary/20' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-[#0e141b] dark:text-slate-300'">
          <span class="material-symbols-outlined">dashboard</span>
          <p class="text-sm">Tableau de bord</p>
        </router-link>
        <router-link to="/censeur/notes" class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-[#0e141b] dark:text-slate-300 transition-colors" :class="isActive('CenseurNotes') ? 'bg-primary text-white font-medium shadow-sm shadow-primary/20' : ''">
          <span class="material-symbols-outlined">description</span>
          <p class="text-sm">Gestion des Notes</p>
        </router-link>
        <router-link to="/censeur/deblocage" class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-[#0e141b] dark:text-slate-300 transition-colors" :class="isActive('CenseurDeblocage') ? 'bg-primary text-white font-medium shadow-sm shadow-primary/20' : ''">
          <span class="material-symbols-outlined">lock_open</span>
          <p class="text-sm">Déblocage des Notes</p>
          <span class="ml-auto bg-primary/20 text-primary text-[10px] px-1.5 py-0.5 rounded-full">5</span>
        </router-link>
        <router-link to="/censeur/validation-evaluations" class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-[#0e141b] dark:text-slate-300 transition-colors" :class="isActive('CenseurValidationEvaluations') ? 'bg-primary text-white font-medium shadow-sm shadow-primary/20' : ''">
          <span class="material-symbols-outlined">rule</span>
          <p class="text-sm">Validation Évaluations</p>
        </router-link>
        <router-link to="/censeur/classes" class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-[#0e141b] dark:text-slate-300 transition-colors" :class="isActive('CenseurClasses') ? 'bg-primary text-white font-medium shadow-sm shadow-primary/20' : ''">
          <span class="material-symbols-outlined">school</span>
          <p class="text-sm">Classes & Filières</p>
        </router-link>
        <router-link to="/censeur/professeurs" class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-[#0e141b] dark:text-slate-300 transition-colors" :class="isActive('CenseurProfesseurs') ? 'bg-primary text-white font-medium shadow-sm shadow-primary/20' : ''">
          <span class="material-symbols-outlined">person</span>
          <p class="text-sm">Gestion des Professeurs</p>
        </router-link>
        <router-link to="/censeur/profil" class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-[#0e141b] dark:text-slate-300 transition-colors" :class="isActive('CenseurProfil') ? 'bg-primary text-white font-medium shadow-sm shadow-primary/20' : ''">
          <span class="material-symbols-outlined">account_circle</span>
          <p class="text-sm">Profil</p>
        </router-link>
      </nav>
      <!-- Bottom Actions -->
      <div class="mt-auto space-y-2">
        <button @click="$emit('openModal')" class="flex w-full items-center justify-center gap-2 rounded-lg h-11 bg-primary hover:bg-primary/90 text-white text-sm font-bold shadow-md transition-all">
          <span class="material-symbols-outlined text-sm">add</span>
          <span class="truncate">Nouvelle Session</span>
        </button>
        <button @click="$emit('logout')" class="flex w-full items-center justify-center gap-2 rounded-lg h-11 bg-slate-100 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-700 dark:text-slate-300 text-sm font-bold transition-all">
          <span class="material-symbols-outlined text-sm">logout</span>
          <span class="truncate">Déconnexion</span>
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { useRoute } from 'vue-router'

// Déclarer les événements émis
defineEmits(['openModal', 'logout'])

const route = useRoute()

const isActive = (routeName) => {
  return route.name === routeName
}
</script>
