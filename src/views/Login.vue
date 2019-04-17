<template>
  <div class="warp">
    <!-- *      ┌─┐       ┌─┐
 *   ┌──┘ ┴───────┘ ┴──┐
 *   │                                      │
 *   │                ───               │
 *   │         >               <         │
 *   │                                    │
 *   │           ...  ⌒  ...            │
 *   │                                │
 *   └───┐         ┌───┘
 *            │          │
 *             │         │
 *            │         │
 *            │         └──────────────┐
 *            │                                              │
 *            │                                              ├─┐
 *            │                                              ┌─┘
 *            │                                              │
 *            └─┐  ┐  ┌───────┬──┌──┘
 *                  │ ─┤    ─┤     │ ─┤   ─┤
 *                  └──┴──┘    └──┴──┘
 *                神兽保佑
    *               代码无BUG!-->
    <el-form
      :model="ruleForm2"
      :rules="rules2"
      ref="ruleForm2"
      label-position="left"
      label-width="0px"
      class="demo-ruleForm login-container"
    >
      <h3 class="title">奇集后台管理</h3>
      <el-form-item prop="account">
        <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input
          type="password"
          @keyup.enter.native="handleSubmit2"
          v-model="ruleForm2.checkPass"
          auto-complete="off"
          placeholder="密码"
        ></el-input>
      </el-form-item>
      <p></p>
      <!-- <el-form-item style="position:relative;"  class="yanzheng" prop="checkProving"   label-width="200px">
        <el-input    type="text" v-model="ruleForm2.checkProving"  placeholder="验证码"></el-input>
        <img @click="change" :src="captcha_image_content" style="position:absolute;right:-200px;top:0px;"  alt="">
      </el-form-item>-->
      <el-form-item style="width:100%;">
        <el-button
          type="primary"
          :plain="true"
          style="width:100%;"
          @click.native.prevent="handleSubmit2"
          :loading="logining"
        >登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login, imageProving, getUserInfo } from "../api/api";
import MenuUtils from "@/utils/MenuUtils";
var routers = [];
export default {
  inject:["reload"],
  data() {
    return {
      logining: false,
      ruleForm2: {
        account: "",
        checkPass: "",
        checkProving: ""
      },
      rules2: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        checkPass: [{ required: true, message: "请输入密码", trigger: "blur" }],
        checkProving: [
          { required: true, message: "请输入验证码", trigger: "blur" }
        ]
      },
      checked: false,
      captcha_image_content: "",
      captcha_key: "",
      menus:""
    };
  },
  methods: {
    change() {
      imageProving().then(res => {
        this.captcha_image_content = res.data.captcha_image_content;
        this.captcha_key = res.data.captcha_key;
      });
    },
    handleReset2() {
      this.$refs.ruleForm2.resetFields();
    },
    handleSubmit2(ev) {
      this.menus="";
      var _this = this;
      this.$refs.ruleForm2.validate(valid => {
        if (valid) {
          this.logining = true;
          var loginParams = {
            account: this.ruleForm2.account,
            password: this.ruleForm2.checkPass
          };
          login(loginParams)
            .then(data => {
              this.logining = false;
              sessionStorage.setItem("token", data.access_token);
              getUserInfo().then(res => {
                if(res.menus){
                this.login(res.menus);
                }
                sessionStorage.setItem("permissions", JSON.stringify(res.permissions));
                if(routers){
                  this.$router.addRoutes(routers);
                }
                if(res.init_page){
                  this.$router.push({ path: res.init_page});
                }else{
                  this.$router.push({ path: '/'});
                }
              });
            })
            .catch(err => {
              this.$message.error("账号或密码错误，请重试！");
              this.reload()
            });
        } else {
          return false;
        }
      });
    },
    login(data) {
      window.sessionStorage.setItem("user", JSON.stringify(data));
      MenuUtils(routers, data);
      this.reload();
    }
  },
  created() {
  }
};
</script>

<style lang="scss" scoped>
html,
body {
  height: 100%;
  width: 100%;
}
.warp {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: url(https://images.unsplash.com/photo-1544654803-b69140b285a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80)
    no-repeat;
  background-size: 100% 100%;
}

.login-container {
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 16% auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
}
.yanzheng {
  position: relative;
  left: -200px;
  top: 0px;
}
.yanzheng .el-form-item__error {
  position: relative;
  left: -200px;
  top: 0px;
}
</style>