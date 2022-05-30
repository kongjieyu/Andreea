<template>
  <div class="interviews">
    <div class="wrtten">
        <div class="title">Interviews</div>
        <div class="mediaList">
          <div v-for="(item,index) in mediaList" :key="index" class="media-item">
              <div class="left" :style="{backgroundImage:'url(' + item.cover_url + ')'}" :class="{'noUrl':!item.cover_url}"></div>
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

const mediaList:any = ref([])
//获取数据
const getListData = () =>{ 
    try{
       axios.get('/static/json/interviews.json').then(response=>{
          //  console.log('video',response.data);
           
          mediaList.value = response.data.Written
          mediaList.value.forEach((item:any)=>{
            item.text = item.text.replace(/\n/g,'<br>')
          })
          // console.log(112,mediaList.value);
          
       })
    }catch{

    }
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