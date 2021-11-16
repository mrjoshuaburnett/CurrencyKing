<script>
export default {
  name: "top-navigation",
  props: {},
  components: {},
  data: function () {
    return {
      showMobileNavigation: false,
    };
  },
  methods: {
    returnToLanding() {
      this.$router.push({ name: "home" });
    },
    showNavigation() {
      this.showMobileNavigation = true;
    },
    async logout() {
      this.$router.push({ name: "logout" });
    },
  },
  computed: {
    isAuthorised() {
      return this.$store.state.isAuthorised;
    },
    isLandingView() {
      return this.$route.name == "home";
    },
    fullName() {
      return this.$store.state.fullName;
    },
    allNavigationItems() {
      return [
        {
          icon: "mdi-swap-horizontal",
          text: "Home",
          link: "/home",
        },
      ];
    },
  },
  mounted() {},
};
</script>
<template>
  <div v-if="$vuetify.breakpoint.smAndDown" class="top-nav-wrapper">
    <v-container app id="top-nav-mobile">
      <v-row style="text-align: center">
        <v-icon @click.stop="showNavigation" v-if="isAuthorised" style="position: absolute; left: 15px; top: 15px; z-index: 2" color="primary"
          >mdi-menu</v-icon
        >
        <div class="ml-auto mr-auto">
          <v-img
            @click="returnToLanding()"
            contain
            src="https://storage.googleapis.com/restaurant_files_yc/currencyKingTransparent.png"
            height="40px"
            max-width="200px"
            class=""
          ></v-img>
        </div>
      </v-row>
    </v-container>
    <v-navigation-drawer app v-model="showMobileNavigation" v-if="isAuthorised">
      <v-list>
        <v-list-item v-for="(navItem, index) in allNavigationItems" :key="index" :to="navItem.link">
          <v-list-item-title
            ><v-icon>{{ navItem.icon }}</v-icon
            >{{ navItem.text }}</v-list-item-title
          >
        </v-list-item>
        <v-list-item @click="logout">
          <v-list-item-title><v-icon>mdi-logout</v-icon>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>

  <div v-else class="top-nav-wrapper py-5">
    <v-spacer></v-spacer>
    <v-container class="pa-0">
      <v-img
        contain
        @click="returnToLanding()"
        src="https://storage.googleapis.com/restaurant_files_yc/currencyKingTransparent.png"
        height="47px"
        max-width="200px"
        class="float-left ml-0"
      ></v-img>
      <v-spacer></v-spacer>
      <v-menu class="py-0" v-if="isAuthorised" offset-y open-on-hover>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" text class="float-right" v-bind="attrs" v-on="on"
            ><v-icon color="primary" class="float-left">mdi-account</v-icon><span class="hidden-xs-only text-primary">{{ fullName }}</span></v-btn
          >
        </template>
        <v-list>
          <v-list-item v-for="(navItem, index) in allNavigationItems" :key="index" :to="navItem.link">
            <v-list-item-title
              ><v-icon class="float-left">{{ navItem.icon }}</v-icon
              ><span style="float: right">{{ navItem.text }}</span></v-list-item-title
            >
          </v-list-item>
          <v-list-item @click="logout">
            <v-list-item-title><v-icon class="float-left">mdi-logout</v-icon><span style="float: right">Logout</span></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-container>
  </div>
</template>
<style scoped>
.top-nav-wrapper {
  z-index: 99;
  position: absolute;
  width: 100%;
  -webkit-box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.75);
}
.top-nav-wrapper.gradient {
  background-image: linear-gradient(0deg, transparent, #000);
}
.float-left {
  float: left;
}
</style>
