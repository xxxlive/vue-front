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
              <el-menu-item index="2-2">Recommended</el-menu-item>
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
                <div>

                  <el-progress type="circle" :percentage=(this.tabledata[0].courseContent.length)/this.tabledata[0].totCourse*100  :format="format1" :color="formatColor" ></el-progress>

                  <el-progress type="circle" :percentage=(this.tabledata[1].courseContent.length)/this.tabledata[1].totCourse*100  :format="format2" :color="formatColor"></el-progress>

                  <el-progress type="circle" :percentage=(this.tabledata[2].courseContent.length)/this.tabledata[2].totCourse*100  :format="format3" :color="formatColor"></el-progress>

                  <el-progress type="circle" :percentage=(this.tabledata[3].courseContent.length)/this.tabledata[3].totCourse*100  :format="format4" :color="formatColor" ></el-progress>

                  <el-progress type="circle" :percentage=(this.tabledata[4].courseContent.length)/this.tabledata[4].totCourse*100  :format="format5" :color="formatColor"></el-progress>

                  <el-progress type="circle" :percentage=(this.tabledata[5].courseContent.length)/this.tabledata[5].totCourse*100  :format="format6" :color="formatColor"></el-progress>

                  <el-progress type="circle" :percentage=(this.tabledata[6].courseContent.length)/this.tabledata[6].totCourse*100  :format="format7" :color="formatColor"></el-progress>

                  <el-progress type="circle" :percentage=(this.tabledata[7].courseContent.length)/this.tabledata[7].totCourse*100  :format="format8" :color="formatColor"></el-progress>

                  <el-progress type="circle" :percentage=this.totalpercentage :format="formatTol" :color="formatColor"></el-progress>
                </div>

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
      tabledata: [
        {
        courseContent:[],
        totcourse:""
      },
      {
        courseContent:[],
        totcourse:""
      },
      {
        courseContent:[],
        totcourse:""
      },
      {
        courseContent:[],
        totcourse:""
      },
      {
        courseContent:[],
        totcourse:""
      },
      {
        courseContent:[],
        totcourse:""
      },
      {
        courseContent:[],
        totcourse:""
      },
      {
        courseContent:[],
        totcourse:""
      }
      ],
      totalpercentage:""
    }
  },
  created() {

    //this.initSubject()
    this.isLogin()
    console.log("learning progress")
    //console.log(loginApi.getLoginUserInfo());
    this.initUserData()
    console.log("1111")

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
            ucenterApi.getBoughtCourseRatio(id)
            .then(response=>{
                // console.log("this is response!")
                // console.log(response)
                console.log("this is data:")
                console.log(response.data.data.data)
                this.tabledata = response.data.data.data;

                var sum=0;
                var totcourses = 0;
                var i = 0;
                for(i=0;i<8;i++){
                  sum+=this.tabledata[i].courseContent.length;
                  totcourses += this.tabledata[i].totCourse;
                  console.log("tot")
                  console.log(totcourses)


                }
                let toround = Math.round(sum/totcourses*100);
                this.totalpercentage = toround

                console.log( this.totalpercentage);

                // console.log(typeof course_data)
                // console.log(course_data)
            })

        })
    },
  formatColor(percentage){
    if(percentage>=50){
      return "green"
    }else if(10<percentage<50){
      return "yellow"
    }else{
      return "red"
    }
  },
  format1(percentage) {
    Math.round(percentage);
    return `front end ${percentage}%`;
  },
  format2(percentage) {
    Math.round(percentage);
    return `back end ${percentage}%`;
  },
  format3(percentage) {
    Math.round(percentage);
    return `Database ${percentage}%`;
  },
  format4(percentage) {
    Math.round(percentage);
    return `Artificial Intelligence ${percentage}%`;
  },
  format5(percentage) {
    Math.round(percentage);
    return `Big Data ${percentage}%`;
  },
  format6(percentage) {
    return `Programming Language ${percentage}%`;
  },
  format7(percentage) {
    Math.round(percentage);
    Math.round(percentage);
    return `Cloud Compute ${percentage}%`;
  },
  format8(percentage) {
    Math.round(percentage);
    return `System Maintenance ${percentage}%`;
  },
  formatTol(){

    return `Total courses ${this.totalpercentage}%`
  }
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
