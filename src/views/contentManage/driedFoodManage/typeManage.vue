<template>
  <div class="banner">
    <el-row>
      <ce-col :span="24">
        
      </ce-col>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="分类名" width="180">
            <template slot-scope="scope">
              <p>{{ scope.row.name }}</p>
            </template>
          </el-table-column>
          <el-table-column label="分类内容" width="180">
            <template slot-scope="scope">
              <p>{{scope.row.content_count}}条</p>
            </template>
          </el-table-column>
          <!-- <el-table-column label="排序" width="180">
            <template slot-scope="scope">
              <p>{{scope.row.content_count}}条</p>
            </template>
          </el-table-column> -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="small"
                @click="toEditType(scope.row.university_type_id)"
                v-if="scope.row.line_status==0&&!lineIdentity"
              >编辑</el-button>
              <el-button size="small" @click="toEditType(scope.row.university_type_id)" v-if="lineIdentity">编辑</el-button>
              <el-popover placement="top" width="160" v-model="visible2">
                <p>该分类下还有{{scope.row.content_count}}条上架内容，确定删除该分类吗？</p>
                <div style="text-align: right; margin: 0">
                  <span @click="deleteDriedFood">
                    <el-button type="primary" size="mini" @click="visible2 = false">确定</el-button>
                  </span>
                </div>
                <el-button
                  v-if="deleteIdentity"
                  @click="getNewId(scope.row.university_type_id)"
                  size="small"
                  slot="reference"
                >删除</el-button>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
       <el-col :span="6"><el-button  @click="toAddType">添加分类</el-button></el-col>
    </el-row>
    <!-- <el-row>
      <el-col :span="18">
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
     
    </el-row> -->
  </div>
</template>

<script>
import {
  getDriedFoodList,
  deleteDriedFoodType,
  dailyUpAndLow,
  dailyStick
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
        cover: ""
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
      input1: "",
      input2: "",
      value: "",
      value1: "",
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
      publish_start_at: "",
      publish_end_at: "",
      permissions: "",
      lineIdentity: "",
      topIdentity: "",
      deleteIdentity: ""
    };
  },
  watch: {},
  computed: {},
  methods: {
      toAddType(){
          this.$router.push({
              path:"/addType"
          })
      },
    // 上下架
    upAndLow(university_type_id) {
      dailyUpAndLow(university_type_id).then(res => {
        this.$message({
          message: "操作成功",
          type: "success"
        });
        this.getDriedFoodList();
      });
    },
    dailyStick(university_type_id) {
      dailyStick(university_type_id).then(res => {
        this.$message({
          message: "操作成功",
          type: "success"
        });
        this.getDriedFoodList();
      });
    },
    queryDaily() {
      this.getDriedFoodList();
    },
    getDriedFoodList() {
      getDriedFoodList(
      ).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.data.length;
      });
    },
    deleteDriedFood() {
      deleteDriedFoodType(this.university_type_id).then(res => {
        this.reload();
      });
    },
    getNewId(university_type_id) {
      this.university_type_id = university_type_id;
    },
    toEditType(university_type_id) {
      let routerUrl = this.$router.resolve({
        path: "/editType",
        query: {
          university_type_id
        }
      });
      window.open(routerUrl.href, "_blank");
    },
    toDetail(university_type_id) {
      let routerUrl = this.$router.resolve({
        path: "/dailyDetail",
        query: {
          university_type_id
        }
      });
      window.open(routerUrl.href, "_blank");
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
      this.getDriedFoodList();
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getDriedFoodList();
    },
    judeIdentity(arr, obj) {
      var i = arr.length;
      while (i--) {
        if (arr[i] === obj) {
          return true;
        }
      }
      return false;
    }
  },
  created() {},
  mounted() {
    // this.token+=sessionStorage.getItem('token');
    this.permissions = JSON.parse(sessionStorage.getItem("permissions"));
    this.lineIdentity = this.judeIdentity(this.permissions, "admin.news.line");
    this.topIdentity = this.judeIdentity(this.permissions, "admin.news.top");
    this.deleteIdentity = this.judeIdentity(
      this.permissions,
      "admin.news.destroy"
    );
    this.getDriedFoodList();
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