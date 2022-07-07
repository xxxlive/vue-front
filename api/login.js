import request from '@/utils/request'
import axios from "axios";

export default {
  //登陆
  submitLogin(userInfo) {
    return request({
      url: '/educenter/member/login',
      method: 'post',
      data: userInfo
    })
  },
  //根据token获取用户信息
  getLoginUserInfo() {
    return request({
      url: '/educenter/member/getMemberInfo',
      method: 'get'
    })
  },
  wxlogin() {
    console.log("fuck you")
    axios({
      method:'get',
      // 发ajax请求，用以获取数据，此处地址意思是查询 github中 vue 星数最高的项目
      url:'http://localhost:8160/educenter/api/ucenter/wx/login'
    })
    console.log('skip')
    // return request({
    //   url: '/educenter/api/ucenter/wx/login',
    //   method: 'get'
    // })
  }
}
