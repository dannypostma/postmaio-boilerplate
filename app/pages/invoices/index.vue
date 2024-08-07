<template>
  <div class="flex items-center flex-col justify-center h-screen w-full bg-gray-100 ">
    <h3 class="font-bold text-center text-xl mb-2">
      Manage invoices
    </h3>
    <p class="text-sm text-gray-700 max-w-lg text-center mx-auto mt-1 mb-3">
      Add the email you used to make a purchase with or the email you updated on the "thank you" screen.
    </p>
    <LoadingWrapper :is-loading="isLoading">
      <template v-if="!invoices || invoices.length === 0">
        <div class="flex items-center justify-start space-x-2">
          <input v-model="email" class="border border-gray-300 rounded-md p-2" type="text" placeholder="Email">
          <ButtonPrimary @click="goToPortal">
            Fetch invoices
          </ButtonPrimary>
        </div>
      </template>
      <template v-else>
        <Table :head="['Date', 'Order ID', 'Status', 'Amount', 'Product', 'Action']">
          <template v-for="invoice in invoices">
            <TableRow v-if="invoice.amountTotal" :key="invoice.id">
              <TableItem>
                {{ formatDate(invoice.createdAt) }}
              </TableItem>
              <TableItem>
                {{ invoice._id }}
              </TableItem>
              <TableItem>
                <span v-if="invoice.status === 'refunded'" class="text-orange-500">{{ slugToTitle(invoice.status) }}</span>
                <span v-else>{{ slugToTitle(invoice.status) }}</span>
              </TableItem>
              <TableItem>
                <span
                  :class="{
                    'line-through': invoice.status === 'refunded'
                  }"
                >
                  ${{ invoice.amountTotal/100 }}
                </span>
              </TableItem>
              <TableItem>
                {{ invoice?.price?.name || '' }}
              </TableItem>
              <TableItem>
                <nuxt-link :to="`/invoices/invoice?id=${invoice._id}&amount_captured=${invoice.amountTotal}&created=${invoice.createdAt}&currency=${invoice.currency || 'usd'}&refunded=${invoice.status === 'refunded' ? 1 : 0}&amountRefunded=${invoice.status === 'refunded' ? invoice.amountRefunded : 0}`" target="_blank">
                  <ButtonWhite size="xs">
                    View invoice
                  </ButtonWhite>
                </nuxt-link>
              </TableItem>
            </TableRow>
          </template>
        </Table>
      </template>
    </LoadingWrapper>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: null,
      isLoading: false,
      invoices: []
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
  mounted () {
    if (this.$route.query.email && this.$route.query.email.length > 0) {
      this.email = this.$route.query.email
      this.goToPortal()
    };
  },
  methods: {
    async goToPortal () {
      try {
        this.isLoading = true
        const response = await this.$axios.$post('/sales/invoice/all', {
          ...(this.transactionId) ? { transactionId: this.transactionId } : {},
          ...(this.stripePaymentId) ? { stripePaymentId: this.stripePaymentId } : {},
          ...(this.email) ? { email: this.email } : {}
        })
        if (response && response.success) {
          this.invoices = response.data.invoices
        } else {
          this.$toast.error(response.message)
        }
        this.isLoading = false
        console.log(response)
      } catch (err) {
        this.isLoading = false
        console.log(err)
      }
    },
    formatDate (oldDate) {
      const date = new Date(oldDate)
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return date.toLocaleDateString('en-us', options)
    },
    slugToTitle (slug, capitalizeFirstLetter = true) {
      try {
        const words = slug.split('-')

        for (let i = 0; i < words.length; i++) {
          const word = words[i]
          if (capitalizeFirstLetter) {
            words[i] = word.charAt(0).toUpperCase() + word.slice(1)
          } else if (i === 0) {
            words[i] = word.charAt(0).toUpperCase() + word.slice(1)
          }
        }

        return words.join(' ')
      } catch (err) {
        return slug
      }
    }
  }

}
</script>

<style>

</style>
