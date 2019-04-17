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
        <div>报名时间</div>
      </el-col>
      <el-col :span="10">
        <div class="block">
          <el-date-picker
            v-model="value1"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="选择日期时间"
          ></el-date-picker>
        </div>
      </el-col>
    </el-row>
    <el-row style="margin-bottom:30px;">
      <el-col :span="4">
        <div>报名链接</div>
      </el-col>
      <el-col :span="10">
        <el-input v-model="input1" placeholder="示例：https://www.baidu.com"></el-input>
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
    <el-row style="margin:30px 0 30px 0;">
      <el-checkbox v-model="checked">置顶该条招聘信息</el-checkbox>
      <span></span>
    </el-row>
    <el-button type="primary" :plain="true" @click="returnContent">保存修改</el-button>
  </div>
</template>

<script>
import { competitionEdit, activityDetail } from "@/api/api";
import {url,baseApi} from "@/utils/common";
import Uediter from "@/components/UE.vue";
export default {
  props: {},
  components: {
    Uediter
  },
  data() {
    return {
      options: [
        {
          value: "是",
          label: "是"
        },
        {
          value: "否",
          label: "否"
        }
      ],
      title: "",
      is_new: "",
      loading2: false,
      dialogImageUrl: "",
      url: url,
      baseApi: baseApi,
      act_id: "",
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
      input1: ""
    };
  },
  watch: {},
  computed: {},
  methods: {
    returnContent() {
      if (this.checked) {
        this.top_status = 1;
      } else {
        this.top_status = 0;
      }
      this.dat.content = this.$refs.ue.getUEContent();
      competitionEdit(this.act_id, {
        cover: this.dialogImageUrl,
        title: this.title,
        enrol_start_at: this.value1,
        contest_enrol_address: this.input1,
        act_introduction: this.dat.content,
        top_status: this.top_status
      })
        .then(res => {
          this.$router.push({
            path: "/competitionList"
          });
          this.$message({
            message: "恭喜你，编辑大学文本成功",
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
      activityDetail(this.act_id).then(res => {
        this.info = res.data;
        this.value1 = this.info.activity_start_at;
        this.input1 = this.info.enrol_remark;
        this.dialogImageUrl = res.data.cover;
        this.ueditor.value = this.info.introduction;
        this.title = this.info.title;
        this.input = this.info.title;
        if (res.data.top_status == 1) {
          this.checked = true;
        } else {
          this.checked = false;
        }
      });
    }
  },
  mounted() {
    this.act_id = this.$route.query.act_id;
    this.getInfo();
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
