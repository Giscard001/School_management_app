<template>
  <div class="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900">
    <div class="max-w-5xl mx-auto py-8 px-8">
      <!-- Back Button -->
      <div class="mb-6">
        <button @click="goBack" class="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-primary transition-colors group">
          <span class="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform">arrow_back</span>
          <span class="font-medium">Retour à la liste des enfants</span>
        </button>
      </div>

      <!-- Profile Header -->
      <div class="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 mb-6">
        <div class="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div class="flex gap-6 items-center">
            <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-xl w-32 h-32 border-4 border-primary/10" :style="`background-image: url('${childProfile.avatar}')`"></div>
            <div class="flex flex-col">
              <div class="flex items-center gap-2 mb-1">
                <h2 class="text-slate-900 dark:text-white text-2xl font-bold tracking-tight">{{ childProfile.name }}</h2>
                <span class="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-bold">Actif</span>
              </div>
              <p class="text-slate-500 dark:text-slate-400 text-base font-medium">{{ childProfile.class }} — {{ childProfile.filiere }}</p>
              <p class="text-slate-500 dark:text-slate-400 text-sm">Matricule: <span class="font-mono text-primary">{{ childProfile.matricule }}</span></p>
            </div>
          </div>
          <div class="flex gap-2 w-full md:w-auto">
            <button @click="exportProfile" class="flex-1 md:flex-none flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-bold transition-all hover:bg-slate-200 dark:hover:bg-slate-700">
              <span class="material-symbols-outlined text-lg">download</span>
              <span>Exporter Profil</span>
            </button>
            <button @click="sendMessage" class="flex-1 md:flex-none flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold shadow-md hover:bg-blue-600 transition-all">
              <span class="material-symbols-outlined text-lg">mail</span>
              <span>Message</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Tabs Navigation -->
      <div class="border-b border-slate-200 dark:border-slate-800 mb-6 flex gap-8">
        <button @click="activeTab = 'infos'" class="pb-3 text-sm font-bold border-b-2 flex items-center gap-2" :class="activeTab === 'infos' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-primary transition-colors'">
          <span class="material-symbols-outlined text-lg">person</span> Infos Générales
        </button>
        <button @click="activeTab = 'history'" class="pb-3 text-sm font-medium flex items-center gap-2 border-b-2" :class="activeTab === 'history' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-primary transition-colors'">
          <span class="material-symbols-outlined text-lg">history</span> Historique Pluriannuel
        </button>
        <button @click="activeTab = 'team'" class="pb-3 text-sm font-medium flex items-center gap-2 border-b-2" :class="activeTab === 'team' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-primary transition-colors'">
          <span class="material-symbols-outlined text-lg">badge</span> Équipe Enseignante
        </button>
        <button @click="activeTab = 'admin'" class="pb-3 text-sm font-medium flex items-center gap-2 border-b-2" :class="activeTab === 'admin' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-primary transition-colors'">
          <span class="material-symbols-outlined text-lg">folder_open</span> Dossier Administratif
        </button>
      </div>

      <!-- Tab Content -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left Column: Main Content -->
        <div class="lg:col-span-2">
          <!-- Dynamic Tab Components -->
          <ProfilEnfantInfos v-if="activeTab === 'infos'" :child-profile="childProfile" :main-teachers="mainTeachers" @edit-info="editInfo" @contact-teacher="contactTeacher" />
          <ProfilEnfantHistory v-if="activeTab === 'history'" :school-history="schoolHistory" @download-archives="downloadArchives" />
          <ProfilEnfantTeam v-if="activeTab === 'team'" :teaching-team="teachingTeam" @contact-teacher="contactTeacher" @view-teacher-info="viewTeacherInfo" />
          <ProfilEnfantAdmin v-if="activeTab === 'admin'" :official-documents="officialDocuments" @download-document="downloadDocument" @renew-document="renewDocument" />
        </div>

        <!-- Right Column: Contacts & Status -->
        <div class="flex flex-col gap-6">
          <!-- Emergency Contacts -->
          <div class="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-5">
            <h3 class="text-slate-900 dark:text-white text-lg font-bold mb-4 flex items-center gap-2">
              <span class="material-symbols-outlined text-red-500">e911_emergency</span>
              Contacts d'Urgence
            </h3>
            <div class="flex flex-col gap-4">
              <div v-for="contact in emergencyContacts" :key="contact.id" class="p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                <div class="flex justify-between items-start mb-2">
                  <div>
                    <p class="text-slate-900 dark:text-white text-sm font-bold">{{ contact.name }}</p>
                    <p class="text-slate-500 dark:text-slate-400 text-xs">{{ contact.relation }}</p>
                  </div>
                  <span class="material-symbols-outlined text-xl" :class="contact.priority ? 'text-primary' : 'text-slate-500'">phone</span>
                </div>
                <p class="text-sm font-mono font-medium" :class="contact.priority ? 'text-primary' : 'text-slate-900 dark:text-slate-300'">{{ contact.phone }}</p>
              </div>
            </div>
            <button @click="showAddContactModal = true" class="w-full mt-4 py-2 border border-dashed border-primary/40 text-primary text-xs font-bold rounded-lg hover:bg-primary/5 transition-colors">
              + AJOUTER UN CONTACT
            </button>
          </div>

          <!-- School Stats / Alerts -->
          <div class="bg-primary/5 dark:bg-primary/10 rounded-xl p-5 border border-primary/20">
            <h4 class="text-primary text-sm font-bold mb-3 flex items-center gap-2 uppercase tracking-wide">
              <span class="material-symbols-outlined text-lg">analytics</span> Résumé de l'année
            </h4>
            <div class="space-y-3">
              <div class="flex justify-between items-center">
                <span class="text-sm text-slate-500 dark:text-slate-400">Moyenne Générale</span>
                <span class="text-sm font-bold text-slate-900 dark:text-white">{{ yearlyStats.average }}</span>
              </div>
              <div class="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                <div class="bg-primary h-full" :style="`width: ${yearlyStats.averageProgress}%`"></div>
              </div>
              <div class="flex justify-between items-center pt-2">
                <span class="text-sm text-slate-500 dark:text-slate-400">Assiduité</span>
                <span class="text-sm font-bold text-green-600">{{ yearlyStats.attendance }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-slate-500 dark:text-slate-400">Absences (H)</span>
                <span class="text-sm font-bold text-orange-500">{{ yearlyStats.absences }}</span>
              </div>
            </div>
          </div>

          <!-- Quick Documents -->
          <div class="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-5">
            <h3 class="text-slate-900 dark:text-white text-sm font-bold mb-4">Documents Récents</h3>
            <div class="flex flex-col gap-3">
              <div v-for="doc in recentDocuments" :key="doc.id" class="flex items-center gap-3 p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg cursor-pointer group" @click="downloadDocument(doc)">
                <span class="material-symbols-outlined" :class="doc.type === 'pdf' ? 'text-red-400' : 'text-primary'">{{ getDocumentIcon(doc.type) }}</span>
                <div class="flex-1 min-w-0">
                  <p class="text-xs font-bold truncate">{{ doc.name }}</p>
                  <p class="text-[10px] text-slate-400">Ajouté le {{ doc.date }}</p>
                </div>
                <span class="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">download</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Contact Modal -->
    <div v-if="showAddContactModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="showAddContactModal = false"></div>
      <div class="relative bg-white dark:bg-slate-900 w-full max-w-lg rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden">
        <div class="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900">
          <h2 class="text-slate-900 dark:text-white text-xl font-bold">Ajouter un Contact d'Urgence</h2>
          <button @click="showAddContactModal = false" class="text-slate-500 hover:text-red-500 transition-colors">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
        <form @submit.prevent="addContact" class="p-6 overflow-y-auto max-h-[80vh]">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex flex-col gap-1.5">
              <label class="text-slate-900 dark:text-slate-300 text-sm font-semibold">Nom</label>
              <input v-model="newContact.lastName" class="rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm focus:ring-primary focus:border-primary" placeholder="ex: Dupont" type="text"/>
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-slate-900 dark:text-slate-300 text-sm font-semibold">Prénom</label>
              <input v-model="newContact.firstName" class="rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm focus:ring-primary focus:border-primary" placeholder="ex: Jean-Luc" type="text"/>
            </div>
            <div class="flex flex-col gap-1.5 md:col-span-2">
              <label class="text-slate-900 dark:text-slate-300 text-sm font-semibold">Lien de parenté</label>
              <select v-model="newContact.relation" class="rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm focus:ring-primary focus:border-primary">
                <option value="">Sélectionner un lien</option>
                <option value="Père">Père</option>
                <option value="Mère">Mère</option>
                <option value="Grand-père">Grand-père</option>
                <option value="Grand-mère">Grand-mère</option>
                <option value="Oncle">Oncle</option>
                <option value="Tante">Tante</option>
                <option value="Tuteur légal">Tuteur légal</option>
                <option value="Autre">Autre</option>
              </select>
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-slate-900 dark:text-slate-300 text-sm font-semibold">Téléphone principal</label>
              <div class="relative">
                <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">phone</span>
                <input v-model="newContact.phone" class="w-full pl-10 rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm focus:ring-primary focus:border-primary" placeholder="+33 6 ..." type="tel"/>
              </div>
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-slate-900 dark:text-slate-300 text-sm font-semibold">Téléphone secondaire</label>
              <div class="relative">
                <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">phone</span>
                <input v-model="newContact.secondaryPhone" class="w-full pl-10 rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm focus:ring-primary focus:border-primary" placeholder="+33 ..." type="tel"/>
              </div>
            </div>
            <div class="md:col-span-2 mt-2">
              <label class="inline-flex items-center gap-2 cursor-pointer group">
                <input v-model="newContact.priority" class="rounded border-slate-200 text-primary focus:ring-primary size-4" type="checkbox"/>
                <span class="text-sm font-medium text-slate-900 dark:text-slate-300 group-hover:text-primary transition-colors">Contact prioritaire (en cas d'urgence immédiate)</span>
              </label>
            </div>
          </div>
        </form>
        <div class="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex justify-end gap-3">
          <button @click="showAddContactModal = false" class="px-4 py-2 rounded-lg text-sm font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
            Annuler
          </button>
          <button @click="addContact" class="px-6 py-2 rounded-lg bg-primary text-white text-sm font-bold shadow-md hover:bg-blue-600 transition-all flex items-center gap-2">
            <span class="material-symbols-outlined text-lg">save</span>
            Enregistrer le contact
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ProfilEnfantInfos from './ProfilEnfantInfos.vue'
import ProfilEnfantHistory from './ProfilEnfantHistory.vue'
import ProfilEnfantTeam from './ProfilEnfantTeam.vue'
import ProfilEnfantAdmin from './ProfilEnfantAdmin.vue'

const router = useRouter()

// Données réactives
const activeTab = ref('infos')
const showAddContactModal = ref(false)

// Profil de l'enfant
const childProfile = ref({
  name: 'Lucas Dupont',
  class: '3ème B',
  filiere: 'Filière Scientifique',
  matricule: '2023-ST-0452',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnCBdSTipcVY1NBRpS9uK9fD98-A0nhIihrg67vwPvUkxkV8RfHbxgDn9_XtHGOchaY9anwwPR3NlbS9rOvgiJfn7LiIVvrlpA_ntUnBBk9TjcF5IlWgR3W47jMX7FruaEUiElpXmCD7ospQ5_CXayGk_31A3-WX12AaSnilQ73inpgMkkMt6sRT-qmXcTggoqSERHnPXhjzjlS9-380JFBY19Xy9xBHii6UKXURSUAE_5YNweIcS9JQITT8sABQQ7T9VZ2DumTVs',
  birthDate: '12/05/2010 (14 ans)',
  birthPlace: 'Paris, France',
  address: '15 Rue des Lilas, 75011 Paris',
  bloodGroup: 'O+',
  nativeLanguage: 'Français',
  enrollmentDate: '01/09/2021'
})

// Professeurs principaux
const mainTeachers = ref([
  {
    id: 1,
    name: 'Mme. Lefebvre',
    subject: 'Mathématiques',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA53-jJl2iNK6B8B7n521NUOyAA8EF9QdkpxeQ25J4oOvQozONhU2KIAxd0g9RkR9Gtk0liP5kHfD9Bha-xS3zHtTOfvtCjEZMtJ1cWU9G9zjYf4kDGG6s0mBGqnLXmTlVmvsDI1f8FFn0ccSxMQN1Uv2yqYR5mLWaUXA7pTwZ5SXT9ILUAmDiLk_KcBSEns6vmZuW4CQxL1QAPhNtSaBK3g4F0wKkrNSSr68oURmn6c_MlFSxsA1EnRpVxQ6UTJAfcFWqGqs5nnXs'
  },
  {
    id: 2,
    name: 'M. Girard',
    subject: 'Sciences Physiques',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHy3YKNIG6U3pD6V7JJ8vgef4vqX4Xte1_nHJI78TbGQXLZoimFko0ddC_huc2dr6qMv0GCvQymu7udjk8rCe_ePsJ11p5FSf30VKuHJYM8bSgdJU71PDMal9CziZx-dPUB18w6PmCZsAjSxU6w1UIy7gRqzTPXEKvDoSyDv93kqLVVUAi6JGRYd_jQM90o5gb0r9rlqvEee9zH_PBRXQRAx_lHkck63R8jrN1BNozr96Z0E73OdpGwhLXo7VAw_zJcAMS-BktJJQ'
  }
])

// Historique scolaire
const schoolHistory = ref([
  {
    year: '2023 - 2024',
    class: '3ème B',
    average: '15.4 / 20',
    trend: '+0.2',
    result: 'Admis'
  },
  {
    year: '2022 - 2023',
    class: '4ème A',
    average: '15.2 / 20',
    result: 'Admis'
  },
  {
    year: '2021 - 2022',
    class: '5ème C',
    average: '14.5 / 20',
    result: 'Admis'
  }
])

// Équipe enseignante
const teachingTeam = ref([
  {
    id: 1,
    name: 'Mme. Élodie Lefebvre',
    subject: 'Mathématiques',
    schedule: 'Lun, Mar, Jeu, Ven',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA53-jJl2iNK6B8B7n521NUOyAA8EF9QdkpxeQ25J4oOvQozONhU2KIAxd0g9RkR9Gtk0liP5kHfD9Bha-xS3zHtTOfvtCjEZMtJ1cWU9G9zjYf4kDGG6s0mBGqnLXmTlVmvsDI1f8FFn0ccSxMQN1Uv2yqYR5mLWaUXA7pTwZ5SXT9ILUAmDiLk_KcBSEns6vmZuW4CQxL1QAPhNtSaBK3g4F0wKkrNSSr68oURmn6c_MlFSxsA1EnRpVxQ6UTJAfcFWqGqs5nnXs',
    isPrincipal: true
  },
  {
    id: 2,
    name: 'M. Marc Girard',
    subject: 'Sciences Physiques',
    schedule: 'Mer, Ven',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHy3YKNIG6U3pD6V7JJ8vgef4vqX4Xte1_nHJI78TbGQXLZoimFko0ddC_huc2dr6qMv0GCvQymu7udjk8rCe_ePsJ11p5FSf30VKuHJYM8bSgdJU71PDMal9CziZx-dPUB18w6PmCZsAjSxU6w1UIy7gRqzTPXEKvDoSyDv93kqLVVUAi6JGRYd_jQM90o5gb0r9rlqvEee9zH_PBRXQRAx_lHkck63R8jrN1BNozr96Z0E73OdpGwhLXo7VAw_zJcAMS-BktJJQ',
    isPrincipal: false
  },
  {
    id: 3,
    name: 'Mme. Sophie Laurent',
    subject: 'Français & Littérature',
    schedule: 'Lun, Mar, Mer',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBaJGmivZFVc9AN_gYxH6pqlrSgFtUkdZCmvCO75NkGHoPLX3t1SHQIRtT0c1UrSDmHdCaM8ReyziZsKplfLw1zGtN8Y_oSKUlu74nbRswHzeHJIrxcUnqLLsB8OVHBTiixdModF_lDy7LxFuSLsQdPEyQCNbkF4OxmgmYr2WeSFK2WPDokJ1nIUN0DRQiMxeJDzm16GULO3bIUn3KE6MatJRgBphdqwPyR3KolSUV2mmsw4hp4vOwVgE19MPf9TtydAK2EWaswenU',
    isPrincipal: false
  },
  {
    id: 4,
    name: 'M. Jean-Pierre Brun',
    subject: 'Histoire-Géographie',
    schedule: 'Jeu, Ven',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2Q-mSuKO5BceEU7Ow7-o6cQlZPqtLeDwyLDV4P1rbCPkbo4GDtZBSXXQhPdzTsHKHdH_AxQA8gV-kfSHhlLDLoOSgrHZBlXXnTkfDRGHXe3ztpkNpAcRkWyuhfs_JWTcUORAgT0u1HTB9x56ENV2wN2KCHLfTMxZoUsE6OlmOH8LNu6hyB58cn9FuJX2KVWGieaYi1dHA1s0xmicUfy02LdhE7RGFscceAEN0dpHC9tTtg0y4Ie5zfL7VcXtDih3NbGguvUhsGcY',
    isPrincipal: false
  },
  {
    id: 5,
    name: 'Mme. Claire Dubois',
    subject: 'Anglais LV1',
    schedule: 'Lun, Jeu',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSuD0MUnKuJhXa1DAVcxOnNfomGWa-pvJdIRbEyvmHBNiJL5rLCAB0veLzm73_CcHRJMRUEaaxAZPSWfa3hsrEoKw-xrl9joYe0LCV3n68M-Crc8LsHbZ3MHJznPjOsur3ZG98vC7jUY_PvVljGVOYO_Ls18wyjOGZ0tLNoGR1H-Lo_tTi1vTEoG6VloBa8rsswtNbX6Y-9VrHUZ5I0ZvDu851lnpCVzTWxpEzwe3CJd99Bp7pqQ3HgGR1EzYVTuqgfytuNPDc8IY',
    isPrincipal: false
  },
  {
    id: 6,
    name: 'M. Antoine Morel',
    subject: 'Éducation Physique',
    schedule: 'Mar, Mer',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBs5Wb_Hlz9a8ld6vELjm85l2HxsM5dpFM1fS5lT82gt2KxgCbobT0eYMqGYBi_Y6-gDcOY6HI6l2X_TI3_viDg5m82Np0G9RR5tfiyud1j0exHQCBgSb5TvE38JbSasoodgeClNT-4M0KosJeScgFnZ7q_D4iAsxLyqRaq_YOIolTTPkVm2G1xzt1KMv55gO6IEW9R70DARI96Sfo2Hk8vCLyT9_-YcfWLQHTUvbMBVNbNY5wiZnUdroTln6lUnev2E1EIwGD3JQ',
    isPrincipal: false
  }
])

// Documents officiels
const officialDocuments = ref([
  {
    id: 1,
    name: 'Certificat de scolarité',
    description: 'Année 2023-2024',
    type: 'certificate',
    date: '05/09/2023',
    status: 'Validé'
  },
  {
    id: 2,
    name: 'Règlement intérieur signé',
    description: 'Document légal',
    type: 'rules',
    date: '01/09/2023',
    status: 'Validé'
  },
  {
    id: 3,
    name: 'Fiche médicale',
    description: 'Mise à jour annuelle requise',
    type: 'medical',
    date: '12/09/2022',
    status: 'À renouveler'
  },
  {
    id: 4,
    name: 'Attestations diverses',
    description: 'Assurance scolaire',
    type: 'attestation',
    date: '15/09/2023',
    status: 'Validé'
  }
])

// Contacts d'urgence
const emergencyContacts = ref([
  {
    id: 1,
    name: 'Marie Dupont',
    relation: 'Mère',
    phone: '+33 6 12 34 56 78',
    priority: true
  },
  {
    id: 2,
    name: 'Paul Bernard',
    relation: 'Oncle (Contact second.)',
    phone: '+33 6 98 76 54 32',
    priority: false
  }
])

// Statistiques annuelles
const yearlyStats = ref({
  average: '15.4 / 20',
  averageProgress: 77,
  attendance: '98%',
  absences: '4 heures'
})

// Documents récents
const recentDocuments = ref([
  {
    id: 1,
    name: 'Bulletin_T1_2024.pdf',
    date: '20/12/2023',
    type: 'pdf'
  },
  {
    id: 2,
    name: 'Certificat_Scolarite.pdf',
    date: '05/09/2023',
    type: 'document'
  }
])

// Nouveau contact
const newContact = ref({
  lastName: '',
  firstName: '',
  relation: '',
  phone: '',
  secondaryPhone: '',
  priority: false
})

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

// Fonctions d'action
const exportProfile = () => {
  console.log('Exporter le profil')
}

const sendMessage = () => {
  console.log('Envoyer un message')
}

const editInfo = () => {
  console.log('Modifier les informations')
}

const contactTeacher = (teacher) => {
  console.log('Contacter le professeur:', teacher.name)
}

const downloadArchives = (year) => {
  console.log('Télécharger les archives pour:', year.year)
}

const viewTeacherInfo = (teacher) => {
  console.log('Voir les informations du professeur:', teacher.name)
}

const downloadDocument = (doc) => {
  console.log('Télécharger le document:', doc.name)
}

const renewDocument = (doc) => {
  console.log('Renouveler le document:', doc.name)
}

const addContact = () => {
  console.log('Ajouter le contact:', newContact.value)
  // Réinitialiser le formulaire
  newContact.value = {
    lastName: '',
    firstName: '',
    relation: '',
    phone: '',
    secondaryPhone: '',
    priority: false
  }
  showAddContactModal.value = false
}

const goBack = () => {
  router.push('/parent/enfants')
}
</script>

<style scoped>
.prof-card-hover:hover {
  transform: translateY(-2px);
  transition: all 0.2s ease;
}

.chart-container {
  height: 250px;
  position: relative;
}

.chart-line {
  stroke: #197fe6;
  stroke-width: 3;
  fill: none;
}

.chart-point {
  fill: #197fe6;
  stroke: white;
  stroke-width: 2;
}
</style>
