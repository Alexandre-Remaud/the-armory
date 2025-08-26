<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import BaseInput from '@/components/form/BaseInput.vue'
import BaseSelect from '@/components/form/BaseSelect.vue'
import RealmService from '@/services/RealmService'

/**
 * Search form state
 */
const search = reactive({
  realmSlug: '',
  characterName: '',
})

/**
 * Available realms list
 */
const realms = ref([])

/**
 * Fetch realms data on component mount
 */
onMounted(async () => {
  try {
    realms.value = await RealmService.getOrderedRealms()
  } catch (error) {
    console.error('Error while fetching realms:', error)
  }
})

const router = useRouter()

const submitForm = () => {
  if (search.realmSlug && search.characterName) {
    router.push({
      name: 'Character',
      params: {
        realmSlug: search.realmSlug,
        characterName: search.characterName.toLowerCase(),
      },
    })
  }
}
</script>

<template>
  <div class="min-h-[calc(100vh-8rem)] flex items-center justify-center">
    <div class="w-full max-w-2xl">
      <!-- Header Card -->
      <div class="text-center mb-8">
        <h1
          class="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
        >
          The Armory
        </h1>
        <p class="text-slate-300 text-lg">Recherchez vos personnages World of Warcraft</p>
      </div>

      <!-- Search Card -->
      <div
        class="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-2xl"
      >
        <form @submit.prevent="submitForm" class="space-y-6">
          <div class="text-center mb-6">
            <h2 class="text-2xl font-semibold text-white mb-2">Rechercher un personnage</h2>
            <p class="text-slate-400">Entrez le nom et sélectionnez le royaume</p>
          </div>

          <div class="space-y-4">
            <BaseInput placeholder="Nom du personnage" v-model="search.characterName" type="text" />
            <BaseSelect
              placeholder="Sélectionner un royaume"
              v-model="search.realmSlug"
              :options="realms"
            />
          </div>

          <div class="pt-4">
            <button
              type="submit"
              class="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-blue-600/25 disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="!search.realmSlug || !search.characterName"
            >
              <span class="flex items-center justify-center space-x-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <span>Rechercher</span>
              </span>
            </button>
          </div>
        </form>
      </div>

      <!-- Stats Card -->
      <div class="mt-8 text-center">
        <div class="inline-flex items-center space-x-6 text-slate-400">
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
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span>{{ realms.length }} royaumes disponibles</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
