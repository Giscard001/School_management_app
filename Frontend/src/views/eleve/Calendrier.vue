<template>
  <div class="min-h-screen bg-background-light dark:bg-background-dark text-[#0e141b] dark:text-slate-200 p-8">
    <div class="max-w-[1200px] mx-auto space-y-6">
      <!-- Page Heading Section -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div class="flex flex-col gap-1">
          <h3 class="text-3xl font-black text-slate-900 dark:text-white">Emploi du temps</h3>
          <p class="text-slate-500 dark:text-slate-400">Semaine du 14 au 20 Octobre • 1er Trimestre 2023-2024</p>
        </div>
        <div class="flex gap-3">
          <div class="flex items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
            <button class="p-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
              <span class="material-symbols-outlined text-lg leading-none">chevron_left</span>
            </button>
            <button class="px-4 py-2 text-sm font-bold border-x border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700">Aujourd'hui</button>
            <button class="p-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
              <span class="material-symbols-outlined text-lg leading-none">chevron_right</span>
            </button>
          </div>
          <button class="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-bold text-sm shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all">
            <span class="material-symbols-outlined text-sm">download</span>
            Exporter PDF
          </button>
        </div>
      </div>

      <!-- View Selector and Search -->
      <div class="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 shadow-sm">
        <div class="flex items-center bg-slate-100 dark:bg-slate-700 rounded-lg p-1">
          <button class="px-4 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">Jour</button>
          <button class="px-4 py-1.5 text-sm font-bold bg-white dark:bg-slate-600 shadow-sm rounded-md text-primary">Semaine</button>
          <button class="px-4 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">Mois</button>
        </div>
        <div class="relative">
          <span class="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-lg">search</span>
          <input class="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-700 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary w-64 transition-all" placeholder="Rechercher un cours..." type="text"/>
        </div>
      </div>

      <!-- Main Grid and Side Info -->
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Calendar Grid -->
        <div class="flex-1 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl">
          <div class="grid grid-cols-6 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 to-slate-900">
            <div class="p-4 border-r border-slate-200 dark:border-slate-800"></div>
            <div class="p-4 border-r border-slate-200 dark:border-slate-800 text-center">
              <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">Lun</p>
              <p class="text-xl font-black text-slate-900 dark:text-white">14</p>
            </div>
            <div class="p-4 border-r border-slate-200 dark:border-slate-800 text-center bg-gradient-to-br from-primary/10 to-primary/20 dark:from-primary/10 to-primary/20">
              <p class="text-xs font-bold text-primary uppercase tracking-widest">Mar</p>
              <p class="text-xl font-black text-primary">15</p>
            </div>
            <div class="p-4 border-r border-slate-200 dark:border-slate-800 text-center">
              <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">Mer</p>
              <p class="text-xl font-black text-slate-900 dark:text-white">16</p>
            </div>
            <div class="p-4 border-r border-slate-200 dark:border-slate-800 text-center">
              <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">Jeu</p>
              <p class="text-xl font-black text-slate-900 dark:text-white">17</p>
            </div>
            <div class="p-4 text-center">
              <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">Ven</p>
              <p class="text-xl font-black text-slate-900 dark:text-white">18</p>
            </div>
          </div>
          <div class="calendar-grid relative bg-gradient-to-b from-transparent via-slate-50/50 dark:via-slate-800/50 to-transparent">
            <!-- Time Column -->
            <div class="border-r border-slate-100/50 dark:border-slate-800/50 flex items-center justify-center text-[10px] font-bold text-slate-400">08:00</div>
            <div class="border-r border-slate-100/50 dark:border-slate-800/50 flex items-center justify-center text-[10px] font-bold text-slate-400">09:00</div>
            <div class="border-r border-slate-100/50 dark:border-slate-800/50 flex items-center justify-center text-[10px] font-bold text-slate-400">10:00</div>
            <div class="border-r border-slate-100/50 dark:border-slate-800/50 flex items-center justify-center text-[10px] font-bold text-slate-400">11:00</div>
            <div class="border-r border-slate-100/50 dark:border-slate-800/50 flex items-center justify-center text-[10px] font-bold text-slate-400">12:00</div>
            <div class="border-r border-slate-100/50 dark:border-slate-800/50 flex items-center justify-center text-[10px] font-bold text-slate-400">13:00</div>
            <div class="border-r border-slate-100/50 dark:border-slate-800/50 flex items-center justify-center text-[10px] font-bold text-slate-400">14:00</div>
            <div class="border-r border-slate-100/50 dark:border-slate-800/50 flex items-center justify-center text-[10px] font-bold text-slate-400">15:00</div>
            <div class="border-r border-slate-100/50 dark:border-slate-800/50 flex items-center justify-center text-[10px] font-bold text-slate-400">16:00</div>
            <div class="border-r border-slate-100/50 dark:border-slate-800/50 flex items-center justify-center text-[10px] font-bold text-slate-400">17:00</div>

            <!-- Course Blocks -->
            <!-- Monday 08:00-10:00 Math -->
            <div class="absolute top-0 left-[80px] w-[calc((100%-80px)/5-4px)] h-[158px] m-0.5 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 to-blue-800/20 border-l-4 border-blue-500 rounded-xl p-4 group cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
              <div class="flex justify-between items-start">
                <h4 class="text-sm font-bold text-blue-900 dark:text-blue-200">Mathématiques</h4>
                <span class="material-symbols-outlined text-xs text-blue-400">info</span>
              </div>
              <p class="text-[10px] text-blue-700/70 dark:text-blue-300 font-medium">Salle 204 • M. Dupont</p>
              <div class="mt-2 flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                <p class="text-[9px] font-bold uppercase text-blue-600 dark:text-blue-400">Cours Régulier</p>
              </div>
            </div>

            <!-- Tuesday 10:00-12:00 Physique (Exam/DS) -->
            <div class="absolute top-[160px] left-[calc(80px+((100%-80px)/5))] w-[calc((100%-80px)/5-4px)] h-[158px] m-0.5 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 to-red-800/20 border-l-4 border-red-500 rounded-xl p-4 group cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ring-2 ring-red-500 ring-offset-2 dark:ring-offset-slate-900">
              <div class="flex justify-between items-start">
                <h4 class="text-sm font-bold text-red-900 dark:text-red-200">Physique-Chimie</h4>
                <span class="material-symbols-outlined text-xs text-red-500 fill">warning</span>
              </div>
              <p class="text-[10px] text-red-700/70 dark:text-red-300 font-medium">Amphi A • Mme. Curie</p>
              <div class="mt-2 flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                <p class="text-[9px] font-bold uppercase text-red-600 dark:text-red-400">Devoir Surveillé</p>
              </div>
            </div>

            <!-- Wednesday 09:00-11:00 Anglais -->
            <div class="absolute top-[80px] left-[calc(80px+2*((100%-80px)/5))] w-[calc((100%-80px)/5-4px)] h-[158px] m-0.5 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 to-green-800/20 border-l-4 border-green-500 rounded-xl p-4 group cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
              <div class="flex justify-between items-start">
                <h4 class="text-sm font-bold text-green-900 dark:text-green-200">Anglais</h4>
                <span class="material-symbols-outlined text-xs text-green-400">translate</span>
              </div>
              <p class="text-[10px] text-green-700/70 dark:text-green-300 font-medium">Labo Langues • Ms. Smith</p>
            </div>

            <!-- Thursday 14:00-17:00 Philo (Examen Fin de Période) -->
            <div class="absolute top-[480px] left-[calc(80px+3*((100%-80px)/5))] w-[calc((100%-80px)/5-4px)] h-[238px] m-0.5 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 to-purple-800/20 border-l-4 border-purple-500 rounded-xl p-4 group cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
              <div class="flex justify-between items-start">
                <h4 class="text-sm font-bold text-purple-900 dark:text-purple-200">Philosophie</h4>
                <span class="material-symbols-outlined text-xs text-purple-500">grade</span>
              </div>
              <p class="text-[10px] text-purple-700/70 dark:text-purple-300 font-medium">Grande Salle • M. Sartre</p>
              <div class="mt-2 flex items-center gap-1 bg-purple-200 dark:bg-purple-800/50 px-2 py-0.5 rounded text-[9px] font-bold text-purple-700 dark:text-purple-300 w-fit">
                EXAMEN TRIMESTRIEL
              </div>
            </div>

            <!-- Friday 08:00-10:00 Histoire -->
            <div class="absolute top-0 left-[calc(80px+4*((100%-80px)/5))] w-[calc((100%-80px)/5-4px)] h-[158px] m-0.5 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 to-orange-800/20 border-l-4 border-orange-500 rounded-xl p-4 group cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
              <div class="flex justify-between items-start">
                <h4 class="text-sm font-bold text-orange-900 dark:text-orange-200">Hist-Géo</h4>
                <span class="material-symbols-outlined text-xs text-orange-400">public</span>
              </div>
              <p class="text-[10px] text-orange-700/70 dark:text-orange-300 font-medium">Salle 102 • Mme. Mercier</p>
            </div>

            <!-- Background lines for the grid -->
            <div class="col-start-2 col-span-5 row-start-2 row-span-10 grid grid-rows-10">
              <div class="border-t border-slate-100/50 dark:border-slate-800/50"></div>
              <div class="border-t border-slate-100/50 dark:border-slate-800/50"></div>
              <div class="border-t border-slate-100/50 dark:border-slate-800/50"></div>
              <div class="border-t border-slate-100/50 dark:border-slate-800/50"></div>
              <div class="border-t border-slate-100/50 dark:border-slate-800/50"></div>
              <div class="border-t border-slate-100/50 dark:border-slate-800/50"></div>
              <div class="border-t border-slate-100/50 dark:border-slate-800/50"></div>
              <div class="border-t border-slate-100/50 dark:border-slate-800/50"></div>
              <div class="border-t border-slate-100/50 dark:border-slate-800/50"></div>
              <div class="border-t border-slate-100/50 dark:border-slate-800/50"></div>
            </div>
          </div>
        </div>

        <!-- Side Info Panel -->
        <aside class="w-full lg:w-80 space-y-6">
          <!-- Upcoming Deadlines -->
          <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm">
            <h4 class="text-lg font-extrabold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span class="material-symbols-outlined text-primary">event_upcoming</span>
              À venir cette semaine
            </h4>
            <div class="space-y-4">
              <div class="flex gap-4 group cursor-pointer">
                <div class="flex flex-col items-center justify-center bg-red-50 dark:bg-red-900/20 rounded-lg size-12 flex-shrink-0 group-hover:bg-red-100 transition-colors">
                  <p class="text-[10px] font-bold text-red-500 uppercase">Mar</p>
                  <p class="text-lg font-black text-red-600">15</p>
                </div>
                <div>
                  <p class="text-sm font-bold text-slate-800 dark:text-slate-200">DS de Physique</p>
                  <p class="text-xs text-slate-500">Chapitre 4 : Énergie</p>
                  <p class="text-[10px] font-bold text-red-500 mt-1 flex items-center gap-1">
                    <span class="material-symbols-outlined text-[12px]">schedule</span> 10:00 - 12:00
                  </p>
                </div>
              </div>
              <div class="flex gap-4 group cursor-pointer">
                <div class="flex flex-col items-center justify-center bg-purple-50 dark:bg-purple-900/20 rounded-lg size-12 flex-shrink-0 group-hover:bg-purple-100 transition-colors">
                  <p class="text-[10px] font-bold text-purple-500 uppercase">Jeu</p>
                  <p class="text-lg font-black text-purple-600">17</p>
                </div>
                <div>
                  <p class="text-sm font-bold text-slate-800 dark:text-slate-200">Examen Philosophie</p>
                  <p class="text-xs text-slate-500">Le désir et la culture</p>
                  <p class="text-[10px] font-bold text-purple-500 mt-1 flex items-center gap-1">
                    <span class="material-symbols-outlined text-[12px]">schedule</span> 14:00 - 17:00
                  </p>
                </div>
              </div>
              <div class="flex gap-4 group cursor-pointer">
                <div class="flex flex-col items-center justify-center bg-blue-50 dark:bg-blue-900/20 rounded-lg size-12 flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                  <p class="text-[10px] font-bold text-blue-500 uppercase">Ven</p>
                  <p class="text-lg font-black text-blue-600">18</p>
                </div>
                <div>
                  <p class="text-sm font-bold text-slate-800 dark:text-slate-200">Rendu DM Maths</p>
                  <p class="text-xs text-slate-500">Probabilités complexes</p>
                  <p class="text-[10px] font-bold text-blue-500 mt-1 flex items-center gap-1">
                    <span class="material-symbols-outlined text-[12px]">priority_high</span> Avant 18:00
                  </p>
                </div>
              </div>
            </div>
            <button class="w-full mt-6 py-2.5 text-xs font-bold text-primary bg-primary/5 hover:bg-primary/10 rounded-lg transition-colors">Voir tous les devoirs</button>
          </div>

          <!-- Legend -->
          <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm">
            <h4 class="text-sm font-bold text-slate-900 dark:text-white mb-3 tracking-tight">Légende</h4>
            <div class="space-y-2">
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded bg-blue-500"></span>
                <span class="text-xs text-slate-600 dark:text-slate-400">Cours régulier</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded bg-red-500"></span>
                <span class="text-xs text-slate-600 dark:text-slate-400">Devoir Surveillé (DS)</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded bg-purple-500"></span>
                <span class="text-xs text-slate-600 dark:text-slate-400">Examen Trimestriel</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded bg-green-500"></span>
                <span class="text-xs text-slate-600 dark:text-slate-400">Atelier / Labo</span>
              </div>
            </div>
          </div>

          <!-- Quick Note -->
          <div class="bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800 p-5">
            <div class="flex items-center gap-2 text-amber-700 dark:text-amber-400 mb-2">
              <span class="material-symbols-outlined text-lg">lightbulb</span>
              <p class="text-xs font-bold uppercase">Rappel</p>
            </div>
            <p class="text-xs leading-relaxed text-amber-800/80 dark:text-amber-200/70">N'oubliez pas d'apporter votre calculatrice graphique pour le DS de Physique de demain.</p>
          </div>
        </aside>
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
    .calendar-grid {
      display: grid;
      grid-template-columns: 80px repeat(5, 1fr);
      grid-template-rows: auto repeat(10, 80px);
    }
  `;
  document.head.appendChild(style);
});
</script>
