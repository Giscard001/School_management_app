<template>
  <div class="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 p-8">
    <div class="max-w-5xl mx-auto">
      <!-- Page Heading -->
      <div class="flex flex-wrap justify-between items-end gap-3 mb-8">
        <div class="flex flex-col gap-1">
          <h1 class="text-slate-900 dark:text-white text-3xl font-extrabold tracking-tight">Mes Bulletins Scolaires</h1>
          <p class="text-slate-500 dark:text-slate-400 text-base">Année scolaire 2023-2024</p>
        </div>
        <div class="flex gap-2">
          <button class="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
            <span class="material-symbols-outlined text-lg">print</span>
            Imprimer tout
          </button>
        </div>
      </div>

      <!-- Stats / Quick Glance -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div class="flex flex-col gap-2 rounded-xl p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <div class="flex items-center justify-between">
            <p class="text-slate-500 dark:text-slate-400 text-sm font-medium">Moyenne Générale</p>
            <span class="material-symbols-outlined text-primary bg-primary/10 p-1.5 rounded-lg">trending_up</span>
          </div>
          <p class="text-slate-900 dark:text-white text-3xl font-bold">15.5<span class="text-lg text-slate-400 font-normal">/20</span></p>
          <p class="text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-1">
            <span class="material-symbols-outlined text-xs">arrow_upward</span>
            +0.5 pts vs T1
          </p>
        </div>
        <div class="flex flex-col gap-2 rounded-xl p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <div class="flex items-center justify-between">
            <p class="text-slate-500 dark:text-slate-400 text-sm font-medium">Conseil de Classe</p>
            <span class="material-symbols-outlined text-amber-500 bg-amber-500/10 p-1.5 rounded-lg">military_tech</span>
          </div>
          <p class="text-slate-900 dark:text-white text-3xl font-bold">Félicitations</p>
          <p class="text-slate-500 dark:text-slate-400 text-xs font-normal">Validé le 24 Mars 2024</p>
        </div>
        <div class="flex flex-col gap-2 rounded-xl p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <div class="flex items-center justify-between">
            <p class="text-slate-500 dark:text-slate-400 text-sm font-medium">Rang dans la classe</p>
            <span class="material-symbols-outlined text-purple-500 bg-purple-500/10 p-1.5 rounded-lg">leaderboard</span>
          </div>
          <p class="text-slate-900 dark:text-white text-3xl font-bold">3<span class="text-lg text-slate-400 font-normal">ème</span></p>
          <p class="text-slate-500 dark:text-slate-400 text-xs font-normal">Sur 28 élèves</p>
        </div>
      </div>

      <!-- Section: Historique -->
      <div class="mb-4">
        <h2 class="text-slate-900 dark:text-white text-xl font-bold tracking-tight">Historique des bulletins</h2>
      </div>

      <!-- Table -->
      <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-slate-50 dark:bg-slate-800/50 border-bottom border-slate-200 dark:border-slate-800">
                <th class="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Période</th>
                <th class="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Date de publication</th>
                <th class="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">État</th>
                <th class="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td class="px-6 py-5">
                  <div class="flex items-center gap-3">
                    <div class="size-8 rounded bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">T2</div>
                    <span class="text-sm font-semibold text-slate-900 dark:text-white">Trimestre 2</span>
                  </div>
                </td>
                <td class="px-6 py-5">
                  <span class="text-sm text-slate-600 dark:text-slate-400">22 Mars 2024</span>
                </td>
                <td class="px-6 py-5">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                    Validé
                  </span>
                </td>
                <td class="px-6 py-5 text-right">
                  <button class="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-xs font-bold hover:bg-primary/90 transition-all shadow-sm shadow-primary/20">
                    <span class="material-symbols-outlined text-sm">download</span>
                    Télécharger PDF
                  </button>
                </td>
              </tr>
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td class="px-6 py-5">
                  <div class="flex items-center gap-3">
                    <div class="size-8 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 font-bold text-xs">T1</div>
                    <span class="text-sm font-semibold text-slate-900 dark:text-white">Trimestre 1</span>
                  </div>
                </td>
                <td class="px-6 py-5">
                  <span class="text-sm text-slate-600 dark:text-slate-400">15 Déc. 2023</span>
                </td>
                <td class="px-6 py-5">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                    Validé
                  </span>
                </td>
                <td class="px-6 py-5 text-right">
                  <button class="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                    <span class="material-symbols-outlined text-sm">download</span>
                    Télécharger PDF
                  </button>
                </td>
              </tr>
              <tr class="opacity-60 bg-slate-50/30 dark:bg-slate-900/30">
                <td class="px-6 py-5">
                  <div class="flex items-center gap-3">
                    <div class="size-8 rounded bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 font-bold text-xs">T3</div>
                    <span class="text-sm font-semibold text-slate-400">Trimestre 3</span>
                  </div>
                </td>
                <td class="px-6 py-5 text-slate-400 text-sm italic">—</td>
                <td class="px-6 py-5">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-500">
                    En attente
                  </span>
                </td>
                <td class="px-6 py-5 text-right">
                  <span class="text-xs text-slate-400 font-medium italic">Bientôt disponible</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Subtle Banner / Notification -->
      <div class="mt-8 flex items-center gap-4 p-4 rounded-xl bg-primary/5 border border-primary/10">
        <div class="size-10 flex-shrink-0 bg-primary/10 rounded-full flex items-center justify-center text-primary">
          <span class="material-symbols-outlined">info</span>
        </div>
        <div class="flex-1">
          <p class="text-sm font-semibold text-slate-900 dark:text-white">Relevé de notes provisoire</p>
          <p class="text-xs text-slate-600 dark:text-slate-400">Vous pouvez consulter vos notes en temps réel avant la clôture du trimestre dans l'onglet "Notes & Devoirs".</p>
        </div>
        <router-link to="/eleve/notes" class="text-primary text-xs font-bold hover:underline">Accéder aux notes</router-link>
      </div>
    </div>
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

  // Add Lexend font
  const lexendLink = document.createElement('link');
  lexendLink.href = 'https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700;800;900&display=swap';
  lexendLink.rel = 'stylesheet';
  document.head.appendChild(lexendLink);

  // Add custom styles
  const style = document.createElement('style');
  style.textContent = `
    body {
      font-family: 'Lexend', sans-serif;
    }
    .material-symbols-outlined {
      font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    }
    .material-symbols-outlined.fill {
      font-variation-settings: 'FILL' 1;
    }
  `;
  document.head.appendChild(style);
});
</script>
