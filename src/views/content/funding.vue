<template>
  <div class="press">
    <div class="wrtten">
        <div class="title">Research grants</div>
        <div class="mediaList">
          <div v-for="(item,index) in mediaList1" :key="index" class="media-item">
              <div class="left">
                  <div class="circle">
                      <img src="/static/image/grant.png" alt="">
                  </div>
              </div>
              <div class="right">
                  <div class="year">{{item.year}}</div>
                  <div class="text" :class="{'curson':item.url}"  v-html="item.text" @click="openTo(item.url)"></div>
              </div>
          </div>
        </div>
    </div>
    <div class="wrtten">
        <div class="title" style="margin-top:0px;">Awards & Prizes</div>
          <div class="mediaList">
            <div v-for="(item,index) in mediaList2" :key="index" class="media-item">
                <div class="left">
                    <div class="circle blue">
                        <img src="/static/image/award.png" alt="">
                    </div>
                </div>
                <div class="right">
                    <div class="year blue1">{{item.year}}</div>
                    <div class="text" :class="{'curson':item.url}" v-html="item.text" @click="openTo(item.url)"></div>
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



const mediaList1:any = ref([])
const mediaList2:any = ref([])
//获取数据
const getListData = () =>{ 
    try{
       axios.get('/static/json/funding.json').then(response=>{      
        mediaList1.value = response.data.Research_grants
        mediaList2.value = response.data.Awards_Prizes
        for (let i = 0; i < mediaList1.value.length-1; i++) {
            for (let j = 0; j < mediaList1.value.length-1 - i; j++) {
                if (new Date(mediaList1.value[j].year) < new Date(mediaList1.value[j+1].year)) {
                    let temp = mediaList1.value[j];
                    mediaList1.value[j] = mediaList1.value[j + 1];
                    mediaList1.value[j + 1] = temp;
                }
            }
        }
        for (let i = 0; i < mediaList2.value.length-1; i++) {
            for (let j = 0; j < mediaList2.value.length-1 - i; j++) {
                if (new Date(mediaList2.value[j].year) < new Date(mediaList2.value[j+1].year)) {
                    let temp = mediaList2.value[j];
                    mediaList2.value[j] = mediaList2.value[j + 1];
                    mediaList2.value[j + 1] = temp;
                }
            }
        }
          mediaList1.value && mediaList1.value.forEach((item:any)=>{
            item.text = item.text.replace(/\n/g,'<br>')
          })
          mediaList2.value && mediaList2.value.forEach((item:any)=>{
            item.text = item.text.replace(/\n/g,'<br>')
          })
       })
    }catch{

    }
}

const openTo = (data:any) =>{
  if(data){
      window.open(data);
  }
}
</script>

<style lang="less" scoped>
@import url(@/style/funding.less);
</style>