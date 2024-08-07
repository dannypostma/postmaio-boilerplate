<template>
  <thead class="rounded-t-lg bg-gray-50">
    <template v-for="(item, index) in head">
      <th :key="index" class="py-3.5 table-break-all text-left text-sm font-medium text-gray-900 first:pl-4 first:pr-3 last:relative last:pl-3 last:pr-4 first:sm:pl-6 last:sm:pr-6 px-4">
        {{ item }}
      </th>
    </template>
  </thead>
</template>

<script>
export default {
  props: {
    head: {
      type: Array,
      required: true
    }
  }
}
</script>

<style></style>
