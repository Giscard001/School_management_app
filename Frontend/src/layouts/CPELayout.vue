<template>
  <div class="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark">
    <CPESidebar @logout="handleLogout" />
    <main class="flex-1 overflow-y-auto p-8">
      <router-view />
    </main>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import CPESidebar from '@/components/sidebars/CPESidebar.vue'


const router = useRouter()

const handleLogout = () => {
  console.log('Déconnexion en cours...')
  
  if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    sessionStorage.clear()
    router.push('/login')
  }
}
</script>
