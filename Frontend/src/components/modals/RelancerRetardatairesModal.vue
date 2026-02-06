<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay" @click="closeModal">
    <div class="bg-white dark:bg-slate-900 w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 dark:border-slate-800" @click.stop>
      <!-- Modal Header -->
      <div class="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center">
            <span class="material-symbols-outlined text-amber-600 text-xl">warning</span>
          </div>
          <div>
            <h2 class="text-2xl font-bold text-slate-900 dark:text-white">Relancer les Retardataires</h2>
            <p class="text-slate-500 dark:text-slate-400">Identifiez et contactez les enseignants en retard de saisie</p>
          </div>
        </div>
        <button @click="closeModal" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
          <span class="material-symbols-outlined text-2xl">close</span>
        </button>
      </div>

      <!-- Alert Summary -->
      <div class="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6 m-6">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
            <span class="material-symbols-outlined text-amber-600 text-xl">warning</span>
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-bold text-amber-800 dark:text-amber-200">Action requise</h3>
            <p class="text-amber-700 dark:text-amber-300">{{ stats.totalRetardataires }} enseignants ont un retard de saisie critique (>7 jours)</p>
          </div>
        </div>
      </div>

      <!-- Stats Overview -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mx-6">
        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div class="flex items-center justify-between mb-4">
            <span class="text-slate-500 dark:text-slate-400 text-sm font-medium">Total retardataires</span>
            <span class="material-symbols-outlined text-amber-500">pending</span>
          </div>
          <p class="text-3xl font-bold text-amber-600">{{ stats.totalRetardataires }}</p>
        </div>
        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div class="flex items-center justify-between mb-4">
            <span class="text-slate-500 dark:text-slate-400 text-sm font-medium">Retard critique</span>
            <span class="material-symbols-outlined text-red-500">error</span>
          </div>
          <p class="text-3xl font-bold text-red-600">{{ stats.retraitCritique }}</p>
        </div>
        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div class="flex items-center justify-between mb-4">
            <span class="text-slate-500 dark:text-slate-400 text-sm font-medium">Rappels envoyés</span>
            <span class="material-symbols-outlined text-blue-500">mail</span>
          </div>
          <p class="text-3xl font-bold text-blue-600">{{ stats.rappelsEnvoyes }}</p>
        </div>
        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div class="flex items-center justify-between mb-4">
            <span class="text-slate-500 dark:text-slate-400 text-sm font-medium">Taux de réponse</span>
            <span class="material-symbols-outlined text-green-500">trending_up</span>
          </div>
          <p class="text-3xl font-bold text-green-600">{{ stats.tauxReponse }}%</p>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm mx-6">
        <div class="flex flex-wrap gap-4 items-center">
          <div class="flex-1 min-w-[200px]">
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Département</label>
            <select v-model="filters.departement" class="w-full h-11 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary">
              <option>Tous les départements</option>
              <option>Mathématiques</option>
              <option>Français</option>
              <option>Sciences</option>
              <option>Histoire-Géo</option>
            </select>
          </div>
          <div class="flex-1 min-w-[200px]">
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Niveau d'urgence</label>
            <select v-model="filters.urgence" class="w-full h-11 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary">
              <option>Tous les niveaux</option>
              <option value="critique">Critique (>7 jours)</option>
              <option value="moyen">Moyen (3-7 jours)</option>
              <option value="faible">Faible (<3 jours)</option>
            </select>
          </div>
          <button @click="appliquerFiltres" class="h-11 px-6 bg-slate-900 dark:bg-slate-700 text-white font-bold rounded-lg text-sm hover:bg-slate-800 transition-colors">
            Appliquer
          </button>
        </div>
      </div>

      <!-- Teachers Table -->
      <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden mx-6 mb-6">
        <div class="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
          <h3 class="text-lg font-bold text-slate-900 dark:text-white">Enseignants en retard</h3>
          <div class="flex items-center gap-2">
            <span class="inline-block w-2 h-2 rounded-full bg-amber-500"></span>
            <span class="text-xs font-medium text-slate-500">Dernière mise à jour il y a 2h</span>
          </div>
        </div>
        <div class="overflow-x-auto max-h-60 overflow-y-auto">
          <table class="w-full">
            <thead>
              <tr class="bg-slate-50 dark:bg-slate-700/50">
                <th class="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Enseignant</th>
                <th class="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Département</th>
                <th class="px-6 py-3 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">Jours de retard</th>
                <th class="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Classes concernées</th>
                <th class="px-6 py-3 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">Dernier rappel</th>
                <th class="px-6 py-3 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-700">
              <tr v-for="enseignant in retardataires" :key="enseignant.id" class="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span class="material-symbols-outlined text-primary text-sm">person</span>
                    </div>
                    <div>
                      <p class="font-medium text-slate-900 dark:text-white">{{ enseignant.nom }}</p>
                      <p class="text-sm text-slate-500">{{ enseignant.email }}</p>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <span class="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-xs rounded-full">{{ enseignant.departement }}</span>
                </td>
                <td class="px-6 py-4 text-center">
                  <span class="font-bold" :class="getRetardColor(enseignant.joursRetard)">{{ enseignant.joursRetard }}</span>
                </td>
                <td class="px-6 py-4">
                  <div class="flex flex-wrap gap-1">
                    <span v-for="classe in enseignant.classes" :key="classe" class="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-xs rounded">{{ classe }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 text-center text-sm text-slate-500">
                  {{ enseignant.dernierRappel }}
                </td>
                <td class="px-6 py-4 text-center">
                  <div class="flex items-center justify-center gap-2">
                    <button class="text-primary hover:text-primary/80 text-sm font-medium">Voir</button>
                    <button class="text-amber-600 hover:text-amber-800 text-sm font-medium">Rappeler</button>
                    <button class="text-red-600 hover:text-red-800 text-sm font-medium">Alerte</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Modal Footer -->
      <div class="flex justify-end gap-3 p-6 border-t border-slate-100 dark:border-slate-800">
        <button @click="closeModal" class="px-6 py-3 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
          Annuler
        </button>
        <button @click="sendReminders" class="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
          <span class="material-symbols-outlined mr-2">send</span>
          Envoyer les rappels
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  retardataires: {
    type: Array,
    default: () => []
  },
  stats: {
    type: Object,
    default: () => ({
      totalRetardataires: 0,
      retraitCritique: 0,
      rappelsEnvoyes: 0,
      tauxReponse: 0
    })
  }
})

const isOpen = ref(false)

const filters = ref({
  departement: 'Tous les départements',
  urgence: 'Tous les niveaux'
})

const openModal = () => {
  isOpen.value = true
}

const closeModal = () => {
  isOpen.value = false
}

const appliquerFiltres = () => {
  console.log('Filtres appliqués:', filters.value)
}

const sendReminders = () => {
  console.log('Rappels envoyés')
  closeModal()
}

const getRetardColor = (jours) => {
  if (jours >= 7) return 'text-red-600'
  if (jours >= 3) return 'text-amber-600'
  return 'text-green-600'
}

defineExpose({
  openModal,
  closeModal
})
</script>
