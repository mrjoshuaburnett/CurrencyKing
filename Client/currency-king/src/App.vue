<script>
import topNavigation from "./components/layout/topNavigation.vue";
import fullScreenLoadingWheel from "./components/fullScreenLoadingWheel.vue";

export default {
  name: "App",
  components: {
    topNavigation,
    fullScreenLoadingWheel,
  },
  computed: {
    isAuthorised() {
      return this.$store.state.isAuthorised;
    },
    isLoading() {
      return this.$store.state.showLoader;
    },
  },
};
</script>

<template>
  <v-app>
    <top-navigation v-if="isAuthorised"></top-navigation>
    <v-main v-if="isAuthorised" style="padding-top: 87px">
      <v-container class="py">
        <router-view :key="$route.fullPath" />
      </v-container>
    </v-main>
    <v-main v-else>
      <router-view :key="$route.fullPath" />
    </v-main>
    <full-screen-loading-wheel v-if="isLoading" style="z-index: 9999"></full-screen-loading-wheel>
  </v-app>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
