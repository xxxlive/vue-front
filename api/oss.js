import request from "../utils/request"

export default {
  uploadAvatar(data) {
    return request({
      url: '/eduoss/fileoss',
      method: 'post',
      data: data
    })
  }
}
