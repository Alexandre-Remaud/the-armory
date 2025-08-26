<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import CharacterService from '@/services/CharacterService'

const route = useRoute()
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
</script>

<template>
  <div class="p-4">
    <div v-if="loading">Chargement...</div>
    <div v-else-if="error" class="text-red-600">{{ error }}</div>
    <div v-else>
      <div class="flex items-start gap-4 mb-6">
        <img
          v-if="avatarUrl"
          :src="avatarUrl"
          :alt="`Portrait de ${character.name}`"
          class="w-20 h-20 rounded-md object-cover"
        />
        <div>
          <h1 class="text-2xl font-bold mb-1">{{ character.name }}</h1>
          <div class="opacity-70">
            Niveau {{ character.level }} — {{ character.realm.name.fr_FR }}
          </div>
        </div>
      </div>

      <div v-if="mainImageUrl" class="flex justify-center">
        <img
          :src="mainImageUrl"
          :alt="`Image complète de ${character.name}`"
          class="max-w-full h-auto rounded-lg shadow-lg"
        />
      </div>
    </div>
  </div>
</template>
