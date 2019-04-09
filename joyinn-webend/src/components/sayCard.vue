<template>
  <div class="saycard">
    <div class="headbox">
      <div v-if="postInfo.uid !== getCurrentUser.uid">
        <el-popover placement="right" width="200" trigger="hover">
          <div class="leftbox" slot="reference">
            <div class="avatar">
              <img :src="avatar_prefix+postInfo.avatar">
            </div>
            <div class="nickname">{{postInfo.nick_name}}</div>
          </div>
          <div class="popover_content">
            <div class="title">@{{postInfo.nick_name}}</div>
            <div class="login_time">
              <span>最后一次登录：</span>
              {{get_fromTime(postInfo.last_login_time)}}
            </div>
          </div>
        </el-popover>
      </div>
      <div class="leftbox" v-else>
        <div class="avatar">
          <img :src="avatar_prefix+postInfo.avatar">
        </div>
        <div class="nickname">{{postInfo.nick_name}}</div>
      </div>
      <div class="datetime">{{convertTime}}</div>
    </div>
    <div class="mainbox">
      <div class="postimgbox" v-if="postInfo.type!==0">
        <swiper :options="swiperOption" style="height: auto;" ref="mySwiper" @lazyImageReady="handleLazy">
          <swiper-slide v-for="(item,key) in postimages" :key="key">
            <!-- 一种实现lazy load的方式 -->
            <!-- <div v-if="key===0">
              <img :src="img_prefix + item" ref="imgSize">
            </div>
            <div v-if="key!==0">
              <img v-lazy="img_prefix + item" ref="imgSize">
            </div>-->
            <!-- 采用swiper自带的lazy load -->
            <img :src="img_prefix + item" ref="imgSize" class="swiper-lazy">
            <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <div class="post_textbox" v-if="postInfo.type!==1">
        <span class="text_left_nickname">@{{postInfo.nick_name}}</span>
        <div v-html="handleSayText"></div>
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
    getCurrentUser() {
      return this.$store.state.user.currentUser;
    },
    postimages() {
      const imagesJson = JSON.parse(this.postInfo.photo);
      return imagesJson;
    },
    convertTime() {
      return fromNow(this.postInfo.post_time);
    },
    handleSayText() {
      return this.postInfo.say_text.replace(/\n/gm, "<br/>");
    },
    swiper() {
      console.log(this.$refs);
      
      return this.$refs.mySwiper.swiper;
    }
  },
  data() {
    return {
      saytext: "",
      avatar_prefix: avatar_prefix,
      img_prefix: img_prefix,
      swiperOption: {
        lazy: true, // lazy load picture
        autoHeight: true, //enable auto height
        spaceBetween: 30,
        effect: "fade",
        pagination: {
          el: ".swiper-pagination"
        }
      }
    };
  },
  methods: {
    get_fromTime(time) {
      return fromNow(time);
    },
    handleLazy(){
      this.swiper.updateAutoHeight(2600);
    }
  }
};
</script>
<style scoped>
.text_left_nickname {
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
  height: 30px;
  width: 30px;
  margin-left: 20px;
  margin-right: 10px;
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
  font-size: 14px;
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
.popover_content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}
.popover_content .title {
  color: #262626;
  font-size: 12px;
  font-weight: bold;
}
.popover_content .login_time {
  color: #666;
  font-size: 12px;
}
.popover_content .login_time span {
  font-weight: bold;
}
</style>
