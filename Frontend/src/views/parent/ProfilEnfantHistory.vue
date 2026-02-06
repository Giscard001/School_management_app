<template>
  <div class="space-y-6">
    <!-- Chart Section -->
    <div class="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-slate-900 dark:text-white text-lg font-bold">Évolution de la Moyenne Générale</h3>
        <div class="flex items-center gap-2">
          <span class="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
            <span class="w-3 h-3 bg-primary rounded-full"></span> Moyenne annuelle
          </span>
        </div>
      </div>
      <div class="chart-container w-full pt-4">
        <svg class="w-full h-full" preserveAspectRatio="none" viewBox="0 0 800 200">
          <line class="dark:stroke-slate-800" stroke="#f1f5f9" stroke-width="1" x1="0" x2="800" y1="0" y2="0"></line>
          <line class="dark:stroke-slate-800" stroke="#f1f5f9" stroke-width="1" x1="0" x2="800" y1="50" y2="50"></line>
          <line class="dark:stroke-slate-800" stroke="#f1f5f9" stroke-width="1" x1="0" x2="800" y1="100" y2="100"></line>
          <line class="dark:stroke-slate-800" stroke="#f1f5f9" stroke-width="1" x1="0" x2="800" y1="150" y2="150"></line>
          <line class="dark:stroke-slate-800" stroke="#f1f5f9" stroke-width="1" x1="0" x2="800" y1="200" y2="200"></line>
          <path class="chart-line" d="M 133 110 L 400 70 L 666 60"></path>
          <circle class="chart-point" cx="133" cy="110" r="6"></circle>
          <circle class="chart-point" cx="400" cy="70" r="6"></circle>
          <circle class="chart-point" cx="666" cy="60" r="6"></circle>
        </svg>
        <div class="flex justify-between mt-4 px-10 text-xs font-medium text-slate-500 dark:text-slate-400">
          <span>2021-2022</span>
          <span>2022-2023</span>
          <span>2023-2024</span>
        </div>
      </div>
    </div>

    <!-- Annual Summary Table -->
    <div class="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div class="p-6 border-b border-slate-100 dark:border-slate-800">
        <h3 class="text-slate-900 dark:text-white text-lg font-bold">Récapitulatif Annuel</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50 dark:bg-slate-800/50">
              <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Année Scolaire</th>
              <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Classe</th>
              <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Moyenne Générale</th>
              <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Résultat</th>
              <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-right">Bulletins</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
            <tr v-for="year in schoolHistory" :key="year.year" class="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
              <td class="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">{{ year.year }}</td>
              <td class="px-6 py-4 text-sm text-slate-500 dark:text-slate-300">{{ year.class }}</td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-2">
                  <span class="text-sm font-bold text-primary">{{ year.average }}</span>
                  <span v-if="year.trend" class="text-[10px] text-green-500 font-bold flex items-center">
                    <span class="material-symbols-outlined text-[14px]">trending_up</span>{{ year.trend }}
                  </span>
                </div>
              </td>
              <td class="px-6 py-4">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                  {{ year.result }}
                </span>
              </td>
              <td class="px-6 py-4 text-right">
                <button @click="$emit('download-archives', year)" class="text-primary hover:text-blue-700 font-medium text-sm flex items-center justify-end gap-1 ml-auto">
                  <span class="material-symbols-outlined text-lg">folder_zip</span> Archivés
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Info Note -->
    <div class="flex items-center gap-4 p-4 bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-xl">
      <span class="material-symbols-outlined text-primary">info</span>
      <p class="text-sm text-slate-500 dark:text-slate-400">
        Les données affichées correspondent aux moyennes finales validées lors des conseils de classe de fin d'année. Pour toute réclamation sur l'historique, veuillez contacter le secrétariat.
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  schoolHistory: {
    type: Array,
    required: true
  }
})

defineEmits(['download-archives'])
</script>

<style scoped>
.chart-container {
  height: 250px;
  position: relative;
}

.chart-line {
  stroke: #197fe6;
  stroke-width: 3;
  fill: none;
}

.chart-point {
  fill: #197fe6;
  stroke: white;
  stroke-width: 2;
}
</style>
