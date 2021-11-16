<script>
export default {
  name: "password-reset-modal",
  components: {},
  data: function () {
    return {
      email: "",
      emailRules: [(v) => !!v || "Email is required", (v) => this.validateEmail(v) || "Invalid Email Address"],
    };
  },
  methods: {
    async resetPassword() {
      this.closeModal();

      var result = await this.$store.dispatch("getRequest", {
        controller: "Login",
        method: `resetPassword`,
        parameters: { email: this.email },
      });
      if (result) {
        this.$store.commit("setMessage", {
          title: "Password reset",
          type: "success",
          content: `Please check your email inbox for instructions on how to reset your password.`,
        });
      }
    },
    closeModal() {
      this.$store.commit("setPasswordResetModalVisible", false);
    },
    validateEmail(email) {
      return validateEmail(email);
    },
  },
  computed: {
    visible() {
      return this.$store.state.passwordResetModalVisible;
    },
  },
  async mounted() {},
};
</script>
<template>
  <v-row justify="center">
    <v-dialog v-model="visible" scrollable v-on:click:outside="closeModal" :fullscreen="$vuetify.breakpoint.xs" width="500">
      <v-card>
        <v-card-title class="login-modal-header" :class="$vuetify.breakpoint.xs ? 'mobile' : ''">
          <span class="headline primary--text">Reset Password</span>
          <v-btn icon dark @click="closeModal()" style="position: absolute; right: 5px">
            <v-icon color="primary">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" style="text-align: center" class="mt-3">
              <v-text-field
                hide-details="auto"
                outlined
                v-model="email"
                placeholder="Enter your email address"
                append-icon="mdi-email"
                label="Email Address"
                :rules="emailRules"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" style="text-align: center">
              <v-btn rounded color="primary" style="width: 100%" :disabled="!email" v-on:click="resetPassword()"
                >Reset Password<v-icon color="white" class="icon-right">mdi-email-send-outline</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<style scoped></style>
