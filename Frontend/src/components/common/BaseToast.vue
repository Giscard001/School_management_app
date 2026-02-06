<template>
  <div class="fixed top-4 right-4 z-[9999] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
    <transition-group name="toast">
      <div 
        v-for="toast in toasts" 
        :key="toast.id"
        class="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border backdrop-blur-md transition-all"
        :class="getToastClasses(toast.type)"
      >
        <span class="material-symbols-outlined text-xl">{{ getIcon(toast.type) }}</span>
        <p class="text-sm font-medium flex-1">{{ toast.message }}</p>
        <button @click="removeToast(toast.id)" class="opacity-60 hover:opacity-100 transition-opacity">
          <span class="material-symbols-outlined text-lg">close</span>
        </button>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { useToast } from '@/composables/useToast'

const { toasts, removeToast } = useToast()

const getToastClasses = (type) => {
  switch (type) {
    case 'success':
      return 'bg-green-50/90 dark:bg-green-900/40 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800'
    case 'error':
      return 'bg-red-50/90 dark:bg-red-900/40 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800'
    case 'warning':
      return 'bg-yellow-50/90 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800'
    default:
      return 'bg-blue-50/90 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800'
  }
}

const getIcon = (type) => {
  switch (type) {
    case 'success': return 'check_circle'
    case 'error': return 'error'
    case 'warning': return 'warning'
    default: return 'info'
  }
}
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
