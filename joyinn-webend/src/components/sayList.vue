<template>
  <div class="saylist">
      <sayCard :postInfo="item" v-for='(item,index) in getSayList' :key="index"/>
  </div>
</template>
<script>
import sayCard from "@/components/sayCard.vue";
export default {
  data() {
    return {};
  },
  components: {
    sayCard
  },
  computed: {
    getSayList() {
      return this.$store.state.says;
    }
  }
};
</script>
<style>
.saylist {
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
