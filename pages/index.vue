<template>
  <div>

    <!-- 幻灯片 开始 -->
    <div v-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper">

        <div class="swiper-slide" v-for="item in bannerList" :key="item.id" style="background: #040B1B;">
          <a target="_blank" :href="item.linkUrl">
            <img :src="item.imageUrl" :alt="item.title">
          </a>
        </div>
      </div>
      <div class="swiper-pagination swiper-pagination-white"></div>
      <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
      <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
    </div>
    <!-- 幻灯片 结束 -->
    <div id="aCoursesList">
      <!-- 在线教育网课程 开始 -->
      <header class="comm-title">
        <h2 class="tac">
          <span class="c-333">内容频道</span>
        </h2>
      </header>
        <el-scrollbar height="100%">
          <el-row :gutter="40" class="centered">
            <el-col :span="5" :offset="2">
              <div class="card-content bg-purple-light">
                <img src="~/assets/img/qq-icon.png" alt="">
                <h3>在线教育网课程</h3>
                <p>在线教育网课程</p>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="card-content bg-purple-light">
                <img src="~/assets/img/qq-icon.png" alt="">
                <h3>在线教育网课程</h3>
                <p>在线教育网课程</p>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="card-content bg-purple-light">
                <img src="~/assets/img/qq-icon.png" alt="">
                <h3>在线教育网课程</h3>
                <p>在线教育网课程</p>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="card-content bg-purple-light">
                <div class="card-content bg-purple-light">
                  <img src="~/assets/img/qq-icon.png" alt="">
                  <h3>在线教育网课程</h3>
                  <p>在线教育网课程</p>
                </div>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="card-content bg-purple-light">
                <div class="card-content bg-purple-light">
                  <img src="~/assets/img/qq-icon.png" alt="">
                  <h3>在线教育网课程</h3>
                  <p>在线教育网课程</p>
                </div>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="card-content bg-purple-light">
                <div class="card-content bg-purple-light">
                  <img src="~/assets/img/qq-icon.png" alt="">
                  <h3>在线教育网课程</h3>
                  <p>在线教育网课程</p>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-scrollbar>

      <div>
        <section class="container">
          <header class="comm-title">
            <h2 class="tac">
              <span class="c-333">热门课程</span>
            </h2>
          </header>
          <div>
            <article class="comm-course-list">
              <ul class="of" id="bna">
                <li v-for="item in eduList" :key="item.id">
                  <div class="cc-l-wrap">
                    <section class="course-img">
                      <img
                        :src="item.cover"
                        class="img-responsive"
                        alt="item.title"
                        width="500"
                        height="320"
                      >
                      <div class="cc-mask">
                        <a title="开始学习" class="comm-btn c-btn-1" v-on:click="isLogin(item.id)">开始学习</a>
                      </div>
                    </section>

                    <h3 class="hLh30 txtOf mt10">
                      <a :title="item.title" class="course-title fsize18 c-333"
                         v-on:click="isLogin(item.id)">{{ item.title }}</a>
                    </h3>

                    <section class="mt10 hLh20 of">
                      <span class="fr jgTag bg-green" v-if="Number(item.price) === 0">
                        <i class="c-fff fsize12 f-fA">免费</i>
                      </span>
                      <span class="fr jgTag bg-green" v-else>
                         <i class="c-fff fsize12 f-fA"> ￥{{ item.price }}</i>
                       </span>
                      <span class="fl jgAttr c-ccc f-fA">
                         <i class="c-999 f-fA">{{ item.buyCount }} 人学习</i>
                         <i class="c-999 f-fA">{{ item.viewCount }} 人浏览</i>
                      </span>
                    </section>
                  </div>
                </li>

              </ul>
              <div class="clear"></div>
            </article>
            <section class="tac pt20">
              <a href="/course" title="全部课程" class="comm-btn c-btn-2">全部课程</a>
            </section>
          </div>
        </section>
      </div>
      <!-- /在线教育网课程 结束 -->
      <!-- 在线教育网名师 开始 -->
      <div>
        <section class="container">
          <header class="comm-title">
            <h2 class="tac">
              <span class="c-333">名师大咖</span>
            </h2>
          </header>
          <div>
            <article class="i-teacher-list">
              <ul class="of">
                <li v-for="teacher in teacherList" :key="teacher.id">
                  <section class="i-teach-wrap">
                    <div class="i-teach-pic">
                      <a :href="'/teacher/'+teacher.id" :title="teacher.name">
                        <img :alt="teacher.name" :src="teacher.avatar">
                      </a>
                    </div>
                    <div class="mt10 hLh30 txtOf tac">
                      <a :href="'/teacher/'+teacher.id" :title="teacher.name"
                         class="fsize18 c-666">{{ teacher.name }}</a>
                    </div>
                    <div class="hLh30 txtOf tac">
                      <span class="fsize14 c-999">{{ teacher.career }}</span>
                    </div>
                    <div class="mt15 i-q-txt">
                      <p
                        class="c-999 f-fA"
                      >{{ teacher.intro }}</p>
                    </div>
                  </section>
                </li>
              </ul>
              <div class="clear"></div>
            </article>
            <section class="tac pt20">
              <a href="/teacher" title="全部教师" class="comm-btn c-btn-2">全部教师</a>
            </section>
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

export default {
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
    isNotNull(data) {
      return (data == "" || data == undefined || data == null) ? false : true;
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
          this.teacherList = response.data.data.teacherList
        })
    }
  }
}
</script>
