<template>

  <div>
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu>
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-user"></i>Private</template>
            <el-menu-item-group>

              <el-menu-item index="1-1">
                <router-link to="/usercenter/information" exact>
                  <a>information</a>
                </router-link>
              </el-menu-item>
              <el-menu-item index="1-2">
                <router-link to="/usercenter/learnprogress" exact>
                  <a>Learning Progress</a>
                </router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>Course</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="2-1">
                <router-link to="/usercenter/favorite" exact>
                  <a>Favorite</a>
                </router-link>
              </el-menu-item>
              <el-menu-item index="2-2"><router-link to="/usercenter/recommend" exact>
                <a>Recommend</a>
              </router-link></el-menu-item>
            </el-menu-item-group>

          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <div class="centered" style="margin-left:auto; margin-right:auto">
            <img src="@/assets/img/pic/huawei.jpg" width="400px">
        </div>
      </el-container>
    </el-container>

  </div>
</template>
<script>

import courseApi from '@/api/course'
import loginApi from "@/api/login"
import cookie from 'js-cookie'
export default {
  data() {
    return {
      tabledata: [],
      testData:[
        {
          id:"123",
          nickname:"456",
          mobile:"567",
          avatar:"1231231231"
        }
      ]
    }
  },
  created() {

    //this.initSubject()
    this.isLogin()
    console.log("123")
    //console.log(loginApi.getLoginUserInfo());
    this.initPage()
    console.log("123")

  },
  methods: {
    //判断是否null
    isNotNull(data){
      return (data == "" || data == undefined || data == null) ? false: true;
    },
    //判断是否登录
    isLogin(){
      if(this.isNotNull(cookie.get('guli_token'))){
        console.log(cookie.get('guli_token'))

      }
      else{
        window.location.href="/login"
      }
    },
    //获取userinfo
    initPage() {
      console.log("enter this function!")

    },
    setup() {
      let player = null;
      console.log("hhhh")
      onMounted(() => {
        console.log(player);
      });

      return {
        setPlayer: (p) => (player = p),
      };
    },
  }
};
</script>

<style scoped>
/* .active {
  background: #bdbdbd;
}
.hide {
  display: none;
}
.show {
  display: block;
}
.el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
      }

      .el-aside {
        color: #333;
      } */
</style>
