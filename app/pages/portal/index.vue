<template>
  <div class="flex items-center flex-col justify-center h-screen w-full bg-gray-100">
    <h3 class="font-bold text-center text-xl mb-2">
      Manage payment and invoices
    </h3>
    <LoadingWrapper :is-loading="isLoading">
      <template v-if="!transactionId && !stripePaymentId">
        <div class="flex items-center justify-start space-x-2">
          <input v-model="email" class="border border-gray-300 rounded-md p-2" type="text" placeholder="Email">
          <ButtonPrimary @click="goToPortal">
            Go to portal
          </ButtonPrimary>
        </div>
      </template>
      <template v-else>
        <ButtonPrimary @click="goToPortal">
          Go to Portal
        </ButtonPrimary>
      </template>
    </LoadingWrapper>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: null,
      isLoading: false
    }
  },
  computed: {
    transactionId () {
      return this.$route.query.transactionid
    },
    stripePaymentId () {
      return this.$route.query.paymentid
    }
  },
  methods: {
    async goToPortal () {
      try {
        this.isLoading = true
        const response = await this.$axios.$post('/checkout/stripe/portal', {
          ...(this.transactionId) ? { transactionId: this.transactionId } : {},
          ...(this.stripePaymentId) ? { stripePaymentId: this.stripePaymentId } : {},
          ...(this.email) ? { email: this.email } : {}
        })
        if (response && response.success) {
          window.location.href = response.data.url
        } else {
          this.$toast.error(response.message)
        }
        this.isLoading = false
        console.log(response)
      } catch (err) {
        this.isLoading = false
        console.log(err)
      }
    }
  }

}
</script>

<style>

</style>
