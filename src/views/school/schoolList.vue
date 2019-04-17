<template>
  <div class="wrapper">
    <el-row style="margin-top:10px">
      <el-col :span="3" style="margin-right:50px">
        <el-input placeholder="学校名称" suffix-icon="el-icon-date" v-model="input1"></el-input>
      </el-col>
      <!-- <el-col :span="3" style="margin-right:50px">
        <el-select v-model="value1" clearable placeholder="用户数">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="3" style="margin-right:50px">
        <el-select v-model="value2" clearable placeholder="总社团数">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="3" style="margin-right:50px">
        <el-select v-model="value3" clearable placeholder="总社团活跃数">
          <el-option
            v-for="item in options3"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>-->
      <el-col :span="4" style="margin-right:10px">
        <el-button @click="query" type="primary" round>查询</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table id="rebateSetTable" :data="gridData" style="width: 100%">
          <el-table-column label="学校名称" width="150">
            <template slot-scope="scope">
              <p>{{ scope.row.name }}</p>
            </template>
          </el-table-column>
          <el-table-column label="用户数" width="150">
            <template slot-scope="scope">
              <p>{{ scope.row.user_count }}</p>
            </template>
          </el-table-column>
          <el-table-column label="总社团活动数" width="150">
            <template slot-scope="scope">
              <p>{{scope.row.act_count}}</p>
            </template>
          </el-table-column>
          <el-table-column label="总社团数" width="150">
            <template slot-scope="scope">
              <p>
                {{scope.row.org_count}}
                <el-popover placement="right" width="400" trigger="click">
                  <table>
                    <h2>总社团数详情</h2>
                    <tr>
                      <td>总社团数</td>
                      <td>{{scope.row.org_count}}</td>
                    </tr>
                    <tr>
                      <td>用户创建社团数</td>
                      <td>{{scope.row.org_detail[20]}}</td>
                    </tr>
                    <tr>
                      <td>奇集任务社团数</td>
                      <td>{{scope.row.org_detail[40]}}</td>
                    </tr>
                    <tr>
                      <td>后台创建社团数</td>
                      <td>{{scope.row.org_detail[10]}}</td>
                    </tr>
                    <tr>
                      <td>系统爬取社团数</td>
                      <td>{{scope.row.org_detail[30]}}</td>
                    </tr>
                  </table>
                  <el-button @click="showDetail" size="mini" slot="reference" round>详情</el-button>
                </el-popover>
              </p>
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
import { getSchoolList } from "../../../src/api/api";
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  components: {},
  props: {},
  data() {
    return {
      fullscreenLoading: false,
      value1: "",
      input1: "",
      input2: "",
      options1: [
        {
          value: "0-50",
          label: "0-50"
        },
        {
          value: "50-200",
          label: "50-200"
        },
        {
          value: "200以上",
          label: "200以上"
        }
      ],
      options2: [
        {
          value: "0-50",
          label: "0-50"
        },
        {
          value: "50-200",
          label: "50-200"
        },
        {
          value: "200以上",
          label: "200以上"
        }
      ],
      options3: [
        {
          value: "0-50",
          label: "0-50"
        },
        {
          value: "50-200",
          label: "50-200"
        },
        {
          value: "200以上",
          label: "200以上"
        }
      ],
      value1: "",
      value2: "",
      value3: "",
      tableHead: [],
      gridData: [{}],
      currentPage: 1,
      total: 0,
      type: "",
      pagesize: 10,
      is_full: "",
      created_start_at: "",
      created_end_at: "",
      imp: "",
      source: "",
      schoolName: "",
      excelPath: ""
    };
  },
  watch: {},
  computed: {},
  methods: {
    getSchoolList() {
      getSchoolList(
        this.currentPage,
        this.pagesize,
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
      let shcoolRes = await getSchoolList(
        this.currentPage,
        this.pagesize,
        this.input1,
        this.imp
      );
      this.excelPath = shcoolRes.data.path;
      window.location.href = `http://54qjapi.54qn.cn/${this.excelPath}`;
      loading.close();
    },
    handleSizeChange(size) {
      this.pagesize = size;
      this.getSchoolList();
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getSchoolList();
    },
    query() {
      this.total = 0;
      this.currentPage = 1;
      this.imp = "";
      this.getSchoolList();
    }
  },
  created() {},
  mounted() {
    this.getSchoolList();
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
