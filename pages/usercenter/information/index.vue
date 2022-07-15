<template>
  <div>
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '3']">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-user"></i>{{tabledata[0].nickname}} Information</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项4-1</el-menu-item>
            </el-submenu>
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
        <el-header style="text-align: right; font-size: 12px">
          <span>{{tabledata[0].nickname}}</span>
        </el-header>

        <el-main>
          <el-table
            :data="tabledata"
            height="250"
            border
            style="width: 100%">
            <el-table-column
              prop="id"
              label="User ID"
              width="180">
            </el-table-column>
            <el-table-column
              prop="nickname"
              label="Nickname"
              width="180">
            </el-table-column>
            <el-table-column
              prop="mobile"
              label="mobile">
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import courseApi from '@/api/course'
import loginApi from "@/api/login"
import cookie from 'js-cookie'
export default {
  data() {
    return {
      tabledata: [{
        nickname:"",
      }],
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

    // //this.initSubject()
    this.isLogin()
    console.log("before create")
    this.initUserData()
    console.log("ininted!!!")

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
    //获取userinfo
    initUserData() {
      console.log("enter this function!")
      loginApi.getLoginUserInfo()
        .then(response => {
          let data_ = response.data.data.userInfo
          this.tabledata[0] = data_;
          this.tabledata = Array.from(this.tabledata)
          console.log("tabledata is ")
          console.log(this.tabledata)
         // console.log(this.testData)
        })
    },
    //查询所有的分类
    initSubject() {
      courseApi.getAllSubject()
        .then(response => {
          console.log(response);

          this.subjectNestedList = response.data.data.list
        })
    },
    //分页切换的方法
    gotoPage(page) {
      courseApi.getCourseList(page,8,this.searchObj)
        .then(response => {
          this.data = response.data.data
        })
    },
    //根据一级分类id查询二级分类 并查询一级所有的课程
    searchOne(subjectParentId,index) {
      if(subjectParentId === null) {
        this.oneIndex = index
        this.searchObj.subjectParentId = ''
        this.searchObj.subjectId = ''
        this.subSubjectList = []
        this.buyCountSort = ''
        this.gmtCreateSort = ''
        this.priceSort = ''
        this.gotoPage(1)
      }else{
        //把传递index值给oneIndex让样式显示
        this.oneIndex = index
        this.searchObj = {}
        this.subSubjectList = []
        this.twoIndex = -1

        //点击某个一级分类进行条件查询
        this.searchObj.subjectParentId = subjectParentId
        this.gotoPage(1)

        //用传过来的id和所有一级id比较,如果相同显示二级分类
        for(let i = 0 ; i < this.subjectNestedList.length; i++ ) {
          //获取每一个一级分类
          let oneSubject = this.subjectNestedList[i]
          //比较
          if(subjectParentId == oneSubject.id) {
            //根据一级分类id查询二级分类
            this.subSubjectList = oneSubject.children
          }
        }
      }
    },
    //根据二级分类查询课程
    searchTwo(subjectId,index) {
      //把传递index值给twoIndex让样式显示
      this.twoIndex = index
      //点击某个二级分类进行条件查询
      this.searchObj.subjectId = subjectId
      this.gotoPage(1)
    },
    //根据销量进行排序
    searchBuyCount() {
      //设置值,让样式显示 ''就是不显示
      this.buyCountSort = 1
      this.gmtCreateSort = ''
      this.priceSort = ''
      //赋值
      this.searchObj.buyCountSort = this.buyCountSort
      this.searchObj.gmtCreateSort = this.gmtCreateSort
      this.searchObj.priceSort = this.priceSort
      //查询
      this.gotoPage(1)
    },
    //根据最新时间排序
    searchGmtCreate() {
//设置值,让样式显示 ''就是不显示
      this.buyCountSort = ''
      this.gmtCreateSort = 1
      this.priceSort = ''
      //赋值
      this.searchObj.buyCountSort = this.buyCountSort
      this.searchObj.gmtCreateSort = this.gmtCreateSort
      this.searchObj.priceSort = this.priceSort
      //查询
      this.gotoPage(1)
    },
    //根据价格进行排序
    searchPrice() {
      //设置值,让样式显示 ''就是不显示
      this.buyCountSort = ''
      this.gmtCreateSort = ''
      this.priceSort = 1
      //赋值
      this.searchObj.buyCountSort = this.buyCountSort
      this.searchObj.gmtCreateSort = this.gmtCreateSort
      this.searchObj.priceSort = this.priceSort
      //查询
      this.gotoPage(1)
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
