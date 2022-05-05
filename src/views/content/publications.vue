<template>
  <div class="publications">
    <div class="pub_ctn" v-for="(item,index) in dataList" :key="index">
        <div class="timeline">
          <div class="year">{{item.year}}</div>
          <div class="cus-parent">
            <div class="cus-box"></div>
          </div>
        </div>
        <div class="list">
            <template v-for="(obj,index) in item.list" :key="index">
              <div v-html="obj.text" class="list-item">
              </div>
            </template>
        </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import {onMounted, reactive, ref, watchEffect, nextTick} from "vue";
//列表数据
const dataList:any = ref([])
const getList = () =>{
      axios.get('/static/json/publications.json').then((response) => {
          let buffer1:any = []
          let buffer2:any = {}
          let copyArr = JSON.parse(JSON.stringify(response.data.Publications))
          copyArr.forEach((item:any) =>{
              if(isNaN(item.year)) {
                  buffer1.push(item)
              } else {
                  if(!buffer2[item.year]) {
                      buffer2[item.year] = []
                  }
                  buffer2[item.year].push(item)
              }
          })
          let buffer3 = []
          for(let key in buffer2) {
              buffer3.push({
                year: key,
                list: buffer2[key]
              })
          }
          for(let i = 1; i < buffer3.length; ++i) {
              const temp:any = buffer3[i];
              let j = i;
              while(j > 0) { 
                  if(new Date(buffer3[j-1].year) < new Date(temp.year)) { 
                      buffer3[j] = buffer3[j-1];
                  } else {
                      break;
                  }
                  j -= 1;
              }
              buffer3[j] = temp;
          }
          buffer3.unshift({
              year: 'under review',
              list: buffer1
          })
          dataList.value = buffer3
          console.log('buffer3', buffer3)
      }).catch((error) => {

      })
}

onMounted(()=>{
  getList()
})
</script>

<style lang="less" scoped>
.publications{
  height: calc(100% - 75px);
  overflow-x: hidden;
  padding: 5vh 3vw 1vh 5vw;;
  .pub_ctn{
    display: flex;
    .timeline{
      flex-basis: 15%;
      display: flex;
      .year{
        // font-family: Roboto;
        color: rgba(255, 196, 3, 1);
        font-size: 26px;
        margin-right: 12px;
        line-height: 30px;
        width: 100px;
        word-wrap: break-word;
      }
      .cus-parent{
          position: relative;
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
          top: 24px;
          right: 9px;
          border-right: none;
          border-bottom: none;
          border-top: none;
          box-sizing: border-box;
        }
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
      .list-item{
        margin-bottom: 25px;
      }
    }
  }
}

</style>