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
        <div class="title" style="margin-top:0px;">Awards & Prize</div>
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
.press{
  height: calc(100% - 75px);
  width: 100%;
  overflow: scroll;
  font-family: Roboto;
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
      //justify-content: space-between;
      .media-item{
          border: 1px solid rgba(166, 166, 166, 0.5);
          box-shadow: 0px 2px 6px 2px rgba(166, 166, 166, 0.2);
          border-radius: 6px;
          width: 432px;
          margin-right: 3vw;
          height: 133px;
          overflow: hidden;
          margin-bottom: 5vh;
          display: flex;
          //justify-content: space-between;
          .left{
              flex-basis: 23%;
              position: relative;
              overflow: hidden;
              margin: -1px;
              .circle{
                  position:absolute;
                  width: 75px;
                  left: 10px;
                  bottom: 75px;
                  height: 75px;
                  border-radius:100%;
                  background-color: rgba(253, 194, 16, 1);
                  img{
                      width: 30x;
                      height: 30px;
                      position: absolute;
                      left: 22.5px;
                      top: 22.5px;
                  }
              }
          }
          .right{
              flex:1;
              .year{
                  color: rgba(255, 195, 0, 1);
                  font-size: 16px;
                  line-height: 35px;
                  padding-top:5px ;
              }
              .text{
                  font-size: 16px;
                  height: 88px;
                  line-height: 25px;
                  color: rgba(32, 33, 36, 1);
                  overflow: auto;
                  padding-right:10px ;
                  margin-bottom: 10px;
              }
          }
      }
      .media-item:nth-child(3n), .media-item:last-child{
        margin-right: 0;
      }
    }
  }
  .video .mediaList .media-item .text{
    min-height: 60px;
  }
.blue{
    background-color: rgba(2, 182, 205, 1) !important;
}
.blue1{
    color: rgba(2, 182, 205, 1) !important;
}
  .noUrl{
    background: rgba(229, 229, 229, 1) ;
  }
  .curson{cursor: pointer;}
 .curson:hover{text-decoration: underline;}
}

</style>