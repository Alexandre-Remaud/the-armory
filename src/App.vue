<script setup>
import { RouterView } from 'vue-router'
import MainMenu from '@/components/MainMenu.vue'
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
    <MainMenu />
    <main class="container mx-auto px-4 py-8">
      <RouterView :key="$route.fullPath" />
    </main>
  </div>
</template>

<style>
body {
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    sans-serif;
}
</style>
