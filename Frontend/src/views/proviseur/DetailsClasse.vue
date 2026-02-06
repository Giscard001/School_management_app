<template>
  <div class="flex-1 min-w-0 bg-background-light dark:bg-background-dark overflow-y-auto">
    <div class="max-w-[1200px] mx-auto p-8">
      <!-- Breadcrumbs -->
      <nav class="flex items-center gap-2 text-sm text-slate-500 mb-4 font-display">
        <router-link to="/proviseur/validation-bulletins" class="hover:text-primary transition-colors">Validation des bulletins</router-link>
        <span class="material-symbols-outlined text-sm">chevron_right</span>
        <span class="font-medium text-slate-900 dark:text-white">{{ classeInfo.nom }}</span>
      </nav>

      <!-- Page Heading -->
      <div class="flex flex-wrap justify-between items-start gap-4 mb-8">
        <div class="flex flex-col gap-1 font-display">
          <h1 class="text-[#0e141b] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">{{ classeInfo.nom }}</h1>
          <div class="flex items-center gap-4 mt-2">
            <div class="flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-400">
              <span class="material-symbols-outlined text-base">person</span>
              {{ classeInfo.totalEleves }} Élèves
            </div>
            <div class="flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-400">
              <span class="material-symbols-outlined text-base">school</span>
              Prof. Principal: {{ classeInfo.profPrincipal }}
            </div>
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 uppercase">
              En attente de validation
            </span>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <button class="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm hover:bg-slate-50 transition-colors">
            <span class="material-symbols-outlined text-[20px]">print</span>
            Imprimer Tout
          </button>
          <button class="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-blue-600 shadow-md transition-colors">
            <span class="material-symbols-outlined text-[20px]">verified</span>
            Valider la classe entière
          </button>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <p class="text-xs font-bold text-slate-500 uppercase">Moyenne Classe</p>
          <p class="text-xl font-black text-primary mt-1">{{ stats.moyenneClasse }}/20</p>
        </div>
        <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <p class="text-xs font-bold text-slate-500 uppercase">Plus haute moy.</p>
          <p class="text-xl font-black text-green-600 mt-1">{{ stats.plusHauteMoy }}</p>
        </div>
        <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <p class="text-xs font-bold text-slate-500 uppercase">Plus basse moy.</p>
          <p class="text-xl font-black text-red-500 mt-1">{{ stats.plusBasseMoy }}</p>
        </div>
        <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <p class="text-xs font-bold text-slate-500 uppercase">Bulletins Prêts</p>
          <p class="text-xl font-black text-slate-800 dark:text-white mt-1">{{ stats.bulletinsPrets }}/{{ classeInfo.totalEleves }}</p>
        </div>
      </div>

      <!-- Students Table -->
      <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden mb-12">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse font-display">
            <thead class="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-16 text-center">Rang</th>
                <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Élève</th>
                <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Moyenne Générale</th>
                <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Appréciation Globale</th>
                <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
              <tr v-for="student in students" :key="student.id" class="hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors">
                <td class="px-6 py-4 text-center">
                  <span class="inline-flex items-center justify-center size-8 rounded-full bg-slate-100 text-slate-600 font-bold text-sm" :class="{'bg-yellow-100 text-yellow-700': student.rang === 1}">
                    {{ student.rangText }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div class="size-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold">
                      {{ student.initials }}
                    </div>
                    <div>
                      <p class="text-sm font-bold text-[#0e141b] dark:text-white">{{ student.nom }}</p>
                      <p class="text-xs text-slate-500">ID: {{ student.matricule }}</p>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="flex flex-col gap-1">
                    <span class="text-sm font-black" :class="student.moyenne >= 10 ? 'text-green-600' : 'text-red-500'">
                      {{ student.moyenne }} / 20
                    </span>
                    <div class="w-24 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div class="h-full" :class="student.moyenne >= 10 ? 'bg-green-500' : 'bg-red-500'" :style="`width: ${student.moyenne * 5}%`"></div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <p class="text-sm text-slate-600 dark:text-slate-300 line-clamp-1 italic">{{ student.appreciation }}</p>
                </td>
                <td class="px-6 py-4 text-right">
                  <button class="inline-flex items-center gap-1 text-primary text-sm font-bold hover:underline">
                    Voir bulletin
                    <span class="material-symbols-outlined text-base">open_in_new</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/30">
          <p class="text-xs text-slate-500 font-medium">Affichage de {{ students.length }} élèves sur {{ classeInfo.totalEleves }}</p>
          <div class="flex gap-2">
            <button class="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded text-xs font-bold disabled:opacity-50" disabled>Précédent</button>
            <button class="px-3 py-1 bg-primary text-white border border-primary rounded text-xs font-bold">1</button>
            <button class="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded text-xs font-bold">Suivant</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const classeId = route.params.id

const classeInfo = ref({
  nom: 'Terminale S1',
  totalEleves: 32,
  profPrincipal: 'Mme Diallo'
})

const stats = ref({
  moyenneClasse: '12.45',
  plusHauteMoy: '17.82',
  plusBasseMoy: '07.14',
  bulletinsPrets: 32
})

const students = ref([
 { id: 1, rang: 1, rangText: '1er', nom: 'Amadou Sarr', matricule: '2023-045', initials: 'AS', moyenne: 17.82, appreciation: 'Excellent trimestre. Travail sérieux et rigoureux dans toutes les matières. Félicitations.' },
 { id: 2, rang: 2, rangText: '2e', nom: 'Marie Traoré', matricule: '2023-112', initials: 'MT', moyenne: 16.45, appreciation: 'Très bon niveau. Élève volontaire et pertinente dans ses interventions.' },
 { id: 3, rang: 3, rangText: '3e', nom: 'Koffi Bakayoko', matricule: '2023-088', initials: 'KB', moyenne: 15.90, appreciation: 'Résultats solides. Poursuivez vos efforts pour atteindre l\'excellence.' },
 { id: 4, rang: 32, rangText: '32e', nom: 'Jean N\'Guessan', matricule: '2023-201', initials: 'JN', moyenne: 7.14, appreciation: 'Alerte : Résultats en forte baisse. Un accompagnement spécifique est requis.' }
])
</script>
