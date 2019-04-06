<template>
  <div class="header">
    <el-row type="flex" align="center" justify="space-between">
      <el-col :span="6">
        <p class="title">Joyinn</p>
      </el-col>
      <el-col :span="6" class="v_center">
        <el-input placeholder="search now" prefix-icon="el-icon-search" v-model="searchText"></el-input>
      </el-col>
      <el-col :span="6" class="v_center">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <i class="el-icon-menu menu-i"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="loginout">Log out</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchText: ""
    };
  },
  methods: {
    unlogin: function() {
      this.$store.dispatch("setUser", null);
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
    handleCommand(command) {
      if (command === "loginout") this.unlogin();
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
}
.v_center {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.menu-i {
  font-size: 25px;
}
</style>
