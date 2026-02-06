<template>
  <div class="p-8 max-w-7xl mx-auto w-full space-y-8">
    <!-- Stats Row -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div class="flex justify-between items-start">
          <p class="text-[#4e7397] dark:text-slate-400 text-sm font-medium">Total Élèves</p>
          <span class="material-symbols-outlined text-primary">groups</span>
        </div>
        <p class="text-3xl font-bold leading-tight">1,240</p>
        <div class="flex items-center gap-1 mt-2">
          <span class="material-symbols-outlined text-sm text-green-600">trending_up</span>
          <p class="text-green-600 text-xs font-semibold">+2% vs mois dernier</p>
        </div>
      </div>
      <div class="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div class="flex justify-between items-start">
          <p class="text-[#4e7397] dark:text-slate-400 text-sm font-medium">Notes en Attente</p>
          <span class="material-symbols-outlined text-orange-500">pending_actions</span>
        </div>
        <p class="text-3xl font-bold leading-tight">15%</p>
        <div class="flex items-center gap-1 mt-2">
          <span class="material-symbols-outlined text-sm text-red-500">trending_down</span>
          <p class="text-red-500 text-xs font-semibold">-5% de retard</p>
        </div>
      </div>
      <div class="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div class="flex justify-between items-start">
          <p class="text-[#4e7397] dark:text-slate-400 text-sm font-medium">Anomalies Ouvertes</p>
          <span class="material-symbols-outlined text-red-500">error</span>
        </div>
        <p class="text-3xl font-bold leading-tight">12</p>
        <div class="flex items-center gap-1 mt-2">
          <span class="material-symbols-outlined text-sm text-green-600">check_circle</span>
          <p class="text-green-600 text-xs font-semibold">4 résolues aujourd'hui</p>
        </div>
      </div>
      <div class="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div class="flex justify-between items-start">
          <p class="text-[#4e7397] dark:text-slate-400 text-sm font-medium">Demandes Déblocage</p>
          <span class="material-symbols-outlined text-blue-500">lock_open</span>
        </div>
        <p class="text-3xl font-bold leading-tight">5</p>
        <div class="flex items-center gap-1 mt-2">
          <p class="text-slate-400 text-xs font-normal">En attente de revue</p>
        </div>
      </div>
    </div>
    
    <!-- Main Charts Section -->
    <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <div class="p-6 border-b border-slate-200 dark:border-slate-800">
        <h2 class="text-lg font-bold">Complétude des Notes par Filière</h2>
        <p class="text-sm text-slate-500">Progression globale du semestre en cours</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
        <!-- Technique Chart -->
        <div class="space-y-4">
          <div class="flex justify-between items-end">
            <div>
              <p class="text-slate-500 text-sm font-medium">Filière Technique</p>
              <p class="text-4xl font-bold text-primary">78%</p>
            </div>
            <div class="text-right">
              <span class="text-green-600 text-sm font-bold">+5%</span>
              <p class="text-xs text-slate-400">vs Semaine 12</p>
            </div>
          </div>
          <div class="grid grid-cols-4 gap-4 items-end h-48 pt-6">
            <div class="flex flex-col items-center gap-2 h-full justify-end">
              <div class="w-full bg-primary/20 rounded-t-lg border-t-4 border-primary" style="height: 60%"></div>
              <p class="text-[11px] font-bold text-slate-500">Génie C.</p>
            </div>
            <div class="flex flex-col items-center gap-2 h-full justify-end">
              <div class="w-full bg-primary/20 rounded-t-lg border-t-4 border-primary" style="height: 85%"></div>
              <p class="text-[11px] font-bold text-slate-500">Élec.</p>
            </div>
            <div class="flex flex-col items-center gap-2 h-full justify-end">
              <div class="w-full bg-primary/20 rounded-t-lg border-t-4 border-primary" style="height: 45%"></div>
              <p class="text-[11px] font-bold text-slate-500">Compta.</p>
            </div>
            <div class="flex flex-col items-center gap-2 h-full justify-end">
              <div class="w-full bg-primary/20 rounded-t-lg border-t-4 border-primary" style="height: 92%"></div>
              <p class="text-[11px] font-bold text-slate-500">Méca.</p>
            </div>
          </div>
        </div>
        
        <!-- Generale Chart -->
        <div class="space-y-4">
          <div class="flex justify-between items-end">
            <div>
              <p class="text-slate-500 text-sm font-medium">Filière Générale</p>
              <p class="text-4xl font-bold text-slate-800 dark:text-slate-100">92%</p>
            </div>
            <div class="text-right">
              <span class="text-red-500 text-sm font-bold">-2%</span>
              <p class="text-xs text-slate-400">Retard 2nde L</p>
            </div>
          </div>
          <div class="grid grid-cols-4 gap-4 items-end h-48 pt-6">
            <div class="flex flex-col items-center gap-2 h-full justify-end">
              <div class="w-full bg-slate-200 dark:bg-slate-800 rounded-t-lg border-t-4 border-slate-400" style="height: 95%"></div>
              <p class="text-[11px] font-bold text-slate-500">1ère S</p>
            </div>
            <div class="flex flex-col items-center gap-2 h-full justify-end">
              <div class="w-full bg-slate-200 dark:bg-slate-800 rounded-t-lg border-t-4 border-slate-400" style="height: 70%"></div>
              <p class="text-[11px] font-bold text-slate-500">2nde L</p>
            </div>
            <div class="flex flex-col items-center gap-2 h-full justify-end">
              <div class="w-full bg-slate-200 dark:bg-slate-800 rounded-t-lg border-t-4 border-slate-400" style="height: 100%"></div>
              <p class="text-[11px] font-bold text-slate-500">Tle D</p>
            </div>
            <div class="flex flex-col items-center gap-2 h-full justify-end">
              <div class="w-full bg-slate-200 dark:bg-slate-800 rounded-t-lg border-t-4 border-slate-400" style="height: 88%"></div>
              <p class="text-[11px] font-bold text-slate-500">3ème</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Two-Column Actions Layout -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Critical Anomalies -->
      <section class="flex flex-col bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div class="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
          <h3 class="font-bold flex items-center gap-2">
            <span class="material-symbols-outlined text-red-500">priority_high</span>
            Anomalies Critiques
          </h3>
          <router-link to="/censeur/rapports" class="text-xs text-primary font-bold hover:underline">Tout voir</router-link>
        </div>
        <div class="divide-y divide-slate-100 dark:divide-slate-800">
          <div class="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer flex items-center gap-4">
            <div class="size-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 shrink-0">
              <span class="material-symbols-outlined">feedback</span>
            </div>
            <div class="flex-grow">
              <p class="text-sm font-bold">Notes manquantes - Classe 3A</p>
              <p class="text-xs text-slate-500">Matière: Mathématiques | Date limite dépassée</p>
            </div>
            <span class="text-[10px] font-bold px-2 py-1 rounded bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300">URGENT</span>
          </div>
          <div class="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer flex items-center gap-4">
            <div class="size-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 shrink-0">
              <span class="material-symbols-outlined">rule</span>
            </div>
            <div class="flex-grow">
              <p class="text-sm font-bold">Incohérence moyenne - 1ère C</p>
              <p class="text-xs text-slate-500">Moyenne de classe supérieure à 18/20</p>
            </div>
            <span class="text-[10px] font-bold px-2 py-1 rounded bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300">VÉRIFIER</span>
          </div>
          <div class="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer flex items-center gap-4">
            <div class="size-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 shrink-0">
              <span class="material-symbols-outlined">assignment_late</span>
            </div>
            <div class="flex-grow">
              <p class="text-sm font-bold">Zéro non justifié - Tle L</p>
              <p class="text-xs text-slate-500">3 élèves sans motif d'absence</p>
            </div>
            <span class="text-[10px] font-bold px-2 py-1 rounded bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300">URGENT</span>
          </div>
        </div>
      </section>
      
      <!-- Unlock Requests -->
      <section class="flex flex-col bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div class="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
          <h3 class="font-bold flex items-center gap-2">
            <span class="material-symbols-outlined text-primary">key</span>
            Demandes de Déblocage
          </h3>
          <router-link to="/censeur/deblocage" class="text-xs text-primary font-bold hover:underline">Voir les 5</router-link>
        </div>
        <div class="divide-y divide-slate-100 dark:divide-slate-800">
          <div class="p-4 flex items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" data-alt="Avatar de l'enseignant M. Koulibaly" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCd8BbzsNUlS3CXnw8Zx88AcZvU4K7It6X_vBVdj7AifoPYen7O6uL8m5oFGdvUS9VrQa1Fj2PqelUWGoVBBvo3UiDJMcwNxaUT8eFznkaWSC91CYdvmUjCkx_JPq30FDO0aiwGqA5vua33N-OWotZMZRnS2UUbDP8mgNrtf7T69K0OR3gJvq_dMB_7xaDL-THNgw3CpJagdGMH2s_ldHta2_lC1-9IRnca_vTAkOVoc9XiCzDsPincKzS2vrpiojKiLplDXyFR6wI");'></div>
              <div>
                <p class="text-sm font-bold">M. Koulibaly (SVT)</p>
                <p class="text-xs text-slate-500">Correction erreur - 2nde C2</p>
              </div>
            </div>
            <div class="flex gap-2">
              <button class="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-bold hover:bg-slate-50">Refuser</button>
              <button class="px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary/90">Approuver</button>
            </div>
          </div>
          <div class="p-4 flex items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" data-alt="Avatar de l'enseignant Mme. Traoré" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDHDUQbrEhGULd2Jb1Ijv7c8bZSq3sklzrs2s90Wz7soFq4VvBmsP47CNU6ICb-OHXrzEnhGoJDVKOTVdIy71g3_ZvoXuSMuzaMDCctkFpE8r-S7omEPut5ZWys5nIHW_WwlmrQnTLQbWs-OrvnMAva0P8yaPe8UtrobfNaASrdsjfi8Js6R2oupTk5wQZI6VKGgEeyZkLjJbOB-ELFVti8Y_QzvDXByz-meriby4BL3xFYniawVtamkyYDeSOAAIl9wfFEQIlrVZE");'></div>
              <div>
                <p class="text-sm font-bold">Mme. Traoré (Français)</p>
                <p class="text-xs text-slate-500">Oubli évaluation - 5ème A</p>
              </div>
            </div>
            <div class="flex gap-2">
              <button class="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-bold hover:bg-slate-50">Refuser</button>
              <button class="px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary/90">Approuver</button>
            </div>
          </div>
          <div class="p-4 flex items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" data-alt="Avatar de l'enseignant M. Wilson" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDBir0yYt4PXveFDu4lq0Dnf9SLUb41aNiqcRBqWpMqPxUuvY2o9963_U9djf50Much8LDya7UYvkhm2kfbTiuALCiWHplDqUQIFf3WOnVSWWvtSdQonTvvH-0eHMJWUfR-gN-3okK8swlkUSwtED94yAtcNq27UaAzaDfCdBsrvDmZiHCjMVCg8UrnYoXrEow3xw_xlmbRhrZADg6iPS9qHGxLdoo9Ie91yBOywbecSegHftwQxE3EMRKDhr267VAgBaRtSaoZnY");'></div>
              <div>
                <p class="text-sm font-bold">M. Wilson (Anglais)</p>
                <p class="text-xs text-slate-500">Note reportée erronée - Tle B</p>
              </div>
            </div>
            <div class="flex gap-2">
              <button class="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-bold hover:bg-slate-50">Refuser</button>
              <button class="px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary/90">Approuver</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
</script>
