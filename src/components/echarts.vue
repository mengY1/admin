<template>
<!-- 每一个图表都有自己唯一的id,所有需要动态传入。 -->
  <div class="echartsLine"
       :id="id"
       :style="style"></div>
</template>
<script>
export default {
  props: {
    id: {
      type: String
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String
    },
    option: {
      type: Object
    }
  },
  data() {
    return {
      MyEcharts: "" //echarts实例
    };
  },
  computed: {
    style() {
      return {
        height: this.height,
        width: this.width
      };
    }
  },
  watch: {
    //要监听的对象 option
    //由于echarts采用的数据驱动，所以需要监听数据的变化来重绘图表
    option: {
      handler(newVal, oldVal) {
        if (this.MyEcharts) {
          if (newVal) {
            console.log(newVal);
        //    第一种方法：
           this.MyEcharts.setOption(newVal, true);
        // //    第二种方法：
        //     let publicCharts = this.MyEchartsOption(newVal);
        //     console.log(publicCharts);
        //     this.MyEcharts.setOption(publicCharts, true);
          } else {
        //    第一种方法：
           this.MyEcharts.setOption(oldVal, true);
        // //   第二种方法：
        //     let publicCharts = this.MyEchartsOption(oldVal);
        //     this.MyEcharts.setOption(publicCharts, true);
          }
        } else {
          this.InitCharts();
        }
      },
      deep: true //对象内部属性的监听，关键。
    }
  },
  mounted() {
    this.InitCharts();
  },
  methods: {
    //所设计的图表公共组件，不论第一种方法还是第二种方法都按照官网的格式来写数据，这样方便维护
    InitCharts() {
      this.MyEcharts = this.$echarts.init(document.getElementById(this.id));
      /**
       * Author  HaoYanFeng
       * 第一种
       * 此方法适用于所有项目的图表，但是每个配置都需要在父组件传进来，相当于每个图表的配置都需要写一遍，不是特别的省代码，主要是灵活度高
       * echarts的配置项，你可以直接在外边配置好，直接扔进来一个this.option
       */
       this.MyEcharts.clear(); //适用于大数据量的切换时图表绘制错误,先清空在重绘
      this.MyEcharts.setOption(this.option, true); //设置为true可以是图表切换数据时重新渲染
      /**
       * Author  HaoYanFeng
       * 第二种
       * 此方法不适用于所有项目，只适用于本项目，但是可以省好多代码，维护性高
       * 在这你还可以根据需求将你的配置项中公共的提取出来，这样就可以省很多代码
       */
      console.log(this.option);
    //   if (this.option.tooltip != undefined) {
    //     let publicCharts = this.MyEchartsOption(this.option);
    //     console.log(publicCharts);
    //     this.MyEcharts.clear(); //适用于大数据量的切换时图表绘制错误,先清空在重绘
    //     this.MyEcharts.setOption(publicCharts, true); //设置为true可以是图表切换数据时重新渲染
    //   }
//    以下这种方法，当一个页面有多个图表时，会有一个bug那就是只有一个图表会随着窗口大小变化而变化，经过小编的努力，终于找到解决办法。
    //   window.onresize = () => {
    //     this.MyEcharts.resize();
    //   }; //当窗口变化时随浏览器大小而改变
// 以下为上边的bug的解决方案。以后用这种方案，放弃上一种。
      let _this = this;
      window.addEventListener("resize", function() {
        _this.MyEcharts.resize();
      });
    },
    /**
     * Author  HaoYanFeng
     * 第二种  公共的配置，省代码
     * 此方法不适用于所有项目，只适用于本项目，但是可以省好多代码，维护性高
     * 在这你还可以根据需求将你的配置项中公共的提取出来，这样就可以省很多代码
     */
    MyEchartsOption(configures) {
      if (configures.tooltip != undefined) {
        let MyOption = {
       //图标的标题   本项目暂未使用
          title: {
            // text: configures.title.text
          },
          //鼠标悬浮提示框
          tooltip: {
            trigger: "axis",
            confine: true, //是否将 tooltip 框限制在图表的区域内。  true为是
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: configures.tooltip.axisPointer.type // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: configures.tooltip.formatter
          },
          //图例
          legend: {
            //图例的数据数组
            // data: configures.legend.data, //图例的数据数组   一般不设置，自动根据数据匹配
            top: configures.legend.top, //图例组件离容器上侧的距离
            right: configures.legend.right, //图例组件离容器右侧的距离
            bottom: configures.legend.bottom, //图例组件离容器下侧的距离
            left: configures.legend.left, //图例组件离容器左侧的距离
            textStyle: {
              color: this.echartsXYcolor //在本项目中涉及到主题色切换，所以采用动态颜色，黑白两色，下边相同
            }
          },
          //工具栏。内置有导出图片，数据视图，动态类型切换，数据区域缩放，重置五个工具。
          // toolbox: {
          //   feature: {
          //     saveAsImage: {}
          //   }
          // },
          //直角坐标系内绘图网格
          grid: {
            top: configures.grid.top, //grid 组件离容器上侧的距离。也就是图表距离容器
            //在本项目中每个图表都是距左右下100px，这样的话就有一个缺点不灵活，但是适用于本项目，不需要每一个都修改，若要做灵活了就是如top写法，每个图表都要配置
            left: "100px",
            right: "100px",
            bottom: "100px"
          },
          //x轴的数据以及配置
          xAxis: {
            type: configures.xAxis.type, //坐标轴类型。具体参考官方文档
            boundaryGap: configures.xAxis.boundaryGap, //类目轴中 boundaryGap 可以配置为 true 和 false。默认为 true，这时候刻度只是作为分隔线，标签和数据点都会在两个刻度之间的带(band)中间。
            data: configures.xAxis.data, //x轴的数据
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
          //y轴的数据配置
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
              formatter: configures.yAxis.axisLabel.formatter
            }
          },
          // dataZoom 组件 用于区域缩放，从而能自由关注细节的数据信息，或者概览数据整体，或者去除离群点的影响。
          dataZoom: [
            {
              type: "inside"
            },
            {
              type: "slider",
              top: configures.dataZoom[1].top, //距离容器上边的距离
              textStyle: {
                color: this.echartsXYcolor
              }
            }
          ],
          //图表的数据
          series: configures.series //由于数据的灵活度大，所以完全采用传入的方式
        };
        return MyOption;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>