import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Lab from "./views/Lab.vue";
import EssayEdit from "./views/EssayEdit.vue";
import Auth from "./utils/auth";
import axios from "./plugins/axios";
import store from "./store";

Vue.use(Router);
let router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        requireAuth: true
      }
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        requireAuth: false
      }
    },
    {
      path: "/lab",
      name: "lab",
      component: Lab,
      meta: {
        requireAuth: true
      }
    },
    {
      path: "/essay/edit",
      name: "essayedit",
      component: EssayEdit,
      meta: {
        requireAuth: true
      }
    }
  ]
});
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token") || null;
  console.log(store.state.user);

  if (to.matched.some(record => record.meta.requireAuth)) {
    if (!Auth.loggedIn(token)) {
      next("/login");
    } else {
      if (!store.state.user.isLogin) {
        axios.get("/user/getuserinfo").then(res => {
          console.log(res.data);
          store.dispatch("setUser", res.data.user);
          next();
        });
      } else next();
    }
  } else if (to.path === "/login" && Auth.loggedIn(token)) {
    next("/");
  } else {
    next();
  }
});
export default router;
