<template>
  <div class="wrapper">
     <el-button
        type="primary"
          v-if="clubInfo.audit_status==10"
          @click="handleEdit1(clubInfo.org_claim_id)">通过</el-button>
       
           <span @click="handleEdit2(clubInfo.org_claim_id)">
             <el-button type="primary"  v-if="clubInfo.audit_status==10" @click="dialogFormVisible = true">不通过</el-button>
          </span>

          <el-dialog title="拒绝理由" :visible.sync="dialogFormVisible">
             <el-alert
             :closable="false"
            v-if="form.liyou.length>50"
            title="不可超过50字"
            type="success">
          </el-alert>
          <el-form :model="form">
       
              <el-input type="textarea" :rows="2"
            placeholder="不超过50个字" v-model="form.liyou" autocomplete="off"></el-input>
           
           
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <span @click="sub">
              <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </span>
          </div>
        </el-dialog>
      <h3 style="color:#409EFF;padding-left:9px;">申请详情</h3>
      <div class="basicInfo" style="margin-bottom:50px">
          <h2 style="padding:20px 20px 20px 0">基本信息：</h2>
          <el-row>
            <el-col :span="3">社团名称</el-col><el-col :span="6">
              <el-popover
            placement="right"
            width="400"
            trigger="click">
            <img :src="url+clubInfo.logo" style="width:400px;height:400px;border-radius:50%" alt="">
               <img  slot="reference"
            style="width:22px;height:22px;position: relative; top: 6px;border-radius:50%;margin-right:10px;line-height:33px;"
            :src="url+clubInfo.logo" alt="">
            </el-popover>
              {{clubInfo.name}}&emsp;</el-col>
          </el-row>
          <el-row>
            <el-col :span="3">所属学校</el-col><el-col :span="6">{{clubInfo.cms_school_name}}&emsp;</el-col>
          </el-row>
          <el-row>
            <el-col :span="3">类型</el-col><el-col :span="6">{{clubInfo.type}}&emsp;</el-col>
          </el-row>
          <el-row>
            <el-col :span="3">一句话介绍</el-col><el-col :span="6">{{clubInfo.summary}}&emsp;</el-col>
          </el-row>
          <el-row>
            <el-col :span="9">简介:<span style="margin-left:10%" >{{clubInfo.introduction}}&emsp;</span></el-col>
          </el-row>
          <el-row>
            <el-col :span="3">公众号</el-col><el-col :span="6">{{clubInfo.official_accounts}}&emsp;</el-col>
          </el-row>
          <el-row>
            <el-col :span="3">qq群</el-col><el-col :span="6">{{clubInfo.qq}}&emsp;</el-col>
          </el-row>
          <el-row>
            
            <el-col :span="9">证件照:
               <el-popover
            placement="right"
            width="400"
            trigger="click">
            <img :src="url+clubInfo.certificate" style="width:100%;height:100%;" alt="">
                 <img  slot="reference" style="margin-left:10%;width:180px;height:100px;" :src="url+clubInfo.certificate" alt="">
            </el-popover>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="3">创建时间</el-col><el-col :span="6">{{clubInfo.created_at}}&emsp;</el-col>
          </el-row>
          <el-row v-if="clubInfo.audit_status!==10">
            <el-col  :span="3">审核时间</el-col><el-col :span="6">{{clubInfo.audit_at}}&emsp;</el-col>
          </el-row>
           <el-row v-if="clubInfo.audit_status!==10">
            <el-col  :span="3">审核不通过原因</el-col><el-col :span="6" >{{clubInfo.audit_remark}}&emsp;</el-col>
          </el-row>
           <el-row>
            <el-col  style='border-bottom:1px solid #d5d8db' :span="3">审核状态</el-col><el-col style='border-bottom:1px solid #d5d8db' :span="6">{{clubInfo.audit_status_name}}&emsp;</el-col>
          </el-row>
           
      </div>
     
      <div v-if="clubInfo.chief" class="proprieterInfo" style="margin-bottom:50px">
          <h2 style="padding:20px 20px 20px 0">社长信息：</h2>
          <el-row>
            <el-col :span="3">手机号</el-col><el-col :span="6">{{clubInfo.chief.account}}&emsp;</el-col>
          </el-row>
          <el-row>
            <el-col :span="3">姓名</el-col><el-col :span="6">{{clubInfo.chief.realname}}&emsp;</el-col>
          </el-row>
          <el-row>
            <el-col :span="3">性别</el-col><el-col :span="6">{{clubInfo.chief.sex}}&emsp;</el-col>
          </el-row>
          <el-row>
            <el-col :span="3">学校</el-col><el-col :span="6">{{clubInfo.chief.cms_school_name}}&emsp;</el-col>
          </el-row>
          <el-row>
            <el-col :span="3">专业</el-col><el-col :span="6">{{clubInfo.chief.cms_major_name}}&emsp;</el-col>
          </el-row>
          <el-row>
            <el-col :span="3">年级</el-col><el-col :span="6">{{clubInfo.chief.grade}}&emsp;</el-col>
          </el-row>
          <el-row>
            <el-col :span="3">注册时间</el-col><el-col :span="6">{{clubInfo.chief.created_at}}&emsp;</el-col>
          </el-row>
           <el-row>
            <el-col style='border-bottom:1px solid #d5d8db' :span="9">
            <p >社团相册</p>
             <el-popover
             v-for='(item,index) in clubInfo.photos' :key="index"
            placement="right"
            width="400"
            trigger="click">
            <img :src="url+item" style="width:100%;height:100%" alt="">
              <el-button slot="reference"> <img  :src="url+item" alt="" style="width:150px;height:100px;padding:5px;"></el-button>
            </el-popover>
           
            </el-col>
          </el-row>
          
      </div>

  </div>
</template>

<script>
import { getClubTrialDetailInfo,clubTrial } from "../../../api/api"
import {url} from "../../../../src/utils/common"
export default {
  inject: ["reload"],
  components:{},
  props:["org_claim_id"],
  data(){
    return {
      clubInfo:'',
      url:url.url,
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
          liyou: '',
        },
        org_claim_id2:''
    }
  },
  watch:{},
  computed:{},
  methods:{
     handleEdit1(org_claim_id){
      clubTrial(org_claim_id,{audit_status:20}).then(res=>{
        this.reload()
      })
    },
    handleEdit2(org_claim_id){
     this.org_claim_id2=org_claim_id
    },
     sub(){
       clubTrial(this.org_claim_id2,{audit_status:30,audit_remark:this.form.liyou}).then(res=>{
        this.reload()
      })
    },
  },
  created(){},
  mounted(){
    this.org_claim_id=this.$route.query.org_claim_id
    getClubTrialDetailInfo(this.org_claim_id).then(res=>{
      this.clubInfo=res.data
    })
  }
}
</script>
<style lang="scss" scoped>
.wrapper{}

 .el-row {
   border-left:1px solid #d5d8db;
    }
  .el-col {
    border-right:1px solid #d5d8db;
    border-top:1px solid #d5d8db;
    box-sizing: border-box;
    padding-left: 20px;
    font-size: 16px;
    line-height: 32px;
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