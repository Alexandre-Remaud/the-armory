<script setup>
import { RouterLink } from 'vue-router'
import logo from '@/assets/images/logo.png'
</script>

<template>
  <nav class="bg-slate-800/80 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <RouterLink
            to="/"
            class="flex items-center space-x-3 group transition-all duration-200 hover:scale-105"
          >
            <img class="h-10 w-auto" :src="logo" alt="The Armory" />
            <span
              class="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-200"
            >
              The Armory
            </span>
          </RouterLink>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button
            class="text-slate-300 hover:text-white p-2 rounded-lg hover:bg-slate-700/50 transition-colors duration-200"
          >
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>
