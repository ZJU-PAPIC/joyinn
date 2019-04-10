<template>
  <div class="labpage">
    <Header mode="lab" title="功能实验室" memo="尝试即将上线的新功能"/>
    <div class="funcPage">
      <div class="project" v-for="(item,key) in projects" :key="key">
        <el-card>
          <div class="cardBox">
            <div class="imgbox">
              <img :src="item.imgsrc">
              <a href="#">
                <div class="mask">
                  <h3>{{item.describe}}</h3>
                </div>
              </a>
            </div>
            <div class="describe_box">
              <el-button plain @click="expLab(key+1)" circle :disabled="!item.valid">
                <i class="fa fa-arrow-right" aria-hidden="true"></i>
              </el-button>
            </div>
          </div>
        </el-card>
      </div>
    </div>
    <Footer/>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
export default {
  components: {
    Header,
    Footer
  },
  data() {
    return {
      projects: [
        {
          name: "essay",
          imgsrc:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554921065598&di=2b4804e983f5520c40426975cf607247&imgtype=0&src=http%3A%2F%2Fwww.wordpresshy.com%2Fwp-content%2Fuploads%2F2018%2F10%2Fwordpresssite.jpg",
          linkto: "/essay/edit",
          describe: "我知道一个故事应该怎么写。只是，你有故事吗？",
          valid: true
        },
        {
          name: "yunbox",
          imgsrc:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554923288358&di=cd9a3a6671b53dc40599523eb51406df&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F17%2F08%2F12%2F869e600048186181ccf10ce22d6f2dcb.jpg%2521%2Ffwfh%2F804x636%2Fquality%2F90%2Funsharp%2Ftrue%2Fcompress%2Ftrue",
          linkto: "/yunbox",
          describe: "享受文件在ZJU的急速云端生活",
          valid: false
        }
      ]
    };
  }
};
</script>
<style>
.labpage {
  background-color: #fafafa;
}
.funcPage {
  padding-left: 200px;
  padding-right: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.project {
  width: 100%;
  margin-top: 100px;
  margin-bottom: 50px;
}
.cardBox {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 30px;
  padding-right: 30px;
}
.imgbox {
  width: 80%;
  position: relative;
  height: 400px;
}
.imgbox img {
  width: 100%;
  height: 100%;
}
.describe_box {
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
}
.mask {
  position: absolute;
  height: 200px;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(75, 73, 73, 0.6);
  color: #fafafa;
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.imgbox a:hover .mask {
  opacity: 1;
}
</style>


