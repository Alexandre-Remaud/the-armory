<script setup>
import { RouterLink } from "vue-router";
import logo from "@/assets/images/logo.png";

const navigation = [{ name: "Home", href: "/", current: true }];
</script>

<template>
  <nav class="bg-gray-800">
    <div class="mx-auto max-w-2xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <!-- Desktop menu -->
        <div
          class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"
        >
          <div class="flex shrink-0 items-center">
            <RouterLink to="/"
              ><img class="h-8 w-auto" :src="logo" alt="The armory"
            /></RouterLink>
          </div>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <a
                v-for="item in navigation"
                :key="item.name"
                :href="item.href"
                :class="[
                  item.current
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'rounded-md px-3 py-2 text-sm font-medium',
                ]"
                :aria-current="item.current ? 'page' : undefined"
                >{{ item.name }}</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
