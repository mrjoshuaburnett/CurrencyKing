<script>
export default {
  name: "exchange-input",
  data: () => ({
    baseCurrency: "USD",
    targetCurrency: "GBP",
    inputValue: 1,
  }),
  mounted() {},
  methods: {
    switchCurrencies() {
      this.targetCurrency = [this.baseCurrency, (this.baseCurrency = this.targetCurrency)][0];
    },
    async saveExchange() {
      var model = {
        baseCurrency: this.baseCurrency,
        targetCurrency: this.targetCurrency,
        exchangeRate: this.exchangeRate,
        amount: this.inputValue,
      };

      var result = await this.$store.dispatch("postRequest", {
        controller: "Exchange",
        method: `CreateOrUpdate`,
        parameters: model,
      });

      this.$emit("rateSaved");
    },
  },
  computed: {
    includedCurrencySymbols() {
      var result = ["USD"];
      return result.concat(Object.keys(this.exchangeRates));
    },
    allCurrencyDescriptions() {
      return this.$store.state.allCurrencyDescriptions;
    },
    allSymbols() {
      return this.$store.state.allCurrencySymbols;
    },
    allDescriptions() {
      return this.$store.state.allCurrencySymbols;
    },
    commonCurrencies() {
      return this.$store.state.commonCurrencies;
    },
    allCurrenciesDropdownSource() {
      var self = this;
      var allDescriptions = this.allCurrencyDescriptions;
      return this.includedCurrencySymbols.map(function (x) {
        return { key: x, value: allDescriptions[x] };
      });
    },
    exchangeRates() {
      return this.$store.state.latestExchangeRates;
    },
    baseCurrencySymbol() {
      var exists = this.allSymbols[this.baseCurrency];

      return exists ?? this.baseCurrency;
    },
    exchangeRate() {
      if (this.baseCurrency == "USD") return this.exchangeRates[this.targetCurrency];

      return this.exchangeRates[this.targetCurrency] / this.exchangeRates[this.baseCurrency];
    },
    outputValue() {
      var rate = this.exchangeRate * this.inputValue;

      return rate.toFixed(4);
    },
  },
};
</script>
<template>
  <v-row v-if="exchangeRates">
    <v-col cols="5">
      <v-text-field
        hide-details="auto"
        outlined
        v-model="inputValue"
        type="number"
        placeholder="Amount"
        :prepend-inner-icon="baseCurrencySymbol"
        label="From"
      ></v-text-field>
    </v-col>
    <v-col cols="3">
      <v-autocomplete
        ref="select"
        v-model="baseCurrency"
        label="From"
        hide-details
        :items="allCurrenciesDropdownSource"
        item-text="value"
        item-value="key"
        outlined
      >
      </v-autocomplete>
    </v-col>
    <v-col cols="1" style="text-align: center">
      <v-icon @click="switchCurrencies" large class="mt-3 mb-3" color="green">mdi-swap-horizontal</v-icon>
    </v-col>
    <v-col cols="3">
      <v-autocomplete
        ref="select"
        v-model="targetCurrency"
        label="To"
        hide-details
        :items="allCurrenciesDropdownSource"
        item-text="value"
        item-value="key"
        outlined
      >
      </v-autocomplete>
    </v-col>
    <v-col cols="12" v-if="exchangeRates">
      <b>{{ inputValue }} {{ allCurrencyDescriptions[baseCurrency] }} = </b><br />
      <label>{{ outputValue }} {{ allCurrencyDescriptions[targetCurrency] }}</label
      ><v-btn class="ml-3" small @click="saveExchange()">Save Converted Rate <v-icon class="ml-2">mdi-content-save</v-icon></v-btn>
    </v-col>
  </v-row>
</template>
<style scoped></style>
