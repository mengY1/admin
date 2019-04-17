<template>
  <div>
    <el-row style="margin-top:30px;">
      <el-col :span="24">
        <el-card class="box-card" style="width: 99%">
          <div slot="header" class="clearfix">
            <span>基本数据</span>
          </div>
          <div class="text item">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="date" label="时间维度"></el-table-column>
              <el-table-column prop="date" label="注册人数"></el-table-column>
              <el-table-column prop="name" label="完善人数"></el-table-column>
              <el-table-column prop="address" label="订阅人数"></el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-card class="box-card" style="width:99%">
          <div slot="header" class="clearfix">
            <span>TOP 10内容数据</span>
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
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="date" label="标题"></el-table-column>
              <el-table-column prop="date" label="类别"></el-table-column>
              <el-table-column prop="name" label="浏览量"></el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card" style="width:99%">
          <div slot="header" class="clearfix">
            <span>TOP 10注册大学数据</span>
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
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="date" label="大学名称（社团数）"></el-table-column>
              <el-table-column prop="date" label="用户数"></el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
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
            <MyEcharts
              :id="'exampleId'"
              :style="{width: '100%', height: '380px'}"
              :option="chartOption"
            ></MyEcharts>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import MyEcharts from "@/components/echarts";
export default {
  components: {
    MyEcharts
  },
  data() {
    return {
      input3: "",
      tableData: "",
      chartOption: {},
      echartsXYcolor: "red",
      lineColor: "#5bb1f0"
    };
  },
  mounted() {
   this.initCharts();
  },
  methods:{
   initCharts(){
        this.chartOption = {
          tooltip: {
            trigger: "axis",
            confine: true, //是否将 tooltip 框限制在图表的区域内。  true为是
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "line" // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: function(params) {
              return params;
            }
          },
          legend: {
            data:[],
            top: "93%",
            right:'center',
            bottom:"center",
            left:"center",
            textStyle: {
              color: this.echartsXYcolor
            }
          },
          // toolbox: {
          //   feature: {
          //     saveAsImage: {}
          //   }
          // },
          grid: {
            top: "3%",
            left: "100px",
            right: "100px",
            bottom: "100px"
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: ['周一','周二','周三','周四','周五','周六','周日'],
            axisLine: {
              lineStyle: {
                color: this.echartsXYcolor
              }
            },
            axisLabel: {
              textStyle: {
                color: this.echartsXYcolor
              }
            }
          },
          dataZoom: [
            {
              type: "inside"
            },
            {
              type: "slider",
              top: "82%",
              textStyle: {
                color: this.echartsXYcolor
              }
            }
          ],
          yAxis: {
            axisLine: {
              lineStyle: {
                color: this.echartsXYcolor
              }
            },
            axisLabel: {
              textStyle: {
                color: this.echartsXYcolor
              },
              formatter: function(val) {
                return (val * 1).toFixed(2) + "%";
              }
            }
          },
          series: [
            {
              name: '邮件营销',
              type: "line",
              lineStyle: {
                color: this.lineColor // 线的颜色
              },
              itemStyle: {
                color: this.lineColor// 图例的颜色
              },
              showSymbol: false, // 不显示symbol
             data:[120, 132, 101, 134, 90, 230, 210]
            }
          ]
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