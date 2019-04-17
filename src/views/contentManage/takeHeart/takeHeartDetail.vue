<template>
  <div class="wrapper">
    <el-card class="box-card" style="margin-top:30px;">
      <div slot="header" class="clearfix">
        <h3>走心详情</h3>
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
                <div ref="refContent" v-html="info.content"></div>
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
        <el-row>
          <el-col :span="4">
            <div class="title">收藏人数</div>
          </el-col>
          <el-col :span="20">
            <p>{{info.collections_count}}</p>
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
            <div class="title">创建时间</div>
          </el-col>
          <el-col :span="20">
            <p>{{info.created_at}}</p>
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
import { getTakeHeartDetail } from "@/api/api";
export default {
  components: {},
  props: {},
  data() {
    return {
      heart_id: "",
      info: [],
      url: url.url
    };
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {
    this.heart_id = this.$route.query.heart_id;
    getTakeHeartDetail(this.heart_id).then(res => {
      this.info = res.data;
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
