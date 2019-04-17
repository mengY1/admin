<template>
  <div class="banner">
    <el-row>
      <el-col :span="24">
        <span @click="handleAdd()">
          <el-button @click="dialogFormVisible = true">添加</el-button>
        </span>

        <el-dialog
          v-if="isShowAdd"
          title="添加banner"
          :visible.sync="dialogFormVisible"
          :show-close="false"
        >
          <el-form :model="form">
            <el-form-item label="banner" :label-width="formLabelWidth">
              <el-upload
                v-loading="loading2"
                element-loading-text="拼命上传中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                style="width:375px;height:176px"
                class="avatar-uploader"
                :action="url+'/admin/banners/cover/upload'"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :on-progress="onProgress"
                :before-upload="beforeAvatarUpload"
              >
                <img
                  v-if="dialogImageUrl"
                  :src="dialogImageUrl"
                  style="width:375px;height:176px"
                  class="avatar"
                >
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="链接" :label-width="formLabelWidth">
              <el-input v-model="form.url" autocomplete="off"></el-input>
            </el-form-item>

            <el-form
              :model="form"
              status-icon
              :rules="rules2"
              ref="ruleForm2"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="权重" prop="sort" :label-width="formLabelWidth">
                <el-input v-model="form.sort" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <span @click="baoCunAdd">
              <el-button type="primary" @click="dialogFormVisible=true">保 存</el-button>
            </span>
          </div>
        </el-dialog>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="封面图" width="180">
            <template slot-scope="scope">
              <el-popover placement="bottom" width="400" trigger="click">
                <img :src="url+scope.row.cover" style="width:400px;height:200px" alt>
                <el-button slot="reference">
                  <img class="imgUp" :src="url+scope.row.cover" alt>
                </el-button>
              </el-popover>
            </template>
          </el-table-column>

          <el-table-column label="链接" width="auto">
            <template slot-scope="scope">
              <p>{{ scope.row.url }}</p>
            </template>
          </el-table-column>
          <el-table-column label="权重" width="180">
            <template slot-scope="scope">
              <p>{{scope.row.sort}}</p>
            </template>
          </el-table-column>
          <el-table-column label="点击次数" width="180">
            <template slot-scope="scope">
              <p>{{scope.row.pv}}</p>
            </template>
          </el-table-column>
          <el-table-column label="点击人数" width="180">
            <template slot-scope="scope">
              <p>{{scope.row.uv}}</p>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <span size="mini" @click="handleEdit(scope.row.banner_id)">
                <el-button size="small" @click="dialogFormVisible = true">编辑</el-button>
              </span>

              <el-dialog
                v-if="isShowEdit"
                title="编辑banner"
                :visible.sync="dialogFormVisible"
                :show-close="false"
              >
                <el-form :model="form">
                  <el-form-item label="banner" :label-width="formLabelWidth">
                    <el-upload
                      v-loading="loading2"
                      element-loading-text="拼命上传中"
                      element-loading-spinner="el-icon-loading"
                      element-loading-background="rgba(0, 0, 0, 0.8)"
                      style="width:375px;height:176px"
                      class="avatar-uploader"
                       :action="baseApi+'/upload/cover'"
                      tip="正在上传"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :on-progress="onProgress"
                      :before-upload="beforeAvatarUpload"
                    >
                      <img
                        v-if="dialogImageUrl"
                        style="width:375px;height:176px"
                        :src="dialogImageUrl"
                        class="avatar"
                      >
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>

                    <el-dialog>
                      <img width="50%" :src="dialogImageUrl" alt>
                    </el-dialog>
                  </el-form-item>
                  <el-form-item label="链接" :label-width="formLabelWidth">
                    <el-input v-model="form.url" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form
                    :model="form"
                    status-icon
                    :rules="rules2"
                    ref="ruleForm2"
                    label-width="100px"
                    class="demo-ruleForm"
                  >
                    <el-form-item label="权重" prop="sort" :label-width="formLabelWidth">
                      <el-input v-model="form.sort" autocomplete="off"></el-input>
                    </el-form-item>
                  </el-form>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <span>
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                  </span>
                  <span @click="reqEdit">
                    <el-button type="primary" @click="dialogFormVisible = true">保 存</el-button>
                  </span>
                </div>
              </el-dialog>

              <span size="mini" @click="handleDelete(scope.row.banner_id)">
                <el-button size="mini" @click="dialogVisible = true">删除</el-button>
                <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
                  <span>确定删除banner吗？</span>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <span @click="isDelete">
                      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                    </span>
                  </span>
                </el-dialog>
              </span>
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
  bannersList,
  bannersInfo,
  bannersAdd,
  bannersDelete,
  bannersEdit
} from "@/api/api";
import { url } from "@/utils/common";
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
      pagesize: 10
    };
  },
  watch: {},
  computed: {},
  methods: {
    getBannersList() {
      bannersList(this.currentPage, this.pagesize).then(res => {
        this.tableData = res.data;
        this.total = res.meta.total;
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
    handleRemove(file, fileList) {},
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
      this.getBannersList();
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getBannersList();
    }
  },
  created() {},
  mounted() {
    console.log(this.url)
    // this.token+=sessionStorage.getItem('token');
    this.getBannersList();
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
