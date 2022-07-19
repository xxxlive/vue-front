<template>
  <section_horizotal>
    <div class="content_horizotal">

      <H1>标题</H1>
      <P>
        走遍世界
      </P>
      <p>
        心里始终想着软件学院的妈妈什么时候死！！
        痛，太痛类！！！
      </P>
    </div>
    <img v-bind:src="img_url" width="168" height="268" style="position: relative;left: 58%">
  </section_horizotal>

</template>

<script>
export default {
  props : ["img_url","title","subtitle","price"],
  name: "class_lable_horizotal"
}
</script>

<style scoped>
section_horizotal{
  margin: 50px;

  height: 268px;
  width: 400px;
  box-shadow: 0 25px 30px rgba(0,0,0,.5);
  display: flex;
  font-family: sans-serif;
  color: #ffffff;

}


.content_horizotal{
  width: 232px;
  height: 0%;
  position: absolute;
  border-top: 0px solid transparent;
  border-bottom: 268px solid #01265d;
  border-left: 0px solid transparent;
  border-right: 80px solid transparent;

  z-index: 1;
}


</style>