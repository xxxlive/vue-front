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
      <el-carousel height="600px" type="card" v-on:change="vifeo_banner_change">

        <P id="video_banner_title">{{video_banner_name_now}}
        </P>

        <el-carousel-item v-for="item in video_list" :key="item.src">
          <div class="video_banner">

            <video autoplay muted loop width="960px">
              <source v-bind:data-layzr-src="item.src" type="video/mp4" v-bind:src="item.src">
            </video>

          </div>
        </el-carousel-item>
      </el-carousel>
    </div>


    <!-- 幻灯片 结束 -->

    <div id="upcoming-events" style="background-color: #f5f7f8">
      <section class="container">
        <section class="tal table" style="position: relative;transform: translate(20px,45px)">
          <span class="important_title">Upcoming Events</span>
        </section>
      </section>

      <div>
        <el-scrollbar style="height: 100%; position: relative;transform: translate(20px, 45px);">
          <el-row :gutter="40" class="centered">
            <el-col :span="5" v-for="(o, index) in events" :key="o" :offset="index === 0 ? 1 : 0">
              <el-card :body-style="{ padding: '0px' }" shadow="hover">
                <img class="image" v-bind:src="o.src" v-bind:alt="o.title"
                     style="aspect-ratio: 16/9; height: 180px; object-fit: cover; object-position: center">
                <div style="padding: 10px;">
                  <span style="font-weight: bold; font-size: large">{{ o.title }}</span>
                  <div class="bottom clearfix">
                    <time class="time">{{ o.date }}</time>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-scrollbar>
      </div>
    </div>


    <div id="aCoursesList">
      <!-- 在线教育网课程 开始 -->


      <div style="background-color: #f5f7f8">
        <section class="container">

          <section class="tal table" style="position: relative;transform: translate(20px,45px)">

              <span class="important_title">Popular Courses

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
                  <class_lable_veritical_white v-bind:cover="item.cover" v-bind:title="item.title"
                                               v-bind:price="item.price" v-bind:buycount="item.buyCount"
                                               v-bind:viewcount="item.viewCount"
                                               v-on:islogin="isLogin(item.id)">

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

              <span class="important_title">Master Lecturer
              </span>

          </section>

          <div>
            <article class="i-teacher-list">
              <ul class="of">
                <li v-for="teacher in teacherList" :key="teacher.id">

                  <class_lable_veritical v-bind:avater="teacher.avatar" v-bind:name="teacher.name"
                                         v-bind:career="teacher.career" v-bind:intro="teacher.intro"
                                         v-bind:id="teacher.id"
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

      video_banner_name_now : "Discover",

      video_list:[

        {src: "https://terra-1-g.djicdn.com/851d20f7b9f64838a34cd02351370894/Shot%20on%20Banner/Mavic3_webclip_08.mp4",
         name:"Discover The World"
        },
        {
          src: "https://terra-1-g.djicdn.com/851d20f7b9f64838a34cd02351370894/mini2-skypixel-banner/Mini2_Showreel_S32_Banner_10s_V4_1200x720.mp4",
          name:"Go On"
        },

        {
          src : "https://terra-1-g.djicdn.com/851d20f7b9f64838a34cd02351370894/M3P%20shot%20on/WM162_%E5%AE%98%E7%BD%91%E9%A6%96%E9%A1%B5ShotOn_MASTER_1200x720_20220509.mp4",
          name : "Learn EveryThing"
        },

        {
          src: "https://terra-1-g.djicdn.com/851d20f7b9f64838a34cd02351370894/170-ar/0416.mp4",
          name : "Reach Your Dream"
        }


      ],

      events: [
        {
          src: 'https://empic.dfcfw.com/742596400923164673/w900h600/art',
          title: '华为分享会',
          date: '7/22/2022'
        },
        {
          src: 'http://p8.itc.cn/images01/20200909/38a38485365e4bcbafc483518e029dc2.jpeg',
          title: '鸿蒙系统分享会',
          date: '7/23/2022'
        }, {
          src: 'https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2021%2F1101%2F76b61c95j00r1vz1n0011c000ms007lg.jpg&thumbnail=660x2147483647&quality=80&type=jpg',
          title: '华为服务分享会',
          date: '7/24/2022'
        }, {
          src: 'http://pic.uzzf.com/up/2021-7/16268388929285582.jpg',
          title: '鸿蒙系统开发公开课',
          date: '7/25/2022'
        }, {
          src: 'https://5b0988e595225.cdn.sohucs.com/q_70,c_zoom,w_640/images/20190225/77bce51d15de4a7191079825020c22cf.jpeg',
          title: '华为谈5G',
          date: '7/26/2022'
        }, {
          src: 'https://p9.itc.cn/images01/20210523/a12f02c5ad864c0185d8c8ef848f2a6e.png',
          title: '华为手机展望',
          date: '7/27/2022'
        }, {
          src: 'https://pica.zhimg.com/v2-1ea8583b536e7dfa60e9797d72e4b95b_1440w.jpg?source=172ae18b',
          title: '华为谈营销',
          date: '7/28/2022'
        },
      ],


      swiperOption: {
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

    vifeo_banner_change(inedx_now,index_preview){
      console.log(this.video_list.at(inedx_now).name)
      console.log(index_preview)
      this.video_banner_name_now=this.video_list.at(inedx_now).name
    },

    get_video_banner_name(item){

      this.video_banner_name_now=iteme.name;

    },


    //判断是否null
    isNotNull(data) {
      return (!(data === "" || data === undefined || data == null));
    },
    //判断是否登录
    isLogin(to) {

      if (this.isNotNull(cookie.get('guli_token'))) {
        console.log(cookie.get('guli_token'))
        window.location.href = "/course/" + to
      } else {
        window.location.href = "/login"
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
  },
  mounted() {

    let vide_title=document.getElementById("video_banner_title")
    vide_title.style.setProperty("width",window.screen.width+"px")
    console.log("gaga"+window.screen.width+"px")
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

.important_title {
  margin-top: 80px;
  margin-bottom: 10px;;
  font-size: xx-large;
  line-height: 2.25rem;
  font-family: Source Sans Pro, Arial, sans-serif;
  font-weight: bolder;
  letter-spacing: -.1px;
  color: #000000;
  z-index: auto;
}

#video_banner_title{

  position: absolute;
  font-size: 36px;
  transform: translate(0,80px);
  font-weight: bold;
  line-height: 24px;
  color: white;
  opacity: 0.75;
  text-align: center;
  word-wrap: break-word;
  box-sizing: inherit;
  font-family: "Open Sans","PingFang SC","Microsoft YaHei","Helvetica Neue","Hiragino Sans GB","WenQuanYi Micro Hei",Arial,sans-serif;
  z-index: 3;
  transition-duration: 0.4s;
}
</style>
