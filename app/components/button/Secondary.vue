<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <button
    v-if="size === 'xs'"
    style="flex-shrink:0;"
    aria-label="Secondary button"
    type="button"
    class="flex content-center transition items-center justify-center text-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-brand-700 bg-brand-200 hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-200"
    @click="$emit('click')"
  >
    <slot />
  </button>
  <button
    v-else-if="size === 'sm'"
    style="flex-shrink:0;"
    aria-label="Secondary button"
    type="button"
    class="flex content-center transition items-center justify-center text-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-brand-700 bg-brand-200 hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-200"
    @click="$emit('click')"
  >
    <slot />
  </button>
  <button
    v-else-if="size === 'base'"
    style="flex-shrink:0;"
    aria-label="Secondary button"
    type="button"
    class="flex content-center transition items-center justify-center text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-brand-700 bg-brand-200 hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-200"
    @click="$emit('click')"
  >
    <slot />
  </button>
  <button
    v-else-if="size === 'lg'"
    style="flex-shrink:0;"
    aria-label="Secondary button"
    type="button"
    class="flex content-center transition items-center justify-center text-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-brand-700 bg-brand-200 hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-200"
    @click="$emit('click')"
  >
    <slot />
  </button>
  <button
    v-else-if="size === 'xl'"
    style="flex-shrink:0;"
    aria-label="Secondary button"
    type="button"
    class="flex content-center transition items-center justify-center text-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-brand-700 bg-brand-200 hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-200"
    @click="$emit('click')"
  >
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
