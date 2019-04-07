<template>
  <div class="login">
    <el-row type="flex" class="title_area" justify="center">
      <p class="title">Joy Inn</p>
    </el-row>
    <el-row type="flex" class="input_area" justify="center">
      <el-col :span="6">
        <el-input class="textbox" placeholder="username" v-model="username" clearable></el-input>
        <el-input class="textbox" placeholder="password" v-model="password" show-password></el-input>
      </el-col>
    </el-row>
    <el-row type="flex" class="btn_area" justify="center">
      <el-col :span="6">
        <el-button type="primary" style="width:100%;" v-on:click="submitForm">Login</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    ...mapActions([
      "setUser"
    ]),
    submitForm: function() {
      const { username, password } = this;
      this.$axios
        .post("user/login", {
          username,
          password
        })
        .then(res => {
          if (res.data.code === 0) {
            this.setUser(res.data.user);
            this.$router.push("/");
          } else {
            this.$message.error("账户名或密码错误！");
            this.username = "";
            this.password = "";
          }
        });
    }
  }
};
</script>
<style lang="less">
.title_area {
  margin-top: 100px;
  margin-bottom: 50px;
}
// .input_area {
//   el-col {
//     el-input {
//       margin-bottom: 20px;
//     }
//   }
// }
.textbox {
    margin-bottom: 10px;
}
.btn_area {
  margin-top: 20px;
}
.title {
  font-family: "PingFang SC";
  font-weight: bolder;
  font-size: 20px;
}
</style>
