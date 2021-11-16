<script>
import passwordResetModal from "./passwordResetModal.vue";
export default {
  name: "login-modal",
  components: { passwordResetModal },
  data: function () {
    return {
      email: "",
      password: "",
      fullName: "",
      showPassword: false,
      autofilledPassword: false,
      autoFilledEmail: false,
      emailRules: [(v) => !!v || "Email is required", (v) => this.validateEmail(v) || "Invalid Email Address", (v) => !this.invalidDetails || ""],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => !this.invalidDetails || "An account was not found with that email address or password",
      ],
      nameRules: [(v) => !!v || "Name is required"],
      invalidDetails: false,
      isSignUp: false,
    };
  },
  methods: {
    async attemptLogin() {
      var self = this;
      if (this.isValid()) {
        this.$store.commit("setLoadingAnimation", true);
        var result = await this.$store.dispatch("postRequest", {
          controller: "Login",
          method: `attemptLogin`,
          parameters: { email: this.email, password: this.password },
          form: true,
        });
        this.$store.commit("setLoadingAnimation", false);
        if (result) {
          self.$store.commit("setUserData", result);
          self.$router.push({
            path: "/home",
          });
        } else {
          this.invalidDetails = true;
          this.isValid();
        }
      }
    },
    async signUp() {
      var self = this;
      if (this.isValid()) {
        this.$store.commit("setLoadingAnimation", true);
        var result = await this.$store.dispatch("postRequest", {
          controller: "Login",
          method: `signup`,
          parameters: { email: this.email, name: this.fullName },
          form: true,
          returnError: true,
        });
        this.$store.commit("setLoadingAnimation", false);
        if (result) {
          self.$store.commit("setUserData", result);
          self.$router.push({
            path: "/home",
          });
        } else {
          return false;
        }
      }
    },
    onSignUpClick() {
      this.isSignUp = !this.isSignUp;
      this.$refs.form.reset();
      this.email = "";
      this.password = "";
      this.fullName = "";
    },
    validateEmail(email) {
      return validateEmail(email);
    },
    isValid() {
      return this.$refs.form.validate();
    },

    onPasswordResetClick() {
      this.$store.commit("setPasswordResetModalVisible", true);
    },
  },
  computed: {},
  async mounted() {},
  watch: {
    password() {
      this.autofilledPassword = true;
      this.invalidDetails = false;
    },
    email() {
      this.autoFilledEmail = true;
      this.invalidDetails = false;
    },
  },
};
</script>
<template>
  <v-row style="position: relative" class="login-bg fill-height" align="center" justify="center">
    <v-img
      style="position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px"
      lazy-src="@/assets/images/login-bg-low-res.jpg"
      height="100%"
      width="100%"
      src="@/assets/images/login-bg.jpg"
    ></v-img>
    <v-col sm="8" md="6" lg="4">
      <v-card class="pa-5">
        <v-row align="center" justify="center">
          <v-col cols="8" lg="6">
            <v-img
              contain
              src="https://storage.googleapis.com/restaurant_files_yc/currencyKingTransparent.png"
              style="margin: auto"
              width="70%"
            ></v-img>
          </v-col>
        </v-row>

        <v-form ref="form">
          <v-row justify="center">
            <v-col cols="12">
              <v-text-field
                hide-details="auto"
                outlined
                v-model="email"
                :placeholder="!autoFilledEmail ? ' ' : ''"
                append-icon="mdi-email"
                label="Email Address"
                :rules="emailRules"
              ></v-text-field>
            </v-col>
            <v-col cols="12" v-if="!isSignUp">
              <v-text-field
                hide-details="auto"
                outlined
                v-model="password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                label="Password"
                :placeholder="!autofilledPassword ? ' ' : ''"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
                :rules="passwordRules"
              ></v-text-field>
            </v-col>
            <template v-else>
              <v-col cols="12">
                <v-text-field hide-details="auto" outlined v-model="fullName" label="Name" :rules="nameRules"></v-text-field>
              </v-col>
            </template>
          </v-row>
          <v-row>
            <v-col cols="12" style="text-align: center">
              <v-btn v-if="!isSignUp" rounded color="primary" x-large style="width: 100%" v-on:click="attemptLogin()"
                >Login<v-icon color="white" class="icon-right">mdi-login-variant</v-icon>
              </v-btn>
              <v-btn v-else rounded color="primary" x-large style="width: 100%" :disabled="!fullName || !email" v-on:click="signUp()"
                >Sign Up Now<v-icon color="white" class="icon-right">mdi-login-variant</v-icon>
              </v-btn>
              <span class="forgotten-password no-account" v-on:click="onPasswordResetClick">Forgotten your password? Click here to reset it</span>
            </v-col>
          </v-row>
          <v-row align="center" class="mx-0">
            <v-col cols="12" style="text-align: center" v-on:click="onSignUpClick">
              <span class="no-account">{{
                isSignUp ? "Already have an account? Click here to login" : "Don't have an account? Click here to sign up now!"
              }}</span>
            </v-col>
          </v-row>
        </v-form>
      </v-card>

      <password-reset-modal></password-reset-modal>
    </v-col>
  </v-row>
</template>

<style scoped>
.login-bg {
  background-size: cover;
  background-position: center;
}
</style>
