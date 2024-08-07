<template>
  <div v-if="!isLoading">
    <slot />
  </div>
  <div v-else class="flex items-center content-center justify-center w-full h-full">
    <LoadingSpinner class="mx-auto" :title="title" />
  </div>
</template>

<script>
export default {
  name: 'LoadingWrapper',
  props: {
    isLoading: {
      type: Boolean,
      required: true,
      default: false
    },
    title: {
      type: String,
      required: false,
      default: 'Loading...'
    }
  }
}
</script>

<style>

</style>
