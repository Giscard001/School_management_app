<template>
  <aside class="w-72 flex flex-col bg-white dark:bg-slate-900 border-r border-[#e7edf3] dark:border-slate-800">
    <div class="p-6 flex flex-col h-full justify-between">
      <div class="flex flex-col gap-8">
        <div class="flex items-center gap-3 px-2">
          <div class="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
            <span class="material-symbols-outlined">school</span>
          </div>
          <h1 class="text-lg font-bold tracking-tight">EduManager</h1>
        </div>

        <nav class="flex flex-col gap-1">
          <router-link to="/professeur" class="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors" :class="isActive('ProfesseurDashboard') ? 'bg-primary/10 text-primary' : 'hover:bg-slate-100 dark:hover:bg-slate-800'">
            <span class="material-symbols-outlined">dashboard</span>
            <p class="text-sm font-medium">Tableau de bord</p>
          </router-link>
          <router-link to="/professeur/emploi-temps" class="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors" :class="isActive('ProfesseurEmploiTemps') ? 'bg-primary/10 text-primary' : 'hover:bg-slate-100 dark:hover:bg-slate-800'">
            <span class="material-symbols-outlined">calendar_today</span>
            <p class="text-sm font-medium">Emploi du temps</p>
          </router-link>
          <router-link to="/professeur/saisie-notes" class="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors" :class="isActive('ProfesseurSaisieNotes') ? 'bg-primary/10 text-primary' : 'hover:bg-slate-100 dark:hover:bg-slate-800'">
            <span class="material-symbols-outlined">edit_note</span>
            <p class="text-sm font-medium">Saisie des notes</p>
          </router-link>
          <router-link to="/professeur/classes" class="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors" :class="isActive('ProfesseurClasses') ? 'bg-primary/10 text-primary' : 'hover:bg-slate-100 dark:hover:bg-slate-800'">
            <span class="material-symbols-outlined">groups</span>
            <p class="text-sm font-medium">Mes Classes</p>
          </router-link>

          <router-link to="/professeur/profil" class="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors" :class="isActive('ProfesseurProfil') ? 'bg-primary/10 text-primary' : 'hover:bg-slate-100 dark:hover:bg-slate-800'">
            <span class="material-symbols-outlined">person</span>
            <p class="text-sm font-medium">Profil</p>
          </router-link>
        </nav>
      </div>
      <div class="flex flex-col gap-1">
        <router-link to="/login" class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors">
          <span class="material-symbols-outlined">logout</span>
          <p class="text-sm font-medium">Déconnexion</p>
        </router-link>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const isActive = (routeName) => {
  return route.name === routeName
}
</script>
