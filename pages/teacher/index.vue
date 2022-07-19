<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- 教师列表 开始 -->
    <section class="container">
      <header class="comm-title all-teacher-title">
        <h2 class="fl tac">
          <span class="c-333">All Teachers</span>
        </h2>
        <section class="c-tab-title">
          <a id="subjectAll" title="全部" href="#">All</a>
          <!-- <c:forEach var="subject" items="${subjectList }">
                            <a id="${subject.subjectId}" title="${subject.subjectName }" href="javascript:void(0)" onclick="submitForm(${subject.subjectId})">${subject.subjectName }</a>
          </c:forEach>-->
        </section>
      </header>
      <section class="c-sort-box unBr">
        <div>
          <!-- /无数据提示 开始-->
          <section class="no-data-wrap" v-if="data.total == 0">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中...</span>
          </section>
          <!-- /无数据提示 结束-->
          <article v-if="data.total>0" class="i-teacher-list">
            <ul class="of">
              <li v-for="item in data.items" :key="item.id">

                <class_lable_veritical v-bind:avater="item.avatar" v-bind:name="item.name" v-bind:career="item.career" v-bind:intro="item.intro" v-bind:id="item.id"
                ></class_lable_veritical>

              </li>
            </ul>
            <div class="clear"></div>
          </article>
        </div>
        <!-- 公共分页 开始 -->
        <div>
          <div class="paging">
            <!-- undisable这个class是否存在，取决于数据属性hasPrevious -->
            <a
              :class="{undisable: !data.hasPrevious}"
              href="#"
              title="首页"
              @click.prevent="gotoPage(1)">&lt;&lt;</a>
            <a
              :class="{undisable: !data.hasPrevious}"
              href="#"
              title="前一页"
              @click.prevent="gotoPage(data.current-1)">&lt;</a>
            <a
              v-for="page in data.pages"
              :key="page"
              :class="{current: data.current == page, undisable: data.current == page}"
              :title="'第'+page+'页'"
              href="#"
              @click.prevent="gotoPage(page)">{{ page }}</a>
            <a
              :class="{undisable: !data.hasNext}"
              href="#"
              title="后一页"
              @click.prevent="gotoPage(data.current+1)">&gt;</a>
            <a
              :class="{undisable: !data.hasNext}"
              href="#"
              title="末页"
            @click.prevent="gotoPage(data.pages)">&gt;&gt;</a>
            <div class="clear"/>
          </div>
        </div>
        <!-- 公共分页 结束 -->
      </section>
    </section>
    <!-- /教师列表 结束 -->
  </div>
</template>
<script>
import teacherApi from '@/api/teacher'
import class_lable_veritical from "~/components/lable/class_lable_veritical";
export default {
  components:{
    class_lable_veritical
  },
  //异步操作 发送请求才会调用 只会调一次
  //params 相当于 this.$route.params
  asyncData({params,error}) {
    return teacherApi.getTeacherList(1,8)
                     .then(response => {
                       //this.data = response.data.data
                       return {data: response.data.data} //简写
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
        window.location.href="/course/"+to
      }
      else{
        window.location.href="/login"
      }
    },
    //分页切换
    gotoPage(page) {
      teacherApi.getTeacherList(page,8)
                .then(response => {
                   this.data = response.data.data
                })
    }
  }
};
</script>
