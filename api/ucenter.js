import request from '@/utils/request'

export default {
    //根据id获取这个哥们在这几个大类里面每类学了多少课
    getBoughtCourseRatio(id) {
        return request({
            url: `/eduservice/course/getCourseClassify/{id}`,
            method: 'get'
        })
    }
}
