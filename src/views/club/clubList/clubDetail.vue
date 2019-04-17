<template>
  <div class="wrapper">
      <el-button style="margin-bottom:20px;" v-if="this.$route.params.liuying" @click="goBack">返回活动详情页</el-button>
      <div class="basicInfo" style="margin-bottom:50px">
          <h3 style="color:#409EFF;padding-left:9px;">社团详情</h3>
          <h2 style="padding:20px 20px 20px 0">基本信息：</h2>
          <el-row>
            <el-col :span="9">社团名称</el-col><el-col :span="9"><el-popover
            placement="right"
            width="400"
            trigger="click">
            <img :src="url+clubInfo.logo" style="width:400px;height:400px;border-radius:50%" alt="">
               <img  slot="reference"
            style="width:22px;height:22px;position: relative; top: 6px;border-radius:50%;margin-right:10px;line-height:33px;"
            :src="url+clubInfo.logo" alt="">
            </el-popover>{{clubInfo.name}}&emsp;<el-tag color="#fff"     size="mini" type="success">{{clubInfo.org_status_name}}</el-tag></el-col>
            
          </el-row>
          <el-row>
            <el-col :span="9">所属学校</el-col><el-col :span="9">{{clubInfo.cms_school_name}}&emsp;</el-col>
          </el-row>
          <el-row>
            <el-col :span="9">类型</el-col><el-col :span="9">{{clubInfo.type_name}}&emsp;</el-col>
          </el-row>
          <el-row>
            <el-col :span="9">社团口号</el-col><el-col :span="9">{{clubInfo.summary}}&emsp;</el-col>
          </el-row>
          <el-row>
            <el-col :span="18">简介:<span style="margin-left:10%" >{{clubInfo.introduction}}&emsp;</span></el-col>
          </el-row>
          <el-row>
            <el-col :span="9">公众号</el-col><el-col :span="9">{{clubInfo.official_accounts}}&emsp;</el-col>
          </el-row>
          <el-row>
            <el-col :span="9">社团联系方式</el-col><el-col :span="9">{{clubInfo.phone}}&emsp;</el-col>
          </el-row>
          <el-row>
            <el-col :span="18">证件照:
                <el-popover
            placement="right"
            width="400"
            trigger="click">
            <img :src="url+clubInfo.certificate" style="width:100%;height:100%;" alt="">
                 <img slot="reference" style="margin-left:10%;margin-top:10px;width:180px;height:100px;" :src="url+clubInfo.certificate" alt="">
            </el-popover>
              </el-col>
          </el-row>
          <el-row>
            <el-col :span="9" style='border-bottom:1px solid #d5d8db'>创建时间</el-col><el-col style='border-bottom:1px solid #d5d8db' :span="9">{{clubInfo.created_at}}&emsp;</el-col>
          </el-row>
      </div>
      <div v-if="clubInfo.chief" class="proprieterInfo" style="margin-bottom:50px">
          <h2 style="padding:20px 20px 20px 0">社长信息：</h2>
          <el-row>
            <el-col :span="9">手机号</el-col><el-col :span="9">{{clubInfo.chief.account}}&emsp;</el-col>
          </el-row>
          <el-row>
            <el-col :span="9">姓名</el-col><el-col :span="9">{{clubInfo.chief.realname}}&emsp;</el-col>
          </el-row>
          <el-row>
            <el-col :span="9">性别</el-col><el-col :span="9">{{clubInfo.chief.sex}}&emsp;</el-col>
          </el-row>
          <el-row>
            <el-col :span="9">学校</el-col><el-col :span="9">{{clubInfo.chief.cms_school_name}}&emsp;</el-col>
          </el-row>
          <el-row>
            <el-col :span="9">专业</el-col><el-col :span="9">{{clubInfo.chief.cms_major_name}}&emsp;</el-col>
          </el-row>
          <el-row>
            <el-col :span="9">年级</el-col><el-col :span="9">{{clubInfo.chief.grade}}&emsp;</el-col>
          </el-row>
          <el-row>
            <el-col :span="9">注册时间</el-col><el-col :span="9">{{clubInfo.chief.created_at}}&emsp;</el-col>
          </el-row>
          <el-row>
            <el-col  style='border-bottom:1px solid #d5d8db' :span="18">
            <p >社团相册</p>
             <el-popover
             v-for='(item,index) in clubInfo.photos' :key="index"
            placement="right"
            width="400"
            trigger="click">
            <img :src="url+item" style="width:100%;height:100%" alt="">
              <el-button slot="reference"><img  :src="url+item" alt="" style="width:150px;height:100px;padding:5px;"></el-button>
            </el-popover>
            
            </el-col>
          </el-row>
          <el-row>
            
          </el-row>
      </div>

  </div>
</template>

<script>
import { getClubDetailInfo } from "../../../api/api"
import {url} from "../../../../src/utils/common"
export default {
  components:{},
  data(){
    return {
      clubInfo:'',
      url:url.url,
      org_id:'',
      dogCp:'dogCp'
    }
  },
  watch:{},
  computed:{},
  methods:{
    goBack(){
    this.$router.push({path:'/activityList'})
    }
  },
  created(){},
  mounted(){
    this.org_id=this.$route.query.org_id
    getClubDetailInfo(this.org_id).then(res=>{
      this.clubInfo=res.data
    })
  }
}
</script>
<style lang="scss" scoped>
.el-row{
    border-left:1px solid #d5d8db;
}
  .el-col {
    border-right:1px solid #d5d8db;
    border-top:1px solid #d5d8db;
    padding-left: 20px;
    box-sizing: border-box;
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