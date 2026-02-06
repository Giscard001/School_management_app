<template>
  <div class="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900">
    <div class="max-w-5xl mx-auto py-8 px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-slate-900 dark:text-white mb-2">Suivi de Mes Enfants</h1>
        <p class="text-slate-500 dark:text-slate-400">Consultez le profil complet et le suivi de chacun de vos enfants</p>
      </div>

      <!-- Children Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="child in children" :key="child.id" class="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-md transition-shadow">
          <!-- Child Header -->
          <div class="p-6 border-b border-slate-100 dark:border-slate-800">
            <div class="flex items-center gap-4">
              <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-xl w-16 h-16 border-2 border-primary/10" :style="`background-image: url('${child.avatar}')`"></div>
              <div class="flex-1">
                <h3 class="text-lg font-bold text-slate-900 dark:text-white">{{ child.name }}</h3>
                <p class="text-sm text-slate-500 dark:text-slate-400">{{ child.class }} — {{ child.filiere }}</p>
                <div class="flex items-center gap-2 mt-1">
                  <span class="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-bold">Actif</span>
                  <span class="text-xs text-slate-400">Matricule: {{ child.matricule }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Child Stats -->
          <div class="p-4 bg-slate-50 dark:bg-slate-800/50">
            <div class="grid grid-cols-3 gap-4 text-center">
              <div>
                <p class="text-lg font-bold text-primary">{{ child.average }}</p>
                <p class="text-xs text-slate-500 dark:text-slate-400">Moyenne</p>
              </div>
              <div>
                <p class="text-lg font-bold text-green-600">{{ child.attendance }}</p>
                <p class="text-xs text-slate-500 dark:text-slate-400">Assiduité</p>
              </div>
              <div>
                <p class="text-lg font-bold text-orange-500">{{ child.absences }}</p>
                <p class="text-xs text-slate-500 dark:text-slate-400">Absences</p>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="p-4 flex gap-2">
            <button @click="viewProfile(child.id)" class="flex-1 flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold shadow-md hover:bg-blue-600 transition-all">
              <span class="material-symbols-outlined text-lg">person</span>
              <span>Voir le profil</span>
            </button>
            <button @click="sendMessage(child)" class="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
              <span class="material-symbols-outlined text-lg">mail</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Add Child Button -->
      <div class="mt-8 flex justify-center">
        <button @click="addChild" class="flex items-center gap-2 rounded-lg h-12 px-6 border-2 border-dashed border-primary/40 text-primary font-bold hover:bg-primary/5 transition-colors">
          <span class="material-symbols-outlined text-xl">add_circle</span>
          <span>Ajouter un enfant</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Données des enfants
const children = ref([
  {
    id: 1,
    name: 'Lucas Dupont',
    class: '3ème B',
    filiere: 'Filière Scientifique',
    matricule: '2023-ST-0452',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnCBdSTipcVY1NBRpS9uK9fD98-A0nhIihrg67vwPvUkxkV8RfHbxgDn9_XtHGOchaY9anwwPR3NlbS9rOvgiJfn7LiIVvrlpA_ntUnBBk9TjcF5IlWgR3W47jMX7FruaEUiElpXmCD7ospQ5_CXayGk_31A3-WX12AaSnilQ73inpgMkkMt6sRT-qmXcTggoqSERHnPXhjzjlS9-380JFBY19Xy9xBHii6UKXURSUAE_5YNweIcS9JQITT8sABQQ7T9VZ2DumTVs',
    average: '15.4',
    attendance: '98%',
    absences: '4h'
  },
  {
    id: 2,
    name: 'Emma Dupont',
    class: '5ème A',
    filiere: 'Filière Générale',
    matricule: '2023-ST-0453',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2Q-mSuKO5BceEU7Ow7-o6cQlZPqtLeDwyLDV4P1rbCPkbo4GDtZBSXXQhPdzTsHKHdH_AxQA8gV-kfSHhlLDLoOSgrHZBlXXnTkfDRGHXe3ztpkNpAcRkWyuhfs_JWTcUORAgT0u1HTB9x56ENV2wN2KCHLfTMxZoUsE6OlmOH8LNu6hyB58cn9FuJX2KVWGieaYi1dHA1s0xmicUfy02LdhE7RGFscceAEN0dpHC9tTtg0y4Ie5zfL7VcXtDih3NbGguvUhsGcY',
    average: '14.2',
    attendance: '96%',
    absences: '8h'
  }
])

// Fonctions
const viewProfile = (childId) => {
  router.push(`/parent/enfants/${childId}`)
}

const sendMessage = (child) => {
  console.log('Envoyer un message à:', child.name)
}

const addChild = () => {
  console.log('Ajouter un nouvel enfant')
}
</script>
