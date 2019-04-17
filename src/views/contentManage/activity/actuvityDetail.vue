<template>
  <div class="wrapper">
    <h3 style="color:#409EFF;padding-left:9px;">活动详情</h3>
    <p style="margin-top:30px;">
      <el-button v-if="detailInfo.status==10" @click="ok">通过</el-button>
      <el-popover placement="top" trigger="click" width="300" title="拒绝理由">
        <el-alert v-if="textarea.length>50" :closable="false" title="不可超过50字" type="error"></el-alert>
        <el-input type="textarea" :rows="2" placeholder="拒绝理由不能为空" v-model="textarea"></el-input>
        <div style="text-align: right; margin: 0">
          <span @click="pass">
            <el-button type="primary" size="mini" @click="visible2 = false">确定</el-button>
          </span>
        </div>
        <el-button slot="reference" v-show="detailInfo.status==10">不通过</el-button>
      </el-popover>
      <el-button :plain="true" v-if="detailInfo.line_status==0" @click="okTop">上架</el-button>

      <span>
        <el-button size="mini" v-if="detailInfo.line_status==1" @click="dialogFormVisible = true">下架</el-button>
      </span>
      <el-dialog title="下架理由" :visible.sync="dialogFormVisible">
        <el-alert v-if="form.liyou.length>50" :closable="false" title="不可超过50字" type="error"></el-alert>
        <el-form :model="form">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="不超过50个字"
            v-model="form.liyou"
            autocomplete="off"
          ></el-input>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <span @click="noBottom">
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
          </span>
        </div>
      </el-dialog>
    </p>
    <div class="basicInfo">
      <h2>基本信息</h2>
      <div class="main">
        <table border="2">
          <tr>
            <td>活动海报</td>
            <td>
              <el-popover placement="right" width="400" trigger="click">
                <img :src="url+detailInfo.cover" style="max-width:400px;max-height:400px;" alt>
                <img
                  slot="reference"
                  style="width:200px;height:100px;padding:10px;"
                  :src="url+detailInfo.cover"
                  alt
                >
              </el-popover>
            </td>
          </tr>
          <tr>
            <td>活动名称</td>
            <td>
              {{detailInfo.title}}
              <el-tag size="mini" style="margin-left:10px;" v-if="detailInfo.status==20">进行中</el-tag>
              <el-tag
                style="margin-left:10px;"
                v-if="detailInfo.line_status==1"
                size="mini"
                type="success"
              >已上架</el-tag>
              <el-tag
                style="margin-left:10px;"
                v-if="detailInfo.line_status==0"
                size="mini"
                type="success"
              >已下架</el-tag>
            </td>
          </tr>
          <tr>
            <td>所属学校</td>
            <td>{{detailInfo.cms_school_name}}</td>
          </tr>
          <tr>
            <td>活动开始时间</td>
            <td>{{detailInfo.activity_start_at}}</td>
          </tr>
          <tr>
            <td>主办社团</td>
            <td style="color:rgb(64, 158, 255);" @click="toClubDetail">
              <span style="border-bottom:1px solid blue;cursor:pointer;">{{detailInfo.org_name}}社团</span>
            </td>
          </tr>
          <tr>
            <td>添加日程提醒人数</td>
            <td style="color:rgb(64, 158, 255);">
              <el-popover placement="right" width="700" trigger="click">
                <el-table :data="gridData">
                  <el-table-column width="150" property="username" label="添加日程人员"></el-table-column>
                  <el-table-column width="150" property="cms_school_name" label="所属学校学校"></el-table-column>
                  <el-table-column width="200" property="phone" label="手机号"></el-table-column>
                  <el-table-column width="200" property="created_at" label="添加日程时间"></el-table-column>
                </el-table>
                <el-button size="mini" slot="reference" @click="getApplyList">{{detailInfo.members}}</el-button>
              </el-popover>
            </td>
          </tr>
          <tr>
            <td>活动人气</td>

            <td>
              {{detailInfo.popularity}}
              <el-popover placement="right" title="调整人气" width="160" v-model="visible2">
                <el-input v-model="input" placeholder="请输入人气值"></el-input>
                <div style="text-align: right; margin: 10px">
                  <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
                  <span @click="adjust">
                    <el-button type="primary" size="mini" @click="visible2 = false">确定</el-button>
                  </span>
                </div>
                <el-button size="mini" slot="reference">调整</el-button>
              </el-popover>
            </td>
          </tr>
          <tr>
            <td>活动方式</td>
            <td>{{detailInfo.line_type}}</td>
          </tr>
          <tr>
            <td>活动地点</td>
            <td>{{detailInfo.address}}</td>
          </tr>
          <tr>
            <td>活动简介</td>
            <td>{{detailInfo.introduction}}</td>
          </tr>
          <tr v-if="detailInfo.status!=10">
            <td>创建时间</td>
            <td>{{detailInfo.created_at}}</td>
          </tr>
          <tr v-if="detailInfo.status==30">
            <td>审核时间</td>
            <td>{{detailInfo.audit_at}}</td>
          </tr>
          <tr v-if="detailInfo.status==30">
            <td>审核不通过原因</td>
            <td>{{detailInfo.audit_remark}}</td>
          </tr>
        </table>
      </div>
    </div>
    <div class="ActivityReview" v-if="detailInfo.review">
      <h2>活动回顾</h2>
      <div class="main">
        <table border="1">
          <tr>
            <td>回顾内容</td>
            <td>{{detailInfo.review.content}}</td>
          </tr>
          <tr>
            <td>回顾图片</td>
            <td>
              <el-popover
                v-for="(item,index ) in detailInfo.review.img"
                :key="index"
                placement="right"
                width="400"
                trigger="click"
              >
                <img :src="url+item" style="width:100%;height:100%;" alt>
                <img
                  slot="reference"
                  style="width:200px;height:100px;padding:10px;"
                  :src="url+item"
                  alt
                >
              </el-popover>
            </td>
          </tr>
          <tr>
            <td>发布时间</td>
            <td>{{detailInfo.review.created_at}}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import {
  activityDetail,
  adjustPopularity,
  actPut,
  activityTrial,
  getApplyList
} from "@/api/api";
import {url,baseApi} from "@/utils/common";
import clubDetail from "../../../views/club/clubList/clubDetail";
export default {
  components: {
    clubDetail
  },
  props: ["act_id"],
  inject: ["reload"],
  data() {
    return {
      form: {
        liyou: ""
      },
      dialogFormVisible: false,
      detailInfo: "",
      url: url,
      baseApi: baseApi,
      visible2: false,
      input: "",
      org_id: "",
      liuying: "dogCp",
      textarea: "",
      visible2: false,
      gridData: ""
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
    ok() {
      activityTrial(this.act_id, { status: 20 }).then(res => {
        this.$message({
          message: "活动通过审核",
          type: "success"
        });
        this.reload();
      });
    },
    pass() {
      activityTrial(this.act_id, {
        status: 30,
        audit_remark: this.textarea
      }).then(res => {
        this.$message({
          message: "活动未通过审核",
          type: "success"
        });
        this.reload();
      });
    },
    okTop() {
      actPut(this.act_id, { line_status: 1 }).then(res => {
        this.$message({
          message: "上架成功",
          type: "success"
        });
        this.reload();
      });
    },
    noBottom() {
      actPut(this.act_id, {
        line_status: 0,
        line_status_remark: this.form.liyou
      }).then(res => {
        this.$message({
          message: "下架成功",
          type: "success"
        });
        this.reload();
      });
    },
    adjust() {
      adjustPopularity(this.act_id, { popularity: this.input }).then(res => {
        this.reload();
      });
    },
    toClubDetail() {
      this.$router.push({
        path: "/clubDetail",
        query: {
          org_id: this.org_id
        }
      });
    }
  },
  created() {},
  mounted() {
    this.act_id = this.$route.query.act_id;
    activityDetail(this.act_id).then(res => {
      this.detailInfo = res.data;
      this.org_id = res.data.org_id;
      this.act_id = res.data.act_id;
    });
  }
};
</script>
<style lang="scss" scoped>
h2 {
  margin-top: 30px;
}
table {
  width: 80%;
  margin-top: 20px;
  border-collapse: collapse;
  border-color: #d5d8db;
  font-size: 16px;
  line-height: 32px;
  td {
    padding-left: 20px;
    padding-right: 20px;
  }
}
</style>