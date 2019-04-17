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
    <el-row style="margin-bottom:30px;">
      <el-col :span="4">
        <div>*内容分类</div>
      </el-col>
      <el-col :span="10">
        <el-select v-model="value2" @change="change1" clearable placeholder="请选择">
          <el-option
            v-for="item in options1"
            :key="item.university_type_id"
            :label="item.name"
            :value="item.university_type_id"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row style="margin-bottom:30px;">
      <el-col :span="4">
        <div>领取方式</div>
      </el-col>
      <el-col :span="10">
        <el-select v-model="value4" @change="change2" clearable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row style="margin-bottom:30px;" v-if="receive_type==1">
      <el-col :span="4">
        <div>*链接</div>
      </el-col>
      <el-col :span="10">
        <el-input v-model="url1" placeholder="示例： http://www.baidu.com"></el-input>
      </el-col>
    </el-row>
    <el-row style="margin-bottom:30px;" v-if="receive_type==1">
      <el-col :span="4">
        <div>提取码</div>
      </el-col>
      <el-col :span="10">
        <el-input v-model="url2" placeholder="只能包含数字/字母。固定长度4位"></el-input>
      </el-col>
    </el-row>
    <el-row style="margin-bottom:30px;" v-if="receive_type==2||receive_type==3">
      <el-col :span="4">
        <div>领取方式说明</div>
      </el-col>
      <el-col :span="10">
        <el-input v-model="explain" placeholder="输入领取方式的说明"></el-input>
      </el-col>
    </el-row>
    <el-row style="margin-bottom:30px;" v-if="receive_type==2">
      <el-col :span="4">
        <div>微信号</div>
      </el-col>
      <el-col :span="10">
        <el-input v-model="weiXin" placeholder="输入需复制的微信号"></el-input>
      </el-col>
    </el-row>
    <el-row style="margin-bottom:30px;" v-if="receive_type==3">
      <el-col :span="4">
        <div>二维码图片</div>
      </el-col>
      <el-col :span="10">
        <el-upload
          v-loading="loading3"
          element-loading-text="拼命上传中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          class="avatar-uploader"
           :action="baseApi+'/upload/cover'"
          :show-file-list="false"
          :on-success="handleAvatarSuccess1"
          :on-progress="onProgress1"
        >
          <img v-if="imageUrl" :src="url+imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
      <el-checkbox v-model="checked">置顶该条干货</el-checkbox>
      <span></span>
    </el-row>
    <el-button type="primary" :plain="true" @click="returnContent">发布</el-button>
    <el-button type="primary" :plain="true" v-if="draft_id" @click="keepDrafts">保存到草稿箱</el-button>
  </div>
</template>

<script>
import {
  editCollege,
  getUniversityDetail,
  getDriedFoodList,
  draftDetail,
  updateDraft,
  addUniversityText
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
        },
        {
          value: "二维码领取",
          label: "二维码领取"
        }
      ],
      value4: "微信群领取",
      title: "",
      url1: "",
      url2: "",
      is_new: "",
      loading2: false,
      loading3: false,
      dialogImageUrl: "",
      url: url,
      baseApi: baseApi,
      university_id: "",
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
      receive_type: 0,
      university_type_id: "",
      options1: [],
      draft_id: 0,
      imageUrl: ""
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
    getType() {
      getDriedFoodList().then(res => {
        this.options1 = res.data.data;
      });
    },
    change1() {
      console.log(this.value2)
      this.university_type_id = this.value2;
    },
    change2() {
      if (this.value4 == "百度云领取") {
        this.receive_type = 1;
      } else if (this.value4 == "微信群领取") {
        this.receive_type = 2;
      } else if (this.value4 == "二维码领取") {
        this.receive_type = 3;
      } else {
        this.receive_type = 0;
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
      console.log(this.value4)
      if (this.value4 == "百度云领取") {
        this.receive_type = 1;
      } else if (this.value4 == "微信群领取") {
        this.receive_type = 2;
      } else if (this.value4 == "二维码领取") {
        this.receive_type = 3;
      } else {
        this.receive_type = 0;
      }
      if (this.university_id) {
        console.log(this.university_type_id)
        console.log(this.receive_type)
        editCollege(this.university_id, {
          title: this.title,
          cover: this.dialogImageUrl,
          universities_content: this.dat.content,
          url: this.url1,
          url_code: this.url2,
          receive_type: this.receive_type,
          top_status: this.top_status,
          poster_caption: this.dat2.content,
          receive_instruction: this.explain,
          receive_wechat_id: this.weiXin,
          university_type_id: this.university_type_id,
          publish_at: this.value1,
          draft_id: this.draft_id,
          receive_qrcode: this.imageUrl
        })
          .then(res => {
            this.$router.push({
              path: "/collegeList"
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
        addUniversityText({
          title: this.title,
          cover: this.dialogImageUrl,
          universities_content: this.dat.content,
          url: this.url1,
          url_code: this.url2,
          publish_at: this.value1,
          receive_type: this.receive_type,
          top_status: this.top_status,
          poster_caption: this.dat2.content,
          receive_instruction: this.explain,
          receive_wechat_id: this.weiXin,
          university_type_id: this.university_type_id,
          draft_id: this.draft_id
        })
          .then(res => {
            this.$router.push({
              path: "/collegeList"
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
        title: this.title,
        cover: this.dialogImageUrl,
        news_content: this.dat.content,
        publish_at: this.value1,
        top_status: this.top_status,
        video_url: this.video_url,
        type: 2
      })
        .then(res => {
          console.log(9999999999);
          this.$router.push({
            path: "/editCollege",
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
    handleAvatarSuccess1(res, file) {
      this.imageUrl = res.path;
      this.loading3 = false;
    },
    onProgress() {
      this.loading2 = true;
    },
    onProgress1() {
      this.loading3 = true;
    },
    getInfo() {
      if (this.university_id) {
        getUniversityDetail(this.university_id).then(res => {
          this.info = res.data;
          this.value1 = res.data.publish_at;
          console.log(this.value1);
          this.imageUrl = res.data.receive_qrcode;
          this.university_type_id = res.data.university_type_id;
          console.log(this.university_type_id)
          this.dialogImageUrl = res.data.cover;
          this.ueditor.value = this.info.universities_content;
          this.ueditor2.value = this.info.poster_caption;
          this.title = res.data.title;
          this.url1 = res.data.url;
          this.url2 = res.data.url_code;
          this.receive_type = res.data.receive_type;
            if (this.receive_type == 1) {
            this.value4 = "百度云领取";
          } else if (this.receive_type == 2) {
            this.value4 = "微信领取";
          } else if (this.receive_type == 3) {
            this.value4 = "二维码领取";
          } else {
            this.value4 = "";
          }
          console.log(this.receive_type)
          this.explain = res.data.receive_instruction;
          this.weiXin = res.data.receive_wechat_id;
          this.value2 = res.data.university_type;
        

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
    this.university_id = this.$route.query.university_id;
    this.draft_id = this.$route.query.draft_id;
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
