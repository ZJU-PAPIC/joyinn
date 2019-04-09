<template>
  <div class="home">
    <Header/>
    <div class="mainbody">
      <el-row>
        <el-col :span="11" :offset="4">
          <div class="saylist_box">
            <sayList/>
          </div>
        </el-col>
        <el-col :span="4" :offset="1">
          <div class="right_box">
            <myInfocard/>
            <div class="handle_box">
              <!-- modal box -->
              <flyBox/>
              <el-button type="primary" disabled class="temp-btn" icon="el-icon-edit">发帖子</el-button>
              <el-button type="primary" disabled class="temp-btn" icon="el-icon-edit">写文章</el-button>
              <el-button type="primary" disabled class="temp-btn" icon="el-icon-edit">工作日程</el-button>
            </div>
            <aboutCard class="aboutcard"/>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import sayList from "@/components/sayList.vue";
import myInfocard from "@/components/myInfocard.vue";
import aboutCard from "@/components/about.vue";
import flyBox from "@/components/flyBox.vue";
import { mapActions } from "vuex";

export default {
  name: "home",
  data() {
    return {};
  },
  components: {
    Header,
    sayList,
    myInfocard,
    aboutCard,
    flyBox
  },
  methods: {
    ...mapActions(["readSays"])
  },
  created: function() {
    console.log("【Created Function】");
    this.readSays();
  }
};
</script>
<style>
.home {
  background-color: #fafafa;
}
.saylist_box {
  margin-top: 50px;
}
.right_box {
  margin-top: 50px;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.aboutcard {
  margin-top: 30px;
}
.handle_box {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  height: 200px;
  justify-content: space-around;
  margin-top: 30px;
  padding: 10px;
  padding-top: 20px;
  padding-bottom: 20px;
}

.temp-btn {
  margin-left: 0 !important;
}
</style>

