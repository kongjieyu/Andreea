<template>
  <div class="press">
    <div class="wrtten" v-if="isWrittem=='press_written'">
        <div class="title">Courses</div>
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
    <div class="wrtten video" v-if="isWrittem=='press_video_podcast'">
          <div class="title">Video / Podcast</div>
          <div class="mediaList">
            <div v-for="(item,index) in mediaList" :key="index" class="media-item">
                <!-- <div class="date">{{item.date}}</div> -->
                <div class="media-image cuspointer" :style="{backgroundImage:'url(' + item.cover_url + ')'}" @click="openTo(item.link_url)" ></div>
                <div class="text" v-html="item.text"></div>
                <div class="video-date">{{item.date}}</div>
            </div>
          </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import {onMounted, reactive, ref, watchEffect,watch} from "vue";
import { useRoute,useRouter} from 'vue-router'

const route = useRoute()
const router = useRouter();
onMounted(() => {
    isWrittem.value = 'press_written'
    getListData('press_written')
})
const isWrittem = ref('') //类型
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


const mediaList:any = ref([])
//获取数据
const getListData = (type) =>{ 
    try{
       axios.get(`/static/json/${type}.json`).then(response=>{
          //  console.log('video',response.data);
           
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
          .cuspointer{
            cursor: pointer;
          }
          .text{
            padding: 12px 25px;
            min-height: 85px;
            color: rgba(32, 33, 36, 1);
            font-size: 18px;
            line-height: 28px;
          }
          .video-date{
            padding: 10px 25px 20px 25px;
            color: rgba(112, 117, 122, 0.9);
            font-size: 18px;
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
  .video .mediaList .media-item .text{
    min-height: 60px;
  }
}

</style>