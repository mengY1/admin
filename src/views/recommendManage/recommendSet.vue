<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-tag type="danger">推荐设置总条数为20条</el-tag>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <el-tag>爆料：</el-tag>
      </el-col>
      <el-col :span="1.5">
        <el-tag>文章数量：</el-tag>
      </el-col>
      <el-col :span="4">
        <el-input-number v-model="num1" size="small" :min="0" :max="100" label="描述文字"></el-input-number>
      </el-col>
      <el-col :span="1.5">
        <el-tag>展示顺序：</el-tag>
      </el-col>
      <el-col :span="2">
        <el-input-number v-model="num1_1" size="small" :min="0" :max="100" label="描述文字"></el-input-number>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <el-tag>干货：</el-tag>
      </el-col>
      <el-col :span="1.5">
        <el-tag>文章数量：</el-tag>
      </el-col>
      <el-col :span="4">
        <el-input-number v-model="num2" size="small" :min="0" :max="100" label="描述文字"></el-input-number>
      </el-col>
      <el-col :span="1.5">
        <el-tag>展示顺序：</el-tag>
      </el-col>
      <el-col :span="2">
        <el-input-number v-model="num2_2" size="small" :min="0" :max="100" label="描述文字"></el-input-number>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <el-tag>求职：</el-tag>
      </el-col>
      <el-col :span="1.5">
        <el-tag>文章数量：</el-tag>
      </el-col>
      <el-col :span="4">
        <el-input-number v-model="num3" size="small" :min="0" :max="100" label="描述文字"></el-input-number>
      </el-col>
      <el-col :span="1.5">
        <el-tag>展示顺序：</el-tag>
      </el-col>
      <el-col :span="2">
        <el-input-number v-model="num3_3" size="small" :min="0" :max="100" label="描述文字"></el-input-number>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <el-tag>考研：</el-tag>
      </el-col>
      <el-col :span="1.5">
        <el-tag>文章数量：</el-tag>
      </el-col>
      <el-col :span="4">
        <el-input-number v-model="num4" size="small" :min="0" :max="100" label="描述文字"></el-input-number>
      </el-col>
      <el-col :span="1.5">
        <el-tag>展示顺序：</el-tag>
      </el-col>
      <el-col :span="2">
        <el-input-number v-model="num4_4" size="small" :min="0" :max="100" label="描述文字"></el-input-number>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <el-tag>学术：</el-tag>
      </el-col>
      <el-col :span="1.5">
        <el-tag>文章数量：</el-tag>
      </el-col>
      <el-col :span="4">
        <el-input-number v-model="num5" size="small" :min="0" :max="100" label="描述文字"></el-input-number>
      </el-col>
      <el-col :span="1.5">
        <el-tag>展示顺序：</el-tag>
      </el-col>
      <el-col :span="2">
        <el-input-number v-model="num5_5" size="small" :min="0" :max="100" label="描述文字"></el-input-number>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <el-tag>活动：</el-tag>
      </el-col>
      <el-col :span="1.5">
        <el-tag>文章数量：</el-tag>
      </el-col>
      <el-col :span="4">
        <el-input-number v-model="num6" size="small" :min="0" :max="100" label="描述文字"></el-input-number>
      </el-col>
      <el-col :span="1.5">
        <el-tag>展示顺序：</el-tag>
      </el-col>
      <el-col :span="2">
        <el-input-number v-model="num6_6" size="small" :min="0" :max="100" label="描述文字"></el-input-number>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <el-tag>竞赛：</el-tag>
      </el-col>
      <el-col :span="1.5">
        <el-tag>文章数量：</el-tag>
      </el-col>
      <el-col :span="4">
        <el-input-number v-model="num7" size="small" :min="0" :max="100" label="描述文字"></el-input-number>
      </el-col>
      <el-col :span="1.5">
        <el-tag>展示顺序：</el-tag>
      </el-col>
      <el-col :span="2">
        <el-input-number v-model="num7_7" size="small" :min="0" :max="100" label="描述文字"></el-input-number>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <el-tag>本校：</el-tag>
      </el-col>
      <el-col :span="1.5">
        <el-tag>文章数量：</el-tag>
      </el-col>
      <el-col :span="4">
        <el-input-number v-model="num8" size="small" :min="0" :max="100" label="描述文字"></el-input-number>
      </el-col>
      <el-col :span="1.5">
        <el-tag>展示顺序：</el-tag>
      </el-col>
      <el-col :span="2">
        <el-input-number v-model="num8_8" size="small" :min="0" :max="100" label="描述文字"></el-input-number>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <el-tag>走心：</el-tag>
      </el-col>
      <el-col :span="1.5">
        <el-tag>文章数量：</el-tag>
      </el-col>
      <el-col :span="4">
        <el-input-number v-model="num9" size="small" :min="0" :max="100" label="描述文字"></el-input-number>
      </el-col>
      <el-col :span="1.5">
        <el-tag>展示顺序：</el-tag>
      </el-col>
      <el-col :span="2">
        <el-input-number v-model="num9_9" size="small" :min="0" :max="100" label="描述文字"></el-input-number>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <el-tag>策划：</el-tag>
      </el-col>
      <el-col :span="1.5">
        <el-tag>文章数量：</el-tag>
      </el-col>
      <el-col :span="4">
        <el-input-number v-model="num10" size="small" :min="0" :max="100" label="描述文字"></el-input-number>
      </el-col>
      <el-col :span="1.5">
        <el-tag>展示顺序：</el-tag>
      </el-col>
      <el-col :span="2">
        <el-input-number v-model="num10_10" size="small" :min="0" :max="100" label="描述文字"></el-input-number>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-button type="success" :plain="true" @click="saveSet">保存设置</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getRecommendList, saveSetting } from "../../../src/api/api";
export default {
  name: "",
  props: [""],
  data() {
    return {
      num1: "",
      num1_1: "",
      num2: "",
      num2_2: "",
      num3: "",
      num3_3: "",
      num4: "",
      num4_4: "",
      num5: "",
      num5_5: "",
      num6: "",
      num6_6: "",
      num7: "",
      num7_7: "",
      num9: "",
      num9_9: "",
      num10: "",
      num10_10: ""
    };
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {
    getRecommendList().then(res => {
      this.num1 = res.data.data[0].recommend_num;
      this.num1_1 = res.data.data[0].recommend_sort;
      this.num2 = res.data.data[1].recommend_num;
      this.num2_2 = res.data.data[1].recommend_sort;
      this.num3 = res.data.data[2].recommend_num;
      this.num3_3 = res.data.data[2].recommend_sort;
      this.num4 = res.data.data[3].recommend_num;
      this.num4_4 = res.data.data[3].recommend_sort;
      this.num5 = res.data.data[4].recommend_num;
      this.num5_5 = res.data.data[4].recommend_sort;
      this.num6 = res.data.data[5].recommend_num;
      this.num6_6 = res.data.data[5].recommend_sort;
      this.num7 = res.data.data[6].recommend_num;
      this.num7_7 = res.data.data[6].recommend_sort;
      this.num8 = res.data.data[7].recommend_num;
      this.num8_8 = res.data.data[7].recommend_sort;
      this.num9 = res.data.data[8].recommend_num;
      this.num9_9 = res.data.data[8].recommend_sort;
      this.num10 = res.data.data[9].recommend_num;
      this.num10_10 = res.data.data[9].recommend_sort;
    });
  },
  methods: {
    saveSet() {
      let nums =
        this.num1 +
        this.num2 +
        this.num3 +
        this.num4 +
        this.num5 +
        this.num6 +
        this.num7 +
        this.num8 +
        this.num9 +
        this.num10;
      if (nums > 20) {
        this.$message.error("推荐设置总条数不能超过20条");
      } else {
        saveSetting({
          data: [
            { type: 1, recommend_sort: this.num1_1, recommend_num: this.num1 },
            { type: 2, recommend_sort: this.num2_2, recommend_num: this.num2 },
            { type: 3, recommend_sort: this.num3_3, recommend_num: this.num3 },
            { type: 4, recommend_sort: this.num4_4, recommend_num: this.num4 },
            { type: 5, recommend_sort: this.num5_5, recommend_num: this.num5 },
            { type: 6, recommend_sort: this.num6_6, recommend_num: this.num6 },
            { type: 7, recommend_sort: this.num7_7, recommend_num: this.num7 },
            { type: 8, recommend_sort: this.num8_8, recommend_num: this.num8 },
            { type: 9, recommend_sort: this.num9_9, recommend_num: this.num9 },
            { type: 10, recommend_sort: this.num10_10, recommend_num: this.num10 },
          ]
        })
          .then(res => {
            this.$router.push({
              path: "/recommendList"
            });
          })
          .catch(err => {});
      }
    }
  },

  watch: {}
};
</script>
<style lang='scss' scoped>
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
