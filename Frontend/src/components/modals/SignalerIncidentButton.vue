<template>
  <div>
    <!-- Floating Action Button -->
    <button 
      @click="isModalOpen = true" 
      class="fixed bottom-8 right-8 z-40 size-14 bg-red-600 text-white rounded-full shadow-2xl shadow-red-600/30 hover:bg-red-700 hover:scale-110 active:scale-95 transition-all flex items-center justify-center group"
      title="Signaler un incident"
    >
      <span class="material-symbols-outlined text-2xl group-hover:rotate-12 transition-transform">report_problem</span>
      <span class="absolute right-full mr-4 px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
        Signaler un incident
      </span>
    </button>

    <!-- Modal -->
    <SignalerIncidentModal 
      :isOpen="isModalOpen" 
      @close="isModalOpen = false"
      @success="handleSuccess"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SignalerIncidentModal from './SignalerIncidentModal.vue'

const isModalOpen = ref(false)

const handleSuccess = () => {
  // Optionnel: Notification de succès
  alert('Rapport d\'incident envoyé avec succès au CPE.')
}
</script>
