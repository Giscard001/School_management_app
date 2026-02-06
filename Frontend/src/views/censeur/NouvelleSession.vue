<template>
  <div class="p-8 space-y-8">
    <div class="space-y-4">
      <label class="text-sm font-bold text-slate-700 dark:text-slate-300">Type de session</label>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <label class="relative flex flex-col p-4 border-2 border-primary bg-primary/5 rounded-xl cursor-pointer hover:bg-primary/10 transition-all group">
          <input v-model="sessionType" value="saisie" class="sr-only" name="session_type" type="radio"/>
          <span class="material-symbols-outlined text-primary mb-2">edit_note</span>
          <span class="text-sm font-bold">Saisie de notes</span>
          <span class="text-[10px] text-slate-500 mt-1 leading-tight">Ouverture des carnets de notes</span>
          <div v-if="sessionType === 'saisie'" class="absolute top-2 right-2 size-4 rounded-full border-4 border-primary bg-white"></div>
        </label>
        <label class="relative flex flex-col p-4 border-2 border-slate-100 dark:border-slate-800 rounded-xl cursor-pointer hover:border-primary/30 transition-all group">
          <input v-model="sessionType" value="import" class="sr-only" name="session_type" type="radio"/>
          <span class="material-symbols-outlined text-slate-400 group-hover:text-primary mb-2">upload_file</span>
          <span class="text-sm font-bold">Import Excel</span>
          <span class="text-[10px] text-slate-500 mt-1 leading-tight">Mise à jour via fichier externe</span>
          <div v-if="sessionType === 'import'" class="absolute top-2 right-2 size-4 rounded-full border-4 border-primary bg-white"></div>
        </label>
        <label class="relative flex flex-col p-4 border-2 border-slate-100 dark:border-slate-800 rounded-xl cursor-pointer hover:border-primary/30 transition-all group">
          <input v-model="sessionType" value="conseil" class="sr-only" name="session_type" type="radio"/>
          <span class="material-symbols-outlined text-slate-400 group-hover:text-primary mb-2">groups_2</span>
          <span class="text-sm font-bold">Conseil de classe</span>
          <span class="text-[10px] text-slate-500 mt-1 leading-tight">Calcul des moyennes & appréciations</span>
          <div v-if="sessionType === 'conseil'" class="absolute top-2 right-2 size-4 rounded-full border-4 border-primary bg-white"></div>
        </label>
      </div>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="space-y-2">
        <label class="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Période concernée</label>
        <select v-model="periode" class="w-full h-11 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/50 transition-all">
          <optgroup label="Trimestres">
            <option value="T1">1er Trimestre</option>
            <option value="T2">2ème Trimestre</option>
            <option value="T3">3ème Trimestre</option>
          </optgroup>
          <optgroup label="Semestres">
            <option value="S1">1er Semestre</option>
            <option value="S2">2ème Semestre</option>
          </optgroup>
        </select>
      </div>
      <div class="space-y-2">
        <label class="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Date limite de saisie</label>
        <div class="relative">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">calendar_today</span>
          <input v-model="dateLimite" class="w-full h-11 pl-10 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/50 transition-all" type="date"/>
        </div>
      </div>
      <div class="md:col-span-2 space-y-2">
        <label class="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Classes concernées</label>
        <div class="flex flex-wrap gap-2 p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg min-h-[80px]">
          <span v-for="classe in selectedClasses" :key="classe" class="px-2 py-1 bg-primary/10 text-primary text-xs font-bold rounded-md flex items-center gap-1">
            {{ classe }}
            <button @click="removeClass(classe)" class="material-symbols-outlined text-xs">close</button>
          </span>
          <button @click="showAddClass = true" class="px-2 py-1 border-2 border-dashed border-slate-300 dark:border-slate-600 text-slate-400 text-xs font-bold rounded-md flex items-center gap-1 hover:border-primary hover:text-primary transition-colors">
            <span class="material-symbols-outlined text-xs">add</span> Ajouter
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const sessionType = ref('saisie')
const periode = ref('T1')
const dateLimite = ref('')
const selectedClasses = ref(['Toutes les classes', '2nde C', '1ère S'])
const showAddClass = ref(false)

const removeClass = (classe) => {
  selectedClasses.value = selectedClasses.value.filter(c => c !== classe)
}
</script>
