<template>
  <div>
    <Nuxt />
  </div>
</template>
<script>
export default {
  data () {
    return {
      loaded: false
    }
  },
  methods: {
  }
}
</script>

<style >

.overflow-y-auto {
    -ms-overflow-style: none; /* for Internet Explorer, Edge */
    scrollbar-width: none; /* for Firefox */
    overflow-y: scroll;
}

div::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
}
</style>
