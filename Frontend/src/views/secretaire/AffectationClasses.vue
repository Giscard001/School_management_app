<template>
  <div class="flex-1 min-w-0 bg-background-light dark:bg-background-dark overflow-y-auto">
    <div class="max-w-6xl mx-auto p-8">
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-slate-900 dark:text-white mb-2">Affectation des Classes</h1>
        <p class="text-slate-600 dark:text-slate-400">Gérez l'affectation des élèves aux classes pour l'année scolaire</p>
      </div>

      <!-- Stats Overview -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <span class="material-symbols-outlined text-blue-600 dark:text-blue-400 text-xl">groups</span>
            </div>
            <div>
              <p class="text-2xl font-bold text-slate-900 dark:text-white">{{ stats.totalEleves }}</p>
              <p class="text-sm text-slate-500 dark:text-slate-400">Total élèves</p>
            </div>
          </div>
        </div>
        <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <span class="material-symbols-outlined text-green-600 dark:text-green-400 text-xl">check_circle</span>
            </div>
            <div>
              <p class="text-2xl font-bold text-slate-900 dark:text-white">{{ stats.affectes }}</p>
              <p class="text-sm text-slate-500 dark:text-slate-400">Affectés</p>
            </div>
          </div>
        </div>
        <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center">
              <span class="material-symbols-outlined text-amber-600 dark:text-amber-400 text-xl">pending</span>
            </div>
            <div>
              <p class="text-2xl font-bold text-slate-900 dark:text-white">{{ stats.enAttente }}</p>
              <p class="text-sm text-slate-500 dark:text-slate-400">En attente</p>
            </div>
          </div>
        </div>
        <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <span class="material-symbols-outlined text-purple-600 dark:text-purple-400 text-xl">meeting_room</span>
            </div>
            <div>
              <p class="text-2xl font-bold text-slate-900 dark:text-white">{{ stats.totalClasses }}</p>
              <p class="text-sm text-slate-500 dark:text-slate-400">Classes</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex gap-4 mb-8">
        <button @click="showAffectationModal = true" class="flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
          <span class="material-symbols-outlined">add</span>
          Nouvelle affectation
        </button>
        <button @click="importerExcel" class="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
          <span class="material-symbols-outlined">upload_file</span>
          Importer Excel
        </button>
        <button @click="exporterAffectations" class="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
          <span class="material-symbols-outlined">download</span>
          Exporter
        </button>
      </div>

      <!-- Filter Bar -->
      <div class="flex flex-wrap items-center gap-4 mb-6 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
        <div class="flex items-center gap-2">
          <label class="text-sm font-medium text-slate-700 dark:text-slate-300">Niveau:</label>
          <select v-model="filter.niveau" class="px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800">
            <option value="">Tous</option>
            <option value="6ème">6ème</option>
            <option value="5ème">5ème</option>
            <option value="4ème">4ème</option>
            <option value="3ème">3ème</option>
          </select>
        </div>
        <div class="flex items-center gap-2">
          <label class="text-sm font-medium text-slate-700 dark:text-slate-300">Statut:</label>
          <select v-model="filter.statut" class="px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800">
            <option value="">Tous</option>
            <option value="affecte">Affecté</option>
            <option value="attente">En attente</option>
          </select>
        </div>
        <div class="flex-1">
          <input v-model="filter.search" type="text" placeholder="Rechercher un élève..." class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800">
        </div>
      </div>

      <!-- Classes Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="classe in classes" :key="classe.id" class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div class="p-6 border-b border-slate-200 dark:border-slate-800">
            <div class="flex justify-between items-start mb-4">
              <div>
                <h3 class="text-lg font-semibold text-slate-900 dark:text-white">{{ classe.nom }}</h3>
                <p class="text-sm text-slate-500 dark:text-slate-400">{{ classe.effectif }} élèves</p>
              </div>
              <span class="px-2 py-1 text-xs font-bold rounded-full" :class="getClassStatusClass(classe.statut)">
                {{ classe.statut }}
              </span>
            </div>
            <div class="text-sm text-slate-600 dark:text-slate-400">
              <p>Prof. Principal: {{ classe.profPrincipal }}</p>
              <p>Capacité: {{ classe.capacite }}</p>
            </div>
          </div>
          <div class="p-4">
            <div class="flex justify-between items-center mb-3">
              <span class="text-sm font-medium text-slate-700 dark:text-slate-300">Élèves affectés</span>
              <span class="text-sm font-bold text-primary">{{ classe.elevesAffectes.length }}/{{ classe.effectif }}</span>
            </div>
            <div class="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mb-4">
              <div class="bg-primary h-2 rounded-full" :style="`width: ${(classe.elevesAffectes.length / classe.effectif) * 100}%`"></div>
            </div>
            <div class="flex gap-2">
              <button @click="voirClasse(classe)" class="flex-1 px-3 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors">
                Voir détails
              </button>
              <button @click="modifierClasse(classe)" class="px-3 py-2 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm font-medium rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                Modifier
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showAffectationModal = ref(false)

const stats = ref({
  totalEleves: 485,
  affectes: 423,
  enAttente: 62,
  totalClasses: 24
})

const filter = ref({
  niveau: '',
  statut: '',
  search: ''
})

const classes = ref([
  {
    id: 1,
    nom: '6ème A',
    effectif: 28,
    capacite: 30,
    profPrincipal: 'Mme. Martin',
    statut: 'Complète',
    elevesAffectes: [
      { id: 1, nom: 'Alice Dupont' },
      { id: 2, nom: 'Bob Martin' },
      { id: 3, nom: 'Claire Bernard' }
    ]
  },
  {
    id: 2,
    nom: '6ème B',
    effectif: 25,
    capacite: 30,
    profPrincipal: 'M. Durand',
    statut: 'Disponible',
    elevesAffectes: [
      { id: 4, nom: 'David Petit' },
      { id: 5, nom: 'Emma Rousseau' }
    ]
  },
  {
    id: 3,
    nom: '5ème A',
    effectif: 27,
    capacite: 28,
    profPrincipal: 'Mme. Lefebvre',
    statut: 'Presque complète',
    elevesAffectes: [
      { id: 6, nom: 'François Moreau' },
      { id: 7, nom: 'Julie Robert' }
    ]
  }
])

const getClassStatusClass = (statut) => {
  switch (statut) {
    case 'Complète': return 'bg-green-100 text-green-700'
    case 'Presque complète': return 'bg-amber-100 text-amber-700'
    case 'Disponible': return 'bg-blue-100 text-blue-700'
    default: return 'bg-slate-100 text-slate-700'
  }
}

const voirClasse = (classe) => {
  console.log('Voir classe:', classe)
}

const modifierClasse = (classe) => {
  console.log('Modifier classe:', classe)
}

const importerExcel = () => {
  console.log('Importer depuis Excel')
}

const exporterAffectations = () => {
  console.log('Exporter les affectations')
}
</script>
