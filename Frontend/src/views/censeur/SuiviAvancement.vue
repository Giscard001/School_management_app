<template>
  <div class="max-w-6xl mx-auto px-6 py-8">
    <!-- Page Heading -->
    <div class="flex flex-wrap justify-between items-end gap-4 mb-8">
      <div class="flex flex-col gap-1">
        <h2 class="text-slate-900 dark:text-white text-3xl font-extrabold tracking-tight">Suivi de l'Avancement Global</h2>
        <div class="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
          <span class="material-symbols-outlined text-xs">history</span>
          <span>Dernière mise à jour: il y a 5 minutes</span>
        </div>
      </div>
      <div class="flex gap-3">
        <button @click="exportData" class="flex items-center justify-center rounded-lg h-10 px-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm font-bold shadow-sm">
          <span class="material-symbols-outlined mr-2 text-sm">download</span>
          Exporter
        </button>
        <button @click="sendGroupReminder" class="flex items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90">
          <span class="material-symbols-outlined mr-2 text-sm">send</span>
          Rappel Groupé
        </button>
      </div>
    </div>

    <!-- Stats Overview -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div class="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
        <div class="flex justify-between items-start">
          <p class="text-slate-500 dark:text-slate-400 text-sm font-medium">Progression Totale</p>
          <span class="material-symbols-outlined text-primary">trending_up</span>
        </div>
        <p class="text-slate-900 dark:text-white text-3xl font-bold">{{ stats.progressionTotale }}%</p>
        <p class="text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-1">
          <span class="material-symbols-outlined text-xs">arrow_upward</span> +{{ stats.progressionHebdomadaire }}% cette semaine
        </p>
      </div>
      <div class="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
        <div class="flex justify-between items-start">
          <p class="text-slate-500 dark:text-slate-400 text-sm font-medium">Classes Complétées</p>
          <span class="material-symbols-outlined text-emerald-500">check_circle</span>
        </div>
        <p class="text-slate-900 dark:text-white text-3xl font-bold">{{ stats.classesCompletees }} / {{ stats.totalClasses }}</p>
        <p class="text-slate-500 dark:text-slate-400 text-xs font-medium">{{ stats.classesEnAttente }} classes en attente</p>
      </div>
      <div class="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
        <div class="flex justify-between items-start">
          <p class="text-slate-500 dark:text-slate-400 text-sm font-medium">Notes Saisies</p>
          <span class="material-symbols-outlined text-amber-500">history_edu</span>
        </div>
        <p class="text-slate-900 dark:text-white text-3xl font-bold">{{ stats.notesSaisies.toLocaleString() }}</p>
        <p class="text-slate-500 dark:text-slate-400 text-xs font-medium">Sur {{ stats.notesAttendues.toLocaleString() }} attendues</p>
      </div>
      <div class="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
        <div class="flex justify-between items-start">
          <p class="text-slate-500 dark:text-slate-400 text-sm font-medium">Profs en Retard</p>
          <span class="material-symbols-outlined text-red-500">warning</span>
        </div>
        <p class="text-slate-900 dark:text-white text-3xl font-bold">{{ stats.profsEnRetard }}</p>
        <p class="text-red-600 dark:text-red-400 text-xs font-semibold flex items-center gap-1">
          <span class="material-symbols-outlined text-xs">priority_high</span> Action requise
        </p>
      </div>
    </div>

    <!-- Search and Filters Toolbar -->
    <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
      <div class="flex items-center gap-4 flex-1 min-w-[300px]">
        <div class="relative flex-1 max-w-sm">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
          <input v-model="searchQuery" class="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20" placeholder="Rechercher une classe ou un prof..." type="text"/>
        </div>
        <div class="flex items-center gap-2">
          <select v-model="selectedNiveau" class="bg-slate-50 dark:bg-slate-900 border-none rounded-lg text-sm px-3 py-2 text-slate-600 dark:text-slate-300 focus:ring-2 focus:ring-primary/20">
            <option>Tous les niveaux</option>
            <option>Premier Cycle</option>
            <option>Second Cycle</option>
          </select>
          <select v-model="selectedStatut" class="bg-slate-50 dark:bg-slate-900 border-none rounded-lg text-sm px-3 py-2 text-slate-600 dark:text-slate-300 focus:ring-2 focus:ring-primary/20">
            <option>Tous les statuts</option>
            <option>Validé</option>
            <option>En cours</option>
            <option>Retard</option>
          </select>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-xs font-medium text-slate-400 uppercase tracking-wider mr-2">Trier par:</span>
        <button @click="toggleSort" class="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">
          <span class="material-symbols-outlined">sort_by_alpha</span>
        </button>
      </div>
    </div>

    <!-- Main Data Table -->
    <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-slate-50 dark:bg-slate-900/50 border-bottom border-slate-200 dark:border-slate-700">
            <th class="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Classe / Niveau</th>
            <th class="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Progression</th>
            <th class="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Matières Saisies</th>
            <th class="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Statut</th>
            <th class="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 dark:divide-slate-700">
          <tr v-for="classe in filteredClasses" :key="classe.id" class="hover:bg-slate-50/50 dark:hover:bg-slate-700/20 transition-colors group" :class="classe.statut === 'Retard' ? 'bg-red-50/30 dark:bg-red-900/5' : ''">
            <td class="px-6 py-4">
              <div class="flex flex-col">
                <span class="text-sm font-bold text-slate-900 dark:text-white">{{ classe.nom }}</span>
                <span class="text-xs text-slate-500">{{ classe.niveau }}</span>
              </div>
            </td>
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <div class="flex-1 min-w-[120px] h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                  <div class="h-full transition-all duration-500" :class="getProgressColor(classe.progression)" :style="`width: ${classe.progression}%`"></div>
                </div>
                <span class="text-xs font-bold" :class="getProgressTextColor(classe.progression)">{{ classe.progression }}%</span>
              </div>
            </td>
            <td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{{ classe.matieresSaisies }} / {{ classe.totalMatieres }}</td>
            <td class="px-6 py-4">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="getStatusColor(classe.statut)">
                {{ classe.statut }}
              </span>
            </td>
            <td class="px-6 py-4 text-right">
              <button v-if="classe.statut === 'Retard'" @click="relancerProf(classe)" class="text-red-600 hover:text-red-700 text-sm font-bold underline underline-offset-4">
                Relancer Profs
              </button>
              <button v-else @click="voirDetails(classe)" class="text-primary hover:text-primary/80 text-sm font-bold">
                Détails
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      
      <!-- Pagination -->
      <div class="px-6 py-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-700">
        <p class="text-xs text-slate-500 font-medium tracking-tight">Affichage de 1 à {{ filteredClasses.length }} sur {{ classes.length }} classes</p>
        <div class="flex gap-2">
          <button class="p-2 rounded border border-slate-200 dark:border-slate-700 text-slate-400 disabled:opacity-50" disabled>
            <span class="material-symbols-outlined text-sm">chevron_left</span>
          </button>
          <button class="p-2 rounded border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
            <span class="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Secondary Section: Critical Alerts -->
    <div class="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-slate-900 dark:text-white font-bold text-lg">Professeurs avec saisie incomplète</h3>
          <button class="text-primary text-xs font-bold hover:underline">Voir tout</button>
        </div>
        <div class="space-y-4">
          <div v-for="prof in professeursRetard" :key="prof.id" class="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50">
            <div class="flex items-center gap-3">
              <div class="size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">{{ prof.initials }}</div>
              <div>
                <p class="text-sm font-semibold text-slate-900 dark:text-white">{{ prof.nom }} ({{ prof.matiere }})</p>
                <p class="text-xs text-slate-500">{{ prof.classes }}</p>
              </div>
            </div>
            <button @click="envoyerRappel(prof)" class="p-2 text-primary hover:bg-primary/10 rounded-full transition-colors" title="Envoyer rappel">
              <span class="material-symbols-outlined text-lg">notifications_active</span>
            </button>
          </div>
        </div>
      </div>
      
      <div class="rounded-xl border border-primary/20 bg-primary/5 p-6 flex flex-col justify-between">
        <div>
          <div class="size-12 rounded-xl bg-primary text-white flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
            <span class="material-symbols-outlined">campaign</span>
          </div>
          <h3 class="text-slate-900 dark:text-white font-bold text-lg leading-snug">Urgence de Clôture</h3>
          <p class="text-slate-600 dark:text-slate-400 text-sm mt-2">Il reste <strong>48 heures</strong> avant la clôture automatique des saisies pour le premier trimestre.</p>
        </div>
        <div class="mt-6 flex flex-col gap-2">
          <button @click="relancerTousRetardataires" class="w-full py-2.5 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-all">
            Relancer tous les retardataires
          </button>
          <p class="text-[10px] text-center text-slate-400 italic">Action irréversible : Envoie un SMS à {{ professeursRetard.length }} professeurs.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Données réactives
const searchQuery = ref('')
const selectedNiveau = ref('Tous les niveaux')
const selectedStatut = ref('Tous les statuts')
const sortAscending = ref(true)

// Statistiques
const stats = ref({
  progressionTotale: 78.4,
  progressionHebdomadaire: 5.2,
  classesCompletees: 42,
  totalClasses: 50,
  classesEnAttente: 8,
  notesSaisies: 12402,
  notesAttendues: 15800,
  profsEnRetard: 12
})

// Données des classes
const classes = ref([
  {
    id: 1,
    nom: '6ème A',
    niveau: 'Cycle Inférieur',
    progression: 85,
    matieresSaisies: 12,
    totalMatieres: 14,
    statut: 'En cours'
  },
  {
    id: 2,
    nom: '3ème B',
    niveau: 'BACC Prep',
    progression: 100,
    matieresSaisies: 18,
    totalMatieres: 18,
    statut: 'Validé'
  },
  {
    id: 3,
    nom: 'Tle C',
    niveau: 'Séries Scientifiques',
    progression: 45,
    matieresSaisies: 8,
    totalMatieres: 18,
    statut: 'Retard'
  },
  {
    id: 4,
    nom: '4ème M1',
    niveau: 'Cycle Inférieur',
    progression: 90,
    matieresSaisies: 16,
    totalMatieres: 18,
    statut: 'En cours'
  },
  {
    id: 5,
    nom: '2nde D',
    niveau: 'Second Cycle',
    progression: 72,
    matieresSaisies: 13,
    totalMatieres: 18,
    statut: 'En cours'
  },
  {
    id: 6,
    nom: '5ème B',
    niveau: 'Cycle Inférieur',
    progression: 95,
    matieresSaisies: 17,
    totalMatieres: 18,
    statut: 'En cours'
  }
])

// Professeurs en retard
const professeursRetard = ref([
  {
    id: 1,
    nom: 'M. Kamga',
    matiere: 'Maths',
    initials: 'MK',
    classes: 'Tle C, 1ère D, 3ème B'
  },
  {
    id: 2,
    nom: 'Mme. Sorel',
    matiere: 'Français',
    initials: 'ST',
    classes: '6ème A, 5ème B'
  }
])

// Computed properties
const filteredClasses = computed(() => {
  let filtered = classes.value

  // Filtrer par recherche
  if (searchQuery.value) {
    filtered = filtered.filter(classe => 
      classe.nom.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      classe.niveau.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  // Filtrer par niveau
  if (selectedNiveau.value !== 'Tous les niveaux') {
    filtered = filtered.filter(classe => 
      classe.niveau.includes(selectedNiveau.value.split(' ')[0])
    )
  }

  // Filtrer par statut
  if (selectedStatut.value !== 'Tous les statuts') {
    filtered = filtered.filter(classe => classe.statut === selectedStatut.value)
  }

  // Trier
  filtered.sort((a, b) => {
    if (sortAscending.value) {
      return a.nom.localeCompare(b.nom)
    } else {
      return b.nom.localeCompare(a.nom)
    }
  })

  return filtered
})

// Fonctions utilitaires
const getProgressColor = (progression) => {
  if (progression >= 90) return 'bg-emerald-500'
  if (progression >= 70) return 'bg-primary'
  if (progression >= 50) return 'bg-amber-500'
  return 'bg-red-500'
}

const getProgressTextColor = (progression) => {
  if (progression >= 90) return 'text-emerald-600 dark:text-emerald-400'
  if (progression >= 70) return 'text-slate-700 dark:text-slate-300'
  if (progression >= 50) return 'text-amber-600 dark:text-amber-400'
  return 'text-red-600 dark:text-red-400'
}

const getStatusColor = (statut) => {
  switch (statut) {
    case 'Validé':
      return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
    case 'En cours':
      return 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
    case 'Retard':
      return 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300'
    default:
      return 'bg-slate-50 text-slate-700 dark:bg-slate-900/30 dark:text-slate-300'
  }
}

// Fonctions d'action
const exportData = () => {
  console.log('Export des données')
}

const sendGroupReminder = () => {
  console.log('Envoi rappel groupé')
}

const toggleSort = () => {
  sortAscending.value = !sortAscending.value
}

const voirDetails = (classe) => {
  console.log('Voir détails de', classe.nom)
}

const relancerProf = (classe) => {
  console.log('Relancer professeurs de', classe.nom)
}

const envoyerRappel = (prof) => {
  console.log('Envoyer rappel à', prof.nom)
}

const relancerTousRetardataires = () => {
  console.log('Relancer tous les retardataires')
}
</script>
