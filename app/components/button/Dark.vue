<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <button
    v-if="size === 'xs'"
    style="flex-shrink:0;"
    aria-label="Primary Button"
    type="button"
    class="flex content-center items-center justify-center text-center px-2.5 py-1.5 border border-gray-900 text-xs font-medium rounded shadow-sm text-white bg-black hover:bg-gray-900 hover:border-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-200"
    @click="$emit('click')"
  >
    <slot />
  </button>
  <button
    v-else-if="size === 'sm'"
    style="flex-shrink:0;"
    aria-label="Primary Button"
    type="button"
    class="flex content-center items-center justify-center text-center px-4 py-2 border border-gray-900 text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-900 hover:border-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-200"
    @click="$emit('click')"
  >
    <slot />
  </button>
  <button
    v-else-if="size === 'base'"
    style="flex-shrink:0;"
    aria-label="Primary Button"
    type="button"
    class="flex content-center items-center justify-center text-center px-6 py-3 border border-gray-900 text-base font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-900 hover:border-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-200"
    @click="$emit('click')"
  >
    <slot />
  </button>
  <button
    v-else-if="size === 'lg'"
    style="flex-shrink:0;"
    aria-label="Primary Button"
    type="button"
    class="flex content-center items-center justify-center text-center px-8 py-4 border border-gray-900 text-lg font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-900 hover:border-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-200"
    @click="$emit('click')"
  >
    <slot />
  </button>
  <button
    v-else-if="size === 'xl'"
    style="flex-shrink:0;"
    aria-label="Primary Button"
    type="button"
    class="flex content-center items-center justify-center text-center px-10 py-5 border border-gray-900 text-xl font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-900 hover:border-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-200"
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
