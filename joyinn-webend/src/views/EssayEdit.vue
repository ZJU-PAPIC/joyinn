<template>
  <div class="essayedit">
    <Header mode="eassyedit" title="写文章" memo="把记录灵感的事情交给我" :historyOn="true"></Header>
    <div class="edit_area">
      <el-row type="flex" justify="center">
        <el-col :span="14">
          <div class="card">
            <div class="titlebox">
              <h1>无标题</h1>
            </div>
            <div class="quill_editor">
              <Editor/>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import Editor from "@/components/Editor.vue";

export default {
  components: {
    Header,
    Editor
  },
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>
<style scoped>
.essayedit {
  background-color: #fafafa;
  min-height: 100vh;
  padding-bottom: 80px;
}
.edit_area {
  margin-top: 50px;
}
.card {
  text-align: left;
  width: 100%;
  min-height: 800px;
  background-color: #fff;
  padding-left: 50px;
  padding-right: 50px;
  padding-top: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.titlebox {
  padding-bottom: 20px;
  border-bottom: 1px solid #e8e8e8;
}
.quill_editor {
  margin-top: 30px;
  height: 100%;
}
</style>
