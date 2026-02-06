<template>
  <div class="min-h-screen bg-background-light dark:bg-background-dark font-display text-[#0e141b] dark:text-slate-50">
    <!-- Main Content Area -->
    <main class="flex-1 flex flex-col min-w-0 bg-background-light dark:bg-background-dark overflow-y-auto">
      <!-- Top Navigation Bar -->
      <header class="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md px-8 py-4">
        <div class="flex items-center gap-8">
          <div class="flex items-center gap-3">
            <div class="p-2 bg-primary/10 rounded-lg text-primary">
              <span class="material-symbols-outlined">analytics</span>
            </div>
            <h2 class="text-lg font-bold tracking-tight">Supervision des Notes</h2>
          </div>
          <div class="hidden md:flex items-center gap-6 border-l border-slate-200 dark:border-slate-800 pl-8">
            <div class="flex items-center gap-2">
              <span class="text-xs font-semibold uppercase text-slate-400 tracking-wider">Période:</span>
              <span class="text-sm font-medium">Trimestre 1</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-xs font-semibold uppercase text-slate-400 tracking-wider">Année:</span>
              <span class="text-sm font-medium text-primary">2023-2024</span>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-4 flex-1 justify-end max-w-xl">
          <div class="relative w-full max-w-xs">
            <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">search</span>
            <input class="w-full h-10 pl-10 pr-4 rounded-lg border-none bg-slate-100 dark:bg-slate-800 focus:ring-2 focus:ring-primary text-sm transition-all" placeholder="Rechercher un relevé..." type="text"/>
          </div>
          <div class="flex gap-2">
            <button class="flex items-center justify-center h-10 w-10 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700">
              <span class="material-symbols-outlined">notifications</span>
            </button>
            <button class="flex items-center justify-center h-10 w-10 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700">
              <span class="material-symbols-outlined">help</span>
            </button>
          </div>
        </div>
      </header>
      
      <!-- Page Content -->
      <div class="p-8 space-y-8 max-w-[1400px] mx-auto w-full">
        <!-- Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div class="flex items-center justify-between mb-2">
              <p class="text-slate-500 dark:text-slate-400 text-sm font-medium">Taux de remplissage global</p>
              <span class="material-symbols-outlined text-primary">donut_large</span>
            </div>
            <div class="flex items-baseline gap-2">
              <p class="text-3xl font-bold">{{ globalProgress.toFixed(1) }}%</p>
            </div>
            <div class="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mt-2">
              <div class="bg-primary h-2 rounded-full" :style="{ width: globalProgress + '%' }"></div>
            </div>
          </div>
          <div class="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div class="flex items-center justify-between mb-2">
              <p class="text-slate-500 dark:text-slate-400 text-sm font-medium">Alertes retards</p>
              <span class="material-symbols-outlined text-red-500">warning</span>
            </div>
            <div class="flex items-baseline gap-2">
              <p class="text-3xl font-bold">{{ entryAlerts.length }}</p>
            </div>
            <p class="text-xs text-slate-400">Saisies attendues (sans aucune note)</p>
          </div>
          <div class="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div class="flex items-center justify-between mb-2">
              <p class="text-slate-500 dark:text-slate-400 text-sm font-medium">Classes complétées</p>
              <span class="material-symbols-outlined text-green-500">verified</span>
            </div>
            <div class="flex items-baseline gap-2">
              <p class="text-3xl font-bold">{{ fullClasses }}/{{ classes.length }}</p>
              <span class="text-slate-400 text-sm font-medium">{{ ((fullClasses/classes.length)*100 || 0).toFixed(0) }}%</span>
            </div>
          </div>
        </div>
        
        <!-- Main Layout Body: Progress and Alerts -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Left Column: Classes Progress Table -->
          <div class="lg:col-span-2 space-y-4">
            <div class="flex items-center justify-between px-2">
              <h3 class="text-xl font-bold">Progression par Classe</h3>
              <div class="flex gap-2">
                <button class="px-3 py-1.5 text-xs font-bold border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800">Filtrer</button>
                <button class="px-3 py-1.5 text-xs font-bold bg-primary text-white rounded-lg">Exporter Rapport</button>
              </div>
            </div>
            <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                    <th class="px-6 py-4 text-xs font-bold uppercase text-slate-500 tracking-wider">Classe</th>
                    <th class="px-6 py-4 text-xs font-bold uppercase text-slate-500 tracking-wider">Prof. Principal</th>
                    <th class="px-6 py-4 text-xs font-bold uppercase text-slate-500 tracking-wider">Progression</th>
                    <th class="px-6 py-4 text-xs font-bold uppercase text-slate-500 tracking-wider">Status</th>
                    <th class="px-6 py-4 text-xs font-bold uppercase text-slate-500 tracking-wider text-right">Action</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                  <tr v-if="classes.length === 0">
                    <td colspan="5" class="px-6 py-10 text-center text-slate-500">Aucune classe trouvée</td>
                  </tr>
                  <tr v-for="cls in classesWithStats" :key="cls._id">
                    <td class="px-6 py-4 font-bold text-sm">{{ cls.niveau }} {{ cls.section }}</td>
                    <td class="px-6 py-4 text-sm">N/A</td>
                    <td class="px-6 py-4">
                      <div class="flex items-center gap-3">
                        <div class="flex-1 bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden max-w-[100px]">
                          <div :class="['h-full', cls.progression === 100 ? 'bg-primary' : 'bg-red-500']" :style="{ width: cls.progression + '%' }"></div>
                        </div>
                        <span class="text-xs font-bold" :class="cls.progression < 100 ? 'text-red-500' : ''">{{ cls.progression }}%</span>
                      </div>
                    </td>
                    <td class="px-6 py-4">
                      <span 
                        :class="[
                          'px-2.5 py-1 text-[10px] font-bold uppercase rounded-full',
                          cls.status === 'Validé' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        ]"
                      >{{ cls.status }}</span>
                    </td>
                    <td class="px-6 py-4 text-right">
                      <button class="text-primary hover:text-primary/70"><span class="material-symbols-outlined">visibility</span></button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div v-if="classes.length > 4" class="p-4 border-t border-slate-100 dark:divide-slate-800 bg-slate-50/50 dark:bg-slate-800/20 text-center">
                <button class="text-sm font-bold text-primary hover:underline">Voir les toutes les classes</button>
              </div>
            </div>
          </div>
          
          <!-- Right Column: Alerts Panel -->
          <div class="space-y-4">
            <div class="flex items-center justify-between px-2">
              <h3 class="text-xl font-bold">Alertes de Saisie</h3>
              <button class="text-primary text-xs font-bold uppercase tracking-wider hover:underline">Tout notifier</button>
            </div>
            <div class="flex flex-col gap-3">
              <div v-if="entryAlerts.length === 0" class="text-center py-4 text-slate-400 italic">Aucune alerte de saisie</div>
              <!-- Alert Card -->
              <div 
                v-for="alert in entryAlerts.slice(0, 5)" 
                :key="alert._id"
                class="flex flex-col gap-3 rounded-xl border border-red-200 dark:border-red-900/30 bg-white dark:bg-slate-900 p-4 shadow-sm relative overflow-hidden"
              >
                <div class="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                <div class="flex items-start gap-3">
                  <div class="p-2 bg-red-50 rounded-lg text-red-500">
                    <span class="material-symbols-outlined">warning</span>
                  </div>
                  <div class="flex flex-col flex-1">
                    <h4 class="text-sm font-bold leading-tight">{{ alert.professeur?.prenom }} {{ alert.professeur?.nom }} - {{ alert.matiere?.nom }}</h4>
                    <p class="text-slate-500 dark:text-slate-400 text-xs mt-1">Saisie manquante ({{ alert.classe?.niveau }} {{ alert.classe?.section }})</p>
                  </div>
                </div>
              </div>
              <button v-if="entryAlerts.length > 5" class="flex items-center justify-center gap-2 p-3 text-sm font-bold text-slate-500 hover:text-primary transition-colors border border-dashed border-slate-300 dark:border-slate-700 rounded-xl">
                <span class="material-symbols-outlined text-[20px]">expand_more</span>
                <span>Voir toutes les alertes ({{ entryAlerts.length }})</span>
              </button>
            </div>
          </div>
        </div>
        
        <!-- Bottom Portal: Quick Access -->
        <section class="bg-primary/5 dark:bg-primary/10 rounded-2xl p-8 border border-primary/20">
          <div class="flex flex-col md:flex-row items-center justify-between gap-6">
            <div class="max-w-md">
              <h3 class="text-xl font-bold mb-2">Relevés de notes individuels</h3>
              <p class="text-slate-600 dark:text-slate-400 text-sm">Consultez et exportez instantanément n'importe quel relevé de notes en tapant le nom de l'élève ci-contre.</p>
            </div>
            <div class="w-full max-w-lg flex gap-3">
              <div class="relative flex-1">
                <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary">person_search</span>
                <input class="w-full h-14 pl-12 pr-4 rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm focus:ring-primary focus:border-primary text-sm" placeholder="Entrez le nom de l'élève (ex: Abdou Karim)..." type="text"/>
              </div>
              <button class="bg-primary hover:bg-primary/90 text-white h-14 px-8 rounded-xl font-bold transition-all shadow-lg shadow-primary/25">Consulter</button>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import api from '@/services/api';

const classes = ref([]);
const grades = ref([]);
const assignments = ref([]);
const isLoading = ref(false);

const fetchData = async () => {
  isLoading.value = true;
  try {
    const [classesRes, gradesRes, assignmentsRes] = await Promise.all([
      api.getClasses(),
      api.getGrades(),
      api.getAllGlobalClasseMatieres()
    ]);
    classes.value = Array.isArray(classesRes.data.data) ? classesRes.data.data : [];
    grades.value = Array.isArray(gradesRes.data.data) ? gradesRes.data.data : [];
    assignments.value = Array.isArray(assignmentsRes.data.data) ? assignmentsRes.data.data : [];
  } catch (error) {
    console.error('Erreur chargement notes:', error);
  } finally {
    isLoading.value = false;
  }
};

const entryAlerts = computed(() => {
    // Alerte si une affectation existe mais aucune note n'est saisie pour ce binôme classe-matière
    return assignments.value.filter(a => {
        if (!a.professeur) return false;
        const hasGrades = grades.value.some(g => 
            g.classe?._id === a.classe?._id && 
            g.matiere?._id === a.matiere?._id
        );
        return !hasGrades;
    });
});

const classesWithStats = computed(() => {
  return classes.value.map(cls => {
    const classGrades = grades.value.filter(g => g.classe?._id === cls._id);
    // Dummy progression: if class has any grades, it's 100%, else 0%
    // In a real app, this would be based on expected vs actual grades count
    return {
      ...cls,
      progression: classGrades.length > 0 ? 100 : 0,
      status: classGrades.length > 0 ? 'Validé' : 'Retard'
    };
  });
});

const globalProgress = computed(() => {
    if (classes.value.length === 0) return 0;
    const completed = classesWithStats.value.filter(c => c.progression === 100).length;
    return (completed / classes.value.length) * 100;
});

const fullClasses = computed(() => {
    return classesWithStats.value.filter(c => c.progression === 100).length;
});

onMounted(() => {
  fetchData();
  
  // Add Material Symbols font
  const link = document.createElement('link');
  // ... rest of the existing mount logic ...
  link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);

  // Add Inter font
  const interLink = document.createElement('link');
  interLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
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
    .fill-icon {
      font-variation-settings: 'FILL' 1;
    }
    .font-display {
      font-family: 'Inter', sans-serif;
    }
  `;
  document.head.appendChild(style);
});
</script>
