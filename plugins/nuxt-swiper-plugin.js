import Vue from 'vue'
import VueAwesomeSwiper from 'vue-awesome-swiper/dist/ssr'
import VueQriously from 'vue-qriously'
import ElementUI from 'element-ui' //element-ui的全部组件
import 'element-ui/lib/theme-chalk/index.css'//element-ui的css
import VueAliplayerV2 from 'vue-aliplayer-v2'
import cookie from '/utils/cookie.js'
import NPlayer from "@nplayer/vue";
Vue.use(VueAliplayerV2)
Vue.use(ElementUI) //使用elementUI
Vue.use(VueQriously)
Vue.use(VueAwesomeSwiper)
Vue.use(NPlayer, { name: 'NPlayer' })
Vue.prototype.cookie=cookie
