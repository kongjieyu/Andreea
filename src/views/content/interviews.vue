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
.interviews{
  width: 100%;
  height: calc(100% - 75px);
  font-family: Roboto;
  overflow: scroll;
   .wrtten{
    width: 1420px;
    margin: 0 auto;
    padding: 0 5vw;
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
      justify-content: space-between;
      .media-item{
          border: 1px solid rgba(166, 166, 166, 0.6);
          box-shadow: 0px 2px 6px rgba(166, 166, 166, 0.2);
          border-radius: 6px;
          width: 47%;
          margin-right: 3vw;
          margin-bottom: 6vh;
          height: 222px;
          display: flex;
          overflow: hidden;
          justify-content: space-between;
          .left{
            flex-basis: 40%;
            // height: 220px;
            background-repeat: no-repeat;
            background-position: center;
            margin: -1px;
            border-radius: 6px 0 0 6px;
            background-size: cover;
            border-top: 1px solid rgba(166, 166, 166, 0.2);
            border-bottom: 1px solid rgba(166, 166, 166, 0.2);
          }
          .right{
            flex: 1;
            padding: 2vh 25px;
            padding-right: 0;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
              .date{
                color: rgba(2, 182, 205, 1);
                font-size: 16px;
                padding-right: 25px;
              }
              .text{
                height: 120px;
                overflow: auto;
                color: rgba(32, 33, 36, 0.9);
                font-size: 16px;
                padding-right: 25px;
                line-height: 25px;
              }
              .operation{
                font-size: 16px;
                display: flex;
                padding-right: 25px;
                justify-content: right;
                .opration-item{
                  color: rgba(2, 182, 205, 1);
                  margin-right: 12px;
                  cursor: pointer;
                }
                .more-img{
                  width: 22px;
                  height: 22px;
                  cursor: pointer;
                  img{
                    width: 100%;
                    height: 100%;
                  }
                  img:nth-child(1){
                    display: block;
                  }
                  img:nth-child(2){
                    display: none;
                  }
                }
              }
              
              .operation:hover {
                .opration-item{
                  color: #047E9A;
                }
                .more-img{
                   img:nth-child(1){
                    display: none;
                  }
                  img:nth-child(2){
                    display: block;
                  }
                }
              }
          }
          .noUrl{
            background: rgba(229, 229, 229, 1);
          }
      }
      .media-item:nth-child(2n){
        margin-right: 0;
      }
    }
  }
  }
</style>