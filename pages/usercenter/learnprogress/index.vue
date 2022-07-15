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
            <template slot="title"><i class="el-icon-menu"></i>导航二</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="2-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>导航三</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="3-1">选项1</el-menu-item>
              <el-menu-item index="3-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="3-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="3-4">
              <template slot="title">选项4</template>
              <el-menu-item index="3-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <div class="centered" style="margin-left:auto; margin-right:auto">
            <div>Learning Progress</div>
            <el-divider><i class="el-icon-mobile-phone" style="margin: 0 10px; font-size: 100px; color: green"></i></el-divider>
            <div>
              <el-main>
                <el-progress type="circle" :percentage="0"></el-progress>
                <el-progress type="circle" :percentage="25"></el-progress>
                <el-progress type="circle" :percentage="100" status="success"></el-progress>
                <el-progress type="circle" :percentage="70" status="warning"></el-progress>
                <el-progress type="circle" :percentage="50" status="exception"></el-progress>
            </el-main>
            </div>

        </div>
      </el-container>
    </el-container>



  </div>
</template>
<script>

import courseApi from '@/api/course'
import loginApi from "@/api/login"
import ucenterApi from "@/api/ucenter"
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
    this.initUserData()
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
    //获取这个用户选修的课群的比例
    initUserData() {

        loginApi.getLoginUserInfo()
            .then(response => {
            let id = response.data.data.ID;
            console.log("拿到用户id了");
            course_data = ucenterApi.getBroughtCourseRatio(id);
            console.log(typeof course_data)
            console.log(course_data)
        })
    },
  }
};
</script>

<style scoped>
.active {
  background: #bdbdbd;
}
.hide {
  display: none;
}
.show {
  display: block;
}
</style>
