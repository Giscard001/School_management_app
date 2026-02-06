<template>
  <div class="min-h-screen bg-background-light dark:bg-background-dark p-8">
    <div class="max-w-[1200px] mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-black text-[#0e141b] dark:text-white mb-2">Mes Bulletins</h1>
        <p class="text-[#4e7397] dark:text-slate-400">Consultez vos bulletins scolaires et suivez votre progression</p>
      </div>

      <!-- Loading -->
      <div v-if="isLoading" class="bg-white dark:bg-slate-900 rounded-xl p-12 text-center border border-slate-200 dark:border-slate-800">
        <p class="text-[#4e7397]">Chargement de vos bulletins...</p>
      </div>

      <!-- Bulletins -->
      <div v-else-if="bulletins.length > 0" class="space-y-6">
        <div v-for="bulletin in bulletins" :key="bulletin._id" class="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div class="p-6 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-primary/5 to-transparent">
            <div class="flex justify-between items-start">
              <div>
                <h2 class="text-2xl font-bold text-[#0e141b] dark:text-white">{{ bulletin.periode }}</h2>
                <p class="text-sm text-[#4e7397] mt-1">{{ bulletin.classe?.niveau }} {{ bulletin.classe?.section }} - {{ bulletin.anneeScolaire }}</p>
              </div>
              <div class="text-right">
                <div class="text-4xl font-black text-primary">{{ bulletin.moyenneGenerale?.toFixed(2) }}</div>
                <p class="text-xs text-[#4e7397] mt-1">Moyenne générale</p>
              </div>
            </div>
          </div>

          <div class="p-6">
            <!-- Stats -->
            <div class="grid grid-cols-3 gap-4 mb-6">
              <div class="text-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <p class="text-2xl font-bold text-[#0e141b] dark:text-white">{{ bulletin.rang }}</p>
                <p class="text-xs text-[#4e7397] mt-1">Rang</p>
              </div>
              <div class="text-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <p class="text-2xl font-bold text-[#0e141b] dark:text-white">{{ bulletin.effectif }}</p>
                <p class="text-xs text-[#4e7397] mt-1">Effectif</p>
              </div>
              <div class="text-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <p class="text-2xl font-bold" :class="getDecisionClass(bulletin.decision)">{{ bulletin.decision || 'En cours' }}</p>
                <p class="text-xs text-[#4e7397] mt-1">Décision</p>
              </div>
            </div>

            <!-- Notes par matière -->
            <div class="mb-6">
              <h3 class="text-lg font-bold text-[#0e141b] dark:text-white mb-4">Détails par matière</h3>
              <div class="space-y-2">
                <div v-for="note in bulletin.notes" :key="note._id" class="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                  <div class="flex-1">
                    <p class="font-medium text-[#0e141b] dark:text-white">{{ note.matiere?.nom }}</p>
                    <p class="text-xs text-[#4e7397]">Coef. {{ note.matiere?.coefficient || 1 }}</p>
                  </div>
                  <div class="text-right">
                    <p class="text-xl font-bold text-primary">{{ note.moyenne?.toFixed(2) }}</p>
                    <p class="text-xs text-[#4e7397]">/20</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Appréciation -->
            <div v-if="bulletin.appreciationGenerale" class="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg mb-4">
              <p class="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">Appréciation générale</p>
              <p class="text-sm text-blue-700 dark:text-blue-300">{{ bulletin.appreciationGenerale }}</p>
            </div>

            <!-- Actions -->
            <div class="flex gap-3">
              <button 
                @click="viewDetails(bulletin)" 
                class="flex-1 px-4 py-2 bg-slate-200 dark:bg-slate-700 text-[#0e141b] dark:text-white rounded-lg font-medium hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors flex items-center justify-center gap-2"
              >
                <span class="material-symbols-outlined">visibility</span>
                Voir détails
              </button>
              <button 
                v-if="bulletin.statut === 'FINALISE' || bulletin.statut === 'DISTRIBUE'"
                @click="downloadPDF(bulletin._id)" 
                class="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                <span class="material-symbols-outlined">download</span>
                Télécharger PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Aucun bulletin -->
      <div v-else class="bg-white dark:bg-slate-900 rounded-xl p-12 text-center border border-slate-200 dark:border-slate-800">
        <span class="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-700 mb-4">description</span>
        <p class="text-[#4e7397] text-lg">Aucun bulletin disponible pour le moment</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '@/services/api';

const bulletins = ref([]);
const isLoading = ref(true);
const currentUser = ref(null);

const loadBulletins = async () => {
  isLoading.value = true;
  try {
    // Récupérer l'utilisateur connecté
    const userRes = await api.getMe();
    currentUser.value = userRes.data.data;

    // Charger les bulletins
    const res = await api.getBulletinsByEleve(currentUser.value._id);
    if (res.data.success) {
      bulletins.value = res.data.data;
    }
  } catch (error) {
    console.error('Erreur chargement bulletins:', error);
  } finally {
    isLoading.value = false;
  }
};

const viewDetails = (bulletin) => {
  let details = `
═══════════════════════════════════════
        BULLETIN SCOLAIRE
═══════════════════════════════════════

Élève: ${currentUser.value?.prenom} ${currentUser.value?.nom}
Matricule: ${currentUser.value?.matricule}
Classe: ${bulletin.classe?.niveau} ${bulletin.classe?.section}
Période: ${bulletin.periode}
Année scolaire: ${bulletin.anneeScolaire}

───────────────────────────────────────
           RÉSULTATS
───────────────────────────────────────

`;

  bulletin.notes.forEach(note => {
    details += `${note.matiere?.nom.padEnd(20)} : ${note.moyenne?.toFixed(2).padStart(5)}/20 (Coef. ${note.matiere?.coefficient || 1})\n`;
  });

  details += `
───────────────────────────────────────
Moyenne Générale: ${bulletin.moyenneGenerale?.toFixed(2)}/20
Total Points: ${bulletin.totalPoints?.toFixed(2)}
Total Coefficients: ${bulletin.totalCoefficients}

Rang: ${bulletin.rang}/${bulletin.effectif}
Décision: ${bulletin.decision || 'En cours'}

${bulletin.appreciationGenerale ? `\nAppréciation générale:\n${bulletin.appreciationGenerale}` : ''}

Date de génération: ${new Date(bulletin.dateGeneration).toLocaleDateString()}
═══════════════════════════════════════
  `;

  alert(details);
};

const downloadPDF = async (bulletinId) => {
  try {
    const res = await api.downloadBulletinPDF(bulletinId);
    
    // Créer un lien de téléchargement
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `bulletin_${bulletinId}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error('Erreur téléchargement PDF:', error);
    alert('La génération PDF n\'est pas encore implémentée. Utilisez "Voir détails" pour consulter le bulletin.');
  }
};

const getDecisionClass = (decision) => {
  switch (decision) {
    case 'Admis': return 'text-green-600';
    case 'Redouble': return 'text-red-600';
    case 'Ajourné': return 'text-yellow-600';
    default: return 'text-[#4e7397]';
  }
};

onMounted(() => {
  loadBulletins();

  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);
});
</script>
