<template>
  <div class="flex-1 flex flex-col overflow-y-auto">
    <!-- Page Header -->
    <header class="p-8 pb-4">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <div class="flex flex-col gap-1">
          <h2 class="text-slate-900 dark:text-white text-3xl font-black tracking-tight">Calendrier Scolaire</h2>
          <p class="text-slate-500 dark:text-slate-400 text-sm">Suivez l'emploi du temps, les examens et les événements de vos enfants.</p>
        </div>
        <div class="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          <button @click="viewMode = 'month'" class="px-4 py-2 text-sm font-bold bg-white dark:bg-slate-700 shadow-sm rounded-lg text-slate-900 dark:text-white">Mois</button>
          <button @click="viewMode = 'week'" class="px-4 py-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900">Semaine</button>
          <button @click="viewMode = 'day'" class="px-4 py-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900">Jour</button>
        </div>
      </div>
      <!-- Active Filters / Chips -->
      <div class="flex gap-2 mt-6 overflow-x-auto pb-2">
        <div class="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full border border-primary/20">
          <span class="material-symbols-outlined text-[18px]">group</span>
          <span class="text-xs font-bold whitespace-nowrap">Tous les enfants</span>
        </div>
        <div v-for="child in selectedChildren" :key="child.name" class="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700">
          <span class="material-symbols-outlined text-[18px]" :class="`text-${child.color}`">circle</span>
          <span class="text-xs font-medium whitespace-nowrap">{{ child.name }}</span>
        </div>
        <div class="flex items-center gap-2 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 px-3 py-1.5 rounded-full border border-amber-200 dark:border-amber-800 ml-auto">
          <span class="material-symbols-outlined text-[18px]">event</span>
          <span class="text-xs font-bold whitespace-nowrap">{{ examCount }} examens cette semaine</span>
        </div>
      </div>
    </header>

    <!-- Calendar Section -->
    <div class="px-8 pb-8 flex-1 flex flex-col min-h-0">
      <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col h-full overflow-hidden">
        <!-- Calendar Toolbar -->
        <div class="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
          <div class="flex items-center gap-4">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white">{{ currentMonthYear }}</h3>
            <div class="flex items-center gap-1 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
              <button @click="previousMonth" class="p-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400">
                <span class="material-symbols-outlined text-[20px]">chevron_left</span>
              </button>
              <button @click="goToToday" class="px-3 py-1.5 text-xs font-bold border-x border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">Aujourd'hui</button>
              <button @click="nextMonth" class="p-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400">
                <span class="material-symbols-outlined text-[20px]">chevron_right</span>
              </button>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button @click="exportCalendar" class="flex items-center gap-2 text-xs font-bold px-3 py-2 text-primary border border-primary/30 rounded-lg hover:bg-primary/5">
              <span class="material-symbols-outlined text-[18px]">download</span>
              <span>Exporter (.ics)</span>
            </button>
          </div>
        </div>

        <!-- Calendar Grid Header -->
        <div class="grid grid-cols-7 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
          <div v-for="day in weekDays" :key="day" class="py-3 text-center text-[11px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
            {{ day }}
          </div>
        </div>

        <!-- Calendar Days Grid -->
        <div class="flex-1 grid grid-cols-7 grid-rows-5 min-h-0 overflow-y-auto">
          <!-- Empty days for previous month -->
          <div v-for="day in previousMonthDays" :key="'prev-' + day" class="border-b border-r border-slate-100 dark:border-slate-800 p-2 min-h-[120px] bg-slate-50/50 dark:bg-slate-800/20 text-slate-300 dark:text-slate-600">
            {{ day }}
          </div>

          <!-- Current month days -->
          <div v-for="day in calendarDays" :key="day.date" 
               class="border-b border-r border-slate-100 dark:border-slate-800 p-2 min-h-[120px] relative group hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
               :class="{ 'bg-primary/5': day.isToday, 'bg-amber-50/50 dark:bg-amber-900/10': day.isHoliday, 'bg-green-50 dark:bg-green-900/10': day.isHoliday && day.isToday }">
            <div v-if="day.isToday" class="flex items-center justify-between">
              <span class="text-sm font-bold text-primary bg-primary/10 size-7 flex items-center justify-center rounded-full">{{ day.date }}</span>
              <span class="text-[10px] font-black text-primary/60 uppercase">AUJ.</span>
            </div>
            <span v-else class="text-sm font-bold" :class="getDayTextColor(day)">{{ day.date }}</span>
            
            <div v-if="day.events.length > 0" class="mt-1 space-y-1">
              <div v-for="event in day.events" :key="event.id" 
                   class="px-2 py-1 rounded text-[10px] font-bold truncate border-l-4 flex items-center justify-between"
                   :class="getEventClass(event)">
                <span class="truncate">{{ event.title }}</span>
                <span v-if="event.type === 'exam'" class="material-symbols-outlined text-[14px]">warning</span>
                <span v-else-if="event.type === 'course'" class="material-symbols-outlined text-[14px]">edit_note</span>
              </div>
            </div>
          </div>

          <!-- Next month days -->
          <div v-for="day in nextMonthDays" :key="'next-' + day" class="border-r border-slate-100 dark:border-slate-800 p-2 min-h-[120px] bg-slate-50/50 dark:bg-slate-800/20 text-slate-300 dark:text-slate-600">
            {{ day }}
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Insights Bottom Bar -->
    <div class="px-8 pb-8 flex gap-6">
      <div v-for="insight in nextClasses" :key="insight.child" class="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl flex items-center gap-4">
        <div class="size-12 rounded-full flex items-center justify-center" :class="`${insight.color}/10 text-${insight.color}`">
          <span class="material-symbols-outlined">{{ insight.icon }}</span>
        </div>
        <div>
          <h4 class="text-sm font-bold text-slate-900 dark:text-white">Prochain Cours: {{ insight.child }}</h4>
          <p class="text-xs text-slate-500 dark:text-slate-400">{{ insight.subject }} • {{ insight.room }} • {{ insight.time }}</p>
        </div>
        <button @click="viewDetails(insight)" class="ml-auto text-xs font-bold text-primary hover:underline">Voir détails</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Données réactives
const viewMode = ref('month')
const currentMonth = ref(new Date().getMonth())
const currentYear = ref(new Date().getFullYear())

// Enfants sélectionnés
const selectedChildren = ref([
  { name: 'Léo', color: 'leo-blue' },
  { name: 'Sarah', color: 'sarah-pink' }
])

// Jours de la semaine
const weekDays = ref(['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'])

// Événements du calendrier
const calendarEvents = ref([
  { date: 1, child: 'Sarah', title: 'Sortie Zoo', type: 'activity', color: 'sarah-pink' },
  { date: 5, child: 'Léo', title: 'Maths (Interro)', type: 'course', color: 'leo-blue' },
  { date: 5, child: 'Sarah', title: 'Piscine', type: 'activity', color: 'sarah-pink' },
  { date: 6, child: 'Léo', title: 'Club Échecs', type: 'activity', color: 'leo-blue' },
  { date: 9, child: 'all', title: 'Réunion Parents/Prof', type: 'meeting', color: 'primary' },
  { date: 14, child: 'Léo', title: 'EXAMEN ANGLAIS', type: 'exam', color: 'amber' },
  { date: 22, child: 'all', title: 'JOUR FÉRIÉ', type: 'holiday', color: 'green' },
  { date: 29, child: 'Sarah', title: 'EXAMEN HISTOIRE', type: 'exam', color: 'amber' }
])

// Prochains cours
const nextClasses = ref([
  {
    child: 'Léo',
    subject: 'Physique-Chimie',
    room: 'Salle 204',
    time: '14:00',
    color: 'leo-blue',
    icon: 'menu_book'
  },
  {
    child: 'Sarah',
    subject: 'Arts Plastiques',
    room: 'Atelier A',
    time: '15:30',
    color: 'sarah-pink',
    icon: 'palette'
  }
])

// Computed properties
const currentMonthYear = computed(() => {
  const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
  return `${monthNames[currentMonth.value]} ${currentYear.value}`
})

const previousMonthDays = computed(() => {
  const firstDay = new Date(currentYear.value, currentMonth.value, 1)
  const lastDayOfPrevMonth = new Date(currentYear.value, currentMonth.value, 0)
  const startDay = firstDay.getDay()
  const days = []
  
  for (let i = startDay - 1; i >= 0; i--) {
    days.push(lastDayOfPrevMonth.getDate() - i)
  }
  
  return days
})

const calendarDays = computed(() => {
  const firstDay = new Date(currentYear.value, currentMonth.value, 1)
  const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0)
  const days = []
  const today = new Date()
  
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const currentDate = new Date(currentYear.value, currentMonth.value, i)
    const dayEvents = calendarEvents.value.filter(event => event.date === i)
    const isToday = currentDate.toDateString() === today.toDateString()
    const isHoliday = dayEvents.some(event => event.type === 'holiday')
    
    days.push({
      date: i,
      isToday,
      isHoliday,
      events: dayEvents
    })
  }
  
  return days
})

const nextMonthDays = computed(() => {
  const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0)
  const totalCells = 35 // 5 rows * 7 days
  const filledCells = previousMonthDays.value.length + calendarDays.value.length
  const remaining = totalCells - filledCells
  
  const days = []
  for (let i = 1; i <= remaining; i++) {
    days.push(i)
  }
  
  return days
})

const examCount = computed(() => {
  return calendarEvents.value.filter(event => event.type === 'exam').length
})

// Fonctions utilitaires
const getDayTextColor = (day) => {
  if (day.isHoliday) return 'text-amber-500'
  if (day.isToday && day.isHoliday) return 'text-green-500'
  if (day.isToday) return 'text-primary'
  return 'text-slate-400'
}

const getEventClass = (event) => {
  switch (event.type) {
    case 'exam':
      return 'bg-amber-500 border-amber-700 text-white shadow-sm'
    case 'course':
      return event.color === 'leo-blue' ? 'bg-leo-blue border-leo-blue/50 text-white shadow-sm' : 'bg-sarah-pink/10 border-sarah-pink text-sarah-pink'
    case 'activity':
      return event.color === 'sarah-pink' ? 'bg-sarah-pink/10 border-sarah-pink text-sarah-pink' : 'bg-leo-blue/10 border-leo-blue text-leo-blue'
    case 'meeting':
      return 'bg-primary/10 border-primary text-primary'
    case 'holiday':
      return 'bg-green-500 text-white text-center'
    default:
      return 'bg-slate-100 border-slate-400 text-slate-700'
  }
}

// Fonctions d'action
const previousMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value++
  } else {
    currentMonth.value++
  }
}

const goToToday = () => {
  const today = new Date()
  currentMonth.value = today.getMonth()
  currentYear.value = today.getFullYear()
}

const exportCalendar = () => {
  console.log('Exporter le calendrier en .ics')
}

const viewDetails = (insight) => {
  console.log('Voir détails du cours:', insight)
}
</script>
