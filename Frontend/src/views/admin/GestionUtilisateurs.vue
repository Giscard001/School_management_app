<template>
  <div class="min-h-screen bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100">
    <!-- Main Content Area -->
    <main class="flex-1 flex flex-col overflow-y-auto p-8">
      <div class="max-w-6xl mx-auto space-y-6">
        <!-- Page Heading & CTA -->
        <div class="flex flex-wrap items-end justify-between gap-4">
          <div class="flex flex-col gap-1">
            <h3 class="text-3xl font-black text-slate-900 dark:text-white">Annuaire des comptes</h3>
            <p class="text-slate-500 dark:text-slate-400 text-base">Gérez les comptes des professeurs, élèves et parents de l'établissement.</p>
          </div>
          <router-link to="/admin/ajouter-utilisateur" class="flex items-center justify-center gap-2 px-6 h-12 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
            <span class="material-symbols-outlined">person_add</span>
            <span>Ajouter un utilisateur</span>
          </router-link>
        </div>
          
        <!-- Search and Filters Card -->
        <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm space-y-4">
          <div class="flex flex-col md:flex-row gap-4">
            <div class="flex-1">
              <label class="relative block">
                <span class="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                  <span class="material-symbols-outlined">search</span>
                </span>
                <input v-model="searchQuery" class="block w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl py-3 pl-12 pr-4 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20" placeholder="Rechercher par nom, email ou matricule..." type="text"/>
              </label>
            </div>
            <div class="flex items-center gap-2 px-1">
              <div class="flex bg-slate-50 dark:bg-slate-800 p-1 rounded-lg">
                <button 
                  @click="selectedRole = 'Tous'"
                  :class="[
                    'px-4 py-2 text-sm font-semibold rounded-md transition-all',
                    selectedRole === 'Tous' ? 'bg-white dark:bg-slate-700 shadow-sm text-primary' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                  ]"
                >Tous</button>
                <button 
                  @click="selectedRole = 'Professeur'"
                  :class="[
                    'px-4 py-2 text-sm font-semibold rounded-md transition-all',
                    selectedRole === 'Professeur' ? 'bg-white dark:bg-slate-700 shadow-sm text-primary' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                  ]"
                >Professeurs</button>
                <button 
                  @click="selectedRole = 'Eleve'"
                  :class="[
                    'px-4 py-2 text-sm font-semibold rounded-md transition-all',
                    selectedRole === 'Eleve' ? 'bg-white dark:bg-slate-700 shadow-sm text-primary' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                  ]"
                >Élèves</button>
                <button 
                  @click="selectedRole = 'Parent'"
                  :class="[
                    'px-4 py-2 text-sm font-semibold rounded-md transition-all',
                    selectedRole === 'Parent' ? 'bg-white dark:bg-slate-700 shadow-sm text-primary' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                  ]"
                >Parents</button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Table Container -->
        <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="border-b border-slate-100 dark:border-slate-800">
                  <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Utilisateur</th>
                  <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Rôle</th>
                  <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Classe / Attribution</th>
                  <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Date d'inscription</th>
                  <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Statut</th>
                  <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                <tr v-if="isLoading" class="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                  <td colspan="5" class="px-6 py-8 text-center text-slate-500">Chargement...</td>
                </tr>
                <tr v-else-if="paginatedUsers.length === 0" class="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                  <td colspan="5" class="px-6 py-8 text-center text-slate-500">Aucun utilisateur trouvé</td>
                </tr>
                <tr v-else v-for="user in paginatedUsers" :key="user._id" class="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-3">
                      <div class="size-10 rounded-full bg-blue-100 flex items-center justify-center text-primary font-bold">{{ getInitials(user.nom, user.prenom) }}</div>
                      <div class="flex flex-col">
                        <span class="text-sm font-bold text-slate-900 dark:text-white">{{ user.prenom }} {{ user.nom }}</span>
                        <span class="text-xs text-slate-500">{{ user.email }}</span>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <span :class="['inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold', getRoleBadgeClass(user.role)]">
                      {{ user.role }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                    <span v-if="user.role === 'ELEVE' && user.classe" class="font-medium">
                      {{ user.classe.niveau }} {{ user.classe.section }}
                    </span>
                    <span v-else-if="user.role === 'ELEVE'" class="text-slate-400 italic text-xs">
                      Non assigné
                    </span>
                    <span v-else-if="user.role === 'PROFESSEUR'" class="text-xs">
                      Voir détails
                    </span>
                  </td>
                  <td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{{ formatDate(user.createdAt) }}</td>
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-1.5">
                      <span :class="['size-2 rounded-full', getStatusColor(user.status)]"></span>
                      <span class="text-sm font-medium text-slate-600 dark:text-slate-400">{{ user.status }}</span>
                    </div>
                  </td>
                  <td class="px-6 py-4 text-right">
                    <div class="flex justify-end gap-2">
                      <button @click="openEditModal(user)" class="p-2 text-slate-400 hover:text-primary transition-colors" title="Modifier">
                        <span class="material-symbols-outlined text-xl">edit</span>
                      </button>
                      <button @click="toggleUserStatus(user)" class="p-2 text-slate-400 hover:text-amber-600 transition-colors" :title="user.status === 'ACTIF' ? 'Désactiver' : 'Activer'">
                        <span class="material-symbols-outlined text-xl">{{ user.status === 'ACTIF' ? 'block' : 'check_circle' }}</span>
                      </button>
                      <button @click="deleteUser(user._id)" class="p-2 text-slate-400 hover:text-red-600 transition-colors" title="Supprimer">
                        <span class="material-symbols-outlined text-xl">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <!-- Pagination -->
        <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm">
          <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div class="text-sm text-slate-600 dark:text-slate-400">
              Affichage de {{ startItem }} à {{ endItem }} sur {{ filteredUsers.length }} utilisateurs
            </div>
            <div class="flex items-center gap-1" v-if="totalPages > 1">
              <button 
                @click="currentPage--"
                :disabled="currentPage === 1"
                class="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <span class="material-symbols-outlined">chevron_left</span>
              </button>
              
              <template v-for="page in totalPages" :key="page">
                <button 
                  v-if="shouldShowPage(page)"
                  @click="currentPage = page"
                  :class="[
                    'size-8 rounded-lg text-sm font-medium transition-all',
                    currentPage === page ? 'bg-primary text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  ]"
                >{{ page }}</button>
                <span v-else-if="shouldShowEllipsis(page)" class="px-1 text-slate-400 text-sm">...</span>
              </template>

              <button 
                @click="currentPage++"
                :disabled="currentPage === totalPages"
                class="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <span class="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>

  <!-- Edit User Modal -->
  <div v-if="showEditModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
    <div class="bg-white dark:bg-slate-900 w-full max-w-[640px] rounded-xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
      <!-- Modal Header -->
      <div class="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
        <div>
          <h2 class="text-2xl font-bold tracking-tight text-[#0e141b] dark:text-white">Modifier l'utilisateur</h2>
          <p class="text-[#4e7397] dark:text-slate-400 text-sm mt-1">Mettre à jour les informations de {{ editForm.prenom }} {{ editForm.nom }}</p>
        </div>
        <button @click="closeEditModal" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>
      
      <!-- Modal Content -->
      <div class="flex-1 overflow-y-auto p-6">
        <form @submit.prevent="handleUpdate" class="space-y-6">
          <div v-if="editErrorMessage" class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p class="text-sm text-red-600 dark:text-red-400">{{ editErrorMessage }}</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium text-[#0e141b] dark:text-slate-200">Prénom</label>
              <input v-model="editForm.prenom" required class="form-input rounded-lg border-[#d0dbe7] dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-[#0e141b] dark:text-white focus:border-primary focus:ring-primary h-12 px-4 text-base" type="text"/>
            </div>
            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium text-[#0e141b] dark:text-slate-200">Nom</label>
              <input v-model="editForm.nom" required class="form-input rounded-lg border-[#d0dbe7] dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-[#0e141b] dark:text-white focus:border-primary focus:ring-primary h-12 px-4 text-base" type="text"/>
            </div>
            <div class="flex flex-col gap-2 md:col-span-2">
              <label class="text-sm font-medium text-[#0e141b] dark:text-slate-200">Email</label>
              <input v-model="editForm.email" required class="form-input rounded-lg border-[#d0dbe7] dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-[#0e141b] dark:text-white focus:border-primary focus:ring-primary h-12 px-4 text-base" type="email"/>
            </div>
            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium text-[#0e141b] dark:text-slate-200">Téléphone</label>
              <input v-model="editForm.telephone" class="form-input rounded-lg border-[#d0dbe7] dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-[#0e141b] dark:text-white focus:border-primary focus:ring-primary h-12 px-4 text-base" type="text"/>
            </div>
            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium text-[#0e141b] dark:text-slate-200">Rôle</label>
              <select v-model="editForm.role" required class="form-select rounded-lg border-[#d0dbe7] dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-[#0e141b] dark:text-white focus:border-primary focus:ring-primary h-12 px-4">
                <option value="ADMIN">Administrateur</option>
                <option value="PROFESSEUR">Professeur</option>
                <option value="ELEVE">Élève</option>
                <option value="PARENT">Parent</option>
                <option value="CENSEUR">Censeur</option>
                <option value="CPE">CPE</option>
                <option value="PROVISEUR">Proviseur</option>
                <option value="SECRETAIRE">Secrétaire</option>
              </select>
            </div>
            <div v-if="editForm.role === 'ELEVE'" class="flex flex-col gap-2 md:col-span-2">
              <label class="text-sm font-medium text-[#0e141b] dark:text-slate-200">Classe</label>
              <select v-model="editForm.classe" class="form-select rounded-lg border-[#d0dbe7] dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-[#0e141b] dark:text-white focus:border-primary focus:ring-primary h-12 px-4">
                <option value="">Sélectionner une classe...</option>
                <option v-for="c in availableClasses" :key="c._id" :value="c._id">
                  {{ c.niveau }} {{ c.section }}
                </option>
              </select>
            </div>
            <div class="flex flex-col gap-2 md:col-span-2">
              <label class="text-sm font-medium text-[#0e141b] dark:text-slate-200">Statut</label>
              <select v-model="editForm.status" required class="form-select rounded-lg border-[#d0dbe7] dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-[#0e141b] dark:text-white focus:border-primary focus:ring-primary h-12 px-4">
                <option value="ACTIF">Actif</option>
                <option value="INACTIF">Inactif</option>
                <option value="EN_ATTENTE">En attente</option>
                <option value="BLOQUE">Bloqué</option>
              </select>
            </div>
          </div>
        </form>
      </div>
      
      <!-- Modal Footer -->
      <div class="px-6 py-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 flex justify-end gap-3">
        <button @click="closeEditModal" class="px-6 py-2.5 rounded-lg font-bold text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
          Annuler
        </button>
        <button @click="handleUpdate" :disabled="isUpdating" class="px-6 py-2.5 rounded-lg bg-primary text-white font-bold text-sm hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all flex items-center gap-2 disabled:opacity-50">
          <span class="material-symbols-outlined text-sm">save</span>
          {{ isUpdating ? 'Enregistrement...' : 'Enregistrer' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import api from '@/services/api'

const users = ref([])
const isLoading = ref(false)
const searchQuery = ref('')
const selectedRole = ref('Tous')

// Pagination state
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Edit modal state
const showEditModal = ref(false)
const editForm = ref({
  _id: '',
  prenom: '',
  nom: '',
  email: '',
  telephone: '',
  role: '',
  status: '',
  classe: ''
})
const availableClasses = ref([])
const isUpdating = ref(false)
const editErrorMessage = ref('')

const fetchUsers = async () => {
  isLoading.value = true
  try {
    const response = await api.getUsers()
    users.value = Array.isArray(response.data.data) ? response.data.data : []
  } catch (error) {
    console.error('Erreur chargement utilisateurs:', error)
  } finally {
    isLoading.value = false
  }
}

const fetchClasses = async () => {
  try {
    const response = await api.getClasses()
    availableClasses.value = Array.isArray(response.data.data) ? response.data.data : []
  } catch (error) {
    console.error('Erreur chargement classes:', error)
  }
}

const filteredUsers = computed(() => {
  let filtered = Array.isArray(users.value) ? users.value : []
  
  if (selectedRole.value !== 'Tous') {
    filtered = filtered.filter(u => u?.role === selectedRole.value.toUpperCase())
  }
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(u => 
      u?.nom?.toLowerCase().includes(query) ||
      u?.prenom?.toLowerCase().includes(query) ||
      u?.email?.toLowerCase().includes(query)
    )
  }
  
  return filtered
})
const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredUsers.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredUsers.value.length / itemsPerPage.value)
})

const startItem = computed(() => {
  if (filteredUsers.value.length === 0) return 0
  return (currentPage.value - 1) * itemsPerPage.value + 1
})

const endItem = computed(() => {
  return Math.min(currentPage.value * itemsPerPage.value, filteredUsers.value.length)
})

const shouldShowPage = (page) => {
  return page === 1 || page === totalPages.value || (page >= currentPage.value - 1 && page <= currentPage.value + 1)
}

const shouldShowEllipsis = (page) => {
  return (page === 2 && currentPage.value > 3) || (page === totalPages.value - 1 && currentPage.value < totalPages.value - 2)
}

watch([searchQuery, selectedRole], () => {
  currentPage.value = 1
})

const getRoleBadgeClass = (role) => {
  const classes = {
    'PROFESSEUR': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    'ELEVE': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    'PARENT': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    'ADMIN': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    'CENSEUR': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
    'CPE': 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300',
    'PROVISEUR': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
    'SECRETAIRE': 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300'
  }
  return classes[role] || 'bg-gray-100 text-gray-800'
}

const getStatusColor = (status) => {
  const colors = {
    'ACTIF': 'bg-green-500',
    'INACTIF': 'bg-gray-500',
    'EN_ATTENTE': 'bg-yellow-500',
    'BLOQUE': 'bg-red-500'
  }
  return colors[status] || 'bg-gray-500'
}

const getInitials = (nom, prenom) => {
  return `${prenom?.charAt(0) || ''}${nom?.charAt(0) || ''}`.toUpperCase()
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
}

const openEditModal = (user) => {
  editForm.value = {
    _id: user._id,
    prenom: user.prenom,
    nom: user.nom,
    email: user.email,
     telephone: user.telephone || '',
    role: user.role,
    status: user.status,
    classe: user.classe?._id || user.classe || ''
  }
  editErrorMessage.value = ''
  showEditModal.value = true
}

const closeEditModal = () => {
  showEditModal.value = false
  editForm.value = {
    _id: '',
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    role: '',
    status: ''
  }
  editErrorMessage.value = ''
}

const handleUpdate = async () => {
  editErrorMessage.value = ''
  isUpdating.value = true
  
  try {
    const updateData = {
      prenom: editForm.value.prenom,
      nom: editForm.value.nom,
      email: editForm.value.email,
      telephone: editForm.value.telephone,
      role: editForm.value.role,
      status: editForm.value.status,
      classe: editForm.value.role === 'ELEVE' ? editForm.value.classe : undefined
    }
    
    await api.updateUser(editForm.value._id, updateData)
    await fetchUsers()
    closeEditModal()
  } catch (error) {
    console.error('Erreur mise à jour:', error)
    editErrorMessage.value = error.response?.data?.error || 'Erreur lors de la mise à jour de l\'utilisateur'
  } finally {
    isUpdating.value = false
  }
}

const toggleUserStatus = async (user) => {
  const newStatus = user.status === 'ACTIF' ? 'INACTIF' : 'ACTIF'
  const action = newStatus === 'ACTIF' ? 'activer' : 'désactiver'
  
  if (confirm(`Êtes-vous sûr de vouloir ${action} cet utilisateur ?`)) {
    try {
      await api.updateUser(user._id, { status: newStatus })
      await fetchUsers()
    } catch (error) {
      console.error('Erreur changement statut:', error)
      alert('Erreur lors du changement de statut')
    }
  }
}

const deleteUser = async (userId) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
    try {
      await api.deleteUser(userId)
      await fetchUsers()
    } catch (error) {
      console.error('Erreur suppression:', error)
      alert('Erreur lors de la suppression de l\'utilisateur')
    }
  }
}

onMounted(() => {
  fetchUsers()
  fetchClasses()
})
</script>
