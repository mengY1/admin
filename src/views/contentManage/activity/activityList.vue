<template>
  <div class="wrapper">
    <div class="main">
      <el-row style="margin-top:10px">
        <el-col :span="2" style="margin-right:10px">
          <el-input placeholder="活动名称" suffix-icon="el-icon-date" v-model="input1"></el-input>
        </el-col>
        <el-col :span="2" style="margin-right:10px">
          <el-input placeholder="所属学校" suffix-icon="el-icon-date" v-model="input2"></el-input>
        </el-col>
        <el-col :span="3" style="margin-right:10px">
          <el-input placeholder="主办社团" suffix-icon="el-icon-date" v-model="input3"></el-input>
        </el-col>
        <el-col :span="3" style="margin-right:10px">
          <el-cascader
            size="large"
            clearable
            :options="options"
            v-model="selectedOptions"
            @change="handleChange"
            :props="props"
            placeholder="活动地区"
          ></el-cascader>
        </el-col>
        <el-col :span="3" style="margin-right:10px">
          <el-select v-model="value" clearable placeholder="活动状态">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="3" style="margin-right:10px">
          <el-select v-model="value1" clearable placeholder="上架状态">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
         <el-col :span="2" style="margin-right:10px">
        <el-select v-model="value2" clearable placeholder="置顶状态">
          <el-option
            v-for="item in options3"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
        <el-col :span="1.5" style="margin-right:10px">
          <el-button @click="query" type="primary" round>查询</el-button>
        </el-col>
        <el-col :span="3" style="margin-right:10px">
          <el-button @click="addActivity" type="primary" round>添加活动</el-button>
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
            <el-table-column label="活动名称" width="100">
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
            <el-table-column label="活动来源" width="150">
              <template slot-scope="scope">
                <p>{{ scope.row.cms_school_name }}</p>
              </template>
            </el-table-column>
            <el-table-column label="活动时间" width="150">
              <template slot-scope="scope">
                <p>{{scope.row.activity_start_at}}</p>
                <!-- ~{{scope.row.activity_expire_at}} -->
              </template>
            </el-table-column>
            <el-table-column label="置顶状态" width="80">
              <template slot-scope="scope">
                <p>{{scope.row.top_status==1?"已置顶":"未置顶"}}</p>
              </template>
            </el-table-column>
            <el-table-column label="上架状态" width="80">
              <template slot-scope="scope">
                <p>{{scope.row.line_status_name}}</p>
              </template>
            </el-table-column>
            <el-table-column label="活动状态" width="80">
              <template slot-scope="scope">
                <p>{{scope.row.status_name}}</p>
              </template>
            </el-table-column>
            <el-table-column label="添加日程提醒人数" width="80">
              <template slot-scope="scope">
                <el-popover placement="right" width="700" trigger="click">
                <el-table :data="applyData">
                  <el-table-column width="150" property="username" label="添加日程人员"></el-table-column>
                  <el-table-column width="150" property="cms_school_name" label="所属学校学校"></el-table-column>
                  <el-table-column width="200" property="phone" label="手机号"></el-table-column>
                  <el-table-column width="200" property="created_at" label="添加日程时间"></el-table-column>
                </el-table>
                <el-button
                  slot="reference"
                  @click="getApplyList(scope.row.act_id)"
                >{{scope.row.members}}</el-button>
              </el-popover>
              </template>
            </el-table-column>
            <el-table-column label="创建时间" width="150">
              <template slot-scope="scope">
                <p>{{scope.row.created_at}}</p>
              </template>
            </el-table-column>
            <el-table-column label="人气" sortable prop="popularity" width="80">
              <template slot-scope="scope">
                <p>{{scope.row.popularity}}</p>
              </template>
            </el-table-column>
            <el-table-column label="活动地区" width="100">
              <template slot-scope="scope">
                <p>{{scope.row.area}}</p>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                 <span @click="getDetail(scope.row.act_id)">
                <el-button size="small" @click="dialogTableVisible = true">预览</el-button>
              </span>
              <el-dialog
                width="375px"
                title="活动预览"
                :visible.sync="dialogTableVisible"
              >
                <div class="content">
                  <div class="title" v-if="detailInfo">
                    <p>{{detailInfo.title}}</p>
                  </div>
                  <div class="time">
                    <span>{{detailInfo.publisher}}</span>
                    <span>{{detailInfo.created_at}}</span>
                  </div>
                  <div class="text">
                      <p ref="refContent" v-html="detailInfo.introduction"></p>
                  </div>
                </div>
              </el-dialog>
                <el-button size="mini" @click="handleDelete1(scope.row.act_id)">详情</el-button>
                <el-button
                  size="mini"
                  :plain="true"
                  v-show="scope.row.line_status==0"
                  @click="handleDelete3(scope.row.act_id)"
                >上架</el-button>
                <span @click="handleDelete4(scope.row.act_id)">
                  <el-button
                    size="mini"
                    v-if="scope.row.line_status==1"
                    @click="dialogFormVisible = true"
                  >下架</el-button>
                </span>
                <el-button
                  size="small"
                  v-if="scope.row.top_status==0"
                  @click="dailyStick(scope.row.act_id)"
                >置顶</el-button>
                <el-button
                  @click="dailyStick(scope.row.act_id)"
                  v-if="scope.row.top_status==1"
                  size="small"
                  slot="reference"
                >取消置顶</el-button>
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
                <el-button size="mini" @click="handleDelete5(scope.row.act_id)">编辑</el-button>
                <span @click="getId(scope.row.act_id)">
                  <el-button size="mini" @click="dialogVisible = true">删除</el-button>
                </span>
                <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
                  <span>确定删除此活动吗？</span>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <span @click="handleDelete6">
                      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                    </span>
                  </span>
                </el-dialog>
                <!-- <el-button
          size="mini"
          v-show="scope.row.line_status==1"
                @click="handleDelete4(scope.row.act_id)">下架</el-button>-->
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
    <!-- 活动详情页 -->
    <div class="applyList" v-if="showApplyList">
      <apply-list :act_id="act_id"></apply-list>
    </div>
  </div>
</template>

<script>
import {
  getActivityList,
  getProvinceList,
  getAreaList,
  actPut,
  actDelete,
  actStick,
  getApplyList,
  activityDetail
} from "@/api/api";
import applyList from "./applyList";
export default {
  inject: ["reload"],
  data() {
    return {
      dialogTableVisible:false,
      applyData:'',
      fullscreenLoading: false,
      dialogVisible: false,
      form: {
        liyou: ""
      },
      dialogFormVisible: false,
      order_by: "",
      value1: "",
      input1: "",
      input2: "",
      input3: "",
      options2: [
        {
          value: "进行中",
          label: "进行中"
        },
        {
          value: "已取消",
          label: "已取消"
        },
        {
          value: "已结束",
          label: "已结束"
        }
      ],
      options1: [
        {
          value: "已上架",
          label: "已上架"
        },
        {
          value: "已下架",
          label: "已下架"
        }
      ],
      options3: [
        {
          value: "已置顶",
          label: "已置顶"
        },
        {
          value: "未置顶",
          label: "未置顶"
        }
      ],
      value: "",
      tableHead: [],
      gridData: [{}],
      currentPage: 1,
      total: "",
      type: "",
      pagesize: 10,
      status: "20,40,50",
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
      excelPath: "",
      value2:'',
      top_status:'',
      detailInfo:""
    };
  },
  watch: {},
  computed: {},
  methods: {
    getDetail(act_id) {
      activityDetail(act_id).then(res => {
        this.detailInfo = res.data;
      });
    },
    getApplyList(act_id) {
      getApplyList(act_id).then(res => {
        this.applyData = res.data.data;
      });
    },
    dailyStick(act_id) {
      actStick(act_id).then(res => {
        this.$message({
          message: "操作成功",
          type: "success"
        });
        this.getActivityList();
      });
    },
    getActivityList() {
       if (this.value2 == "已置顶") {
        this.top_status = 1;
      } else if (this.value2 == "未置顶") {
        this.top_status = 0;
      }else {
        this.top_status = '';
      }
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
        this.top_status,
        "",
        "",
        ""
      ).then(res => {
        this.gridData = res.data.data;
        this.total = res.data.meta.total;
      });
    },
    getId(act_id) {
      this.act_id = act_id;
    },
    addActivity() {
      this.$router.push({
        path: "/addActivity"
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
      let routeUrl = this.$router.resolve({
        path: "/actuvityDetail",
        query: { act_id }
      });
      window.open(routeUrl.href, "_blank");
    },
    handleDelete2(act_id) {
      this.act_id = act_id;
      let routerUrl = this.$router.resolve({
        path: "/applyList",
        query: {
          act_id
        }
      });
      window.open(routerUrl.href, "_blank");
    },
    handleDelete3(act_id) {
      actPut(act_id, { line_status: 1 }).then(res => {
        this.$message({
          message: "上架成功",
          type: "success"
        });
        this.reload();
      });
    },
    handleDelete4(act_id) {
      this.act_id = act_id;
    },
    handleDelete5(act_id) {
      let routerUrl = this.$router.resolve({
        path: "/activityEdit",
        query: { act_id: act_id }
      });
      window.open(routerUrl.href, "_blank");
    },
    handleDelete6() {
      actDelete(this.act_id).then(res => {
        this.reload();
      });
    },
    sub() {
      actPut(this.act_id, {
        line_status: 0,
        line_status_remark: this.form.liyou
      }).then(res => {
        this.$message({
          message: "下架成功",
          type: "success"
        });
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
      let actRes = await getActivityList(
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
      );
      this.excelPath = actRes.data.path;
      window.location.href = `http://54qjapi.54qn.cn/${this.excelPath}`;
      loading.close();
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
      this.imp = "";
      if (this.value == "进行中") {
        this.status = 20;
      } else if (this.value == "已取消") {
        this.status = 40;
      } else if (this.value == "已结束") {
        this.status = 50;
      } else {
        this.status = "20,40,50";
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
<style lang="scss" >
.content {
  width: 335px;
  margin: 30px auto;
  .title {
    width: 324px;
    font-size: 22px;
    font-family: PingFang-SC-Bold;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    line-height: 34px;
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
      max-width: 335px !important;
    }
    p{
       margin: 11px 0;
      font-size: 16px;
    }
    table{
      width: 335px !important;
      overflow: hidden;
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
</style>
