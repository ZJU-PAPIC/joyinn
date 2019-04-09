<template>
  <div class="infocard">
    <div class="avatar">
      <img :src="avatar_prefix + getMyInfo.avatar">
    </div>
    <div class="other">
      <div class="nickname">{{getMyInfo.nick_name}}</div>
      <div class="username">{{getMyInfo.user_name}}</div>
    </div>
  </div>
</template>
<script>
import { avatar_prefix } from "../utils/myconfig";

export default {
  data() {
    return {
      avatar_prefix
    }
  },
  computed: {
    getMyInfo() {
      return this.$store.state.user.currentUser;
    }
  }
};
</script>
<style scoped>
.infocard {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  width: 100%;
  display: flex;
  flex-direction: row;
  height: 80px;
  align-items: center;
  justify-content: flex-start;
}
.avatar {
  width: 50px;
  height: 50px;
  margin-left: 20px;
  margin-right: 15px;
}
img {
  height: 100%;
  width: 100%;
  border-radius: 50%;
}
.nickname {
  color: #262626;
  font-weight: 600;
  text-align: left;
}
.username {
  color: #666;
  font-size: 12px;
  line-height: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
}
</style>
