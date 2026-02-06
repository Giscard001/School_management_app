<template>
  <div class="space-y-6">
    <div class="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div class="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
        <h3 class="text-slate-900 dark:text-white text-lg font-bold">Documents Officiels</h3>
        <p class="text-xs text-slate-500 dark:text-slate-400">Dernière mise à jour : 12 Oct 2023</p>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
              <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Document</th>
              <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Date d'ajout</th>
              <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Statut</th>
              <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
            <tr v-for="doc in officialDocuments" :key="doc.id" class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <span class="material-symbols-outlined p-2 rounded-lg" :class="getDocumentIconClass(doc.type)">{{ getDocumentIcon(doc.type) }}</span>
                  <div>
                    <p class="text-sm font-bold text-slate-900 dark:text-white">{{ doc.name }}</p>
                    <p class="text-xs text-slate-400">{{ doc.description }}</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-sm text-slate-500">{{ doc.date }}</td>
              <td class="px-6 py-4">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold" :class="getStatusClass(doc.status)">
                  {{ doc.status }}
                </span>
              </td>
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end gap-2">
                  <button @click="$emit('download-document', doc)" class="text-primary hover:text-blue-700 p-1">
                    <span class="material-symbols-outlined">download</span>
                  </button>
                  <button v-if="doc.status === 'À renouveler'" @click="$emit('renew-document', doc)" class="text-orange-600 hover:text-orange-700 p-1">
                    <span class="material-symbols-outlined">sync</span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 rounded-xl p-6 flex gap-4">
      <span class="material-symbols-outlined text-blue-500 text-3xl">info</span>
      <div class="flex flex-col gap-1">
        <h4 class="text-blue-900 dark:text-blue-200 font-bold text-sm">Notes administratives</h4>
        <p class="text-blue-800/80 dark:text-blue-300/80 text-sm leading-relaxed">
          Veuillez vous assurer que tous les documents marqués comme <strong class="font-bold">"À renouveler"</strong> soient téléversés avant la fin du mois. Tout document manquant peut impacter la participation de votre enfant aux activités extrascolaires.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  officialDocuments: {
    type: Array,
    required: true
  }
})

defineEmits(['download-document', 'renew-document'])

// Fonctions utilitaires
const getDocumentIcon = (type) => {
  switch (type) {
    case 'pdf': return 'picture_as_pdf'
    case 'document': return 'description'
    case 'certificate': return 'description'
    case 'rules': return 'history_edu'
    case 'medical': return 'medical_services'
    case 'attestation': return 'card_membership'
    default: return 'description'
  }
}

const getDocumentIconClass = (type) => {
  switch (type) {
    case 'medical': return 'text-orange-500 bg-orange-50'
    default: return 'text-primary bg-primary/10'
  }
}

const getStatusClass = (status) => {
  switch (status) {
    case 'Validé': return 'bg-green-100 text-green-700'
    case 'À renouveler': return 'bg-orange-100 text-orange-700'
    default: return 'bg-gray-100 text-gray-700'
  }
}
</script>
