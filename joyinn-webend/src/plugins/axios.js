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

const myAxios = function(addconfig) {
  const _axios = axios.create({ ...config, ...addconfig });

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

  return _axios;
};
const useAxios = myAxios();
Plugin.install = function(Vue) {
  Vue.axios = useAxios;
  window.axios = useAxios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return useAxios;
      }
    },
    $axios: {
      get() {
        return useAxios;
      }
    },
    myAxios: {
      get() {
        return myAxios;
      }
    }
  });
};

Vue.use(Plugin);

export default useAxios;

/* 注于2019.4.7
  * author： wkkk
  这里对axios做了包装，可以自定义传入config参数
*/
