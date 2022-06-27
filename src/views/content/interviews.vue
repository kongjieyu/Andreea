<template>
  <div class="interviews" @scroll="Scrollbottom($event)">
    <div class="wrtten">
        <div class="title">Interviews</div>
        <div class="mediaList">
          <div v-for="(item,index) in mediaList" :key="index" class="media-item">
              <div class="left" v-lazy:background-image="{src: item.cover_url}" :key="item.cover_url" :class="{'noUrl':!item.cover_url}"></div>
              <div class="right">
                <div class="date">{{item.date}}</div>
                <div class="text" v-html="item.text"></div>
                <div class="operation">
                  <div class="date2">{{item.date}}</div>
                  <div class="opration-item" @click="openTo(item.link_url)">{{item.operation}}</div>
                    <div class="more-img" @click="openTo(item.link_url)" v-if="item.operation">
                      <img src="/static/image/View_more.png"/>
                      <img src="/static/image/next.png"/>
                    </div>
                  </div>
              </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import {onMounted, reactive, ref, watchEffect,watch} from "vue";

onMounted(() => {
    getListData()
})
const initLoadNum = ref(6) //初始加载
const Scrollbottom =(event:any)=> {
  let scrollHeight:number = event.target.scrollTop //滚动高度
  if(scrollHeight>50){ //控制什么时候加载出来
    initLoadNum.value++
    getSpliceData()
  }  
}
const mediaList:any = ref([])
const copyData:any = ref([])
//获取数据
const getListData = () =>{ 
    try{
       axios.get('/static/json/interviews.json').then(response=>{
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
</script>

<style lang="less" scoped>
@import url(@/style/interviews.less);
</style>