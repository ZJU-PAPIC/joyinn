<template>
  <div class="postdialog">
    <el-button type="primary" icon="el-icon-edit" @click="handleVisible">写动态</el-button>
    <div class="text_box">
      <el-dialog
        title="Say Something"
        :visible.sync="dialogFormVisible"
        :before-close="handleExit"
        :show-close="false"
      >
        <el-input
          type="textarea"
          :autosize="{ minRows: 3}"
          placeholder="心情、故事、你在述说着什么"
          v-model="text"
          @change="handleTextChange"
        ></el-input>
        <div class="text_strict">字数限制：{{text.length}}/200</div>
        <div class="show_imgbox">
          <el-switch v-model="uploadVisible" active-text="上传图片" @change="handleSwitch"></el-switch>
        </div>
        <div class="upload_img_box" v-if="uploadVisible">
          <el-upload
            ref="upload"
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :limit="8"
            :multiple="true"
            :auto-upload="false"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-change="handleUploadChange"
            :file-list="fileList"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="fly">Fly</el-button>
        </div>
      </el-dialog>
      <el-dialog :visible.sync="dialogVisible" :show-close="false">
        <img width="100%" :src="dialogImageUrl" alt>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  computed: {},
  data() {
    return {
      dialogFormVisible: false,
      text: "",
      uploadVisible: true,
      dialogImageUrl: "",
      dialogVisible: false,
      fileList: [],
      fileListNames: []
    };
  },
  methods: {
    handleSwitch(val) {
      console.log('【switch val】',val);
      this.fileList = [];
      this.fileListNames = [];
    },
    backto_default_data() {
      this.text = "";
      this.fileList = [];
      this.fileListNames = [];
      this.uploadVisible = true;
    },
    handleVisible() {
      this.dialogFormVisible = !this.dialogFormVisible;
    },
    handleTextChange(value) {
      if (value.length <= 200) this.text = value;
      else this.text = value.slice(0, 200);
    },
    handleExit(done) {
      if (this.text.length > 0 || this.fileList.length > 0) {
        this.$confirm("是否保存Fly草稿", "提示", {
          confirmButtonText: "保存",
          cancelButtonText: "不保存",
          type: "warning"
        })
          .then(() => {
            done();
          })
          .catch(() => {
            done();
            this.backto_default_data();
          });
      } else done();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    async fly() {
      // judge whether is empty
      if (this.text.length === 0 && this.fileList.length === 0) {
        this.handleVisible();
        this.$message.error("不能发送空白post");
        return;
      }
      // post
      console.log("fileList", this.fileList);
      for (let i = 0; i < this.fileList.length; i++) {
        const element = this.fileList[i];
        let fd = new FormData();
        fd.append("file", element.raw);
        let config = {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        };
        await this.myAxios(config)
          .post("upload/photo", fd)
          .then(res => {
            console.log(res);
            this.fileListNames.push(res.data.filename);
          })
          .catch(err => {});
      }
      console.log("upload photo done!");

      const photo = JSON.stringify(this.fileListNames);
      const say_text = this.text;
      const uid = this.$store.state.user.currentUser.uid;
      const self = this;
      await this.axios
        .post("say/", { uid, photo, say_text })
        .then(async res => {
          console.log(res.data);
          // get new say
          const insertId = res.data.insertId;
          const newSay = await self.axios.get("say/getone", {
            params: { id: insertId }
          });
          const newSayData = newSay.data.say;
          console.log(newSay);
          
          self.$store.commit("pushSay", newSayData);
          //
          self.backto_default_data();
          self.handleVisible();
        })
        .catch(err => {
          self.$message.error(err);
          self.backto_default_data();
          self.handleVisible();
        });
    },
    handleUploadChange(file, fileList) {
      this.fileList = fileList;
    }
  }
};
</script>
<style scoped>
.postdialog {
  width: 100%;
}
.text_box {
  text-align: left;
}
.text_strict {
  font-size: 8px;
  color: #666;
  display: flex;
  flex-direction: row;
  line-height: 10px;
  align-items: center;
  justify-content: flex-end;
  margin-top: 5px;
  margin-right: 5px;
}
.show_imgbox {
  margin-bottom: 20px;
}
</style>
