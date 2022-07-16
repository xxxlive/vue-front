<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /课程详情 开始 -->
    <section class="container">
      <section class="path-wrap txtOf hLh30">
        <a href="#" title class="c-999 fsize14">Homepage</a>
        \
        <a href="#" title class="c-999 fsize14">{{
          courseWebVo.subjectLevelOne
        }}</a>
        \
        <span class="c-333 fsize14">{{ courseWebVo.subjectLevelTwo }}</span>
      </section>
      <div>
        <article class="c-v-pic-wrap" style="height: 357px;">
          <section class="p-h-video-box" id="videoPlay">
            <img
              :src="courseWebVo.cover"
              :alt="courseWebVo.title"
              class="dis c-v-pic"
            />
          </section>
        </article>
        <aside class="c-attr-wrap">
          <section class="ml20 mr15">
            <h2 class="hLh30 txtOf mt15">
              <span class="c-fff fsize24">{{ courseWebVo.title }}</span>
            </h2>
            <section class="c-attr-jg">
              <span class="c-fff">Price：</span>
              <b class="c-yellow" style="font-size:24px;"
                >￥{{ courseWebVo.price }}</b
              >
            </section>
            <section class="c-attr-mt c-attr-undis">
              <span class="c-fff fsize14"
                >Lecturer：
                {{ courseWebVo.teacherName }}&nbsp;&nbsp;&nbsp;</span
              >
            </section>
            <section class="c-attr-mt of">
              <span class="ml10 vam">
                <em id="tochange" class="icon18 scIcon"></em>
                <!-- <em class="icon18 sc_en"></em> -->
                <a
                  class="c-fff vam"
                  title="收藏"
                  href="#"
                  @click="starOrUnstar()"
                  >Add to favorite</a
                >
                <template v-if="isStared === true">
                  <div>yes</div>
                </template>
                <template v-else>
                  <div>no</div>
                </template>
              </span>
            </section>
            <section
              v-if="isbuy || Number(courseWebVo.price) === 0"
              class="c-attr-mt"
            >
              <a href="#kcdg" title="立即观看" class="comm-btn c-btn-3"
                >Study Now</a
              >
            </section>
            <section v-else class="c-attr-mt">
              <a
                @click="createOrders()"
                href="#"
                title="立即购买"
                class="comm-btn c-btn-3"
                >Purchase Now</a
              >
            </section>
          </section>
        </aside>
        <aside class="thr-attr-box">
          <ol class="thr-attr-ol clearfix">
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">Purchased Count</span>
                <br />
                <h6 class="c-fff f-fM mt10">{{ courseWebVo.buyCount }}</h6>
              </aside>
            </li>
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">Lecture Volume</span>
                <!--                <span class="c-fff f-fM">课时数</span>-->
                <br />
                <h6 class="c-fff f-fM mt10">{{ courseWebVo.lessonNum }}</h6>
              </aside>
            </li>
            <li>
              <p>&nbsp;</p>
              <aside>
                <!--                <span class="c-fff f-fM">浏览数</span>-->
                <span class="c-fff f-fM">View Count</span>
                <br />
                <h6 class="c-fff f-fM mt10">{{ courseWebVo.viewCount }}</h6>
              </aside>
            </li>
          </ol>
        </aside>
        <div class="clear"></div>
      </div>
      <!-- /课程封面介绍 -->
      <div class="mt20 c-infor-box">
        <article class="fl col-7">
          <section class="mr30">
            <div class="i-box">
              <div>
                <section id="c-i-tabTitle" class="c-infor-tabTitle c-tab-title">
                  <a name="c-i" class="current" title="课程详情"
                    >Lecture Details</a
                  >
                </section>
              </div>
              <article class="ml10 mr10 pt20">
                <!-- 课程介绍 -->
                <div>
                  <h6 class="c-i-content c-infor-title">
                    <span>Lecture Introduction</span>
                  </h6>
                  <div class="course-txt-body-wrap">
                    <section class="course-txt-body">
                      <p v-html="courseWebVo.description"></p>
                    </section>
                  </div>
                </div>
                <!-- /课程介绍 -->
                <!-- 资料下载 -->
                <div class="mt50">
                  <h6 class="c-i-content c-infor-title">
                    <span>Downloads Materials</span>
                  </h6>
                  <div class="course-txt-body-wrap">
                    <br />
                    <br />
                    <el-button
                      v-if="isNotNull(courseWebVo.zipData)"
                      type="primary"
                      @click="downloadFile(courseWebVo.zipData)"
                      ><i class="el-icon-download"></i>Download</el-button
                    >
                    <el-button
                      v-if="!isNotNull(courseWebVo.zipData)"
                      type="warning"
                      ><i class="el-icon-info"></i>No Materials
                      Currently</el-button
                    >
                  </div>
                </div>
                <!-- /资料下载 -->
                <!-- 课程大纲 -->
                <div class="mt50">
                  <h6 class="c-g-content c-infor-title">
                    <a name="kcdg">
                      <span>Lecture Outline</span>
                    </a>
                  </h6>
                  <section class="mt20">
                    <div class="lh-menu-wrap">
                      <menu id="lh-menu" class="lh-menu mt10 mr10">
                        <ul>
                          <!-- 文件目录 -->
                          <li
                            class="lh-menu-stair"
                            v-for="chapter in chapterVideoList"
                            :key="chapter.id"
                          >
                            <a
                              href="javascript: void(0)"
                              :title="chapter.title"
                              class="current-1"
                            >
                              <em class="lh-menu-i-1 icon18 mr10"></em
                              >{{ chapter.title }}
                            </a>
                            <ol class="lh-menu-ol" style="display: block;">
                              <li
                                class="lh-menu-second ml30"
                                v-for="video in chapter.children"
                                :key="video.id"
                              >
                                <br />
                                <el-row type="flex" justify="space-between">
                                  <span>
                                    <el-button size="medium" plain>{{
                                      video.title
                                    }}</el-button>
                                  </span>
                                  <span>
                                    <el-button
                                      size="medium"
                                      v-if="isNotNull(video.videoSourceUrl)"
                                      type="primary"
                                      @click="
                                        openPlayerPage(
                                          video.videoSourceId,
                                          video.videoSourceUrl
                                        )
                                      "
                                      ><i class="el-icon-video-play"></i
                                      >Video</el-button
                                    >
                                    <el-button
                                      size="medium"
                                      v-if="!isNotNull(video.videoSourceUrl)"
                                      type="warning"
                                      ><i class="el-icon-info"></i>Haven't
                                      upload video yet</el-button
                                    >
                                  </span>
                                </el-row>
                              </li>
                            </ol>
                          </li>
                        </ul>
                      </menu>
                    </div>
                  </section>
                </div>
                <!-- /课程大纲 -->
              </article>
            </div>
          </section>
        </article>
        <aside class="fl col-3">
          <div class="i-box">
            <div>
              <section class="c-infor-tabTitle c-tab-title">
                <a title href="javascript:void(0)">Lecturer</a>
              </section>
              <section class="stud-act-list">
                <ul style="height: auto;">
                  <li>
                    <div class="u-face">
                      <a
                        :href="'../teacher/' + courseWebVo.teacherId"
                        target="_blank"
                      >
                        <img
                          :src="courseWebVo.avatar"
                          width="50"
                          height="50"
                          alt
                        />
                      </a>
                    </div>
                    <section class="hLh30 txtOf">
                      <a
                        :href="'../teacher/' + courseWebVo.teacherId"
                        target="_blank"
                        class="c-333 fsize16 fl"
                        >{{ courseWebVo.teacherName }}</a
                      >
                    </section>
                    <section class="hLh20 txtOf">
                      <span class="c-999">{{ courseWebVo.intro }}</span>
                    </section>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </aside>
        <div class="clear"></div>
      </div>
    </section>
    <!-- /课程详情 结束 -->
  </div>
</template>

<script>
import cookie from "js-cookie";
import courseApi from "@/api/course";
import ordersApi from "@/api/order";
import loginApi from "@/api/login";

export default {
  asyncData({ params, error }) {
    return { courseId: params.id };
  },
  data() {
    return {
      courseWebVo: {},
      chapterVideoList: [],
      isbuy: false,
      memberID: "",
      isStared: false,
      courseID: ""
    };
  },
  created() {
    this.initCourseInfo();
  },
  methods: {
    //判断是否登录
    isLogin() {
      if (this.isNotNull(cookie.get("guli_token"))) {
        return true;
      } else {
        window.location.href = "/login";
      }
    },
    //查询课程的详情信息
    initCourseInfo() {
      courseApi.getCourseInfo(this.courseId).then(response => {
        this.courseWebVo = response.data.data.courseWebVo;
        this.chapterVideoList = response.data.data.chapterVideoList;
        this.isbuy = response.data.data.isBuy;
        loginApi.getLoginUserInfo().then(response => {
          let memberID = response.data.data.userInfo.id;

          this.memberID = memberID;
          this.courseID = this.courseWebVo.id;
          courseApi
            .checkwhetherStared(this.memberID, this.courseId)
            .then(response => {
              this.isStared = response.data.data.result;
              console.log("现在的收藏状态：");
              console.log(this.isStared);
            });
        });
      });
      //先拿到memberid和courseid
    },
    //生成订单
    createOrders() {
      ordersApi.createOrder(this.courseId).then(response => {
        //跳转订单页面
        this.$router.push({ path: "/orders/" + response.data.data.orderId });
      });
    },
    downloadFile(zipData) {
      window.location.href = zipData;
    },
    //打开vuePlayer-vid播放页面
    openVuePlayer(vid, vUrl) {
      // 跳转路由传递对象参数
      var courseWebVo = JSON.stringify(this.courseWebVo);
      var chapterVideoList = JSON.stringify(this.chapterVideoList);
      this.$router.push({
        //path:'../vuePlayer/'+vid,
        name: "vuePlayer-vid",
        params: {
          vid: vid,
          vUrl: encodeURIComponent(vUrl),
          courseWebVo: encodeURIComponent(courseWebVo),
          chapterVideoList: encodeURIComponent(chapterVideoList)
        }
      });
    },
    //打开aliplayer-vplayer播放页面
    openAliPlayer(vid, vUrl) {
      // 跳转路由传递对象参数
      var courseWebVo = JSON.stringify(this.courseWebVo);
      var chapterVideoList = JSON.stringify(this.chapterVideoList);
      this.$router.push({
        //path:'../vuePlayer/'+vid,
        name: "aliplayer-vplayer",
        query: {
          vid: vid,
          vUrl: encodeURIComponent(vUrl),
          courseWebVo: encodeURIComponent(courseWebVo),
          chapterVideoList: encodeURIComponent(chapterVideoList)
        }
      });
    },
    // 打开播放页面主方法
    openPlayerPage(vid, vUrl) {
      //打开vuePlayer-vid播放页面
      this.openVuePlayer(vid, vUrl);
      //打开aliplayer-vplayer播放页面
      //this.openAliPlayer(vid,vUrl)
    },
    /**
     * 判断是否null
     *
     */
    isNotNull(data) {
      return data == "" || data == undefined || data == null ? false : true;
    },
    starOrUnstar() {
      console.log(this.memberID);
      console.log(this.courseWebVo.id);
      console.log(this.courseID);
      //此时没有收藏，点击后收藏课程，图标变亮
      if (this.isStared === false) {
        courseApi.starOneCourse(this.memberID, this.courseId).then(response => {
          console.log(response);
          if ((response.data.success = true)) {
            this.isStared = true;
            this.changeIcon("upup");
          }
        });
      } else {
        //此时已收藏课程，点击后取消收藏课程，图标变暗
        courseApi
          .unstarOneCourse(this.memberID, this.courseID)
          .then(response => {
            console.log(response);
            console.log(response.data.success);
            if ((response.data.success = true)) {
              this.isStared = false;
              this.changeIcon("down");
            }
          });
      }
      console.log("现在的收藏状态");
      console.log(this.isStared);
      courseApi
        .checkwhetherStared(this.memberID, this.courseId)
        .then(response => {
          this.isStared = response.data.data.result;
          console.log("现在的收藏状态111：");
          console.log(this.isStared);
        });
    },
    changeIcon(to_class){
      var tochangeNode = document.getElementById('tochange');
      console.log(tochangeNode)
      if(to_class === "down"){
        tochangeNode.setAttribute("class","icon18 scIcon")
      }else{
        tochangeNode.setAttribute("class","icon18 sc_en")
      }
      
    }
  }
};
</script>
