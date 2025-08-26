<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import CharacterService from '@/services/CharacterService'

const route = useRoute()
const loading = ref(true)
const error = ref(null)
const character = ref(null)

onMounted(async () => {
  try {
    const { realmSlug, characterName } = route.params
    const { data } = await CharacterService.getCharacter(realmSlug, characterName)
    character.value = data.data
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
      <h1 class="text-2xl font-bold mb-2">{{ character.name }}</h1>
      <div class="opacity-70">Niveau {{ character.level }} — {{ character.realm.name.fr_FR }}</div>
    </div>
  </div>
</template>
