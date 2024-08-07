<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <button v-if="size === 'xs'" aria-label="White button" type="button" class="flex content-center items-center justify-center text-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500" @click="$emit('click')">
    <slot />
  </button>
  <button v-else-if="size === 'sm'" aria-label="White button" type="button" class="flex content-center items-center justify-center text-center px-4 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500" @click="$emit('click')">
    <slot />
  </button>
  <button v-else-if="size === 'base'" aria-label="White button" type="button" class="flex content-center items-center justify-center text-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500" @click="$emit('click')">
    <slot />
  </button>
  <button v-else-if="size === 'lg'" aria-label="White button" type="button" class="flex content-center items-center justify-center text-center px-8 py-4 border border-gray-300 shadow-sm text-lg font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500" @click="$emit('click')">
    <slot />
  </button>
  <button v-else-if="size === 'xl'" aria-label="White button" type="button" class="flex content-center items-center justify-center text-center px-10 py-5 border border-gray-300 shadow-sm text-xl font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500" @click="$emit('click')">
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: 'base'
    }
  }

}
</script>

<style>

</style>
