import request from '@/utils/request'

export default {
    //获取视频凭证
    getPlayAuth(vid) {
        return request({
            url: '/eduvod/video/getPlayAuth/'+vid,
            method: 'get'
        })
    },
    //获取视频凭证和课程相关信息
    getPlayAuthAndEduCourseInfo(vid) {
        return request({
            url: '/eduvod/video/getPlayAuthAndEduCourseInfo/'+vid,
            method: 'get'
        })
    },
    //获取视频凭证和课程相关信息
    getEduCourseInfo(vid) {
        return request({
            url: '/eduvod/video/getEduCourseInfo/'+vid,
            method: 'get'
        })
    }
}