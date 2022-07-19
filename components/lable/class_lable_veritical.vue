<template>

  <section>

    <img v-bind:src="cover" width="268" height="168" >
    <div class="test_area">

      <H2>{{title}}</H2>
      <P>
        {{buycount}} Brought
      </P>
      <p>
        {{viewcount}} Viewed
      </p>
      <p>
        $ {{Number(price)}}
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
  props : ["cover","title","price","buycount","viewcount"],

  data(){
    return{


    }
  }
}
</script>

<style scoped>
section{
  margin: 50px;

  height: 390px;
  width: 268px;
  box-shadow: -10px 25px 20px rgba(0,0,0,.5);
  display: flex;
  font-family: sans-serif;
  color: #ffffff;


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
  text-align: -moz-left;
  transform: translate(40px,200px);
  z-index: 2;
}
</style>
