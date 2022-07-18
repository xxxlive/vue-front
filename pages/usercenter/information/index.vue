<template>
  <div>
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu>
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-user"></i>Private</template>
            <el-menu-item-group>

              <el-menu-item index="1-1">
                <router-link to="/usercenter/information" exact>
                  <a>information</a>
                </router-link>
              </el-menu-item>
              <el-menu-item index="1-2">
                <router-link to="/usercenter/learnprogress" exact>
                  <a>Learning Progress</a>
                </router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>Course</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="2-1">
                <router-link to="/usercenter/favorite" exact>
                  <a>Favorite</a>
                </router-link>
              </el-menu-item>
              <el-menu-item index="2-2">Recommended</el-menu-item>
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
        <el-main>

          <div>
            Basic Information:
            <el-input
              placeholder="Please enter your nickname"
              prefix-icon="el-icon-user-solid"
              v-model="userInfo.nickname"
            >
            </el-input>
            <el-input
              placeholder="Please enter your phone number"
              prefix-icon="el-icon-phone"
              v-model="userInfo.mobile">
            </el-input>

            <div>sex:
              <el-radio v-model="userInfo.sex" label="0">male</el-radio>
              <el-radio v-model="userInfo.sex" label="1">female</el-radio>
            </div>
            <div class="avatar-container">
              avatar:
              <img :src="userInfo.avatar" alt="avatar" @click="imageCropperShow=true" class="avatar"/>
              <h1 class="caption" @click="imageCropperShow=true">Change avatar</h1>
            </div>

            <el-input
              placeholder="Please enter your sign"
              prefix-icon="el-icon-chat-line-square"
              v-model="userInfo.sign"
            >
            </el-input>
          </div>
          <el-button type="primary">Submit</el-button>


        </el-main>
      </el-container>
    </el-container>
    <image-cropper
      v-show="imageCropperShow"
      :width="300"
      :height="300"
      :key="imageCropperKey"
      url="http://47.95.195.219:8223/eduoss/fileoss"
      field="file"
      @close="closeImageCropper"
      @crop-upload-success="cropSuccess"/>
  </div>
</template>

<script>
import ImageCropper from "@/components/ImageCropper"
import courseApi from '@/api/course'
import loginApi from "@/api/login"
import ucenterApi from '@/api/ucenter'
import cookie from 'js-cookie'

export default {
  components: {
    ImageCropper
  },
  data() {
    return {
      imageCropperShow: false,
      imageCropperKey: 0,
      userInfo: "",
    }
  },
  created() {

    // //this.initSubject()
    //确认是否登陆
    this.isLogin()
    //初始化用户信息
    this.initUserData()
    console.log("initiated!!!")

  },
  methods: {
    //判断是否null
    isNotNull(data) {
      return (data == "" || data == undefined || data == null) ? false : true;
    },
    //判断是否登录
    isLogin() {
      if (this.isNotNull(cookie.get('guli_token'))) {
        console.log(cookie.get('guli_token'))
      } else {
        window.location.href = "/login"
      }
    },
    //获取userinfo
    initUserData() {
      console.log("enter this function!")
      loginApi.getLoginUserInfo()
        .then(response => {
          let data_ = response.data.data.userInfo
          this.userInfo = data_;

          console.log("user info is ")
          console.log(this.userInfo)
        })
    },
    closeImageCropper() {
      this.imageCropperShow = false
      // 上传组件初始化
      this.imageCropperKey = this.imageCropperKey + 1
    },
    cropSuccess(data) {
      console.log('crop successfully')
      this.imageCropperShow = false
      this.imageCropperKey = this.imageCropperKey + 1
      // 上传之后接口返回图片地址
      this.userInfo.avatar = data.data.url

      console.log(this.userInfo)
      ucenterApi.updateUser(this.userInfo)
        .then(response => { // 修改成功
          // 提示信息
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
        }).catch(err => {
        this.$message({
          type: 'warning',
          message: '修改失败!'
        })
        // 回到dashboard页面 路由跳转
        this.$router.push({path: '/usercenter'})
      })
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

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 100px;
  height: 100px;
  display: block;
  border-radius: 4px;
  transition-duration: .3s;
}

.avatar-container:hover .avatar {
  filter: blur(4px) brightness(.6);
  transition-duration: .3s;
}

.caption {
  visibility: hidden;
  color: #FFFFFF;
  position: relative;
  bottom: 75px;
  transition-duration: .3s;
}

.avatar-container:hover .caption {
  visibility: visible;
  transition-duration: .3s;
}
</style>
