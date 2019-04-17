<template>
  <div class="wrapper">
    <el-row style="margin-bottom:30px;">
      <el-col :span="4">
        <div>*上传封面图</div>
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
    <el-row>
      <el-col style="margin-bottom:30px;" :span="4">
        <div>*标题</div>
      </el-col>
      <el-col :span="10">
        <el-input v-model="info.title" :maxlength="100" placeholder="请输入内容"></el-input>
      </el-col>
    </el-row>
    <el-row style="margin-bottom:30px;">
      <el-col :span="4">
        <div>视频连接</div>
      </el-col>
      <el-col :span="10">
        <div>
          <el-input v-model="video_url" :maxlength="100" placeholder="请输入视频连接"></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row style="margin-bottom:30px;">
      <el-col :span="4">
        <div>*内容</div>
      </el-col>
      <el-col :span="10">
        <div>
          <Uediter v-if="info" :value="ueditor.value" :config="ueditor.config" ref="ue"></Uediter>
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
    <el-button type="primary" :plain="true" @click="returnContent">发布</el-button>
    <el-button type="primary" :plain="true" v-if="draft_id" @click="keepDrafts">保存到草稿箱</el-button>
  </div>
</template>

<script>
import {
  getDailyDetail,
  dailyEdit,
  draftDetail,
  updateDraft,
  addDaily
} from "@/api/api";
import {url,baseApi} from "@/utils/common";
import Uediter from "@/components/UE.vue";
export default {
  components: {
    Uediter
  },
  data() {
    return {
      title: "",
      loading2: false,
      dialogImageUrl: "",
      url: url,
      baseApi: baseApi,
      value1: "",
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
      checked: "",
      top_status: "",
      info: "",
      video_url: "",
      draft_id: 0
    };
  },
  methods: {
    beforeAvatarUpload(file) {
      console.log(file);
      const isJPG = file.type === "image/jpeg" || "image/jpg" || "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      const isSize = new Promise(function(resolve, reject) {
        let width = 100;
        let height = 100;
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
    returnContent() {
      if (this.news_id) {
        if (this.checked) {
          this.top_status = 1;
        } else {
          this.top_status = 0;
        }
        this.dat.content = this.$refs.ue.getUEContent();
        dailyEdit(this.news_id, {
          title: this.info.title,
          cover: this.dialogImageUrl,
          news_content: this.dat.content,
          top_status: this.top_status,
          video_url: this.video_url,
          publish_at: this.value1,
          draft_id: this.draft_id
        })
          .then(res => {
            this.$router.push({
              path: "/dailyManageList"
            });
            this.$message({
              message: "编辑成功",
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
      if (this.draft_id) {
        if (this.checked) {
          this.top_status = 1;
        } else {
          this.top_status = 0;
        }
        this.dat.content = this.$refs.ue.getUEContent();
        addDaily({
          title: this.info.title,
          cover: this.dialogImageUrl,
          news_content: this.dat.content,
          publish_at: this.value1,
          top_status: this.top_status,
          video_url: this.video_url,
          draft_id: this.draft_id
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
      }
    },
    keepDrafts() {
      if (this.checked) {
        this.top_status = 1;
      } else {
        this.top_status = 0;
      }
      this.dat.content = this.$refs.ue.getUEContent();
      updateDraft(this.draft_id, {
        title: this.info.title,
        cover: this.dialogImageUrl,
        news_content: this.dat.content,
        publish_at: this.value1,
        top_status: this.top_status,
        video_url: this.video_url,
        type: 1
      })
        .then(res => {
          console.log(9999999999);
          this.$router.push({
            path: "/editDaily",
            query: {
              draft_id: res.draft_id
            }
          });
          this.$message({
            message: "编辑成功",
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
    handleAvatarSuccess(res, file) {
      this.dialogImageUrl = res.path;
      this.loading2 = false;
    },
    onProgress() {
      this.loading2 = true;
    },
    getInfo() {
      if (this.news_id) {
        getDailyDetail(this.news_id).then(res => {
          this.info = res.data;
          this.video_url = this.info.video_url;
          this.dialogImageUrl = this.info.cover;
          this.ueditor.value = this.info.news_content;
          this.value1 = this.info.publish_at;
          if (res.data.top_status == 1) {
            this.checked = true;
          } else {
            this.checked = false;
          }
        });
      }
      if (this.draft_id) {
        draftDetail(this.draft_id).then(res => {
          this.info = res.data.data;
          this.video_url = this.info.video_url;
          this.dialogImageUrl = this.info.cover;
          this.ueditor.value = this.info.news_content;
          this.value1 = this.info.publish_at;
          if (res.data.top_status == 1) {
            this.checked = true;
          } else {
            this.checked = false;
          }
        });
      }
    }
  },
  created() {},
  mounted() {
    this.news_id = this.$route.query.news_id;
    this.draft_id = this.$route.query.draft_id;
    this.getInfo();
  }
};
</script>
<style lang="scss" scoped>
@import "../../../styles/quill.css";
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
.wrapper {
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
  .ql-container.ql-snow {
    border: 1px solid #fff;
  }
}
</style>
