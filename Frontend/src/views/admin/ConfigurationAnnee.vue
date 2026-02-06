<template>
  <div class="min-h-screen bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100">
    <!-- Main Content Area -->
    <main class="flex-1 flex flex-col overflow-y-auto">
      <!-- PageHeading -->
      <header class="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 p-8">
        <div class="max-w-5xl mx-auto flex flex-wrap justify-between items-end gap-4">
          <div class="flex flex-col gap-2">
            <div class="flex items-center gap-2 text-primary font-bold text-sm">
              <span class="material-symbols-outlined text-sm">edit_calendar</span>
              Configuration Active
            </div>
            <h1 class="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-tight">Année Scolaire {{ config.year }}</h1>
            <p class="text-slate-500 dark:text-slate-400 text-base max-w-xl">Définissez les périodes d'enseignement, le calendrier des vacances et les règles globales de calcul de moyennes pour cet établissement.</p>
          </div>
          <div class="flex gap-3">
            <button @click="saveConfiguration" :disabled="isSaving" class="flex items-center justify-center rounded-lg h-11 px-6 bg-primary text-white text-sm font-bold hover:opacity-90 disabled:opacity-50 transition-all shadow-lg shadow-primary/20">
              <span class="material-symbols-outlined mr-2" v-if="isSaving">sync</span>
              {{ isSaving ? 'Enregistrement...' : 'Valider la Configuration' }}
            </button>
          </div>
        </div>
      </header>
      
      <!-- Tabs Navigation -->
      <div class="bg-white dark:bg-slate-950 sticky top-0 z-10 border-b border-slate-200 dark:border-slate-800">
        <div class="max-w-5xl mx-auto px-8">
          <nav class="flex gap-10">
            <a class="flex items-center gap-2 border-b-4 border-primary text-primary pb-4 pt-6 group" href="#">
              <span class="material-symbols-outlined text-[20px] active-icon">schedule</span>
              <p class="text-sm font-bold tracking-wide">Périodes & Dates</p>
            </a>
            <router-link to="/admin/gestion-vacances" class="flex items-center gap-2 border-b-4 border-transparent text-slate-500 dark:text-slate-400 pb-4 pt-6 hover:text-slate-700 dark:hover:text-slate-200 transition-all">
              <span class="material-symbols-outlined text-[20px]">beach_access</span>
              <p class="text-sm font-bold tracking-wide">Vacances</p>
            </router-link>
            <router-link to="/admin/cloture-administrative" class="flex items-center gap-2 border-b-4 border-transparent text-slate-500 dark:text-slate-400 pb-4 pt-6 hover:text-slate-700 dark:hover:text-slate-200 transition-all">
              <span class="material-symbols-outlined text-[20px]">verified_user</span>
              <p class="text-sm font-bold tracking-wide">Clôture Administrative</p>
            </router-link>
          </nav>
        </div>
      </div>
      
      <!-- Content Body -->
      <div class="max-w-5xl mx-auto w-full p-8 flex flex-col gap-8 pb-24">
        <!-- Section: Sélection de la Filière -->
        <section class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div class="p-6 border-b border-slate-100 dark:border-slate-800">
            <h2 class="text-slate-900 dark:text-white text-xl font-bold tracking-tight">Configuration par Filière</h2>
            <p class="text-slate-500 dark:text-slate-400 text-sm">Définissez le système de découpage spécifique à chaque filière.</p>
          </div>
          <div class="p-6">
            <div class="flex gap-4 justify-center">
              <button 
                @click="selectedFiliere = 'generale'"
                :class="selectedFiliere === 'generale' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'"
                class="px-8 py-3 rounded-xl font-bold transition-all"
              >
                Filière Générale
              </button>
              <button 
                @click="selectedFiliere = 'technique'"
                :class="selectedFiliere === 'technique' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'"
                class="px-8 py-3 rounded-xl font-bold transition-all"
              >
                Filière Technique
              </button>
            </div>
          </div>
        </section>

        <!-- Section: Type de Découpage -->
        <section class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div class="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <div>
              <h2 class="text-slate-900 dark:text-white text-xl font-bold tracking-tight">Système de Découpage - {{ selectedFiliere === 'generale' ? 'Générale' : 'Technique' }}</h2>
              <p class="text-slate-500 dark:text-slate-400 text-sm">Sélectionnez comment l'année est divisée pour cette filière.</p>
            </div>
          </div>
          <div class="p-6">
            <div class="flex h-12 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 p-1 max-w-md mx-auto">
              <label class="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 has-[:checked]:bg-white dark:has-[:checked]:bg-slate-700 has-[:checked]:shadow-sm has-[:checked]:text-primary text-slate-500 dark:text-slate-400 text-sm font-bold transition-all">
                <span class="truncate">Trimestres (3)</span>
                <input v-model="currentFiliereConfig.periodType" class="invisible w-0" name="period-type" type="radio" value="Trimestres"/>
              </label>
              <label class="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 has-[:checked]:bg-white dark:has-[:checked]:bg-slate-700 has-[:checked]:shadow-sm has-[:checked]:text-primary text-slate-500 dark:text-slate-400 text-sm font-bold transition-all">
                <span class="truncate">Semestres (2)</span>
                <input v-model="currentFiliereConfig.periodType" class="invisible w-0" name="period-type" type="radio" value="Semestres"/>
              </label>
            </div>
          </div>
        </section>
        
        <section>
          <div class="flex items-center justify-between pb-6">
             <h2 class="text-slate-900 dark:text-white text-2xl font-bold leading-tight tracking-tight">Définition des Dates des Périodes</h2>
             <div class="relative max-w-[200px]">
                <label class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 block">Modifier l'année</label>
                <input v-model="config.year" class="w-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold" type="text" placeholder="ex: 2023-2024" />
             </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Period 1 Card -->
            <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-4">
              <div class="flex items-center gap-3">
                <div class="bg-primary/10 text-primary p-2 rounded-lg">
                  <span class="material-symbols-outlined text-[20px]">filter_1</span>
                </div>
                <h3 class="font-bold text-slate-900 dark:text-white">{{ currentFiliereConfig.periodType === 'Trimestres' ? '1er Trimestre' : '1er Semestre' }}</h3>
              </div>
              <div class="flex flex-col gap-3 mt-2">
                <div>
                  <label class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 block">Date de début</label>
                  <input v-model="currentFiliereConfig.periods[0].start" class="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary" type="date"/>
                </div>
                <div>
                  <label class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 block">Date de fin</label>
                  <input v-model="currentFiliereConfig.periods[0].end" class="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary" type="date"/>
                </div>
              </div>
            </div>
            <!-- Period 2 Card -->
            <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-4">
              <div class="flex items-center gap-3">
                <div class="bg-primary/10 text-primary p-2 rounded-lg">
                  <span class="material-symbols-outlined text-[20px]">filter_2</span>
                </div>
                <h3 class="font-bold text-slate-900 dark:text-white">{{ currentFiliereConfig.periodType === 'Trimestres' ? '2ème Trimestre' : '2ème Semestre' }}</h3>
              </div>
              <div class="flex flex-col gap-3 mt-2">
                <div>
                  <label class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 block">Date de début</label>
                  <input v-model="currentFiliereConfig.periods[1].start" class="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary" type="date"/>
                </div>
                <div>
                  <label class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 block">Date de fin</label>
                  <input v-model="currentFiliereConfig.periods[1].end" class="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary" type="date"/>
                </div>
              </div>
            </div>
            <!-- Period 3 Card (Only for Trimestres) -->
            <div v-if="currentFiliereConfig.periodType === 'Trimestres'" class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-4">
              <div class="flex items-center gap-3">
                <div class="bg-primary/10 text-primary p-2 rounded-lg">
                  <span class="material-symbols-outlined text-[20px]">filter_3</span>
                </div>
                <h3 class="font-bold text-slate-900 dark:text-white">3ème Trimestre</h3>
              </div>
              <div class="flex flex-col gap-3 mt-2">
                <div>
                  <label class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 block">Date de début</label>
                  <input v-model="currentFiliereConfig.periods[2].start" class="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary" type="date"/>
                </div>
                <div>
                  <label class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 block">Date de fin</label>
                  <input v-model="currentFiliereConfig.periods[2].end" class="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary" type="date"/>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <!-- Section: Date Limite de Saisie -->
        <section class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div class="p-6 border-b border-slate-100 dark:border-slate-800">
            <h2 class="text-slate-900 dark:text-white text-xl font-bold tracking-tight">Date Limite de Saisie des Notes</h2>
            <p class="text-slate-500 dark:text-slate-400 text-sm">Définissez une date après laquelle les professeurs ne pourront plus saisir de notes pour chaque période.</p>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <!-- Period 1 Deadline -->
              <div class="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 flex flex-col gap-3">
                <div class="flex items-center gap-2">
                  <div class="bg-primary/10 text-primary p-1.5 rounded-lg">
                    <span class="material-symbols-outlined text-[18px]">filter_1</span>
                  </div>
                  <h3 class="font-bold text-slate-900 dark:text-white text-sm">{{ currentFiliereConfig.periodType === 'Trimestres' ? '1er Trimestre' : '1er Semestre' }}</h3>
                </div>
                <div>
                  <label class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 block">Date limite</label>
                  <input v-model="config.gradeDeadlines.period1" class="w-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm" type="date"/>
                </div>
                <div class="flex justify-between items-center pt-2 border-t border-slate-200 dark:border-slate-700">
                  <label class="text-xs font-semibold text-slate-700 dark:text-slate-300">Verrouiller la saisie</label>
                  <button @click="config.gradeDeadlines.period1Locked = !config.gradeDeadlines.period1Locked" :class="config.gradeDeadlines.period1Locked ? 'bg-red-500' : 'bg-slate-300'" class="w-10 h-5 rounded-full relative transition-colors">
                    <div :class="config.gradeDeadlines.period1Locked ? 'right-1' : 'left-1'" class="absolute top-1 size-3 bg-white rounded-full transition-all"></div>
                  </button>
                </div>
                <p v-if="config.gradeDeadlines.period1Locked" class="text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                  <span class="material-symbols-outlined text-[14px]">lock</span>
                  Saisie verrouillée
                </p>
              </div>

              <!-- Period 2 Deadline -->
              <div class="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 flex flex-col gap-3">
                <div class="flex items-center gap-2">
                  <div class="bg-primary/10 text-primary p-1.5 rounded-lg">
                    <span class="material-symbols-outlined text-[18px]">filter_2</span>
                  </div>
                  <h3 class="font-bold text-slate-900 dark:text-white text-sm">{{ currentFiliereConfig.periodType === 'Trimestres' ? '2ème Trimestre' : '2ème Semestre' }}</h3>
                </div>
                <div>
                  <label class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 block">Date limite</label>
                  <input v-model="config.gradeDeadlines.period2" class="w-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm" type="date"/>
                </div>
                <div class="flex justify-between items-center pt-2 border-t border-slate-200 dark:border-slate-700">
                  <label class="text-xs font-semibold text-slate-700 dark:text-slate-300">Verrouiller la saisie</label>
                  <button @click="config.gradeDeadlines.period2Locked = !config.gradeDeadlines.period2Locked" :class="config.gradeDeadlines.period2Locked ? 'bg-red-500' : 'bg-slate-300'" class="w-10 h-5 rounded-full relative transition-colors">
                    <div :class="config.gradeDeadlines.period2Locked ? 'right-1' : 'left-1'" class="absolute top-1 size-3 bg-white rounded-full transition-all"></div>
                  </button>
                </div>
                <p v-if="config.gradeDeadlines.period2Locked" class="text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                  <span class="material-symbols-outlined text-[14px]">lock</span>
                  Saisie verrouillée
                </p>
              </div>

              <!-- Period 3 Deadline (Only for Trimestres) -->
              <div v-if="currentFiliereConfig.periodType === 'Trimestres'" class="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 flex flex-col gap-3">
                <div class="flex items-center gap-2">
                  <div class="bg-primary/10 text-primary p-1.5 rounded-lg">
                    <span class="material-symbols-outlined text-[18px]">filter_3</span>
                  </div>
                  <h3 class="font-bold text-slate-900 dark:text-white text-sm">3ème Trimestre</h3>
                </div>
                <div>
                  <label class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 block">Date limite</label>
                  <input v-model="config.gradeDeadlines.period3" class="w-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm" type="date"/>
                </div>
                <div class="flex justify-between items-center pt-2 border-t border-slate-200 dark:border-slate-700">
                  <label class="text-xs font-semibold text-slate-700 dark:text-slate-300">Verrouiller la saisie</label>
                  <button @click="config.gradeDeadlines.period3Locked = !config.gradeDeadlines.period3Locked" :class="config.gradeDeadlines.period3Locked ? 'bg-red-500' : 'bg-slate-300'" class="w-10 h-5 rounded-full relative transition-colors">
                    <div :class="config.gradeDeadlines.period3Locked ? 'right-1' : 'left-1'" class="absolute top-1 size-3 bg-white rounded-full transition-all"></div>
                  </button>
                </div>
                <p v-if="config.gradeDeadlines.period3Locked" class="text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                  <span class="material-symbols-outlined text-[14px]">lock</span>
                  Saisie verrouillée
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <!-- Help Alert -->
        <div class="bg-sky-50 dark:bg-sky-900/20 border border-sky-100 dark:border-sky-800 rounded-xl p-4 flex gap-4">
          <span class="material-symbols-outlined text-sky-600 dark:text-sky-400">info</span>
          <div class="flex flex-col gap-1">
            <p class="text-sm font-bold text-sky-900 dark:text-sky-100">Conseil d'administration</p>
            <p class="text-sm text-sky-800 dark:text-sky-300">Toutes les dates saisies ici seront appliquées aux emplois du temps et aux carnets de notes de tous les professeurs.</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import api from '@/services/api';

const isSaving = ref(false);
const selectedFiliere = ref('generale');

const config = ref({
    year: '2023-2024',
    filieres: {
        generale: {
            periodType: 'Trimestres',
            periods: [
                { name: 'T1', start: '2023-09-04', end: '2023-12-22' },
                { name: 'T2', start: '2024-01-08', end: '2024-03-29' },
                { name: 'T3', start: '2024-04-15', end: '2024-07-05' }
            ]
        },
        technique: {
            periodType: 'Semestres',
            periods: [
                { name: 'S1', start: '2023-09-04', end: '2024-01-26' },
                { name: 'S2', start: '2024-02-05', end: '2024-06-28' },
                { name: 'S3', start: '', end: '' } // Dummy for structure consistency if needed
            ]
        }
    },
    gradeDeadlines: {
        period1: '',
        period1Locked: false,
        period2: '',
        period2Locked: false,
        period3: '',
        period3Locked: false
    }
});

const currentFiliereConfig = computed(() => config.value.filieres[selectedFiliere.value]);

const fetchConfiguration = async () => {
    try {
        const res = await api.getSetting('academic_year_config');
        if (res.data.success && res.data.data) {
            const fetched = res.data.data.value;
            // Merge with default structure to avoid errors if new fields are missing
            config.value.year = fetched.year || config.value.year;
            
            // Load grade deadlines
            if (fetched.gradeDeadlines) {
                config.value.gradeDeadlines = {
                    ...config.value.gradeDeadlines,
                    ...fetched.gradeDeadlines
                };
            }
            
            if (fetched.filieres) {
                config.value.filieres = fetched.filieres;
            } else if (fetched.periodType) {
                // Migration logic from old single config
                config.value.filieres.generale.periodType = fetched.periodType;
                config.value.filieres.generale.periods = fetched.periods;
            }
        }
    } catch (error) {
        // Si la configuration n'existe pas encore (404), on utilise les valeurs par défaut
        if (error.response?.status === 404) {
            console.log('Configuration non trouvée, utilisation des valeurs par défaut');
        } else {
            console.error('Erreur chargement config:', error);
        }
    }
};

const saveConfiguration = async () => {
    isSaving.value = true;
    try {
        // Fetch latest to preserve other keys (like holidays, rules)
        let fullConfig = {};
        try {
            const res = await api.getSetting('academic_year_config');
            fullConfig = res.data.data?.value || {};
        } catch (error) {
            // Si la configuration n'existe pas (404), on part d'un objet vide
            if (error.response?.status !== 404) {
                throw error; // Re-throw si ce n'est pas une 404
            }
            console.log('Création de la configuration pour la première fois');
        }
        
        // Update year
        fullConfig.year = config.value.year;
        
        // Update grade deadlines
        fullConfig.gradeDeadlines = config.value.gradeDeadlines;
        
        // Update filieres but preserve existing properties (like coefficients)
        if (!fullConfig.filieres) fullConfig.filieres = {};
        
        ['generale', 'technique'].forEach(fKey => {
            if (!fullConfig.filieres[fKey]) fullConfig.filieres[fKey] = { periods: [] };
            
            fullConfig.filieres[fKey].periodType = config.value.filieres[fKey].periodType;
            
            // Sync periods (dates) while preserving coefficients
            const localPeriods = config.value.filieres[fKey].periods;
            const remotePeriods = fullConfig.filieres[fKey].periods;
            
            fullConfig.filieres[fKey].periods = localPeriods.map((lp, idx) => {
                const rp = remotePeriods[idx] || {};
                return { ...rp, ...lp }; // lp has the new dates
            });
        });

        console.log('💾 Sauvegarde de la configuration:', fullConfig);
        await api.updateSetting('academic_year_config', fullConfig);
        alert('Configuration enregistrée avec succès !');
        
        // Recharger pour confirmer
        await fetchConfiguration();
    } catch (error) {
        console.error('Erreur enregistrement:', error);
        alert('Erreur lors de l\'enregistrement: ' + (error.response?.data?.error || error.message));
    } finally {
        isSaving.value = false;
    }
};

onMounted(() => {
  fetchConfiguration();
  
  // Add Material Symbols font
  const link = document.createElement('link');
  // ... rest of the logic ...
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
    .active-icon {
      font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    }
    .font-display {
      font-family: 'Inter', sans-serif;
    }
  `;
  document.head.appendChild(style);
});
</script>
