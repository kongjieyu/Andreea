<template>
  <div class="consultancy">
    <div class="consu-parent">
      <div class="consulty-name">Consultancy</div>
      <div class="wrtten" >
          <div class="title">Projects</div>
          <div class="mediaList">
            <template v-for="(item,index) in projectList" :key="index">
              <div class="media-item"  v-if="!item.isShow">
                  <div class="left-ctn" >
                    <div class="left" v-lazy:background-image="{src: item.cover_url}" :key="item.cover_url"  :class="{'noUrl':!item.cover_url}"></div>
                    <div class="date">{{item.title}}</div>
                  </div>
                  <div class="right">
                    <div class="date">{{item.title}}</div>
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
            </template>
          </div>
      </div>
      <div class="wrtten video" >
            <div class="title">Clients</div>
            <div class="mediaList">
              <div v-for="(item,index) in clientstList" :key="index" class="client-item">
                  <div class="client-image" :class="{'noUrl':!item.cover_url}" v-lazy:background-image="{src: item.cover_url}" :key="item.cover_url"></div>
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


const projectList:any = ref([])
const clientstList:any = ref([])
//获取数据
const getListData = () =>{ 
    try{
       axios.get(`/static/json/consultancy.json`).then(response=>{ 
          projectList.value = response.data.Project
          clientstList.value = response.data.Clients
          projectList.value.forEach((item:any)=>{
            if(!item.cover_url && !item.link_url && !item.text && !item.title){  
              item.isShow = true
            }
            item.text = item.text.replace(/\n/g,'<br>')
          })
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
@import url(@/style/consultancy.less);
</style>