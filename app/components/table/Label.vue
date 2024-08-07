<template>
  <div class="flex flex-col space-y-0.5 text-sm px-2">
    <div class="font-bold text-xs text-gray-700">
      {{ title }}
    </div>
    <div><slot /></div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  }

}
</script>

<style>

</style>
