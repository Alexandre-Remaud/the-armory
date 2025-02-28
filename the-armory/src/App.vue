<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <section>
    <div class="container">
      <RouterView :key="$route.fullPath" />
    </div>
  </section>
</template>
