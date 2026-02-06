<template>
  <div class="min-h-screen bg-background-light dark:bg-background-dark text-[#0e141b] dark:text-slate-100">
    <!-- Main Content Area -->
    <main class="flex-1 flex flex-col overflow-y-auto">
      <!-- PageHeading -->
      <header class="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 p-8">
        <div class="max-w-5xl mx-auto flex flex-wrap justify-between items-end gap-4">
          <div class="flex flex-col gap-2">
            <div class="flex items-center gap-2 text-primary font-bold text-sm">
              <span class="material-symbols-outlined text-sm">security</span>
              Droits d'Accès et Profil
            </div>
            <h1 class="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-tight">Gestion des Accès & Profil</h1>
            <p class="text-slate-500 dark:text-slate-400 text-base max-w-xl">Configurez les permissions du système et mettez à jour vos informations de sécurité personnelles.</p>
          </div>
          <div class="flex gap-3">
            <button class="flex items-center justify-center rounded-lg h-11 px-6 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
              Réinitialiser
            </button>
            <button class="flex items-center justify-center rounded-lg h-11 px-6 bg-primary text-white text-sm font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20">
              Sauvegarder tout
            </button>
          </div>
        </div>
      </header>
      
      <!-- Tabs Navigation -->
      <div class="bg-white dark:bg-slate-950 sticky top-0 z-10 border-b border-slate-200 dark:border-slate-800">
        <div class="max-w-5xl mx-auto px-8">
          <nav class="flex gap-10">
            <a class="flex items-center gap-2 border-b-4 border-primary text-primary pb-4 pt-6 group">
              <span class="material-symbols-outlined text-[20px] active-icon">security</span>
              <p class="text-sm font-bold tracking-wide">Matrice des Permissions</p>
            </a>
            <a class="flex items-center gap-2 border-b-4 border-transparent text-slate-500 dark:text-slate-400 pb-4 pt-6 hover:text-slate-700 dark:hover:text-slate-200 transition-all">
              <span class="material-symbols-outlined text-[20px]">account_circle</span>
              <p class="text-sm font-bold tracking-wide">Mon Profil Administrateur</p>
            </a>
          </nav>
        </div>
      </div>
      
      <!-- Content Area -->
      <div class="px-8 py-8 max-w-[1200px] w-full mx-auto space-y-8">
        <!-- RBAC Section -->
        <section class="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div class="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
            <h3 class="text-[#0e141b] dark:text-white text-lg font-bold">Contrôle des Accès (RBAC)</h3>
            <div class="flex items-center gap-4">
              <span class="text-xs text-slate-500 font-medium italic">Dernière modification: Il y a 2h</span>
              <div class="flex gap-1">
                <span class="size-3 rounded-full bg-green-500" title="Actif"></span>
                <span class="text-[10px] font-bold text-slate-400 uppercase">Live</span>
              </div>
            </div>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-slate-50 dark:bg-slate-800/50">
                  <th class="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b dark:border-slate-800 w-1/3">Module / Action</th>
                  <th class="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b dark:border-slate-800 text-center">Admin</th>
                  <th class="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b dark:border-slate-800 text-center">Professeurs</th>
                  <th class="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b dark:border-slate-800 text-center">Secrétaire</th>
                  <th class="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b dark:border-slate-800 text-center">Parents</th>
                  <th class="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b dark:border-slate-800 text-center">Élèves</th>
                  <th class="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b dark:border-slate-800 text-center">Conseiller d'Éducation</th>
                  <th class="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b dark:border-slate-800 text-center">Proviseur</th>
                  <th class="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b dark:border-slate-800 text-center">Censeur</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                <!-- Module: Gestion des Élèves -->
                <tr class="bg-primary/5 dark:bg-primary/10">
                  <td class="px-4 py-2 text-xs font-extrabold text-primary uppercase tracking-tight" colspan="9">Gestion des Élèves</td>
                </tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td class="p-4 text-sm font-medium text-slate-700 dark:text-slate-300">Inscrire un nouvel élève</td>
                  <td class="p-4 text-center"><input checked class="rounded border-slate-300 text-primary focus:ring-primary h-5 w-5 cursor-pointer" type="checkbox"/></td>
                  <td class="p-4 text-center"><input class="rounded border-slate-300 text-primary focus:ring-primary h-5 w-5 cursor-pointer" type="checkbox"/></td>
                  <td class="p-4 text-center"><input checked class="rounded border-slate-300 text-primary focus:ring-primary h-5 w-5 cursor-pointer" type="checkbox"/></td>
                  <td class="p-4 text-center"><input class="rounded border-slate-200 bg-slate-100 dark:bg-slate-800 h-5 w-5 opacity-50" disabled type="checkbox"/></td>
                  <td class="p-4 text-center"><input class="rounded border-slate-200 bg-slate-100 dark:bg-slate-800 h-5 w-5 opacity-50" disabled type="checkbox"/></td>
                  <td class="p-4 text-center"><input checked class="rounded border-slate-300 text-primary focus:ring-primary h-5 w-5 cursor-pointer" type="checkbox"/></td>
                  <td class="p-4 text-center"><input checked class="rounded border-slate-300 text-primary focus:ring-primary h-5 w-5 cursor-pointer" type="checkbox"/></td>
                  <td class="p-4 text-center"><input class="rounded border-slate-300 text-primary focus:ring-primary h-5 w-5 cursor-pointer" type="checkbox"/></td>
                </tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td class="p-4 text-sm font-medium text-slate-700 dark:text-slate-300">Modifier dossier médical</td>
                  <td class="p-4 text-center"><input checked class="rounded border-slate-300 text-primary focus:ring-primary h-5 w-5 cursor-pointer" type="checkbox"/></td>
                  <td class="p-4 text-center"><input checked class="rounded border-slate-300 text-primary focus:ring-primary h-5 w-5 cursor-pointer" type="checkbox"/></td>
                  <td class="p-4 text-center"><input class="rounded border-slate-300 text-primary focus:ring-primary h-5 w-5 cursor-pointer" type="checkbox"/></td>
                  <td class="p-4 text-center"><input class="rounded border-slate-200 bg-slate-100 dark:bg-slate-800 h-5 w-5 opacity-50" disabled type="checkbox"/></td>
                  <td class="p-4 text-center"><input class="rounded border-slate-200 bg-slate-100 dark:bg-slate-800 h-5 w-5 opacity-50" disabled type="checkbox"/></td>
                  <td class="p-4 text-center"><input checked class="rounded border-slate-300 text-primary focus:ring-primary h-5 w-5 cursor-pointer" type="checkbox"/></td>
                  <td class="p-4 text-center"><input checked class="rounded border-slate-300 text-primary focus:ring-primary h-5 w-5 cursor-pointer" type="checkbox"/></td>
                  <td class="p-4 text-center"><input class="rounded border-slate-300 text-primary focus:ring-primary h-5 w-5 cursor-pointer" type="checkbox"/></td>
                </tr>
                <!-- Module: Finance -->
                <tr class="bg-primary/5 dark:bg-primary/10">
                  <td class="px-4 py-2 text-xs font-extrabold text-primary uppercase tracking-tight" colspan="9">Finance & Paiements</td>
                </tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td class="p-4 text-sm font-medium text-slate-700 dark:text-slate-300">Voir les rapports de trésorerie</td>
                  <td class="p-4 text-center"><input checked class="rounded border-slate-300 text-primary focus:ring-primary h-5 w-5 cursor-pointer" type="checkbox"/></td>
                  <td class="p-4 text-center"><input class="rounded border-slate-300 text-primary focus:ring-primary h-5 w-5 cursor-pointer" type="checkbox"/></td>
                  <td class="p-4 text-center"><input class="rounded border-slate-300 text-primary focus:ring-primary h-5 w-5 cursor-pointer" type="checkbox"/></td>
                  <td class="p-4 text-center"><input class="rounded border-slate-300 text-primary focus:ring-primary h-5 w-5 cursor-pointer" type="checkbox"/></td>
                  <td class="p-4 text-center"><input class="rounded border-slate-200 bg-slate-100 dark:bg-slate-800 h-5 w-5 opacity-50" disabled type="checkbox"/></td>
                  <td class="p-4 text-center"><input class="rounded border-slate-300 text-primary focus:ring-primary h-5 w-5 cursor-pointer" type="checkbox"/></td>
                  <td class="p-4 text-center"><input checked class="rounded border-slate-300 text-primary focus:ring-primary h-5 w-5 cursor-pointer" type="checkbox"/></td>
                  <td class="p-4 text-center"><input checked class="rounded border-slate-300 text-primary focus:ring-primary h-5 w-5 cursor-pointer" type="checkbox"/></td>
                </tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td class="p-4 text-sm font-medium text-slate-700 dark:text-slate-300">Approuver les remises</td>
                  <td class="p-4 text-center"><input checked class="rounded border-slate-300 text-primary focus:ring-primary h-5 w-5 cursor-pointer" type="checkbox"/></td>
                  <td class="p-4 text-center"><input class="rounded border-slate-200 bg-slate-100 dark:bg-slate-800 h-5 w-5 opacity-50" disabled type="checkbox"/></td>
                  <td class="p-4 text-center"><input class="rounded border-slate-300 text-primary focus:ring-primary h-5 w-5 cursor-pointer" type="checkbox"/></td>
                  <td class="p-4 text-center"><input class="rounded border-slate-200 bg-slate-100 dark:bg-slate-800 h-5 w-5 opacity-50" disabled type="checkbox"/></td>
                  <td class="p-4 text-center"><input class="rounded border-slate-200 bg-slate-100 dark:bg-slate-800 h-5 w-5 opacity-50" disabled type="checkbox"/></td>
                  <td class="p-4 text-center"><input class="rounded border-slate-300 text-primary focus:ring-primary h-5 w-5 cursor-pointer" type="checkbox"/></td>
                  <td class="p-4 text-center"><input checked class="rounded border-slate-300 text-primary focus:ring-primary h-5 w-5 cursor-pointer" type="checkbox"/></td>
                  <td class="p-4 text-center"><input checked class="rounded border-slate-300 text-primary focus:ring-primary h-5 w-5 cursor-pointer" type="checkbox"/></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        
        <!-- Help Banner -->
        <div class="bg-gradient-to-r from-primary to-blue-700 rounded-xl p-6 text-white flex items-center justify-between shadow-lg">
          <div class="flex items-center gap-4">
            <div class="size-12 bg-white/20 rounded-full flex items-center justify-center">
              <span class="material-symbols-outlined text-white text-2xl">help_outline</span>
            </div>
            <div>
              <h4 class="font-bold text-lg">Besoin d'aide pour configurer les accès ?</h4>
              <p class="text-white/80 text-sm">Consultez notre guide de sécurité pour les bonnes pratiques RBAC.</p>
            </div>
          </div>
          <button class="bg-white text-primary font-bold px-5 py-2 rounded-lg hover:bg-slate-100 transition-colors shadow-sm">
            Voir la documentation
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  // Add Material Symbols font
  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);

  // Add Inter font
  const interLink = document.createElement('link');
  interLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap';
  interLink.rel = 'stylesheet';
  document.head.appendChild(interLink);

  // Add custom styles
  const style = document.createElement('style');
  style.textContent = `
    body {
      font-family: 'Inter', sans-serif;
    }
    .material-symbols-outlined {
      font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    }
    .active-icon {
      font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    }
  `;
  document.head.appendChild(style);
});
</script>
