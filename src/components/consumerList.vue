<template>
  <div class="wrapper">
    <el-row style="margin-top:10px">
      <el-col :span="3" style="margin-right:10px">
        <el-input placeholder="搜索昵称/手机号" suffix-icon="el-icon-date" v-model="input1"></el-input>
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
      <el-col :span="2" style="margin-right:50px">
        <el-select v-model="value" clearable placeholder="是否完善信息">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="2" style="margin-right:50px">
        <el-select v-model="value2" value-key="value" clearable placeholder="用户来源">
          <el-option v-for="item in options2" :key="item.value" :label="item.title" :value="item"></el-option>
        </el-select>
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
          <el-table-column label="手机号" width="110">
            <template slot-scope="scope">
              <p>{{scope.row.account}}</p>
            </template>
          </el-table-column>
          <el-table-column label="性别" width="60">
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
          <el-table-column label="年级" width="80">
            <template slot-scope="scope">
              <p>{{scope.row.grade}}</p>
            </template>
          </el-table-column>
          <el-table-column label="用户来源" width="100">
            <template slot-scope="scope">
              <p>{{scope.row.source}}</p>
            </template>
          </el-table-column>
          <el-table-column label="注册时间" width="150">
            <template slot-scope="scope">
              <p>{{scope.row.created_at}}</p>
            </template>
          </el-table-column>
          <el-table-column label="邀请订阅总数" width="150">
            <template slot-scope="scope">
              <el-button @click="toSubscribeTotal(scope.row.user_id)" size="small">{{scope.row.subscription_logs}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="有效邀请订阅用户数" width="150">
            <template slot-scope="scope">
              <el-button @click="toEffectiveSubscribe(scope.row.user_id)" size="small">{{scope.row.subscription_effective_logs}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="邀请注册用户数" width="150">
            <template slot-scope="scope">
              <el-button @click="toRegisterData(scope.row.user_id)" size="small">{{scope.row.invite_register_logs}}</el-button>
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
import { getConsumer, getUserFrom } from "@/api/api";
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
      total: 0,
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
    toSubscribeTotal(user_id){
      this.$router.push({
        path:"/subscribeTotal",
        query:{
          user_id
        }
      })
    },
    toEffectiveSubscribe(user_id){
      this.$router.push({
        path:"/effectiveSubscribe",
        query:{
          user_id
        }
      })
    },
    toRegisterData(user_id){
      this.$router.push({
        path:"/registerData",
        query:{
          user_id
        }
      })
    },
    getConsumer() {
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
        this.total = res.data.meta.total;
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
      let consumer = await getConsumer(
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
      );
      this.excelPath = consumer.data.path;
      // window.open(`http://54qjapi.54qn.cn/${this.excelPath}`, "_blank");
      window.location.href = `http://54qjapi.54qn.cn/${this.excelPath}`;
      loading.close();
    },
    handleSizeChange(size) {
      this.pagesize = size;
      this.getConsumer();
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getConsumer();
    },
    query() {
      this.total = 0;
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
      this.getConsumer();
    }
  },
  created() {},
  mounted() {
    this.getConsumer();
    getUserFrom().then(res => {
      this.options2 = res.data.data;
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