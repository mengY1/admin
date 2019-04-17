<template>
  <div class="wrapper">
    <el-row style="margin-bottom:30px;">
      <el-col :span="2">
        <div>内容标题</div>
      </el-col>
      <el-col :span="10">
        <el-input v-model="title" placeholder="请输入标题"></el-input>
      </el-col>
    </el-row>
    <el-row style="margin-bottom:30px;">
      <el-col :span="24" style="margin-right:10px">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="所属学校">
            <div class="block">
              <el-cascader
                size="large"
                clearable
                :options="optionsSchool"
                @change="handleChange"
                :props="props"
                :placeholder="form_cms_school_name"
                filterable
              ></el-cascader>
            </div>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row style="margin-bottom:30px;">
      <el-col :span="2">
        <div>视屏链接</div>
      </el-col>
      <el-col :span="10">
        <el-input v-model="url1" placeholder="示例： http://www.baidu.com"></el-input>
      </el-col>
    </el-row>
    <el-row style="margin-bottom:30px;">
      <el-col :span="2">
        <div>*内容</div>
      </el-col>
      <el-col :span="10">
        <div>
          <Uediter v-if="ueditor.value" :value="ueditor.value" :config="ueditor.config" ref="ue"></Uediter>
        </div>
      </el-col>
    </el-row>
    <el-row style="margin-bottom:30px;">
      <el-col :span="2">
        <div>海报分享文案</div>
      </el-col>
      <el-col :span="10">
        <div>
          <Uediter2 :value="ueditor2.value" :config="ueditor2.config" ref="ue2"></Uediter2>
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
      <el-checkbox v-model="checked">置顶该条</el-checkbox>
      <span></span>
    </el-row>
    <el-button type="primary" :plain="true" @click="returnContent">发布</el-button>
  </div>
</template>

<script>
import { editOwnSchool, getSchoolId, ownSchoolDetail } from "@/api/api";
import Uediter from "@/components/UE.vue";
import Uediter2 from "@/components/UE2.vue";
import {url,baseApi} from "@/utils/common";
export default {
  components: {
    Uediter,
    Uediter2
  },
  data() {
    return {
      props: {
        value: "cms_school_id",
        label: "name"
      },
      form: {
        phone: ""
      },
      form_cms_school_name: "",
      optionsSchool: [],
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
      value4: "",
      title: "",
      url1: "",
      url2: "",
      is_new: "",
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
          initialFrameHeight: 50
        }
      },
      dat2: {
        content: ""
      },
      ueditor2: {
        value: "",
        config: {
          initialFrameWidth: 800,
          initialFrameHeight: 50
        }
      },
      checked: false,
      top_status: "",
      receive_type: "",
      cms_school_id: "",
      schoolArr: "",
      ugc_id: ""
    };
  },
  methods: {
    // 学校检索
    getSchoolId() {
      getSchoolId(this.form_cms_school_name).then(res => {
        this.optionsSchool = res.data.data;
      });
    },
    handleChange(val) {
      this.cms_school_id = val[0];
      this.changeUserArr();
    },
    returnContent() {
      this.dat.content = this.$refs.ue.getUEContent();
      this.dat2.content = this.$refs.ue2.getUEContent();
      if (this.checked) {
        this.top_status = 1;
      } else {
        this.top_status = 0;
      }
      editOwnSchool(this.ugc_id, {
        title: this.title,
        ugc_content: this.dat.content,
        top_status: this.top_status,
        ugc_poster_caption: this.dat2.content,
        cms_school_id: this.cms_school_id,
        video_url: this.url1,
         publish_at: this.value1,
      })
        .then(res => {
          this.$router.push({
            path: "/ownSchoolList"
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
  mounted() {
    this.ugc_id = this.$route.query.ugc_id;
    this.getSchoolId();
    ownSchoolDetail(this.ugc_id).then(res => {
      this.title = res.data.title;
      this.ueditor.value = res.data.ugc_content;
      this.value1 = res.data.publish_at;
      if (res.data.top_status == 1) {
        this.checked = true;
      }
      this.ueditor2.value = res.data.ugc_poster_caption;
      if (res.data.cms_school_name) {
        this.form_cms_school_name = res.data.cms_school_name;
      } else {
        this.form_cms_school_name = "请输入学校名检索";
      }
      this.url1 = res.data.video_url;
      this.cms_school_id = res.data.cms_school_id;
    });
  }
};
</script>
<style lang="scss" scoped>
.wrapper {
}
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
