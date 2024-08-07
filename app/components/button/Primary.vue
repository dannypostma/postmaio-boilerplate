<template>
  <button
    v-if="size === 'xs'"
    style="flex-shrink:0;"
    aria-label="Secondary button"
    type="button"
    class="flex content-center transition items-center justify-center text-center px-2.5 py-1.5 border border-brand-600 text-xs font-medium rounded shadow-sm text-white bg-gradient-to-r bg-brand-500  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-200"
    @click="$emit('click')"
  >
    <slot />
  </button>
  <button
    v-else-if="size === 'sm'"
    style="flex-shrink:0;"
    aria-label="Secondary button"
    type="button"
    class="flex content-center transition items-center justify-center text-center px-2 py-1.5 border border-brand-600 text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-gradient-to-r bg-brand-500  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-200"
    @click="$emit('click')"
  >
    <slot />
  </button>
  <button
    v-else-if="size === 'base'"
    style="flex-shrink:0;"
    aria-label="Secondary button"
    type="button"
    class="flex content-center transition items-center justify-center text-center px-4 py-3 border border-brand-600 text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r bg-brand-500  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-200"
    @click="$emit('click')"
  >
    <slot />
  </button>
  <button
    v-else-if="size === 'lg'"
    style="flex-shrink:0;"
    aria-label="Secondary button"
    type="button"
    class="flex content-center transition items-center justify-center text-center px-4 py-4 border border-brand-600 text-lg font-medium rounded-md shadow-sm text-white bg-gradient-to-r bg-brand-500  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-200"
    @click="$emit('click')"
  >
    <slot />
  </button>
  <button
    v-else-if="size === 'xl'"
    style="flex-shrink:0;"
    aria-label="Secondary button"
    type="button"
    class="flex content-center transition items-center justify-center text-center px-6 py-5 border border-brand-600 text-xl font-medium rounded-md shadow-sm text-white bg-gradient-to-r bg-brand-500  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-200"
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
