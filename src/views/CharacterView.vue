<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CharacterService from '@/services/CharacterService'

const route = useRoute()
const router = useRouter()
const loading = ref(true)
const error = ref(null)
const character = ref(null)
const media = ref(null)
const avatarUrl = ref('')
const mainImageUrl = ref('')

onMounted(async () => {
  try {
    const { realmSlug, characterName } = route.params
    const [characterResp, mediaResp] = await Promise.all([
      CharacterService.getCharacter(realmSlug, characterName),
      CharacterService.getCharacterMedia(realmSlug, characterName),
    ])
    character.value = characterResp.data.data
    media.value = mediaResp.data.data

    const assets = media.value?.assets || []
    const avatar = assets.find((a) => a.key === 'avatar')
    const main = assets.find((a) => a.key === 'main-raw')
    avatarUrl.value = avatar?.value || ''
    mainImageUrl.value = main?.value || ''
  } catch (err) {
    error.value = err?.response?.data?.message || 'Erreur lors du chargement du personnage'
  } finally {
    loading.value = false
  }
})

const goBack = () => {
  router.push('/')
}

const getGenderIcon = (gender) => {
  return gender === 'Homme' ? '♂️' : '♀️'
}

const getGenderColor = (gender) => {
  return gender === 'Homme' ? 'text-blue-400' : 'text-pink-400'
}
</script>

<template>
  <div class="min-h-[calc(100vh-8rem)]">
    <!-- Back Button -->
    <div class="mb-6">
      <button
        @click="goBack"
        class="inline-flex items-center space-x-2 text-slate-400 hover:text-white transition-colors duration-200 group"
      >
        <svg
          class="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span>Retour à la recherche</span>
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center min-h-[400px]">
      <div class="text-center">
        <div
          class="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"
        ></div>
        <p class="text-slate-400 text-lg">Chargement du personnage...</p>
      </div>
    </div>

    <!-- Error State -->
    <div
      v-else-if="error"
      class="bg-red-900/20 border border-red-700/50 rounded-2xl p-8 text-center"
    >
      <div class="text-red-400 mb-4">
        <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
      </div>
      <h2 class="text-2xl font-bold text-red-400 mb-2">Erreur</h2>
      <p class="text-red-300">{{ error }}</p>
    </div>

    <!-- Character Content -->
    <div v-else class="space-y-8">
      <!-- Character Header Card -->
      <div
        class="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-2xl"
      >
        <div class="flex items-start gap-6">
          <!-- Avatar -->
          <div v-if="avatarUrl" class="flex-shrink-0">
            <img
              :src="avatarUrl"
              :alt="`Portrait de ${character.name}`"
              class="w-24 h-24 rounded-2xl object-cover border-4 border-slate-600/50 shadow-lg"
            />
          </div>

          <!-- Character Info -->
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-3">
              <h1 class="text-4xl font-bold text-white">
                {{ character.name }}
              </h1>
              <span class="text-2xl text-slate-400 font-medium">
                {{ character.realm.name }}
              </span>
            </div>

            <!-- Basic Info Row -->
            <div class="flex items-center space-x-6 text-slate-300 mb-4">
              <div class="flex items-center space-x-2">
                <svg
                  class="w-5 h-5 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                <span class="font-semibold">Niveau {{ character.level }}</span>
              </div>
              <div class="flex items-center space-x-2">
                <span class="font-semibold">{{ character.faction.name }}</span>
              </div>
              <div class="flex items-center space-x-2">
                <span :class="`text-xl ${getGenderColor(character.gender.name)}`">
                  {{ getGenderIcon(character.gender.name) }}
                </span>
                <span class="font-semibold">{{ character.gender.name }}</span>
              </div>
            </div>

            <!-- Detailed Info Grid -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <!-- Spécialisation -->
              <div class="bg-slate-700/30 rounded-lg p-3 border border-slate-600/30">
                <div class="flex items-center space-x-2 mb-1">
                  <svg
                    class="w-4 h-4 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                  <span class="text-xs text-slate-400 uppercase tracking-wide">Spécialisation</span>
                </div>
                <div class="text-white font-semibold">
                  {{ character.active_spec?.name || 'N/A' }}
                </div>
              </div>

              <!-- Points de haut fait -->
              <div class="bg-slate-700/30 rounded-lg p-3 border border-slate-600/30">
                <div class="flex items-center space-x-2 mb-1">
                  <svg class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                    />
                  </svg>
                  <span class="text-xs text-slate-400 uppercase tracking-wide">Haut fait</span>
                </div>
                <div class="text-white font-semibold">
                  {{ character.achievement_points?.toLocaleString() || '0' }}
                </div>
              </div>

              <!-- Item Level -->
              <div class="bg-slate-700/30 rounded-lg p-3 border border-slate-600/30">
                <div class="flex items-center space-x-2 mb-1">
                  <svg
                    class="w-4 h-4 text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span class="text-xs text-slate-400 uppercase tracking-wide">Item Level</span>
                </div>
                <div class="text-white font-semibold">
                  {{ character.equipped_item_level || 'N/A' }}
                </div>
              </div>

              <!-- Guilde -->
              <div class="bg-slate-700/30 rounded-lg p-3 border border-slate-600/30">
                <div class="flex items-center space-x-2 mb-1">
                  <svg
                    class="w-4 h-4 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span class="text-xs text-slate-400 uppercase tracking-wide">Guilde</span>
                </div>
                <div class="text-white font-semibold">
                  {{ character.guild?.name || 'Aucune guilde' }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Character Image Card -->
      <div
        v-if="mainImageUrl"
        class="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-2xl"
      >
        <h2 class="text-2xl font-bold text-white mb-6 text-center">Portrait du personnage</h2>
        <div class="flex justify-center">
          <img
            :src="mainImageUrl"
            :alt="`Image complète de ${character.name}`"
            class="max-w-full h-auto rounded-2xl shadow-2xl border border-slate-600/50"
          />
        </div>
      </div>
    </div>
  </div>
</template>
