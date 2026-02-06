<template>
  <div class="p-8 max-w-7xl mx-auto w-full space-y-8">
    <!-- Stats Row -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div class="flex justify-between items-start">
          <p class="text-[#4e7397] dark:text-slate-400 text-sm font-medium">Total Élèves</p>
          <span class="material-symbols-outlined text-primary">groups</span>
        </div>
        <p class="text-3xl font-bold leading-tight">{{ stats.totalEleves }}</p>
      </div>
      <div class="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div class="flex justify-between items-start">
          <p class="text-[#4e7397] dark:text-slate-400 text-sm font-medium">Notes en Attente</p>
          <span class="material-symbols-outlined text-orange-500">pending_actions</span>
        </div>
        <p class="text-3xl font-bold leading-tight">{{ stats.notesEnAttente }}</p>
      </div>
      <div class="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div class="flex justify-between items-start">
          <p class="text-[#4e7397] dark:text-slate-400 text-sm font-medium">Notes Validées</p>
          <span class="material-symbols-outlined text-green-500">check_circle</span>
        </div>
        <p class="text-3xl font-bold leading-tight">{{ stats.notesValidees }}</p>
      </div>
      <div class="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div class="flex justify-between items-start">
          <p class="text-[#4e7397] dark:text-slate-400 text-sm font-medium">Notes Rejetées</p>
          <span class="material-symbols-outlined text-red-500">cancel</span>
        </div>
        <p class="text-3xl font-bold leading-tight">{{ stats.notesRejetees }}</p>
      </div>
    </div>

    <!-- Two-Column Actions Layout -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Recent Pending Notes -->
      <section class="flex flex-col bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div class="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
          <h3 class="font-bold flex items-center gap-2">
            <span class="material-symbols-outlined text-orange-500">pending_actions</span>
            Notes Récentes en Attente
          </h3>
          <router-link to="/censeur/notes" class="text-xs text-primary font-bold hover:underline">Tout voir</router-link>
        </div>
        <div v-if="recentPendingNotes.length > 0" class="divide-y divide-slate-100 dark:divide-slate-800">
          <div v-for="note in recentPendingNotes" :key="note._id" class="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
            <div class="flex items-start justify-between gap-4">
              <div class="flex-grow">
                <p class="text-sm font-bold">{{ note.classe?.niveau }} {{ note.classe?.section }} - {{ note.matiere?.nom }}</p>
                <p class="text-xs text-slate-500">Professeur: {{ note.professeur?.prenom }} {{ note.professeur?.nom }}</p>
                <p class="text-xs text-slate-400 mt-1">{{ note.eleve?.prenom }} {{ note.eleve?.nom }} • {{ note.periode }}</p>
              </div>
              <span class="text-[10px] font-bold px-2 py-1 rounded bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300">EN ATTENTE</span>
            </div>
          </div>
        </div>
        <div v-else class="p-8 text-center text-slate-400">
          <span class="material-symbols-outlined text-4xl mb-2">task_alt</span>
          <p class="text-sm">Aucune note en attente</p>
        </div>
      </section>

      <!-- Recently Validated Notes -->
      <section class="flex flex-col bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div class="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
          <h3 class="font-bold flex items-center gap-2">
            <span class="material-symbols-outlined text-green-500">check_circle</span>
            Validations Récentes
          </h3>
          <a class="text-xs text-primary font-bold hover:underline" href="#">Historique</a>
        </div>
        <div v-if="recentValidatedNotes.length > 0" class="divide-y divide-slate-100 dark:divide-slate-800">
          <div v-for="note in recentValidatedNotes" :key="note._id" class="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
            <div class="flex items-start justify-between gap-4">
              <div class="flex-grow">
                <p class="text-sm font-bold">{{ note.classe?.niveau }} {{ note.classe?.section }} - {{ note.matiere?.nom }}</p>
                <p class="text-xs text-slate-500">Validée par: {{ note.validePar?.prenom }} {{ note.validePar?.nom }}</p>
                <p class="text-xs text-slate-400 mt-1">{{ formatDate(note.dateValidation) }}</p>
              </div>
              <span class="text-[10px] font-bold px-2 py-1 rounded bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300">VALIDÉE</span>
            </div>
          </div>
        </div>
        <div v-else class="p-8 text-center text-slate-400">
          <span class="material-symbols-outlined text-4xl mb-2">history</span>
          <p class="text-sm">Aucune validation récente</p>
        </div>
      </section>
    </div>
    
    <!-- Modal Nouvelle Session -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px]">
      <div class="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in duration-200">
        <div class="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
          <div class="flex items-center gap-3">
            <div class="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <span class="material-symbols-outlined">add_task</span>
            </div>
            <div>
              <h2 class="text-xl font-bold tracking-tight">Lancer une Nouvelle Session</h2>
              <p class="text-xs text-slate-500 dark:text-slate-400">Configurez les paramètres de la nouvelle période administrative</p>
            </div>
          </div>
          <button @click="showModal = false" class="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors">
            <span class="material-symbols-outlined text-slate-400">close</span>
          </button>
        </div>
        
        <div class="p-8 space-y-8">
          <div class="space-y-4">
            <label class="text-sm font-bold text-slate-700 dark:text-slate-300">Type de session</label>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label class="relative flex flex-col p-4 border-2 rounded-xl cursor-pointer hover:bg-primary/10 transition-all group"
                     :class="sessionType === 'saisie' ? 'border-primary bg-primary/5' : 'border-slate-100 dark:border-slate-800'">
                <input v-model="sessionType" value="saisie" class="sr-only" name="session_type" type="radio"/>
                <span class="material-symbols-outlined mb-2" :class="sessionType === 'saisie' ? 'text-primary' : 'text-slate-400 group-hover:text-primary'">edit_note</span>
                <span class="text-sm font-bold">Saisie de notes</span>
                <span class="text-[10px] text-slate-500 mt-1 leading-tight">Ouverture des carnets de notes</span>
                <div v-if="sessionType === 'saisie'" class="absolute top-2 right-2 size-4 rounded-full border-4 border-primary bg-white"></div>
              </label>
              <label class="relative flex flex-col p-4 border-2 rounded-xl cursor-pointer hover:border-primary/30 transition-all group"
                     :class="sessionType === 'import' ? 'border-primary bg-primary/5' : 'border-slate-100 dark:border-slate-800'">
                <input v-model="sessionType" value="import" class="sr-only" name="session_type" type="radio"/>
                <span class="material-symbols-outlined mb-2" :class="sessionType === 'import' ? 'text-primary' : 'text-slate-400 group-hover:text-primary'">upload_file</span>
                <span class="text-sm font-bold">Import Excel</span>
                <span class="text-[10px] text-slate-500 mt-1 leading-tight">Mise à jour via fichier externe</span>
                <div v-if="sessionType === 'import'" class="absolute top-2 right-2 size-4 rounded-full border-4 border-primary bg-white"></div>
              </label>
              <label class="relative flex flex-col p-4 border-2 rounded-xl cursor-pointer hover:border-primary/30 transition-all group"
                     :class="sessionType === 'conseil' ? 'border-primary bg-primary/5' : 'border-slate-100 dark:border-slate-800'">
                <input v-model="sessionType" value="conseil" class="sr-only" name="session_type" type="radio"/>
                <span class="material-symbols-outlined mb-2" :class="sessionType === 'conseil' ? 'text-primary' : 'text-slate-400 group-hover:text-primary'">groups_2</span>
                <span class="text-sm font-bold">Conseil de classe</span>
                <span class="text-[10px] text-slate-500 mt-1 leading-tight">Calcul des moyennes & appréciations</span>
                <div v-if="sessionType === 'conseil'" class="absolute top-2 right-2 size-4 rounded-full border-4 border-primary bg-white"></div>
              </label>
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Période concernée</label>
              <select v-model="periode" class="w-full h-11 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/50 transition-all">
                <optgroup label="Trimestres">
                  <option value="T1">1er Trimestre</option>
                  <option value="T2">2ème Trimestre</option>
                  <option value="T3">3ème Trimestre</option>
                </optgroup>
                <optgroup label="Semestres">
                  <option value="S1">1er Semestre</option>
                  <option value="S2">2ème Semestre</option>
                </optgroup>
              </select>
            </div>
            <div class="space-y-2">
              <label class="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Date limite de saisie</label>
              <div class="relative">
                <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">calendar_today</span>
                <input v-model="dateLimite" class="w-full h-11 pl-10 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/50 transition-all" type="date"/>
              </div>
            </div>
            <div class="md:col-span-2 space-y-2">
              <label class="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Classes concernées</label>
              <div class="flex flex-wrap gap-2 p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg min-h-[80px]">
                <span v-for="classe in selectedClasses" :key="classe" class="px-2 py-1 bg-primary/10 text-primary text-xs font-bold rounded-md flex items-center gap-1">
                  {{ classe }}
                  <button @click="removeClass(classe)" class="material-symbols-outlined text-xs">close</button>
                </span>
                <button @click="addClasse" class="px-2 py-1 border-2 border-dashed border-slate-300 dark:border-slate-600 text-slate-400 text-xs font-bold rounded-md flex items-center gap-1 hover:border-primary hover:text-primary transition-colors">
                  <span class="material-symbols-outlined text-xs">add</span> Ajouter
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="p-6 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-4">
          <button @click="showModal = false" class="px-6 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-bold hover:bg-white dark:hover:bg-slate-800 transition-colors">
            Annuler
          </button>
          <button @click="lancerSession" class="px-8 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-white text-sm font-bold shadow-lg shadow-primary/20 transition-all flex items-center gap-2">
            <span class="material-symbols-outlined text-sm">rocket_launch</span>
            Lancer la session
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/services/api'

// État de la modal
const showModal = ref(false)

// Données du formulaire
const sessionType = ref('saisie')
const periode = ref('T1')
const dateLimite = ref('')
const selectedClasses = ref(['Toutes les classes', '2nde C', '1ère S'])

// Statistiques du dashboard
const stats = ref({
  totalEleves: 0,
  notesEnAttente: 0,
  notesValidees: 0,
  notesRejetees: 0
})

// Listes de notes
const recentPendingNotes = ref([])
const recentValidatedNotes = ref([])

// Charger les statistiques
const loadStats = async () => {
  try {
    // Charger le total d'élèves
    const elevesRes = await api.getUsers({ role: 'ELEVE' })
    if (elevesRes.data.success) {
      stats.value.totalEleves = elevesRes.data.count || elevesRes.data.data.length
    }

    // Charger les notes par statut
    const notesRes = await api.getNotes({})
    if (notesRes.data.success) {
      const notes = notesRes.data.data
      stats.value.notesEnAttente = notes.filter(n => n.statut === 'EN_ATTENTE').length
      stats.value.notesValidees = notes.filter(n => n.statut === 'VALIDEE').length
      stats.value.notesRejetees = notes.filter(n => n.statut === 'REJETEE').length
    }
  } catch (error) {
    console.error('Erreur chargement statistiques:', error)
  }
}

// Charger les notes récentes en attente
const loadRecentPendingNotes = async () => {
  try {
    const res = await api.getPendingNotes({})
    if (res.data.success) {
      // Prendre les 5 notes les plus récentes
      recentPendingNotes.value = res.data.data.slice(0, 5)
    }
  } catch (error) {
    console.error('Erreur chargement notes en attente:', error)
  }
}

// Charger les notes récemment validées
const loadRecentValidatedNotes = async () => {
  try {
    const res = await api.getNotes({ statut: 'VALIDEE' })
    if (res.data.success) {
      // Prendre les 5 notes les plus récentes
      recentValidatedNotes.value = res.data.data
        .sort((a, b) => new Date(b.dateValidation) - new Date(a.dateValidation))
        .slice(0, 5)
    }
  } catch (error) {
    console.error('Erreur chargement notes validées:', error)
  }
}

// Formater la date
const formatDate = (date) => {
  if (!date) return ''
  const d = new Date(date)
  return d.toLocaleDateString('fr-FR', { 
    day: '2-digit', 
    month: 'short', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Fonctions de la modal
const openModal = () => {
  showModal.value = true
}

const removeClass = (classe) => {
  selectedClasses.value = selectedClasses.value.filter(c => c !== classe)
}

const addClasse = () => {
  const nouvelleClasse = prompt('Nom de la classe:')
  if (nouvelleClasse && nouvelleClasse.trim()) {
    selectedClasses.value.push(nouvelleClasse.trim())
  }
}

const lancerSession = () => {
  console.log('Session lancée:', {
    type: sessionType.value,
    periode: periode.value,
    dateLimite: dateLimite.value,
    classes: selectedClasses.value
  })
  alert('Session lancée avec succès!')
  showModal.value = false
}

// Charger toutes les données au montage
onMounted(() => {
  loadStats()
  loadRecentPendingNotes()
  loadRecentValidatedNotes()
})

// Exposer la fonction pour la sidebar
defineExpose({
  openModal
})

</script>
