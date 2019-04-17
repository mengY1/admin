<template>
  <div class="feedback">
    <el-row>
      <el-col :span="4">
        <el-select v-model="value" placeholder="反馈类型" @change="changeSelect">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="20">
        <el-button @click="query" type="primary">查询</el-button>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table :data="gridData" style="width: 100%">
          <el-table-column label="提交人" width="180">
            <template slot-scope="scope">
              <p>{{ scope.row.username }}</p>
            </template>
          </el-table-column>
          <el-table-column label="联系方式" width="180">
            <template slot-scope="scope">
              <p>{{ scope.row.account }}</p>
            </template>
          </el-table-column>
          <el-table-column label="反馈类型" width="180">
            <template slot-scope="scope">
              <p>{{scope.row.type}}</p>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" width="180">
            <template slot-scope="scope">
              <p>{{scope.row.created_at}}</p>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-popover placement="right" width="600" trigger="click">
                <el-row>
                  <el-col :span="4">提交人</el-col>
                  <el-col :span="20">{{ scope.row.username }}</el-col>
                </el-row>
                <el-row>
                  <el-col :span="4">联系方式</el-col>
                  <el-col :span="20">{{ scope.row.account }}</el-col>
                </el-row>
                <el-row>
                  <el-col :span="4">意见类型</el-col>
                  <el-col :span="20">{{ scope.row.type }}</el-col>
                </el-row>
                <el-row>
                  <el-col :span="4">意见描述</el-col>
                  <el-col :span="20">{{ scope.row.content }}</el-col>
                </el-row>
                <el-row>
                  <el-col :span="4">意见照片</el-col>
                  <el-col :span="20">
                    <el-popover
                      v-if="scope.row.screenshot[0]"
                      v-for="(item,index) in scope.row.screenshot"
                      :key="index"
                      placement="left"
                      width="auto"
                      trigger="hover"
                    >
                      <img :src="url+item" style="width:400px;height:800px;" alt>
                      <el-button slot="reference">
                        <img class="imgUp" :src="url+item" alt>
                      </el-button>
                    </el-popover>
                  </el-col>
                </el-row>
                <el-button size="mini" slot="reference">详情</el-button>
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
import {url,baseApi} from "@/utils/common";
import { feedback } from "../../../src/api/api";
export default {
  components: {},
  props: {},
  data() {
    return {
      options: [
        {
          value: "1",
          label: "账号问题"
        },
        {
          value: "2",
          label: "使用不流畅"
        },
        {
          value: "3",
          label: "提现问题 "
        },
        {
          value: "4",
          label: "优化建议"
        },
        {
          value: "5",
          label: "其他问题"
        },
        {
          value: "6",
          label: "全部"
        }
      ],
      value: "",
      tableHead: [],
      gridData: [
        {
          username: "吴俊钟",
          account: "17610303166 ",
          type: "刘英",
          content: "你妹的"
        }
      ],
      dialogTableVisible: false,
      dialogFormVisible: false,
      currentPage: 1,
      url: url,
      baseApi: baseApi,
      total: 0,
      type: "",
      pagesize: 10
    };
  },
  watch: {},
  computed: {},
  methods: {
    getFeedbackList() {
      feedback(this.type, this.currentPage, this.pagesize).then(res => {
        this.gridData = res.data.data;
        this.total = res.data.meta.total;
      });
    },
    handleSizeChange(size) {
      this.pagesize = size;
      this.getFeedbackList();
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getFeedbackList();
    },
    query() {
      this.getFeedbackList();
    },
    changeSelect(e) {
      if (e == 6) {
        this.type = "";
      } else {
        this.type = e;
      }
    }
  },
  created() {},
  mounted() {
    this.getFeedbackList();
  }
};
</script>
<style lang="scss" scoped>
.imgUp {
  width: 100px;
  height: 50px;
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