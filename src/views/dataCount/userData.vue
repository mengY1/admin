<template>
  <div>
    <el-row style="margin-top:30px;">
      <el-col :span="24">
        <el-card class="box-card" style="width:99%">
          <div slot="header" class="clearfix">
            <span>注册用户数</span>
          </div>
          <div class="text item">
            <el-select v-model="value" placeholder="请选择时间范围查询">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="text item">
            <div id="chart" class="chart" style="width:99%;height:600px"></div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row style="margin-top:30px;">
      <el-col :span="24">
        <el-card class="box-card" style="width:99%">
          <div slot="header" class="clearfix">
            <span>完善用户数</span>
          </div>
          <div class="text item">
            <el-select v-model="value" placeholder="请选择时间范围查询">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="text item">
            <div id="chart" class="chart" style="width:99%;height:600px"></div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row style="margin-top:30px;">
      <el-col :span="24">
        <el-card class="box-card" style="width:99%">
          <div slot="header" class="clearfix">
            <span>用户注册来源分析</span>
          </div>
          <div class="text item">
            <el-select v-model="value" placeholder="请选择时间范围查询">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="text item">
            <div id="chart" class="chart" style="width:99%;height:600px"></div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row >
      <el-col :span="24">
        <el-card class="box-card" style="width: 99%">
          <div slot="header" class="clearfix">
            <span>注册用户标签统计</span>
          </div>
          <div class="text item">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="date" label="用户数据"></el-table-column>
              <el-table-column prop="date" label="男"></el-table-column>
              <el-table-column prop="name" label="女"></el-table-column>
              <el-table-column prop="address" label="未知"></el-table-column>
              <el-table-column prop="address" label="普通用户数"></el-table-column>
              <el-table-column prop="address" label="社长"></el-table-column>
              <el-table-column prop="address" label="大一"></el-table-column>
              <el-table-column prop="address" label="大二"></el-table-column>
              <el-table-column prop="address" label="大三"></el-table-column>
              <el-table-column prop="address" label="大四"></el-table-column>
              <el-table-column prop="address" label="研究生"></el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
let echarts = require("echarts/lib/echarts");
// 引入柱状图组件
require("echarts/lib/chart/bar");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
//引入右上角下载图片等等一系列的toolbox的功能
export default {
  data() {
    return {
      input3: "",
      tableData: ""
    };
  },
  mounted() {
    this.myChart = this.$echarts.init(document.getElementById("chart"));
    this.drawChart();
  },
  methods: {
    drawChart() {
      let option = {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar"
          }
        ]
      };

      this.myChart.setOption(option);
      window.onresize = function() {
        this.myChart.resize();
      };
    }
  }
};
</script>
<style lang='scss' scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
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