<template>
  <div class="wrapper">
    <el-row>
      <el-col :span="4">
        <div>上传封面</div>
      </el-col>
      <el-col :span="20">
        <el-upload
          v-loading="loading2"
          element-loading-text="拼命上传中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          style="width:176px;height:176px;margin-left:100px;border:1px solid #dcdfe6;"
          class="avatar-uploader"
           :action="baseApi+'/upload/cover'"
          tip="正在上传"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :on-progress="onProgress"
        >
          <img
            v-if="dialogImageUrl"
            style="width:375px;height:176px;border:1px solid #dcdfe6;"
            :src="url+dialogImageUrl"
            class="avatar"
          >
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form ref="form" :rules="rules" :model="form" label-width="120px">
          <el-form-item label="主办社团">
            <input
              placeholder="请检索社团名称"
              style="line-height:40px;border:1px solid #dcdfe6;padding-left:16px;"
              type="text"
              @input="changeSchoolArr"
              v-model="form_cms_school_name"
              class="el-input"
            >
            <div>
              <ul style="list-style:none;" v-for="(item,index) in schoolArr" :key="index">
                <li @click="changValue(item.name,item.org_id)">
                  {{item.name}}-----
                  <span>{{item.cms_school_name}}</span>
                </li>
              </ul>
            </div>
          </el-form-item>
          <el-form-item label="活动标题">
            <el-input placeholder="请输入活动标题" v-model="form.title"></el-input>
          </el-form-item>
          <!-- <el-form-item label="报名时间">
            <div class="block">
              <el-date-picker
                v-model="value1"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </div>
          </el-form-item>-->
          <el-form-item label="活动时间">
            <!-- <div class="block">
              <el-date-picker
                v-model="value2"
                type="datetimerange"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </div>-->
            <div class="block">
              <el-date-picker
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                v-model="value2"
                type="datetime"
                placeholder="选择日期时间"
              ></el-date-picker>
            </div>
          </el-form-item>

          <el-form-item label="活动方式">
            <el-select v-model="value" clearable placeholder="请选择活动方式">
              <el-option
                v-for="item in options"
                :key="item.org_type_id"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item v-if="value=='线下'" label="活动地点">
            <el-input placeholder="请输入活动地点" v-model="form.address"></el-input>
          </el-form-item>
          <el-form-item label="活动介绍">
            <el-input type="textarea" :rows="5" placeholder="最多500字" v-model="form.introduction"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-button @click="submit" :plain="true" type="primary">提交</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { addAct, getClubType, getClubList } from "@/api/api";
import {url,baseApi} from "@/utils/common";
import changeTime from "@/utils/changeTime";
export default {
  components: {},
  props: {},
  data() {
    var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
    var validatePhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("号码不能为空!!"));
      }
      setTimeout(() => {
        if (!phoneReg.test(value)) {
          callback(new Error("请输入大陆合法手机号"));
        } else {
          callback();
        }
      }, 1000);
    };
    return {
      value1: "",
      value2: "",
      form_cms_school_name: "",
      schoolArr: [],
      options: [
        {
          value: "线上",
          label: "线上"
        },
        {
          value: "线下",
          label: "线下"
        }
      ],
      value: "",
      org_id: "",
      form: {
        phone: ""
      },
      rules: {
        // 校验手机号码，主要通过validator来指定验证器名称
        phone: [{ required: true, validator: validatePhone, trigger: "blur" }]
      },
      dialogImageUrl: "",
      dialogImageUrl1: [],
      dialogImageUrl2: "",
      dialogVisible: false,
      loading2: false,
      loading1: false,
      isHave: true,
      isShowI: true,
      url: url,
      baseApi: baseApi,
      cms_school_id: "",
      org_id: ""
    };
  },
  watch: {},
  computed: {},
  methods: {
    changValue(value, org_id) {
      this.form_cms_school_name = value;
      this.org_id = org_id;
      this.schoolArr = [];
    },
    changeSchoolArr() {
      var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
      if (reg.test(this.form_cms_school_name)) {
        getClubList(
          this.form_cms_school_name,
          "",
          "",
          "",
          "",
          "",
          100,
          "",
          "",
          ""
        ).then(res => {
          this.schoolArr = res.data.data;
        });
      }
    },
    handleRemove(file, fileList) {
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl1.push(file.path);
      this.dialogVisible = true;
    },
    deleteImg(index) {
      this.dialogImageUrl1.splice(index, 1);
    },
    submit() {
      if (this.value == "线上") {
        this.form.type = 10;
      } else if (this.value == "线下") {
        this.form.type = 20;
      } else {
        this.form.type = "";
      }
      if (!this.org_id) {
        this.$message.error("请先检索社团");
      }
      addAct(this.org_id, {
        cover: this.dialogImageUrl,
        title: this.form.title,
        activity_start_at: this.value2,
        line_type: this.form.type,
        official_accounts: this.form.official_accounts,
        address: this.form.address,
        act_introduction: this.form.introduction
      })
        .then(res => {
          this.$router.push({
            path: "/activityList"
          });
          this.$message({
            message: "恭喜你，新增活动成功",
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
    onProgress() {
      this.loading2 = true;
    },
    handleAvatarSuccess(res, file) {
      this.dialogImageUrl = res.path;
      this.isHave = false;
      this.isShowI = true;
      this.loading2 = false;
    },
    onProgress2() {
      this.loading1 = true;
    },
    handleAvatarSuccess2(res, file) {
      this.dialogImageUrl2 = res.path;
      this.isHave = false;
      this.isShowI = true;
      this.loading1 = false;
    },
    onSubmit() {
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.wrapper {
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
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
