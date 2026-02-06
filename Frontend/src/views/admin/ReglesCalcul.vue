<template>
  <div class="min-h-screen bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100">
    <!-- Main Content Area -->
    <main class="flex-1 flex flex-col overflow-y-auto">
      <!-- PageHeading -->
      <header class="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 p-8">
        <div class="max-w-5xl mx-auto flex flex-wrap justify-between items-end gap-4">
          <div class="flex flex-col gap-2">
            <div class="flex items-center gap-2 text-primary font-bold text-sm">
              <span class="material-symbols-outlined text-sm">functions</span>
              Règles de Calcul
            </div>
            <h1 class="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-tight">Année Scolaire {{ year }}</h1>
            <p class="text-slate-500 dark:text-slate-400 text-base max-w-xl">Configurez les valeurs par défaut pour les calculs de moyennes et les règles de notation.</p>
          </div>
          <div class="flex gap-3">
            <button @click="saveRules" :disabled="isSaving" class="flex items-center justify-center rounded-lg h-11 px-6 bg-primary text-white text-sm font-bold hover:opacity-90 disabled:opacity-50 transition-all shadow-lg shadow-primary/20">
              <span class="material-symbols-outlined mr-2" v-if="isSaving">sync</span>
              {{ isSaving ? 'Enregistrement...' : 'Enregistrer les modifications' }}
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
            <router-link to="/admin/regles-calcul" class="flex items-center gap-2 border-b-4 border-primary text-primary pb-4 pt-6 group">
              <span class="material-symbols-outlined text-[20px] active-icon">functions</span>
              <p class="text-sm font-bold tracking-wide">Règles de Calcul</p>
            </router-link>
            <router-link to="/admin/cloture-administrative" class="flex items-center gap-2 border-b-4 border-transparent text-slate-500 dark:text-slate-400 pb-4 pt-6 hover:text-slate-700 dark:hover:text-slate-200 transition-all">
              <span class="material-symbols-outlined text-[20px]">verified_user</span>
              <p class="text-sm font-bold tracking-wide">Clôture Administrative</p>
            </router-link>
          </nav>
        </div>
      </div>
      
      <!-- Scrollable Content -->
      <div class="flex-1 overflow-y-auto p-8 space-y-8 bg-background-light dark:bg-background-dark">
        <!-- Page Heading -->
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 class="text-3xl font-black tracking-tight">Règles de Calcul des Moyennes</h1>
            <p class="text-slate-500 mt-1 italic">Dernière mise à jour : 12 Octobre 2023 par Admin</p>
          </div>
        </div>
        
        <!-- Filière Selection for Weighting -->
        <section class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm mb-6">
          <div class="flex items-center gap-4 justify-center">
            <span class="text-sm font-bold text-slate-500 uppercase">Pondération pour :</span>
            <div class="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              <button 
                @click="selectedFiliere = 'generale'"
                :class="selectedFiliere === 'generale' ? 'bg-white dark:bg-slate-700 text-primary shadow-sm' : 'text-slate-500'"
                class="px-4 py-2 rounded-lg text-sm font-bold transition-all"
              >
                Générale
              </button>
              <button 
                @click="selectedFiliere = 'technique'"
                :class="selectedFiliere === 'technique' ? 'bg-white dark:bg-slate-700 text-primary shadow-sm' : 'text-slate-500'"
                class="px-4 py-2 rounded-lg text-sm font-bold transition-all"
              >
                Technique
              </button>
            </div>
          </div>
        </section>

        <!-- Main Configuration Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Section: Precision & Rounding -->
          <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div class="flex items-center gap-2 mb-6">
              <span class="material-symbols-outlined text-primary">analytics</span>
              <h3 class="text-lg font-bold">Arrondi et Précision</h3>
            </div>
            <p class="text-sm text-slate-500 mb-4">Définissez le nombre de décimales affichées sur les bulletins et utilisées pour les classements.</p>
            <div class="flex flex-wrap gap-4">
              <label class="group relative flex-1 cursor-pointer">
                <input v-model="rules.decimals" :value="1" class="peer absolute invisible" name="precision" type="radio"/>
                <div class="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg peer-checked:border-primary peer-checked:bg-primary/5 transition-all">
                  <div class="flex flex-col">
                    <span class="text-sm font-bold">1 décimale</span>
                    <span class="text-xs text-slate-400">Exemple: 14.5</span>
                  </div>
                  <span class="material-symbols-outlined text-primary opacity-0 peer-checked:opacity-100">check_circle</span>
                </div>
              </label>
              <label class="group relative flex-1 cursor-pointer">
                <input v-model="rules.decimals" :value="2" class="peer absolute invisible" name="precision" type="radio"/>
                <div class="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg peer-checked:border-primary peer-checked:bg-primary/5 transition-all">
                  <div class="flex flex-col">
                    <span class="text-sm font-bold">2 décimales</span>
                    <span class="text-xs text-slate-400">Exemple: 14.52</span>
                  </div>
                  <span class="material-symbols-outlined text-primary opacity-0 peer-checked:opacity-100">check_circle</span>
                </div>
              </label>
            </div>
            <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex gap-3">
              <span class="material-symbols-outlined text-blue-500">info</span>
              <p class="text-xs text-blue-700 dark:text-blue-300">Note: Les calculs internes conservent 4 décimales pour éviter les erreurs de cumul, l'arrondi s'applique à l'affichage final.</p>
            </div>
          </div>
          
          <!-- Section: Period Weighting -->
          <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div class="flex items-center gap-2 mb-6">
              <span class="material-symbols-outlined text-primary">balance</span>
              <h3 class="text-lg font-bold">Pondération des Périodes</h3>
            </div>
            <div class="space-y-4">
              <div v-for="(p, idx) in currentPeriods" :key="idx" class="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <span class="text-sm font-medium">{{ p.name }}</span>
                <div class="flex items-center gap-2">
                  <span class="text-xs text-slate-400">Coefficient</span>
                  <input v-model.number="p.coefficient" class="w-16 h-8 text-center border-slate-200 dark:border-slate-700 dark:bg-slate-900 rounded-md text-sm" type="number"/>
                </div>
              </div>
            </div>
            <div class="mt-4 flex justify-end">
              <p class="text-xs font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">Moyenne Annuelle = (T1 + T2 + (T3 × 2)) / 4</p>
            </div>
          </div>
          
          <!-- Section: Eliminatory Thresholds -->
          <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div class="flex items-center gap-2 mb-6">
              <span class="material-symbols-outlined text-red-500">warning</span>
              <h3 class="text-lg font-bold">Notes Éliminatoires</h3>
            </div>
            <p class="text-sm text-slate-500 mb-6">Conditions d'échec automatique basées sur les notes minimales par groupe de matières.</p>
            <div class="space-y-4">
            <div class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-1">
                  <label class="text-xs font-bold uppercase tracking-wider text-slate-500">Matières Fondamentales Min.</label>
                  <div class="flex items-center gap-2">
                    <input v-model.number="rules.minCoreSubjectGrade" class="flex-1 h-10 border-slate-200 dark:border-slate-700 dark:bg-slate-900 rounded-lg text-sm" type="number" step="0.5"/>
                    <span class="text-sm font-medium">/ 20</span>
                  </div>
                </div>
                <div class="space-y-1">
                  <label class="text-xs font-bold uppercase tracking-wider text-slate-500">Moyenne Générale Min.</label>
                  <div class="flex items-center gap-2">
                    <input v-model.number="rules.passGrade" class="flex-1 h-10 border-slate-200 dark:border-slate-700 dark:bg-slate-900 rounded-lg text-sm" type="number" step="0.5"/>
                    <span class="text-sm font-medium">/ 20</span>
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-3 p-3 border border-dashed border-slate-300 dark:border-slate-700 rounded-lg">
                <input v-model="rules.autoAlert" class="rounded text-primary border-slate-300" type="checkbox"/>
                <span class="text-sm">Alerte automatique si une note est &lt; {{ rules.alertThreshold || 5 }}/20</span>
              </div>
            </div>
            </div>
          </div>
          
          <!-- Section: Optional Subjects Bonus -->
          <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div class="flex items-center gap-2 mb-6">
              <span class="material-symbols-outlined text-amber-500">military_tech</span>
              <h3 class="text-lg font-bold">Bonus Matières Facultatives</h3>
            </div>
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm font-medium">Activer le bonus de points</span>
              <div class="relative inline-block w-10 h-6 align-middle select-none">
                <input v-model="rules.enableBonus" class="absolute block w-4 h-4 mt-1 ml-1 bg-white border-none rounded-full appearance-none cursor-pointer checked:right-0 checked:bg-primary transition-all duration-200 ease-in-out" id="toggle" name="toggle" type="checkbox"/>
                <label class="block h-full overflow-hidden bg-slate-200 dark:bg-slate-700 rounded-full cursor-pointer" for="toggle"></label>
              </div>
            </div>
            <div v-if="rules.enableBonus" class="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg space-y-4">
              <div class="flex items-center gap-3">
                <span class="text-sm">Seuls les points au-dessus de</span>
                <input v-model.number="rules.bonusThreshold" class="w-16 h-8 border-slate-200 dark:border-slate-700 dark:bg-slate-900 rounded text-sm text-center" type="number"/>
                <span class="text-sm">sont comptabilisés.</span>
              </div>
              <div class="flex items-center gap-2 text-xs text-slate-500">
                <span class="material-symbols-outlined text-sm">calculate</span>
                <span>Ex: Une note de 14/20 rapporte +{{ 14 - (rules.bonusThreshold || 10) }} points au total général.</span>
              </div>
              <hr class="border-slate-200 dark:border-slate-700"/>
              <div class="flex items-center gap-2">
                <span class="text-sm">Plafonnement du bonus total :</span>
                <input v-model.number="rules.bonusCap" class="w-16 h-8 border-slate-200 dark:border-slate-700 dark:bg-slate-900 rounded text-sm text-center" type="number"/>
                <span class="text-sm">points sur la moyenne.</span>
              </div>
            </div>
            <div v-else class="p-8 text-center text-slate-400 bg-slate-50 dark:bg-slate-800 rounded-lg italic text-sm">
              Le bonus pour les matières facultatives est actuellement désactivé.
            </div>
          </div>
        </div>
        
        
        <!-- Footer Info -->
        <div class="flex justify-between items-center text-xs text-slate-500 pt-4 border-t border-slate-200 dark:border-slate-800">
          <p>© 2023 Système de Gestion Académique - Module de Calcul v4.2.1</p>
          <div class="flex gap-4">
            <a class="hover:text-primary underline" href="#">Documentation technique</a>
            <a class="hover:text-primary underline" href="#">Logs d'audit</a>
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
const year = ref('2023-2024');
const selectedFiliere = ref('generale');

const filieres = ref({
    generale: { periods: [] },
    technique: { periods: [] }
});

const rules = ref({
    decimals: 2,
    passGrade: 10,
    minCoreSubjectGrade: 7,
    on20: true,
    autoAlert: true,
    alertThreshold: 5,
    enableBonus: true,
    bonusThreshold: 10,
    bonusCap: 2
});

const currentPeriods = computed(() => filieres.value[selectedFiliere.value].periods);

const fetchData = async () => {
    try {
        const res = await api.getSetting('academic_year_config');
        if (res.data.success && res.data.data) {
            const config = res.data.data.value;
            year.value = config.year;
            if (config.filieres) {
                filieres.value = config.filieres;
                // Ensure coefficients exist
                Object.values(filieres.value).forEach(f => {
                    f.periods.forEach(p => {
                        if (p.coefficient === undefined) p.coefficient = 1;
                    });
                });
            }
            rules.value = config.rules || rules.value;
        }
    } catch (error) {
        console.error('Erreur chargement config:', error);
    }
};

const saveRules = async () => {
    isSaving.value = true;
    try {
        const res = await api.getSetting('academic_year_config');
        let fullConfig = res.data.data?.value || {};
        
        // Update rules
        fullConfig.rules = { ...fullConfig.rules, ...rules.value };
        
        // Update filieres coefficients but preserve dates
        if (!fullConfig.filieres) fullConfig.filieres = {};
        
        Object.keys(filieres.value).forEach(fKey => {
            if (!fullConfig.filieres[fKey]) fullConfig.filieres[fKey] = { periods: [] };
            
            const localPeriods = filieres.value[fKey].periods;
            const remotePeriods = fullConfig.filieres[fKey].periods;
            
            fullConfig.filieres[fKey].periods = localPeriods.map((lp, idx) => {
                const rp = remotePeriods[idx] || {};
                return { ...rp, coefficient: lp.coefficient }; // Only update coefficient
            });
        });
        
        await api.updateSetting('academic_year_config', fullConfig);
        alert('Règles de calcul enregistrées !');
    } catch (error) {
        console.error('Erreur enregistrement:', error);
    } finally {
        isSaving.value = false;
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
  interLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap';
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
    .font-display {
      font-family: 'Inter', sans-serif;
    }
  `;
  document.head.appendChild(style);
});
</script>
