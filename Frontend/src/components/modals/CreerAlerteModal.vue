<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay" @click="closeModal">
    <div class="bg-white dark:bg-slate-900 w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 dark:border-slate-800" @click.stop>
      <!-- Modal Header -->
      <div class="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
            <span class="material-symbols-outlined text-red-600 text-xl">notification_important</span>
          </div>
          <div>
            <h2 class="text-2xl font-bold text-slate-900 dark:text-white">Créer une Nouvelle Alerte</h2>
            <p class="text-slate-500 dark:text-slate-400">Envoyez une notification urgente à tous les enseignants</p>
          </div>
        </div>
        <button @click="closeModal" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
          <span class="material-symbols-outlined text-2xl">close</span>
        </button>
      </div>

      <!-- Scrollable Content -->
      <div class="flex-1 overflow-y-auto">
        <!-- Alert Type Selection -->
      <div class="p-6">
        <div class="mb-6">
          <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Type d'alerte</label>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button @click="alert.type = 'urgent'" :class="alert.type === 'urgent' ? 'ring-2 ring-red-500 bg-red-50 dark:bg-red-900/20' : 'bg-white dark:bg-slate-800'" class="p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-left transition-all">
              <div class="flex items-center gap-3 mb-2">
                <span class="material-symbols-outlined text-red-600">error</span>
                <span class="font-bold text-slate-900 dark:text-white">Urgent</span>
              </div>
              <p class="text-sm text-slate-500 dark:text-slate-400">Alerte critique nécessitant une action immédiate</p>
            </button>
            <button @click="alert.type = 'important'" :class="alert.type === 'important' ? 'ring-2 ring-amber-500 bg-amber-50 dark:bg-amber-900/20' : 'bg-white dark:bg-slate-800'" class="p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-left transition-all">
              <div class="flex items-center gap-3 mb-2">
                <span class="material-symbols-outlined text-amber-600">warning</span>
                <span class="font-bold text-slate-900 dark:text-white">Important</span>
              </div>
              <p class="text-sm text-slate-500 dark:text-slate-400">Information importante à prendre en compte</p>
            </button>
            <button @click="alert.type = 'info'" :class="alert.type === 'info' ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'bg-white dark:bg-slate-800'" class="p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-left transition-all">
              <div class="flex items-center gap-3 mb-2">
                <span class="material-symbols-outlined text-blue-600">info</span>
                <span class="font-bold text-slate-900 dark:text-white">Information</span>
              </div>
              <p class="text-sm text-slate-500 dark:text-slate-400">Information générale ou rappel</p>
            </button>
          </div>
        </div>

        <!-- Alert Content -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Titre de l'alerte</label>
            <input v-model="alert.titre" type="text" class="w-full h-12 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 text-sm focus:ring-primary focus:border-primary" placeholder="Ex: Réunion d'urgence">
          </div>
          <div>
            <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Destinataires (Types d'utilisateurs)</label>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
              <label v-for="role in availableRoles" :key="role.value" class="flex items-center gap-2 p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700">
                <input v-model="alert.selectedRoles" :value="role.value" type="checkbox" class="w-4 h-4 text-primary rounded border-slate-300 focus:ring-primary">
                <span class="text-sm font-medium text-slate-900 dark:text-white">{{ role.label }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class="mt-6">
          <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Message détaillé</label>
          <textarea v-model="alert.message" rows="4" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-sm focus:ring-primary focus:border-primary resize-none" placeholder="Décrivez en détail l'alerte et les actions requises..."></textarea>
        </div>

        <!-- Additional Options -->
        <div class="mt-6 space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h4 class="font-bold text-slate-900 dark:text-white">Options de notification</h4>
              <p class="text-sm text-slate-500 dark:text-slate-400">Choisissez comment les enseignants seront notifiés</p>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label class="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700">
              <input v-model="alert.notifications.email" type="checkbox" class="w-5 h-5 text-primary rounded border-slate-300 focus:ring-primary">
              <div>
                <p class="font-medium text-slate-900 dark:text-white">Email</p>
                <p class="text-xs text-slate-500">Notification par email</p>
              </div>
            </label>
            <label class="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700">
              <input v-model="alert.notifications.sms" type="checkbox" class="w-5 h-5 text-primary rounded border-slate-300 focus:ring-primary">
              <div>
                <p class="font-medium text-slate-900 dark:text-white">SMS</p>
                <p class="text-xs text-slate-500">Alerte par SMS</p>
              </div>
            </label>
            <label class="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700">
              <input v-model="alert.notifications.push" type="checkbox" class="w-5 h-5 text-primary rounded border-slate-300 focus:ring-primary">
              <div>
                <p class="font-medium text-slate-900 dark:text-white">Push</p>
                <p class="text-xs text-slate-500">Notification push</p>
              </div>
            </label>
          </div>
        </div>

        <!-- Schedule Options -->
        <div class="mt-6">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h4 class="font-bold text-slate-900 dark:text-white">Programmation</h4>
              <p class="text-sm text-slate-500 dark:text-slate-400">Quand envoyer cette alerte ?</p>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label class="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700">
              <input v-model="alert.schedule" value="immediate" type="radio" name="schedule" class="w-5 h-5 text-primary border-slate-300 focus:ring-primary">
              <div>
                <p class="font-medium text-slate-900 dark:text-white">Immédiat</p>
                <p class="text-xs text-slate-500">Envoyer maintenant</p>
              </div>
            </label>
            <label class="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700">
              <input v-model="alert.schedule" value="scheduled" type="radio" name="schedule" class="w-5 h-5 text-primary border-slate-300 focus:ring-primary">
              <div>
                <p class="font-medium text-slate-900 dark:text-white">Programmé</p>
                <p class="text-xs text-slate-500">Envoyer plus tard</p>
              </div>
            </label>
          </div>
          <div v-if="alert.schedule === 'scheduled'" class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <input v-model="alert.scheduledDate" type="date" class="h-12 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 text-sm focus:ring-primary focus:border-primary">
            <input v-model="alert.scheduledTime" type="time" class="h-12 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 text-sm focus:ring-primary focus:border-primary">
          </div>
        </div>
      </div>
      </div>

      <!-- Preview Section -->
      <div class="bg-slate-50 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 p-6">
        <h4 class="font-bold text-slate-900 dark:text-white mb-4">Aperçu de l'alerte</h4>
        <div class="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <div class="flex items-start gap-3">
            <div class="w-10 h-10 rounded-full flex items-center justify-center" :class="getAlertIconClass(alert.type)">
              <span class="material-symbols-outlined text-white">{{ getAlertIcon(alert.type) }}</span>
            </div>
            <div class="flex-1">
              <h5 class="font-bold text-slate-900 dark:text-white">{{ alert.titre || 'Titre de l\'alerte' }}</h5>
              <p class="text-sm text-slate-600 dark:text-slate-400 mt-1">{{ alert.message || 'Message de l\'alerte...' }}</p>
              <div class="flex items-center gap-4 mt-3 text-xs text-slate-500">
                <span>Destinataires: {{ getSelectedRolesText() }}</span>
                <span>•</span>
                <span>Envoyée: {{ alert.schedule === 'immediate' ? 'Immédiatement' : 'Programmée' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Footer -->
      <div class="flex justify-end gap-3 p-6 border-t border-slate-100 dark:border-slate-800">
        <button @click="closeModal" class="px-6 py-3 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
          Annuler
        </button>
        <button @click="saveAlert" class="px-6 py-3 bg-slate-900 dark:bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors">
          Enregistrer comme brouillon
        </button>
        <button @click="sendAlert" class="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
          <span class="material-symbols-outlined mr-2">send</span>
          Envoyer l'alerte
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '@/services/api'

const isOpen = ref(false)

const availableRoles = [
  { value: 'PROFESSEUR', label: 'Professeurs' },
  { value: 'ELEVE', label: 'Élèves' },
  { value: 'CPE', label: 'CPE' },
  { value: 'CENSEUR', label: 'Censeur' },
  { value: 'SECRETAIRE', label: 'Secrétaire' },
  { value: 'PROVISEUR', label: 'Proviseur' }
]

const alert = ref({
  type: 'urgent',
  titre: '',
  selectedRoles: [],
  message: '',
  notifications: {
    email: true,
    sms: false,
    push: true
  },
  schedule: 'immediate',
  scheduledDate: '',
  scheduledTime: ''
})

const openModal = () => {
  isOpen.value = true
}

const closeModal = () => {
  isOpen.value = false
}

const saveAlert = () => {
  console.log('Alerte enregistrée comme brouillon:', alert.value)
  closeModal()
}

const sendAlert = async () => {
  try {
    if (!alert.value.titre || !alert.value.message) {
      alert('Veuillez remplir le titre et le message')
      return
    }
    
    if (alert.value.selectedRoles.length === 0) {
      alert('Veuillez sélectionner au moins un type d\'utilisateur')
      return
    }
    
    const channels = []
    if (alert.value.notifications.email) channels.push('email')
    if (alert.value.notifications.sms) channels.push('sms')
    if (alert.value.notifications.push) channels.push('push')
    
    await api.sendNotification({
      subject: alert.value.titre,
      content: alert.value.message,
      type: 'role',
      targetRoles: alert.value.selectedRoles,
      channels
    })
    
    alert('Alerte envoyée avec succès!')
    
    // Reset form
    alert.value = {
      type: 'urgent',
      titre: '',
      selectedRoles: [],
      message: '',
      notifications: {
        email: true,
        sms: false,
        push: true
      },
      schedule: 'immediate',
      scheduledDate: '',
      scheduledTime: ''
    }
    
    closeModal()
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'alerte:', error)
    alert('Erreur lors de l\'envoi: ' + (error.response?.data?.error || error.message))
  }
}

const getSelectedRolesText = () => {
  if (alert.value.selectedRoles.length === 0) return 'Aucun'
  if (alert.value.selectedRoles.length === availableRoles.length) return 'Tous'
  return alert.value.selectedRoles.map(r => {
    const role = availableRoles.find(ar => ar.value === r)
    return role ? role.label : r
  }).join(', ')
}

const getAlertIcon = (type) => {
  switch(type) {
    case 'urgent': return 'error'
    case 'important': return 'warning'
    case 'info': return 'info'
    default: return 'notifications'
  }
}

const getAlertIconClass = (type) => {
  switch(type) {
    case 'urgent': return 'bg-red-600'
    case 'important': return 'bg-amber-600'
    case 'info': return 'bg-blue-600'
    default: return 'bg-slate-600'
  }
}

defineExpose({
  openModal,
  closeModal
})
</script>
