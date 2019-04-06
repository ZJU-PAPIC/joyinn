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
    aboutCard
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
.mainbody {
}
.saylist_box{
  margin-top: 50px;
}
.right_box{
  margin-top: 50px;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.aboutcard{
  margin-top: 30px;
}
</style>

