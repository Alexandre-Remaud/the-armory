<script setup>
/**
 * Base select component with v-model support
 * @prop {string} modelValue - Value for v-model binding
 * @prop {Array} options - Array of options with slug and name properties
 * @prop {string} placeholder - Placeholder text
 */
defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  options: {
    type: Array,
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="w-full relative">
    <select
      class="w-full px-4 py-3 text-white bg-slate-700/50 border border-slate-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 backdrop-blur-sm appearance-none cursor-pointer pr-12"
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option value="" disabled class="bg-slate-700 text-slate-400">{{ placeholder }}</option>
      <option
        v-for="option in options"
        :key="option.slug"
        :value="option.slug"
        class="bg-slate-700 text-white hover:bg-slate-600"
      >
        {{ option.name }}
      </option>
    </select>

    <!-- Custom dropdown arrow -->
    <div class="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
      <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>
</template>
