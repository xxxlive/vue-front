<template>
  <div id="app"> 
    <template v-if="!isShowMultiple && show">
      <vue-aliplayer-v2
        :source="source"
        ref="VueAliplayerV2"
        :options="options"
      />
    </template>
  <template>
  <div id="aCoursesList" class="bg-fa of">

    <!-- /课程评论 开始 -->
    <section class="container">
      <!-- /课程评论 -->
      <div class="mt20 c-infor-box">
        <article class="fl col-7">
          <section class="mr30">
            <div class="i-box">
              <div>
                <section id="c-i-tabTitle" class="c-infor-tabTitle c-tab-title">
                  <a name="c-i" class="current" title="课程评论">课程评论</a>
                  
                </section>
              </div>
            <article class="ml10 mr10 pt20">
             <!-- 课程评论 --> 
      <div>
        <div v-clickoutside="hideReplyBtn" @click="inputFocus" class="my-reply">
            <el-avatar class="header-img" :size="40" :src="myHeader"></el-avatar>
            <div class="reply-info" >
                <div 
                tabindex="0" 
                contenteditable="true" 
                id="replyInput" 
                spellcheck="false" 
                placeholder="输入评论..." 
                class="reply-input" 
                @focus="showReplyBtn"  
                @input="onDivInput($event)"
                >
                </div>
            </div>
            <div class="reply-btn-box" v-show="btnShow">
                <el-button class="reply-btn" size="medium" @click="sendComment" type="primary">发表评论</el-button>
            </div>
        </div>
        <!-- /无数据提示 开始-->
          <section class="no-data-wrap" v-if="comments.length == 0">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">没有相关评论数据，赶紧来占楼吧...</span>
          </section>

          <!-- /无数据提示 结束-->
        <div v-for="(item,i) in comments" :key="i" class="author-title reply-father">
            <el-avatar class="header-img" :size="40" :src="item.avatar"></el-avatar>
            <div class="author-info">
                <span class="author-name">{{item.nickname}}</span>
                <span class="author-time">{{item.gmtCreate}}</span>
            </div>
            <div class="icon-btn">
                <span @click="showReplyInput(i,item.nickname,item.id)"><i class="iconfont el-icon-s-comment"></i>{{item.commentNum}}</span>
            </div>
            <div class="talk-box">
                <p>
                    <span class="reply">{{item.content}}</span>
                </p>
            </div>
            <div class="reply-box">
                <div :v-if="item.children&&item.children.length>0" v-for="(reply,j) in item.children" :key="j" class="author-title">
                    <el-avatar class="header-img" :size="40" :src="reply.avatar"></el-avatar>
                    <div class="author-info">
                        <span class="author-name">{{reply.nickname}}</span>
                        <span class="author-time">{{reply.gmtCreate}}</span>
                    </div>
                    <div class="icon-btn">
                        <span @click="showReplyInput(i,reply.nickname,reply.id)"><i class="iconfont el-icon-s-comment"></i>{{reply.commentNum}}</span>
                        
                    </div>
                    <div class="talk-box">
                        <p>
                            <span>回复 {{item.nickname}}:</span>
                            <span class="reply">{{reply.content}}</span>
                        </p>
                    </div>
                    <div class="reply-box">
                      <div :v-if="reply.children&&reply.children.length>0" v-for="(reply,k) in reply.children" :key="k" class="author-title">
                        <el-avatar class="header-img" :size="40" :src="reply.avatar"></el-avatar>
                        <div class="author-info">
                            <span class="author-name">{{reply.nickname}}</span>
                            <span class="author-time">{{reply.gmtCreate}}</span>
                        </div>
                        <div class="talk-box">
                            <p>
                                <span>回复 {{item.nickname}}:</span>
                                <span class="reply">{{reply.content}}</span>
                            </p>
                        </div>
                        <div class="reply-box">
                          

                        </div>
                    </div>
                      

                    </div>
                </div>
            </div>
            <div  v-show="_inputShow(i)" class="my-reply my-comment-reply">
                <el-avatar class="header-img" :size="40" :src="myHeader"></el-avatar>
                <div class="reply-info" >
                    <div tabindex="0" contenteditable="true" spellcheck="false" placeholder="输入评论..."   @input="onDivInput($event)"  class="reply-input reply-comment-input"></div>
                </div>
                <div class=" reply-btn-box">
                    <el-button class="reply-btn" size="medium" @click="sendCommentReply(i,j)" type="primary">发表评论</el-button>
                </div>
            </div>
        </div>
    </div>
            <!-- /课程评论 -->
             
               
            </article>
            </div>
          </section>
        </article>
       
        <aside class="fl col-3">
          <div class="i-box">
            <div>
              <section class="c-infor-tabTitle c-tab-title">
                <a title href="javascript:void(0)">主讲教师</a>
              </section>
              <section class="stud-act-list">
                <ul style="height: auto;">
                  <li>
                    <div class="u-face">
                      <a :href="'../teacher/'+courseWebVo.teacherId" target="_blank">
                        <img :src="courseWebVo.avatar" width="50" height="50" alt>
                      </a>
                    </div>
                    <section class="hLh30 txtOf"> 
                      <a :href="'../teacher/'+courseWebVo.teacherId" target="_blank" class="c-333 fsize16 fl">{{courseWebVo.teacherName}}</a>
                      
                    </section>
                    <section class="hLh20 txtOf">
                      <span class="c-999">{{courseWebVo.intro}}</span>
                    </section>
                  </li>
                </ul>
                
              </section>
              <section class="c-infor-tabTitle c-tab-title">
                <el-button size="medium" type="primary" @click="showPrivateMessInput()">
                          私信
                </el-button>
              </section>
            </div>
            </div>
            <div  v-show="privateMess_inputShow" class="my-reply">
                
                <div>
                    <el-input v-model="privateMess" rows="5" type="textarea" maxlength="500" placeholder="输入想对老师说的话(在500字以内)..."></el-input>
                </div>
                <div class=" reply-btn-box">
                    <el-button class="reply-btn" size="medium" @click="sendCommentPrivateMess()" type="primary">发送</el-button>
                </div>
            </div>
        
            <div>
               <!-- 课程大纲 -->
                <div class="mt50">
                  <h6 class="c-g-content c-infor-title">
                    <a name="kcdg">
                    <span>课程大纲</span>
                    </a>
                  </h6>
                  <section class="mt20">
                    <div class="lh-menu-wrap">
                      <menu id="lh-menu" class="lh-menu mt10 mr10">
                        <ul>
                          <!-- 文件目录 -->
                          <li class="lh-menu-stair" v-for="chapter in chapterVideoList" :key="chapter.id">
                            <a href="javascript: void(0)" :title="chapter.title" class="current-1">
                              <em class="lh-menu-i-1 icon18 mr10"></em>{{chapter.title}}
                            </a>
                            <ol class="lh-menu-ol" style="display: block;">
                              <li class="lh-menu-second ml30" v-for="video in chapter.children" :key="video.id">
                                <br/>
                                  <el-row type="flex" justify="space-between">
                                    <span>
                                    <el-button size="medium" plain :title="video.title">{{video.title}}</el-button>
                                    </span>
                                    <span>
                                      <el-button size="min" v-if="isNotNull(video.videoSourceUrl)" type="primary" @click="onPlayer(video.videoSourceId,video.videoSourceUrl)"><i class="el-icon-video-play"></i>播放</el-button>
                                      <el-button size="min" v-if="!isNotNull(video.videoSourceUrl)" type="warning"><i class="el-icon-info"></i>未上传视频</el-button>
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
                <!-- 资料下载 -->
                <div class="mt50">
                  <h6 class="c-i-content c-infor-title">
                  <span>课程资料下载</span>
                  </h6>
                  <div class="course-txt-body-wrap">    
                    <br/>
                    <br/>
                    <el-button v-if="isNotNull(courseWebVo.zipData)" type="primary" @click="downloadFile(courseWebVo.zipData)"><i class="el-icon-download"></i>下载课程资料</el-button>
                    <el-button v-if="!isNotNull(courseWebVo.zipData)" type="warning"><i class="el-icon-info"></i>未上传资料</el-button> 
                  </div>
                </div>
                <!-- /资料下载 -->
            </div>
          </aside>
          
        <div class="clear"></div>
      </div>
    </section>
    <!-- /课程详情 结束 -->
  </div>
</template>
  </div>
</template>
<script>
import vod from '@/api/vod'
import cookie from 'js-cookie'
import commentApi from '@/api/comment'
/////////////////////////////课程评论相关
const clickoutside = {
    // 初始化指令
    bind(el, binding, vnode) {
    function documentHandler(e) {
    // 这里判断点击的元素是否是本身，是本身，则返回
        if (el.contains(e.target)) {
            return false;
        }
    // 判断指令中是否绑定了函数
        if (binding.expression) {
            // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
            binding.value(e);
        }
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.vueClickOutside = documentHandler;
    document.addEventListener('click', documentHandler);
    },
    update() {},
    unbind(el, binding) {
    // 解除事件监听
    document.removeEventListener('click', el.vueClickOutside);
    delete el.vueClickOutside;
  },
};
  export default {
          asyncData({params,error}) {
            return {id: params.id}
    },
    name:'ArticleComment',
    data() {
      return {
        vid:'',
        vUrl:'',
        courseWebVo:{},
        chapterVideoList:{},
        options: {
            id: 'J_prismPlayer',
            vid: '', // 视频id
            playauth: '', // 播放凭证
            encryptType: '1', // 如果播放加密视频，则需设置encryptType=1，非加密视频无需设置此项
            width: '100%',
            height: '500px',
            cover: '', // 封面
            qualitySort: 'asc', // 清晰度排序
            mediaType: 'video', // 返回音频还是视频
            autoplay: true, // 自动播放
            isLive: false, // 直播
            rePlay: false, // 循环播
            preload: true,
            controlBarVisibility: 'hover', // 控制条的显示方式：鼠标悬停
            useH5Prism: true, // 播放器类型：html5 
            components: []
        },
        source:'',
        videoListArgs:[],
        vids:'',
        show: true,
        isShowMultiple: false,
        //////////////////////////////课程评论相关变量
        comment:{
         courseId:'',
         teacherId:'',
         memberId:'',
         nickname:'',
         avatar:'',
         content:'',  
         pid:''   
        },
            btnShow: false,
            index:'0',
            replyComment:'',
            myName:'',
            myHeader:'',
            myId:'',
            to:'',
            toId:-1,
            comments:[],
            privateMess:'',
            privateMess_inputShow:false

      };
    },
  created() {
    
    this.getRouteParamsData()
   this.initData(this.chapterVideoList)
   this.showInfo()
   this.init()
   this.initComment()
  },
  directives: {clickoutside},
    methods: {
      getRouteParamsData(){

        // 获取传过来的对象参数
        this.vid=this.$route.params.vid,
        this.vUrl=decodeURIComponent(this.$route.params.vUrl),  
        this.courseWebVo=JSON.parse(decodeURIComponent(this.$route.params.courseWebVo));
        this.chapterVideoList=JSON.parse(decodeURIComponent(this.$route.params.chapterVideoList));
      },
      //视频播放列表数据解析
      initData(dataList){
          const list=[];
          const finalList=[];
          const vlist=dataList;
          for(var i = 0,len=vlist.length; i < len; i++) { 
            var childrens=vlist[i].children;
            for(var j = 0,len=childrens.length; j < len; j++){
              var splb={
                name:'',
                source:''
              };
              splb.name=childrens[j].title;
              splb.source=childrens[j].videoSourceUrl;
              list.push(splb);
            }
          }
          finalList.push(list);
          this.videoListArgs=finalList;
      },
      init(){
        this.source=this.vUrl;
        this.vids=this.vid;
        this.options.vid=this.vid;
        this.options.playauth=this.playAuth;
        const component={
          name : 'PlaylistComponent',
          type: AliPlayerComponent.PlaylistComponent,
          args:this.videoListArgs
          };
          this.options.components.push(component);
          
          
     },
     //初始化评论
     initComment(){
          this.myName=this.loginInfo.nickname;
          this.myHeader=this.loginInfo.avatar;
          this.myId=this.loginInfo.id; 
          commentApi.getCommentInfo(this.courseWebVo.id)
                .then(response => {
                this.comments = response.data.data.items
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
    //播放视频
    onPlayer(vid,vUrl){
      this.source=vUrl;
    },
    //资料下载
    downloadFile(zipData){
      window.location.href=zipData
    },
      play() {
        this.$refs.VueAliplayerV2.play();
        console.log(this.options.components.args);
      },
      pause() {
        this.$refs.VueAliplayerV2.pause();
      },
      replay() {
        this.$refs.VueAliplayerV2.replay();
      },
      getCurrentTime() {
        this.source = "http://ivi.bupt.edu.cn/hls/cctv1.m3u8";
      },
      getStatus() {
        const status = this.$refs.VueAliplayerV2.getStatus();
        console.log(`getStatus:`, status);
        alert(`getStatus:${status}`);
      },
      showMultiple() {
        this.isShowMultiple = !this.isShowMultiple;
      },
    /** 
    * 判断是否null 
    * 
    */ 
    isNotNull(data){ 
    return (data == "" || data == undefined || data == null) ? false: true; 
    },
    ////////////////////////////////////////////评论相关方法
        inputFocus(){
          var replyInput = document.getElementById('replyInput');
          replyInput.style.padding= "8px 8px"
          replyInput.style.border ="2px solid blue"
          replyInput.focus()
        },  
        showReplyBtn(){
            this.btnShow = true
        },
        hideReplyBtn(){
            this.btnShow = false
            replyInput.style.padding= "10px"
            replyInput.style.border ="none"
        },
        showReplyInput(i,name,id){
            this.comments[this.index].inputShow = false
            this.index =i
            this.comments[i].inputShow = true
            this.to = name
            this.toId = id
        },
        _inputShow(i){
            return this.comments[i].inputShow 
        },
        showPrivateMessInput(){
          this.privateMess_inputShow=!this.privateMess_inputShow
        },
        sendComment(){
            if(!this.replyComment){
                 this.$message({
                    showClose: true,
                    type:'warning',
                    message:'评论不能为空'
                })
            }else{ 
                let input =  document.getElementById('replyInput')           
                this.comment.courseId=this.courseWebVo.id
                this.comment.teacherId=this.courseWebVo.teacherId
                this.comment.memberId=this.myId
                this.comment.pid='0'
                this.comment.nickname= this.myName
                this.comment.avatar=this.myHeader
                this.comment.content=this.replyComment
                //发起后端请求
                this.saveComment(this.comment)
                //this.comments.push(this.comment)
                this.replyComment = ''
                input.innerHTML = ''
                this.comment={}
            }
        },
        // 发送私信
        saveCommentPrivateMess(comment) {
          commentApi.addComment(comment)
            .then(response => { // 发送成功
              // 提示信息
              this.$message({
                type: 'success',
                message: '发送私信成功!'
                
              }) 
              this.replyComment = ''
              this.comment={}
              this.privateMess=''
              this.privateMess_inputShow=false   
            })
        },
        // 发表评论
        saveComment(comment) {
          commentApi.addComment(comment)
            .then(response => { // 发表评论成功
              // 提示信息
              this.$message({
                type: 'success',
                message: '发表评论成功!'
                
              })
              //刷新评论列表
              this.initComment()
            })
        },
        sendCommentReply(i,j){
            if(!this.replyComment){
                 this.$message({
                    showClose: true,
                    type:'warning',
                    message:'评论不能为空'
                })
            }else{
                this.comment.courseId=this.courseWebVo.id
                this.comment.teacherId=this.courseWebVo.teacherId
                this.comment.memberId=this.myId
                this.comment.nickname= this.myName
                this.comment.avatar=this.myHeader
                this.comment.content=this.replyComment
                this.comment.pid=this.toId
                //发起后端请求
                this.saveComment(this.comment)
                
                //this.comments[i].reply.push(a)
                this.replyComment = ''
                this.comment={}
                document.getElementsByClassName("reply-comment-input")[i].innerHTML = ""
            }
        },
          sendCommentPrivateMess(){
            if(!this.privateMess){
                 this.$message({
                    showClose: true,
                    type:'warning',
                    message:'私信内容不能为空'
                })
            }else{
                this.comment.courseId=this.courseWebVo.id
                this.comment.teacherId=this.courseWebVo.teacherId
                this.comment.memberId=this.myId
                this.comment.nickname= this.myName
                this.comment.avatar=this.myHeader
                this.comment.content=this.privateMess
                this.comment.pid='0'
                this.comment.isPrivate=1
                //发起后端请求
                this.saveCommentPrivateMess(this.comment)
                
            }
        },
        onDivInput: function(e) {
            this.replyComment = e.target.innerHTML;
        },
        dateStr(date){
            //获取js 时间戳
            var time=new Date().getTime();
            //去掉 js 时间戳后三位，与php 时间戳保持一致
            time=parseInt((time-date)/1000);
            //存储转换值 
            var s;
            if(time<60*10){//十分钟内
                return '刚刚';
            }else if((time<60*60)&&(time>=60*10)){
                //超过十分钟少于1小时
                s = Math.floor(time/60);
                return  s+"分钟前";
            }else if((time<60*60*24)&&(time>=60*60)){ 
                //超过1小时少于24小时
                s = Math.floor(time/60/60);
                return  s+"小时前";
            }else if((time<60*60*24*30)&&(time>=60*60*24)){ 
                //超过1天少于30天内
                s = Math.floor(time/60/60/24);
                return s+"天前";
            }else{ 
                //超过30天ddd
                var date= new Date(parseInt(date));
                return date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();
            }
        }
    },
  };
</script>
<style lang="less">
  * {
    margin: 0;
    padding: 0;
  }
  .remove-text {
    text-align: center;
    padding: 20px;
    font-size: 24px;
  }
  .show-multiple {
    display: flex;
    .multiple-player {
      width: calc(100% / 4);
      margin: 20px;
    }
  }
  .player-btns {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    span {
      margin: 0 auto;
      display: inline-block;
      padding: 5px 10px;
      width: 150px;
      height: 40px;
      line-height: 40px;
      border: 1px solid #eee;
      background: #e1e1e1;
      border-radius: 10px;
      text-align: center;
      margin: 5px;
      cursor: pointer;
    }
  }
  .source-box {
    padding: 5px 10px;
    margin-bottom: 20px;
    .source-label {
      margin-right: 20px;
      font-size: 16px;
      display: block;
    }
    #source {
      margin-top: 10px;
    }
    .source-input {
      margin-top: 10px;
      padding: 5px 10px;
      width: 80%;
      border: 1px solid #ccc;
    }
  }
</style>
<style lang="stylus" scoped>
.my-reply
    padding 10px
    background-color #fafbfc
    .header-img
        display inline-block
        vertical-align top
    .reply-info    
        display inline-block
        margin-left 5px
        width 90%
        @media screen and (max-width:1200px) {
            width 80%
        }
        .reply-input
            min-height 20px
            line-height 22px
            padding 10px 10px
            color #ccc
            background-color #fff
            border-radius 5px
            &:empty:before
                content attr(placeholder)
            &:focus:before
                content none
            &:focus
                padding 8px 8px
                border 2px solid blue
                box-shadow none
                outline none
    .reply-btn-box
        height 25px
        margin 10px 0
        .reply-btn
            position relative
            float right
            margin-right 15px
.my-comment-reply
    margin-left 50px
    .reply-input
        width flex
.author-title:not(:last-child)
    border-bottom: 1px solid rgba(178,186,194,.3)
.author-title
    padding 10px
    .header-img
        display inline-block
        vertical-align top
    .author-info
        display inline-block
        margin-left 5px
        width 60%
        height 40px
        line-height 20px
        >span 
            display block
            cursor pointer
            overflow hidden
            white-space nowrap
            text-overflow ellipsis
        .author-name
            color #000
            font-size 18px
            font-weight bold
        .author-time
            font-size 14px
    .icon-btn
        width 30%
        padding 0 !important 
        float right
        @media screen and (max-width : 1200px){
            width 20%
            padding 7px
        }
        >span 
            cursor pointer
        .iconfont 
            margin 0 5px
    .talk-box
        margin 0 50px
        >p
           margin 0
        .reply
            font-size 16px
            color #000
    .reply-box
        margin 10px 0 0 50px
        background-color #efefef
</style>