<template>
  <div class="wrapper">
    <div class="main">
      <el-row style="margin-top:10px">
        <el-col :span="3" style="margin-right:10px">
          <el-input placeholder="社团名称" suffix-icon="el-icon-date" v-model="input1"></el-input>
        </el-col>
        <el-col :span="3" style="margin-right:10px">
          <el-input placeholder="所属学校" suffix-icon="el-icon-date" v-model="input2"></el-input>
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
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </el-col>
        <el-col :span="3" style="margin-right:10px">
          <el-select v-model="value" clearable placeholder="社团状态">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="3" style="margin-right:10px">
          <el-select v-model="value2" clearable placeholder="社团来源">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="2" style="margin-right:10px">
          <el-button @click="query" type="primary" round>查询</el-button>
        </el-col>
        <el-col :span="2" style="margin-right:10px">
          <el-button @click="addClub" type="primary" round>添加社团</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-table
            @sort-change="sortChange"
            id="rebateSetTable"
            :data="gridData"
            style="width: 100%"
          >
            <el-table-column label="社团名称" width="180">
              <template slot-scope="scope">
                <p>{{ scope.row.name }}</p>
              </template>
            </el-table-column>
            <el-table-column label="所属学校" width="180">
              <template slot-scope="scope">
                <p>{{ scope.row.cms_school_name }}</p>
              </template>
            </el-table-column>
            <el-table-column label="社长" width="130">
              <template slot-scope="scope">
                <p>{{scope.row.chief}}</p>
              </template>
            </el-table-column>
            <el-table-column label="关注人数" sortable prop="follow_count" width="100">
              <template slot-scope="scope">
                <p>{{scope.row.follow_count}}</p>
              </template>
            </el-table-column>
            <el-table-column label="创建时间" width="230">
              <template slot-scope="scope">
                <p>{{scope.row.created_at}}</p>
              </template>
            </el-table-column>
            <el-table-column label="社团状态" width="150">
              <template slot-scope="scope">
                <p>{{scope.row.org_status_name}}</p>
              </template>
            </el-table-column>
            <el-table-column label="社团来源" width="150">
              <template slot-scope="scope">
                <p>{{scope.row.operation_status_name}}</p>
              </template>
            </el-table-column>
            <el-table-column label="修改时间" sortable prop="updated_at" width="150">
              <template slot-scope="scope">
                <p>{{scope.row.updated_at}}</p>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleDelete(scope.row.org_id)">详情</el-button>
                <el-button size="mini" @click="handleDelete1(scope.row.org_id)">编辑</el-button>
                <el-popover placement="top" width="160" v-model="visible2">
                  <p>确定删除此社团吗?</p>
                  <div style="text-align: right; margin: 0">
                    <span @click="handleDelete2">
                      <el-button type="primary" size="mini" @click="visible2 = false">确定</el-button>
                    </span>
                  </div>
                  <el-button @click="getNewId(scope.row.org_id)" size="small" slot="reference">删除</el-button>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>

      <el-row>
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
        <el-col :span="6">
          <el-button
            @click="exportExcel"
            v-loading.fullscreen.lock="fullscreenLoading"
            style="margin-top: 2px;"
            size="medium"
            type="success"
          >导出</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getClubList, deleteClub } from "../../../api/api";
import clubDetail from "./clubDetail";
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  inject: ["reload"],
  components: {
    clubDetail
  },
  props: {},
  data() {
    return {
      fullscreenLoading: false,
      order_by: "created_at.desc",
      value1: "",
      value2: "",
      follow: "",
      input1: "",
      input2: "",
      options: [
        {
          value: "认领中",
          label: "认领中"
        },
        {
          value: "无人认领",
          label: "无人认领"
        },
        {
          value: "已认领",
          label: "已认领"
        }
      ],
      options1: [
        {
          value: "后台创建",
          label: "后台创建"
        },
        {
          value: "用户创建",
          label: "用户创建"
        },
        {
          value: "系统爬取",
          label: "系统爬取"
        },
        {
          value: "奇集任务",
          label: "奇集任务"
        }
      ],

      value: "",
      tableHead: [],
      gridData: [{}],
      currentPage: 1,
      total: "",
      type: "",
      pagesize: 10,
      is_full: "",
      created_start_at: "",
      created_end_at: "",
      org_id: "",
      showDetail: false,
      showList: true,
      string: "关注人数▲",
      excelPath: "",
      imp: 0
    };
  },
  watch: {},
  computed: {},
  methods: {
    getClubList() {
      getClubList(
        this.input1,
        this.input2,
        this.created_start_at,
        this.created_end_at,
        this.is_full,
        this.currentPage,
        this.pagesize,
        this.order_by,
        this.follow,
        this.imp
      ).then(res => {
        this.gridData = res.data.data;
        this.total = res.data.meta.total;
      });
    },
    getNewId(org_id) {
      this.org_id = org_id;
    },
    addClub() {
      this.$router.push({ path: "/addClub" });
    },
    sortChange: function(column, prop, order) {
      if (column.prop == "follow_count") {
        if (column.order == "descending") {
          this.order_by = 1;
        } else {
          this.order_by = -1;
        }
      }
      if (column.prop == "updated_at") {
        if (column.order == "descending") {
          this.order_by = 2;
        } else {
          this.order_by = -2;
        }
      }
      this.getClubList()
    },
    handleDelete(org_id) {
      this.org_id = org_id;
      let routerUrl = this.$router.resolve({
        path: "/clubDetail",
        query: {
          org_id
        }
      });
      window.open(routerUrl.href, "_blank");
    },
    handleDelete1(org_id) {
      let routerUrl = this.$router.resolve({
        path: "/clubEdit",
        query: { org_id: org_id }
      });
      window.open(routerUrl.href, "_blank");
    },
    handleDelete2() {
      deleteClub(this.org_id).then(res => {
        this.reload();
      });
    },
    async exportExcel() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      this.imp = 1;
      let clubRes = await getClubList(
        this.input1,
        this.input2,
        this.created_start_at,
        this.created_end_at,
        this.is_full,
        this.currentPage,
        this.pagesize,
        this.order_by,
        this.follow,
        this.imp
      );
      this.excelPath = clubRes.data.path;
      window.location.href = `http://54qjapi.54qn.cn/${this.excelPath}`;
      loading.close();
    },
    handleSizeChange(size) {
      this.pagesize = size;
      this.getClubList()
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getClubList()
    },
    query() {
      this.total = 0;
      this.currentPage = 1;
      if (this.value == "认领中") {
        this.is_full = 10;
      } else if (this.value == "已认领") {
        this.is_full = 20;
      } else if (this.value == "无人认领") {
        this.is_full = 30;
      } else {
        this.is_full = "";
      }
      if (this.value2 == "后台创建") {
        this.follow = 10;
      } else if (this.value2 == "用户创建") {
        this.follow = 20;
      } else if (this.value2 == "系统爬取") {
        this.follow = 30;
      } else if (this.value2 == "奇集任务") {
        this.follow = 40;
      } else {
        this.follow = "";
      }
      if (this.value1) {
        this.created_start_at = this.value1[0];
        this.created_end_at = this.value1[1];
      } else {
        this.created_start_at = "";
        this.created_end_at = "";
      }
      this.getClubList()
    }
  },
  created() {},
  mounted() {
    this.getClubList()
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
</style>
