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
            <div>
              avatar:
              <img :src="userInfo.avatar" @click="UploadAvatar"/>
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
  </div>
</template>

<script>
import courseApi from '@/api/course'
import loginApi from "@/api/login"
import cookie from 'js-cookie'
export default {
  data() {
    return {
      userInfo:"",
      imagecropperShow:false,
    }
  },
  created() {

    // //this.initSubject()
    //确认是否登陆
    this.isLogin()
    //初始化用户信息
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
          this.userInfo = data_;

          console.log("user info is ")
          console.log(this.userInfo)
        })
    },

    //点击头像可以从本地选图片
    UploadAvatar(){
      console.log("should select a file from computer and up load to aliyun oss")
    },

    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
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
  width: 178px;
  height: 178px;
  display: block;
}
</style>
