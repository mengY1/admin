<template>
  <div class="applyList">
    <h3 style="color:#409EFF;padding-left:9px;">报名列表</h3>
    <div class="content">
      <el-row>
  <el-col :span="24">
    <el-table
    :data="gridData"
    style="width: 100%">
    <el-table-column
      label="报名人员"
      width="180">
      <template slot-scope="scope">
      <p>{{ scope.row.username }}</p>
      </template>
    </el-table-column>
    <el-table-column
      label="所属学校"
      width="180">
      <template slot-scope="scope">
          <p>{{ scope.row.cms_school_name }}</p>
      </template>
    </el-table-column>
     <el-table-column
      label="手机号"
      width="180">
      <template slot-scope="scope">
        <p>{{scope.row.phone}}</p>
      </template>
    </el-table-column>
     <el-table-column
      label="报名时间"
      width="180">
      <template slot-scope="scope">
        <p>{{scope.row.created_at}}</p>
      </template>
    </el-table-column>
  </el-table></el-col>
</el-row>
<el-row>
  <el-col :span="24"><div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10,20,30,40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
  </el-col>
</el-row>
    </div>
  </div>
</template>

<script>
import {url,baseApi} from "@/utils/common";
import {getApplyList} from "@/api/api"
export default {
  components:{},
  props:['act_id'],
  data(){
    return {
        options: [{
          value: '1',
          label: '账号问题'
        },
        {
          value: '2',
          label: '使用不流畅'
        },
        {
          value: '3',
          label: '提现问题 '
        },
        {
          value: '4',
          label: '优化建议'
        }, 
        {
          value: '5',
          label: '其他问题'
        },
         {
          value: '6',
          label: '全部'
        }],
        value: '',
        tableHead:[
        ],
        gridData: [{
          username:'吴俊钟',
          account:'17610303166 ',
          type:'刘英',
          content:"你妹的"
        }],
         dialogTableVisible: false,
        dialogFormVisible: false,
        currentPage: 1,
        url: url,
      baseApi: baseApi,
        total:0,
        type:'',
        pagesize:10
    }
  },
  watch:{},
  computed:{},
  methods:{
        handleSizeChange(size) {
        this.pagesize = size;
           feedback( this.type,this.currentPage,
        this.pagesize).then(res=>{
      this.gridData=res.data.data
    })
      },
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage;
           feedback( this.type,this.currentPage,
        this.pagesize).then(res=>{
      this.gridData=res.data.data
    })
      },
      query(){
          feedback( this.type,this.currentPage,
        this.pagesize).then(res=>{
      this.gridData=res.data.data
      this.total=res.data.meta.total;
    })
      },
      changeSelect(e){
        if(e==6){
          this.type=''
        }else{
          this.type=e
        }
      }
  },
  created(){
   
  },
  mounted(){
    this.act_id=this.$route.query.act_id
     getApplyList(this.act_id).then(res=>{
      this.gridData=res.data.data
      this.total=res.data.meta.total;
    })
  }
}
</script>
<style lang="scss" scoped>
.imgUp {
  width: 100px;
  height: 50px;
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