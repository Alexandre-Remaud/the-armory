<script setup>
/**
 * Component to display a network error
 * Allows user to return to the previous page
 */
const handleRetry = (event) => {
  event.preventDefault()
  window.history.back()
}
</script>

<template>
  <div class="network-error-container">
    <h1 class="font-medium text-red-500 text-2xl">Oops!</h1>
    <h3 class="my-4">
      It seems there is a connection issue. Please wait and
      <a href="#" class="text-blue-500 hover:text-blue-700" @click="handleRetry">click here</a>
      to try again.
    </h3>
  </div>
</template>

<style scoped>
.network-error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  min-height: 50vh;
  text-align: center;
}
</style>
