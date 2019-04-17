<template>
  <div class="banner">
    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="文章标题" width="180">
            <template slot-scope="scope">
              <p>{{ scope.row.title }}</p>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" width="180">
            <template slot-scope="scope">
              <p>{{scope.row.created_at}}</p>
            </template>
          </el-table-column>
          <el-table-column label="更新时间" width="180">
            <template slot-scope="scope">
              <p>{{scope.row.updated_at}}</p>
            </template>
          </el-table-column>
          <el-table-column label="创建人" width="80">
            <template slot-scope="scope">
              <p>{{scope.row.created_user}}</p>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <span @click="getDetail(scope.row.draft_id)">
                <el-button size="small" @click="dialogTableVisible = true">预览</el-button>
              </span>
              <el-dialog
                width="375px"
                title="干货草稿预览"
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
                      <p ref="refContent" v-html="detailInfo.news_content"></p>
                  </div>
                </div>
              </el-dialog>
              <el-button size="small" @click="toEdit(scope.row.draft_id)">编辑</el-button>
              <el-popover placement="top" width="160" v-model="visible2">
                <p>确定删除此日报吗？</p>
                <div style="text-align: right; margin: 0">
                  <span @click="deleteDaily">
                    <el-button type="primary" size="mini" @click="visible2 = false">确定</el-button>
                  </span>
                </div>
                <el-button
                  @click="getNewId(scope.row.draft_id)"
                  size="small"
                  slot="reference"
                >删除</el-button>
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
import {
  getDraftList,
  draftDetail,
  deleteDraft,
  getUniversityDetail
} from "@/api/api";
import {url,baseApi} from "@/utils/common";
export default {
  inject: ["reload"],
  components: {},
  props: {},
  data() {
    return {
      tableData: [],
      dialogTableVisible: false,
      currentPage: 1,
      url: url,
      baseApi: baseApi,
      total: 0,
      pagesize: 10,
      draft_id: "",
      input1: "",
      input2: "",
      top_status: "",
      line_status: "",
      created_start_at: "",
      created_end_at: "",
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
    getDetail(draft_id) {
      draftDetail(draft_id).then(res => {
        this.detailInfo = res.data.data;
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
    getDraftList() {
      getDraftList(
        2,
        this.currentPage,
        this.pagesize,
      ).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.meta.total;
      });
    },
    deleteDaily() {
      deleteDraft(this.draft_id).then(res => {
        this.reload();
      });
    },
    getNewId(draft_id) {
      this.draft_id = draft_id;
    },
    toEdit(draft_id) {
      let routerUrl = this.$router.resolve({
        path: "/editCollege",
        query: {
          draft_id
        }
      });
      window.open(routerUrl.href, "_blank");
    },
    releaseDaily() {
      this.$router.push({
        path: "/addText"
      });
    },
    handleSizeChange(size) {
      this.pagesize = size;
      this.getDraftList();
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getDraftList();
    }
  },
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
    this.getDraftList();
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
      max-width: 100% !important
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
