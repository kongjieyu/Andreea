<template>
  <div class="publications">
    <div class="pub_ctn" v-for="(item,index) in dataList" :key="index">
        <div class="timeline">
          <div class="year">{{item.year}}</div>
          <div class="cus-box"></div>
        </div>
        <div class="list" v-html="item.text"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import {onMounted, reactive, ref, watchEffect, nextTick} from "vue";
//列表数据
const dataList:any = ref([])
const getList = () =>{
    try{
       axios.get('/static/json/publications.json').then(response=>{
       console.log(222,response.data.Publications)
            dataList.value = response.data.Publications
          })
    }catch{

    }
}
onMounted(()=>{
  getList()
})
</script>

<style lang="less" scoped>
.publications{
  height: calc(100% - 75px);
  overflow-x: hidden;
  padding: 5vh 3vw 1vh 8vw;;
  .pub_ctn{
    display: flex;
    .timeline{
      flex-basis: 15%;
      display: flex;
      position: relative;
      .year{
        // font-family: Roboto;
        color: rgba(255, 196, 3, 1);
        font-size: 26px;
        margin-right: 12px;
        line-height: 30px;
        width: 100px;
        word-wrap: break-word;
      }
      .cus-box{
        width: 22px;
        height: 22px;
        margin-top: 4px;
        border-radius: 4px;
        background-color: rgba(255, 196, 3, 1);
      }
      .cus-box::before{
        content: "";
        display: block;
        z-index: 1000;
        position: absolute;
        height: 100%;
        border: 4px solid rgba(255, 196, 3, 1);
        top: 22px;
        right: 58px;
        border-right: none;
        border-bottom: none;
        border-top: none;
        box-sizing: border-box;
      }
    }
    .list{
      flex: 1;
      font-size: 18px;
      color: rgba(32, 33, 36, 1);
      margin-bottom: 36px;
      line-height: 30px;
      /deep/.title{
        color: rgba(2, 182, 205, 1);
      }
    }
  }
}

</style>