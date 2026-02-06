<template>
  <!-- Modal Overlay -->
  <Teleport to="body">
    <div 
      v-if="isOpen" 
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      @click.self="closeModal"
    >
      <!-- Modal Container -->
      <div class="bg-white dark:bg-slate-900 w-full max-w-[640px] rounded-xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        <!-- Modal Header -->
        <div class="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <div>
            <h2 class="text-2xl font-bold tracking-tight text-[#0e141b] dark:text-white">Ajouter un Utilisateur</h2>
            <p class="text-[#4e7397] dark:text-slate-400 text-sm mt-1">Créez un nouveau profil pour votre établissement scolaire</p>
          </div>
          <button 
            @click="closeModal"
            class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>

        <!-- Modal Content (Scrollable) -->
        <div class="flex-1 overflow-y-auto p-6">
          <form @submit.prevent="handleSubmit" class="space-y-8">
            <!-- Section: Personal Info -->
            <section>
              <h3 class="text-lg font-semibold mb-4 flex items-center gap-2 text-[#0e141b] dark:text-white">
                <span class="material-symbols-outlined text-primary">person</span>
                Informations personnelles
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="flex flex-col gap-2">
                  <label class="text-sm font-medium text-[#0e141b] dark:text-slate-200">Prénom</label>
                  <input 
                    v-model="form.firstName"
                    class="form-input rounded-lg border-[#d0dbe7] dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-[#0e141b] dark:text-white focus:border-primary focus:ring-primary h-12 px-4 text-base transition-all" 
                    placeholder="Ex: Jean" 
                    type="text"
                    required
                  />
                </div>
                <div class="flex flex-col gap-2">
                  <label class="text-sm font-medium text-[#0e141b] dark:text-slate-200">Nom</label>
                  <input 
                    v-model="form.lastName"
                    class="form-input rounded-lg border-[#d0dbe7] dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-[#0e141b] dark:text-white focus:border-primary focus:ring-primary h-12 px-4 text-base transition-all" 
                    placeholder="Ex: Dupont" 
                    type="text"
                    required
                  />
                </div>
                <div class="flex flex-col gap-2 md:col-span-2">
                  <label class="text-sm font-medium text-[#0e141b] dark:text-slate-200">Adresse Email</label>
                  <div class="relative">
                    <span class="material-symbols-outlined absolute left-3 top-3 text-slate-400 text-xl">mail</span>
                    <input 
                      v-model="form.email"
                      class="form-input w-full rounded-lg border-[#d0dbe7] dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-[#0e141b] dark:text-white focus:border-primary focus:ring-primary h-12 pl-11 pr-4 text-base transition-all" 
                      placeholder="jean.dupont@ecole.fr" 
                      type="email"
                      required
                    />
                  </div>
                </div>
              </div>
            </section>

            <!-- Section: Role Selection -->
            <section>
              <h3 class="text-lg font-semibold mb-4 flex items-center gap-2 text-[#0e141b] dark:text-white">
                <span class="material-symbols-outlined text-primary">badge</span>
                Rôle & Permissions
              </h3>
              <div class="grid grid-cols-1 gap-4">
                <div class="flex flex-col gap-2">
                  <label class="text-sm font-medium text-[#0e141b] dark:text-slate-200">Sélectionner un rôle</label>
                  <select 
                    v-model="form.role"
                    @change="onRoleChange"
                    class="form-select rounded-lg border-[#d0dbe7] dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-[#0e141b] dark:text-white focus:border-primary focus:ring-primary h-12 px-4 transition-all"
                    required
                  >
                    <option disabled value="">Choisir un rôle...</option>
                    <option value="ADMIN">Administrateur</option>
                    <option value="PROFESSEUR">Professeur</option>
                    <option value="ELEVE">Élève</option>
                    <option value="PARENT">Parent</option>
                    <option value="CENSEUR">Censeur</option>
                    <option value="CPE">Conseiller d'Éducation</option>
                    <option value="PROVISEUR">Proviseur</option>
                    <option value="SECRETAIRE">Secrétaire</option>
                  </select>
                </div>
              </div>
            </section>

            <!-- Section: Contextual Attribution -->
            <section v-if="form.role" class="p-4 rounded-xl bg-primary/5 dark:bg-primary/10 border border-primary/20">
              <h3 class="text-sm font-bold uppercase tracking-wider text-primary mb-4 flex items-center gap-2">
                <span class="material-symbols-outlined text-sm">assignment_turned_in</span>
                Attribution Initial
              </h3>
              <div class="space-y-4">
                <p class="text-sm text-[#4e7397] dark:text-slate-400 italic">Paramètres spécifiques au rôle sélectionné.</p>
                
                <!-- Classes assignées (for Professeur) -->
                <div v-if="form.role === 'PROFESSEUR'" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="flex flex-col gap-2">
                    <label class="text-sm font-medium text-[#0e141b] dark:text-slate-200">Classes assignées</label>
                    <div class="flex flex-wrap gap-2">
                      <span 
                        v-for="(classe, index) in form.assignedClasses" 
                        :key="index"
                        class="inline-flex items-center px-3 py-1 rounded-full bg-white dark:bg-slate-800 border border-primary/30 text-xs font-semibold text-primary"
                      >
                        {{ classe }}
                        <span 
                          @click="removeClass(index)"
                          class="material-symbols-outlined ml-1 text-sm cursor-pointer hover:text-red-500"
                        >close</span>
                      </span>
                      <button 
                        type="button"
                        @click="showAddClassModal = true"
                        class="inline-flex items-center px-3 py-1 rounded-full bg-primary text-white text-xs font-bold hover:bg-primary/80 transition-colors"
                      >
                        <span class="material-symbols-outlined text-sm mr-1">add</span> Ajouter
                      </button>
                    </div>
                  </div>
                  <div class="flex flex-col gap-2">
                    <label class="text-sm font-medium text-[#0e141b] dark:text-slate-200">Matières</label>
                    <select 
                      v-model="form.subjects"
                      class="form-multiselect w-full rounded-lg border-[#d0dbe7] dark:border-slate-700 bg-white dark:bg-slate-800 text-[#0e141b] dark:text-white focus:border-primary focus:ring-primary min-h-[80px] p-2 transition-all" 
                      multiple
                    >
                      <option value="math">Mathématiques</option>
                      <option value="physique">Physique-Chimie</option>
                      <option value="svt">SVT</option>
                      <option value="fr">Français</option>
                      <option value="anglais">Anglais</option>
                      <option value="histoire">Histoire-Géographie</option>
                      <option value="philo">Philosophie</option>
                    </select>
                  </div>
                </div>

                <!-- For other roles, show different fields -->
                <div v-else class="text-sm text-[#4e7397] dark:text-slate-400">
                  Les attributions spécifiques seront configurées après la création de l'utilisateur.
                </div>
              </div>
            </section>
          </form>
        </div>

        <!-- Modal Footer -->
        <div class="px-6 py-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 flex justify-end gap-3">
          <button 
            @click="closeModal"
            class="px-6 py-2.5 rounded-lg font-bold text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            Annuler
          </button>
          <button 
            @click="handleSubmit"
            class="px-6 py-2.5 rounded-lg bg-primary text-white font-bold text-sm hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all flex items-center gap-2"
          >
            <span class="material-symbols-outlined text-sm">person_add</span>
            Créer l'utilisateur
          </button>
        </div>
      </div>

      <!-- Modal pour ajouter une classe -->
      <div v-if="showAddClassModal" class="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" @click.self="showAddClassModal = false">
        <div class="bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-md p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-bold text-[#0e141b] dark:text-white">Ajouter une classe</h3>
            <button @click="showAddClassModal = false" class="text-slate-400 hover:text-slate-600">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          <div class="space-y-4">
            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium text-[#0e141b] dark:text-slate-200">Sélectionner une classe</label>
              <select v-model="newClass" class="form-select rounded-lg border-[#d0dbe7] dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-[#0e141b] dark:text-white focus:border-primary focus:ring-primary h-12 px-4">
                <option value="">Choisir une classe...</option>
                <option value="Terminale S1">Terminale S1</option>
                <option value="Terminale S2">Terminale S2</option>
                <option value="Première L">Première L</option>
                <option value="Première S">Première S</option>
                <option value="Seconde A">Seconde A</option>
                <option value="Seconde B">Seconde B</option>
              </select>
            </div>
            <div class="flex justify-end gap-3">
              <button @click="showAddClassModal = false" class="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700">
                Annuler
              </button>
              <button @click="addClass" class="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90">
                Ajouter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'submit'])

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  role: '',
  assignedClasses: ['Terminale S1', 'Première L'],
  subjects: []
})

const showAddClassModal = ref(false)
const newClass = ref('')

// Reset form when modal closes
watch(() => props.isOpen, (newVal) => {
  if (!newVal) {
    // Reset form
    form.firstName = ''
    form.lastName = ''
    form.email = ''
    form.role = ''
    form.assignedClasses = ['Terminale S1', 'Première L']
    form.subjects = []
    showAddClassModal.value = false
  }
})

const closeModal = () => {
  emit('close')
}

const onRoleChange = () => {
  // Reset assignments when role changes
  if (form.role !== 'PROFESSEUR') {
    form.assignedClasses = []
    form.subjects = []
  } else {
    form.assignedClasses = ['Terminale S1', 'Première L']
  }
}

const addClass = () => {
  if (newClass.value && !form.assignedClasses.includes(newClass.value)) {
    form.assignedClasses.push(newClass.value)
    newClass.value = ''
    showAddClassModal.value = false
  }
}

const removeClass = (index) => {
  form.assignedClasses.splice(index, 1)
}

const handleSubmit = () => {
  // Emit submit event with form data
  emit('submit', { ...form })
  closeModal()
}
</script>
