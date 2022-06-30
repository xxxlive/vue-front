<template>
    <div id="app">
        <vue-aliplayer-v2 
            @ready="handleReady" 
            ref="VueAliplayerV2" 
            id="player-1194076936807171180" 
            :options="options" />
        <button @click="play()">播放</button>
        <button @click="pause()">暂停</button>
        <button @click="replay()">重播</button>
        <button @click="getCurrentTime()">播放时刻</button>
    </div>
</template>
<script>

import vod from '@/api/vod'

export default {
    //layout: 'video',//应用video布局
    asyncData({params,error}) {
        return vod.getPlayAuth(params.vid)
                  .then(response => {
                      return {
                          playAuth: response.data.data.playAuth,
                          vid: params.vid,
                            options: {  //配置项  
            source:'//player.alicdn.com/video/aliyunmedia.mp4',
            width:'100%',
            height: '500px',
            useH5Prism: true, // 播放器类型：html5
            }
                       
                      }
                  })
    },
   
    methods: {
        /**
         * 在这里需要注意的是  this.$refs 可能会返回是数组,或者对象,这个在用的时候需要注意一下.且因为是异步渲染dom,所以最好是在 this.$nextTick(()=>{ //todo }); 里面调用     
         * 事件可以参考文档 https://help.aliyun.com/document_detail/125572.html?spm=a2c4g.11186623.6.1085.36fc6fc57WKZ5P#h2-u64ADu653Eu5668u4E8Bu4EF63
         */
        play(){
            this.$refs.VueAliplayerV2.play()
        },
 
        pause(){
            this.$refs.VueAliplayerV2.pause();
        },
 
        replay(){
            this.$refs.VueAliplayerV2.replay();
        },
 
        getCurrentTime(){
            this.$refs.VueAliplayerV2.getCurrentTime();
        },
        
        /**
         * 播放器事件回调 
         */
        handleReady(e){
            console.log(`ready`,e);
        }
        
    }
}
</script>
