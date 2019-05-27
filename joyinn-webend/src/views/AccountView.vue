<template>
  <div class="accountview">
    <Header/>
    <el-dialog title="上传头像" :visible.sync="DialogVisible" width="30%">
      <croppa
        v-model="myCroppa"
        :width="300"
        :height="300"
        :canvas-color="'default'"
        :placeholder="'Choose an image'"
        :placeholder-font-size="25"
        :placeholder-color="'default'"
        :quality="1"
        :zoom-speed="8"
        :disabled="false"
        :disable-drag-and-drop="false"
        :disable-click-to-choose="false"
        :disable-drag-to-move="false"
        :disable-scroll-to-zoom="false"
        :disable-rotation="false"
        :prevent-white-space="false"
        :reverse-scroll-to-zoom="false"
        :show-remove-button="true"
        :remove-button-color="'#333333'"
        :remove-button-size="0"
      ></croppa>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="uploadAvatar">Upload</el-button>
      </span>
    </el-dialog>
    <div class="accountview-mainbody">
      <el-row>
        <el-col :span="16" :offset="4">
          <div class="tablebody">
            <el-row>
              <el-col :span="6">
                <el-menu default-active="1" @select="handleMenu">
                  <el-menu-item index="1">
                    <span slot="title">编辑主页</span>
                  </el-menu-item>
                  <el-menu-item index="2">
                    <span slot="title">更改密码</span>
                  </el-menu-item>
                </el-menu>
              </el-col>
              <el-col :span="18">
                <el-row v-if="tabletype==='updateInfo'">
                  <el-col :span="16" :offset="3">
                    <div class="infobox">
                      <div class="avatar">
                        <img :src="avatar_prefix + currentUser.avatar">
                      </div>
                      <div class="otherinfo">
                        <div class="otherinfo-username">{{currentUser.user_name}}</div>
                        <div class="otherinfo-change-avatar">
                          <el-button type="text" size="mini" @click="DialogVisible = true">更换头像</el-button>
                        </div>
                      </div>
                    </div>
                    <el-form ref="form" :rules="rules" label-width="80px" size="medium">
                      <el-form-item label="昵称" prop="nickname">
                        <el-input v-model="currentUser.nick_name"></el-input>
                      </el-form-item>
                      <el-form-item label="性别" style="width:100%;">
                        <el-select v-model="currentUser.gender">
                          <el-option label="男" value="male"></el-option>
                          <el-option label="女" value="female"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="个人简介" prop="introduction">
                        <el-input type="textarea" :rows="5" v-model="currentUser.introduction"></el-input>
                      </el-form-item>
                      <el-form-item label="ZJU邮箱">
                        <el-input v-model="currentUser.email" disabled></el-input>
                      </el-form-item>
                      <el-form-item label="真实姓名" prop="truename">
                        <el-input v-model="currentUser.true_name"></el-input>
                      </el-form-item>
                      <el-form-item label="手机号" prop="mobile">
                        <el-input v-model="currentUser.mobile"></el-input>
                      </el-form-item>
                      <el-form-item label="个人网站">
                        <el-input v-model="currentUser.website_url"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" size="mini" @click="submitUpdateInfo">提交</el-button>
                      </el-form-item>
                    </el-form>
                  </el-col>
                </el-row>
                <el-row v-if="tabletype==='updatePassword'">
                  <el-col :span="16" :offset="3">
                    <div class="updatePassword-infobox">
                      <div class="avatar">
                        <img :src="avatar_prefix + currentUser.avatar">
                      </div>
                      <div class="updatePassword-otherinfo">{{currentUser.user_name}}</div>
                    </div>
                    <el-form ref="form" label-width="120px" size="medium">
                      <el-form-item label="旧密码">
                        <el-input v-model="oldpassword"></el-input>
                      </el-form-item>
                      <el-form-item label="新密码">
                        <el-input v-model="newpassword" type="password"></el-input>
                      </el-form-item>
                      <el-form-item label="再次输入新密码">
                        <el-input v-model="newpassword_repeat" type="password"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" size="mini" @click="submitUpdatePassword">更改密码</el-button>
                      </el-form-item>
                    </el-form>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import { mapActions } from "vuex";
import { avatar_prefix } from "../utils/myconfig";

export default {
  name: "accountview",
  data() {
    return {
      avatar_prefix,
      tabletype: "updateInfo",
      currentUser: {},
      oldpassword: "",
      newpassword: "",
      newpassword_repeat: "",
      DialogVisible: false,
      myCroppa: {},
      rules: {
        // nickname: [
        //   { required: true, message: "请输入昵称", trigger: "change" }
        // ],
        // truename: [{ max: 10, message: "不超过10个字符", trigger: "change" }],
        // mobile: [
        //   { type: "number", message: "请填写正确的手机号", trigger: "blur" }
        // ]
      }
    };
  },
  components: {
    Header
  },
  methods: {
    ...mapActions(["updateUser"]),
    toggleShow() {
      this.show = !this.show;
    },
    getMyInfo: function() {
      const currentUser = this.$store.state.user.currentUser;
      this.currentUser = currentUser;
    },
    handleMenu: function(index) {
      if (index === "1") {
        this.tabletype = "updateInfo";
      }
      if (index === "2") {
        this.tabletype = "updatePassword";
      }
    },
    async uploadAvatar() {
      if (this.myCroppa.hasImage()) {
        const blob = await this.myCroppa.promisedBlob("image/jpeg", 0.8);
        let data = new FormData();
        data.append("file", blob, "filename.jpg");
        await this.$axios.post("upload/avatar", data, {
          headers: {
            "Content-Type": `multipart/form-data; boundary=${data._boundary}`
          }
        });
        await this.updateUser();
        this.getMyInfo();
        this.$message({
          message: "已成功更换头像",
          type: "success"
        });
      } else {
        this.$message.error("未选择任何图片");
      }
      this.DialogVisible = false;
    },
    async submitUpdateInfo() {
      const {
        nick_name,
        gender,
        introduction,
        true_name,
        mobile,
        website_url
      } = this.currentUser;
      let WillUpdateInfo = {
        nick_name,
        gender,
        introduction,
        true_name,
        mobile,
        website_url
      };
      await this.$axios.post("user/updatebasicinfo", WillUpdateInfo);
      await this.updateUser();
      this.getMyInfo();
      this.$message({
        message: "已成功更新我的信息",
        type: "success"
      });
    },
    async submitUpdatePassword() {
      const { oldpassword, newpassword, newpassword_repeat } = this;
      if (newpassword !== newpassword_repeat) {
        this.$message.error("两次输入密码不一致");
        return;
      }
      if (newpassword.length < 8 || newpassword.length > 20) {
        this.$message.error("密码位数需在8到20");
        return;
      }
      await this.$axios
        .post("user/updatepassword", {
          oldpassword,
          newpassword
        })
        .then(res => {
          console.log(res);
          if (res.data.code === 0) {
            this.$message({
              message: "已成功更换密码",
              type: "success"
            });
            // relogin
            this.$store.dispatch("setUser", null);
            localStorage.removeItem("token");
            this.$router.push("/login");
          } else if (res.data.code === 4001) {
            this.$message.error(res.data.msg);
          } else if (res.data.code === 4002) {
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created: function() {
    this.getMyInfo();
  }
};
</script>
<style>
.accountview {
  background-color: #fafafa;
  min-height: 100vh;
}
.accountview-mainbody {
  margin-top: 50px;
}
.tablebody {
  border: 1px solid #dbdbdb;
  background-color: #fff;
  min-height: 70vh;
  margin-bottom: 100px;
}
.el-menu {
  min-height: 50vh;
  border-right: 1px solid #dbdbdb !important;
}
.el-menu-item {
  font-size: 16px !important;
  text-align: left;
  padding-left: 40px !important;
  border-left: 2px solid #ffffff !important;
}
.el-form-item__content {
  text-align: left !important;
}
.el-menu-item:hover {
  border-left: 2px solid #999999 !important;
  background-color: #fafafa !important;
}
.el-menu-item.is-active {
  font-weight: 800;
  color: #323232 !important;
  background-color: #fff !important;
  border-left: 2px solid #262626 !important;
}
form label {
  font-weight: 800;
  color: #323232 !important;
  font-size: 15px !important;
}
.infobox {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 30px;
  margin-bottom: 20px;
  margin-left: 30px;
}
.updatePassword-infobox {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 30px;
  margin-bottom: 20px;
  margin-left: 60px;
}
.avatar {
  height: 38px;
  width: 38px;
}
.avatar img {
  height: 100%;
  width: 100%;
  border-radius: 50%;
}
.otherinfo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-left: 20px;
}
.updatePassword-otherinfo {
  font-size: 24px;
  margin-left: 20px;
}
.otherinfo-username {
  font-size: 18px;
  line-height: 20px;
  font-weight: 400;
  color: #2d3436;
}
</style>

