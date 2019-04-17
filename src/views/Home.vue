<template>
  <el-row class="container">
    <el-col :span="24" class="header">
      <el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
        <img src="/static/logo.ico" style="padding-top:10px;width:35px;height:35px;" alt>
        {{collapsed?'':sysName}}
      </el-col>
      <el-col :span="10"></el-col>
      <span style="color:#fff;position:absolute;right:6%;">欢迎你，
        <i style="color:#409EFF;">{{realname}}</i>
      </span>
      <el-col :span="4" class="userinfo">
        <el-dropdown trigger="hover">
          <span class="el-dropdown-link userinfo-inner">
            <img
              src="http://5b0988e595225.cdn.sohucs.com/images/20180107/5b1c4a3578604473b1bc1f2975bdda92.jpeg"
            >
            {{sysUserName}}
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="userInfo">个人资料</el-dropdown-item>
            <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-col>

    <el-col :span="24" class="main">
      <aside @click="changeStatus">
        <el-menu
          :default-active="$route.name"
          class="el-menu-vertical-demo"
          @open="handleopen"
          @close="handleclose"
          @select="handleselect"
          theme="dark"
          unique-opened
          router
        >
        <el-scrollbar style="height:100%">
          <menu-tree :nodes="$router.options.routes"></menu-tree>
        </el-scrollbar>
        </el-menu>
      </aside>
      <section class="content-container">
        <div v-if="isShowSection" class="grid-content bg-purple-light">
          <el-col :span="24" class="breadcrumb-container">
            <strong class="title">{{$route.name}}</strong>
            <el-breadcrumb separator="/" class="breadcrumb-inner">
              <el-breadcrumb-item
                v-for="(item,index) in $route.matched"
                :key="item.name"
              >{{ item.name }}</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="24" class="content-wrapper">
            <transition>
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
        <user v-if="isShowUser"></user>
      </section>
    </el-col>
  </el-row>
</template>

<script>
import user from "@/views/user/user";
import { outLogin, getUserInfo } from "@/api/api";
import MenuTree from "@/components/MenuTree";
export default {
  data() {
    return {
      sysName: "奇集后台管理",
      collapsed: false,
      sysUserName: "",
      sysUserAvatar: "",
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      isShowUser: false,
      isShowSection: true,
      nodes: this.$router.options.routes,
      realname: ""
    };
  },
//   inject: ["reload"],
  created() {
    //这里没有直接使用this.$router.options.routes，是因为addRoute的路由规则，在这里this.$router.options.routes获取不到
    //有兴趣的可以看一下源码，是为什么获取不到，但是却又有规则了
    //另外在开发的时候，可能由于是热部署，也会不断重复的给nodes添加元素，造成导航条有重复的，简单解决，可以设置一个开关
    let isLoadNodes = sessionStorage.getItem("isLoadNodes");
    if (!isLoadNodes&&sessionStorage.getItem("user")) {
      let data = JSON.parse(sessionStorage.getItem("user"));
      this.nodes.push(...data);
      sessionStorage.setItem("isLoadNodes", "true");
    }
  },
  methods: {
    userInfo() {
      this.isShowUser = true;
      this.isShowSection = false;
    },
    changeStatus() {
      this.isShowUser = false;
      this.isShowSection = true;
    },
    //退出登录
    logout: function() {
      var _this = this;
      this.$confirm("确认退出吗?", "提示", {
        //type: 'warning'
      })
        .then(() => {
          outLogin().then(res => {
            sessionStorage.removeItem("user");
            sessionStorage.removeItem("token");
            _this.$router.push("/login");
          });
        })
        .catch(() => {});
    },
    onSubmit() {
    },
    handleopen() {
    },
    handleclose() {
    },
    handleselect: function(a, b) {}
  },
  mounted() {
    // this.reload();
    getUserInfo().then(res => {
      this.realname = res.realname;
    });
  },
  components: {
    MenuTree,
    user
  }
};
</script>

<style scoped lang="scss">
.el-scrollbar__wrap {
  overflow-x: hidden;
 }
.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
  .header {
    height: 80px;
    line-height: 80px;
    background: #242f42;
    color: #fff;
    .userinfo {
      text-align: right;
      padding-right: 35px;
      float: right;
      .userinfo-inner {
        cursor: pointer;
        color: #fff;
        img {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          margin: 10px 0px 10px 10px;
          float: right;
        }
      }
    }
    .logo {
      //width:230px;
      height: 80px;
      font-size: 22px;
      padding-left: 22px;
      padding-right: 20px;
      border-color: rgba(238, 241, 146, 0.3);
      border-right-width: 1px;
      border-right-style: solid;
      img {
        width: 40px;
        float: left;
        margin: 10px 10px 10px 18px;
      }
      .txt {
        color: #fff;
      }
    }
    .logo-width {
      width: 260px;
    }
    .logo-collapse-width {
      width: 60px;
    }
    .tools {
      padding: 0px 23px;
      width: 14px;
      height: 60px;
      line-height: 60px;
      cursor: pointer;
    }
  }
  .main {
    display: flex;
    // background: #324057;
    position: absolute;
    top: 80px;
    bottom: 0px;
    overflow: hidden;
    aside {
      flex: 0 0 260px;
      width: 260px;
      // position: absolute;
      // top: 0px;
      // bottom: 0px;
      .el-menu {
        height: 100%;
      }
      .collapsed {
        width: 60px;
        .item {
          position: relative;
        }
        .submenu {
          position: absolute;
          top: 0px;
          left: 60px;
          z-index: 99999;
          height: auto;
          display: none;
        }
      }
    }
    .menu-collapsed {
      flex: 0 0 60px;
      width: 60px;
    }
    .menu-expanded {
      flex: 0 0 260px;
      width: 260px;
    }
    .content-container {
      background: #fff;
      flex: 1;
      // position: absolute;
      // right: 0px;
      // top: 0px;
      // bottom: 0px;
      // left: 230px;
      overflow-y: scroll;
      padding: 20px;
      .breadcrumb-container {
        //margin-bottom: 15px;
        .title {
          width: 200px;
          float: left;
          color: #475669;
        }
        .breadcrumb-inner {
          float: right;
        }
      }
      .content-wrapper {
        background-color: #fff;
        box-sizing: border-box;
      }
    }
  }
}
</style>