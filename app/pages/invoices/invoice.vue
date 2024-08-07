<template>
  <div class="w-full h-full m-0 text-black bg-gray-200 py-8">
    <LoadingWrapper :is-loading="isLoading" class="text-black" title="Generating invoice...">
      <div class="flex flex-col md:flex-row items-start justify-center space-y-4 md:space-y-0 md:space-x-8">
        <Card class="w-full md:w-[400px] print:hidden">
          <div class="p-4 space-y-2">
            <textarea v-model="billingInformation" class="bg-gray-100 rounded p-2 border border-gray-200 w-full" autocomplete="street-address" label="Billing information" placeholder="Enter your company information here" />
            <ButtonPrimary class="w-full" size="sm" @click="print">
              Print/save
            </ButtonPrimary>
          </div>
        </Card>
        <div class="page">
          <div class="right">
            <h1>Invoice</h1>
            <p>
              <strong>Invoice number:</strong>
            </p>
            <p class="text-sm">
              {{ charge.id }}
            </p>
            <br>
            <strong>Date of issue:</strong>
            <p class="text-sm">
              {{ formatDate(charge.created) }}
            </p>
            <br>
            <strong>Date paid:</strong>
            <p class="text-sm">
              {{ formatDate(charge.created) }}
            </p>
            <br>
          </div>

          <h1>
            <!-- <?/*$config['brand']*/?> -->
            <LogoBlack class="w-24 mb-6" />
          </h1>

          <p>
            YOUR COMPANY DATA
          </p>

          <div class="mt-4">
            <strong>Bill to</strong>
            <br>
            <p style="white-space: pre;" v-html="billingInformation" />
          </div>

          <table class="mt-8">
            <thead>
              <tr>
                <th>Description</th>
                <th>Qty</th>
                <th>Unit price</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr style="background: #efefef; border-bottom: 1px solid #000">
                <td>Purchase</td>
                <td>1</td>
                <td>
                  ${{ charge.amountCaptured / 100 }}
                </td>
                <td>
                  ${{ charge.amountCaptured / 100 }}
                </td>
              </tr>
              <tr v-if="charge.refunded" style="background: #fff; border-bottom: 1px solid #000">
                <td>
                  Refund
                </td>
                <td>1</td>
                <td>
                  <span v-if="charge?.amountRefunded > 0">
                    -${{ charge.amountRefunded / 100 }}
                  </span>
                  <span v-else>
                    -${{ charge.amountCaptured / 100 }}
                  </span>
                </td>
                <td>
                  <span v-if="charge?.amountRefunded > 0">
                    -${{ charge.amountRefunded / 100 }}
                  </span>
                  <span v-else>
                    -${{ charge.amountCaptured / 100 }}
                  </span>
                </td>
              </tr>
              <tr>
                <td />
                <td />
                <td>Subtotal</td>
                <td>
                  ${{ subtotal / 100 }}
                </td>
              </tr>
              <tr>
                <td />
                <td />
                <td style="background: #efefef; border-top: 1px solid #000; border-bottom: 1px solid #000">
                  <strong>Amount paid</strong>
                </td>
                <td style="background: #efefef; border-top: 1px solid #000; border-bottom: 1px solid #000">
                  <strong>
                    ${{ subtotal / 100 }}
                  </strong>
                </td>
              </tr>
            </tbody>
          </table>

          <br>
          <br>

          <br>
          <br>

          <p>Press CMD/CTRL+S to save.</p>
        </div>
      </div>
    </LoadingWrapper>
  </div>
</template>

<script>
export default {
  layout: 'empty',
  data () {
    return {
      billingInformation: null,
      charge: {
        id: null,
        amountCaptured: null,
        created: null,
        currency: null,
        refunded: false,
        amountRefunded: 0
      },
      isLoading: true
    }
  },
  head () {
    return {
      title: 'Invoice'
    }
  },
  computed: {
    subtotal () {
      if (this.charge.refunded) {
        if (this.charge.amountRefunded > 0) {
          return Math.max(0, this.charge.amountCaptured - this.charge.amountRefunded)
        } else {
          return 0
        }
      }

      return this.charge.amountCaptured
    }
  },
  mounted () {
    this.charge.id = this.$route.query.id
    this.charge.amountCaptured = this.$route.query.amount_captured
    this.charge.created = this.$route.query.created
    this.charge.currency = this.$route.query.currency
    this.charge.refunded = this.$route.query.refunded === '1'
    this.charge.amountRefunded = Math.min(this.charge.amountCaptured, this.$route.query.amountRefunded || 0)

    this.isLoading = false
  },
  methods: {
    print () {
      window.print()
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

<style scoped>
.page {
  max-width: 700px;
  position: relative;
  border: 1px solid #efefef;
  background: #fff;
  padding: 56px;
  height: 1000px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.5);
}
.right {
  position: absolute;
  right: 56px;
  top: 56px;
  text-align: right;
}
h1,
strong {
  font-weight: 600;
}
p {
  font-weight: 400;
}
table {
  width: 100%;
  border-collapse: collapse;
}
table thead th {
  border-bottom: 1px solid #000;
  padding: 14px;
  text-align: left;
}
table td {
  padding: 14px;
}

@media print {
  .page {
    box-shadow: none;
    border: none;
    max-width: none;
    height: auto;
    padding: 14px;
    margin: 14px;
  }
  .right {
    top: 14px;
    right: 14px;
  }
  body {
    background: #fff;
    padding: 14px;
  }
}
</style>
