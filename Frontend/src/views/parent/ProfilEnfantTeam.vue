<template>
  <div class="space-y-6">
    <div class="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h3 class="text-lg font-bold text-slate-900 dark:text-white">Professeurs de la classe</h3>
        <p class="text-sm text-slate-500 dark:text-slate-400">Retrouvez ici tous les intervenants pédagogiques pour l'année en cours.</p>
      </div>
      <div class="flex items-center gap-3">
        <span class="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
          <span class="material-symbols-outlined text-sm font-bold">stars</span> Professeur Principal
        </span>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <div v-for="teacher in teachingTeam" :key="teacher.id" class="prof-card-hover bg-white dark:bg-slate-900 border-2 rounded-2xl shadow-sm p-5 relative overflow-hidden" :class="teacher.isPrincipal ? 'border-primary/30' : 'border-slate-200 dark:border-slate-800'">
        <div v-if="teacher.isPrincipal" class="absolute top-0 right-0">
          <div class="bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-tighter">Principal</div>
        </div>
        <div class="flex flex-col h-full">
          <div class="flex items-start gap-4 mb-5">
            <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-xl size-16 border-2" :class="teacher.isPrincipal ? 'border-primary/10' : 'border-slate-50 dark:border-slate-800'" :style="`background-image: url('${teacher.avatar}')`"></div>
            <div class="flex flex-col">
              <h4 class="text-slate-900 dark:text-white text-base font-bold">{{ teacher.name }}</h4>
              <p class="text-sm font-semibold" :class="teacher.isPrincipal ? 'text-primary' : 'text-slate-500 dark:text-slate-400'">{{ teacher.subject }}</p>
              <div class="mt-2 flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                <span class="material-symbols-outlined text-sm">schedule</span>
                <span>Présente : {{ teacher.schedule }}</span>
              </div>
            </div>
          </div>
          <div class="mt-auto pt-4 border-t border-slate-50 dark:border-slate-800/50 flex gap-2">
            <button @click="$emit('contact-teacher', teacher)" class="flex-1 flex items-center justify-center gap-2 text-xs font-bold py-2.5 rounded-lg transition-colors" :class="teacher.isPrincipal ? 'bg-primary text-white hover:bg-blue-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700'">
              <span class="material-symbols-outlined text-base">mail</span>
              Envoyer un message
            </button>
            <button @click="$emit('view-teacher-info', teacher)" class="aspect-square flex items-center justify-center bg-slate-50 dark:bg-slate-800 text-slate-500 rounded-lg hover:text-primary transition-colors">
              <span class="material-symbols-outlined text-xl">info</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-12 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-2xl p-6 flex items-start gap-4">
      <span class="material-symbols-outlined text-primary text-3xl">lightbulb</span>
      <div class="flex-1">
        <h4 class="text-slate-900 dark:text-white text-sm font-bold mb-1">Besoin d'un rendez-vous ?</h4>
        <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          Pour solliciter une rencontre physique ou téléphonique avec un enseignant, veuillez utiliser le bouton <strong>"Envoyer un message"</strong>. Précisez vos disponibilités et le motif de votre demande. Les professeurs vous répondront généralement sous 48h ouvrées.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  teachingTeam: {
    type: Array,
    required: true
  }
})

defineEmits(['contact-teacher', 'view-teacher-info'])
</script>

<style scoped>
.prof-card-hover:hover {
  transform: translateY(-2px);
  transition: all 0.2s ease;
}
</style>
