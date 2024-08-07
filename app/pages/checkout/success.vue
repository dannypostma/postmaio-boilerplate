<template>
  <PrecheckoutWrapper>
    <section class="py-8 sm:py-12">
      <div class="max-w-screen-xl px-5 mx-auto sm:px-6 lg:px-8">
        <div class="max-w-sm mx-auto md:text-center">
          <svg
            aria-hidden="true"
            class="mx-auto size-12 text-[#65C466]"
            viewBox="0 0 52 52"
            fill="none"
            stroke="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.5834 19.4997C20.5834 20.098 20.0983 20.583 19.5 20.583C18.9017 20.583 18.4167 20.098 18.4167 19.4997M20.5834 19.4997C20.5834 18.9014 20.0983 18.4163 19.5 18.4163C18.9017 18.4163 18.4167 18.9014 18.4167 19.4997M20.5834 19.4997H18.4167M33.5834 19.4997C33.5834 20.098 33.0984 20.583 32.5 20.583C31.9017 20.583 31.4167 20.098 31.4167 19.4997M33.5834 19.4997C33.5834 18.9014 33.0984 18.4163 32.5 18.4163C31.9017 18.4163 31.4167 18.9014 31.4167 19.4997M33.5834 19.4997H31.4167M26 47.6663C14.0339 47.6663 4.33337 37.9658 4.33337 25.9997C4.33337 14.0335 14.0339 4.33301 26 4.33301C37.9662 4.33301 47.6667 14.0335 47.6667 25.9997C47.6667 37.9658 37.9662 47.6663 26 47.6663ZM36.8334 28.1663C36.8334 28.1663 34.1246 36.833 26 36.833C17.8755 36.833 15.1667 28.1663 15.1667 28.1663H36.8334Z"
              stroke-width="4.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <h1 class="mt-4 text-xl font-bold tracking-tight text-primary-500">
            Thank you for your purchase!
          </h1>
          <p class="mt-2 text-base font-medium text-gray-600 md:max-w-sm md:mx-auto">
            Your purchase means a lot to me. My course will launch in Q4 of 2024. I will keep you updated on the progress. In the meantime, follow me on <a href="https://www.twitter.com/dannypostmaa" target="_blank" class="underline">Twitter</a> to keep in touch.
          </p>
          <hr class="mb-4 mt-4">
          <h3 class="font-bold">
            Which email can I send updates to?
          </h3>
          <LoadingWrapper :is-loading="isLoading">
            <div class="flex items-center justify-start space-x-2 mt-2">
              <input v-model="email" class="w-full bg-gray-100 border border-gray-200 rounded-md px-4 py-2" type="email" placeholder="Enter your email address">
              <ButtonPrimary class="bg-orange-500 h-10" size="sm" @click="saveEmail">
                Save email
              </ButtonPrimary>
            </div>
          </LoadingWrapper>
          <hr class="mb-4 mt-4">
          <nuxt-link target="_blank" :to="`/portal?transactionid=${transactionId}`" class="text-gray-600 text-sm underline ">
            📄 Download your invoice
          </nuxt-link>
        </div>
      </div>
    </section>
  </PrecheckoutWrapper>
</template>

<script>
/* eslint-disable */
export default {
  head () {
    return {
      title: 'Thank you',
      email: ''
    }
  },
  data () {
    return {
      isLoading: false
    }
  },
  computed: {
    transactionId() {
      return this.$route.query.transactionid
    }
  },
  methods: {
    async saveEmail() {
      try{
        this.isLoading = true
        const response = await this.$axios.$post('/sales/email', {
          transactionId: this.transactionId,
          email: this.email
        })
        if(response && response.success){
          this.$toast.success(`Added email ${response.data.email} succesfully.`)
        }
        this.isLoading = false
      }catch(err){
        this.$toast.error(err.message)
        this.isLoading = false
      }
    }
  },

}
</script>
