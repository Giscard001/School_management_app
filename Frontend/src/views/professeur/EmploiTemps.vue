<template>
  <div class="flex-1 flex flex-col overflow-y-auto bg-slate-50 dark:bg-slate-950">
    <!-- Page Header -->
    <header class="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-8 py-6 sticky top-0 z-10">
      <div class="max-w-[1200px] mx-auto flex flex-wrap items-center justify-between gap-6">
        <div>
          <h2 class="text-slate-900 dark:text-white text-3xl font-black tracking-tight mb-1">Mon Emploi du Temps</h2>
          <div class="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <span class="material-symbols-outlined text-sm">calendar_month</span>
            <p class="text-sm font-medium">Semaine du {{ currentWeekRange }}</p>
          </div>
        </div>
      </div>
    </header>

    <!-- Schedule Grid Container -->
    <div class="p-8 max-w-[1200px] mx-auto w-full">
      <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
            <table class="w-full border-collapse">
              <thead>
                <tr class="bg-slate-50 dark:bg-slate-800/50">
                  <th class="w-24 px-4 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-200 dark:border-slate-800">Heure</th>
                  <th v-for="day in weekDays" :key="day" class="px-4 py-4 text-center text-sm font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 min-w-[160px]" :class="{'bg-primary/5': isToday(day)}">
                      {{ day }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="time in timeSlots" :key="time" class="h-32 group">
                  <td class="px-4 py-2 border-r border-slate-100 dark:border-slate-800 text-xs font-medium text-slate-500 align-top pt-4 bg-slate-50/30 dark:bg-slate-900">{{ time }}</td>
                  
                  <td v-for="day in weekDays" :key="day + time" class="p-2 border-b border-r border-slate-100 dark:border-slate-800 relative">
                      
                      <!-- Regular Schedule -->
                      <div v-if="getSchedule(day, time)" class="h-full rounded-lg bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-3 flex flex-col justify-between mb-2">
                        <div>
                          <p class="text-blue-700 dark:text-blue-300 text-xs font-bold mb-1 uppercase">{{ getSchedule(day, time).matiere.nom }}</p>
                          <p class="text-slate-900 dark:text-white text-sm font-bold leading-tight">{{ getSchedule(day, time).classe.niveau }} {{ getSchedule(day, time).classe.section }}</p>
                        </div>
                        <div class="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-[10px] font-medium uppercase tracking-wide">
                          <span class="material-symbols-outlined text-xs">location_on</span>
                          <span>{{ getSchedule(day, time).salle || 'Salle ?' }}</span>
                        </div>
                      </div>

                      <!-- Evaluation Override/Overlay -->
                      <div v-if="getEvaluation(day, time)" class="absolute inset-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 border-l-4 border-emerald-500 p-3 flex flex-col justify-between shadow-md z-10">
                        <div>
                          <p class="text-emerald-700 dark:text-emerald-300 text-xs font-bold mb-1 uppercase text-ellipsis overflow-hidden">⚠️ ÉVALUATION: {{ getEvaluation(day, time).type }}</p>
                           <p class="text-slate-900 dark:text-white text-sm font-bold leading-tight truncate">{{ getEvaluation(day, time).titre }}</p>
                          <p class="text-xs text-emerald-800 dark:text-emerald-200">{{ getEvaluation(day, time).classe.niveau }} {{ getEvaluation(day, time).classe.section }}</p>
                        </div>
                      </div>

                      <div v-if="!getSchedule(day, time) && !getEvaluation(day, time)" class="h-full flex items-center justify-center text-slate-200 dark:text-slate-800 text-xs italic">
                          Libre
                      </div>

                  </td>
                </tr>
              </tbody>
            </table>
        </div>
      </div>
      
      <div class="mt-8 flex flex-wrap gap-6 items-center">
         <div class="flex items-center gap-2">
          <span class="size-3 rounded-sm bg-blue-500"></span>
          <span class="text-xs font-medium text-slate-600 dark:text-slate-400">Cours Régulier</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="size-3 rounded-sm bg-emerald-500"></span>
          <span class="text-xs font-medium text-slate-600 dark:text-slate-400">Évaluation Validée</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import api from '@/services/api'

// Fetch user from localStorage
const user = ref(JSON.parse(localStorage.getItem('user') || '{}'));

const weekDays = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
// Base slots, will extend dynamically
const defaultSlots = ['08:00', '10:00', '12:00', '15:00'];
const timeSlots = ref([...defaultSlots]);

const schedules = ref([]);
const evaluations = ref([]);

const currentWeekRange = computed(() => {
    return "En cours"; 
});

const isToday = (dayName) => {
    const days = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
    return days[new Date().getDay()] === dayName;
}

const fetchData = async () => {
    try {
        const userId = user.value.id || user.value._id;
        if(!userId) {
            alert("Erreur: Impossible d'identifier l'utilisateur connecté.");
            return;
        }

        // Fetch Regular Schedule
        const schedRes = await api.getSchedules({ professeur: userId });
        schedules.value = schedRes.data.data;

        // Fetch Validated Evaluations
        const evalRes = await api.getValidatedEvaluations(); 
        evaluations.value = evalRes.data.data.filter(e => e.professeur._id === userId);

        // Update TimeSlots dynamically
        const newSlots = new Set([...defaultSlots]);
        
        schedules.value.forEach(s => {
            const start = s.creneau.split('-')[0].trim();
            if(start) newSlots.add(start);
        });
        
        evaluations.value.forEach(e => {
            if(e.heureDebut) newSlots.add(e.heureDebut);
        });

        timeSlots.value = Array.from(newSlots).sort();
        
        // Console log for debugging
        console.log("Schedules loaded:", schedules.value.length);
        console.log("Evaluations loaded:", evaluations.value.length);

    } catch (err) {
        console.error("Error fetching calendar", err);
        alert("Erreur lors de l'actualisation du calendrier.");
    }
}

onMounted(() => {
    fetchData();
});

const getSchedule = (day, timePrefix) => {
    return schedules.value.find(s => s.jour === day && s.creneau.startsWith(timePrefix));
}

const getEvaluation = (day, timePrefix) => {
    return evaluations.value.find(e => {
        const d = new Date(e.date);
        const dayName = new Intl.DateTimeFormat('fr-FR', { weekday: 'long' }).format(d);
        const capitalizedDay = dayName.charAt(0).toUpperCase() + dayName.slice(1);
        return capitalizedDay === day && e.heureDebut === timePrefix;
    });
}

</script>
