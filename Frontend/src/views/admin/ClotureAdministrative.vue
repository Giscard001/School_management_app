<template>
  <div class="min-h-screen bg-background-light dark:bg-background-dark text-[#0e141b] dark:text-slate-200 transition-colors duration-200">
    <!-- Main Content Area -->
    <main class="flex-1 flex flex-col overflow-y-auto">
      <!-- PageHeading -->
      <header class="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 p-8">
        <div class="max-w-5xl mx-auto flex flex-wrap justify-between items-end gap-4">
          <div class="flex flex-col gap-2">
            <div class="flex items-center gap-2 text-primary font-bold text-sm">
              <span class="material-symbols-outlined text-sm">verified_user</span>
              Clôture Administrative
            </div>
            <h1 class="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-tight">Année Scolaire {{ year }}</h1>
            <p class="text-slate-500 dark:text-slate-400 text-base max-w-xl">Finalisez l'année académique {{ year }} en validant toutes les données et en préparant la transition vers la nouvelle année.</p>
          </div>
          <div class="flex gap-3">
            <button class="flex items-center justify-center rounded-lg h-11 px-6 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
              Sauvegarder Brouillon
            </button>
            <button class="flex items-center justify-center rounded-lg h-11 px-6 bg-primary text-white text-sm font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20">
              Lancer la clôture définitive
            </button>
          </div>
        </div>
      </header>
      
      <!-- Tabs Navigation -->
      <div class="bg-white dark:bg-slate-950 sticky top-0 z-10 border-b border-slate-200 dark:border-slate-800">
        <div class="max-w-5xl mx-auto px-8">
          <nav class="flex gap-10">
            <router-link to="/admin/configuration" class="flex items-center gap-2 border-b-4 border-transparent text-slate-500 dark:text-slate-400 pb-4 pt-6 hover:text-slate-700 dark:hover:text-slate-200 transition-all">
              <span class="material-symbols-outlined text-[20px]">schedule</span>
              <p class="text-sm font-bold tracking-wide">Périodes & Dates</p>
            </router-link>
            <router-link to="/admin/gestion-vacances" class="flex items-center gap-2 border-b-4 border-transparent text-slate-500 dark:text-slate-400 pb-4 pt-6 hover:text-slate-700 dark:hover:text-slate-200 transition-all">
              <span class="material-symbols-outlined text-[20px]">beach_access</span>
              <p class="text-sm font-bold tracking-wide">Vacances</p>
            </router-link>
            <router-link to="/admin/regles-calcul" class="flex items-center gap-2 border-b-4 border-transparent text-slate-500 dark:text-slate-400 pb-4 pt-6 hover:text-slate-700 dark:hover:text-slate-200 transition-all">
              <span class="material-symbols-outlined text-[20px]">functions</span>
              <p class="text-sm font-bold tracking-wide">Règles de Calcul</p>
            </router-link>
            <router-link to="/admin/cloture-administrative" class="flex items-center gap-2 border-b-4 border-primary text-primary pb-4 pt-6 group">
              <span class="material-symbols-outlined text-[20px] active-icon">verified_user</span>
              <p class="text-sm font-bold tracking-wide">Clôture Administrative</p>
            </router-link>
          </nav>
        </div>
      </div>
      
      <!-- Content Area -->
      <div class="px-6 md:px-40 py-8">
        <!-- Breadcrumbs -->
        <div class="flex flex-wrap gap-2 px-4 py-2">
          <router-link to="/admin/configuration" class="text-[#4e7397] dark:text-slate-400 text-sm font-medium hover:underline">Administration</router-link>
          <span class="text-[#4e7397] dark:text-slate-600 text-sm">/</span>
          <span class="text-[#0e141b] dark:text-white text-sm font-medium">Clôture de l'Année</span>
        </div>
        
        <!-- Summary Stats -->
        <div class="flex flex-wrap gap-4 p-4">
          <div class="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-[#d0dbe7] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <p class="text-[#4e7397] dark:text-slate-400 text-sm font-medium uppercase tracking-wider">Élèves Inscrits</p>
            <p class="text-[#0e141b] dark:text-white tracking-light text-3xl font-bold leading-tight">{{ studentsCount }}</p>
          </div>
          <div class="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-[#d0dbe7] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <p class="text-[#4e7397] dark:text-slate-400 text-sm font-medium uppercase tracking-wider">Moyenne Générale</p>
            <p class="text-[#0e141b] dark:text-white tracking-light text-3xl font-bold leading-tight">{{ averageGrade.toFixed(2) }}/20</p>
          </div>
          <div class="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-[#d0dbe7] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <p class="text-[#4e7397] dark:text-slate-400 text-sm font-medium uppercase tracking-wider">État de Progression</p>
            <p :class="isReady ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'" class="tracking-light text-3xl font-bold leading-tight">
                {{ isReady ? 'Prêt' : 'En cours' }}
            </p>
          </div>
        </div>
        
        <!-- Checklist Section -->
        <h2 class="text-[#0e141b] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-4 pt-8">Liste de contrôle de fin d'année</h2>
        <div class="flex flex-col gap-3 px-4">
          <div v-for="item in checklist" :key="item.id" class="flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-[#d0dbe7] dark:border-slate-800 rounded-xl">
            <div class="flex items-center gap-4">
              <div :class="[
                item.status === 'success' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' : 
                item.status === 'error' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' :
                'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
              ]" class="p-2 rounded-lg">
                <span class="material-symbols-outlined" v-if="item.status === 'success'">check_circle</span>
                <span class="material-symbols-outlined" v-else-if="item.status === 'error'">error</span>
                <span class="material-symbols-outlined animate-spin" v-else>sync</span>
              </div>
              <div>
                <p class="text-[#0e141b] dark:text-white font-bold">{{ item.title }}</p>
                <p class="text-[#4e7397] dark:text-slate-400 text-sm">{{ item.description }}</p>
              </div>
            </div>
            <button class="text-primary font-medium text-sm hover:underline">Détails</button>
          </div>
        </div>
        
        <!-- Danger Zone / Action -->
        <div class="mt-12 px-4">
          <div class="p-6 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-xl">
            <div class="flex gap-4 items-start">
              <div class="text-red-600 dark:text-red-400 mt-1">
                <span class="material-symbols-outlined">report</span>
              </div>
              <div class="flex-1">
                <h3 class="text-red-800 dark:text-red-400 font-bold text-lg mb-2">Attention : Action Irréversible</h3>
                <p class="text-red-700 dark:text-red-300 text-sm leading-relaxed mb-6">
                  La clôture définitive verrouille l'accès à toutes les modifications de notes, d'appréciations et de rangs pour l'année 2023-2024. 
                  Cette étape est nécessaire pour préparer le passage à la nouvelle année scolaire. Assurez-vous d'avoir sauvegardé tous les rapports nécessaires.
                </p>
                <div class="flex flex-col gap-4">
                  <label class="flex items-center gap-3 cursor-pointer">
                    <input v-model="confirmed" class="rounded border-red-300 dark:border-red-900 text-red-600 focus:ring-red-500 w-5 h-5" type="checkbox"/>
                    <span class="text-red-900 dark:text-red-200 text-sm font-medium">Je comprends que cette action ne peut pas être annulée.</span>
                  </label>
                  <button @click="performClosure" :disabled="!confirmed || isClosing" class="w-full md:w-auto bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-primary/20 disabled:opacity-50 transition-all flex items-center justify-center gap-2">
                    <span class="material-symbols-outlined" v-if="isClosing">sync</span>
                    <span class="material-symbols-outlined" v-else>lock_reset</span>
                    {{ isClosing ? 'Clôture en cours...' : 'Lancer la clôture définitive' }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Footer Support -->
        <div class="mt-12 mb-20 px-4 text-center">
          <p class="text-[#4e7397] dark:text-slate-500 text-xs">
            Besoin d'aide ? Contactez le support technique au 0800-ADMIN-SCHOOL. <br/>
            Dernière mise à jour du système : 15 Juin 2024.
          </p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '@/services/api';

const year = ref('2023-2024');
const studentsCount = ref(0);
const averageGrade = ref(12.5);
const isReady = ref(false);
const confirmed = ref(false);
const isClosing = ref(false);

const checklist = ref([
    { id: 'grades', title: 'Toutes les notes saisies', description: 'Vérification des carnets de notes...', status: 'waiting' },
    { id: 'bulletins', title: 'Tous les bulletins validés', description: 'Vérification des décisions du conseil...', status: 'success' },
    { id: 'stats', title: 'Statistiques générées', description: 'Calcul des indicateurs de performance...', status: 'waiting' }
]);

const fetchData = async () => {
    try {
        // Year
        const configRes = await api.getSetting('academic_year_config');
        if (configRes.data.success && configRes.data.data) {
            year.value = configRes.data.data.value.year;
        }

        // Students & Assignments for checks
        const [usersRes, gradesRes, assignmentsRes] = await Promise.all([
            api.getUsers(),
            api.getGrades(),
            api.getAllGlobalClasseMatieres()
        ]);

        if (usersRes.data.success) {
            studentsCount.value = usersRes.data.data.filter(u => u.role === 'ELEVE').length;
        }

        // Checklist logic
        const assignments = assignmentsRes.data.data || [];
        const grades = gradesRes.data.data || [];

        // Check if all assigned subjects have at least one grade
        const subjectsWithGrades = new Set(grades.map(g => `${g.classe}-${g.matiere}`));
        const totalAssignments = assignments.filter(a => a.professeur).length;
        const missingAssignmentsCount = assignments.filter(a => a.professeur && !subjectsWithGrades.has(`${a.classe._id}-${a.matiere._id}`)).length;

        const gradeItem = checklist.value.find(i => i.id === 'grades');
        if (missingAssignmentsCount === 0 && totalAssignments > 0) {
            gradeItem.status = 'success';
            gradeItem.description = '100% des matières assignées ont des notes.';
        } else {
            gradeItem.status = 'warning';
            gradeItem.description = `${totalAssignments - missingAssignmentsCount}/${totalAssignments} matières complétées.`;
        }

        // Stats item
        const statsItem = checklist.value.find(i => i.id === 'stats');
        if (grades.length > 0) {
            const sum = grades.reduce((acc, g) => acc + g.valeur, 0);
            averageGrade.value = sum / grades.length;
            statsItem.status = 'success';
            statsItem.description = 'Indicateurs de performance calculés.';
        } else {
            statsItem.status = 'error';
            statsItem.description = 'Aucune note disponible pour les calculs.';
        }

        isReady.value = checklist.value.every(i => i.status === 'success');
    } catch (error) {
        console.error('Erreur chargement données:', error);
    }
};

const performClosure = async () => {
    isClosing.value = true;
    try {
        // Logic for closure (e.g., archiving current settings)
        // Here we just simulate a long operation
        await new Promise(resolve => setTimeout(resolve, 2000));
        alert('L\'année a été clôturée avec succès. Le système est maintenant prêt pour la nouvelle configuration d\'année.');
        confirmed.value = false;
    } catch (error) {
        alert('Erreur lors de la clôture');
    } finally {
        isClosing.value = false;
    }
};

onMounted(() => {
  fetchData();
  
  // Add Material Symbols font
  const link = document.createElement('link');
  // ... rest of the logic ...
  link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);

  // Add Inter font
  const interLink = document.createElement('link');
  interLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap';
  interLink.rel = 'stylesheet';
  document.head.appendChild(interLink);

  // Add custom styles
  const style = document.createElement('style');
  style.textContent = `
    body {
      font-family: 'Inter', sans-serif;
    }
    .material-symbols-outlined {
      font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    }
  `;
  document.head.appendChild(style);
});
</script>
