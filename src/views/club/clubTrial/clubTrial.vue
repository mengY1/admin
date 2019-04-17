<template>
  <div class="wrapper">
    <div class="main">
      <el-row style="margin-top:10px">
        <el-col :span="4" style="margin-right:10px">
          <el-input placeholder="社团名称" suffix-icon="el-icon-date" v-model="input1"></el-input>
        </el-col>
        <el-col :span="4" style="margin-right:10px">
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
        <el-col :span="4" style="margin-right:10px">
          <el-select v-model="value" clearable placeholder="审核状态">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="4" style="margin-right:10px">
          <el-button @click="query" type="primary" round>查询</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-table id="rebateSetTable" :data="gridData" style="width: 100%">
            <el-table-column label="社团名称" width="230">
              <template slot-scope="scope">
                <p>{{ scope.row.name }}</p>
              </template>
            </el-table-column>
            <el-table-column label="所属学校" width="230">
              <template slot-scope="scope">
                <p>{{ scope.row.cms_school_name }}</p>
              </template>
            </el-table-column>
            <el-table-column label="社长" width="150">
              <template slot-scope="scope">
                <p>{{scope.row.chief}}</p>
              </template>
            </el-table-column>
            <el-table-column label="认证人数" width="150">
              <template slot-scope="scope">
                <p>{{scope.row.confirm_peoples}}/20</p>
              </template>
            </el-table-column>
            <el-table-column label="创建时间" width="150">
              <template slot-scope="scope">
                <p>{{scope.row.created_at}}</p>
              </template>
            </el-table-column>
            <el-table-column label="审核状态" width="150">
              <template slot-scope="scope">
                <p>{{scope.row.audit_status_name}}</p>
              </template>
            </el-table-column>
            <el-table-column label="审核时间" width="150">
              <template slot-scope="scope">
                <p>{{scope.row.audit_at}}</p>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  type="info"
                  v-if="scope.row.audit_status==10"
                  size="mini"
                  @click="handleEdit1(scope.row.org_claim_id)"
                >通过</el-button>
                <span @click="handleEdit2(scope.row.org_claim_id)">
                  <el-button
                    type="info"
                    size="mini"
                    v-if="scope.row.audit_status==10"
                    @click="dialogFormVisible = true"
                  >不通过</el-button>
                </span>
                <el-dialog title="拒绝理由" :visible.sync="dialogFormVisible">
                  <el-alert
                    v-if="form.liyou.length>50"
                    :closable="false"
                    title="不可超过50字"
                    type="error"
                  ></el-alert>
                  <el-form :model="form">
                    <el-input
                      type="textarea"
                      :rows="2"
                      placeholder="不超过50个字"
                      v-model="form.liyou"
                      autocomplete="off"
                    ></el-input>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <span @click="sub">
                      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                    </span>
                  </div>
                </el-dialog>
                <el-button size="mini" @click="handleDelete(scope.row.org_claim_id)">详情</el-button>
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
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
          </div>
        </el-col>
        <!-- <el-col :span="6"><el-button @click="exportExcel" style="margin-top: 2px;" size="medium" type="success">导出</el-button>
        </el-col>-->
      </el-row>
    </div>
  </div>
</template>

<script>
import { getClubTrialList, clubTrial } from "../../../api/api";
import trialDetail from "./trialDetail";
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  components: {
    trialDetail
  },
  inject: ["reload"],
  props: {},
  data() {
    return {
      value1: "",
      input1: "",
      input2: "",
      options: [
        {
          value: "审核中",
          label: "审核中"
        },
        {
          value: "审核不通过",
          label: "审核不通过"
        },
        {
          value: "审核通过",
          label: "审核通过"
        }
      ],

      value: "",
      tableHead: [],
      gridData: [{}],
      currentPage: 1,
      total: 0,
      type: "",
      pagesize: 10,
      is_full: "",
      created_start_at: "",
      created_end_at: "",
      org_claim_id: "",
      showDetail: false,
      showList: true,
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        liyou: ""
      },
      org_claim_id2: ""
    };
  },
  watch: {},
  computed: {},
  methods: {
    getClubTrialList() {
      getClubTrialList(
        this.input1,
        this.input2,
        this.created_start_at,
        this.created_end_at,
        this.is_full,
        this.currentPage,
        this.pagesize
      ).then(res => {
        this.gridData = res.data.data;
        this.total += res.data.meta.total;
      });
    },
    handleEdit1(org_claim_id) {
      clubTrial(org_claim_id, { audit_status: 20 }).then(res => {
        this.reload();
      });
    },
    handleEdit2(org_claim_id) {
      this.org_claim_id2 = org_claim_id;
    },
    sub() {
      clubTrial(this.org_claim_id2, {
        audit_status: 30,
        audit_remark: this.form.liyou
      }).then(res => {
        this.reload();
      });
    },
    handleDelete(org_claim_id) {
      this.org_claim_id = org_claim_id;
      let routerUrl = this.$router.resolve({
        path: "/trialDetail",
        query: {
          org_claim_id
        }
      });
      window.open(routerUrl.href, "_blank");
    },

    exportExcel() {
      /* generate workbook object from table */
      let wb = XLSX.utils.table_to_book(
        document.querySelector("#rebateSetTable")
      );
      /* get binary string as output */
      let wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          "用户列表.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    handleSizeChange(size) {
      this.pagesize = size;
      this.getClubTrialList();
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getClubTrialList();
    },
    query() {
      this.total = 0;
      this.currentPage = 1;
      if (this.value == "审核中") {
        this.is_full = 10;
      } else if (this.value == "审核通过") {
        this.is_full = 20;
      } else if (this.value == "审核不通过") {
        this.is_full = 30;
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
      this.getClubTrialList();
    }
  },
  created() {},
  mounted() {
    this.showDetail = false;
    this.showList = true;
    this.getClubTrialList();
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