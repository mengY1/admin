<template>
  <div class="banner">
    <el-row style="margin-top:30px;" >
      <el-col :span="2">
        <el-button type="success" @click="queryAll"  plain>全部（{{all_subscriptions}}）</el-button>
      </el-col>
      <el-col :span="2"  v-for="(item,index) in tabData" :key="index">
        <el-button @click="queryInfo(item.type)" type="success" plain>{{item.type_name}}（{{item.subscriptions}}）</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="微信昵称" width="180">
            <template slot-scope="scope">
              <p>{{ scope.row.nickname }}</p>
            </template>
          </el-table-column>
          <el-table-column label="订阅时间" width="180">
            <template slot-scope="scope">
              <p>{{scope.row.created_at}}</p>
            </template>
          </el-table-column>
          <el-table-column label="用户身份" width="180">
            <template slot-scope="scope">
              <p>{{scope.row.user_type}}</p>
            </template>
          </el-table-column>
          <el-table-column label="订阅类型" width="180">
            <template slot-scope="scope">
              <p>{{scope.row.type}}</p>
            </template>
          </el-table-column>
          <el-table-column label="关注公众号" width="180">
            <template slot-scope="scope">
              <p>{{scope.row.is_subscribe_offical_account==0?"否":"是"}}</p>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-popover placement="right" width="400" trigger="click">
                <table v-if="scope.row.user_detail">
                  <h2>用户详情</h2>
                  <tr>
                    <td>用户身份</td>
                    <td>{{scope.row.user_detail.is_chief}}</td>
                  </tr>
                  <tr>
                    <td>用户名</td>
                    <td>{{scope.row.user_detail.realname}}</td>
                  </tr>
                  <tr>
                    <td>手机号</td>
                    <td>{{scope.row.user_detail.account}}</td>
                  </tr>
                  <tr>
                    <td>学校</td>
                    <td>{{scope.row.user_detail.cms_school_name}}</td>
                  </tr>
                  <tr>
                    <td>专业</td>
                    <td>{{scope.row.user_detail.cms_major_name}}</td>
                  </tr>
                  <tr>
                    <td>年级</td>
                    <td>{{scope.row.user_detail.grade}}</td>
                  </tr>
                  <tr>
                    <td>用户来源</td>
                    <td>{{scope.row.user_detail.source}}</td>
                  </tr>
                  <tr>
                    <td>注册时间</td>
                    <td>{{scope.row.user_detail.created_at}}</td>
                  </tr>
                  <tr>
                    <td>订阅类型</td>
                    <td>{{scope.row.type}}</td>
                  </tr>
                  <tr>
                    <td>订阅时间</td>
                    <td>{{scope.row.created_at}}</td>
                  </tr>
                </table>
                <el-button v-if="scope.row.user_detail" size="mini" slot="reference" round>详情</el-button>
                <el-button v-else disabled size="mini" slot="reference" round>未注册</el-button>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10,20,30,40]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getDailyFollowList, deleteDailyI,getFollowStatistics } from "../../../src/api/api";
import {url,baseApi} from "@/utils/common";
export default {
  inject: ["reload"],
  components: {},
  props: {},
  data() {
    var validatePass = (rule, value, callback) => {
      var reg = new RegExp(/^\+?[1-9]\d*$/);
      if (value === "") {
        callback(new Error("请输入权重"));
      } else if (!reg.test(value)) {
        callback(new Error("权重只能为大于0的整数"));
      } else {
        callback();
      }
    };
    return {
      rules2: {
        sort: [{ validator: validatePass, trigger: "change" }]
      },
      isShowEdit: false,
      isShowAdd: false,
      tableData: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogVisible: false,
      form: {
        urls: "",
        sort: "",
        cover: "",
        visible2: false
      },
      loading2: false,
      formLabelWidth: "120px",
      currentPage: 1,
      dialogVisible: false,
      token: " ",
      url: url,
      baseApi: baseApi,
      dialogImageUrl: "",
      dialogImageUrlJunJhong: "",
      editBanner: "",
      banerIdDelete: "",
      editBanner_id: "",
      total: 0,
      isHave: true,
      isShowI: true,
      pagesize: 10,
      type: "",
      tabData:"",
      all_subscriptions:""
    };
  },
  watch: {},
  computed: {},
  methods: {
    queryAll(){
      this.type=''
      this.getList()
    },
    queryInfo(type){
      this.type=type;
      this.getList()
    },
    getList() {
      getDailyFollowList(this.type, this.currentPage, this.pagesize).then(
        res => {
          this.tableData = res.data.data;
          this.total = res.data.meta.total;
        }
      );
    },
    deleteDaily() {
      deleteDailyI(this.news_id).then(res => {
        this.reload();
      });
    },
    getNewId(news_id) {
      this.news_id = news_id;
    },
    toEdit(news_id) {
      this.$router.push({
        path: "/editDaily",
        query: {
          news_id
        }
      });
    },
    toDetail(news_id) {
      this.$router.push({
        path: "/dailyDetail",
        query: {
          news_id
        }
      });
    },
    releaseDaily() {
      this.$router.push({
        path: "/releaseDaily"
      });
    },
    onProgress() {
      this.loading2 = true;
    },
    beforeAvatarUpload(file) {},
    reqEdit() {
      if (this.dialogImageUrlJunJhong) {
        this.editBanner = this.dialogImageUrlJunJhong;
      }
      var editParams = {
        cover: this.editBanner,
        sort: this.form.sort,
        url: this.form.url
      };
      bannersEdit(editParams, this.editBanner_id).then(res => {
        this.reload();
        this.dialogFormVisible = false;
      });
    },
    baoCunAdd() {
      var addParams = {
        cover: this.dialogImageUrlJunJhong,
        sort: this.form.sort,
        url: this.form.url
      };
      bannersAdd(addParams).then(res => {
        this.reload();
        this.dialogFormVisible = false;
      });
    },
    handleRemove(file, fileList) {
    },
    handleAvatarSuccess(res, file) {
      this.dialogImageUrl = this.url + res.path;
      this.dialogImageUrlJunJhong = res.path;
      this.isHave = false;
      this.isShowI = true;
      this.loading2 = false;
    },
    upLoadSuc(response, file, fileList) {
      this.isHave = false;
      this.isShowI = true;
      this.dialogImageUrl = response.path;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleEdit(banner_id) {
      this.isShowEdit = true;
      this.isShowAdd = false;
      if (banner_id) {
        this.editBanner_id = banner_id;
        bannersInfo({}, banner_id).then(res => {
          this.form = res;
          this.dialogImageUrl = this.url + res.cover;
          this.isHave = true;
          this.isShowI = false;
          this.dialogImageUrlJunJhong = res.cover;
        });
      }
    },
    handleAdd() {
      this.dialogImageUrl = "";
      this.editBanner = "";
      this.form.sort = "";
      this.form.url = "";
      this.isShowAdd = true;
      this.isShowEdit = false;
    },
    handleDelete(banner_id) {
      this.banerIdDelete = banner_id;
    },
    isDelete() {
      bannersDelete({}, this.banerIdDelete).then(res => {
        this.reload();
      });
    },
    handleSizeChange(size) {
      this.pagesize = size;
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getList();
    }
  },
  created() {},
  mounted() {
    // this.token+=sessionStorage.getItem('token');
    this.getList();
    getFollowStatistics().then(res=>{
      this.tabData=res.data.data
      this.all_subscriptions=res.data.all_subscriptions
    })
  }
};
</script>
<style lang="scss" scoped>
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
.imgUp {
  width: 100px;
  height: 50px;
}
.avatar-uploader .el-upload {
  border: 1px solid black;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  z-index: 5;
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