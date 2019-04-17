<template>
  <div class="wrapper">
    <el-card class="box-card" style="margin-top:30px;">
      <div slot="header" class="clearfix">
        <h3>干货详情</h3>
      </div>
      <div class="text item">
        <el-row>
          <el-col :span="4">
            <div class="pic">封面</div>
          </el-col>
          <el-col :span="20">
            <img :src="url+info.cover" style="max-width:400px;max-height:400px;" alt>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <div class="title">文章标题</div>
          </el-col>
          <el-col :span="20">
            <p>{{info.title}}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <div class="title">内容详情</div>
          </el-col>
          <el-col :span="20">
            <div class="ql-container ql-snow">
              <div class="ql-editor">
                <div ref="refContent" v-html="info.universities_content"></div>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <div class="title">海报分享文案</div>
          </el-col>
          <el-col :span="20">
            <div class="ql-container ql-snow">
              <div class="ql-editor">
                <div ref="refContent" v-html="info.poster_caption"></div>
              </div>
            </div>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="4">
            <div class="title">分享人数</div>
          </el-col>
          <el-col :span="20">
            <p>{{info.publish_at}}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <div class="title">生成海报人数</div>
          </el-col>
          <el-col :span="20">
            <p>{{info.publish_at}}</p>
          </el-col>
        </el-row> -->
        <el-row>
          <el-col :span="4">
            <div class="title">收藏人数</div>
          </el-col>
          <el-col :span="20">
            <p>{{info.collections}}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <div class="title">领取方式</div>
          </el-col>
          <el-col :span="20">
            <p>{{receive_type}}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <div class="title">领取人数</div>
          </el-col>
          <el-col :span="20">
            <p>{{info.pull_count}}</p>
          </el-col>
        </el-row>
        <el-row v-if="info.receive_type==1">
          <el-col :span="4">
            <div class="title">领取链接</div>
          </el-col>
          <el-col :span="20">
            <p>{{info.url}}</p>
          </el-col>
        </el-row>
        <el-row v-if="info.receive_type==1">
          <el-col :span="4">
            <div class="title">领取密码</div>
          </el-col>
          <el-col :span="20">
            <p>{{info.url_code}}</p>
          </el-col>
        </el-row>
        <el-row v-if="info.receive_type==2">
          <el-col :span="4">
            <div class="title">领取方式说明</div>
          </el-col>
          <el-col :span="20">
            <p>{{info.receive_instruction}}</p>
          </el-col>
        </el-row>
        <el-row v-if="info.receive_type==2">
          <el-col :span="4">
            <div class="title">领取微信号</div>
          </el-col>
          <el-col :span="20">
            <p>{{info.receive_wechat_id}}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <div class="title">内容来源</div>
          </el-col>
          <el-col :span="20">
            <p>{{info.publisher}}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <div class="title">发布时间</div>
          </el-col>
          <el-col :span="20">
            <p>{{info.publish_at}}</p>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import {url,baseApi} from "@/utils/common";
import { getUniversityDetail } from "@/api/api";
export default {
  components: {},
  props: {},
  data() {
    return {
      university_id: "",
      info: [],
      url: url,
      baseApi: baseApi,
      receive_type:''
    };
  },
  watch: {},
  computed: {},
  methods: {
    toEdit(university_id) {
      this.$router.push({
        path: "/editCollege",
        query: {
          university_id: this.university_id
        }
      });
    }
  },
  created() {},
  mounted() {
    this.university_id = this.$route.query.university_id;
    getUniversityDetail(this.university_id).then(res => {
      this.info = res.data;
    if (res.data.receive_type == 1) {
            this.receive_type = "百度云领取";
          } else if (res.data.receive_type == 2) {
            this.receive_type = "微信领取";
          } else if (res.data.receive_type == 3) {
            this.receive_type = "二维码领取";
          } else {
            this.receive_type = "";
          }
    });
  }
};
</script>
<style lang="scss" scoped>
@import "../../../styles/quill.css";
.el-row {
  margin-bottom: 20px;
  border-bottom: 1px solid #ebeef5;
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
