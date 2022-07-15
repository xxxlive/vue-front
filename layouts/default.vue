<template>
  <div class="in-wrap">
    <!-- 公共头引入 style="background:#f8f2f2"-->
    <header id="header">
      <section class="container">
        <h1 id="logo">
         <a href="/" title="在线教育学院">
            <img src="~/assets/img/logo.png" width="100%" alt="在线教育学院">
          </a>
        </h1>
        <div class="h-r-nsl">
          <ul class="nav">
            <router-link to="/" tag="li" active-class="current" exact>
              <a>Homepage</a>
            </router-link>
            <router-link to="/course" tag="li" active-class="current">
              <a>Course</a>
            </router-link>
            <router-link to="/teacher" tag="li" active-class="current">
              <a>Teacher</a>
            </router-link>
            <router-link to="/article" tag="li" active-class="current">
              <a>Downloads</a>
            </router-link>
            <router-link to="/usercenter" tag="li" active-class="current">
              <a>User Center</a>
            </router-link>
          </ul>

          <!-- / nav -->
          <ul class="h-r-login">
              <li v-if="!loginInfo.id" id="no-login">
                  <a href="/login" title="登录">
                      <em class="icon18 login-icon">&nbsp;</em>
                      <span class="vam ml5">login</span>
                  </a>
                  |
                  <a href="/register" title="注册">
                      <span class="vam ml5">Register</span>
                  </a>
              </li>

              <li v-if="loginInfo.id" id="is-login-one" class="mr10">
                  <a id="headerMsgCountId" title="消息" v-on:click="isLogin()">
                      <em class="icon18 news-icon">&nbsp;</em>
                  </a>
                  <q class="red-point" style="display: none">&nbsp;</q>
              </li>
              <li v-if="loginInfo.id" id="is-login-two" class="h-r-user">
                  <a href="#" title>
                      <img
                          :src="loginInfo.avatar"
                          width="30"
                          height="30"
                          class="vam picImg"
                          alt
                          >
                      <span id="userName" class="vam disIb">{{ loginInfo.nickname }}</span>
                  </a>
                <a href="javascript:void(0);" title="退出" @click="logout()" class="ml5">login out</a>
              </li>
              <!-- /未登录显示第1 li；登录后显示第2，3 li -->
          </ul>
          <!--
          <aside class="h-r-search">
            <form action="#" method="post">
              <label class="h-r-s-box">
                <input type="text" placeholder="输入你想学的课程" name="queryCourse.courseName" value>
                <button type="submit" class="s-btn">
                  <em class="icon18">&nbsp;</em>
                </button>
              </label>
            </form>
          </aside>
          -->
        </div>
        <aside class="mw-nav-btn">
          <div class="mw-nav-icon"></div>
        </aside>
        <div class="clear"></div>
      </section>
    </header>
    <!-- /公共头引入 -->
    <nuxt/>
    <!-- 公共底引入 -->
    <footer id="footer">
      <section class="container">
        <div class>
          <h4 class="hLh30">
            <span class="fsize18 f-fM c-999">related link</span>
          </h4>
          <ul class="of flink-list">
            <li>
              <a href="https://github.com/xxxlive/vue-front" title="售后服务" target="_blank">After Sell Service</a>
            </li>
          </ul>
          <div class="clear"></div>
        </div>
        <div class="b-foot">
          <section class="fl col-7">
            <section class="mr20">
              <section class="b-f-link">
                <a href="https://github.com/xxxlive/vue-front" title="关于我们" target="_blank">About Us</a>|
                <a href="https://github.com/xxxlive/vue-front" title="联系我们" target="_blank">Contact Us</a>|
                <a href="https://github.com/xxxlive/vue-front" title="帮助中心" target="_blank">Help Center</a>|
                <a href="/article" title="资源下载" target="_blank">Article</a>|
                <span>Email：1374980762@qq.com</span>|
                <a href="http://47.95.195.219:9528" title="后台首页" target="_blank">Admin</a>
              </section>
              <section class="b-f-link mt10">
                <span>©2022 copyright reserved</span>
              </section>
            </section>
          </section>
          <aside class="fl col-3 tac mt15">
            <section class="gf-tx">
              <span>
                <a href="http://www.neu.edu.cn/">
                  <img src="~/assets/img/wx.png" width="50">
                </a>
              </span>
            </section>
            <section class="gf-tx">
              <span>
                <a href="https://github.com/xxxlive/vue-front">
                  <img src="~/assets/img/github.png"  width="50">
                </a>
              </span>
            </section>
          </aside>
          <div class="clear"></div>
        </div>
      </section>
    </footer>
    <!-- /公共底引入 -->
  </div>
</template>
<script>
import '~/assets/css/reset.css'
import '~/assets/css/theme.css'
import '~/assets/css/global.css'
import '~/assets/css/web.css'
import '~/assets/css/base.css'
import '~/assets/css/activity_tab.css'
import '~/assets/css/bottom_rec.css'
import '~/assets/css/nice_select.css'
import '~/assets/css/order.css'
import '~/assets/css/swiper-3.3.1.min.css'
import "~/assets/css/pages-weixinpay.css"

import cookie from 'js-cookie'
import loginApi from '@/api/login'
export default {
  data() {
    return {
      token: '',
      loginInfo: {
        id: '',
        age: '',
        avatar: '',
        mobile: '',
        nickname: '',
        sex: '',
        memberId: ''
      }
    }
  },
  created() {
    //获取路径里面tocken值
    //?token=xxx 需要这么取
    this.token =  this.$route.query.token
    if(this.token) { //判断路径中是否有tocken值
      this.wxLogin()
    }
    this.showInfo()
  },
  methods: {
    //微信扫码登陆方法
    wxLogin() {
      cookie.set('guli_token',this.token,{domain: 'localhost'})
      cookie.set('guli_ucenter','',{domain: 'localhost'})
      //调用接口根据tocken值获取用户信息
      loginApi.getLoginUserInfo()
              .then(response => {
                this.loginInfo = response.data.data.userInfo
                cookie.set('guli_ucenter',this.loginInfo,{domain: 'localhost'})
              })
    },
    //创建方法，从cookie获取用户信息
    showInfo() {
      //从cookie获取用户信息
      var userStr = cookie.get('guli_ucenter')
      // 把字符串转换json对象(js对象)
      if(userStr) {
        this.loginInfo = JSON.parse(userStr)
      }
    },
    //退出
    logout() {
      //清理cookie值
      cookie.set('guli_token','',{domain: 'localhost'})
      cookie.set('guli_ucenter','',{domain: 'localhost'})
      //回到首页面
      window.location.href = "/";
    },
      //判断是否登录
      isLogin(){
      if(this.isNotNull(cookie.get('guli_token'))&&this.isNotNull(cookie.get('guli_ucenter'))){
        console.log(cookie.get('guli_token'))
        window.location.href="/comment/list"
      }
      else{
        window.location.href="/login"
      }
    },
    //判断是否null
    isNotNull(data){
    return (data == "" || data == undefined || data == null) ? false: true;
    }
  }
}
</script>
<!-- <style scoped>
.current_de{
  display: block;
  color:black;
}
.current_de :hover{
  background-color: rgb(60, 0, 255);
}
.current_de :active{
  color: black;
}
.active {
  background-color: rgb(0, 42, 255);
}

</style> -->
