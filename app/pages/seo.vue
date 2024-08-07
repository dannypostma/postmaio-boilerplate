<template>
  <div>
    <header class="py-4 bg-white sm:py-5" x-data="{expanded: false}">
      <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div class="flex items-center justify-between">
          <div class="shrink-0 flex items-center justify-start space-x-3">
            <img class="w-auto h-10 rounded-full" src="@/assets/img/logo.jpg" alt="">
            <strong>Danny Postma</strong>
          </div>

          <div class="hidden sm:flex sm:items-center sm:justify-end sm:space-x-4 sm:ml-auto">
            <nuxt-link to="/portal" title="" class="inline-flex items-center justify-center px-4 py-2.5 text-base font-medium text-gray-900 transition-all duration-200 border border-transparent rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring-300">
              Invoice
            </nuxt-link>
            <LoadingWrapper :is-loading="isPaying || isLoading">
              <button
                href="#"
                title=""
                class="inline-flex items-center justify-center px-6 py-2.5 text-base font-medium text-gray-900 transition-all duration-200 border border-gray-900 rounded-full hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring-900"
                role="button"
                @click="toCheckout"
              >
                Preorder now
              </button>
            </LoadingWrapper>
          </div>
        </div>
      </div>
    </header>

    <section class="py-12 overflow-hidden bg-white sm:py-16 lg:pb-20 xl:pb-48">
      <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div class="grid items-center grid-cols-1 lg:grid-cols-2 gap-y-12 gap-x-8">
          <div>
            <h3 class="font-medium text-lg text-gray-700 mb-2">
              Video course launching in Q4 2024
            </h3>
            <h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl xl:text-5xl sm:tracking-[-3px]">
              Master SEO and never worry about marketing again.
            </h1>
            <p class="mt-6 text-lg leading-7 text-gray-700 lg:leading-8 lg:text-xl">
              I'll teach you everything you need to know about SEO. From keyword research to pSEO, I got you covered. Get a look inside the kitchen of how me and my team made 10+ of my websites rank #1 in Google.
            </p>
            <LoadingWrapper :is-loading="isPaying || isLoading">
              <div class="mt-8 flex flex-col md:flex-row items-center justify-start space-x-4">
                <button
                  title=""
                  class="inline-flex items-center justify-center w-full px-8 py-4 text-base font-medium text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700"
                  role="button"
                  @click="toCheckout"
                >
                  <span class="flex-shrink-0"> Pre-order now for ${{ price/100 }} <strike class="text-white/50">$129</strike></span>
                </button>

                <div class="relative w-full">
                  <div class="flex items-center justify-between">
                    <span class="text-sm">Limited discount</span>
                    <div class="text-gray-600 text-xs text-right">
                      <!-- <span class="font-semibold"> {{ total }}</span> spots left <span class="text-gray-400">({{ sold }} sold)</span> -->
                      <span class="font-semibold">{{ sold }}</span> sold already
                    </div>
                  </div>
                  <div class="w-full bg-gray-400 rounded-full my-2 h-2">
                    <div class="bg-orange-500 h-full rounded-full" :style="{ width: `${total*100/batchSize}%` }" />
                  </div>
                </div>
              </div>
            </LoadingWrapper>

            <ul class="mt-10 space-y-4">
              <li class="flex items-center">
                <svg
                  class="w-6 h-6 mr-2 text-blue-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Video course launching in Q4 2024
              </li>

              <li class="flex items-center">
                <svg
                  class="w-6 h-6 mr-2 text-blue-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Step-by-step guide for beginners.
              </li>
            </ul>
          </div>

          <div>
            <div class="relative w-full max-w-sm mx-auto">
              <div class="absolute inset-y-0 w-screen translate-y-20 left-1/2 bg-blue-50 lg:left-32 lg:right-0" />

              <img class="relative object-cover w-full max-w-xs mx-auto sm:max-w-sm rounded-2xl" src="@/assets/img/hero.jpg" alt="">
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isPaying: false,
      price: 4900,
      total: 100,
      sold: 120,
      isLoading: true,
      batchSize: 1500
    }
  },
  async created () {
    await this.fetchPrice()
    this.isLoading = false
  },
  methods: {
    async fetchPrice () {
      const response = await this.$axios.$get('/sales/total')
      if (response && response.success) {
        this.price = response.data.price
        this.total = response.data.total
        this.sold = response.data.sold
        this.batchSize = response.data.batchSize
      }
    },
    async toCheckout () {
      try {
        this.isPaying = true
        const { success, data, errorMessage } = await this.$axios.$post('/checkout/stripe/create-checkout-session')
        if (!success) {
          throw new Error(errorMessage)
        }
        window.location.href = data.url
      } catch (err) {
        this.$toast.error(err.message)
      } finally {
        setTimeout(() => {
          this.isPaying = false
        }, 5000)
      }
    }
  }
}
</script>

<style>

</style>
