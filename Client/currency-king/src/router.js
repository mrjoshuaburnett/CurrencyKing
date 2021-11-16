import Vue from "vue";
import Router from "vue-router";
import store from "./store";

Vue.use(Router);

let router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/login",
      alias: "/",
      name: "login",
      component: () => import("./views/Login.vue"),
      meta: {
        requiresAuth: false,
        title: "Login",
      },
    },
    {
      path: "/account",
      name: "account",
      component: () => import("./views/Account.vue"),
      meta: {
        requiresAuth: true,
        title: "Account",
      },
    },
    {
      path: "/about",
      name: "about",
      component: () => import("./views/About.vue"),
      meta: {
        requiresAuth: true,
        title: "About",
      },
    },
    {
      path: "/home",
      name: "home",
      component: () => import("./views/Home.vue"),
      meta: {
        requiresAuth: true,
        title: "About",
      },
    },
    {
      path: "/logout",
      name: "logout",
      component: () => import("./views/Login.vue"),
    },
    {
      path: "*",
      redirect: "/",
    },
  ],
});
router.beforeEach(async (to, from, next) => {
  if (to.name == "logout") {
    await store.dispatch("logout");
  } else {
    if (store.state.initialLoad) {
      await store.dispatch("authenticate");
    }
    var isAuth = store.state.isAuthorised;

    if (!isAuth) {
      if (to.name == "login") {
        next();
      } else {
        next({
          path: "/login",
          params: {
            redirect: true,
          },
        });
      }
    } else {
      if (to.name == "login") {
        next({
          path: "/home",
        });
      } else {
        next();
      }
    }
  }
});

export default router;
