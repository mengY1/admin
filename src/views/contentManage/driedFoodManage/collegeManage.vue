<template>
  <div class="banner">
    <el-row style="margin-top:10px">
      <el-col :span="3" style="margin-right:10px">
        <el-input placeholder="文章标题" suffix-icon="el-icon-date" v-model="input1"></el-input>
      </el-col>
      <el-col :span="6" style="margin-right:10px">
        <div class="block">
          <el-date-picker
            v-model="value1"
            :editable="false"
            type="daterange"
            align="right"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            unlink-panels
            range-separator="至"
            start-placeholder="创建开始时间"
            end-placeholder="创建结束时间"
          ></el-date-picker>
        </div>
      </el-col>
      <el-col :span="3" style="margin-right:10px">
        <el-select v-model="value" clearable placeholder="上架状态">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="3" style="margin-right:10px">
        <el-input placeholder="内容来源" suffix-icon="el-icon-date" v-model="input2"></el-input>
      </el-col>
      <el-col :span="3" style="margin-right:10px">
        <el-select v-model="value2" clearable placeholder="置顶状态">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="2" style="margin-right:10px">
        <el-button @click="queryDriedFood" type="primary" round>查询</el-button>
      </el-col>
      <el-col :span="2" style="margin-right:10px">
        <el-button type="primary" @click="releaseDaily">发布干货</el-button>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="文章标题" width="180">
            <template slot-scope="scope">
              <p>{{ scope.row.title }}</p>
            </template>
          </el-table-column>
          <el-table-column label="收藏人数" width="80">
            <template slot-scope="scope">
              <p>{{ scope.row.collections }}</p>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" width="180">
            <template slot-scope="scope">
              <p>{{scope.row.created_at}}</p>
            </template>
          </el-table-column>
          <el-table-column label="发布时间" width="180">
            <template slot-scope="scope">
              <p>{{scope.row.publish_at}}</p>
            </template>
          </el-table-column>
          <el-table-column label="领取人数" width="80">
            <template slot-scope="scope">
              <p>{{scope.row.pull_count}}</p>
            </template>
          </el-table-column>
          <el-table-column label="PV" width="50">
            <template slot-scope="scope">
              <p>{{scope.row.pv}}</p>
            </template>
          </el-table-column>
          <el-table-column label="UV" width="50">
            <template slot-scope="scope">
              <p>{{scope.row.uv}}</p>
            </template>
          </el-table-column>
          <el-table-column label="内容分类" width="80">
            <template slot-scope="scope">
              <p>{{scope.row.university_type}}</p>
            </template>
          </el-table-column>
          <el-table-column label="内容来源" width="80">
            <template slot-scope="scope">
              <p>{{scope.row.publisher}}</p>
            </template>
          </el-table-column>
          <el-table-column label="上架状态" width="80">
            <template slot-scope="scope">
              <p>{{scope.row.line_status_name}}</p>
            </template>
          </el-table-column>
          <el-table-column label="创建人" width="80">
            <template slot-scope="scope">
              <p>{{scope.row.created_user}}</p>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <span @click="getDetail(scope.row.university_id)">
                <el-button size="small" @click="dialogTableVisible = true">预览</el-button>
              </span>
              <el-dialog
                width="375px"
                title="干货预览"
                :visible.sync="dialogTableVisible"
              >
                <div class="content">
                  <div class="title" v-if="detailInfo">
                    <p>{{detailInfo.title}}</p>
                  </div>
                  <div class="time">
                    <span>{{detailInfo.publisher}}</span>
                    <span>{{detailInfo.publish_at}}</span>
                  </div>
                  <div class="text">
                      <p ref="refContent" v-html="detailInfo.universities_content"></p>
                  </div>
                </div>
              </el-dialog>
              <el-button size="small" @click="toDetail(scope.row.university_id)">详情</el-button>
               <el-button size="small" @click="toEdit(scope.row.university_id)" v-if="scope.row.line_status==0&&!lineIdentity">编辑</el-button>
              <el-button size="small" @click="toEdit(scope.row.university_id)" v-if="lineIdentity">编辑</el-button>
              <el-popover placement="top" width="160" v-model="visible2">
                <p>确定删除此日报吗？</p>
                <div style="text-align: right; margin: 0">
                  <span @click="deleteDaily">
                    <el-button type="primary" size="mini" @click="visible2 = false">确定</el-button>
                  </span>
                </div>
                <el-button
                  v-if="deleteIdentity"
                  @click="getNewId(scope.row.university_id)"
                  size="small"
                  slot="reference"
                >删除</el-button>
              </el-popover>
              <el-button
                size="small"
                :plain="true"
                v-if="scope.row.line_status==0&&lineIdentity"
                @click="upAndLow(scope.row.university_id)"
              >上架</el-button>
              <el-button
                size="small"
                :plain="true"
                v-if="scope.row.line_status==1&&lineIdentity"
                @click="upAndLow(scope.row.university_id)"
              >下架</el-button>
              <el-button
                size="small"
                v-if="scope.row.top_status==0&&topIdentity"
                @click="dailyStick(scope.row.university_id)"
              >置顶</el-button>
              <el-button
                @click="dailyStick(scope.row.university_id)"
                v-if="scope.row.top_status==1&&topIdentity"
                size="small"
                slot="reference"
              >取消置顶</el-button>
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
import {
  getUniversityList,
  deleteCollege,
  collegeUpAndLow,
  collegeStick,
  getUniversityDetail
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
      university_id: "",
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
      detailInfo:''
    };
  },
  watch: {},
  computed: {},
  methods: {
    getDetail(university_id) {
      getUniversityDetail(university_id).then(res => {
        this.detailInfo = res.data;
      });
    },
     judeIdentity(arr,obj){
      var i = arr.length;  
      while (i--) {  
          if (arr[i] === obj) {  
              return true;  
          }  
      }  
      return false;  
    },
    dailyStick(university_id) {
      collegeStick(university_id).then(res => {
        this.$message({
          message: "操作成功",
          type: "success"
        });
        this.getUniversityList();
      });
    },
    upAndLow(university_id) {
      collegeUpAndLow(university_id).then(res => {
        this.$message({
          message: "操作成功",
          type: "success"
        });
        this.getUniversityList();
      });
    },
    queryDriedFood() {
      this.getUniversityList();
    },
    getUniversityList() {
      if (this.value2 == "已置顶") {
        this.top_status = 1;
      } else if (this.value2 == "未置顶") {
        this.top_status = 0;
      } else {
        this.top_status = "";
      }
      if (this.value == "上架") {
        this.line_status = 1;
      } else if (this.value == "下架") {
        this.line_status = 0;
      } else {
        this.line_status = "";
      }
      if (this.value1) {
        this.created_start_at = this.value1[0];
        this.created_end_at = this.value1[1];
      } else {
        this.created_start_at = "";
        this.created_end_at = "";
      }
      getUniversityList(
        this.currentPage,
        this.pagesize,
        this.input1,
        this.line_status,
        this.input2,
        this.top_status,
        this.created_start_at,
        this.created_end_at,
        ""
      ).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.meta.total;
      });
    },
    deleteDaily() {
      deleteCollege(this.university_id).then(res => {
        this.reload();
      });
    },
    getNewId(university_id) {
      this.university_id = university_id;
    },
    toEdit(university_id) {
      let routerUrl = this.$router.resolve({
        path: "/editCollege",
        query: {
          university_id
        }
      });
      window.open(routerUrl.href, "_blank");
    },
    toDetail(university_id) {
      let routerUrl = this.$router.resolve({
        path: "/collegeDetail",
        query: {
          university_id
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
      this.getUniversityList();
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getUniversityList();
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
    this.getUniversityList();
  }
};
</script>
<style lang="scss" >
.content {
  width: 335px;
  .title {
    width: 324px;
    font-size: 16px;
    font-family: PingFang-SC-Bold;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    line-height: 25px;
  }
  .time {
    font-size: 12px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(153, 153, 153, 1);
    line-height: 34px;
  }
  .text {
    img {
      max-width: 100% !important;
    }
    p {
       margin: 11px 0;
      font-size: 16px;
    }
  }
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
