<script>
export default {
  data: () => ({
    name: "current-exchange-rates",
    dialog: false,
    dialogDelete: false,
    showAllCurrencies: false,
    headers: [
      {
        text: "Code",
        value: "code",
      },
      {
        text: "Description",
        value: "description",
      },
      {
        text: "Rate",
        value: "rate",
      },
    ],
  }),
  mounted() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.getLatestRates();
    },

    async getLatestRates() {
      var result = await this.$store.dispatch(
        "getRequestExternal",
        "https://freecurrencyapi.net/api/v2/latest?apikey=40bbdf50-4526-11ec-8a3f-e19c0b591bc9"
      );

      //we want to also include the rate for USD to USD for conversions where USD is the target currency (its obviously trivaial, but makes things easier in other queries)
      result.data.data["USD"] = 1;

      this.$store.commit("setLatestExchangeRates", result.data.data);
    },
  },
  computed: {
    exchangeRates() {
      return this.$store.state.latestExchangeRates;
    },
    exchangeRateDate() {
      return this.$store.state.exchangeRateDate;
    },
    tableData() {
      if (!this.exchangeRates) return [];
      var ratesToShow = [];
      var allCurrencyDescriptions = this.allCurrencyDescriptions;
      if (this.showAllCurrencies) {
        ratesToShow = Object.keys(this.exchangeRates);
      } else {
        var common = this.commonCurrencies;
        ratesToShow = Object.keys(this.exchangeRates).filter(function (x) {
          return common.indexOf(x) > -1;
        });
      }
      var self = this;
      return ratesToShow.map(function (x) {
        return { code: x, description: allCurrencyDescriptions[x], rate: self.exchangeRates[x] };
      });
    },
    allCurrencyDescriptions() {
      return this.$store.state.allCurrencyDescriptions;
    },
    commonCurrencies() {
      return this.$store.state.commonCurrencies;
    },
  },
};
</script>
<template>
  <div>
    <v-data-table v-if="exchangeRates" :headers="headers" :items="tableData" class="elevation-1" :hide-default-footer="true" disable-pagination>
      <template v-slot:top>
        <v-row>
          <v-col cols="12">
            <v-toolbar flat>
              <v-toolbar-title style="width: 100%"
                >Current Exchange Rates
                <v-icon title="Refresh Exchange Rates" class="float-right" @click="getLatestRates">mdi-refresh</v-icon></v-toolbar-title
              >
            </v-toolbar>
            <div style="width: 100%" class="px-4">
              <i style="font-size: 12px; display: block">Last Updated {{ exchangeRateDate }}</i>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <div class="px-3">
              <v-btn-toggle v-model="showAllCurrencies" style="width: 100%">
                <v-btn small style="width: 50%" :value="false"> Popular<v-icon class="ml-2">mdi-star</v-icon> </v-btn>

                <v-btn small style="width: 50%" :value="true"> All<v-icon class="ml-2">mdi-format-list-bulleted</v-icon> </v-btn>
              </v-btn-toggle>
            </div>
          </v-col>
        </v-row>
      </template>
    </v-data-table>
  </div>
</template>
<style scoped></style>
