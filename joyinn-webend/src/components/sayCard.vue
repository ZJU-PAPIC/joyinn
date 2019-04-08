<template>
  <div class="saycard">
    <div class="headbox">
      <div class="leftbox">
        <div class="avatar">
          <img :src="avatar_prefix+postInfo.avatar">
        </div>
        <div class="nickname">{{postInfo.nick_name}}</div>
      </div>
      <div class="datetime">{{convertTime}}</div>
      <!-- <font-awesome-icon icon="heart"></font-awesome-icon> -->
    </div>
    <div class="mainbox">
      <div class="postimgbox" v-if="postInfo.type!==0">
        <!-- <el-carousel 
        indicator-position="outside"
        :interval="5000"
        >
          <el-carousel-item v-for="(item,key) in postimages" :key="key">
            <img :src="item" ref="imgSize">
          </el-carousel-item>
        </el-carousel>-->
        <swiper :options="swiperOption" style="height: auto">
          <swiper-slide v-for="(item,key) in postimages" :key="key">
            <div v-if="key===0">
              <img :src="img_prefix + item" ref="imgSize">
            </div>
            <div v-if="key!==0">
              <img v-lazy="img_prefix + item" ref="imgSize">
            </div>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
          <!-- <div class="swiper-button-prev" slot="button-prev"></div> -->
          <!-- <div class="swiper-button-next" slot="button-next"></div> -->
        </swiper>
      </div>
      <div class="post_textbox" v-if="postInfo.type!==1">
        <span class="text_left_nickname">@{{postInfo.nick_name}}</span>
        {{postInfo.say_text}}
      </div>
    </div>
  </div>
</template>
<script>
import { fromNow } from "../utils/handleTime";
import { img_prefix, avatar_prefix } from "../utils/myconfig";
export default {
  props: {
    postInfo: {
      type: Object,
      default: null
    }
  },
  computed: {
    postimages() {
      const imagesJson = JSON.parse(this.postInfo.photo);
      console.log("images", imagesJson);
      return imagesJson;
    },
    convertTime() {
      return fromNow(this.postInfo.post_time);
    }
  },
  data() {
    return {
      avatar_prefix: avatar_prefix,
      img_prefix: img_prefix,
      swiperOption: {
        autoHeight: true, //enable auto height
        spaceBetween: 30,
        effect: "fade",
        pagination: {
          el: ".swiper-pagination"
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      }
    };
  },
  methods: {}
};
</script>
<style scoped>
.text_left_nickname{
  font-size: 12px;
  font-weight: bold;
  color: #262626;
  margin-right: 5px;
}
.saycard {
  width: 100%;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}
.saycard:hover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.headbox {
  height: 60px;
  min-height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 0.5px solid #f3f3f3;
}
.leftbox {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.avatar {
  height: 40px;
  width: 40px;
  margin-left: 20px;
  margin-right: 15px;
}
.avatar img {
  height: 100%;
  width: 100%;
  border-radius: 50%;
}
.nickname {
  color: #262626;
  font-weight: 600;
  font-family: "PingFang SC";
  font-size: 15px;
}
.mainbox {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.post_textbox {
  padding: 20px;
  min-height: 30px;
  color: #262626;
  font-family: "PingFang SC";
  font-size: 15px;
  text-align: left;
  white-space: normal;
  word-break: break-all;
  word-wrap: break-word;
}
.postimgbox {
  width: 100%;
}
.postimgbox img {
  height: 100%;
  width: 100%;
}
.datetime {
  font-size: 10px;
  color: #666;
  margin-right: 20px;
}
</style>
