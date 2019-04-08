import Vue from "vue";
import Vuex from "vuex";
import axios from "./plugins/axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      currentUser: null,
      isLogin: false
    },
    says: null
  },
  mutations: {
    userStatus(state, user) {
      if (user) {
        state.user.currentUser = user;
        state.user.isLogin = true;
      } else if (user === null) {
        state.user.currentUser = null;
        state.user.isLogin = false;
      }
    },
    setSays(state, says) {
      state.says = says;
    },
    pushSay(state, say) {
      state.says.unshift(say);
    }
  },
  actions: {
    setUser({ commit }, user) {
      commit("userStatus", user);
    },
    async readSays({ commit }) {
      const res = await axios.get("say/");
      console.log("res", res);
      if (res.data.code === 0) {
        commit("setSays", res.data.says);
      } else {
        console.log("get says fail!");
      }
    }
  }
});
