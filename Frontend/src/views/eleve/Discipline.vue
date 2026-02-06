<template>
  <div class="min-h-screen bg-background-light dark:bg-background-dark text-[#0e141b] dark:text-slate-50 p-8">
    <div class="max-w-6xl mx-auto space-y-8">
      <!-- Page Heading -->
      <header class="flex flex-col gap-2">
        <h2 class="text-[#0e141b] dark:text-white text-4xl font-black tracking-tight">Discipline et Assiduité</h2>
        <p class="text-[#4e7397] dark:text-slate-400 text-lg">Suivez vos présences en temps réel et consultez vos rapports de conduite.</p>
      </header>

      <!-- Stats Cards -->
      <section class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-[#1a242e] border border-[#d0dbe7] dark:border-slate-700 shadow-sm">
          <div class="flex justify-between items-start">
            <p class="text-[#4e7397] dark:text-slate-400 text-sm font-medium">Total Absences</p>
            <span class="material-symbols-outlined text-red-500">event_busy</span>
          </div>
          <p class="text-[#0e141b] dark:text-white text-3xl font-bold">2</p>
          <p class="text-red-500 text-xs font-semibold flex items-center gap-1">
            <span class="material-symbols-outlined text-xs">trending_up</span> +1 depuis le mois dernier
          </p>
        </div>
        <div class="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-[#1a242e] border border-[#d0dbe7] dark:border-slate-700 shadow-sm">
          <div class="flex justify-between items-start">
            <p class="text-[#4e7397] dark:text-slate-400 text-sm font-medium">Total Retards</p>
            <span class="material-symbols-outlined text-orange-500">schedule</span>
          </div>
          <p class="text-[#0e141b] dark:text-white text-3xl font-bold">4</p>
          <p class="text-green-600 text-xs font-semibold flex items-center gap-1">
            <span class="material-symbols-outlined text-xs">trending_down</span> -20% vs période précédente
          </p>
        </div>
        <div class="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-[#1a242e] border border-primary/20 dark:border-primary/30 shadow-sm">
          <div class="flex justify-between items-start">
            <p class="text-[#4e7397] dark:text-slate-400 text-sm font-medium">Points de Conduite</p>
            <span class="material-symbols-outlined text-primary">stars</span>
          </div>
          <p class="text-primary text-3xl font-bold">18/20</p>
          <p class="text-primary/70 text-xs font-medium">Excellent comportement général</p>
        </div>
      </section>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- Calendar Section (Left) -->
        <section class="lg:col-span-5 flex flex-col gap-4">
          <div class="bg-white dark:bg-[#1a242e] rounded-xl border border-[#d0dbe7] dark:border-slate-700 overflow-hidden shadow-sm">
            <div class="p-6 border-b border-[#d0dbe7] dark:border-slate-700 flex justify-between items-center">
              <h3 class="text-lg font-bold">Octobre 2023</h3>
              <div class="flex gap-2">
                <button class="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded">
                  <span class="material-symbols-outlined text-lg">chevron_left</span>
                </button>
                <button class="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded">
                  <span class="material-symbols-outlined text-lg">chevron_right</span>
                </button>
              </div>
            </div>
            <div class="p-4">
              <div class="grid grid-cols-7 mb-2">
                <p class="text-slate-400 text-xs font-bold text-center py-2 uppercase">Lun</p>
                <p class="text-slate-400 text-xs font-bold text-center py-2 uppercase">Mar</p>
                <p class="text-slate-400 text-xs font-bold text-center py-2 uppercase">Mer</p>
                <p class="text-slate-400 text-xs font-bold text-center py-2 uppercase">Jeu</p>
                <p class="text-slate-400 text-xs font-bold text-center py-2 uppercase">Ven</p>
                <p class="text-slate-400 text-xs font-bold text-center py-2 uppercase">Sam</p>
                <p class="text-slate-400 text-xs font-bold text-center py-2 uppercase">Dim</p>
              </div>
              <div class="grid grid-cols-7 text-sm">
                <!-- Empty slots for alignment -->
                <div class="h-10"></div><div class="h-10"></div><div class="h-10"></div><div class="h-10"></div><div class="h-10"></div>
                <button class="h-10 w-full flex items-center justify-center font-medium rounded-lg">1</button>
                <button class="h-10 w-full flex items-center justify-center font-medium rounded-lg">2</button>
                <button class="h-10 w-full flex items-center justify-center font-medium rounded-lg">3</button>
                <button class="h-10 w-full flex items-center justify-center font-medium rounded-lg relative">
                  4 <span class="absolute bottom-1.5 w-1 h-1 bg-red-500 rounded-full"></span>
                </button>
                <button class="h-10 w-full flex items-center justify-center font-medium rounded-lg bg-primary text-white shadow-md">5</button>
                <button class="h-10 w-full flex items-center justify-center font-medium rounded-lg">6</button>
                <button class="h-10 w-full flex items-center justify-center font-medium rounded-lg">7</button>
                <button class="h-10 w-full flex items-center justify-center font-medium rounded-lg">8</button>
                <button class="h-10 w-full flex items-center justify-center font-medium rounded-lg relative">
                  9 <span class="absolute bottom-1.5 w-1 h-1 bg-orange-500 rounded-full"></span>
                </button>
                <button class="h-10 w-full flex items-center justify-center font-medium rounded-lg">10</button>
                <button class="h-10 w-full flex items-center justify-center font-medium rounded-lg">11</button>
                <button class="h-10 w-full flex items-center justify-center font-medium rounded-lg">12</button>
                <button class="h-10 w-full flex items-center justify-center font-medium rounded-lg">13</button>
                <button class="h-10 w-full flex items-center justify-center font-medium rounded-lg">14</button>
                <button class="h-10 w-full flex items-center justify-center font-medium rounded-lg">15</button>
                <!-- Rest of days simplified for visual -->
                <button class="h-10 w-full flex items-center justify-center font-medium rounded-lg">16</button>
                <button class="h-10 w-full flex items-center justify-center font-medium rounded-lg">17</button>
                <button class="h-10 w-full flex items-center justify-center font-medium rounded-lg">18</button>
                <button class="h-10 w-full flex items-center justify-center font-medium rounded-lg">19</button>
                <button class="h-10 w-full flex items-center justify-center font-medium rounded-lg">20</button>
                <button class="h-10 w-full flex items-center justify-center font-medium rounded-lg">21</button>
                <button class="h-10 w-full flex items-center justify-center font-medium rounded-lg">22</button>
              </div>
            </div>
            <div class="p-6 bg-slate-50 dark:bg-slate-800/50 flex flex-wrap gap-4 text-xs font-medium">
              <div class="flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-red-500"></span> <span>Absence</span>
              </div>
              <div class="flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-orange-500"></span> <span>Retard</span>
              </div>
              <div class="flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-primary"></span> <span>Aujourd'hui</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Events Section (Right) -->
        <section class="lg:col-span-7 flex flex-col gap-4">
          <div class="flex justify-between items-center px-2">
            <h3 class="text-xl font-bold tracking-tight">Historique des incidents et mérites</h3>
            <button class="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
              <span class="material-symbols-outlined text-sm">filter_list</span> Filtrer
            </button>
          </div>
          <div class="space-y-4">
            <!-- Report Item 1: Merit -->
            <div class="bg-white dark:bg-[#1a242e] rounded-xl border-l-4 border-green-500 border border-[#d0dbe7] dark:border-slate-700 p-5 shadow-sm">
              <div class="flex justify-between items-start mb-2">
                <div class="flex gap-3 items-center">
                  <div class="size-10 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-600">
                    <span class="material-symbols-outlined fill">award_star</span>
                  </div>
                  <div>
                    <h4 class="font-bold text-sm">Félicitations pour entraide</h4>
                    <p class="text-xs text-slate-400">Emis par M. Robert (Mathématiques)</p>
                  </div>
                </div>
                <span class="text-[10px] font-bold px-2 py-1 rounded bg-green-100 text-green-700 uppercase">Mérite</span>
              </div>
              <p class="text-sm text-[#4e7397] dark:text-slate-300 leading-relaxed">
                A aidé ses camarades pendant la séance de travaux dirigés après avoir terminé ses exercices. Très bel esprit d'équipe.
              </p>
              <div class="mt-3 text-[11px] font-medium text-slate-400">Le 12 Octobre 2023</div>
            </div>

            <!-- Report Item 2: Warning -->
            <div class="bg-white dark:bg-[#1a242e] rounded-xl border-l-4 border-orange-500 border border-[#d0dbe7] dark:border-slate-700 p-5 shadow-sm">
              <div class="flex justify-between items-start mb-2">
                <div class="flex gap-3 items-center">
                  <div class="size-10 rounded-full bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-orange-600">
                    <span class="material-symbols-outlined">warning</span>
                  </div>
                  <div>
                    <h4 class="font-bold text-sm">Retard répété (15 min)</h4>
                    <p class="text-xs text-slate-400">Emis par Mme. Claire (Anglais)</p>
                  </div>
                </div>
                <span class="text-[10px] font-bold px-2 py-1 rounded bg-orange-100 text-orange-700 uppercase">Non-justifié</span>
              </div>
              <p class="text-sm text-[#4e7397] dark:text-slate-300 leading-relaxed">
                Arrivée tardive perturbant le début du cours. Troisième retard ce mois-ci.
              </p>
              <div class="mt-3 flex justify-between items-center">
                <span class="text-[11px] font-medium text-slate-400">Le 09 Octobre 2023</span>
                <button class="text-primary text-[11px] font-bold hover:underline">Justifier maintenant</button>
              </div>
            </div>

            <!-- Report Item 3: Neutral/Info -->
            <div class="bg-white dark:bg-[#1a242e] rounded-xl border-l-4 border-primary border border-[#d0dbe7] dark:border-slate-700 p-5 shadow-sm opacity-80">
              <div class="flex justify-between items-start mb-2">
                <div class="flex gap-3 items-center">
                  <div class="size-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-primary">
                    <span class="material-symbols-outlined">description</span>
                  </div>
                  <div>
                    <h4 class="font-bold text-sm">Absence justifiée</h4>
                    <p class="text-xs text-slate-400">Validé par l'Administration</p>
                  </div>
                </div>
                <span class="text-[10px] font-bold px-2 py-1 rounded bg-blue-100 text-primary uppercase">Justifié</span>
              </div>
              <p class="text-sm text-[#4e7397] dark:text-slate-300 leading-relaxed">
                Rendez-vous médical. Certificat fourni le jour même.
              </p>
              <div class="mt-3 text-[11px] font-medium text-slate-400">Le 04 Octobre 2023</div>
            </div>
          </div>

          <!-- Load more -->
          <button class="w-full py-3 border border-dashed border-[#d0dbe7] dark:border-slate-700 rounded-lg text-sm text-[#4e7397] font-medium hover:bg-slate-50 transition-colors">
            Voir l'historique complet
          </button>
        </section>
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
  lexendLink.href = 'https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&display=swap';
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
