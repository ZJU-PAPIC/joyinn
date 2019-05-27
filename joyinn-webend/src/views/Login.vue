<template>
  <div class="login">
    <div id="web_bg"></div>
    <el-row type="flex" justify="center">
      <el-col :span="6" class="box">
        <el-row type="flex" class="title_area" justify="center">
          <p class="title">Joy Inn</p>
        </el-row>
        <div v-if="type==='login'">
          <!-- login area -->
          <el-row type="flex" class="input_area" justify="center">
            <el-col :span="20">
              <el-input class="textbox" placeholder="username" v-model="username" clearable></el-input>
              <el-input class="textbox" placeholder="password" v-model="password" show-password></el-input>
            </el-col>
          </el-row>
          <el-row type="flex" class="btn_area" justify="center">
            <el-col :span="20">
              <el-button type="primary" style="width:100%;" v-on:click="handleLogin">Login</el-button>
            </el-col>
          </el-row>
          <el-row type="flex" justify="center">
            <el-col :span="20">
              <el-button v-on:click="type='mail'" type="text">Register</el-button>
            </el-col>
          </el-row>
        </div>
        <div v-if="type==='mail'">
          <!-- mail area -->
          <el-row type="flex" class="input_area" justify="center">
            <el-col :span="20">
              <el-input class="textbox" placeholder="用户名" v-model="username" clearable></el-input>
              <el-input class="textbox" placeholder="浙大邮箱验证" v-model="mailAddr"></el-input>
              <el-button
                type="success"
                v-on:click="handleMailer"
                style="width:100%;margin-bottom:10px"
              >发送邮件</el-button>
              <el-input class="textbox" placeholder="填写验证码" v-model="validcode"></el-input>
            </el-col>
          </el-row>
          <el-row type="flex" class="btn_area" justify="center">
            <el-col :span="20">
              <el-button type="primary" style="width:100%;" v-on:click="checkValidcode">Next</el-button>
            </el-col>
          </el-row>
          <el-row type="flex" justify="center">
            <el-col :span="20">
              <el-button v-on:click="type='login'" type="text">Back</el-button>
            </el-col>
          </el-row>
        </div>
        <div v-if="type==='register'">
          <!-- register area -->
          <el-row type="flex" class="input_area" justify="center">
            <el-col :span="20">
              <el-input class="textbox" placeholder="username" v-model="username" disabled></el-input>
              <el-input class="textbox" placeholder="密码" v-model="password" show-password></el-input>
              <el-input class="textbox" placeholder="昵称" v-model="nickname"></el-input>
              <el-select v-model="gender" placeholder="请选择性别" style="width:100%;">
                <el-option
                  v-for="item in ['male','female']"
                  :key="item.value"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row type="flex" class="btn_area" justify="center">
            <el-col :span="20">
              <el-button type="primary" style="width:100%;" v-on:click="handleRegister">Register</el-button>
            </el-col>
          </el-row>
          <el-row type="flex" justify="center">
            <el-col :span="20">
              <el-button v-on:click="type='login'" type="text">Login</el-button>
            </el-col>
          </el-row>
        </div>
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
      password: "",
      type: "login",
      validcode: "",
      nickname: "",
      gender: "",
      mailAddr: ""
    };
  },
  methods: {
    ...mapActions(["setUser"]),
    handleLogin: function() {
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
          } else if (res.data.code === 4001) {
            this.$message.error("该用户尚未注册");
            this.username = "";
            this.password = "";
          } else if (res.data.code === 4002) {
            this.$message.error("账户名或密码错误");
            this.username = "";
            this.password = "";
          }
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    handleRegister: function() {
      const { username, password, gender, nickname } = this;
      this.$axios
        .post("user/register", {
          username,
          password,
          gender,
          nickname
        })
        .then(res => {
          if (res.data.code === 0) {
            this.$message({
              message: "新用户注册成功",
              type: "success"
            });
            this.type = "login";
          } else if (res.data.code === 4002) {
            this.$message.error("该用户名已被注册！");
            this.username = "";
            this.password = "";
          } else if (res.data.code === 4001) {
            this.$message.error(
              "密码不符合规范：密码不少于8位"
            );
            this.password = "";
          } else if (res.data.code === 4003) {
            this.$message.error("浙大邮箱未验证成功");
          } else if (res.data.code === 4004) {
            this.$message.error("未知错误");
          }
        });
    },
    handleMailer: function() {
      const { username, mailAddr } = this;
      this.$axios
        .post("user/mailtozju", {
          username,
          mailAddr
        })
        .then(res => {
          if (res.data.code === 0) {
            this.$message({
              message: "验证码邮件已发送到" + mailAddr,
              type: "success"
            });
          } else if (res.data.code === 4001) {
            this.$message.error("该用户已注册");
            this.username = "";
          } else if (res.data.code === 4002) {
            this.$message.error("该用户不符合规范：应不少于6位");
          } else if (res.data.code === 4003) {
            this.$message.error("请输入正确的浙大邮箱");
          }
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    checkValidcode: function() {
      const { username, mailAddr, validcode } = this;
      this.$axios
        .post("user/checkvalidcode", {
          username,
          mailAddr,
          validcode
        })
        .then(res => {
          if (res.data.code === 0) {
            this.$message({
              message: "验证ZJU邮箱成功",
              type: "success"
            });
            this.type = "register";
          } else if (res.data.code === 4001) {
            this.$message.error("验证码错误");
            this.validcode = "";
          } else if (res.data.code === 4002) {
            this.$message.error("请正确填写");
          }
        })
        .catch(err => {
          this.$message.error(err);
        });
    }
  }
};
</script>
<style scoped>
#web_bg {
  background-image: url("http://static.oneplus.cn/data/attachment/forum/201902/14/094556jol85zsos89g2188.jpg");
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-width: 1000px;
  z-index: -10;
  zoom: 1;
  background-color: #fff;
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
  /* 虚化 */
  /* filter: blur(2px); */
}
.box {
  margin-top: 80px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding-top: 20px;
  padding-bottom: 20px;
}
.title_area {
  margin-bottom: 30px;
}
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
.inline {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
