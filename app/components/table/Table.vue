<template>
  <table class="min-w-full divide-y divide-gray-300 rounded-lg">
    <TableHead v-if="head" :head="head" class="lg:sticky lg:self-start top-0" />
    <tbody class="divide-y divide-gray-200 rounded-b-lg bg-white">
      <!-- Odd row -->
      <slot />

      <!-- More rows... -->
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    head: {
      type: Array,
      required: false
    }
  }
}
</script>

<style scoped>
table tr:nth-child(even){
  background:rgba(0,0,0,0.05);
}
</style>
