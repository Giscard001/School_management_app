<template>
  <div class="flex-1 flex flex-col overflow-y-auto">
    <!-- Top Navbar -->
    <header class="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-8 flex items-center justify-between sticky top-0 z-10">
      <div class="flex items-center gap-4">
        <div class="relative">
          <span class="absolute inset-y-0 left-3 flex items-center text-slate-400">
            <span class="material-symbols-outlined text-sm">search</span>
          </span>
          <input v-model="searchQuery" class="pl-10 pr-4 py-1.5 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary w-64" placeholder="Rechercher..." type="text"/>
        </div>
      </div>
      <div class="flex items-center gap-4">
        <button class="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg relative">
          <span class="material-symbols-outlined">notifications</span>
          <span class="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
        </button>
        <div class="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>
        <div class="flex items-center gap-3">
          <span class="text-sm font-medium hidden md:block">Enfant: {{ currentChild.name }} ({{ currentChild.class }})</span>
          <div class="size-8 rounded-full bg-cover bg-center ring-2 ring-primary/20" :style="`background-image: url('${currentChild.avatar}')`"></div>
        </div>
      </div>
    </header>

    <div class="p-8 space-y-8 max-w-7xl mx-auto w-full">
      <!-- Page Heading -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 class="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Discipline et Assiduité</h1>
          <p class="text-slate-500 dark:text-slate-400 mt-1">Suivi complet de l'assiduité pour {{ currentChild.name }} • Année 2023-2024</p>
        </div>
        <div class="flex gap-3">
          <button @click="downloadReport" class="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors flex items-center gap-2">
            <span class="material-symbols-outlined text-sm">download</span>
            Rapport PDF
          </button>
          <button @click="justifyAbsence" class="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2">
            <span class="material-symbols-outlined text-sm">add_circle</span>
            Justifier une absence
          </button>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
          <div class="flex justify-between items-start mb-4">
            <div class="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg">
              <span class="material-symbols-outlined">event_busy</span>
            </div>
            <span class="text-xs font-bold text-red-500">-10% vs mois dernier</span>
          </div>
          <p class="text-slate-500 dark:text-slate-400 text-sm font-medium">Absences cumulées</p>
          <p class="text-3xl font-bold mt-1">{{ stats.absences }}</p>
        </div>
        <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
          <div class="flex justify-between items-start mb-4">
            <div class="p-2 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-lg">
              <span class="material-symbols-outlined">schedule</span>
            </div>
            <span class="text-xs font-bold text-red-500">+2% vs mois dernier</span>
          </div>
          <p class="text-slate-500 dark:text-slate-400 text-sm font-medium">Retards signalés</p>
          <p class="text-3xl font-bold mt-1">{{ stats.delays }}</p>
        </div>
        <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
          <div class="flex justify-between items-start mb-4">
            <div class="p-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg">
              <span class="material-symbols-outlined">gavel</span>
            </div>
            <span class="text-xs font-bold text-slate-500">0% stable</span>
          </div>
          <p class="text-slate-500 dark:text-slate-400 text-sm font-medium">Sanctions actives</p>
          <p class="text-3xl font-bold mt-1">{{ stats.sanctions }}</p>
        </div>
        <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
          <div class="flex justify-between items-start mb-4">
            <div class="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg">
              <span class="material-symbols-outlined">workspace_premium</span>
            </div>
            <span class="text-xs font-bold text-green-500">+15% vs mois dernier</span>
          </div>
          <p class="text-slate-500 dark:text-slate-400 text-sm font-medium">Félicitations</p>
          <p class="text-3xl font-bold mt-1">{{ stats.achievements }}</p>
        </div>
      </div>

      <!-- Main Dashboard Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left Column: Calendar & Chart -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Attendance Calendar Section -->
          <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div class="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h3 class="text-lg font-bold">Calendrier des présences</h3>
              <div class="flex items-center gap-2">
                <button @click="previousMonth" class="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md">
                  <span class="material-symbols-outlined text-sm leading-none">chevron_left</span>
                </button>
                <span class="text-sm font-semibold">{{ currentMonthYear }}</span>
                <button @click="nextMonth" class="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md">
                  <span class="material-symbols-outlined text-sm leading-none">chevron_right</span>
                </button>
              </div>
            </div>
            <div class="p-6">
              <div class="grid grid-cols-7 gap-px bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden border border-slate-100 dark:border-slate-800">
                <!-- Days header -->
                <div v-for="day in weekDays" :key="day" class="bg-slate-50 dark:bg-slate-900 py-2 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {{ day }}
                </div>
                <!-- Calendar Grid -->
                <div v-for="day in calendarDays" :key="day.date" class="h-24 p-2 relative" :class="getDayClass(day)">
                  <span class="text-sm" :class="getDayTextColor(day)">{{ day.date }}</span>
                  <div v-if="day.event" class="absolute bottom-2 left-2 right-2 text-[10px] text-white p-1 rounded font-bold truncate" :class="getEventClass(day.event.type)">
                    {{ day.event.label }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Monthly Trend Chart -->
          <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
            <div class="flex items-center justify-between mb-8">
              <h3 class="text-lg font-bold">Taux de présence mensuel</h3>
              <div class="flex items-center gap-4 text-xs font-medium text-slate-500">
                <div class="flex items-center gap-1.5">
                  <span class="size-2 rounded-full bg-primary"></span>
                  {{ currentChild.name }}
                </div>
                <div class="flex items-center gap-1.5">
                  <span class="size-2 rounded-full bg-slate-300"></span>
                  Moyenne Classe
                </div>
              </div>
            </div>
            <div class="h-48 flex items-end justify-between gap-4 px-2">
              <div v-for="(month, index) in attendanceData" :key="index" class="flex-1 flex flex-col items-center gap-2 group">
                <div class="w-full flex justify-center gap-1 h-full items-end">
                  <div class="w-full bg-slate-200 dark:bg-slate-800 rounded-t-lg" :style="`height: ${month.classAverage}%`"></div>
                  <div class="w-full bg-primary rounded-t-lg transition-all hover:brightness-110" :style="`height: ${month.studentPercentage}%`"></div>
                </div>
                <span class="text-[10px] font-bold text-slate-400">{{ month.name }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Disciplinary Log -->
        <div class="space-y-6">
          <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 h-full">
            <div class="px-6 py-5 border-b border-slate-100 dark:border-slate-800">
              <h3 class="text-lg font-bold">Rapports d'incidents & Mérites</h3>
            </div>
            <div class="p-6 space-y-6">
              <!-- Log Items -->
              <div v-for="log in disciplinaryLogs" :key="log.id" class="relative pl-8" :class="log.showLine ? 'before:absolute before:left-0 before:top-2 before:bottom-0 before:w-px before:bg-slate-200 dark:before:bg-slate-800' : ''">
                <div class="absolute left-[-12px] top-1 size-6 rounded-full border-4 border-white dark:border-slate-900 flex items-center justify-center" :class="getLogIconColor(log.type)">
                  <span class="material-symbols-outlined text-[12px] text-white">{{ log.icon }}</span>
                </div>
                <div class="flex flex-col gap-1">
                  <div class="flex justify-between items-start">
                    <span class="text-xs font-bold uppercase" :class="getLogTextColor(log.type)">{{ log.typeLabel }}</span>
                    <span class="text-[10px] text-slate-500">{{ log.time }}</span>
                  </div>
                  <h4 class="text-sm font-bold">{{ log.title }}</h4>
                  <p class="text-xs text-slate-600 dark:text-slate-400">{{ log.description }}</p>
                  <div v-if="log.action" class="mt-2 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800">
                    Action: {{ log.action }}
                  </div>
                  <div v-if="log.status" class="mt-2 flex gap-2">
                    <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      {{ log.status }}
                    </span>
                  </div>
                  <div v-if="log.attachable" class="mt-3">
                    <button @click="attachDocument(log)" class="text-[11px] font-bold text-primary hover:underline flex items-center gap-1">
                      <span class="material-symbols-outlined text-xs">attach_file</span>
                      Joindre un justificatif
                    </button>
                  </div>
                  <p class="text-[10px] mt-2 italic text-slate-400">Par: {{ log.author }}</p>
                </div>
              </div>
            </div>
            <div class="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 text-center rounded-b-xl border-t border-slate-100 dark:border-slate-800">
              <button @click="viewFullHistory" class="text-sm font-bold text-slate-500 hover:text-primary transition-colors">Voir l'historique complet</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Guidance / Information Section -->
      <div class="bg-primary/5 dark:bg-primary/10 rounded-xl border border-primary/20 p-6 flex items-start gap-4">
        <span class="material-symbols-outlined text-primary text-3xl">info</span>
        <div>
          <h4 class="font-bold text-slate-900 dark:text-white">Note sur le règlement intérieur</h4>
          <p class="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-3xl">
            Conformément au règlement de l'établissement, toute absence doit être justifiée dans les 48h. 
            Au-delà de 3 retards non justifiés par mois, une heure de retenue sera automatiquement programmée. 
            Vous pouvez contacter la vie scolaire via l'onglet Communication pour toute précision.
          </p>
        </div>
      </div>
    </div>

    <!-- Footer Padding -->
    <div class="h-10"></div>

    <!-- Absence Justification Modal -->
    <div v-if="showJustificationModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div class="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-5xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        <div class="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <h3 class="text-xl font-bold text-slate-900 dark:text-white">Justifier une absence</h3>
          <button @click="showJustificationModal = false" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
            <span class="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>
        
        <div class="p-8 grid grid-cols-12 gap-8">
          <!-- Left Column: Pending List -->
          <div class="col-span-12 xl:col-span-5 flex flex-col gap-6">
            <div class="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
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
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Données réactives
const searchQuery = ref('')
const showJustificationModal = ref(false)
const selectedAbsence = ref('')

// Enfant actuel
const currentChild = ref({
  name: 'Lucas Dupont',
  class: '3ème A',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOGlu2mO3yVXJw5p-kE_CXcnkcLNdotPuWx3kc9-GPRG1htzrzWXrdkrYZJs3Z70jFfCwfDfmPcu6AglLnXE1tU9JUxHLOoZ8ebPY8wMEAS3u6FTTyHZ2q6794_mn6kOCf4OFiaNQZmSi8ZAggbXuFUU3LfWFgBtxuY2cMxYjjJTgOdy7ZSpBQlh1v6Rt61qgqP5-Einl3nSwiC2dMfcZxAxF0heBOYlQvSC_MPyB4GS6nCjkmHleHaO-ELh5IFpj-WTkgHYLtpbQ'
})

// Statistiques
const stats = ref({
  absences: 3,
  delays: 5,
  sanctions: 1,
  achievements: 12
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

// Formulaire de justification
const justificationForm = ref({
  reason: 'maladie',
  details: '',
  file: null
})

// Jours de la semaine
const weekDays = ref(['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'])

// Mois actuel
const currentMonthYear = ref('Octobre 2023')

// Jours du calendrier
const calendarDays = ref([
  { date: 25, isPreviousMonth: true },
  { date: 26, isPreviousMonth: true },
  { date: 27, isPreviousMonth: true },
  { date: 28, isPreviousMonth: true },
  { date: 29, isPreviousMonth: true },
  { date: 30, isPreviousMonth: true },
  { date: 1 },
  { date: 2 },
  { date: 3, event: { type: 'absence', label: 'Absence injustifiée' } },
  { date: 4 },
  { date: 5 },
  { date: 6 },
  { date: 7 },
  { date: 8 },
  { date: 9 },
  { date: 10 },
  { date: 11 },
  { date: 12, event: { type: 'delay', label: 'Retard 15 min' } },
  { date: 13 },
  { date: 14 },
  { date: 15 },
  { date: 16 },
  { date: 17 },
  { date: 18 },
  { date: 19, isToday: true, event: { type: 'today', label: 'Aujourd\'hui' } },
  { date: 20 },
  { date: 21 },
  { date: 22 }
])

// Données de présence mensuelle
const attendanceData = ref([
  { name: 'Sep', studentPercentage: 95, classAverage: 80 },
  { name: 'Oct', studentPercentage: 90, classAverage: 85 },
  { name: 'Nov', studentPercentage: 88, classAverage: 82 },
  { name: 'Déc', studentPercentage: 85, classAverage: 80 },
  { name: 'Jan', studentPercentage: 98, classAverage: 90 },
  { name: 'Fév', studentPercentage: 92, classAverage: 85 }
])

// Logs disciplinaires
const disciplinaryLogs = ref([
  {
    id: 1,
    type: 'achievement',
    typeLabel: 'Félicitation',
    icon: 'star',
    title: 'Excellente participation en Mathématiques',
    description: 'Lucas a montré une grande maîtrise lors du contrôle de trigonométrie et a aidé ses camarades.',
    author: 'M. Martin (Prof. Maths)',
    time: 'Aujourd\'hui, 10:30',
    showLine: true
  },
  {
    id: 2,
    type: 'sanction',
    typeLabel: 'Sanction',
    icon: 'warning',
    title: 'Oubli de matériel répété',
    description: 'Manque le manuel de Français pour la 3ème fois cette semaine.',
    action: 'Observation carnet',
    author: 'Mme Lefebvre (Prof. Français)',
    time: '14 Oct 2023',
    showLine: true
  },
  {
    id: 3,
    type: 'delay',
    typeLabel: 'Retard',
    icon: 'history',
    title: 'Retard en début de journée',
    description: 'Arrivée à 08:15 au lieu de 08:00 (Cours de Technologie).',
    status: 'Justifié (Transport)',
    author: 'Vie Scolaire',
    time: '12 Oct 2023',
    showLine: true
  },
  {
    id: 4,
    type: 'incident',
    typeLabel: 'Incident',
    icon: 'info',
    title: 'Absence non justifiée',
    description: 'Absence signalée sur l\'ensemble de la journée.',
    attachable: true,
    author: 'Vie Scolaire',
    time: '03 Oct 2023',
    showLine: false
  }
])

// Fonctions utilitaires
const getDayClass = (day) => {
  if (day.isPreviousMonth) return 'bg-white dark:bg-slate-900 text-slate-300'
  if (day.isToday) return 'bg-primary/5 dark:bg-primary/20 relative ring-2 ring-primary'
  if (day.event?.type === 'absence') return 'bg-red-50 dark:bg-red-900/10'
  if (day.event?.type === 'delay') return 'bg-amber-50 dark:bg-amber-900/10 ring-1 ring-inset ring-amber-200'
  return 'bg-white dark:bg-slate-900'
}

const getDayTextColor = (day) => {
  if (day.isPreviousMonth) return 'text-slate-300'
  if (day.isToday) return 'font-bold text-primary'
  return ''
}

const getEventClass = (type) => {
  switch (type) {
    case 'absence': return 'bg-red-500'
    case 'delay': return 'bg-amber-500'
    case 'today': return 'bg-primary text-center'
    default: return 'bg-slate-500'
  }
}

const getLogIconColor = (type) => {
  switch (type) {
    case 'achievement': return 'bg-green-500'
    case 'sanction': return 'bg-red-500'
    case 'delay': return 'bg-amber-500'
    case 'incident': return 'bg-slate-400'
    default: return 'bg-slate-400'
  }
}

const getLogTextColor = (type) => {
  switch (type) {
    case 'achievement': return 'text-green-600'
    case 'sanction': return 'text-red-600'
    case 'delay': return 'text-amber-600'
    case 'incident': return 'text-slate-500'
    default: return 'text-slate-500'
  }
}

// Fonctions d'action
const previousMonth = () => {
  console.log('Mois précédent')
}

const nextMonth = () => {
  console.log('Mois suivant')
}

const downloadReport = () => {
  console.log('Télécharger le rapport PDF')
}

const justifyAbsence = () => {
  showJustificationModal.value = true
}

const submitJustification = () => {
  console.log('Soumettre la justification:', {
    selectedAbsence: selectedAbsence.value,
    form: justificationForm.value
  })
  showJustificationModal.value = false
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

const attachDocument = (log) => {
  console.log('Joindre un justificatif pour:', log.title)
}

const viewFullHistory = () => {
  console.log('Voir l\'historique complet')
}
</script>
