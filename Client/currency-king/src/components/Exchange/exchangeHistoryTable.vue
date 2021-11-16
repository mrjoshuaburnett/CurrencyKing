<script>
export default {
  name: "exchange-history-table",
  props: {
    update: Number,
  },
  data: () => ({
    loading: false,
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Date",
        value: "createdDate",
      },
      {
        text: "Input Value",
        value: "amount",
      },
      {
        text: "Base Currency",
        value: "baseCurrency",
      },
      {
        text: "Target Currency",
        value: "targetCurrency",
      },
      {
        text: "Exchange Rate",
        value: "exchangeRate",
      },
      {
        text: "Converted Value",
        value: "convertedValue",
      },
    ],
    userExchanges: [],
    editedItem: {
      id: null,
      baseCurrency: "",
      targetCurrency: 0,
      exchangeRate: 0,
      amount: 0,
      convertedValue() {
        return this.exchangeRate * amount;
      },
    },
    defaultItem: {
      id: null,
      baseCurrency: "",
      targetCurrency: 0,
      exchangeRate: 0,
      amount: 0,
      convertedValue() {
        return this.exchangeRate * amount;
      },
    },
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    update() {
      this.getExchanges();
    },
  },

  mounted() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.getExchanges();
    },

    async getExchanges() {
      this.loading = true;
      var result = await this.$store.dispatch("getRequest", {
        controller: "Exchange",
        method: `GetExchanges`,
      });
      this.userExchanges = result.data;
      this.loading = false;
    },
    editItem(item) {
      this.editedIndex = this.userExchanges.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.userexchanges.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      this.userExchanges.splice(this.editedIndex, 1);

      await this.$store.dispatch("deleteRequest", {
        controller: "Exchange",
        method: `Delete/${this.editedItem.id}`,
      });
      await this.getExchanges();
      this.closeDelete();
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    async save() {
      await this.$store.dispatch("postRequest", {
        controller: "Exchange",
        method: `CreateOrUpdate`,
        parameters: this.editedItem,
      });
      await this.getExchanges();
      this.close();
    },
  },
};
</script>
<template>
  <v-data-table :headers="headers" :items="userExchanges" class="elevation-1" :loading="loading">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>My Exchange History</v-toolbar-title>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>
<style scoped></style>
