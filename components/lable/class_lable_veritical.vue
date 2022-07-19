<template>

  <section v-on:click="sendclick">

    <img v-bind:src="avater" width="268" height="208">
    <div class="test_area">

      <H1 style="font-size: 28px; font-weight: bold;padding-bottom: 20px" >{{name}}</H1>
      <P style="padding-bottom: 20px;font-size: larger;font-weight: bold">
        {{career}}
      </P>
      <p>
        {{intro}}
      </P>

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
  name: "class_lable_veritical",
  props : ["id","name","avater","career","intro"],
  emits:["send_click"],

  data(){
    return{


    }
  },

  methods : {
    sendclick(event){

      window.location.href='/teacher/' + this.$props.id
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
  color: #ffffff;


}

section:hover{
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.44);
  transform: scale(1.07);
  transition-duration: 0.2s;
  transition-timing-function: ease-in;

}

.content_vertical{
  width: 0%;
  height: 222px;
  position: absolute;
  transform: translate(0px,108px);
  display: inline;
  border-top: 60px solid transparent;
  border-bottom: 0px solid #01265d;
  border-left: 0px solid #01265d;
  border-right: 268px solid #01265d;
  z-index: 1;
}
.test_area{
  position: absolute;
  width: 200px;
  text-align: center;
  transform: translate(28px,160px);
  line-height: 30px;
  z-index: 2;
}
</style>
