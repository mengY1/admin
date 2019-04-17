<template>
  <div class="wrapper">
    <div class="main" v-if="showList">
      <el-row style="margin-top:10px">
        <el-col :span="3" style="margin-right:10px">
          <el-input placeholder="活动名称" suffix-icon="el-icon-date" v-model="input1"></el-input>
        </el-col>

        <el-col :span="3" style="margin-right:10px">
          <el-select v-model="value" placeholder="举报类型">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="3" style="margin-right:10px">
          <el-button @click="query" type="primary" round>查询</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-table id="rebateSetTable" :data="gridData" style="width: 100%">
            <el-table-column label="举报活动" width="250">
              <template slot-scope="scope">
                <p>{{ scope.row.activity_title }}</p>
              </template>
            </el-table-column>
            <el-table-column label="举报类型" width="150">
              <template slot-scope="scope">
                <p>{{ scope.row.report_type }}</p>
              </template>
            </el-table-column>
            <el-table-column label="举报人" width="180">
              <template slot-scope="scope">
                <p>{{scope.row.user_name}}</p>
              </template>
            </el-table-column>

            <el-table-column label="举报人联系方式" width="180">
              <template slot-scope="scope">
                <p>{{scope.row.user_phone}}</p>
              </template>
            </el-table-column>
            <el-table-column label="举报时间" width="250">
              <template slot-scope="scope">
                <p>{{scope.row.created_at}}</p>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleDelete1(scope.row.activity_id)">详情</el-button>
                <el-button
                  size="mini"
                  :plain="true"
                  v-show="scope.row.activity_line_status==0"
                  @click="handleDelete2(scope.row.activity_id)"
                >上架</el-button>
                <span @click="handleDelete3(scope.row.activity_id)">
                  <el-button
                    size="mini"
                    v-if="scope.row.activity_line_status==1"
                    @click="dialogFormVisible = true"
                  >下架</el-button>
                </span>
                <el-dialog title="下架理由" :visible.sync="dialogFormVisible">
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
                <!-- <el-button
          size="mini"
          v-show="scope.row.activity_line_status==1"
                @click="handleDelete3(scope.row.activity_id)">下架</el-button>-->
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
      </el-row>
    </div>
    <!-- 活动详情页 -->
    <div v-if=" showDetail" class="detalil">
      <activity-detail :act_id="act_id"></activity-detail>
    </div>
  </div>
</template>

<script>
import { actPut, activityTrial, activityReportList } from "@/api/api";
import activityDetail from "./actuvityDetail";
import applyList from "./applyList";
export default {
  inject: ["reload"],
  components: { activityDetail, applyList },
  data() {
    return {
      form: {
        liyou: ""
      },
      dialogFormVisible: false,
      order_by: "created_at.desc",
      value1: "",
      input1: "",
      input2: "",
      options2: [
        {
          value: "",
          label: ""
        },
        {
          value: "垃圾广告",
          label: "垃圾广告"
        },
        {
          value: "有害内容",
          label: "有害内容"
        },
        {
          value: "违法内容",
          label: "违法内容"
        },
        {
          value: "淫秽色情内容",
          label: "淫秽色情内容"
        },
        {
          value: "其他",
          label: "其他"
        }
      ],
      options1: [
        {
          value: "",
          label: ""
        },
        {
          value: "已上架",
          label: "已上架"
        },
        {
          value: "已下架",
          label: "已下架"
        }
      ],
      value: "",
      tableHead: [],
      gridData: [{}],
      currentPage: 1,
      total: "",
      type: "",
      pagesize: 10,
      status: "10,30",
      line_status: "",
      cms_city_id: "",
      created_start_at: "",
      created_end_at: "",
      org_id: "",
      showDetail: false,
      showList: true,
      showApplyList: false,
      imp: "",
      options: [],
      props: {
        value: "area_id",
        children: "children"
      },
      selectedOptions: [],
      act_id: "",
      report_type: ""
    };
  },
  watch: {},
  computed: {},
  methods: {
    getAactivityReportList() {
      activityReportList(
        this.input1,
        this.report_type,
        this.currentPage,
        this.pagesize
      ).then(res => {
        this.gridData = res.data.data;
        this.total = res.data.meta.total;
      });
    },

    handleChange(val) {
      this.cms_city_id = val[1];
    },
    handleDelete1(act_id) {
      this.act_id = act_id;
      let routerUrl = this.$router.resolve({
        path: "/actuvityDetail",
        query: {
          act_id
        }
      });
      window.open(routerUrl.href, "_blank");
    },
    handleDelete2(act_id) {
      actPut(act_id, { line_status: 1 }).then(res => {
        this.$message({
          message: "活动上架成功",
          type: "success"
        });
        this.reload();
      });
    },
    handleDelete3(act_id) {
      this.act_id = act_id;
    },
    sub() {
      actPut(this.act_id, {
        line_status: 0,
        line_status_remark: this.form.liyou
      }).then(res => {
        this.$message({
          message: "活动下架成功",
          type: "success"
        });
        this.reload();
      });
    },
    exportExcel() {
      this.imp = 1;
      window.open(
        `http://54qjapi.54qn.cn/api/admin/activities?keyword=${
          this.input1
        }&school_name=${this.input2}&cms_city_id=${this.cms_city_id}&status=${
          this.status
        }&line_status=${this.line_status}&page=${this.currentPage}&pagesize=${
          this.pagesize
        }&import=${this.imp}&order_by=${this.order_by}`
      );
    },
    handleSizeChange(size) {
      this.pagesize = size;
      this.getAactivityReportList();
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getAactivityReportList();
    },
    query() {
      this.total = 0;
      this.currentPage = 1;
      if (this.value == "垃圾广告") {
        this.report_type = 1;
      } else if (this.value == "有害内容") {
        this.report_type = 2;
      } else if (this.value == "违法内容") {
        this.report_type = 3;
      } else if (this.value == "淫秽色情内容") {
        this.report_type = 4;
      } else if (this.value == "其他") {
        this.report_type = 5;
      } else {
        this.report_type = "";
      }

      this.showList = true;
      this.getAactivityReportList();
    }
  },
  created() {},
  mounted() {
    this.getAactivityReportList();
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
