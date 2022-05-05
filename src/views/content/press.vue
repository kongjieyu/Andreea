<template>
  <div class="press">
    <div class="wrtten">
        <div class="title">Pieces in the media</div>
        <div class="mediaList">
          <div v-for="(item,index) in mediaList" :key="index" class="media-item">
              <div class="date">{{item.date}}</div>
              <div class="media-image" :style="{backgroundImage:'url(' + item.cover_url + ')'}" ></div>
              <div class="text" v-html="item.text"></div>
              <div class="operation">
                <div class="opration-item" @click="openTo(item.link_url)">{{item.operation}}</div>
                <div class="more-img" @click="openTo(item.link_url)">
                  <img src="/static/image/View_more.png"/>
                </div>
              </div>
          </div>

        </div>
    </div>
    <div class="podcasts"></div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import {onMounted, reactive, ref} from "vue";
onMounted(()=>{
  getListData()
  
})

const mediaList:any = ref([])
//获取数据
const getListData = () =>{ 
    try{
       axios.get('/static/json/press_written.json').then(response=>{
          mediaList.value = response.data.Written
          mediaList.value.forEach(item=>{
            item.text = item.text.replace(/\n/g,'<br>')
          })
          console.log(112,mediaList.value);
          
       })
    }catch{

    }
}
const openTo = (data) =>{
  if(data){
      window.open(data);
  }else{
    window.alert('No website，Coming soon')
  }
}
</script>

<style lang="less" scoped>
.press{
  padding: 0 5vw;
  height: calc(100% - 75px);
  overflow-x: hidden;
  .wrtten{
    .title{
      margin-top: 3vh;
      font-weight: bold;
      font-size: 26px;
      color: rgba(32, 33, 36, 1);
    }
    .mediaList{
      margin-top: 2vh;
      display: flex;
      flex-wrap: wrap;
      .media-item{
          border: 1px solid rgba(166, 166, 166, 0.6);
          box-shadow: 0px 2px 6px rgba(166, 166, 166, 0.2);
          border-radius: 6px;
          width: 400px;
          margin-right: 3vw;
          margin-bottom: 6vh;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .date{
            padding: 12px 0 12px 25px;
            color: rgba(32, 33, 36, 1);
            font-size: 18px;
          }
          .media-image{
            height: 250px;
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
            border-top: 1px solid rgba(166, 166, 166, 0.2);
            border-bottom: 1px solid rgba(166, 166, 166, 0.2);
          }
          .text{
            padding: 12px 25px;
            min-height: 85px;
            color: rgba(32, 33, 36, 1);
            font-size: 18px;
            line-height: 28px;
          }
          .operation{
            padding: 12px 25px;
            display: flex;
            justify-content: right;
            .opration-item{
              color: rgba(2, 182, 205, 1);
              font-size: 18px;
              margin-right: 15px;
              cursor: pointer;
            }
            .more-img{
              width: 25px;
              height: 25px;
              cursor: pointer;
              img{
                width: 100%;
                height: 100%;
              }
            }
          }
      }
    }
  }
}

</style>