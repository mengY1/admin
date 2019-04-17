<template>
  <div class="wrapper">
    <el-row>
      <el-col :span="4">
        <div>*上传Logo</div>
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
          :before-upload="beforeAvatarUpload"
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
      <el-col :span="12">
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="*社团名称">
            <el-input
              placeholder="请输入社团名称，最多20字"
              v-model="form.name"
              :maxlength="20"
              :minlength="1"
            ></el-input>
          </el-form-item>
          <el-form-item label="*社团类型">
            <el-select v-model="value" placeholder="请选择社团类型">
              <el-option
                v-for="item in options"
                :key="item.org_type_id"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="社团口号">
            <el-input v-model="form.summary" placeholder="请输入社团口号，最多25字"></el-input>
          </el-form-item>
          <el-form-item label="社团联系方式" prop="phone">
            <el-input v-model="form.phone" placeholder="请输入有效的手机号"></el-input>
          </el-form-item>
          <el-form-item label="公众号">
            <el-input v-model="form.official_accounts" placeholder="请输入公众号"></el-input>
          </el-form-item>
          <el-form-item label="*社团简介">
            <el-input v-model="form.introduction" type="textarea" placeholder="最多500字"></el-input>
          </el-form-item>
          <el-form-item label="所属学校">
            <div class="block">
              <el-cascader
                size="large"
                clearable
                :options="optionsSchool"
                @change="handleChange"
                :props="props"
                placeholder="输入学校检索社长"
                filterable
              ></el-cascader>
            </div>
          </el-form-item>
          <el-form-item label="社长">
            <div class="block">
              <el-cascader
                size="large"
                clearable
                :options="optionsUser"
                @change="handleChange1"
                :props="props1"
                :placeholder="tips"
                filterable
              ></el-cascader>
            </div>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <div>社团照片</div>
      </el-col>
      <el-col :span="20">
        <div>最多上传8张！</div>
        <div
          style="position:relative;top:0;left:0;width:147px;height:147px;padding:0px 10px 0 0; float:left;border-radius:4px;"
          v-for="(item,index) in dialogImageUrl1"
          :key="index"
        >
          <img style="width:147px;height:147px;" width="100%" :src="url+item" alt>
          <i
            @click="deleteImg(index)"
            style="position:absolute;right:11px;top:1px;"
            size="small"
            class="el-icon-error"
          ></i>
        </div>
        <el-upload
          v-if="dialogImageUrl1.length<8"
           :action="baseApi+'/upload/cover'"
          list-type="picture-card"
          :on-success="handlePictureCardPreview"
          :on-remove="handleRemove"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
          :limit="8"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <div>社团证件照</div>
      </el-col>
      <el-col :span="20">
        <el-upload
          v-loading="loading1"
          element-loading-text="拼命上传中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          style="width:375px;height:176px;margin-left:100px;"
          class="avatar-uploader"
           :action="baseApi+'/upload/cover'"
          tip="正在上传"
          :show-file-list="false"
          :on-success="handleAvatarSuccess2"
          :on-progress="onProgress2"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="dialogImageUrl2"
            style="width:375px;height:176px"
            :src="url+dialogImageUrl2"
            class="avatar"
          >
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
import { addClub, getClubType, getSchoolId, getConsumer } from "@/api/api";
import {url,baseApi} from "@/utils/common";
import changeTime from "@/utils/changeTime";
export default {
  components: {},
  data() {
    return {
      tips:"输入社长名检索",
      props: {
        value: "cms_school_id",
        label: "name"
      },
      props1: {
        value: "user_id",
        label: "realname"
      },
      form_cms_school_name: "",
      user_name: "点击检索社长",
      schoolArr: [],
      userArr: [],
      options: [],
      value: "",
      org_id: "",
      form: {
        phone: ""
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
      optionsSchool: [],
      optionsUser: []
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleChange(val) {
      this.cms_school_id = val[0];
      this.changeUserArr();
    },
    handleChange1(val) {
      this.user_id = val[0];
    },
    // 学校检索
    getSchoolId() {
      getSchoolId(this.form_cms_school_name).then(res => {
        this.optionsSchool = res.data.data;
      });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/png" || file.type === "image/jpeg";
      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG / JPEG / PNG格式!");
      }
      return isJPG;
    },
    changeUserArr() {
      getConsumer(
        "",
        "",
        "",
        "",
        1,
        1,
        1000,
        "",
        0,
        this.cms_school_id,
        ""
      ).then(res => {
        console.log("liuying")
        if(res.data.data.length==0){
           this.tips="该校暂无用户"
        }else{
          this.tips="请输入社长名检索"
          this.optionsUser = res.data.data;
        }
      });
    },
    handleRemove(file, fileList) {},
    handlePictureCardPreview(file) {
      this.dialogImageUrl1.push(file.path);
      this.dialogVisible = true;
    },
    deleteImg(index) {
      this.dialogImageUrl1.splice(index, 1);
    },
    submit() {
      if (this.value == "文学类") {
        this.form.type = 2;
      } else if (this.value == "艺术类") {
        this.form.type = 3;
      } else if (this.value == "体育类") {
        this.form.type = 4;
      } else if (this.value == "实践类") {
        this.form.type = 5;
      } else if (this.value == "学术类") {
        this.form.type = 6;
      } else if (this.value == "其他") {
        this.form.type = 1;
      }
      addClub({
        logo: this.dialogImageUrl,
        name: this.form.name,
        type: this.form.type,
        summary: this.form.summary,
        phone: this.form.phone,
        official_accounts: this.form.official_accounts,
        introduction: this.form.introduction,
        cms_school_id: this.cms_school_id,
        user_id: this.user_id,
        certificate: this.dialogImageUrl2,
        photos: this.dialogImageUrl1
      })
        .then(res => {
          this.$router.push({
            path: "/clubList"
          });
          this.$message({
            message: "恭喜你，添加社团成功",
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
    onSubmit() {}
  },
  created() {},
  mounted() {
    this.getSchoolId();
    getClubType().then(res => {
      this.options = res.data.data;
    });
  }
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
