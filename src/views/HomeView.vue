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
  <div class="h-[calc(100vh-4rem)] flex items-center justify-center">
    <form @submit.prevent="submitForm" class="w-full max-w-2xl px-2 sm:px-6 lg:px-8">
      <div class="mb-1 text-center text-2xl font-bold">Search for a character</div>
      <div class="flex flex-row space-x-2">
        <BaseInput placeholder="Character Name" v-model="search.characterName" type="text" />
        <BaseSelect placeholder="Select a realm" v-model="search.realmSlug" :options="realms" />
      </div>
      <div class="flex justify-center mt-2">
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md">Search</button>
      </div>
    </form>
  </div>
</template>
