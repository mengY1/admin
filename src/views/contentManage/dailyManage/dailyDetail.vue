<template>
  <div class="wrapper">
    <el-card class="box-card" style="margin-top:30px;">
      <div slot="header" class="clearfix">
        <h3>爆料详情</h3>
      </div>
      <div class="text item">
        <el-row>
          <el-col :span="4">
            <div class="pic">封面</div>
          </el-col>
          <el-col :span="20">
            <img style="max-width:400px;max-height:400px;" :src="url+info.cover" alt>
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
        <el-row v-if="info.video_url">
          <el-col :span="4">
            <div class="title">视频链接</div>
          </el-col>
          <el-col :span="20">
            <p>{{info.video_ur}}</p>
            <video :src="info.video_url" controls="controls" width="600px" height="300px" ></video>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <div class="title">内容详情</div>
          </el-col>
          <el-col :span="20">
                <div 
                ref="refContent"
                 v-html="info.news_content"
                 ></div>
          </el-col>
        </el-row>
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
            <p>{{info.publish_at}}</p>
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
    <el-row style="margin-top:30px;border-bottom:none;">
      <el-col :span="2">
        <el-button
          type="primary"
          size="medium"
          v-if="info.line_status==0&&lineIdentity"
          @click="upAndLow"
          plain
        >上架</el-button>
      </el-col>
      <el-col :span="2">
        <el-button
          type="primary"
          size="medium"
          v-if="info.line_status==1&&lineIdentity"
          @click="upAndLow"
          plain
        >下架</el-button>
      </el-col>
      <el-col :span="2">
        <el-popover placement="top" width="160" v-model="visible2">
          <p>确定删除此日报吗？</p>
          <div style="text-align: right; margin: 0">
            <span @click="deleteDaily">
              <el-button type="primary" size="mini" @click="visible2 = false">确定</el-button>
            </span>
          </div>
          <el-button
            v-if="deleteIdentity"
            @click="getNewId(scope.row.news_id)"
            size="small"
            slot="reference"
          >删除</el-button>
        </el-popover>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {url,baseApi} from "@/utils/common";
import { getDailyDetail, dailyUpAndLow, deleteDailyI } from "@/api/api";
export default {
  components: {},
  props: {},
  data() {
    return {
      news_id: "",
      info: [],
      url: url,
      baseApi: baseApi,
      permissions: "",
      lineIdentity: "",
      topIdentity: "",
      deleteIdentity: ""
    };
  },
  watch: {},
  computed: {},
  methods: {
    deleteDaily() {
      deleteDailyI(this.news_id).then(res => {
        this.$router.push({
          path: "/dailyManage"
        });
      });
    },
    judeIdentity(arr, obj) {
      var i = arr.length;
      while (i--) {
        if (arr[i] === obj) {
          return true;
        }
      }
      return false;
    },
    toEdit() {
      let routerUrl = this.$router.resolve({
        path: "/editDaily",
        query: {
          news_id: this.news_id
        }
      });
      window.open(routerUrl.href, "_blank");
    },
    getInfo() {
      getDailyDetail(this.news_id).then(res => {
        this.info = res.data;
      });
    },
    upAndLow() {
      dailyUpAndLow(this.news_id).then(res => {
        this.$message({
          message: "操作成功",
          type: "success"
        });
        this.getInfo();
      });
    }
  },
  created() {},
  mounted() {
    this.permissions = JSON.parse(sessionStorage.getItem("permissions"));
    this.lineIdentity = this.judeIdentity(this.permissions, "admin.news.line");
    this.topIdentity = this.judeIdentity(this.permissions, "admin.news.top");
    this.deleteIdentity = this.judeIdentity(
      this.permissions,
      "admin.news.destroy"
    );
    this.news_id = this.$route.query.news_id;
    this.getInfo();
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
.ql-container.ql-snow {
  border: 1px solid #fff;
}
</style>
