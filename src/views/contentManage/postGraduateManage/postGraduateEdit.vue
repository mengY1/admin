<template>
  <div class="wrapper">
    <el-row style="margin-bottom:30px;">
      <el-col :span="4">
        <div>*上传封面图</div>
      </el-col>
      <el-col :span="20">
        <el-upload
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
        <div>*内容</div>
      </el-col>
      <el-col :span="10">
        <div>
          <Uediter  v-if="info"  :value="ueditor.value" :config="ueditor.config" ref="ue"></Uediter>
        </div>
      </el-col>
    </el-row>
      <el-row style="margin-bottom:30px;">
      <el-col :span="4">
        <div>活动时间</div>
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
        <div>活动地点</div>
      </el-col>
      <el-col :span="10">
        <el-input v-model="input1" placeholder="请输入活动地点"></el-input>
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
import { graduateEdit, activityDetail } from "@/api/api";
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
      value4: "否",
      title: "",
      url1: "",
      url2: "",
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
      info:'',
      input1:''
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
      if (this.value4 == "否") {
        this.is_new = 0;
      } else {
        this.is_new = 1;
      }
      graduateEdit(this.act_id, {
        cover: this.dialogImageUrl,
        title: this.title,
        activity_start_at: this.value1,
        address: this.input1,
        act_introduction: this.dat.content,
        top_status: this.top_status
      })
        .then(res => {
          this.$router.push({
            path: "/postGraduateList"
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
        this.info=res.data;
        this.dialogImageUrl = res.data.cover;
         this.value1=this.info.activity_start_at
        this.input1=this.info.address
        this.ueditor.value = this.info.introduction;
        this.title = res.data.title;
        this.url1 = res.data.url;
        this.url2 = res.data.url_code;
        this.value4 = res.data.is_new_name;
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
    this.getInfo()
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
