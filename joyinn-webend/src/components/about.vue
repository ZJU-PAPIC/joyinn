<template>
  <div class="aboutcard">
    <div class="top">
      <p>
        developers:
        <span v-for="(item,key) in developers" :key="key">
          <a :href="item.github">@{{item.nickname}}</a>
        </span>
      </p>
    </div>
    <div class="bottom">
      <span>
        <a :href="links.githubRepo">Github Repo</a>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      links: {
        githubRepo: "https://github.com/zju-papic/joyinn"
      },
      developers: [{ nickname: "kysoo", github: "https://github.com/zjuwkk" }]
    };
  }
};
</script>
<style scoped>
.aboutcard {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  color: #666;
  font-size: 11px;
  font-weight: 400;
  line-height: 13px;
  text-transform: capitalize;
}
a {
  color: #666 !important;
  text-decoration-line: none !important;
}
.class .bottom {
}
</style>
