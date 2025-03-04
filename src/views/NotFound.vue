<script setup>
/**
 * Component to display a custom 404 page
 * @prop {string} resource - Type of resource not found (default: 'page')
 */
import { defineProps } from 'vue'

defineProps({
  resource: {
    type: String,
    required: true,
    default: 'page',
  },
})
</script>

<template>
  <div class="not-found-container">
    <h1 class="font-medium text-red-500 text-2xl">Oops!</h1>
    <h3 class="my-1">The {{ resource }} you are looking for does not exist.</h3>
    <router-link class="text-blue-500" :to="{ name: 'Home' }">Back to home</router-link>
  </div>
</template>

<style scoped>
.not-found-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  min-height: 50vh;
  text-align: center;
}
</style>
