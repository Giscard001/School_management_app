<template>
  <div class="flex-1 flex flex-col overflow-y-auto bg-background-light dark:bg-background-dark">
    <!-- Page Header -->
    <header class="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-8 pt-8 pb-4">
      <div class="flex flex-wrap justify-between items-end gap-4 mb-6">
        <div class="flex flex-col gap-1">
          <h2 class="text-[#0e141b] dark:text-white text-3xl font-black tracking-tight">Annuaire des Élèves</h2>
          <p class="text-[#4e7397] dark:text-slate-400 text-sm">Gérez et contactez vos élèves et leurs parents en un clic.</p>
        </div>
      </div>
      <!-- Filters Bar -->
      <div class="flex flex-wrap items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
        <div class="flex-1 min-w-[300px]">
          <label class="relative flex items-center h-12 w-full group">
            <span class="absolute left-4 text-[#4e7397] group-focus-within:text-primary transition-colors material-symbols-outlined">search</span>
            <input v-model="searchQuery" class="w-full h-full pl-12 pr-4 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20 placeholder:text-slate-400" placeholder="Rechercher par nom, prénom ou matricule..."/>
          </label>
        </div>
        <div class="w-48">
          <select v-model="selectedClasse" class="w-full h-12 px-4 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium focus:ring-primary focus:border-primary text-slate-700 dark:text-slate-200">
            <option value="6a">Classe: 6ème A</option>
            <option value="6b">Classe: 6ème B</option>
            <option value="5a">Classe: 5ème A</option>
            <option value="all">Toutes mes classes</option>
          </select>
        </div>
        <button @click="ouvrirFiltres" class="h-12 px-6 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-all flex items-center gap-2 text-sm">
          <span class="material-symbols-outlined text-xl">filter_list</span>
          Filtres Avancés
        </button>
      </div>
    </header>

    <!-- Students Trombinoscope Grid -->
    <section class="p-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        <!-- Student Card 1 -->
        <div class="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center group hover:shadow-md transition-shadow">
          <div class="relative mb-4">
            <div class="w-24 h-24 bg-center bg-no-repeat aspect-square bg-cover rounded-full ring-4 ring-slate-50 dark:ring-slate-800" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDg0thWsqVlbSSYsyazdcd8r1iFYmRTrcDa5eRDireC9hiI90pEw7Fgnyc4U2DX7wQhiX6XsdggrAZNJs-_PGiVNceHSH0cBtA88aZvBzTQYjPZOGyfvNJDpTMaUoDZKrSOUuLx5lGOA1-drnwfXYXgNJZ_KnsI1FCM8sS50OHe2DMGPgfR7TSsRLfj9ysaRR8dTSxr_2ijFmY--XDsIk47CsI2NrDwXSNNNx-H2RZDS3gH3z5HakP196iE7EW5hrr96j4EpEIt3kM");'></div>
            <span class="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
          </div>
          <h3 class="text-[#0e141b] dark:text-white text-lg font-bold">Jean Dupont</h3>
          <p class="text-primary text-xs font-bold mb-3">MAT-2023-001</p>
          <div class="flex flex-col gap-1 mb-6">
            <div class="flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400">
              <span class="material-symbols-outlined text-base">call</span>
              <span class="text-xs">06 12 34 56 78</span>
            </div>
            <div class="flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400">
              <span class="material-symbols-outlined text-base">mail</span>
              <span class="text-xs">p.dupont@email.com</span>
            </div>
          </div>
          <button @click="contacterParent" class="w-full py-2.5 bg-primary/10 hover:bg-primary text-primary hover:text-white rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2">
            <span class="material-symbols-outlined text-lg">chat_bubble</span>
            Message Parent
          </button>
        </div>

        <!-- Student Card 2 -->
        <div class="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center group hover:shadow-md transition-shadow">
          <div class="relative mb-4">
            <div class="w-24 h-24 bg-center bg-no-repeat aspect-square bg-cover rounded-full ring-4 ring-slate-50 dark:ring-slate-800" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCdScRn7nlHrybqk3UX4f0drcaevFnsE4izQvejFQJ8RFcZN3jzSw4UZ74-zME2IfUfqR4evGn8U78wmhg-vseylnxM53j5zX0dFAamgNsjyoInlR9hZR_L_ovroTQrtkCRoD6ILI-BwZNWsLXhWWUq45xZF0khROnedVfQqZ797KRLfPb1Y-eg2El1EyQ2-CnUIW3Z1i0qrdUDFV1vC8fL3eS1YVpzwqeE0BOVtCO-NEFPMUyHF8aqbY_zeIUt26FvPiBy6ZdZDTY");'></div>
            <span class="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
          </div>
          <h3 class="text-[#0e141b] dark:text-white text-lg font-bold">Marie Curie</h3>
          <p class="text-primary text-xs font-bold mb-3">MAT-2023-002</p>
          <div class="flex flex-col gap-1 mb-6">
            <div class="flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400">
              <span class="material-symbols-outlined text-base">call</span>
              <span class="text-xs">06 22 33 44 55</span>
            </div>
            <div class="flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400">
              <span class="material-symbols-outlined text-base">mail</span>
              <span class="text-xs">m.curie@email.com</span>
            </div>
          </div>
          <button @click="contacterParent" class="w-full py-2.5 bg-primary/10 hover:bg-primary text-primary hover:text-white rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2">
            <span class="material-symbols-outlined text-lg">chat_bubble</span>
            Message Parent
          </button>
        </div>

        <!-- Student Card 3 -->
        <div class="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center group hover:shadow-md transition-shadow">
          <div class="relative mb-4">
            <div class="w-24 h-24 bg-center bg-no-repeat aspect-square bg-cover rounded-full ring-4 ring-slate-50 dark:ring-slate-800" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCDPd9vGkTpSNYF3hU-kYjPU-f-xOOCoMp0ECb4jxyiD6IHY1bHCUnveOIf8SJK8WfvKziiya1D89gHTski6m2ZZGk3osIYRigfm2Zxe_a0SarXhtJOgnEbgRpu70nuLLwjVQgzg29K5XqSyAB5eEIpkqCLQOv15RX3cJN3pikPbMxgXS7lPS1n1jiXnGQjcvcHzWQhhDJXyyWDWuR7Je0s863VGA6V30fq1wDbGw4ESPfZBZgFuoOnTni0jLzKLZMJNO9ckuo8iYI");'></div>
            <span class="absolute bottom-1 right-1 w-5 h-5 bg-slate-300 border-2 border-white dark:border-slate-900 rounded-full"></span>
          </div>
          <h3 class="text-[#0e141b] dark:text-white text-lg font-bold">Lucas Bernard</h3>
          <p class="text-primary text-xs font-bold mb-3">MAT-2023-003</p>
          <div class="flex flex-col gap-1 mb-6">
            <div class="flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400">
              <span class="material-symbols-outlined text-base">call</span>
              <span class="text-xs">06 99 88 77 66</span>
            </div>
            <div class="flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400">
              <span class="material-symbols-outlined text-base">mail</span>
              <span class="text-xs">l.bernard@email.com</span>
            </div>
          </div>
          <button @click="contacterParent" class="w-full py-2.5 bg-primary/10 hover:bg-primary text-primary hover:text-white rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2">
            <span class="material-symbols-outlined text-lg">chat_bubble</span>
            Message Parent
          </button>
        </div>

        <!-- Student Card 4 -->
        <div class="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center group hover:shadow-md transition-shadow">
          <div class="relative mb-4">
            <div class="w-24 h-24 bg-center bg-no-repeat aspect-square bg-cover rounded-full ring-4 ring-slate-50 dark:ring-slate-800" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCDPd9vGkTpSNYF3hU-kYjPU-f-xOOCoMp0ECb4jxyiD6IHY1bHCUnveOIf8SJK8WfvKziiya1D89gHTski6m2ZZGk3osIYRigfm2Zxe_a0SarXhtJOgnEbgRpu70nuLLwjVQgzg29K5XqSyAB5eEIpkqCLQOv15RX3cJN3pikPbMxgXS7lPS1n1jiXnGQjcvcHzWQhhDJXyyWDWuR7Je0s863VGA6V30fq1wDbGw4ESPfZBZgFuoOnTni0jLzKLZMJNO9ckuo8iYI");'></div>
            <span class="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
          </div>
          <h3 class="text-[#0e141b] dark:text-white text-lg font-bold">Sophie Martin</h3>
          <p class="text-primary text-xs font-bold mb-3">MAT-2023-004</p>
          <div class="flex flex-col gap-1 mb-6">
            <div class="flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400">
              <span class="material-symbols-outlined text-base">call</span>
              <span class="text-xs">06 11 22 33 44</span>
            </div>
            <div class="flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400">
              <span class="material-symbols-outlined text-base">mail</span>
              <span class="text-xs">s.martin@email.com</span>
            </div>
          </div>
          <button @click="contacterParent" class="w-full py-2.5 bg-primary/10 hover:bg-primary text-primary hover:text-white rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2">
            <span class="material-symbols-outlined text-lg">chat_bubble</span>
            Message Parent
          </button>
        </div>

        <!-- Student Card 5 -->
        <div class="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center group hover:shadow-md transition-shadow">
          <div class="relative mb-4">
            <div class="w-24 h-24 bg-center bg-no-repeat aspect-square bg-cover rounded-full ring-4 ring-slate-50 dark:ring-slate-800" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCDPd9vGkTpSNYF3hU-kYjPU-f-xOOCoMp0ECb4jxyiD6IHY1bHCUnveOIf8SJK8WfvKziiya1D89gHTski6m2ZZGk3osIYRigfm2Zxe_a0SarXhtJOgnEbgRpu70nuLLwjVQgzg29K5XqSyAB5eEIpkqCLQOv15RX3cJN3pikPbMxgXS7lPS1n1jiXnGQjcvcHzWQhhDJXyyWDWuR7Je0s863VGA6V30fq1wDbGw4ESPfZBZgFuoOnTni0jLzKLZMJNO9ckuo8iYI");'></div>
            <span class="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
          </div>
          <h3 class="text-[#0e141b] dark:text-white text-lg font-bold">Thomas Petit</h3>
          <p class="text-primary text-xs font-bold mb-3">MAT-2023-005</p>
          <div class="flex flex-col gap-1 mb-6">
            <div class="flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400">
              <span class="material-symbols-outlined text-base">call</span>
              <span class="text-xs">06 55 44 33 22</span>
            </div>
            <div class="flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400">
              <span class="material-symbols-outlined text-base">mail</span>
              <span class="text-xs">t.petit@email.com</span>
            </div>
          </div>
          <button @click="contacterParent" class="w-full py-2.5 bg-primary/10 hover:bg-primary text-primary hover:text-white rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2">
            <span class="material-symbols-outlined text-lg">chat_bubble</span>
            Message Parent
          </button>
        </div>

        <!-- Student Card 6 -->
        <div class="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center group hover:shadow-md transition-shadow">
          <div class="relative mb-4">
            <div class="w-24 h-24 bg-center bg-no-repeat aspect-square bg-cover rounded-full ring-4 ring-slate-50 dark:ring-slate-800" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCDPd9vGkTpSNYF3hU-kYjPU-f-xOOCoMp0ECb4jxyiD6IHY1bHCUnveOIf8SJK8WfvKziiya1D89gHTski6m2ZZGk3osIYRigfm2Zxe_a0SarXhtJOgnEbgRpu70nuLLwjVQgzg29K5XqSyAB5eEIpkqCLQOv15RX3cJN3pikPbMxgXS7lPS1n1jiXnGQjcvcHzWQhhDJXyyWDWuR7Je0s863VGA6V30fq1wDbGw4ESPfZBZgFuoOnTni0jLzKLZMJNO9ckuo8iYI");'></div>
            <span class="absolute bottom-1 right-1 w-5 h-5 bg-slate-300 border-2 border-white dark:border-slate-900 rounded-full"></span>
          </div>
          <h3 class="text-[#0e141b] dark:text-white text-lg font-bold">Emma Leroy</h3>
          <p class="text-primary text-xs font-bold mb-3">MAT-2023-006</p>
          <div class="flex flex-col gap-1 mb-6">
            <div class="flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400">
              <span class="material-symbols-outlined text-base">call</span>
              <span class="text-xs">06 77 88 99 00</span>
            </div>
            <div class="flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400">
              <span class="material-symbols-outlined text-base">mail</span>
              <span class="text-xs">e.leroy@email.com</span>
            </div>
          </div>
          <button @click="contacterParent" class="w-full py-2.5 bg-primary/10 hover:bg-primary text-primary hover:text-white rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2">
            <span class="material-symbols-outlined text-lg">chat_bubble</span>
            Message Parent
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const searchQuery = ref('')
const selectedClasse = ref('all')

const ouvrirFiltres = () => {
  console.log('Opening advanced filters...')
  alert('Filtres avancés ouverts !')
}

const contacterParent = () => {
  console.log('Opening message composer...')
  alert('Messagerie ouverte !')
}
</script>
