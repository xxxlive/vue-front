import request from '@/utils/request'

export default {
  //条件分页查询课程
  getCourseList(page, limit, searchObj) {
    return request({
      url: `/eduservice/coursefront/getFrontCourseList/${page}/${limit}`,
      method: 'post',
      data: searchObj
    })
  },
  //查询所有分类
  getAllSubject() {
    return request({
      url: '/eduservice/subject/getAllSubject',
      method: 'get'
    })
  },
  //课程详情方法
  getCourseInfo(id) {
    return request({
      url: '/eduservice/coursefront/getFrontCourseInfo/' + id,
      method: 'get'
    })
  },
  //条件分页查询课程资料
  getFrontCourseArticleList(page, limit, searchObj) {
    return request({
      url: `/eduservice/coursefront/getFrontCourseArticleList/${page}/${limit}`,
      method: 'post',
      data: searchObj
    })
  },

  //根据用户id，课程id查询是否收藏了
  checkwhetherStared(memberID, courseID) {
    return request({
      url: `/eduservice/star/isStar/${courseID}/${memberID}`,
      method: 'get',
    })
  },

  //根据用户id和课程id收藏一个课程
  starOneCourse(memberID, courseID) {
    return request({
      url: `/eduservice/star/starForOneCourse/${courseID}/${memberID}`,
      method: 'get',
    })
  },

  //根据用户id和课程id取消收藏一个课程
  unstarOneCourse(memberID, courseID) {
    return request({
      url: `/eduservice/star/CancelStarForOneCourse/${courseID}/${memberID}`,
      method: 'get',
    })
  },

  //根据用户id查询该用户收藏的所有课程
  queryStarList(memberid) {
    return request({
      url: `/eduservice/star/getStarListByUid/${memberid}`,
      method: 'get',
    })
  },

}
