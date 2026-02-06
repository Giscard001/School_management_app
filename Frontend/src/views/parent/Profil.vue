<template>
  <div v-if="user" class="min-h-screen bg-slate-50 dark:bg-slate-900 p-4 md:p-8">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div class="flex items-center gap-6">
          <div class="relative group">
            <div class="w-24 h-24 rounded-2xl bg-slate-200 dark:bg-slate-800 border-4 border-white dark:border-slate-900 shadow-xl overflow-hidden flex items-center justify-center">
              <span v-if="!user.photo || user.photo === 'no-photo.jpg'" class="material-symbols-outlined text-4xl text-slate-400">person</span>
              <img v-else :src="user.photo" class="w-full h-full object-cover"/>
              <input type="file" ref="fileInput" class="hidden" @change="handlePhotoUpload" accept="image/*" />
              <div @click="$refs.fileInput.click()" class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                <span class="material-symbols-outlined text-white">photo_camera</span>
              </div>
            </div>
            <div class="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-green-500 border-4 border-white dark:border-slate-900"></div>
          </div>
          <div>
            <h1 class="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">{{ user.prenom }} {{ user.nom }}</h1>
            <p class="text-slate-500 font-medium">Parent d'élève • {{ user.role }}</p>
            <div class="flex items-center gap-3 mt-2">
              <span class="px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-lg tracking-wider uppercase">ID: {{ user._id.substring(0,8).toUpperCase() }}</span>
              <span class="text-slate-400 text-[10px] font-bold uppercase italic">Membre depuis Sept. 2023</span>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <button @click="handleUpdateDetails" :disabled="isUpdating" class="flex-1 md:flex-none px-6 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2">
            <span class="material-symbols-outlined text-sm" v-if="isUpdating">sync</span>
            {{ isUpdating ? 'Enregistrement...' : 'Enregistrer' }}
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- Left: Details -->
        <div class="lg:col-span-8 space-y-8">
          <!-- Personal Info -->
          <div class="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-100 dark:border-slate-800 shadow-sm">
            <div class="flex items-center gap-3 mb-8">
              <div class="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                <span class="material-symbols-outlined text-blue-500">contact_page</span>
              </div>
              <h2 class="text-xl font-bold">Informations Personnelles</h2>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="text-sm font-bold text-slate-500 ml-1">Prénom</label>
                <input v-model="user.prenom" type="text" class="w-full px-4 py-3 rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"/>
              </div>
              <div class="space-y-2">
                <label class="text-sm font-bold text-slate-500 ml-1">Nom</label>
                <input v-model="user.nom" type="text" class="w-full px-4 py-3 rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"/>
              </div>
              <div class="space-y-2">
                <label class="text-sm font-bold text-slate-500 ml-1">E-mail</label>
                <input v-model="user.email" disabled type="email" class="w-full px-4 py-3 rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 cursor-not-allowed text-slate-400 font-medium"/>
              </div>
              <div class="space-y-2">
                <label class="text-sm font-bold text-slate-500 ml-1">Téléphone</label>
                <input v-model="user.telephone" type="tel" class="w-full px-4 py-3 rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"/>
              </div>
            </div>
          </div>

          <!-- Notification Preferences -->
          <div class="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-100 dark:border-slate-800 shadow-sm">
            <div class="flex items-center gap-3 mb-8">
              <div class="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center">
                <span class="material-symbols-outlined text-purple-500">notifications_active</span>
              </div>
              <h2 class="text-xl font-bold">Préférences de Notification</h2>
            </div>

            <div class="space-y-4">
              <div v-for="pref in notificationPreferences" :key="pref.id" class="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 gap-4">
                <div>
                  <h3 class="font-bold text-slate-900 dark:text-white">{{ pref.title }}</h3>
                  <p class="text-sm text-slate-500">{{ pref.description }}</p>
                </div>
                <div class="flex items-center gap-4">
                  <div class="flex items-center gap-2">
                    <span class="text-xs font-bold text-slate-400">SMS</span>
                    <button @click="toggleNotification(pref.id, 'sms')" :class="pref.sms ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-700'" class="w-10 h-6 rounded-full relative transition-colors">
                      <div :class="pref.sms ? 'translate-x-5' : 'translate-x-1'" class="absolute top-1 w-4 h-4 bg-white rounded-full transition-transform"></div>
                    </button>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-xs font-bold text-slate-400">E-mail</span>
                    <button @click="toggleNotification(pref.id, 'email')" :class="pref.email ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-700'" class="w-10 h-6 rounded-full relative transition-colors">
                      <div :class="pref.email ? 'translate-x-5' : 'translate-x-1'" class="absolute top-1 w-4 h-4 bg-white rounded-full transition-transform"></div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Login History -->
          <div class="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-100 dark:border-slate-800 shadow-sm">
            <div class="flex items-center gap-3 mb-8">
              <div class="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center">
                <span class="material-symbols-outlined text-orange-500">history</span>
              </div>
              <h2 class="text-xl font-bold">Dernières connexions</h2>
            </div>

            <div class="space-y-4">
              <div v-for="(login, index) in (user?.lastLogins || [])" :key="index" class="flex items-center justify-between p-4 rounded-xl border border-slate-50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <div class="flex items-center gap-4">
                  <div class="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    <span class="material-symbols-outlined text-slate-500">
                      {{ getDeviceIcon(login.userAgent) }}
                    </span>
                  </div>
                  <div>
                    <p class="font-bold text-sm">{{ parseUserAgent(login.userAgent) }}</p>
                    <p class="text-xs text-slate-500">{{ formatDate(login.date) }}</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-xs font-mono text-slate-400">{{ login.ip }}</p>
                  <span v-if="index === 0" class="text-[9px] font-black text-green-500 uppercase tracking-widest bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded">Session actuelle</span>
                </div>
              </div>
              <div v-if="!(user.lastLogins && user.lastLogins.length)" class="text-center py-6 text-sm italic text-slate-500">
                Aucun historique disponible
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Security & Family -->
        <div class="lg:col-span-4 space-y-8">
          <!-- Security -->
          <div class="bg-slate-900 dark:bg-primary/10 rounded-3xl p-6 text-white border border-slate-800">
            <div class="flex items-center gap-3 mb-6">
              <span class="material-symbols-outlined text-primary">security</span>
              <h2 class="text-lg font-bold">Sécurité</h2>
            </div>

            <div class="space-y-4">
              <div class="space-y-1">
                <label class="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Ancien mot de passe</label>
                <input v-model="securityData.currentPassword" type="password" class="w-full bg-white/10 border-0 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary"/>
              </div>
              <div class="space-y-1">
                <label class="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Nouveau mot de passe</label>
                <input v-model="securityData.newPassword" type="password" class="w-full bg-white/10 border-0 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary"/>
              </div>
              <div class="space-y-1">
                <label class="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Confirmer</label>
                <input v-model="securityData.confirmPassword" type="password" class="w-full bg-white/10 border-0 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary"/>
              </div>
              <div v-if="passwordError" class="text-red-400 text-[10px] italic">{{ passwordError }}</div>
              <button @click="handleUpdatePassword" :disabled="isUpdatingPassword" class="w-full py-4 bg-primary text-white font-black rounded-xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 disabled:opacity-50">
                {{ isUpdatingPassword ? 'En cours...' : 'Changer le mot de passe' }}
              </button>
            </div>
          </div>

          <!-- Family -->
          <div class="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm">
            <h2 class="text-lg font-bold mb-6">Enfants rattachés</h2>
            <div class="space-y-4">
              <div v-for="child in children" :key="child.id" class="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer group">
                <div class="flex items-center gap-3">
                  <div :class="child.avatarColor" class="w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg">
                    {{ child.initials }}
                  </div>
                  <div>
                    <h3 class="font-bold text-sm">{{ child.name }}</h3>
                    <p class="text-xs text-slate-500">{{ child.class }}</p>
                  </div>
                </div>
                <span class="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">chevron_right</span>
              </div>
              <button class="w-full py-3 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-slate-400 text-xs font-bold hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2">
                <span class="material-symbols-outlined text-sm">add_circle</span>
                Rattacher un autre enfant
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/services/api'

// Données réactives
const user = ref(null);
const isUpdating = ref(false);
const isUpdatingPassword = ref(false);
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

const securityData = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
});

const fetchData = async () => {
    try {
        const res = await api.getMe();
        if (res.data.success) {
            user.value = res.data.data;
        }
    } catch (error) {
        console.error('Erreur chargement profil parent:', error);
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
    if (securityData.value.newPassword !== securityData.value.confirmPassword) {
        passwordError.value = 'Les mots de passe ne correspondent pas';
        return;
    }
    if (securityData.value.newPassword.length < 6) {
        passwordError.value = 'Minimum 6 caractères';
        return;
    }

    passwordError.value = '';
    isUpdatingPassword.value = true;
    try {
        const res = await api.updatePassword({
            currentPassword: securityData.value.currentPassword,
            newPassword: securityData.value.newPassword
        });
        if (res.data.success) {
            alert('Mot de passe mis à jour !');
            securityData.value = { currentPassword: '', newPassword: '', confirmPassword: '' };
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

// Préférences de notification
const notificationPreferences = ref([
  {
    id: 1,
    title: 'Absences et Retards',
    description: 'Notifications instantanées pour votre enfant',
    sms: true,
    email: true
  },
  {
    id: 2,
    title: 'Résultats Scolaires',
    description: 'Publication de notes et rapports',
    sms: false,
    email: true
  },
  {
    id: 3,
    title: 'Événements & Vie Scolaire',
    description: 'Réunions, fêtes et sorties scolaires',
    sms: false,
    email: true
  }
])

const toggleNotification = (prefId, type) => {
  const pref = notificationPreferences.value.find(p => p.id === prefId)
  if (pref) {
    pref[type] = !pref[type]
  }
}

// Enfants rattachés
const children = ref([
  {
    id: 1,
    name: 'Lucas Dupont',
    class: '4ème B',
    initials: 'LD',
    avatarColor: 'bg-blue-100 dark:bg-blue-900/30 text-primary'
  },
  {
    id: 2,
    name: 'Sophie Dupont',
    class: 'CM2',
    initials: 'SD',
    avatarColor: 'bg-pink-100 dark:bg-pink-900/30 text-pink-600'
  }
])

onMounted(() => {
    fetchData();
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
});
</script>
