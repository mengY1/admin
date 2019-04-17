<template>
  <div class="wrapper">
	    <h2>个人资料</h2>
	  <p><span>用户姓名</span><span>{{userInfo.realname}}</span></p>
	  <p><span>平台角色</span><span>{{userInfo.user_id}}</span></p>
	  <p><span>登录账号</span><span>{{userInfo.account}}</span></p>
	  <p>
		  <span>登录密码</span>
		  <span> 

<el-button type="text" @click="dialogFormVisible = true">
			修改密码
</el-button>
			
<el-dialog title="修改密码" :visible.sync="dialogFormVisible">
<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
	<el-form-item label="原密码" prop="current_password">
    <el-input type="password" v-model="ruleForm2.current_password" autocomplete="off"></el-input>
  	</el-form-item>
  <el-form-item label="新密码" prop="password">
    <el-input type="password" v-model="ruleForm2.password" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="确认新密码" prop="password_confirmation">
    <el-input type="password" v-model="ruleForm2.password_confirmation" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
    <el-button @click="resetForm('ruleForm2')">重置</el-button>
  </el-form-item>
</el-form>
</el-dialog>
</span>
</p>
  </div>
</template>

<script>
import { changePassword,getUserInfo } from "../../../src/api/api";
export default {
    inject: ["reload"],
  data() {
    var validatePass = (rule, value, callback) => {
		var reg = new RegExp("[0-9a-zA-Z@#$]{2,}")
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if(value.length<8){
		  callback(new Error("密码长度最小为8位"));
	  }else if(!reg.test(value)){
		  callback(new Error("密码必须包含数字、字母、或者符号中的两种"));
	  }
    };
    var validatePass1 = (rule, value, callback) => {
     var reg = new RegExp("[0-9a-zA-Z@#$]{2,}")
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if(value.length<8){
		  callback(new Error("密码长度最小为8位"));
	  }else if(!reg.test(value)){
		  callback(new Error("密码必须包含数字、字母、或者符号中的两种"));
	  }
    };

    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm2: {
        current_password: "",
        password: "",
        password_confirmation: ""
      },
      rules2: {
        current_password: [{ validator: validatePass, trigger: "change" }],
        password: [{ validator: validatePass1, trigger: "change" }],
        password_confirmation: [{ validator: validatePass2, trigger: "change" }]
      },
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      userInfo: {
          user_id:'',
          realname:'',
          account:''
        }
       
      
    };
  },

  watch: {},
  computed: {},
  methods: {
    submitForm(formName) {
		var changeParams={
			current_password:this.ruleForm2.current_password,
			password:this.ruleForm2.password,
			password_confirmation:	this.ruleForm2.password_confirmation,
		}
		changePassword(changeParams).then(res=>{
			alert(res.message)
			this.reload()
		}).catch(err=>{
			alert(err.errors.current_password[0])
		})
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  created() {},
  mounted() {
    getUserInfo().then(res=>{
      this.userInfo=res
    })
  }
};
</script>
<style lang="scss" scoped>
.wrapper {
  p{
    margin-bottom: 5px;
  }
  h2 {
    margin: 20px 0px 20px 50px;
  }
  span {
    margin: 10px 0px 10px 50px;
  }
}
</style>