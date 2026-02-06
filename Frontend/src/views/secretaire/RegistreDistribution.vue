<template>
  <div class="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
    <div class="px-8 py-6 flex flex-wrap justify-between items-center gap-4">
      <div class="flex min-w-72 flex-col gap-1">
        <h1 class="text-slate-900 dark:text-white text-3xl font-black leading-tight tracking-[-0.033em]">Distribution des Bulletins</h1>
        <p class="text-slate-500 dark:text-slate-400 text-sm font-normal">Enregistrez la remise des livrets scolaires et l'émargement des parents.</p>
      </div>
      <div class="flex gap-3">
        <button class="flex items-center gap-2 rounded-lg h-10 px-4 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm font-bold hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
          <span class="material-symbols-outlined text-lg">print</span>
          <span>Imprimer vierge</span>
        </button>
        <button class="flex items-center gap-2 rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
          <span class="material-symbols-outlined text-lg">picture_as_pdf</span>
          <span>Exporter en PDF</span>
        </button>
      </div>
    </div>

    <div class="px-8 pb-4 flex gap-3 flex-wrap items-center">
      <button class="flex h-9 items-center gap-x-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 hover:border-primary transition-all group">
        <span class="material-symbols-outlined text-slate-400 group-hover:text-primary text-xl">class</span>
        <p class="text-slate-700 dark:text-slate-300 text-sm font-medium">Classe: <span class="text-slate-900 dark:text-white">3ème A</span></p>
        <span class="material-symbols-outlined text-slate-400 text-lg">expand_more</span>
      </button>
      <button class="flex h-9 items-center gap-x-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 hover:border-primary transition-all group">
        <span class="material-symbols-outlined text-slate-400 group-hover:text-primary text-xl">calendar_today</span>
        <p class="text-slate-700 dark:text-slate-300 text-sm font-medium">Trimestre: <span class="text-slate-900 dark:text-white">1er</span></p>
        <span class="material-symbols-outlined text-slate-400 text-lg">expand_more</span>
      </button>
      <button class="flex h-9 items-center gap-x-2 rounded-lg bg-primary/10 border border-primary/20 px-3 transition-all">
        <span class="material-symbols-outlined text-primary text-xl">pending_actions</span>
        <p class="text-primary text-sm font-medium">Statut: En attente</p>
        <span class="material-symbols-outlined text-primary text-lg">close</span>
      </button>
    </div>

    <div class="px-8 pb-10">
      <div class="bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Matricule</th>
                <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Nom & Prénom</th>
                <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Date de remise</th>
                <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Parent Présent</th>
                <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Statut / Signature</th>
                <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                <td class="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">#2023A001</td>
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div class="size-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold">AB</div>
                    <span class="text-sm font-medium text-slate-700 dark:text-slate-200">Abidjan Bakary</span>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <input class="bg-transparent border-none focus:ring-0 text-sm p-0 text-slate-600 dark:text-slate-400" type="date" value="2023-12-15"/>
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center gap-2">
                    <span class="inline-flex items-center justify-center size-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                      <span class="material-symbols-outlined text-sm font-bold">check</span>
                    </span>
                    <span class="text-xs font-medium text-slate-500">Oui (Père)</span>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">Signé</span>
                </td>
                <td class="px-6 py-4 text-right">
                  <button class="text-slate-400 hover:text-primary transition-colors">
                    <span class="material-symbols-outlined">edit</span>
                  </button>
                </td>
              </tr>
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                <td class="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">#2023A042</td>
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div class="size-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold">KD</div>
                    <span class="text-sm font-medium text-slate-700 dark:text-slate-200">Keita Diarra</span>
                  </div>
                </td>
                <td class="px-6 py-4 text-slate-400 italic text-sm">-- / -- / ----</td>
                <td class="px-6 py-4">
                  <div class="flex items-center gap-2">
                    <span class="inline-flex items-center justify-center size-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400">
                      <span class="material-symbols-outlined text-sm font-bold">horizontal_rule</span>
                    </span>
                    <span class="text-xs font-medium text-slate-400">Non spécifié</span>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400 border border-amber-200 dark:border-amber-800">En attente</span>
                </td>
                <td class="px-6 py-4 text-right">
                  <button class="bg-primary text-white text-xs font-bold py-1 px-3 rounded hover:bg-primary/90 transition-colors">Valider remise</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="px-6 py-4 bg-slate-50 dark:bg-slate-800/30 flex justify-between items-center border-t border-slate-200 dark:border-slate-800">
          <p class="text-sm text-slate-500">Affichage de <span class="font-bold text-slate-900 dark:text-white">2</span> sur <span class="font-bold text-slate-900 dark:text-white">32</span> élèves</p>
          <div class="flex gap-2">
            <button class="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-400 hover:text-primary transition-colors">
              <span class="material-symbols-outlined">chevron_left</span>
            </button>
            <button class="p-2 rounded-lg border border-primary bg-primary text-white shadow-md shadow-primary/20">
              <span class="sm font-bold px-1">1</span>
            </button>
            <button class="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
              <span class="sm font-bold px-1">2</span>
            </button>
            <button class="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-400 hover:text-primary transition-colors">
              <span class="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);

  const lexendLink = document.createElement('link');
  lexendLink.href = 'https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700;800;900&display=swap';
  lexendLink.rel = 'stylesheet';
  document.head.appendChild(lexendLink);

  const style = document.createElement('style');
  style.textContent = `
    body { font-family: 'Lexend', sans-serif; }
    .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
  `;
  document.head.appendChild(style);
});
</script>
