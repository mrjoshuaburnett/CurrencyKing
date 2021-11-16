<script>
import currentExchangeRates from "../components/Exchange/currentExchangeRates.vue";
import exchangeHistoryTable from "../components/Exchange/exchangeHistoryTable.vue";
import exchangeInput from "../components/Exchange/exchangeInput.vue";
export default {
  name: "home",
  components: {
    exchangeHistoryTable,
    currentExchangeRates,
    exchangeInput,
  },
  data: function () {
    return {
      updateCount: 0,
    };
  },
  methods: {
    onRateSaved(val) {
      this.updateCount++;
    },
  },
  computed: {},
};
</script>

<template>
  <v-row>
    <v-col cols="12">
      <exchange-input v-on:rateSaved="onRateSaved"></exchange-input>
    </v-col>
    <v-col cols="4">
      <current-exchange-rates></current-exchange-rates>
    </v-col>
    <v-col cols="8">
      <exchange-history-table :update="updateCount"></exchange-history-table>
    </v-col>
  </v-row>
</template>

<style scoped></style>
