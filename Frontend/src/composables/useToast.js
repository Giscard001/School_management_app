import { ref } from 'vue'

const toasts = ref([])

export function useToast() {
    const addToast = (notification) => {
        const id = Date.now()
        const toast = {
            id,
            message: notification.message,
            type: notification.type || 'info', // 'success', 'error', 'info', 'warning'
            duration: notification.duration || 5000
        }

        toasts.value.push(toast)

        setTimeout(() => {
            removeToast(id)
        }, toast.duration)
    }

    const removeToast = (id) => {
        const index = toasts.value.findIndex(t => t.id === id)
        if (index !== -1) {
            toasts.value.splice(index, 1)
        }
    }

    const success = (message) => addToast({ message, type: 'success' })
    const error = (message) => addToast({ message, type: 'error' })
    const info = (message) => addToast({ message, type: 'info' })
    const warning = (message) => addToast({ message, type: 'warning' })

    return {
        toasts,
        addToast,
        removeToast,
        success,
        error,
        info,
        warning
    }
}
