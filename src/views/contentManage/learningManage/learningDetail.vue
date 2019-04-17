<template>
  <div class="wrapper">
    <el-card class="box-card" style="margin-top:30px;">
      <div slot="header" class="clearfix">
        <h3>学术详情</h3>
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
            <div class="title">标题</div>
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
                <div ref="refContent" v-html="info.introduction"></div>
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
        </el-row>-->
        <!-- <el-row>
      <el-col :span="4">
        <div class="title">生成海报人数</div>
      </el-col>
      <el-col :span="20">
          <p>{{info.publish_at}}</p>
      </el-col>
        </el-row>-->
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
            <div class="title">添加日程提醒人数</div>
          </el-col>
          <el-col :span="20">
             <el-popover placement="right" width="700" trigger="click">
                <el-table :data="gridData">
                  <el-table-column width="150" property="username" label="添加日程人员"></el-table-column>
                  <el-table-column width="150" property="cms_school_name" label="所属学校学校"></el-table-column>
                  <el-table-column width="200" property="phone" label="手机号"></el-table-column>
                  <el-table-column width="200" property="created_at" label="添加日程时间"></el-table-column>
                </el-table>
                <el-button size="mini" slot="reference" @click="getApplyList">{{info.members}}</el-button>
              </el-popover>
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
            <div class="title">活动时间</div>
          </el-col>
          <el-col :span="20">
            <p>{{info.activity_start_at}}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <div class="title">活动地点</div>
          </el-col>
          <el-col :span="20">
            <p>{{info.address}}</p>
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
    <el-row style="margin-top:30px;border-bottom:none;">
      <el-col :span="2">
        <el-button
          type="primary"
          size="medium"
          v-if="info.line_status==0"
          @click="up"
          plain
        >上架</el-button>
      </el-col>
      <el-col :span="2">
        <el-button
          type="primary"
          size="medium"
          v-if="info.line_status==1"
          @click="low"
          plain
        >下架</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" size="medium" @click="toEdit" plain>编辑</el-button>
      </el-col>
      <el-col :span="2">
        <el-popover placement="top" width="160" v-model="visible2">
          <p>确定删除此日报吗？</p>
          <div style="text-align: right; margin: 0">
            <span @click="deleteDaily">
              <el-button type="primary" size="mini" @click="visible2 = false">确定</el-button>
            </span>
          </div>
          <el-button @click="getNewId(scope.row.news_id)" size="small" slot="reference">删除</el-button>
        </el-popover>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {url,baseApi} from "@/utils/common";
import { activityDetail, actPut, actDelete,gridData,getApplyList } from "@/api/api";
export default {
  components: {},
  props: {},
  data() {
    return {
      act_id: "",
      info: [],
      url: url,
      baseApi: baseApi,
      gridData:''
    };
  },
  watch: {},
  computed: {},
  methods: {
    getApplyList() {
      getApplyList(this.act_id).then(res => {
        this.gridData = res.data.data;
      });
    },
    deleteDaily() {
      actDelete(this.act_id).then(res => {
        this.$router.push({
          path: "/learningList"
        });
      });
    },
    toEdit() {
      let routerUrl = this.$router.resolve({
        path: "/learningEdit",
        query: {
          act_id: this.act_id
        }
      });
      window.open(routerUrl.href, "_blank");
    },
    getInfo() {
      activityDetail(this.act_id).then(res => {
        this.info = res.data;
      });
    },
    up() {
      actPut(this.act_id,{ line_status: 1 }).then(res => {
        this.$message({
          message: "上架成功",
          type: "success"
        });
        this.getInfo();
      });
    },
    low() {
      actPut(this.act_id,{ line_status: 0 }).then(res => {
        this.$message({
          message: "下架成功",
          type: "success"
        });
        this.getInfo();
      });
    }
  },
  created() {},
  mounted() {
    this.act_id = this.$route.query.act_id;
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
