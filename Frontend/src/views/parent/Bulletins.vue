<template>
  <div class="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900">
    <div class="max-w-6xl mx-auto py-8 px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-slate-900 dark:text-white mb-2">Bulletins Scolaires</h1>
        <p class="text-slate-500 dark:text-slate-400">Consultez et téléchargez les bulletins de notes de vos enfants</p>
      </div>

      <!-- Filters Section -->
      <div class="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="flex flex-col gap-1.5">
            <label class="text-slate-700 dark:text-slate-300 text-sm font-semibold">Sélectionner l'enfant</label>
            <select v-model="selectedChild" class="rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm focus:ring-primary focus:border-primary">
              <option value="">Choisir un enfant</option>
              <option v-for="child in children" :key="child.id" :value="child.id">{{ child.name }} - {{ child.class }}</option>
            </select>
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-slate-700 dark:text-slate-300 text-sm font-semibold">Année scolaire</label>
            <select v-model="selectedYear" class="rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm focus:ring-primary focus:border-primary">
              <option value="">Choisir une année</option>
              <option v-for="year in schoolYears" :key="year" :value="year">{{ year }}</option>
            </select>
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-slate-700 dark:text-slate-300 text-sm font-semibold">Trimestre</label>
            <select v-model="selectedTrimester" class="rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm focus:ring-primary focus:border-primary">
              <option value="">Choisir un trimestre</option>
              <option value="1">1er Trimestre</option>
              <option value="2">2ème Trimestre</option>
              <option value="3">3ème Trimestre</option>
            </select>
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-slate-700 dark:text-slate-300 text-sm font-semibold">&nbsp;</label>
            <button @click="searchBulletins" class="rounded-lg bg-primary text-white text-sm font-bold h-10 px-4 shadow-md hover:bg-blue-600 transition-all flex items-center justify-center gap-2">
              <span class="material-symbols-outlined text-lg">search</span>
              <span>Rechercher</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Bulletins List -->
      <div v-if="bulletins.length > 0" class="space-y-4">
        <h2 class="text-lg font-bold text-slate-900 dark:text-white">Résultats</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="bulletin in bulletins" :key="bulletin.id" class="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-md transition-shadow">
            <div class="p-4 border-b border-slate-100 dark:border-slate-800">
              <div class="flex items-center justify-between mb-2">
                <span class="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full font-bold">{{ bulletin.trimester }}</span>
                <span class="text-xs text-slate-500">{{ bulletin.date }}</span>
              </div>
              <h3 class="font-bold text-slate-900 dark:text-white mb-1">{{ bulletin.childName }}</h3>
              <p class="text-sm text-slate-500 dark:text-slate-400">{{ bulletin.class }} • {{ bulletin.year }}</p>
            </div>
            <div class="p-4 bg-slate-50 dark:bg-slate-800/50">
              <div class="grid grid-cols-2 gap-4 text-center mb-4">
                <div>
                  <p class="text-lg font-bold text-primary">{{ bulletin.average }}</p>
                  <p class="text-xs text-slate-500">Moyenne</p>
                </div>
                <div>
                  <p class="text-lg font-bold text-slate-900 dark:text-white">{{ bulletin.rank }}</p>
                  <p class="text-xs text-slate-500">Rang</p>
                </div>
              </div>
              <div class="flex gap-2">
                <button @click="viewBulletin(bulletin)" class="flex-1 flex items-center justify-center gap-2 rounded-lg h-8 px-3 bg-primary text-white text-xs font-bold hover:bg-blue-600 transition-all">
                  <span class="material-symbols-outlined text-sm">visibility</span>
                  <span>Voir</span>
                </button>
                <button @click="downloadBulletin(bulletin)" class="flex items-center justify-center rounded-lg h-8 w-8 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                  <span class="material-symbols-outlined text-sm">download</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bulletin Preview Modal -->
      <div v-if="showBulletinModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="closeBulletinModal"></div>
        <div class="relative bg-white dark:bg-slate-900 w-full max-w-6xl max-h-[90vh] rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden">
          <!-- Modal Header -->
          <div class="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900 no-print">
            <div class="flex items-center gap-3">
              <button @click="closeBulletinModal" class="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
                <span class="material-symbols-outlined text-lg">arrow_back</span>
              </button>
              <h2 class="text-slate-900 dark:text-white text-xl font-bold">Aperçu du Bulletin</h2>
            </div>
            <div class="flex gap-3">
              <button @click="printBulletin" class="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg font-bold hover:brightness-110 transition-all shadow-lg">
                <span class="material-symbols-outlined text-sm">download</span>
                <span>Télécharger PDF</span>
              </button>
              <button @click="closeBulletinModal" class="flex items-center gap-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-5 py-2.5 rounded-lg font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-50 transition-all shadow-md">
                <span class="material-symbols-outlined text-sm">close</span>
                <span>Fermer</span>
              </button>
            </div>
          </div>

          <!-- Bulletin Content -->
          <div class="flex-1 overflow-y-auto p-6">
            <div class="bg-white text-slate-900 p-[20px] shadow-2xl rounded-sm w-full min-h-[297mm] flex flex-col overflow-hidden">
              
              <!-- Header Container -->
              <div class="flex items-start justify-between gap-5 mb-6 pb-5 border-b-2 border-primary">
                <!-- Left: School Info -->
                <div class="flex-1">
                  <h3 class="text-xs font-medium text-slate-600 mb-1">LA FORMATION PROFESSIONNELLE ET TECHNIQUE</h3>
                  <h3 class="text-xs font-medium text-slate-600 mb-1">RÉGION CENTRE</h3>
                  <h3 class="text-xs font-semibold text-primary mb-1">LYCÉE WEND PUIRÉ DE SAABA</h3>
                  <h3 class="text-xs text-slate-500">Tél : 51 54 88 11</h3>
                </div>

                <!-- Center: Logo -->
                <div class="flex flex-col items-center flex-shrink-0">
                  <div class="text-4xl font-black text-primary">LWS</div>
                  <div class="text-[9px] font-bold text-slate-600 mt-1 text-center">DISCIPLINE-TRAVAIL-SUCCES</div>
                </div>

                <!-- Right: Devise -->
                <div class="flex-1 text-right">
                  <div class="bg-primary/5 px-4 py-2 rounded-lg border border-primary/20 inline-block">
                    <div class="text-xs font-bold text-primary">BURKINA FASO</div>
                    <div class="text-[10px] font-medium text-slate-600 mt-1">La Patrie ou la Mort, nous Vaincrons</div>
                  </div>
                </div>
              </div>

              <!-- Title Section -->
              <div class="text-center mb-6">
                <h1 class="text-2xl font-bold italic text-primary mb-2">BULLETIN DE NOTES</h1>
                <div class="text-sm text-slate-700">
                  <span>Année scolaire: <strong class="text-primary">{{ currentBulletin?.year }}</strong></span>
                  <span class="mx-6"><strong class="text-primary">{{ getTrimesterLabel(currentBulletin?.trimester) }}</strong></span>
                  <span class="float-right">Effectif: <strong class="text-primary">68</strong></span>
                </div>
              </div>

              <!-- Student Info -->
              <div class="mb-5 text-[13px] space-y-1 bg-slate-50 p-4 rounded-lg border border-slate-200">
                <div>Nom de l'élève: <strong class="text-primary">{{ currentBulletin?.studentName }}</strong></div>
                <div class="flex gap-6">
                  <span>Né(e) le: <strong>{{ currentBulletin?.birthDate }}</strong></span>
                  <span>Matricule: <strong>{{ currentBulletin?.matricule }}</strong></span>
                  <span>Classe de: <strong>{{ currentBulletin?.class }}</strong></span>
                  <span>Classe redoublée: <strong>Non</strong></span>
                </div>
              </div>

              <!-- Grades Table -->
              <div class="mb-6">
                <table class="w-full border-collapse text-xs">
                  <thead>
                    <tr class="bg-primary text-white">
                      <th class="border border-slate-300 px-3 py-2 text-left font-bold">Matières</th>
                      <th class="border border-slate-300 px-2 py-2 font-bold">Coef</th>
                      <th class="border border-slate-300 px-2 py-2 font-bold">Int (1)</th>
                      <th class="border border-slate-300 px-2 py-2 font-bold">Dev (2)</th>
                      <th class="border border-slate-300 px-2 py-2 font-bold">Compo (3)</th>
                      <th class="border border-slate-300 px-2 py-2 font-bold">Moy</th>
                      <th class="border border-slate-300 px-2 py-2 font-bold">Notes pondérées</th>
                      <th class="border border-slate-300 px-3 py-2 font-bold">Appréciations</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="subject in currentBulletin?.subjects" :key="subject.id" class="hover:bg-slate-50">
                      <td class="border border-slate-300 px-3 py-2 font-bold text-slate-900">{{ subject.name }}</td>
                      <td class="border border-slate-300 px-2 py-2 text-center">{{ subject.coef }}</td>
                      <td class="border border-slate-300 px-2 py-2 text-center">{{ subject.interrogation || '-' }}</td>
                      <td class="border border-slate-300 px-2 py-2 text-center">{{ subject.devoir || '-' }}</td>
                      <td class="border border-slate-300 px-2 py-2 text-center">{{ subject.composition || '-' }}</td>
                      <td class="border border-slate-300 px-2 py-2 text-center">
                        <span :class="getGradeClass(subject.average)" class="font-bold px-2 py-1 rounded">{{ subject.average }}</span>
                      </td>
                      <td class="border border-slate-300 px-2 py-2 text-center font-semibold">{{ subject.weightedGrade }}</td>
                      <td class="border border-slate-300 px-3 py-2 italic" :class="getAppreciationClass(subject.appreciation)">{{ subject.appreciation }} - {{ subject.teacher }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- Bilan Trimestriel -->
              <div class="mb-6">
                <div class="bg-slate-200 border border-slate-300 px-4 py-3 font-bold text-center text-slate-800 mb-0">BILAN TRIMESTRIEL</div>
                <table class="w-full border-collapse text-xs">
                  <tbody>
                    <tr>
                      <td class="border border-slate-300 px-3 py-2 font-bold bg-slate-50">TOTAL COEFFICIENT :</td>
                      <td class="border border-slate-300 px-3 py-2 text-center font-semibold text-primary">{{ currentBulletin?.totalCoef }}</td>
                      <td class="border border-slate-300 px-3 py-2 font-bold bg-slate-50">TOTAL NOTES PONDÉRÉES</td>
                      <td class="border border-slate-300 px-3 py-2 text-center font-semibold text-primary">{{ currentBulletin?.totalWeighted }}</td>
                      <td class="border border-slate-300" colspan="4"></td>
                    </tr>
                    <tr>
                      <td class="border border-slate-300 px-3 py-2 font-bold bg-slate-50">Moyenne de l'élève</td>
                      <td class="border border-slate-300 px-3 py-2 text-center font-bold text-lg text-primary">{{ currentBulletin?.average }}</td>
                      <td class="border border-slate-300 px-3 py-2 font-bold bg-slate-50">RETRAIT DE POINTS</td>
                      <td class="border border-slate-300 px-3 py-2 text-center font-semibold">06.14</td>
                      <td class="border border-slate-300 px-3 py-2 font-bold bg-slate-50">Heures d'absence</td>
                      <td class="border border-slate-300" colspan="3"></td>
                    </tr>
                    <tr>
                      <td class="border border-slate-300 px-3 py-2 font-bold bg-slate-50">Moyenne de la classe</td>
                      <td class="border border-slate-300 px-3 py-2 text-center font-semibold">{{ currentBulletin?.classAverage }}</td>
                      <td class="border border-slate-300 px-3 py-2 font-bold bg-slate-50">MOYENNE DÉFINITIVE</td>
                      <td class="border border-slate-300 px-3 py-2 text-center font-bold text-lg text-red-600">0.12</td>
                      <td class="border border-slate-300 px-3 py-2 font-bold bg-slate-50">Justifiées</td>
                      <td class="border border-slate-300 px-2 py-2 text-center">0</td>
                      <td class="border border-slate-300 px-3 py-2 font-bold bg-slate-50">Non justifiées</td>
                      <td class="border border-slate-300 px-2 py-2 text-center">0</td>
                    </tr>
                    <tr>
                      <td class="border border-slate-300 px-3 py-2 font-bold bg-slate-50">Meilleure moyenne</td>
                      <td class="border border-slate-300 px-3 py-2 text-center font-semibold">{{ currentBulletin?.bestAverage }}</td>
                      <td class="border border-slate-300 px-3 py-2 font-bold bg-slate-50">Rang du trimestre</td>
                      <td class="border border-slate-300 px-3 py-2 text-center font-bold text-primary">{{ currentBulletin?.rank }} ex</td>
                      <td class="border border-slate-300 px-3 py-2 font-bold bg-slate-50">Conduite</td>
                      <td class="border border-slate-300" colspan="3"></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- Appréciations du conseil -->
              <div class="mt-6">
                <div class="bg-slate-200 border border-slate-300 px-4 py-3 font-bold text-center text-slate-800">Appréciations du conseil de classe</div>
                <div class="grid grid-cols-2 gap-0">
                  <div class="border border-slate-300 p-6 flex items-center justify-center">
                    <div class="border-2 border-red-600 rounded-lg p-6 text-center w-full">
                      <div class="font-bold text-lg text-red-600 mb-4">{{ currentBulletin?.appreciation }}</div>
                      <div class="text-slate-700 font-semibold">{{ currentBulletin?.conseilAppreciation }}</div>
                    </div>
                  </div>
                  <div class="border border-slate-300 p-6 flex flex-col items-center justify-center">
                    <div class="font-bold text-sm mb-12">Le Proviseur</div>
                    <div class="text-center border-t-2 border-slate-300 pt-3 w-full">
                      <p class="text-xs text-slate-600">Signature</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Document Footer -->
              <div class="mt-8 pt-4 border-t border-slate-200 flex justify-between items-center text-[10px] text-slate-400 italic">
                <p>Édité le {{ new Date().toLocaleDateString('fr-FR') }} - Document officiel à conserver.</p>
                <p>Page 1 sur 1</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="hasSearched" class="text-center py-12">
        <span class="material-symbols-outlined text-6xl text-slate-300 mb-4">description</span>
        <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2">Aucun bulletin trouvé</h3>
        <p class="text-slate-500 dark:text-slate-400">Aucun bulletin ne correspond à vos critères de recherche</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Données réactives
const selectedChild = ref('')
const selectedYear = ref('')
const selectedTrimester = ref('')
const showBulletinModal = ref(false)
const currentBulletin = ref(null)
const hasSearched = ref(false)

// Données des enfants
const children = ref([
  { id: 1, name: 'Lucas Dupont', class: '3ème B' },
  { id: 2, name: 'Emma Dupont', class: '5ème A' }
])

// Années scolaires
const schoolYears = ref(['2023-2024', '2022-2023', '2021-2022'])

// Bulletins trouvés
const bulletins = ref([])

// Données du bulletin actuel
const bulletinData = {
  id: 1,
  childName: 'BADEL EDEN HELENA SHIRLEY',
  year: '2025/2026',
  trimester: '1',
  class: 'Tle A4',
  birthDate: '05/06/2008',
  matricule: '2023/G1354',
  average: '06.02',
  rank: '59e',
  classAverage: '07.68',
  bestAverage: '12.02',
  totalCoef: '23.0',
  totalWeighted: '141.25',
  appreciation: 'Très Faible',
  conseilAppreciation: 'Blâme',
  subjects: [
    {
      id: 1,
      name: 'FRANÇAIS',
      coef: '5.0',
      interrogation: '11.50',
      devoir: '11.00',
      composition: '11.25',
      average: '11.25',
      weightedGrade: '56.250',
      appreciation: 'Passable',
      teacher: 'MME TAPSOBA'
    },
    {
      id: 2,
      name: 'HISTOIRE GÉOGRAPHIE MC',
      coef: '3.0',
      interrogation: '06.00',
      devoir: '06.50',
      composition: '06.25',
      average: '6.25',
      weightedGrade: '18.750',
      appreciation: 'Faible',
      teacher: 'MME BEOGO'
    },
    {
      id: 3,
      name: 'ANGLAIS',
      coef: '4.0',
      interrogation: '07.00',
      devoir: '06.00',
      composition: '06.50',
      average: '6.50',
      weightedGrade: '26.000',
      appreciation: 'Faible',
      teacher: 'MR DAMBRE'
    },
    {
      id: 4,
      name: 'PHILOSOPHIE',
      coef: '5.0',
      interrogation: '04.00',
      devoir: '10.00',
      composition: '07.00',
      average: '7.00',
      weightedGrade: '35.000',
      appreciation: 'Très insuffisant',
      teacher: 'MR ZONGO'
    },
    {
      id: 5,
      name: 'ALLEMAND',
      coef: '3.0',
      interrogation: '02.50',
      devoir: '01.00',
      composition: '01.75',
      average: '1.75',
      weightedGrade: '5.250',
      appreciation: 'Très faible',
      teacher: 'MME OUEDRAOGO'
    }
  ]
}

// Fonctions
const searchBulletins = () => {
  hasSearched.value = true
  // Simuler une recherche
  if (selectedChild.value && selectedYear.value && selectedTrimester.value) {
    bulletins.value = [
      {
        id: 1,
        childName: 'BADEL EDEN HELENA SHIRLEY',
        class: 'Tle A4',
        year: selectedYear.value,
        trimester: getTrimesterLabel(selectedTrimester.value),
        date: '15/12/2023',
        average: '06.02',
        rank: '59e',
        data: bulletinData
      }
    ]
  } else {
    bulletins.value = []
  }
}

const viewBulletin = (bulletin) => {
  currentBulletin.value = bulletin.data
  showBulletinModal.value = true
}

const downloadBulletin = (bulletin) => {
  console.log('Télécharger le bulletin:', bulletin.childName)
}

const closeBulletinModal = () => {
  showBulletinModal.value = false
  currentBulletin.value = null
}

const printBulletin = () => {
  window.print()
}

const getTrimesterLabel = (trimester) => {
  switch (trimester) {
    case '1': return '1er Trimestre'
    case '2': return '2ème Trimestre'
    case '3': return '3ème Trimestre'
    default: return ''
  }
}

const getGradeClass = (grade) => {
  const numGrade = parseFloat(grade)
  if (numGrade >= 10) return 'bg-primary/10 text-primary'
  if (numGrade >= 7) return 'bg-orange-50 text-orange-600'
  return 'bg-red-50 text-red-600'
}

const getAppreciationClass = (appreciation) => {
  if (appreciation?.includes('Passable')) return 'text-orange-600'
  if (appreciation?.includes('Faible') || appreciation?.includes('insuffisant')) return 'text-red-600'
  return 'text-slate-600'
}
</script>

<style scoped>
@media print {
  .no-print { 
    display: none !important; 
  }
  .print-area { 
    margin: 0 !important; 
    padding: 0 !important; 
    box-shadow: none !important; 
    width: 100% !important; 
  }
  body { 
    background: white !important; 
  }
}

.a4-container {
  width: 210mm;
  min-height: 297mm;
}
</style>
