<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- 教师介绍 开始 -->
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">Introduction</span>
        </h2>
      </header>
      <div class="t-infor-wrap">
        <!-- 教师基本信息 -->
        <section class="fl t-infor-box c-desc-content">
          <div class="mt20 ml20">
            <section class="t-infor-pic">
              <img :src="teacher.avatar">
            </section>
            <h3 class="hLh30">
              <span class="fsize24 c-333">{{teacher.name}}&nbsp;
                {{teacher.level === 1?'高级讲师' : 'Chief Lecturer'}}
              </span>
            </h3>
            <section class="mt10">
              <span class="t-tag-bg">{{teacher.intro}}</span>
            </section>

            <section class="t-infor-txt">
              <p
                class="mt20"
              >{{teacher.career}}</p>
            </section>
            <div class="clear"></div>
          </div>
        </section>
        <div class="clear"></div>
      </div>

      <section class="mt30">
       <div>
          <header class="comm-title all-teacher-title c-course-content">
            <h2 class="fl tac">
              <span class="c-333">Lectures</span>
            </h2>
            <section class="c-tab-title">
              <a href="javascript: void(0)">&nbsp;</a>
            </section>
          </header>

          <!-- /无数据提示 开始-->
          <section class="no-data-wrap" v-if="courseList.length == 0">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">No such file...</span>
          </section>
          <!-- /无数据提示 结束-->

          <article class="comm-course-list" v-if="courseList.length != 0">
            <ul class="of">
              <li v-for="item in courseList" :key="item.id">

                <class_lable_veritical_white v-bind:cover="item.cover" v-bind:title="item.title" v-bind:price="item.price" v-bind:buycount="item.buyCount" v-bind:viewcount="item.viewCount"

                                             v-on:islogin="isLogin(item.id)" >

                </class_lable_veritical_white>


              </li>
            </ul>
            <div class="clear"></div>
          </article>
        </div>
      </section>
    </section>
    <!-- /讲师介绍 结束 -->
  </div>
</template>
<script>
import teacherApi from '@/api/teacher'
import cookie from 'js-cookie'
import Class_lable_veritical_white from "@/components/lable/class_label_vertical_white";


export default {

  components: {
    Class_lable_veritical_white,
  },
   //params 相当于 this.$route.params
  asyncData({params,error}) {
    return teacherApi.getTeacherInfo(params.id)
                     .then(response => {
                       return {
                         teacher: response.data.data.teacher,
                         courseList: response.data.data.courseList
                       }
                     })
  },
    methods: {
    //判断是否null
    isNotNull(data){
    return (data == "" || data == undefined || data == null) ? false: true;
    },
        //判断是否登录
      isLogin(to){
      if(this.isNotNull(cookie.get('guli_token'))){
        console.log(cookie.get('guli_token'))
        window.location.href="../course/"+to
      }
      else{
        window.location.href="/login"
      }
    }
  }
};
</script>
