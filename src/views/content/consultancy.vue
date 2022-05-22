<template>
  <div class="consultancy">
    <div class="consu-parent">
      <div class="wrtten" >
          <div class="title">Projects</div>
          <div class="mediaList">
            <div v-for="(item,index) in projectList" :key="index" class="media-item">
                <div class="left-ctn" >
                  <div class="left" :style="{backgroundImage:'url(' + item.cover_url + ')'}" :class="{'noUrl':!item.cover_url}"></div>
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
          </div>
      </div>
      <div class="wrtten video" >
            <div class="title">Clients</div>
            <div class="mediaList">
              <div v-for="(item,index) in clientstList" :key="index" class="client-item">
                  <div class="client-image" :class="{'noUrl':!item.cover_url}" :style="{backgroundImage:'url(' + item.cover_url + ')'}" ></div>
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
            item.text = item.text.replace(/\n/g,'<br>')
          })
          // console.log(25,clientstList.value);
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
.consultancy{
  height: calc(100% - 75px);
  width: 100%;
  overflow: scroll;
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
      // justify-content: space-between;
      .media-item{
          border: 1px solid rgba(166, 166, 166, 0.6);
          box-shadow: 0px 2px 6px rgba(166, 166, 166, 0.2);
          border-radius: 6px;
          width: 47%;
          margin-right: 3.5vw;
          margin-bottom: 6vh;
          display: flex;
          justify-content: space-between;
          .left-ctn{
              flex-basis: 25%;
              margin: 35px 25px;
              margin-right: 0;
              .left{
                width: 150px;
                height: 150px;
                border-radius: 100%;
                background-repeat: no-repeat;
                background-position: center;
                background-size: cover;
              }
          }
          .right{
            flex: 1;
            padding: 30px 30px 15px 10px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
              .date{
                color: rgba(32, 33, 36, 1);
                font-size: 20px;
                font-family: Roboto;
              }
              .text{
                height: 100px;
                overflow: auto;
                color: rgba(32, 33, 36, 0.9);
                font-size: 16px;
                line-height: 25px;
                font-family: Roboto;
              }
              .operation{
                font-size: 16px;
                display: flex;
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
      }
      .media-item:nth-child(2n){
        margin-right: 0;
      }
      .client-item{
        width: 22%;
        height: 150px;
        overflow: hidden;
        margin: 15px 3vw 20px 0;
        border-radius: 6px;
        box-sizing: border-box;
        border: 1px solid rgba(166, 166, 166, 0.6);
        box-shadow: 0px 2px 6px rgba(166, 166, 166, 0.2);
        .client-image{
            height: 150px;
            margin: -1px;
            border-radius: 6px;
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
        }
      }
      .client-item:nth-child(4n){
        margin-right: 0;
      }
    }
  }
  .video .mediaList .media-item .text{
    min-height: 60px;
  }
  .noUrl{
    background: rgba(229, 229, 229, 1);
  }
  .consu-parent{
    width: 1420px;
    margin: 0 auto;
    padding: 0 5vw;
  }
}

</style>