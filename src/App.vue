<script setup>
import { RouterView } from 'vue-router'
import MainMenu from '@/components/MainMenu.vue'
</script>

<template>
  <section>
    <MainMenu />
    <div>
      <RouterView :key="$route.fullPath" />
    </div>
  </section>
</template>
