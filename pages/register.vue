<template>
  <div class="main">
    <div class="title">
      <a href="/login">Login</a>
      <span>·</span>
      <a class="active" href="/register">Register</a>
    </div>
    <div class="sign-up-container">
      <el-form ref="userForm" :model="params">
        <el-form-item class="input-prepend restyle" prop="nickname" :rules="[{ required: true, message: 'Nickname required!', trigger: 'blur' }]">
          <div>
            <el-input type="text" placeholder="Nickname" v-model="params.nickname"/>
            <i class="iconfont icon-user"/>
          </div>
        </el-form-item>
        <el-form-item class="input-prepend restyle no-radius" prop="mobile" :rules="[{ required: true, message: 'Phone number required!', trigger: 'blur' },{validator: checkPhone, trigger: 'blur'}]">
          <div>
            <el-input type="text" placeholder="Phone Number" v-model="params.mobile"/>
            <i class="iconfont icon-phone"/>
          </div>
        </el-form-item>

        <el-form-item class="input-prepend restyle no-radius" prop="code" :rules="[{ required: true, message: 'Auth code required', trigger: 'blur' }]">
          <div style="width: 100%;display: block;float: left;position: relative">
         <el-input type="text" placeholder="Verification Code" v-model="params.code"/>
            <i class="iconfont icon-phone"/>
          </div>
          <div class="btn" style="position:absolute;right: 0;top: 6px;width: 40%;">
            <a href="javascript:" type="button" @click="getCodeFun()" :value="codeTest" style="border: none;background-color: none">{{codeTest}}</a>
          </div>
        </el-form-item>

        <el-form-item class="input-prepend" prop="password" :rules="[{ required: true, message: 'Password required', trigger: 'blur' }]">
          <div>
            <el-input type="password" placeholder="Password" v-model="params.password"/>
            <i class="iconfont icon-password"/>
          </div>
        </el-form-item>

        <div class="btn">
          <input type="button" class="sign-up-button" value="Submit" @click="submitRegister()">
        </div>
        <p class="sign-up-msg">
<!--          点击 “注册” 即表示您同意并愿意遵守简书-->
          Clicking 'Submit', you agree to obey the our agreement by default
          <br>
          <a target="_blank" href="http://www.jianshu.com/p/c44d171298ce">User Agreement</a>
          和
          <a target="_blank" href="http://www.jianshu.com/p/2ov8x3">Privacy Policy</a> 。
        </p>
      </el-form>

      <!-- 更多注册方式 -->
      <div class="more-sign">
        <h6>Third party accounts</h6>
        <ul>
          <li><a id="weixin" class="weixin" href="#"><i
            class="iconfont icon-weixin"/></a></li>
          <li><a id="qq" class="qq" href="#"><i class="iconfont icon-qq"/></a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import '~/assets/css/sign.css'
import '~/assets/css/iconfont.css'
import register from '@/api/register'

export default {
     layout: 'sign',
    data() {
      return {
        params: {
          mobile: '', //手机号
          code: '', //验证码
          nickname: '', //昵称
          password: ''  //密码
        },
        sending: true,      //是否发送验证码
        second: 60,        //倒计时间
        codeTest: 'Get auto code'
      }
    },
    methods: {
       //倒计时
       timeDown() {
        let result = setInterval(() => {
          --this.second;
          this.codeTest = this.second
          if (this.second < 1) {
            clearInterval(result);
            this.sending = true;
            //this.disabled = false;
            this.second = 60;
            this.codeTest = "Get auth code"
          }
        }, 1000);
      },
      //注册方法
      submitRegister() {
        register.registerMember(this.params)
                .then(response => {
                  //提示
                  if(response !== undefined) {
                    this.$message({
                      type: 'success',
                      message: "注册成功"
                    })
                    //跳转到登陆页面
                    this.$router.push({path: '/login'})
                    }
                })
      },
      //获取验证码
      getCodeFun() {
        register.sendCode(this.params.mobile)
                .then(response => {
                  this.sending = false
                  this.timeDown()
                })
      },
      //验证手机号码格式
      checkPhone (rule, value, callback) {
        if (!(/^1[34578]\d{9}$/.test(value))) {
          return callback(new Error('Wrong phone number format'))
        }
        return callback()
      }
    }
}
</script>
