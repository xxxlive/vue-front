import request from '@/utils/request'

export default {
  //根据视频id回传新弹幕
  AddDanmuByID(data) {
    return request({
      url: '/danmakuservice/addDanmuByVid',
      method: 'post',
      data:data
    })
  },

  //根据视频id返回弹幕文件
  GetDanmuByID(Vid) {
    return request({
      url: `/danmakuservice/getDanmuByVid/${Vid}`,
      method: 'get',

    })
  }
}
