<template>
  <div class="p-8 max-w-7xl mx-auto w-full">
    <!-- Page Heading -->
    <div class="flex flex-wrap justify-between items-end gap-4 mb-8">
      <div class="flex flex-col gap-1">
        <h2 class="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Bonjour, M. Martin</h2>
        <p class="text-slate-500 dark:text-slate-400">Voici l'aperçu de votre journée du vendredi 24 Mai 2024</p>
      </div>
    </div>

    <!-- Stats Overview -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div class="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-slate-800 border border-[#d0dbe7] dark:border-slate-700 shadow-sm">
        <div class="flex justify-between items-start">
          <p class="text-slate-500 dark:text-slate-400 text-sm font-medium">Cours aujourd'hui</p>
          <span class="material-symbols-outlined text-primary">schedule</span>
        </div>
        <p class="text-3xl font-bold">{{ stats.coursAujourdHui }}</p>
      </div>
      <div class="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-slate-800 border border-[#d0dbe7] dark:border-slate-700 shadow-sm">
        <div class="flex justify-between items-start">
          <p class="text-slate-500 dark:text-slate-400 text-sm font-medium">Alertes absences</p>
          <span class="material-symbols-outlined text-red-500">person_off</span>
        </div>
        <p class="text-3xl font-bold">{{ stats.alertesAbsences }}</p>
      </div>
    </div>

    <!-- Dashboard Grid -->
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
      <!-- Left: Today's Schedule -->
      <div class="xl:col-span-2 space-y-6">
        <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
            <div class="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
            <h3 class="font-bold text-lg">Cours du jour</h3>
            <button @click="router.push('/professeur/emploi-temps')" class="text-primary text-sm font-semibold hover:underline">Voir tout l'agenda</button>
          </div>
          <div class="p-6">
            <div class="space-y-4">
              <!-- Course Item -->
              <div v-for="cours in coursDuJour" :key="cours.id" class="flex items-center gap-4 p-4 rounded-xl" :class="getCoursClass(cours.statut)">
                <div v-if="cours.statut === 'encours'" class="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                <div class="flex flex-col items-center justify-center min-w-[70px] border-r border-slate-200 dark:border-slate-700 pr-4">
                  <span class="text-xs font-bold uppercase" :class="getCoursStatutClass(cours.statut)">{{ getCoursStatutText(cours.statut) }}</span>
                  <span class="text-sm font-semibold" :class="getCoursTimeClass(cours.statut)">{{ cours.heure }}</span>
                </div>
                <div class="flex-1">
                  <h4 class="font-bold text-slate-900 dark:text-white">{{ cours.matiere }} - {{ cours.sujet }}</h4>
                  <p class="text-sm text-slate-500">{{ cours.classe }} • {{ cours.salle }}</p>
                </div>
                <span v-if="cours.statut === 'termine'" class="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Présence validée</span>
                <button v-else-if="cours.statut === 'encours' || cours.statut === 'prochain'" @click="handleFaireAppel(cours.classeId)" class="px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg shadow-sm hover:bg-primary/90 transition-colors">Faire l'appel</button>
                <span v-else class="material-symbols-outlined text-slate-300">more_vert</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Progress Section -->

      </div>

      <!-- Right: Notifications & Recent Activity -->
      <div class="flex flex-col gap-6">
        <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm flex-1">
          <div class="px-6 py-4 border-b border-slate-100 dark:border-slate-700">
            <h3 class="font-bold text-lg">Notifications récentes</h3>
          </div>
          <div class="divide-y divide-slate-100 dark:divide-slate-700">
            <div v-for="notif in notifications" :key="notif.id" class="p-4 flex gap-4 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
              <div class="size-10 rounded-full flex items-center justify-center shrink-0" :class="getNotificationIconClass(notif.type)">
                <span class="material-symbols-outlined text-xl">{{ notif.icon }}</span>
              </div>
              <div>
                <p class="text-sm font-semibold">{{ notif.titre }}</p>
                <p class="text-xs text-slate-500 mb-1">{{ notif.description }}</p>
                <span class="text-[10px] text-slate-400 font-medium">{{ notif.temps }}</span>
              </div>
            </div>
          </div>
          <div class="p-4 bg-slate-50 dark:bg-slate-900/30">
            <button class="w-full text-center text-sm font-bold text-slate-500 hover:text-primary transition-colors">Voir toutes les notifications</button>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="bg-primary rounded-xl p-6 text-white shadow-lg shadow-primary/30">
          <h3 class="font-bold text-lg mb-4">Actions rapides</h3>
          <div class="grid grid-cols-2 gap-3">
            <button v-for="action in actionsRapides" :key="action.id" @click="handleAction(action.id)" class="flex flex-col items-center gap-2 p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
              <span class="material-symbols-outlined">{{ action.icon }}</span>
              <span class="text-xs font-semibold">{{ action.label }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'

const router = useRouter()

// Données statiques
const user = ref(JSON.parse(localStorage.getItem('user') || '{}'))

// Données statiques -> Dynamiques
const stats = ref({
  coursAujourdHui: 0,
  alertesAbsences: 0
})

const coursDuJour = ref([])
// Removed progressionNotes

const notifications = ref([])

onMounted(async () => {
    try {
        const userId = user.value.id || user.value._id;
        
        // 1. Fetch Schedule for Today
        const schedRes = await api.getSchedules({ professeur: userId });
        const allSchedules = schedRes.data.data;
        
        const days = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
        const todayName = days[new Date().getDay()]; 
        
        const todayCourses = allSchedules.filter(s => s.jour === todayName);
        
        coursDuJour.value = todayCourses.sort((a,b) => a.creneau.localeCompare(b.creneau)).map(s => ({
            id: s._id,
            statut: isCurrentCourse(s.creneau) ? 'encours' : (isPastCourse(s.creneau) ? 'termine' : 'prochain'),
            heure: s.creneau, 
            matiere: s.matiere.nom,
            sujet: '', 
            classe: `${s.classe.niveau} ${s.classe.section}`,
            classeId: s.classe._id, 
            salle: s.salle,
            hasAttendance: false 
        }));
        
        stats.value.coursAujourdHui = coursDuJour.value.length;

        // 2. Fetch Pending Evaluations
        const evalsRes = await api.getMyEvaluations();
        const pendingEvals = evalsRes.data.data.filter(e => e.statut === 'EN_ATTENTE');
        stats.value.notesEnAttente = pendingEvals.length;
        
        // 3. Absences Alerts
        stats.value.alertesAbsences = 0; 

        // 4. Fetch Notifications
        const notifRes = await api.getNotifications();
        notifications.value = notifRes.data.data.map(n => ({
            id: n._id,
            type: n.type === 'error' ? 'error' : (n.type === 'warning' ? 'warning' : 'info'), // Map backend types if different
            icon: n.subject.includes('Absence') ? 'report' : (n.subject.includes('Note') ? 'history_edu' : 'info'),
            titre: n.subject,
            description: n.content,
            temps: new Date(n.createdAt).toLocaleDateString() + ' ' + new Date(n.createdAt).toLocaleTimeString()
        })).slice(0, 5); // Limit to 5

    } catch (err) {
        console.error("Error loading dashboard", err);
    }
})

const actionsRapides = ref([
  { id: 3, icon: 'upload_file', label: 'Import Notes' },
  { id: 4, icon: 'description', label: 'Bulletins' }
])

// Fonctions utilitaires
const getCoursClass = (statut) => {
  switch(statut) {
    case 'termine': return 'bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700'
    case 'encours': return 'bg-primary/5 border border-primary/20 relative overflow-hidden'
    default: return 'bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700'
  }
}

const getCoursStatutClass = (statut) => {
  switch(statut) {
    case 'termine': return 'text-slate-400'
    case 'encours': return 'text-primary'
    default: return 'text-slate-400'
  }
}

const getCoursTimeClass = (statut) => {
  switch(statut) {
    case 'termine': return 'text-slate-500'
    case 'encours': return 'text-primary'
    default: return 'text-slate-700 dark:text-slate-300'
  }
}

const getCoursStatutText = (statut) => {
  switch(statut) {
    case 'termine': return 'Terminé'
    case 'encours': return 'En cours'
    default: return 'Prochain'
  }
}

const getProgressClass = (taux) => {
  if (taux === 100) return 'bg-green-500'
  if (taux >= 70) return 'bg-primary'
  if (taux >= 40) return 'bg-orange-400'
  return 'bg-red-400'
}

const getNotificationIconClass = (type) => {
  switch(type) {
    case 'info': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600'
    case 'warning': return 'bg-orange-100 dark:bg-orange-900/30 text-orange-600'
    case 'error': return 'bg-red-100 dark:bg-red-900/30 text-red-600'
    default: return 'bg-slate-100 dark:bg-slate-900/30 text-slate-600'
  }
}

const handleFaireAppel = (classeId) => {
  router.push({ path: '/professeur/faire-appel', query: { id: classeId } })
}

const handleAction = (actionId) => {
  switch(actionId) {
    case 1: router.push('/professeur/classes'); break;
    case 2: router.push('/professeur/annuaire'); break;
    case 3: router.push('/professeur/saisie-notes'); break;
    case 4: router.push('/professeur/classes'); break;
  }
}
</script>
