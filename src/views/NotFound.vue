<script setup>
/**
 * Composant pour afficher une page 404 personnalisée
 * @prop {string} resource - Le type de ressource non trouvée (par défaut: 'page')
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
    <h1 class="font-medium text-red-500 text-2xl">Oups !</h1>
    <h3 class="my-1">La {{ resource }} que vous recherchez n'existe pas.</h3>
    <router-link class="text-blue-500" :to="{ name: 'Home' }"> Retour à l'accueil </router-link>
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
