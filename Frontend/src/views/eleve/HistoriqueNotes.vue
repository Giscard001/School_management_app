<template>
  <div class="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased transition-colors duration-200 p-8">
    <div class="max-w-[1200px] w-full mx-auto">
      <!-- Top Header / Stats Area -->
      <header class="flex flex-col gap-6 mb-8">
        <div class="flex flex-wrap justify-between items-start gap-6">
          <div class="flex flex-col gap-2">
            <h2 class="text-4xl font-black tracking-tight text-slate-900 dark:text-white">Mon Historique des Notes</h2>
            <p class="text-slate-500 dark:text-slate-400 text-lg">Suivez vos progrès académiques en temps réel.</p>
          </div>
          <button class="flex items-center gap-2 cursor-pointer rounded-lg h-11 px-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-bold shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
            <span class="material-symbols-outlined text-[20px]">download</span>
            <span>Télécharger le bulletin</span>
          </button>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="flex flex-col gap-3 rounded-xl p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
            <div class="flex justify-between items-center">
              <p class="text-slate-500 dark:text-slate-400 text-sm font-medium">Moyenne Générale</p>
              <div class="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 p-1 rounded-full">
                <span class="material-symbols-outlined text-[18px]">trending_up</span>
              </div>
            </div>
            <p class="text-slate-900 dark:text-white text-3xl font-black">14.5/20</p>
            <p class="text-green-600 dark:text-green-400 text-sm font-medium flex items-center gap-1">
              <span>+0.5 pts</span>
              <span class="text-slate-400 text-xs">vs semestre précédent</span>
            </p>
          </div>
          <div class="flex flex-col gap-3 rounded-xl p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
            <div class="flex justify-between items-center">
              <p class="text-slate-500 dark:text-slate-400 text-sm font-medium">Rang Global</p>
              <div class="bg-primary/10 text-primary p-1 rounded-full">
                <span class="material-symbols-outlined text-[18px]">leaderboard</span>
              </div>
            </div>
            <p class="text-slate-900 dark:text-white text-3xl font-black">5ème<span class="text-lg font-normal text-slate-400">/32</span></p>
            <p class="text-slate-500 dark:text-slate-400 text-sm font-medium">Stable</p>
          </div>
          <div class="flex flex-col gap-3 rounded-xl p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
            <div class="flex justify-between items-center">
              <p class="text-slate-500 dark:text-slate-400 text-sm font-medium">Crédits validés</p>
              <div class="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 p-1 rounded-full">
                <span class="material-symbols-outlined text-[18px]">verified</span>
              </div>
            </div>
            <p class="text-slate-900 dark:text-white text-3xl font-black">45 ECTS</p>
            <p class="text-slate-500 dark:text-slate-400 text-sm font-medium">Objectif: 60 ECTS</p>
          </div>
        </div>

        <!-- Filters Area -->
        <div class="flex flex-wrap items-center gap-3 bg-white dark:bg-slate-800 p-2 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <button class="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-primary text-white pl-4 pr-3 text-sm font-semibold">
            <span>Semestre 1</span>
            <span class="material-symbols-outlined text-[20px]">expand_more</span>
          </button>
          <button class="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-200 pl-4 pr-3 text-sm font-medium border border-transparent hover:border-slate-300 dark:hover:border-slate-500">
            <span>Tout afficher</span>
          </button>
          <div class="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>
          <button class="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-200 pl-4 pr-3 text-sm font-medium border border-transparent">
            <span>Matière</span>
            <span class="material-symbols-outlined text-[20px]">filter_list</span>
          </button>
          <div class="ml-auto relative w-full max-w-xs md:block hidden">
            <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">search</span>
            <input class="w-full h-10 pl-10 pr-4 rounded-lg bg-slate-50 dark:bg-slate-700 border-none text-sm focus:ring-2 focus:ring-primary/20" placeholder="Rechercher une épreuve..." type="text"/>
          </div>
        </div>

        <!-- Table Container -->
        <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-slate-50 dark:bg-slate-900/50 border-bottom border-slate-200 dark:border-slate-700">
                  <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 w-1/3">Matière</th>
                  <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Date</th>
                  <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Note</th>
                  <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-center">Coefficient</th>
                  <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-right">Rang</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-700">
                <!-- Row 1 -->
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                  <td class="px-6 py-5">
                    <div class="flex items-center gap-3">
                      <div class="size-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                        <span class="material-symbols-outlined">calculate</span>
                      </div>
                      <div class="flex flex-col">
                        <span class="text-sm font-bold text-slate-900 dark:text-white">Mathématiques</span>
                        <span class="text-xs text-slate-400">DS N°3 : Dérivées</span>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-5 text-sm text-slate-500 dark:text-slate-400">12/10/2023</td>
                  <td class="px-6 py-5">
                    <div class="inline-flex items-center justify-center rounded-lg h-9 px-4 bg-primary/10 text-primary text-sm font-black border border-primary/20">
                      16/20
                    </div>
                  </td>
                  <td class="px-6 py-5 text-sm font-semibold text-slate-700 dark:text-slate-200 text-center">4</td>
                  <td class="px-6 py-5 text-right">
                    <span class="inline-flex items-center gap-1 text-sm font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full">
                      2 <span class="text-slate-400 font-normal">/ 30</span>
                    </span>
                  </td>
                </tr>
                <!-- Row 2 -->
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                  <td class="px-6 py-5">
                    <div class="flex items-center gap-3">
                      <div class="size-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600">
                        <span class="material-symbols-outlined">public</span>
                      </div>
                      <div class="flex flex-col">
                        <span class="text-sm font-bold text-slate-900 dark:text-white">Histoire-Géo</span>
                        <span class="text-xs text-slate-400">Interrogation écrite</span>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-5 text-sm text-slate-500 dark:text-slate-400">15/10/2023</td>
                  <td class="px-6 py-5">
                    <div class="inline-flex items-center justify-center rounded-lg h-9 px-4 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-black border border-slate-200 dark:border-slate-600">
                      11/20
                    </div>
                  </td>
                  <td class="px-6 py-5 text-sm font-semibold text-slate-700 dark:text-slate-200 text-center">2</td>
                  <td class="px-6 py-5 text-right">
                    <span class="inline-flex items-center gap-1 text-sm font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full">
                      15 <span class="text-slate-400 font-normal">/ 30</span>
                    </span>
                  </td>
                </tr>
                <!-- Row 3 -->
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                  <td class="px-6 py-5">
                    <div class="flex items-center gap-3">
                      <div class="size-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600">
                        <span class="material-symbols-outlined">science</span>
                      </div>
                      <div class="flex flex-col">
                        <span class="text-sm font-bold text-slate-900 dark:text-white">Physique-Chimie</span>
                        <span class="text-xs text-slate-400">TP : Oxydoréduction</span>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-5 text-sm text-slate-500 dark:text-slate-400">18/10/2023</td>
                  <td class="px-6 py-5">
                    <div class="inline-flex items-center justify-center rounded-lg h-9 px-4 bg-primary/10 text-primary text-sm font-black border border-primary/20">
                      14/20
                    </div>
                  </td>
                  <td class="px-6 py-5 text-sm font-semibold text-slate-700 dark:text-slate-200 text-center">3</td>
                  <td class="px-6 py-5 text-right">
                    <span class="inline-flex items-center gap-1 text-sm font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full">
                      8 <span class="text-slate-400 font-normal">/ 30</span>
                    </span>
                  </td>
                </tr>
                <!-- Row 4 -->
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                  <td class="px-6 py-5">
                    <div class="flex items-center gap-3">
                      <div class="size-10 rounded-lg bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center text-pink-600">
                        <span class="material-symbols-outlined">menu_book</span>
                      </div>
                      <div class="flex flex-col">
                        <span class="text-sm font-bold text-slate-900 dark:text-white">Français</span>
                        <span class="text-xs text-slate-400">Commentaire composé</span>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-5 text-sm text-slate-500 dark:text-slate-400">22/10/2023</td>
                  <td class="px-6 py-5">
                    <div class="inline-flex items-center justify-center rounded-lg h-9 px-4 bg-primary/10 text-primary text-sm font-black border border-primary/20">
                      13/20
                    </div>
                  </td>
                  <td class="px-6 py-5 text-sm font-semibold text-slate-700 dark:text-slate-200 text-center">2</td>
                  <td class="px-6 py-5 text-right">
                    <span class="inline-flex items-center gap-1 text-sm font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full">
                      12 <span class="text-slate-400 font-normal">/ 30</span>
                    </span>
                  </td>
                </tr>
                <!-- Row 5 -->
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                  <td class="px-6 py-5">
                    <div class="flex items-center gap-3">
                      <div class="size-10 rounded-lg bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600">
                        <span class="material-symbols-outlined">language</span>
                      </div>
                      <div class="flex flex-col">
                        <span class="text-sm font-bold text-slate-900 dark:text-white">Anglais</span>
                        <span class="text-xs text-slate-400">Expression Orale</span>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-5 text-sm text-slate-500 dark:text-slate-400">25/10/2023</td>
                  <td class="px-6 py-5">
                    <div class="inline-flex items-center justify-center rounded-lg h-9 px-4 bg-primary/10 text-primary text-sm font-black border border-primary/20">
                      17/20
                    </div>
                  </td>
                  <td class="px-6 py-5 text-sm font-semibold text-slate-700 dark:text-slate-200 text-center">2</td>
                  <td class="px-6 py-5 text-right">
                    <span class="inline-flex items-center gap-1 text-sm font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full">
                      1 <span class="text-slate-400 font-normal">/ 30</span>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination / Footer -->
          <div class="px-6 py-4 bg-slate-50 dark:bg-slate-900/50 flex justify-between items-center border-t border-slate-200 dark:border-slate-700">
            <p class="text-xs font-medium text-slate-500">Affichage de 1 à 5 sur 24 épreuves</p>
            <div class="flex gap-2">
              <button class="size-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-400 hover:text-primary transition-colors disabled:opacity-50" disabled="">
                <span class="material-symbols-outlined text-[18px]">chevron_left</span>
              </button>
              <button class="size-8 flex items-center justify-center rounded-lg border border-primary bg-primary text-white text-xs font-bold">1</button>
              <button class="size-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-700">2</button>
              <button class="size-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-700">3</button>
              <button class="size-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-400 hover:text-primary transition-colors">
                <span class="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Additional Info Section -->
        <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="bg-primary/5 dark:bg-primary/10 rounded-xl p-6 border border-primary/10">
            <h3 class="text-lg font-bold mb-2 flex items-center gap-2">
              <span class="material-symbols-outlined text-primary">info</span>
              Information importante
            </h3>
            <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Les notes affichées ici sont transmises directement par vos professeurs. Si vous constatez une erreur, veuillez contacter le secrétariat pédagogique ou le professeur concerné dans un délai de 48 heures.
            </p>
          </div>
          <div class="bg-slate-100 dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 flex flex-col justify-center">
            <div class="flex items-center gap-4">
              <div class="bg-white dark:bg-slate-700 p-3 rounded-xl shadow-sm">
                <span class="material-symbols-outlined text-primary text-3xl">picture_as_pdf</span>
              </div>
              <div class="flex flex-col">
                <p class="text-sm font-bold text-slate-900 dark:text-white">Bulletin Trimestriel</p>
                <p class="text-xs text-slate-500">Prêt pour téléchargement • PDF • 1.2 MB</p>
              </div>
              <button class="ml-auto text-primary text-sm font-bold hover:underline">
                Voir
              </button>
            </div>
          </div>
        </div>
      </header>
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
  lexendLink.href = 'https://fonts.googleapis.com/css2?family=Lexend:wght@100;300;400;500;600;700;800;900&display=swap';
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
    .filled-icon {
      font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    }
  `;
  document.head.appendChild(style);
});
</script>
