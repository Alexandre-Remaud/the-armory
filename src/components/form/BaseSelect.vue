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
  <div class="w-6/12">
    <select
      class="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option value="" disabled>{{ placeholder }}</option>
      <option v-for="option in options" :key="option.slug" :value="option.slug">
        {{ option.name }}
      </option>
    </select>
  </div>
</template>
