<template>
  <div>

    <!-- 幻灯片 开始 -->
<!--    <div v-swiper:mySwiper="swiperOption">-->
<!--      <div class="swiper-wrapper">-->
<!--        <div class="swiper-slide" v-for="item in bannerList" :key="item.id" style="background: #040B1B;">-->
<!--            <a target="_blank" :href="item.linkUrl">-->
<!--                <img :src="item.imageUrl" :alt="item.title">-->
<!--           </a>-->
<!--        </div>-->
<!--    </div>-->
<!--   <div class="swiper-pagination swiper-pagination-white"></div>-->
<!--    <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>-->
<!--    <div class="swiper-button-next swiper-button-white" slot="button-next"></div>-->
<!--</div>-->

    <!--    尝试进行视频播放-->
    <div class="block">
      <el-carousel height="500px" type="card">
        <el-carousel-item v-for="item in 4" :key="item">
          <div class="video_banner" >
            <video  autoplay muted loop width="960px">
              <source type="video/mp4" src="~/assets/video/Mini2_Showreel_S32_Banner_10s_V4_1200x720.mp4">
            </video>

          </div>
        </el-carousel-item>
      </el-carousel>
    </div>




    <!-- 幻灯片 结束 -->
     <div id="aCoursesList">
      <!-- 在线教育网课程 开始 -->



      <div style="background-color: #f5f7f8">
        <section class="container" >

            <section class="tal table" style="position: relative;transform: translate(20px,45px)">

              <span  style="margin-top: 80px;
                            margin-bottom: 10px;;
                            font-size: xx-large;
                            line-height: 2.25rem;
                            font-family: Source Sans Pro,Arial,sans-serif;
                            font-weight: bolder;
                            letter-spacing: -.1px;
                            color: #000000;
                            z-index: auto;
">Popular Courses
              </span>

          </section>


          <div>
            <article class="comm-course-list">
              <ul class="of" id="bna">
                <li v-for="item in eduList" :key="item.id">
<!--
"item.cover" 图片的路径
item.id
v-on:click="isLogin(item.id) 用于判断是否登录并且实现自动转跳
Number(item.price)
item.buyCount
item.viewCount
-->
                    <class_lable_veritical_white v-bind:cover="item.cover" v-bind:title="item.title" v-bind:price="item.price" v-bind:buycount="item.buyCount" v-bind:viewcount="item.viewCount"

                                                 v-on:islogin="isLogin(item.id)" >

                    </class_lable_veritical_white>


                </li>

              </ul>
              <div class="clear"></div>
            </article>
          </div>
        </section>
      </div>
      <!-- /在线教育网课程 结束 -->


    <!-- 在线教育网名师 开始 -->
      <div>
        <section class="container">

            <section class="tal table" style="transform: translate(20px,50px)">

              <span  style="margin-top: 80px;
                            margin-bottom: 10px;;
                            font-size: xx-large;
                            line-height: 2.25rem;
                            font-family: Source Sans Pro,Arial,sans-serif;
                            font-weight: bolder;
                            letter-spacing: -.1px;
                            color: #000000;
                            z-index: auto;
                ">Master Lecturer
              </span>

            </section>

          <div>
            <article class="i-teacher-list">
              <ul class="of">
                <li v-for="teacher in teacherList" :key="teacher.id">

                  <class_lable_veritical v-bind:avater="teacher.avatar" v-bind:name="teacher.name" v-bind:career="teacher.career" v-bind:intro="teacher.intro" v-bind:id="teacher.id"
                   ></class_lable_veritical>

                </li>
              </ul>
              <div class="clear"></div>
            </article>

          </div>
        </section>
      </div>
      <!-- /在线教育网名师 结束 -->
   </div>
  </div>
</template>
<script>
import cookie from 'js-cookie'
import banner from '@/api/banner'
import index from '@/api/index'
import class_lable_horizotal from "@/components/class_lable_horizotal";
import class_lable_veritical from "@/components/lable/class_lable_veritical";
import Class_lable_veritical_white from "@/components/lable/class_label_vertical_white";
export default {
  components: {
    Class_lable_veritical_white,
    class_lable_horizotal,
    class_lable_veritical

  },
  data() {
    return {


      swiperOption: {
        autoplay: true,
        autoplay: {
          disableOnInteraction: false
        },
        //配置分页
        pagination: {
          el: '.swiper-pagination'//分页的dom节点
        },
        //配置导航
        navigation: {
          nextEl: '.swiper-button-next',//下一页dom节点
          prevEl: '.swiper-button-prev'//前一页dom节点
        }
      },
      bannerList: [],
      eduList: [],
      teacherList: []
    }
  },
  created() {
    this.getBannerList()
    this.getIndexData()
  },
  methods: {


    //判断是否null
    isNotNull(data){
    return (!(data === "" || data === undefined || data == null));
    },
        //判断是否登录
      isLogin(to){

      if(this.isNotNull(cookie.get('guli_token'))){
        console.log(cookie.get('guli_token'))
        window.location.href="/course/"+to
      }
      else{
        window.location.href="/login"
      }
    },
    //查询banner数据
    getBannerList() {
      banner.getListBanner()
        .then(response => {
          this.bannerList = response.data.data.list
        })
    },
    //查询热门课程和名师
    getIndexData() {
      index.getIndexData()
           .then(response => {
             this.eduList = response.data.data.eduList
             console.log(this.eduList)
             this.teacherList = response.data.data.teacherList
           })
    }
  }
}
</script>


<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

section_test{
  position: absolute;
  top : 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  height: 400px;
  width: 1200px;
  background: #000000;
  box-shadow: 0 25px 30px rgba(0,0,0,.5);
  z-index: 2;
  display: flex;

}


</style>
