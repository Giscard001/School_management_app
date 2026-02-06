<template>
  <div class="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased p-8">
    <div v-if="user" class="max-w-4xl mx-auto">
      <!-- Header Card -->
      <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 mb-8 relative overflow-hidden">
        <div class="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32"></div>
        <div class="flex flex-col md:flex-row items-center gap-8 relative z-10">
          <div class="relative">
            <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-32 border-4 border-white dark:border-slate-900 shadow-xl flex items-center justify-center bg-slate-200 dark:bg-slate-700">
              <span v-if="!user.photo || user.photo === 'no-photo.jpg'" class="material-symbols-outlined text-5xl text-slate-400">person</span>
              <img v-else :src="user.photo" class="w-full h-full object-cover rounded-full"/>
            </div>
            <input type="file" ref="fileInput" class="hidden" @change="handlePhotoUpload" accept="image/*" />
            <button @click="$refs.fileInput.click()" class="absolute bottom-1 right-1 bg-primary border-2 border-white dark:border-slate-900 size-8 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform cursor-pointer">
              <span class="material-symbols-outlined text-sm">photo_camera</span>
            </button>
          </div>
          <div class="flex-1 text-center md:text-left">
            <div class="flex flex-col md:flex-row md:items-end gap-2 mb-2">
              <h2 class="text-2xl font-bold text-slate-900 dark:text-white">{{ user.prenom }} {{ user.nom }}</h2>
              <span class="text-primary font-medium text-sm pb-1">@{{ user.email.split('@')[0] }}</span>
            </div>
            <div class="flex flex-wrap justify-center md:justify-start gap-4 text-slate-500 dark:text-slate-400 text-sm">
              <div class="flex items-center gap-1">
                <span class="material-symbols-outlined text-sm">school</span>
                <span>Role: {{ user.role }}</span>
              </div>
              <div class="flex items-center gap-1">
                <span class="material-symbols-outlined text-sm">badge</span>
                <span>Matricule: {{ user._id.substring(0,8).toUpperCase() }}</span>
              </div>
            </div>
          </div>
          <div class="flex flex-col sm:flex-row gap-3">
            <button @click="handleUpdateDetails" :disabled="isUpdating" class="bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-blue-600 transition-colors flex items-center gap-2 disabled:opacity-50">
              <span class="material-symbols-outlined text-lg" v-if="!isUpdating">save</span>
              <span class="material-symbols-outlined text-lg animate-spin" v-else>sync</span>
              {{ isUpdating ? 'Enregistrement...' : 'Enregistrer' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Content Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Left Column: Detailed Info -->
        <div class="md:col-span-2 space-y-8">
          <!-- Personal Info Section -->
          <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div class="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span class="material-symbols-outlined text-primary">person</span>
                Informations Personnelles
              </h3>
            </div>
            <div class="p-6 grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
              <div class="space-y-1">
                <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Nom</p>
                <input v-model="user.nom" class="text-sm font-medium w-full text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-2 py-2">
              </div>
              <div class="space-y-1">
                <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Prénom</p>
                <input v-model="user.prenom" class="text-sm font-medium w-full text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-2 py-2">
              </div>
              <div class="space-y-1">
                <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email</p>
                <input v-model="user.email" :disabled="true" class="text-sm font-medium w-full text-slate-500 bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded px-2 py-2 cursor-not-allowed">
              </div>
              <div class="space-y-1">
                <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Téléphone</p>
                <input v-model="user.telephone" class="text-sm font-medium w-full text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-2 py-2">
              </div>
            </div>
            <div class="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button @click="handleUpdateDetails" :disabled="isUpdating" class="px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50">
                {{ isUpdating ? 'Mise à jour...' : 'Sauvegarder' }}
              </button>
            </div>
          </div>

          <!-- Parental Info Section -->
          <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div class="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span class="material-symbols-outlined text-primary">family_restroom</span>
                Informations Parentales
              </h3>
              <button @click="toggleEditParentalInfo" class="text-primary text-sm font-medium hover:underline">
                {{ isEditingParentalInfo ? 'Annuler' : 'Modifier' }}
              </button>
            </div>
            <div class="p-6 grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
              <div class="space-y-1">
                <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tuteur Légal</p>
                <input v-if="isEditingParentalInfo" v-model="parentalInfo.legalGuardian" type="text" class="text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-2 py-1 w-full">
                <p v-else class="text-sm font-medium text-slate-700 dark:text-slate-200">{{ parentalInfo.legalGuardian }}</p>
              </div>
              <div class="space-y-1">
                <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Relation</p>
                <select v-if="isEditingParentalInfo" v-model="parentalInfo.relationship" class="text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-2 py-1">
                  <option value="Mère">Mère</option>
                  <option value="Père">Père</option>
                  <option value="Tuteur">Tuteur</option>
                  <option value="Autre">Autre</option>
                </select>
                <p v-else class="text-sm font-medium text-slate-700 dark:text-slate-200">{{ parentalInfo.relationship }}</p>
              </div>
              <div class="space-y-1">
                <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Contact d'urgence</p>
                <input v-if="isEditingParentalInfo" v-model="parentalInfo.emergencyContact" type="tel" class="text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-2 py-1">
                <p v-else class="text-sm font-medium text-slate-700 dark:text-slate-200">{{ parentalInfo.emergencyContact }}</p>
              </div>
              <div class="space-y-1">
                <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Parent</p>
                <input v-if="isEditingParentalInfo" v-model="parentalInfo.parentEmail" type="email" class="text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-2 py-1 w-full">
                <p v-else class="text-sm font-medium text-slate-700 dark:text-slate-200">{{ parentalInfo.parentEmail }}</p>
              </div>
            </div>
            <div v-if="isEditingParentalInfo" class="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
              <button @click="cancelEditParentalInfo" class="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                Annuler
              </button>
              <button @click="saveParentalInfo" class="px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors">
                Enregistrer
              </button>
            </div>
          </div>
        </div>

        <!-- Right Column: Status & Security -->
        <div class="space-y-8">
          <!-- Academic Status -->
          <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
            <h3 class="text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">Statut Académique</h3>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span class="text-sm text-slate-500 dark:text-slate-400">Année scolaire</span>
                <span class="text-sm font-bold text-slate-700 dark:text-slate-200">2023-2024</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-slate-500 dark:text-slate-400">Statut</span>
                <span class="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] font-bold rounded uppercase">Actif</span>
              </div>
              <div class="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden mt-4">
                <div class="bg-primary h-full w-[75%]" title="Assiduité: 75%"></div>
              </div>
              <p class="text-[10px] text-slate-400 text-center">Assiduité globale: 75%</p>
            </div>
          </div>

          <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
            <h3 class="text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">Sécurité</h3>
            <div class="flex flex-col gap-3">
              <button @click="showPasswordModal = true" class="flex items-center justify-between w-full p-3 rounded-lg border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-left">
                <div class="flex items-center gap-3">
                  <span class="material-symbols-outlined text-slate-400">lock</span>
                  <span class="text-sm font-medium text-slate-700 dark:text-slate-200">Mot de passe</span>
                </div>
                <span class="material-symbols-outlined text-slate-300 text-sm">chevron_right</span>
              </button>
              
              <!-- Modal Password Student -->
              <div v-if="showPasswordModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                <div class="bg-white dark:bg-slate-950 rounded-2xl w-full max-w-md shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                  <div class="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
                    <h3 class="font-bold text-lg">Sécuriser mon compte</h3>
                    <button @click="showPasswordModal = false" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                      <span class="material-symbols-outlined">close</span>
                    </button>
                  </div>
                  <div class="p-6 space-y-4">
                    <div class="space-y-2">
                      <label class="text-sm font-semibold">Ancien mot de passe</label>
                      <input v-model="passwords.current" type="password" class="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-900 h-11 px-4 text-sm" placeholder="••••••••"/>
                    </div>
                    <div class="space-y-2">
                      <label class="text-sm font-semibold">Nouveau</label>
                      <input v-model="passwords.new" type="password" class="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-900 h-11 px-4 text-sm" placeholder="••••••••"/>
                    </div>
                    <div v-if="passwordError" class="text-red-500 text-[10px] font-medium bg-red-50 dark:bg-red-900/20 p-2 rounded">
                      {{ passwordError }}
                    </div>
                  </div>
                  <div class="px-6 py-4 bg-slate-50 dark:bg-slate-900/50 flex justify-end gap-3">
                    <button @click="handleUpdatePassword" :disabled="isUpdatingPassword" class="w-full py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 disabled:opacity-50">
                      {{ isUpdatingPassword ? 'En cours...' : 'Mettre à jour mon accès' }}
                    </button>
                  </div>
                </div>
              </div>

              <button class="flex items-center justify-between w-full p-3 rounded-lg border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-left">
                <div class="flex items-center gap-3">
                  <span class="material-symbols-outlined text-slate-400">notifications</span>
                  <span class="text-sm font-medium text-slate-700 dark:text-slate-200">Notifications</span>
                </div>
                <span class="material-symbols-outlined text-slate-300 text-sm">chevron_right</span>
              </button>
            </div>
          </div>

          <!-- Login History Section -->
          <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
            <h3 class="text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">Dernières connexions</h3>
            <div class="space-y-4">
              <div v-for="(login, index) in (user?.lastLogins || [])" :key="index" class="flex items-center justify-between pb-3 border-b border-slate-50 dark:border-slate-800 last:border-0 last:pb-0">
                <div class="flex items-center gap-3">
                  <div class="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <span class="material-symbols-outlined text-slate-400 text-sm">
                      {{ getDeviceIcon(login.userAgent) }}
                    </span>
                  </div>
                  <div>
                    <p class="text-[12px] font-bold">{{ parseUserAgent(login.userAgent) }}</p>
                    <p class="text-[10px] text-slate-500">{{ formatDate(login.date) }}</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-[10px] font-mono text-slate-400">{{ login.ip }}</p>
                  <span v-if="index === 0" class="text-[9px] text-green-500 font-bold uppercase">En cours</span>
                </div>
              </div>
              <div v-if="!(user.lastLogins && user.lastLogins.length)" class="text-center py-4 text-[11px] italic text-slate-500">
                Aucun historique disponible
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '@/services/api';

const user = ref(null);
const isUpdating = ref(false);
const isUpdatingPassword = ref(false);
const showPasswordModal = ref(false);
const passwordError = ref('');
const fileInput = ref(null);

const handlePhotoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
        alert('L\'image est trop volumineuse (max 2Mo)');
        return;
    }

    const formData = new FormData();
    formData.append('photo', file);

    try {
        const res = await api.uploadPhoto(formData);
        if (res.data.success) {
            user.value.photo = res.data.data;
            alert('Photo de profil mise à jour !');
        }
    } catch (error) {
        console.error('Erreur upload photo:', error);
        alert('Erreur lors de l\'envoi de la photo');
    }
};

const passwords = ref({
    current: '',
    new: ''
});

const isEditingParentalInfo = ref(false);
const parentalInfo = ref({
    legalGuardian: 'Non renseigné',
    relationship: 'Tuteur',
    emergencyContact: 'Non renseigné',
    parentEmail: 'Non renseigné'
});

const toggleEditParentalInfo = () => {
    isEditingParentalInfo.value = !isEditingParentalInfo.value;
};

const cancelEditParentalInfo = () => {
    isEditingParentalInfo.value = false;
};

const saveParentalInfo = async () => {
    // Here we would typically call an API
    // For now we just close the editing state
    isEditingParentalInfo.value = false;
    alert('Informations parentales mises à jour !');
};

const fetchData = async () => {
    try {
        const res = await api.getMe();
        if (res.data.success) {
            user.value = res.data.data;
        }
    } catch (error) {
        console.error('Erreur chargement profil élève:', error);
    }
};

const handleUpdateDetails = async () => {
    isUpdating.value = true;
    try {
        const res = await api.updateDetails({
            nom: user.value.nom,
            prenom: user.value.prenom,
            telephone: user.value.telephone
        });
        if (res.data.success) {
            alert('Profil mis à jour !');
        }
    } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de la mise à jour');
    } finally {
        isUpdating.value = false;
    }
};

const handleUpdatePassword = async () => {
    if (passwords.value.new.length < 6) {
        passwordError.value = 'Le mot de passe doit faire au moins 6 caractères';
        return;
    }

    passwordError.value = '';
    isUpdatingPassword.value = true;
    try {
        const res = await api.updatePassword({
            currentPassword: passwords.value.current,
            newPassword: passwords.value.new
        });
        if (res.data.success) {
            alert('Mot de passe sécurisé !');
            showPasswordModal.value = false;
            passwords.value = { current: '', new: '' };
        }
    } catch (error) {
        passwordError.value = error.response?.data?.error || 'Erreur technique';
    } finally {
        isUpdatingPassword.value = false;
    }
};

const formatDate = (dateStr) => {
    if (!dateStr) return '--';
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('fr-FR', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
};

const getDeviceIcon = (ua) => {
    if (!ua) return 'desktop_windows';
    if (/mobile/i.test(ua)) return 'smartphone';
    if (/tablet/i.test(ua)) return 'tablet_mac';
    return 'desktop_windows';
};

const parseUserAgent = (ua) => {
    if (!ua) return 'Navigateur inconnu';
    if (ua.includes('Chrome')) return 'Chrome on ' + (ua.includes('Windows') ? 'Windows' : 'OS');
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('Safari')) return 'Safari';
    if (ua.includes('Edge')) return 'Edge';
    return 'Navigateur Web';
};

onMounted(() => {
    fetchData();
  // Add Material Symbols font
  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);

  // Add Lexend font
  const lexendLink = document.createElement('link');
  lexendLink.href = 'https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&display=swap';
  lexendLink.rel = 'stylesheet';
  document.head.appendChild(lexendLink);

  // Add custom styles
  const style = document.createElement('style');
  style.textContent = `
    body {
      font-family: 'Lexend', sans-serif;
    }
    .material-symbols-outlined {
      font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    }
  `;
  document.head.appendChild(style);
});
</script>
