<template>
  <div class="banner">
    <el-row>
      <el-col :span="24" style="margin-top:60px;">
        <el-input placeholder="请输入内容" v-model="input">
          <template slot="prepend">分类名</template>
        </el-input>
      </el-col>
      <el-col :span="24"  style="margin-top:30px;">
          <el-tag type="success">分类内容</el-tag><span style="padding-left:10px;">请勾选属于该分类下的文章</span>
      </el-col>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="文章标题" width="600">
            <template slot-scope="scope">
              <p>{{ scope.row.title }}</p>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-checkbox @change="change(scope.row.scheme_id)"></el-checkbox>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
       <el-col :span="24" style="margin-top:30px;">
       <el-button type="success" @click="addType">保存</el-button>
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
import {
  getPlanList,
  addPlanType,
  collegeUpAndLow,
  collegeStick
} from "@/api/api";
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
      currentPage:1,
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
      scheme_id: "",
      input1: "",
      input2: "",
      value: "",
      value2: "",
      options: [
        {
          value: "上架",
          label: "上架"
        },
        {
          value: "下架",
          label: "下架"
        }
      ],
      options1: [
        {
          value: "已置顶",
          label: "已置顶"
        },
        {
          value: "未置顶",
          label: "未置顶"
        }
      ],
      top_status: "",
      line_status: "",
      created_start_at: "",
      created_end_at: "",
      value1: "",
      permissions: "",
      lineIdentity: "",
      topIdentity: "",
      deleteIdentity: "",
      scheme_ids: []
    };
  },
  watch: {},
  computed: {},
  methods: {
      addType(){
          addPlanType({
              name:this.input,
              scheme_ids:this.scheme_ids
          }).then(res=>{
              this.$router.push({
                  path:"/planType"
              })
          })
      },
    change(scheme_id) {
      this.scheme_ids.push(scheme_id);
      this.scheme_ids = this.unique(this.scheme_ids);
    },
    unique(arr) {
      var x = new Set(arr);
      return [...x];
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
    dailyStick(scheme_id) {
      collegeStick(scheme_id).then(res => {
        this.$message({
          message: "操作成功",
          type: "success"
        });
        this.getPlanList();
      });
    },
    upAndLow(scheme_id) {
      collegeUpAndLow(scheme_id).then(res => {
        this.$message({
          message: "操作成功",
          type: "success"
        });
        this.getPlanList();
      });
    },
    queryDriedFood() {
      this.getPlanList();
    },
    getPlanList() {
      if (this.value1) {
        this.created_start_at = this.value1[0];
        this.created_end_at = this.value1[1];
      } else {
        this.created_start_at = "";
        this.created_end_at = "";
      }
      getPlanList(
        this.currentPage,
        this.pagesize,
        this.input1,
        this.line_status,
        this.input2,
        this.top_status,
        this.created_start_at,
        this.created_end_at,
        0
      ).then(res => {
       this.tableData=res.data.data
        this.total =  res.data.meta.total;
      });
    },
    getNewId(scheme_id) {
      this.scheme_id = scheme_id;
    },
    toEdit(scheme_id) {
      let routerUrl = this.$router.resolve({
        path: "/editCollege",
        query: {
          scheme_id
        }
      });
      window.open(routerUrl.href, "_blank");
    },
    toDetail(scheme_id) {
      let routerUrl = this.$router.resolve({
        path: "/collegeDetail",
        query: {
          scheme_id
        }
      });
      window.open(routerUrl.href, "_blank");
    },
    releaseDaily() {
      this.$router.push({
        path: "/addText"
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
      this.getPlanList();
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getPlanList();
    }
  },
  created() {},
  mounted() {
    this.permissions = JSON.parse(sessionStorage.getItem("permissions"));
    this.lineIdentity = this.judeIdentity(
      this.permissions,
      "admin.universities.line"
    );
    this.topIdentity = this.judeIdentity(
      this.permissions,
      "admin.universities.top"
    );
    this.deleteIdentity = this.judeIdentity(
      this.permissions,
      "admin.universities.destroy"
    );
    // this.token+=sessionStorage.getItem('token');
    this.getPlanList();
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
