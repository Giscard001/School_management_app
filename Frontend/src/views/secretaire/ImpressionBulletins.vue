<template>
  <div class="min-h-screen bg-background-light dark:bg-background-dark text-[#0e141b] dark:text-slate-100">
    <!-- Breadcrumbs -->
    <div class="px-8 pt-6">
      <div class="flex items-center gap-2 text-sm">
        <a class="text-[#4e7397] dark:text-slate-400 hover:text-primary font-medium">Secrétariat</a>
        <span class="text-slate-400 font-medium">/</span>
        <span class="text-[#0e141b] dark:text-slate-200 font-bold">Impression des Bulletins</span>
      </div>
    </div>

    <!-- Page Heading -->
    <div class="flex flex-wrap justify-between items-end gap-4 px-8 py-6">
      <div class="flex flex-col gap-1">
        <h1 class="text-[#0e141b] dark:text-white text-3xl font-black leading-tight tracking-[-0.033em]">Impression des Bulletins</h1>
        <p class="text-[#4e7397] dark:text-slate-400 text-base font-normal">Liste des bulletins validés par le Proviseur pour l'édition papier.</p>
      </div>
      <div class="flex gap-3">
        <button class="flex items-center gap-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 font-medium hover:bg-slate-50 transition-colors">
          <span class="material-symbols-outlined text-lg">history</span>
          Historique d'impression
        </button>
      </div>
    </div>

    <!-- Search and Filter Bar -->
    <div class="px-8 pb-4">
      <div class="flex flex-col md:flex-row gap-4 items-center bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
        <div class="flex-1 w-full">
          <label class="flex flex-col w-full h-11">
            <div class="flex w-full flex-1 items-stretch rounded-lg h-full">
              <div class="text-[#4e7397] flex border-none bg-slate-100 dark:bg-slate-800 items-center justify-center pl-4 rounded-l-lg">
                <span class="material-symbols-outlined">search</span>
              </div>
              <input class="form-input flex w-full min-w-0 flex-1 border-none bg-slate-100 dark:bg-slate-800 text-[#0e141b] dark:text-white focus:ring-0 h-full placeholder:text-[#4e7397] px-4 rounded-r-lg text-sm font-normal" placeholder="Rechercher un élève par matricule ou nom..." />
            </div>
          </label>
        </div>
        <div class="flex gap-2 w-full md:w-auto">
          <select class="bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm h-11 px-4 text-slate-700 dark:text-slate-200 focus:ring-primary">
            <option>Toutes les classes</option>
            <option>Terminale C</option>
            <option>Seconde A</option>
          </select>
          <button class="bg-primary text-white h-11 px-6 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-md shadow-primary/20">
            <span class="material-symbols-outlined">filter_list</span>
            Filtrer
          </button>
        </div>
      </div>
    </div>

    <!-- Content Area: Classes Groups -->
    <div class="px-8 flex flex-col gap-8 pb-10">
      <!-- Class Card 1: Terminale C -->
      <div class="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div class="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 flex flex-wrap justify-between items-center gap-4">
          <div class="flex items-center gap-4">
            <div class="size-12 rounded-lg bg-primary/20 text-primary flex items-center justify-center font-bold text-lg">TC</div>
            <div>
              <h3 class="text-lg font-bold text-[#0e141b] dark:text-white">Terminale C</h3>
              <p class="text-sm text-[#4e7397] dark:text-slate-400">32 élèves • Bulletins validés: 32/32</p>
            </div>
          </div>
          <div class="flex gap-2">
            <button class="bg-primary/10 text-primary hover:bg-primary/20 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors">
              <span class="material-symbols-outlined text-lg">picture_as_pdf</span>
              Classe entière
            </button>
            <button class="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors">
              <span class="material-symbols-outlined text-lg">fact_check</span>
              Liste d'émargement
            </button>
            <button @click="toggleTerminaleC" class="text-primary hover:bg-primary/5 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors">
              <span>{{ isTerminaleCExpanded ? 'Masquer' : 'Voir' }} la liste</span>
              <span class="material-symbols-outlined text-lg transition-transform" :class="{ 'rotate-180': isTerminaleCExpanded }">expand_more</span>
            </button>
          </div>
        </div>
        <div v-show="isTerminaleCExpanded" class="overflow-x-auto transition-all duration-300">
          <table class="w-full text-left">
            <thead class="bg-slate-50 dark:bg-slate-800/30 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
              <tr>
                <th class="px-6 py-3 font-semibold">Matricule</th>
                <th class="px-6 py-3 font-semibold">Nom & Prénoms</th>
                <th class="px-6 py-3 font-semibold">Moyenne Gén.</th>
                <th class="px-6 py-3 font-semibold">Statut</th>
                <th class="px-6 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
              <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                <td class="px-6 py-4 text-sm font-medium text-slate-900 dark:text-slate-100">2023-TC-001</td>
                <td class="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">DIALLO Mamadou</td>
                <td class="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">16.45</td>
                <td class="px-6 py-4">
                  <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400">
                    <span class="size-1.5 rounded-full bg-green-500"></span>
                    Imprimé
                  </span>
                </td>
                <td class="px-6 py-4 text-right">
                  <button class="p-2 text-slate-400 hover:text-primary transition-colors" title="Réimprimer">
                    <span class="material-symbols-outlined">print</span>
                  </button>
                </td>
              </tr>
              <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                <td class="px-6 py-4 text-sm font-medium text-slate-900 dark:text-slate-100">2023-TC-012</td>
                <td class="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">KOFFI Amenan Marie</td>
                <td class="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">14.20</td>
                <td class="px-6 py-4">
                  <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
                    <span class="size-1.5 rounded-full bg-amber-500"></span>
                    En attente
                  </span>
                </td>
                <td class="px-6 py-4 text-right">
                  <button class="bg-primary text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-primary/90 shadow-sm transition-all">
                    Imprimer
                  </button>
                </td>
              </tr>
              <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                <td class="px-6 py-4 text-sm font-medium text-slate-900 dark:text-slate-100">2023-TC-045</td>
                <td class="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">SORO Jean-Eudes</td>
                <td class="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">12.10</td>
                <td class="px-6 py-4">
                  <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
                    <span class="size-1.5 rounded-full bg-amber-500"></span>
                    En attente
                  </span>
                </td>
                <td class="px-6 py-4 text-right">
                  <button class="bg-primary text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-primary/90 shadow-sm transition-all">
                    Imprimer
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Class Card 2: Seconde A -->
      <div class="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div class="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 flex flex-wrap justify-between items-center gap-4">
          <div class="flex items-center gap-4">
            <div class="size-12 rounded-lg bg-primary/20 text-primary flex items-center justify-center font-bold text-lg">2A</div>
            <div>
              <h3 class="text-lg font-bold text-[#0e141b] dark:text-white">Seconde A</h3>
              <p class="text-sm text-[#4e7397] dark:text-slate-400">45 élèves • Bulletins validés: 12/45 (En cours de validation par le Proviseur)</p>
            </div>
          </div>
          <div class="flex gap-2">
            <button class="bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2" disabled>
              <span class="material-symbols-outlined text-lg">picture_as_pdf</span>
              Indisponible
            </button>
            <button class="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors">
              <span class="material-symbols-outlined text-lg">fact_check</span>
              Liste d'émargement
            </button>
            <button @click="toggleSecondeA" class="text-primary hover:bg-primary/5 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors">
              <span>{{ isSecondeAExpanded ? 'Masquer' : 'Voir' }} la liste</span>
              <span class="material-symbols-outlined text-lg transition-transform" :class="{ 'rotate-180': isSecondeAExpanded }">expand_more</span>
            </button>
          </div>
        </div>
        <div v-show="isSecondeAExpanded" class="overflow-x-auto transition-all duration-300">
          <table class="w-full text-left">
            <thead class="bg-slate-50 dark:bg-slate-800/30 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
              <tr>
                <th class="px-6 py-3 font-semibold">Matricule</th>
                <th class="px-6 py-3 font-semibold">Nom & Prénoms</th>
                <th class="px-6 py-3 font-semibold">Moyenne Gén.</th>
                <th class="px-6 py-3 font-semibold">Statut</th>
                <th class="px-6 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
              <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                <td class="px-6 py-4 text-sm font-medium text-slate-900 dark:text-slate-100">2023-2A-008</td>
                <td class="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">TOURE Fatoumata</td>
                <td class="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">15.80</td>
                <td class="px-6 py-4">
                  <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400">
                    <span class="size-1.5 rounded-full bg-green-500"></span>
                    Validé
                  </span>
                </td>
                <td class="px-6 py-4 text-right">
                  <button class="p-2 text-slate-400 hover:text-primary transition-colors" title="Réimprimer">
                    <span class="material-symbols-outlined">print</span>
                  </button>
                </td>
              </tr>
              <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                <td class="px-6 py-4 text-sm font-medium text-slate-900 dark:text-slate-100">2023-2A-015</td>
                <td class="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">KOUASSI Yao</td>
                <td class="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">13.50</td>
                <td class="px-6 py-4">
                  <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400">
                    <span class="size-1.5 rounded-full bg-green-500"></span>
                    Validé
                  </span>
                </td>
                <td class="px-6 py-4 text-right">
                  <button class="p-2 text-slate-400 hover:text-primary transition-colors" title="Réimprimer">
                    <span class="material-symbols-outlined">print</span>
                  </button>
                </td>
              </tr>
              <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                <td class="px-6 py-4 text-sm font-medium text-slate-900 dark:text-slate-100">2023-2A-023</td>
                <td class="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">BAMBA Aminata</td>
                <td class="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">14.20</td>
                <td class="px-6 py-4">
                  <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
                    <span class="size-1.5 rounded-full bg-amber-500"></span>
                    En attente
                  </span>
                </td>
                <td class="px-6 py-4 text-right">
                  <button class="bg-primary text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-primary/90 shadow-sm transition-all">
                    Imprimer
                  </button>
                </td>
              </tr>
              <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors opacity-60">
                <td class="px-6 py-4 text-sm font-medium text-slate-400">2023-2A-031</td>
                <td class="px-6 py-4 text-sm text-slate-400">DIARRA Mohamed</td>
                <td class="px-6 py-4 text-sm font-bold text-slate-400">—</td>
                <td class="px-6 py-4">
                  <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-500">
                    <span class="size-1.5 rounded-full bg-slate-400"></span>
                    Non validé
                  </span>
                </td>
                <td class="px-6 py-4 text-right">
                  <button class="p-2 text-slate-300 cursor-not-allowed" disabled title="Non disponible">
                    <span class="material-symbols-outlined">print</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Progress Indicator -->
    <div class="fixed bottom-8 right-8 max-w-sm w-full bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-primary/20 p-4 z-50">
      <div class="flex items-start gap-3">
        <div class="bg-primary/10 text-primary p-2 rounded-lg">
          <span class="material-symbols-outlined">print</span>
        </div>
        <div class="flex-1">
          <p class="text-sm font-bold text-slate-900 dark:text-white">Impression groupée en cours...</p>
          <p class="text-xs text-slate-500 dark:text-slate-400 mb-2">Terminale C - 14/32 bulletins générés</p>
          <div class="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
            <div class="bg-primary h-full w-[45%]" style="transition: width 0.5s ease"></div>
          </div>
        </div>
        <button class="text-slate-400 hover:text-red-500">
          <span class="material-symbols-outlined text-sm">close</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// États pour le déroulement des classes
const isTerminaleCExpanded = ref(false);
const isSecondeAExpanded = ref(false);

// Fonctions pour basculer l'affichage des classes
const toggleTerminaleC = () => {
  isTerminaleCExpanded.value = !isTerminaleCExpanded.value;
};

const toggleSecondeA = () => {
  isSecondeAExpanded.value = !isSecondeAExpanded.value;
};

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
  `;
  document.head.appendChild(style);
});
</script>
