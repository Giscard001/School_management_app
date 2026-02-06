<template>
  <aside class="w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col">
    <div class="p-6">
      <div class="flex items-center gap-3 mb-8">
        <div class="bg-primary size-10 rounded-lg flex items-center justify-center text-white">
          <span class="material-symbols-outlined">school</span>
        </div>
        <h1 class="text-lg font-bold">Secrétariat</h1>
      </div>
      <nav class="flex flex-col gap-1">
        <router-link to="/secretaire" class="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors" :class="isActive('SecretaireDashboard') ? 'sidebar-active' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'">
          <span class="material-symbols-outlined">dashboard</span>
          <span class="text-sm font-medium">Tableau de bord</span>
        </router-link>
        <router-link to="/secretaire/bulletins" class="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors" :class="isActive('SecretaireBulletins') ? 'sidebar-active' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'">
          <span class="material-symbols-outlined">print</span>
          <span class="text-sm font-medium">Impression Bulletins</span>
        </router-link>
        <router-link to="/secretaire/registre" class="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors" :class="isActive('SecretaireRegistre') ? 'sidebar-active' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'">
          <span class="material-symbols-outlined">book</span>
          <span class="text-sm font-medium">Registre Distribution</span>
        </router-link>
        <router-link to="/secretaire/archives" class="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors" :class="isActive('SecretaireArchives') ? 'sidebar-active' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'">
          <span class="material-symbols-outlined">archive</span>
          <span class="text-sm font-medium">Archives Scolaires</span>
        </router-link>
        <router-link to="/secretaire/profil" class="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors mb-2" :class="isActive('SecretaireProfil') ? 'sidebar-active' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'">
          <span class="material-symbols-outlined">person</span>
          <span class="text-sm font-medium">Profil</span>
        </router-link>
      </nav>
    </div>
    <div class="p-6 border-t border-slate-200 dark:border-slate-700">
      <router-link to="/login" class="flex items-center gap-3 px-3 py-2 text-red-500 hover:text-red-600 transition-colors">
        <span class="material-symbols-outlined">logout</span>
        <span class="text-sm font-medium">Déconnexion</span>
      </router-link>
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
