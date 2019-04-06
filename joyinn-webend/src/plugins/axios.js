"use strict";

import Vue from "vue";
import axios from "axios";
import router from "../router";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  baseURL: "http://localhost:3000",
  timeout: 60 * 1000 // Timeout
};

const _axios = axios.create(config);

_axios.defaults.headers.post["Content-Type"] = "application/json";
_axios.defaults.headers.put["Content-Type"] = "application/json";

_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    const my_token = window.localStorage.getItem("token");
    if (my_token) {
      config.headers["Authorization"] = `Bearer ${my_token}`;
    }
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    if (response.data.token) {
      console.log("token:", response.data.token);
      window.localStorage.setItem("token", response.data.token);
    }
    return response;
  },
  function(error) {
    // Do something with response error
    const errRes = error.response;
    if (errRes.status === 401) {
      window.localStorage.removeItem("token");
      router.push("/login");
    }
    return Promise.reject(error);
  }
);

Plugin.install = function(Vue) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    }
  });
};

Vue.use(Plugin);

export default _axios;
