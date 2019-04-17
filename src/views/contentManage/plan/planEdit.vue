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
    <el-row style="margin-bottom:30px;">
      <el-col :span="4">
        <div>*标题</div>
      </el-col>
      <el-col :span="10">
        <el-input v-model="title" placeholder="请输入标题"></el-input>
      </el-col>
    </el-row>
    <el-row style="margin-bottom:30px;" >
      <el-col :span="4">
        <div>*视屏链接</div>
      </el-col>
      <el-col :span="10">
        <el-input v-model="url1" placeholder="示例： http://www.baidu.com"></el-input>
      </el-col>
    </el-row>
    <el-row style="margin-bottom:30px;">
      <el-col :span="4">
        <div>*内容分类</div>
      </el-col>
      <el-col :span="10">
        <el-select v-model="value2" @change="change1" clearable placeholder="请选择">
          <el-option
            v-for="item in options1"
            :key="item.scheme_type_id"
            :label="item.name"
            :value="item.scheme_type_id"
          ></el-option>
        </el-select>
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
    <el-row style="margin-bottom:30px;">
      <el-col :span="4">
        <div>海报分享文案</div>
      </el-col>
      <el-col :span="10">
        <div>
          <Uediter2 v-if="info" :value="ueditor2.value" :config="ueditor2.config" ref="ue2"></Uediter2>
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
      <el-checkbox v-model="checked">置顶</el-checkbox>
      <span></span>
    </el-row>
    <el-button type="primary" :plain="true" @click="returnContent">发布</el-button>
  </div>
</template>

<script>
import {
  takeHeartEdit,
  getPlanDetail,
  getPlanTypeList
} from "@/api/api";
import {url,baseApi} from "@/utils/common";
import Uediter from "@/components/UE.vue";
import Uediter2 from "@/components/UE2.vue";
export default {
  props: {},
  components: {
    Uediter,
    Uediter2
  },
  data() {
    return {
      value2: "",
      explain: "",
      weiXin: "",
      options: [
        {
          value: "百度云领取",
          label: "百度云领取"
        },
        {
          value: "微信群领取",
          label: "微信群领取"
        }
      ],
      value4: "微信群领取",
      title: "",
      url1: "",
      url2: "",
      is_new: "",
      loading2: false,
      dialogImageUrl: "",
      url: url,
      baseApi: baseApi,
      scheme_id: "",
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
      dat2: {
        content: ""
      },
      ueditor2: {
        value: "",
        config: {
          initialFrameWidth: 800,
          initialFrameHeight: 320
        }
      },
      checked: "",
      top_status: "",
      info: "",
      receive_type: "",
      scheme_type_id: "",
      options1: [],
      draft_id: 0
    };
  },
  watch: {},
  computed: {},
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
    change1() {
      this.scheme_type_id = this.value2;
    },
    change2() {
      this.scheme_type_id = this.value2;
      if (this.value4 == "百度云领取") {
        this.receive_type = 1;
      } else if (this.value4 == "微信领取") {
        this.receive_type = 2;
      } else {
        this.receive_type = "";
      }
    },
    returnContent() {
      if (this.checked) {
        this.top_status = 1;
      } else {
        this.top_status = 0;
      }
      this.dat.content = this.$refs.ue.getUEContent();
      this.dat2.content = this.$refs.ue2.getUEContent();
      if (this.value4 == "百度云领取") {
        this.receive_type = 1;
      } else if (this.value4 == "微信领取") {
        this.receive_type = 2;
      } else {
        this.receive_type = "";
      }
      if (this.scheme_id) {
        takeHeartEdit(this.scheme_id, {
          title: this.title,
          cover: this.dialogImageUrl,
          heart_content: this.dat.content,
          publish_at: this.value1,
          top_status: this.top_status,
          video_url: this.url1,
          heart_poster_caption: this.dat2.content,
        })
          .then(res => {
            this.$router.push({
              path: "/takeHeartList"
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
    },
    handleAvatarSuccess(res, file) {
      this.dialogImageUrl = res.path;
      this.loading2 = false;
    },
    onProgress() {
      this.loading2 = true;
    },
    getType() {
      getPlanTypeList().then(res => {
        this.options1 = res.data.data;
      });
    },
    getInfo() {
      if (this.scheme_id) {
        getPlanDetail(this.scheme_id).then(res => {
          this.info = res.data;
          this.value1 = res.data.publish_at;
          this.dialogImageUrl = res.data.cover;
          this.ueditor.value = this.info.content;
          this.ueditor2.value = this.info.poster_caption;
          this.title = res.data.title;
          this.url1 = res.data.video_url;
          this.url2 = res.data.url_code;
          this.receive_type = res.data.receive_type;
          this.explain = res.data.receive_instruction;
          this.weiXin = res.data.receive_wechat_id;
          this.value2 = res.data.university_type;
          if (res.data.receive_type == 1) {
            this.value4 = "百度云领取";
          } else if (res.data.receive_type == 2) {
            this.value4 = "微信领取";
          } else {
            this.value4 = "";
          }

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
          this.value1 = res.data.publish_at;
          console.log(this.value1);
          this.dialogImageUrl = this.info.cover;
          this.ueditor.value = this.info.news_content;
          // this.ueditor2.value = this.info.poster_caption;
          this.title = this.info.title;
          this.url1 = res.data.url;
          this.url2 = res.data.url_code;
          this.receive_type = res.data.receive_type;
          this.explain = res.data.receive_instruction;
          this.weiXin = res.data.receive_wechat_id;
          this.value2 = res.data.university_type;
          if (res.data.receive_type == 1) {
            this.value4 = "百度云领取";
          } else if (res.data.receive_type == 2) {
            this.value4 = "微信领取";
          } else {
            this.value4 = "";
          }

          if (res.data.top_status == 1) {
            this.checked = true;
          } else {
            this.checked = false;
          }
        });
      }
    }
  },
  mounted() {
    this.scheme_id = this.$route.query.scheme_id;
    this.getInfo();
    this.getType();
  }
};
</script>
<style lang="scss" scoped>
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
