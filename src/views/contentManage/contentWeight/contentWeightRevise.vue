<template>
  <div>
    <el-row>
      <el-col :span="2">
        <el-tag type="info">内容类型</el-tag>
      </el-col>
      <el-col :span="4">
        <el-tag type="info">内容名称</el-tag>
      </el-col>
      <el-col :span="4">
        <el-tag type="info">排列顺序</el-tag>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <el-tag>原校园大爆料</el-tag>
      </el-col>
      <el-col :span="4">
        <el-input v-model="input1" placeholder="请输入内容"></el-input>
      </el-col>
      <el-col :span="4">
        <el-input v-model="input1_1" placeholder="请输入内容"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <el-tag>原奇集大学</el-tag>
      </el-col>
      <el-col :span="4">
        <el-input v-model="input2" placeholder="请输入内容"></el-input>
      </el-col>
      <el-col :span="4">
        <el-input v-model="input2_2" placeholder="请输入内容"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <el-tag>原招聘活动</el-tag>
      </el-col>
      <el-col :span="4">
        <el-input v-model="input3" placeholder="请输入内容"></el-input>
      </el-col>
      <el-col :span="4">
        <el-input v-model="input3_3" placeholder="请输入内容"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <el-tag>原考研活动</el-tag>
      </el-col>
      <el-col :span="4">
        <el-input v-model="input4" placeholder="请输入内容"></el-input>
      </el-col>
      <el-col :span="4">
        <el-input v-model="input4_4" placeholder="请输入内容"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <el-tag>原学术活动</el-tag>
      </el-col>
      <el-col :span="4">
        <el-input v-model="input5" placeholder="请输入内容"></el-input>
      </el-col>
      <el-col :span="4">
        <el-input v-model="input5_5" placeholder="请输入内容"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <el-tag>原社团活动</el-tag>
      </el-col>
      <el-col :span="4">
        <el-input v-model="input6" placeholder="请输入内容"></el-input>
      </el-col>
      <el-col :span="4">
        <el-input v-model="input6_6" placeholder="请输入内容"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <el-tag>原竞赛活动</el-tag>
      </el-col>
      <el-col :span="4">
        <el-input v-model="input7" placeholder="请输入内容"></el-input>
      </el-col>
      <el-col :span="4">
        <el-input v-model="input7_7" placeholder="请输入内容"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <el-tag>本校内容</el-tag>
      </el-col>
      <el-col :span="4">
        <el-input v-model="input8" placeholder="请输入内容"></el-input>
      </el-col>
      <el-col :span="4">
        <el-input v-model="input8_8" placeholder="请输入内容"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <el-tag>情感走心内容</el-tag>
      </el-col>
      <el-col :span="4">
        <el-input v-model="input9" placeholder="请输入内容"></el-input>
      </el-col>
      <el-col :span="4">
        <el-input v-model="input9_9" placeholder="请输入内容"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <el-tag>活动策划内容</el-tag>
      </el-col>
      <el-col :span="4">
        <el-input v-model="input10" placeholder="请输入内容"></el-input>
      </el-col>
      <el-col :span="4">
        <el-input v-model="input10_10" placeholder="请输入内容"></el-input>
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
import { getRecommendList, saveTabSetting } from "@/api/api";
export default {
  name: "",
  props: [""],
  data() {
    return {
      input1: "",
      input1_1: "",
      input2: "",
      input2_2: "",
      input3: "",
      input3_3: "",
      input4: "",
      input4_4: "",
      input5: "",
      input5_5: "",
      input6: "",
      input6_6: "",
      input7: "",
      input7_7: "",
      input8: "",
      input8_8: "",
      input9: "",
      input9_9: "",
      input10: "",
      input10_10: "",
    };
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {
    getRecommendList().then(res => {
      this.input1 = res.data.data[0].tab_name;
      this.input1_1 = res.data.data[0].tab_sort;
      this.input2 = res.data.data[1].tab_name;
      this.input2_2 = res.data.data[1].tab_sort;
      this.input3 = res.data.data[2].tab_name;
      this.input3_3 = res.data.data[2].tab_sort;
      this.input4 = res.data.data[3].tab_name;
      this.input4_4 = res.data.data[3].tab_sort;
      this.input5 = res.data.data[4].tab_name;
      this.input5_5 = res.data.data[4].tab_sort;
      this.input6 = res.data.data[5].tab_name;
      this.input6_6 = res.data.data[5].tab_sort;
      this.input7 = res.data.data[6].tab_name;
      this.input7_7 = res.data.data[6].tab_sort;
      this.input8 = res.data.data[7].tab_name;
      this.input8_8 = res.data.data[7].tab_sort;
      this.input9 = res.data.data[8].tab_name;
      this.input9_9 = res.data.data[8].tab_sort;
      this.input10 = res.data.data[9].tab_name;
      this.input10_10 = res.data.data[9].tab_sort;
    });
  },
  methods: {
    saveSet() {
        saveTabSetting({
          data: [
            { type: 1, tab_name: this.input1, tab_sort: this.input1_1 },
            { type: 2, tab_name: this.input2, tab_sort: this.input2_2 },
            { type: 3, tab_name: this.input3, tab_sort: this.input3_3 },
            { type: 4, tab_name: this.input4, tab_sort: this.input4_4 },
            { type: 5, tab_name: this.input5, tab_sort: this.input5_5 },
            { type: 6, tab_name: this.input6, tab_sort: this.input6_6 },
            { type: 7, tab_name: this.input7, tab_sort: this.input7_7 },
            { type: 8, tab_name: this.input8, tab_sort: this.input8_8 },
            { type: 9, tab_name: this.input9, tab_sort: this.input9_9 },
            { type: 10, tab_name: this.input10, tab_sort: this.input10_10 },
          ]
        })
          .then(res => {
            this.$router.push({
              path: "/contentWeightList"
            });
          })
          .catch(err => {
          });
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