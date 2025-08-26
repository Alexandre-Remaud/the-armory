<script setup>
/**
 * Base input component with v-model support
 * @prop {string} modelValue - Value for v-model binding
 * @prop {string} placeholder - Placeholder text
 * @prop {string} type - Input type (default: text)
 */
defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="w-full">
    <input
      :type="type"
      class="w-full px-4 py-3 text-white bg-slate-700/50 border border-slate-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 placeholder-slate-400 backdrop-blur-sm"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>
