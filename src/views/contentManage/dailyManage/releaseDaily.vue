<template>
  <div class="wrapper">
    <el-row style="margin-bottom:30px;">
      <el-col :span="4">
        <div>*上传封面图（最小尺寸320*240）</div>
      </el-col>
      <el-col :span="20">
        <el-upload
          v-loading="loading2"
          element-loading-text="拼命上传中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          style="width:375px;height:176px;margin-left:100px;"
          class="avatar-uploader"
           :action="baseApi+'/upload/cover'"
          :before-upload="beforeAvatarUpload"
          tip="正在上传"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :on-progress="onProgress"
        >
          <img
            v-if="dialogImageUrl"
            style="width:375px;height:176px"
            :src="url+dialogImageUrl"
            class="avatar"
          >
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-col>
    </el-row>
    <el-row style="margin-bottom:30px;">
      <el-col :span="4">
        <div>*标题</div>
      </el-col>
      <el-col :span="10">
        <el-input v-model="title" :maxlength="100" placeholder="请输入标题，最多100字"></el-input>
      </el-col>
    </el-row>
    <el-row style="margin-bottom:30px;">
      <el-col :span="4">
        <div>视频连接</div>
      </el-col>
      <el-col :span="10">
        <div>
          <el-input v-model="video_url" :maxlength="100" placeholder="请输入视屏连接"></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row style="margin-bottom:30px;">
      <el-col :span="4">
        <div>*内容</div>
      </el-col>
      <el-col :span="10">
        <div>
          <Uediter :value="ueditor.value" :config="ueditor.config" ref="ue"></Uediter>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4" style="margin-bottom:30px;">
        <div>发布时间</div>
      </el-col>
      <el-col :span="10">
        <div class="block">
          <el-date-picker
            v-model="value1"
            type="datetime"
            placeholder="发布时间须大于当前时间"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </div>
      </el-col>
    </el-row>
    <el-row style="margin:30px 0 30px 0;">
      <el-checkbox v-model="checked">置顶该条爆料</el-checkbox>
      <span></span>
    </el-row>
    <el-button type="primary" :plain="true" @click="release">发布</el-button>
    <el-button type="primary" :plain="true" @click="addDraft">保存到草稿</el-button>
  </div>
</template>

<script>
import { addDaily, addDraft, updateDraft } from "@/api/api";
import {url,baseApi} from "@/utils/common";
import Uediter from "@/components/UE.vue";
export default {
  components: {
    Uediter
  },
  props: {},
  data() {
    return {
      title: "",
      loading2: false,
      dialogImageUrl: "",
      url: url,
      baseApi: baseApi,
      value1: "",
      value2: true,
      str: "",
      dat: {
        content: ""
      },
      ueditor: {
        value: "",
        config: {
          initialFrameWidth: 800,
          initialFrameHeight: 320
        }
      },
      checked: false,
      top_status: "",
      video_url: "",
      draft_id: ""
    };
  },
  methods: {
    beforeAvatarUpload(file) {
      console.log(file);
      const isJPG = file.type === "image/jpeg" || "image/jpg" || "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      const isSize = new Promise(function(resolve, reject) {
        let width = 320;
        let height = 240;
        let _URL = window.URL || window.webkitURL;
        let img = new Image();
        img.onload = function() {
          let valid = img.width >= width && img.height >= height;
          valid ? resolve() : reject();
        };
        img.src = _URL.createObjectURL(file);
      }).then(
        () => {
          return file;
        },
        () => {
          this.$message.error("请上传尺寸大于320*240px的图片");
          return Promise.reject();
        }
      );

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 jpg/png/jpeg 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M && isSize;
    },
    release() {
      if (this.checked) {
        this.top_status = 1;
      } else {
        this.top_status = 0;
      }
      this.dat.content = this.$refs.ue.getUEContent();
      addDaily({
        title: this.title,
        cover: this.dialogImageUrl,
        news_content: this.dat.content,
        publish_at: this.value1,
        top_status: this.top_status,
        video_url: this.video_url
      })
        .then(res => {
          this.$router.push({
            path: "/dailyManageList"
          });
          this.$message({
            message: "添加成功",
            type: "success"
          });
        })
        .catch(err => {
          var errors = []; //定义一个数组用来接受value
          for (var key in err.errors) {
            errors.push(err.errors[key]); //取得value
          }
          this.$message.error(errors[0][0]);
        });
    },
    addDraft() {
      if (this.checked) {
        this.top_status = 1;
      } else {
        this.top_status = 0;
      }
      this.dat.content = this.$refs.ue.getUEContent();
      if (this.draft_id) {
        updateDraft(this.draft_id, {
          title: this.title,
          cover: this.dialogImageUrl,
          news_content: this.dat.content,
          publish_at: this.value1,
          top_status: this.top_status,
          video_url: this.video_url,
          type: 1
        }).then(res => {
          this.$message({
            message: "编辑成功",
            type: "success"
          });
        });
      } else {
        addDraft({
          title: this.title,
          cover: this.dialogImageUrl,
          news_content: this.dat.content,
          publish_at: this.value1,
          top_status: this.top_status,
          video_url: this.video_url,
          type: 1
        })
          .then(res => {
            this.draft_id = res.data.draft_id;
            console.log(res);
            this.$message({
              message: "添加成功",
              type: "success"
            });
          })
          .catch(err => {
            var errors = []; //定义一个数组用来接受value
            for (var key in err.errors) {
              errors.push(err.errors[key]); //取得value
            }
            this.$message.error(errors[0][0]);
          });
      }
    },
    handleAvatarSuccess(res, file) {
      this.dialogImageUrl = res.path;
      this.loading2 = false;
    },
    onProgress() {
      this.loading2 = true;
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.el-row {
  padding-bottom: 20px;
  border-bottom: 1px solid #ebeef5;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
