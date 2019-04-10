<template>
  <div class="header">
    <el-row v-if="getHeaderMode" type="flex" align="center" justify="space-between">
      <el-col :span="6">
        <p class="title" @click="gotoHome">Joy Inn</p>
      </el-col>
      <el-col :span="searchBoxSpan" class="v_center">
        <el-input
          @focus="handleSearchBoxSpan"
          @blur="handleSearchBoxSpan"
          placeholder="search now"
          prefix-icon="el-icon-search"
          v-model="searchText"
        ></el-input>
      </el-col>
      <el-col :span="6" class="v_center">
        <el-dropdown @command="handleCommand" :placement="bottom-start">
          <span class="el-dropdown-link">
            <i class="fa fa-bars" aria-hidden="true"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="lab">功能实验室</el-dropdown-item>
            <el-dropdown-item :divided="true"/>
            <el-dropdown-item command="loginout">Log out</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
    <el-row v-else>
      <el-col :span="6">
        <el-button plain @click="gotoHome" circle>
          <i class="fa fa-arrow-left" aria-hidden="true"></i>
        </el-button>
        <span class="headTitle">{{title}}</span>
        <span class="headMemo">{{memo}}</span>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  props: {
    mode: {
      type: String,
      default: "home"
    },
    title: {
      type: String,
      default: ""
    },
     memo: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      searchText: "",
      searchBoxSpan: 6
    };
  },
  methods: {
    unlogin() {
      this.$store.dispatch("setUser", null);
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
    handleCommand(command) {
      if (command === "loginout") this.unlogin();
      if (command === "lab") this.gotoLab();
    },
    handleSearchBoxSpan() {
      this.searchBoxSpan = 14 - this.searchBoxSpan;
    },
    gotoHome() {
      this.$router.push("/");
    },
    gotoLab() {
      this.$router.push("/lab");
    }
  },
  computed: {
    getHeaderMode() {
      let flag = false;
      const mode = this.mode;
      switch (mode) {
        case "home":
          flag = true;
          break;
        default:
          flag = false;
          break;
      }
      return flag;
    }
  }
};
</script>
<style>
el-col {
  height: 100%;
}
.header {
  background-color: #fff;
  /* border-bottom: 0.02px solid #999; */
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.title {
  font-family: "PingFang SC";
  font-weight: bolder;
  font-size: 25px;
  cursor: pointer;
}
.v_center {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.menu-i {
  font-size: 25px;
}
.headTitle{
  font-size: 15px;
  font-weight: bold;
  color: #4a5a6a;
  margin-left:20px;
}
.headMemo{
  font-size: 12px;
  color: #7a8a9a;
  margin-left:10px;
}
</style>
