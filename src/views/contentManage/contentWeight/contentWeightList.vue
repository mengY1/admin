<template>
  <div class="wrapper">
    <el-row>
      <el-col :span="24">
        <el-table id="rebateSetTable" :data="gridData" style="width: 100%">
          <el-table-column label="内容类型" width="150">
            <template slot-scope="scope">
              <p>{{ scope.row.type_name }}</p>
            </template>
          </el-table-column>
          <el-table-column label="内容名称" width="150">
            <template slot-scope="scope">
              <p>{{ scope.row.tab_name }}</p>
            </template>
          </el-table-column>
          <el-table-column label="排列顺序（数字越大排列越前）" width="300">
            <template slot-scope="scope">
              <p>{{scope.row.tab_sort}}</p>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
      <el-col :span="6">
        <el-button @click="toSet" style="margin-top: 2px;" size="medium" type="success">修改</el-button>
      </el-col>
  </div>
</template>

<script>
import { getRecommendList } from "@/api/api";
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
      options: [
        {
          value: "已完善",
          label: "已完善"
        },
        {
          value: "未完善",
          label: "未完善"
        }
      ],
      options2: "",
      value: "",
      value2: "",
      tableHead: [],
      gridData: [{}],
      currentPage: 1,
      type: "",
      pagesize: 10,
      is_full: "",
      created_start_at: "",
      created_end_at: "",
      imp: "",
      source: "",
      excelPath: ""
    };
  },
  watch: {},
  computed: {},
  methods: {
    toSet() {
      this.$router.push({
        path: "/contentWeightRevise"
      });
    },
    handleSizeChange(size) {
      this.pagesize = size;
      getConsumer(
        this.input1,
        this.input2,
        this.created_start_at,
        this.created_end_at,
        this.is_full,
        this.currentPage,
        this.pagesize,
        this.imp,
        "",
        "",
        this.source
      ).then(res => {
        this.gridData = res.data.data;
      });
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      getConsumer(
        this.input1,
        this.input2,
        this.created_start_at,
        this.created_end_at,
        this.is_full,
        this.currentPage,
        this.pagesize,
        this.imp,
        "",
        "",
        this.source
      ).then(res => {
        this.gridData = res.data.data;
      });
    },
    query() {
      this.currentPage = 1;
      this.imp = "";
      if (this.value == "已完善") {
        this.is_full = 1;
      } else if (this.value == "未完善") {
        this.is_full = 0;
      } else {
        this.is_full = "";
      }
      if (this.value1) {
        this.created_start_at = this.value1[0];
        this.created_end_at = this.value1[1];
      } else {
        this.created_start_at = "";
        this.created_end_at = "";
      }
      if (this.value2.value === undefined) {
        this.source = "";
      } else {
        this.source = this.value2.value;
      }
      getConsumer(
        this.input1,
        this.input2,
        this.created_start_at,
        this.created_end_at,
        this.is_full,
        this.currentPage,
        this.pagesize,
        this.imp,
        "",
        "",
        this.source
      ).then(res => {
        this.gridData = res.data.data;
      });
    }
  },
  created() {},
  mounted() {
    getRecommendList().then(res => {
      this.gridData = res.data.data;
    });
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