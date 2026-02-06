<template>
  <div class="min-h-screen bg-background-light dark:bg-background-dark text-[#0e141b] dark:text-white p-8">
    <div class="max-w-[1400px] mx-auto">
      <div class="flex flex-col gap-1 mb-8">
        <h1 class="text-3xl font-black text-[#0e141b] dark:text-white tracking-tight">Bonjour, Sarah !</h1>
        <p class="text-[#4e7397] dark:text-slate-400 font-medium">Voici le récapitulatif de l'activité administrative aujourd'hui.</p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-[#d0dbe7] dark:border-slate-700 shadow-sm">
          <div class="flex justify-between items-start mb-4">
            <div class="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <span class="material-symbols-outlined text-blue-600">description</span>
            </div>
            <span class="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">+5%</span>
          </div>
          <h3 class="text-sm font-semibold text-[#4e7397] dark:text-slate-400">Bulletins prêts</h3>
          <p class="text-3xl font-black text-[#0e141b] dark:text-white mt-1">452</p>
          <p class="text-[10px] text-[#4e7397] mt-2 font-medium">Session du 2ème Trimestre</p>
        </div>
        <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-[#d0dbe7] dark:border-slate-700 shadow-sm">
          <div class="flex justify-between items-start mb-4">
            <div class="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <span class="material-symbols-outlined text-purple-600">how_to_reg</span>
            </div>
            <span class="text-xs font-bold text-[#4e7397] bg-slate-50 px-2 py-1 rounded">Journalier</span>
          </div>
          <h3 class="text-sm font-semibold text-[#4e7397] dark:text-slate-400">Émargements saisis</h3>
          <p class="text-3xl font-black text-[#0e141b] dark:text-white mt-1">94%</p>
          <p class="text-[10px] text-[#4e7397] mt-2 font-medium">Taux de complétion actuel</p>
        </div>
        <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-[#d0dbe7] dark:border-slate-700 shadow-sm">
          <div class="flex justify-between items-start mb-4">
            <div class="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <span class="material-symbols-outlined text-green-600">history</span>
            </div>
          </div>
          <h3 class="text-sm font-semibold text-[#4e7397] dark:text-slate-400">Volume d'activité</h3>
          <p class="text-3xl font-black text-[#0e141b] dark:text-white mt-1">1,2k</p>
          <p class="text-[10px] text-[#4e7397] mt-2 font-medium">Documents gérés / 7j</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 space-y-6">
          <!-- Impressions groupées par classe -->
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-bold text-[#0e141b] dark:text-white">Impressions groupées par classe</h2>
            <button class="text-primary text-sm font-bold hover:underline">Voir tout</button>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between group hover:border-primary transition-all">
              <div class="flex items-center gap-4">
                <div class="size-12 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center font-bold text-primary">TS1</div>
                <div>
                  <p class="font-bold text-sm">Terminale S1</p>
                  <p class="text-[11px] text-[#4e7397]">32 élèves • Prêt</p>
                </div>
              </div>
              <button class="size-10 rounded-full flex items-center justify-center bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                <span class="material-symbols-outlined">print</span>
              </button>
            </div>
            <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between group hover:border-primary transition-all">
              <div class="flex items-center gap-4">
                <div class="size-12 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center font-bold text-primary">3A</div>
                <div>
                  <p class="font-bold text-sm">Troisième A</p>
                  <p class="text-[11px] text-[#4e7397]">40 élèves • Prêt</p>
                </div>
              </div>
              <button class="size-10 rounded-full flex items-center justify-center bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                <span class="material-symbols-outlined">print</span>
              </button>
            </div>
            <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between group hover:border-primary transition-all">
              <div class="flex items-center gap-4">
                <div class="size-12 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center font-bold text-primary">TL2</div>
                <div>
                  <p class="font-bold text-sm">Terminale L2</p>
                  <p class="text-[11px] text-[#4e7397]">28 élèves • Prêt</p>
                </div>
              </div>
              <button class="size-10 rounded-full flex items-center justify-center bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                <span class="material-symbols-outlined">print</span>
              </button>
            </div>
            <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between group hover:border-primary transition-all">
              <div class="flex items-center gap-4">
                <div class="size-12 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center font-bold text-primary">6C</div>
                <div>
                  <p class="font-bold text-sm">Sixième C</p>
                  <p class="text-[11px] text-[#4e7397]">35 élèves • Vérif.</p>
                </div>
              </div>
              <button class="size-10 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-700 text-slate-400">
                <span class="material-symbols-outlined">print</span>
              </button>
            </div>
          </div>

          <!-- Activité Récente -->
          <div class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
            <div class="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
              <h3 class="font-bold text-base">Activité Récente</h3>
              <span class="text-xs text-[#4e7397]">Dernières 24 heures</span>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full text-left">
                <thead class="bg-slate-50 dark:bg-slate-900/50 text-[10px] font-black uppercase text-[#4e7397] tracking-wider">
                  <tr>
                    <th class="px-6 py-3">Action</th>
                    <th class="px-6 py-3">Document</th>
                    <th class="px-6 py-3">Date/Heure</th>
                    <th class="px-6 py-3">Statut</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 dark:divide-slate-700">
                  <tr class="text-sm">
                    <td class="px-6 py-4 font-medium">Génération Masse</td>
                    <td class="px-6 py-4 text-[#4e7397]">Bulletins TS1</td>
                    <td class="px-6 py-4 text-[#4e7397]">Il y a 10 min</td>
                    <td class="px-6 py-4">
                      <span class="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded">Terminé</span>
                    </td>
                  </tr>
                  <tr class="text-sm">
                    <td class="px-6 py-4 font-medium">Impression Unitaire</td>
                    <td class="px-6 py-4 text-[#4e7397]">Attest. Sc. - J. Diallo</td>
                    <td class="px-6 py-4 text-[#4e7397]">Il y a 45 min</td>
                    <td class="px-6 py-4">
                      <span class="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded">Délivré</span>
                    </td>
                  </tr>
                  <tr class="text-sm">
                    <td class="px-6 py-4 font-medium">Archive Dossier</td>
                    <td class="px-6 py-4 text-[#4e7397]">Fiches Inscription 2023</td>
                    <td class="px-6 py-4 text-[#4e7397]">Hier, 16:30</td>
                    <td class="px-6 py-4">
                      <span class="px-2 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold rounded">Archivé</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="space-y-6">
          <!-- Accès Rapides -->
          <div class="bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-2xl p-6">
            <div class="flex items-center gap-3 mb-4 text-primary">
              <span class="material-symbols-outlined">verified_user</span>
              <h3 class="font-bold">Accès Rapides</h3>
            </div>
            <div class="grid grid-cols-1 gap-3">
              <button class="w-full flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary transition-all group">
                <div class="flex items-center gap-3">
                  <span class="material-symbols-outlined text-primary text-xl">upload_file</span>
                  <span class="text-xs font-bold">Importer Notes</span>
                </div>
                <span class="material-symbols-outlined text-sm opacity-0 group-hover:opacity-100 transition-opacity">chevron_right</span>
              </button>
              <button class="w-full flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary transition-all group">
                <div class="flex items-center gap-3">
                  <span class="material-symbols-outlined text-primary text-xl">draw</span>
                  <span class="text-xs font-bold">Signer Documents</span>
                </div>
                <span class="material-symbols-outlined text-sm opacity-0 group-hover:opacity-100 transition-opacity">chevron_right</span>
              </button>
              <button class="w-full flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary transition-all group">
                <div class="flex items-center gap-3">
                  <span class="material-symbols-outlined text-primary text-xl">mail</span>
                  <span class="text-xs font-bold">Envoi Parents</span>
                </div>
                <span class="material-symbols-outlined text-sm opacity-0 group-hover:opacity-100 transition-opacity">chevron_right</span>
              </button>
            </div>
          </div>

          <!-- Échéances de la semaine -->
          <div class="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm">
            <h3 class="font-bold text-base mb-4">Échéances de la semaine</h3>
            <div class="space-y-4">
              <div class="flex gap-4">
                <div class="flex flex-col items-center justify-center size-10 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 border border-red-100 dark:border-red-900/30">
                  <span class="text-[10px] font-black leading-none">OCT</span>
                  <span class="text-sm font-black">24</span>
                </div>
                <div>
                  <p class="text-xs font-bold">Conseils de classe</p>
                  <p class="text-[10px] text-[#4e7397]">Terminale S / 14h00</p>
                </div>
              </div>
              <div class="flex gap-4">
                <div class="flex flex-col items-center justify-center size-10 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-600 border border-slate-100 dark:border-slate-600">
                  <span class="text-[10px] font-black leading-none">OCT</span>
                  <span class="text-sm font-black">26</span>
                </div>
                <div>
                  <p class="text-xs font-bold">Clôture Bulletins T2</p>
                  <p class="text-[10px] text-[#4e7397]">Toutes les sections</p>
                </div>
              </div>
              <div class="flex gap-4">
                <div class="flex flex-col items-center justify-center size-10 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-600 border border-slate-100 dark:border-slate-600">
                  <span class="text-[10px] font-black leading-none">OCT</span>
                  <span class="text-sm font-black">28</span>
                </div>
                <div>
                  <p class="text-xs font-bold">Remise Diplômes Bac</p>
                  <p class="text-[10px] text-[#4e7397]">Session de rattrapage</p>
                </div>
              </div>
            </div>
          </div>
        </div>
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

  // Add Public Sans font
  const publicSansLink = document.createElement('link');
  publicSansLink.href = 'https://fonts.googleapis.com/css2?family=Public+Sans:wght@300;400;500;600;700;800;900&display=swap';
  publicSansLink.rel = 'stylesheet';
  document.head.appendChild(publicSansLink);

  // Add custom styles
  const style = document.createElement('style');
  style.textContent = `
    body {
      font-family: 'Public Sans', sans-serif;
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
