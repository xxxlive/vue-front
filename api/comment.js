import request from '@/utils/request'

export default {
    //发表评论
    addComment(comment) {
        return request({
            url: '/eduservice/commentfront/addComment',
            method: 'post',
            data: comment
        })
    },
    //获取课程所有评论
    getCommentInfo(id) {
        return request({
            url: '/eduservice/commentfront/findAllCommentByCourseId/'+id,
            method: 'get'
        })
    },
      //  查询所有讲师
  getListTeacher() {
    return request({
      url: '/eduservice/teacher/findAll',
      method: 'get'
    })
  },
  //  查询所有课程
  getListCourse() {
    return request({
      url: '/eduservice/course',
      method: 'get'
    })
  },
  //  查询所有私信
  getCommentListPage(page, limit, commentQuery) {
    return request({
      url: `/eduservice/comment/pageCommentCondition/${page}/${limit}`,
      method: 'post',
      data: commentQuery // data表示把对象转换json进行传递到接口里面
    })
  },
  //  查询所有私信
  getAllCommentListPage(page, limit, commentQuery) {
    return request({
      url: `/eduservice/comment/pageAllCommentCondition/${page}/${limit}`,
      method: 'post',
      data: commentQuery // data表示把对象转换json进行传递到接口里面
    })
  },
  //  根据id查询私信
  getComment(commentId) {
    return request({
      url: `/eduservice/comment/getComment/${commentId}`,
      method: 'get'
    })
  },
  //  根据id查询私信回复
  getLookComment(commentId) {
    return request({
      url: `/eduservice/comment/getLookComment/${commentId}`,
      method: 'get'
    })
  },
  // 回复私信
  hfPrivateComment(comment) {
    return request({
      url: '/eduservice/comment/hfPrivateComment',
      method: 'post',
      data: comment
    })
  },
  // 更新私信状态
  updateCommentStatue(comment) {
    return request({
      url: '/eduservice/comment/updateCommentStatue',
      method: 'post',
      data: comment
    })
  },
  // 修改私信信息
  updateCommentInfo(commentInfo) {
    return request({
      url: '/eduservice/comment/updateCommentInfo',
      method: 'post',
      data: commentInfo
    })
  },
  // 删除私信
  deleteCommentId(id) {
    return request({
      url: `/eduservice/comment/${id}`,
      method: 'delete'
    })
  }
}