<template>
  <div class="app-container">
    私信列表
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <!-- 课程讲师 -->
      <el-form-item label="教师">
        <el-select
          v-model="commentQuery.teacherId"
          placeholder="请选择">

          <el-option
            v-for="teacher in teacherList"
            :key="teacher.id"
            :label="teacher.name"
            :value="teacher.id"/>
        </el-select>
      </el-form-item>
      <!-- 课程 -->
      <el-form-item label="课程">
        <el-select
          v-model="commentQuery.courseId"
          placeholder="请选择">

          <el-option
            v-for="course in courseList"
            :key="course.id"
            :label="course.title"
            :value="course.id"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="commentQuery.status" clearable placeholder="回复状态">
          <el-option value="1" label="已回复"/>
          <el-option value="0" label="未回复"/>
        </el-select>
      </el-form-item>
      <el-form-item label="发送时间">
        <el-date-picker
          v-model="commentQuery.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="commentQuery.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row>

      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="用户头像" width="90">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" width="80" height="80">
        </template>
      </el-table-column>

      <el-table-column prop="nickname" label="用户昵称" width="80" />

      <el-table-column label="课程" width="200">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.courseId"
            placeholder="请选择"
            disabled>
            <el-option
              v-for="course in courseList"
              :key="course.id"
              :label="course.title"
              :value="course.id"/>
          </el-select>

        </template>
      </el-table-column>
      <el-table-column label="主讲教师" width="150">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.teacherId"
            placeholder="请选择"
            disabled>
            <el-option
              v-for="teacher in teacherList"
              :key="teacher.id"
              :label="teacher.name"
              :value="teacher.id"/>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="content" label="私信内容"/>
      <el-table-column label="回复状态" width="120">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status===0" type="warning" size="medium">未回复</el-button>
          <el-button v-if="scope.row.status===1" type="success" size="medium">已回复</el-button>
        </template>
      </el-table-column>

      <el-table-column prop="gmtCreate" label="发送时间" width="160"/>

      <el-table-column label="操作" width="100" align="center">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status===1" type="success" size="mini" icon="el-icon-edit" @click="openLookDialog(scope.row.id)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 回复私信表单 -->
    <el-dialog :visible.sync="dialogChapterFormVisible" title="回复私信">
      <el-form :model="comment" label-width="120px">
        <el-form-item label="回复:">
          {{ comment.nickname }}
        </el-form-item>
        <el-form-item label="原文:">
          {{ comment.content }}
        </el-form-item>
        <el-form-item label="回复内容：">
          <div>
            <el-input v-model="commentHF.content" rows="5" type="textarea" maxlength="500" placeholder="输入回复内容(在500字以内)..."/>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogChapterFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="hfPrivateComment()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 查看私信表单 -->
    <el-dialog :visible.sync="dialogLookFormVisible" title="查看私信回复" width="100%" @close="closeLookDialog">
      <!-- 表格 -->
      <el-table
        v-loading="listLoading"
        :data="childList"
        border
        fit
        highlight-current-row>

        <el-table-column
          label="序号"
          width="70"
          align="center">
          <template slot-scope="scope">
            {{ (page - 1) * limit + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="用户头像" width="90">
          <template slot-scope="scope">
            <img :src="scope.row.avatar" width="80" height="80">
          </template>
        </el-table-column>

        <el-table-column prop="nickname" label="用户昵称" width="80" />

        <el-table-column label="课程" width="200">
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.courseId"
              placeholder="请选择"
              disabled>
              <el-option
                v-for="course in courseList"
                :key="course.id"
                :label="course.title"
                :value="course.id"/>
            </el-select>

          </template>
        </el-table-column>
        <el-table-column label="主讲教师" width="150">
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.teacherId"
              placeholder="请选择"
              disabled>
              <el-option
                v-for="teacher in teacherList"
                :key="teacher.id"
                :label="teacher.name"
                :value="teacher.id"/>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="content" label="私信内容"/>
        <el-table-column label="回复状态" width="120">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status===0" type="warning" size="medium">未回复</el-button>
            <el-button v-if="scope.row.status===1" type="success" size="medium">已回复</el-button>
          </template>
        </el-table-column>

        <el-table-column prop="gmtCreate" label="发送时间" width="160"/>

        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status===1" type="primary" size="mini" icon="el-icon-edit" @click="openDialog(scope.row.id)">回复</el-button><br>
            <el-button type="success" size="mini" icon="el-icon-edit" @click="openLookDialog(scope.row.id)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogLookFormVisible = false,commentId=''">关 闭</el-button>
      </div>
    </el-dialog>

    <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />

  </div>
</template>
<script>
import cookie from 'js-cookie'
// 引入调用comment.js文件
import comment from '@/api/comment'
export default {
  data() { // 定义变量和初始值
    return {
      loginInfo:'',
      listLoading: true, // 数据是否正在加载
      list: '', // 查询之后接口返回集合
      page: 1, // 当前页
      limit: 10, // 每页记录数
      total: 0, // 总记录数
      commentQuery: {}, // 条件封装对象
      teacherList: [], // 封装所有的讲师
      courseList: [], // 封装所有的课程
      dialogChapterFormVisible: false, // 回复弹框
      comment: {},
      commentHF: {},
      treeListLoading: true,
      dialogLookFormVisible: false,
      childList: null,
      commentId: '',
      updateComment: ''
    }
  },
  created() { // 页面渲染之前执行，一般调用methods定义的方法
    // 调用
    // 初始化所有讲师
    this.getListTeacher()
    this.getListCourse()
    this.showInfo()
    this.getList()
  },
  methods: { // 创建具体的方法，调用teacher.js定义的方法
    // 讲师列表的方法
    getList(page = 1) {
      this.page = page
      this.commentQuery.memberId = this.loginInfo.id
      comment.getCommentListPage(this.page, this.limit, this.commentQuery)
        .then(response => { // 请求成功
          // response接口返回的数据
          // console.log(response)
          this.list = response.data.data.rows
          this.total = response.data.data.total
          // 数据加载并绑定成功
          this.listLoading = false
          console.log(this.list)
          console.log(this.total)
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
    // 查询所有的课程
    getListCourse() {
      comment.getListCourse()
        .then(response => {
          this.courseList = response.data.data.list
        })
    },
    // 查询所有的讲师
    getListTeacher() {
      comment.getListTeacher()
        .then(response => {
          this.teacherList = response.data.data.items
        })
    },
    // 回复数据回显
    openDialog(commentId) {
      // 弹框
      this.dialogChapterFormVisible = true
      // 调用接口
      comment.getComment(commentId)
        .then(response => {
          this.comment = response.data.data.comment
        })
    },
    // 查看数据回显
    openLookDialog(commentId) {
      this.commentId = commentId
      // 弹框
      this.dialogLookFormVisible = true
      this.getChlidList(commentId)
    },
    getChlidList(commentId) {
      // 调用接口
      comment.getLookComment(commentId)
        .then(response => {
          this.childList = response.data.data.list
        })
    },
    hfPrivateComment() {
      // 包装回复数据
      this.commentHF.courseId = this.comment.courseId
      this.commentHF.teacherId = this.comment.teacherId
      this.commentHF.nickname = this.loginInfo.nickname
      this.commentHF.avatar = this.loginInfo.avatar
      this.commentHF.pid = this.comment.id
      this.commentHF.isPrivate = 1
      // 调用接口
      comment.hfPrivateComment(this.commentHF)
        .then(response => { // 发表评论成功
          // 提示信息
          this.$message({
            type: 'success',
            message: '回复私信成功!'
          })
          // 刷新评论列表
          this.getList()
          this.getChlidList(this.commentId)
          this.comment = {}
          this.commentHF = {}
          // 弹框
          this.dialogChapterFormVisible = false
        })
    },
    resetData() { // 清空的方法
      // 表单输入项数据清空
      this.commentQuery = {}
      // 查询所有讲师数据
      this.getList()
    },
    // 删除方法
    removeDataById(id) {
      this.$confirm('此操作将永久删除私信记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { // 点击确定，执行then方法
        // 调用删除的方法
        comment.deleteCommentId(id)
          .then(response => { // 删除成功
            // 提示信息
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            // 刷新列表页面
            this.getChlidList(this.commentId)
          })
      }) // 点击取消，执行catch方法
    },
    updateCommentStatue(commentId) {
      this.updateComment.id = commentId
      this.updateComment.status = 0
      // 调用接口
      comment.updateCommentInfo(this.updateComment)
        .then(response => { // 更新成功
          // 提示信息
          this.$message({
            type: 'success',
            message: '你已删除全部回复，当前私信状态变为未回复!'
          })
          // 刷新评论列表
          this.getList()
          this.dialogLookFormVisible = false
          this.commentId = ''
          this.updateComment = ''
        })
    },
    closeLookDialog() {
      this.dialogLookFormVisible = false
      this.commentId = ''
    }

  }
}
</script>
