<template>
  <div class="wrapper">
    <el-card class="box-card" style="margin-top:30px;">
      <div slot="header" class="clearfix">
        <h3>本校详情</h3>
      </div>
      <div class="text item">
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
                <div ref="refContent" v-html="info.ugc_content"></div>
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
                <div ref="refContent" v-html="info.ugc_poster_caption"></div>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <div class="title">发布人</div>
          </el-col>
          <el-col :span="20">
            <p>{{info.created_user}}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <div class="title">置顶状态</div>
          </el-col>
          <el-col :span="20">
            <p>{{info.top_status==1?"已置顶":"未置顶"}}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <div class="title">上架状态</div>
          </el-col>
          <el-col :span="20">
            <p>{{info.line_status==1?"已上架":"未上架"}}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <div class="title">评论数</div>
          </el-col>
          <el-col :span="20">
            <p>{{info.comments_count}}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <div class="title">收藏数</div>
          </el-col>
          <el-col :span="20">
            <p>{{info.collections_count}}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <div class="title">学校名称</div>
          </el-col>
          <el-col :span="20">
            <p>{{info.cms_school_name}}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <div class="title">视屏链接</div>
          </el-col>
          <el-col :span="20">
            <p>{{info.video_url}}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <div class="title">发布时间</div>
          </el-col>
          <el-col :span="20">
            <p>{{info.created_at}}</p>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import {url,baseApi} from "@/utils/common";
import { ownSchoolDetail } from "@/api/api";
export default {
  components: {},
  props: {},
  data() {
    return {
      ugc_id: "",
      info: [],
      url: url.url
    };
  },
  watch: {},
  computed: {},
  methods: {
    toEdit(ugc_id) {
      this.$router.push({
        path: "/editCollege",
        query: {
          ugc_id: this.ugc_id
        }
      });
    }
  },
  created() {},
  mounted() {
    this.ugc_id = this.$route.query.ugc_id;
    ownSchoolDetail(this.ugc_id).then(res => {
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
