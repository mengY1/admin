<template>
  <div class="wrapper">
    <div class="main">
      <el-row style="margin-top:10px">
        <el-col :span="3" style="margin-right:10px">
          <el-input placeholder="活动名称" suffix-icon="el-icon-date" v-model="input1"></el-input>
        </el-col>
        <el-col :span="3" style="margin-right:10px">
          <el-input placeholder="所属学校" suffix-icon="el-icon-date" v-model="input2"></el-input>
        </el-col>
        <el-col :span="3" style="margin-right:10px">
          <el-input placeholder="主办社团" suffix-icon="el-icon-date" v-model="input3"></el-input>
        </el-col>
        <el-col :span="3" style="margin-right:10px">
          <el-select v-model="value" placeholder="审核状态">
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
          <el-table
            @sort-change="sortChange"
            id="rebateSetTable"
            :data="gridData"
            style="width: 100%"
          >
            <el-table-column label="活动名称" width="150">
              <template slot-scope="scope">
                <p>{{ scope.row.title }}</p>
              </template>
            </el-table-column>
            <el-table-column label="所属学校" width="150">
              <template slot-scope="scope">
                <p>{{ scope.row.cms_school_name }}</p>
              </template>
            </el-table-column>
            <el-table-column label="主办社团" width="150">
              <template slot-scope="scope">
                <p>{{ scope.row.org_name }}</p>
              </template>
            </el-table-column>
            <el-table-column label="活动时间" width="300">
              <template slot-scope="scope">
                <p>{{scope.row.activity_start_at}}~{{scope.row.activity_expire_at}}</p>
              </template>
            </el-table-column>

            <el-table-column label="审核状态" width="150">
              <template slot-scope="scope">
                <p>{{scope.row.status_name}}</p>
              </template>
            </el-table-column>
            <el-table-column label="创建时间" width="180">
              <template slot-scope="scope">
                <p>{{scope.row.created_at}}</p>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleDelete1(scope.row.act_id)">详情</el-button>
                <el-button
                  size="mini"
                  :plain="true"
                  v-show="scope.row.status==10"
                  @click="handleDelete3(scope.row.act_id)"
                >通过</el-button>
                <el-popover placement="top" trigger="click" width="300" title="拒绝理由">
                  <el-alert
                    v-if="textarea.length>50"
                    :closable="false"
                    title="不可超过50字"
                    type="error"
                  ></el-alert>
                  <el-input type="textarea" :rows="2" placeholder="拒绝理由不能为空" v-model="textarea"></el-input>
                  <div style="text-align: right; margin: 0">
                    <span @click="handleDelete4(scope.row.act_id)">
                      <el-button type="primary" size="mini" @click="visible2 = false">确定</el-button>
                    </span>
                  </div>
                  <el-button slot="reference" size="mini" v-show="scope.row.status==10">不通过</el-button>
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
      </el-row>
    </div>
    <!-- 活动详情页 -->
  </div>
</template>

<script>
import {
  getActivityList,
  getProvinceList,
  getAreaList,
  actPut,
  activityTrial
} from "@/api/api";
import activityDetail from "./actuvityDetail";
import applyList from "./applyList";
export default {
  inject: ["reload"],
  components: { activityDetail, applyList },
  data() {
    return {
      order_by: "",
      value1: "",
      input1: "",
      input2: "",
      input3: "",
      textarea: "",
      options2: [
        {
          value: "",
          label: ""
        },
        {
          value: "审核中",
          label: "审核中"
        },
        {
          value: "审核失败",
          label: "审核失败"
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
      visible2: false
    };
  },
  watch: {},
  computed: {},
  methods: {
    getActivityList() {
      getActivityList(
        this.currentPage,
        this.pagesize,
        this.input1,
        this.input3,
        this.input2,
        this.line_status,
        this.status,
        this.order_by,
        this.imp,
        this.cms_city_id,
        1,
        "",
        "",
        "",
        ""
      ).then(res => {
        this.gridData = res.data.data;
        this.total = res.data.meta.total;
      });
    },
    handleChange(val) {
      this.cms_city_id = val[1];
    },
    sortChange: function(column, prop, order) {
      this.order_by = column.prop + "." + column.order;
      this.getActivityList();
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
      this.act_id = act_id;
      this.showApplyList = true;
      this.showDetail = false;
      this.showList = false;
    },
    handleDelete3(act_id) {
      activityTrial(act_id, { status: 20 }).then(res => {
        this.$message({
          message: "活动已通过",
          type: "success"
        });
        this.reload();
      });
    },
    handleDelete4(act_id) {
      activityTrial(act_id, { status: 30, audit_remark: this.textarea }).then(
        res => {
          this.$message({
            message: "活动审核失败",
            type: "success"
          });
          this.reload();
        }
      );
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
      this.getActivityList();
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getActivityList();
    },
    query() {
      this.total = 0;
      this.currentPage = 1;
      if (this.value == "审核中") {
        this.status = 10;
      } else if (this.value == "审核失败") {
        this.status = 30;
      } else {
        this.status = "10,30";
      }
      if (this.value1 == "已上架") {
        this.line_status = 1;
      } else if (this.value1 == "已下架") {
        this.line_status = 0;
      } else {
        this.line_status = "";
      }
      this.showList = true;
      this.getActivityList();
    }
  },
  created() {},
  mounted() {
    this.showApplyList = false;
    this.getActivityList();
    getAreaList().then(res => {
      this.options = res.data;
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
