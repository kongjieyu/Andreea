<template>
  <div class="press"  @scroll="Scrollbottom($event)">
    <div class="changeBtn">
      <span @click="changeTab('Written')" :class="{'active': current == 'Written'}">Written</span>
      <span @click="changeTab('Video/Podcasts')" :class="{'active': current == 'Video/Podcasts'}">Video</span>
    </div>
    <div class="wrtten" v-if="isWrittem=='press_written'">
        <div class="title">Pieces in the media</div>
        <div class="mediaList">
          <div v-for="(item,index) in mediaList" :key="index" class="media-item">
              <div class="date">{{item.date}}</div>
              <div class="media-image" v-lazy:background-image="{src: item.cover_url}" :key="item.cover_url"  :class="{'noUrl':!item.cover_url}"></div>
              <div class="text" v-html="item.text"></div>
              <div class="operation">
                <div class="opration-item" @click="openTo(item.link_url)">{{item.operation}}</div>
                <div class="more-img" @click="openTo(item.link_url)" v-if="item.operation">
                  <img src="/static/image/View_more.png"/>
                  <img src="/static/image/next.png"/>
                </div>
              </div>
          </div>
        </div>
    </div>
    <div class="wrtten video" v-if="isWrittem=='press_video_podcast'">
          <div class="title">Video / Podcast</div>
          <div class="mediaList">
            <div v-for="(item,index) in mediaList" :key="index" class="media-item">
                <!-- <div class="date">{{item.date}}</div> -->
                <div class="media-image cuspointer" :class="{'noUrl':!item.cover_url}" v-lazy:background-image="{src: item.cover_url}" :key="item.cover_url" style="{borderRadius:'6px 6px 0 0'}" @click="openTo(item.link_url)" ></div>
                <div class="text" v-html="item.text" :class="{'hoverItem':item.link_url}"  @click="openTo(item.link_url)"></div>
                <div class="video-date">{{item.date}}</div>
            </div>
          </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import {onMounted, ref, watchEffect,watch} from "vue";
import { useRoute} from 'vue-router'
const route = useRoute()
const current = ref('Written')
onMounted(() => {
    isWrittem.value = 'press_written'
    getListData('press_written')
})
const isWrittem = ref('press_written') //类型
watch(
      () => route.params,
      (val, oval) => {
            if(oval.type=='Video/Podcasts'){ //vidio
              isWrittem.value = 'press_video_podcast'
              getListData('press_video_podcast')
            }else{  //written
              isWrittem.value = 'press_written'
              getListData('press_written')
            }
      }
);

watchEffect(()=>{
  if(isWrittem.value == 'press_written'){
      current.value = 'Written'
  }else{
    current.value = 'Video/Podcasts'
  }
})

const initLoadNum = ref(6) //初始加载
const Scrollbottom =(event:any)=> {
  let scrollHeight:number = event.target.scrollTop //滚动高度
  if(scrollHeight>50){
    initLoadNum.value++
    getSpliceData()
  }  
}
const mediaList:any = ref([])
const copyData:any = ref([])
//获取数据
const getListData = (type:any) =>{ 
    try{
       axios.get(`/static/json/${type}.json`).then(response=>{
          response.data.Written && response.data.Written.forEach((item:any)=>{
             item.text = item.text.replace(/\n/g,'<br>')
          })
          mediaList.value = []
          copyData.value = JSON.parse(JSON.stringify(response.data.Written))
          copyData.value && copyData.value.forEach((item:any,index:number)=>{
            if(index<initLoadNum.value){
              mediaList.value.push(item)
            }
          })
       })
    }catch{
    }
}
const getSpliceData = () =>{
  copyData.value && copyData.value.forEach((item:any)=>{
      if(!mediaList.value.includes(item)){
          mediaList.value.push(item)
      }
  })
}
const openTo = (data:any) =>{
  if(data){
      window.open(data);
  }else{
    window.alert('No website，Coming soon')
  }
}

const changeTab = (data:any)=>{
  current.value = data
  if(data=='Video/Podcasts'){ //vidio
    isWrittem.value = 'press_video_podcast'
    getListData('press_video_podcast')
  }else{  //written
    isWrittem.value = 'press_written'
    getListData('press_written')
  }
}
</script>

<style lang="less" scoped>
@import url(@/style/press.less);
</style>