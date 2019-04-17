<template>
  <div class="wrapper">
    <el-row style="margin-top:10px">
      <el-col :span="3" style="margin-right:50px">
        <el-input placeholder="搜索昵称/手机号" suffix-icon="el-icon-date" v-model="input1"></el-input>
      </el-col>
      <el-col :span="5" style="margin-right:50px">
        <el-date-picker
          v-model="value4"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
        ></el-date-picker>
      </el-col>
      <el-col :span="4" style="margin-right:10px">
        <el-button @click="query" type="primary" round>查询</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table id="rebateSetTable" :data="gridData" style="width: 100%">
          <el-table-column label="用户身份" width="150">
            <template slot-scope="scope">
              <p>{{ scope.row.is_chief }}</p>
            </template>
          </el-table-column>
          <el-table-column label="昵称" width="150">
            <template slot-scope="scope">
              <p>{{ scope.row.realname }}</p>
            </template>
          </el-table-column>
          <el-table-column label="手机号" width="150">
            <template slot-scope="scope">
              <p>{{scope.row.account}}</p>
            </template>
          </el-table-column>
          <el-table-column label="性别" width="150">
            <template slot-scope="scope">
              <p>{{scope.row.sex}}</p>
            </template>
          </el-table-column>
          <el-table-column label="是否完善信息" width="150">
            <template slot-scope="scope">
              <p>{{scope.row.is_full}}</p>
            </template>
          </el-table-column>
          <el-table-column label="学校" width="150">
            <template slot-scope="scope">
              <p>{{scope.row.cms_school_name}}</p>
            </template>
          </el-table-column>
          <el-table-column label="专业" width="150">
            <template slot-scope="scope">
              <p>{{scope.row.cms_major_name}}</p>
            </template>
          </el-table-column>
          <el-table-column label="年级" width="150">
            <template slot-scope="scope">
              <p>{{scope.row.grade}}</p>
            </template>
          </el-table-column>
          <el-table-column label="注册时间" width="150">
            <template slot-scope="scope">
              <p>{{scope.row.created_at}}</p>
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
            :page-sizes="[10, 20, 30,40]"
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
</template>

<script>
import { getRegisterData } from "../../../src/api/api";
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  components: {},
  props: {},
  data() {
    return {
      fullscreenLoading: false,
      input1: "",
      value4: "",
      gridData: [{}],
      currentPage: 1,
      total: 0,
      type: "",
      pagesize: 10,
      imp: "",
      source: "",
      excelPath: "",
      created_start_at: "",
      created_end_at: "",
      user_id: ""
    };
  },
  watch: {},
  computed: {},
  methods: {
    getRegisterData() {
      getRegisterData(
        this.user_id,
        this.currentPage,
        this.pagesize,
        this.created_start_at,
        this.created_end_at,
        this.input1,
        this.imp
      ).then(res => {
        this.gridData = res.data.data;
        this.total = res.data.meta.total;
      });
    },
    showDetail() {},
    async exportExcel() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      this.imp = 1;
      let shcoolRes = await getRegisterData(
        this.user_id,
        this.currentPage,
        this.pagesize,
        this.created_start_at,
        this.created_end_at,
        this.input1,
        this.imp
      );
      this.excelPath = shcoolRes.data.path;
      window.location.href = `http://54qjapi.54qn.cn/${this.excelPath}`;
      loading.close();
    },
    handleSizeChange(size) {
      this.pagesize = size;
      this.getRegisterData();
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getRegisterData();
    },
    query() {
      this.total = 0;
      this.currentPage = 1;
      this.imp = "";
     if (this.value4) {
        this.created_start_at = this.value4[0];
        this.created_end_at = this.value4[1];
      } else {
        this.created_start_at = "";
        this.created_end_at = "";
      }
      this.getRegisterData();
    }
  },
  created() {},
  mounted() {
    this.user_id = this.$route.query.user_id;
    this.getRegisterData();
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
