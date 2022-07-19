<template>

  <section v-on:click="send_login">

    <img v-bind:src="cover" width="268" height="132" >

<!--   school logo-->
    <div style="position: absolute; background-color: #ffffff;width: 66px;height: 66px;transform: translate(28px,98px);border:1px solid rgb(229, 231, 232);border-radius: 7px" >

    <img src="http://149.28.149.220:8000/google.png" width="54" height="54" style="position: absolute;margin: 6px">

    </div>

    <div style="position: absolute; transform: translate(200px,145px)">

    <span class="fr jgTag" v-if="Number(price) === 0" style="background-color: #ffe057">
        <i class=" fsize14 f-fA" style="color: #00120e">Free</i>
      </span>
    <span class="fr jgTag bg-orange" v-else>
        <i class="c-fff fsize14 f-fA"> ￥{{ price }}</i>
      </span>

    </div>



    <div class="test_area">

      <p style="font-size: 1.2em;color: #666666;transform: translate(0px,148px);position: absolute;font-weight:bold">
        course
      </p>

      <H2 style="    font-size: 1.25rem;
                      line-height: 1.75rem;
                      font-family: Source Sans Pro,Arial,sans-serif;
                       font-weight: 400;
                       color: #1770e6" >
        {{title}}</H2>

      <p style="font-size: 1.2em">Google</p>

      <div style="display: flex">
      <P>
        {{buycount}} Brought
      </P>
      <p>
        . {{viewcount}} Viewed
      </p>
      </div>


    </div>



    <div class="content_vertical"></div>
  </section>


  <!--
"item.cover" 图片的路径
item.id
v-on:click="isLogin(item.id) 用于判断是否登录并且实现自动转跳
Number(item.price)
item.buyCount
item.viewCount
-->
</template>

<script>
export default {
  name: "class_lable_veritical_white",
  props : ["cover","title","price","buycount","viewcount"],
  emits : ["islogin"],

  data(){
    return{


    }
  },
  methods:{
    send_login(event){

      this.$emit("islogin")
    }
  }
}
</script>

<style scoped>
section{
  margin: 50px;

  height: 390px;
  width: 268px;
  display: flex;
  font-family: sans-serif;
  background-color: #fefefe;
  color: #737373;
  transition-duration: 0.4s;
  box-shadow: 0 2px 6px 0 rgba(0,0,0,0.1)

}
section:hover{
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24)
}

.content_vertical{
  width: 0%;
  height: 222px;
  position: absolute;
  transform: translate(0px,108px);
  display: inline;
  z-index: 1;
}
.test_area{
  position: absolute;
  width: 200px;
  text-align: -moz-left;
  transform: translate(22px,190px);
  z-index: 1;
  font-family: Georgia, serif;
}
</style>
