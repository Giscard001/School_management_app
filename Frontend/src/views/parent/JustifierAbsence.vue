<template>
  <div class="flex-1 flex flex-col overflow-y-auto">
    <!-- Header Section -->
    <div class="px-8 pt-8">
      <!-- Breadcrumbs -->
      <div class="flex items-center gap-2 mb-4">
        <button @click="$router.go(-1)" class="text-slate-500 dark:text-slate-400 text-sm font-medium hover:underline">Accueil</button>
        <span class="text-slate-500 dark:text-slate-400 text-sm">/</span>
        <button @click="$router.go(-1)" class="text-slate-500 dark:text-slate-400 text-sm font-medium hover:underline">Absences</button>
        <span class="text-slate-500 dark:text-slate-400 text-sm">/</span>
        <span class="text-slate-900 dark:text-white text-sm font-semibold">Justifier une absence</span>
      </div>
      <!-- Page Heading -->
      <div class="flex flex-col gap-2">
        <h2 class="text-slate-900 dark:text-white text-3xl font-black tracking-tight">Justifier une absence</h2>
        <p class="text-slate-500 dark:text-slate-400 text-base">Sélectionnez une absence récente pour régulariser la situation scolaire de votre enfant.</p>
      </div>
    </div>

    <!-- Dashboard Content -->
    <div class="px-8 py-8 grid grid-cols-12 gap-8">
      <!-- Left Column: Pending List -->
      <div class="col-span-12 xl:col-span-5 flex flex-col gap-6">
        <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div class="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <h3 class="text-lg font-bold">Absences non justifiées</h3>
            <span class="bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 text-xs font-bold px-2.5 py-1 rounded-full">{{ pendingAbsences.length }} En attente</span>
          </div>
          <div class="divide-y divide-slate-100 dark:divide-slate-800">
            <!-- Absence Items -->
            <label v-for="absence in pendingAbsences" :key="absence.id" class="flex items-center gap-4 p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
              <input v-model="selectedAbsence" :value="absence.id" class="w-5 h-5 text-primary border-slate-300 focus:ring-primary" name="absence-select" type="radio"/>
              <div class="flex-1">
                <div class="flex justify-between items-start mb-1">
                  <p class="font-bold text-slate-900 dark:text-white">{{ absence.subject }}</p>
                  <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">{{ absence.date }}</p>
                </div>
                <div class="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <span class="material-symbols-outlined text-lg">schedule</span>
                  <span>{{ absence.time }}</span>
                </div>
                <div class="mt-2 flex items-center gap-2 text-xs text-slate-400">
                  <span class="material-symbols-outlined text-sm">person</span>
                  <span>{{ absence.teacher }}</span>
                </div>
              </div>
            </label>
          </div>
        </div>
        
        <!-- Helpful Info Card -->
        <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/40 rounded-xl p-6">
          <div class="flex gap-4">
            <span class="material-symbols-outlined text-blue-600 dark:text-blue-400">info</span>
            <div>
              <h4 class="font-bold text-blue-900 dark:text-blue-200 mb-1 text-sm">Rappel important</h4>
              <p class="text-sm text-blue-800 dark:text-blue-300/80 leading-relaxed">
                Toute absence doit être justifiée dans les 48 heures suivant le retour de l'élève. En cas de maladie de plus de 3 jours, un certificat médical est obligatoire.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Right Column: Form -->
      <div class="col-span-12 xl:col-span-7">
        <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-8">
          <form @submit.prevent="submitJustification" class="flex flex-col gap-8">
            <!-- Motif Selection -->
            <div class="flex flex-col gap-4">
              <label class="text-base font-bold text-slate-900 dark:text-white">Motif de l'absence</label>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                <label class="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-slate-100 dark:border-slate-800 hover:border-primary/50 cursor-pointer transition-all" :class="justificationForm.reason === 'maladie' ? 'border-primary bg-primary/5' : ''">
                  <input v-model="justificationForm.reason" class="hidden" name="reason" type="radio" value="maladie"/>
                  <span class="material-symbols-outlined text-2xl" :class="justificationForm.reason === 'maladie' ? 'text-primary' : 'text-slate-400'">medical_services</span>
                  <span class="text-xs font-semibold">Maladie</span>
                </label>
                <label class="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-slate-100 dark:border-slate-800 hover:border-primary/50 cursor-pointer transition-all" :class="justificationForm.reason === 'famille' ? 'border-primary bg-primary/5' : ''">
                  <input v-model="justificationForm.reason" class="hidden" name="reason" type="radio" value="famille"/>
                  <span class="material-symbols-outlined text-2xl" :class="justificationForm.reason === 'famille' ? 'text-primary' : 'text-slate-400'">family_restroom</span>
                  <span class="text-xs font-semibold">Famille</span>
                </label>
                <label class="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-slate-100 dark:border-slate-800 hover:border-primary/50 cursor-pointer transition-all" :class="justificationForm.reason === 'transport' ? 'border-primary bg-primary/5' : ''">
                  <input v-model="justificationForm.reason" class="hidden" name="reason" type="radio" value="transport"/>
                  <span class="material-symbols-outlined text-2xl" :class="justificationForm.reason === 'transport' ? 'text-primary' : 'text-slate-400'">directions_bus</span>
                  <span class="text-xs font-semibold">Transport</span>
                </label>
                <label class="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-slate-100 dark:border-slate-800 hover:border-primary/50 cursor-pointer transition-all" :class="justificationForm.reason === 'autre' ? 'border-primary bg-primary/5' : ''">
                  <input v-model="justificationForm.reason" class="hidden" name="reason" type="radio" value="autre"/>
                  <span class="material-symbols-outlined text-2xl" :class="justificationForm.reason === 'autre' ? 'text-primary' : 'text-slate-400'">more_horiz</span>
                  <span class="text-xs font-semibold">Autre</span>
                </label>
              </div>
            </div>
            
            <!-- Detailed Explanation -->
            <div class="flex flex-col gap-3">
              <label class="text-base font-bold text-slate-900 dark:text-white" for="details">Précisions complémentaires</label>
              <textarea v-model="justificationForm.details" class="w-full rounded-xl border-slate-200 dark:border-slate-800 dark:bg-slate-950 focus:border-primary focus:ring-primary placeholder:text-slate-400" id="details" placeholder="Décrivez brièvement la raison de l'absence..." rows="4"></textarea>
            </div>
            
            <!-- File Upload Area -->
            <div class="flex flex-col gap-3">
              <label class="text-base font-bold text-slate-900 dark:text-white">Justificatif (optionnel)</label>
              <div class="relative group">
                <div class="w-full h-40 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 group-hover:bg-slate-100 dark:group-hover:bg-slate-900 transition-colors">
                  <span class="material-symbols-outlined text-4xl text-slate-300 dark:text-slate-700 mb-2">cloud_upload</span>
                  <p class="text-sm font-medium text-slate-600 dark:text-slate-400">Cliquez ou glissez un fichier ici</p>
                  <p class="text-xs text-slate-400 mt-1">PDF, JPG ou PNG (max. 5Mo)</p>
                </div>
                <input class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" type="file" @change="handleFileUpload"/>
              </div>
              <p class="text-xs text-slate-500 dark:text-slate-400">Un certificat médical est recommandé pour les absences maladie.</p>
            </div>
            
            <!-- Submit Button -->
            <div class="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
              <button type="submit" class="flex items-center gap-2 px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all active:scale-95">
                <span>Envoyer la justification</span>
                <span class="material-symbols-outlined text-xl">send</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Données réactives
const selectedAbsence = ref('')

// Formulaire de justification
const justificationForm = ref({
  reason: 'maladie',
  details: '',
  file: null
})

// Absences en attente de justification
const pendingAbsences = ref([
  {
    id: 1,
    subject: 'Mathématiques',
    date: '12 Oct 2023',
    time: '08:00 - 10:00 (2h)',
    teacher: 'M. Lefebvre'
  },
  {
    id: 2,
    subject: 'Histoire-Géographie',
    date: '14 Oct 2023',
    time: '14:00 - 15:00 (1h)',
    teacher: 'Mme. Durand'
  }
])

// Fonctions d'action
const submitJustification = () => {
  console.log('Soumettre la justification:', {
    selectedAbsence: selectedAbsence.value,
    form: justificationForm.value
  })
  // Réinitialiser le formulaire
  justificationForm.value = {
    reason: 'maladie',
    details: '',
    file: null
  }
  selectedAbsence.value = ''
}

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    justificationForm.value.file = file
    console.log('Fichier uploadé:', file.name)
  }
}
</script>