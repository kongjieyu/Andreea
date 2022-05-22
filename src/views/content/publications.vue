<template>
  <div class="publications">
    <div class="public-item">
        <div class="pub_ctn" v-for="(item,index) in dataList" :key="index">
            <div class="timeline">
              <div class="year">{{item.year}}</div>
              <div class="cus-parent">
                <div class="cus-box"></div>
              </div>
            </div>
            <div class="list">
                <template v-for="(obj,index) in item.list" :key="index">
                  <div v-html="obj.text" class="publications-item list-item"
                    :class="{'articlesTitleUrl':obj.articlesTitle_url,'journalUrl':obj.journal_url,'pdfUrl':obj.pdf_url}"
                   :articlesTitleUrl="obj.articlesTitle_url" :journalUrl="obj.journal_url" :pdfUrl="obj.pdf_url">
                  </div>
                </template>
            </div>
        </div>
    </div>
    <div class="delider"></div>
    <div class="bookreview">Book Reviews</div>
    <div class="public-item1">
        <div class="pub_ctn" v-for="(item,index) in dataList2" :key="index">
            <div class="timeline">
              <div class="year">{{item.year}}</div>
              <div class="cus-parent">
                <div class="cus-box"></div>
              </div>
            </div>
            <div class="list">
                <template v-for="(obj,index) in item.list" :key="index">
                  <div v-html="obj.text" class="publications-item1 list-item"
                    :class="{'articlesTitleUrl':obj.articlesTitle_url,'journalUrl':obj.journal_url,'pdfUrl':obj.pdf_url}"
                   :articlesTitleUrl="obj.articlesTitle_url" :journalUrl="obj.journal_url" :pdfUrl="obj.pdf_url">
                  </div>
                </template>
            </div>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { log } from "console";
import {onMounted, reactive, ref, watchEffect, nextTick} from "vue";
//列表数据
const dataList:any = ref([])
const dataList2:any = ref([]) 
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
              year: 'UNDER REVIEW',
              list: buffer1
          })
          dataList.value = buffer3
         // @ts-ignore
          const jq =  window.$
          nextTick(() => {
              jq('.publications-item i').on('click', (e:any) => {
                const journalUrl = jq(e.target).parents(".publications-item").attr('journalUrl')
                window.open(journalUrl)
              })
              jq('.publications-item span.title').on('click', (e:any) => {
                const articlesTitleUrl = jq(e.target).parents(".publications-item").attr('articlesTitleUrl')
                window.open(articlesTitleUrl)
              })
              jq('.publications-item span.pdf').on('click', (e:any) => {
                const pdfUrl = jq(e.target).parents(".publications-item").attr('pdfUrl')
                window.open(pdfUrl)
              })
          })
      }).catch((error) => {
      })
      axios.get('/static/json/book_reviews.json').then((response) => {
          let buffer1:any = []
          let buffer2:any = {}
          let copyArr = JSON.parse(JSON.stringify(response.data.Book_reviews))
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
          dataList2.value = buffer3
           // @ts-ignore
          const jq =  window.$
          nextTick(() => {
              jq('.publications-item1 i').on('click', (e:any) => {
                const journalUrl = jq(e.target).parents(".publications-item1").attr('journalUrl')
                window.open(journalUrl)
              })
              jq('.publications-item1 span.title').on('click', (e:any) => {
                const articlesTitleUrl = jq(e.target).parents(".publications-item1").attr('articlesTitleUrl')
                window.open(articlesTitleUrl)
              })
              jq('.publications-item1 span.pdf').on('click', (e:any) => {
                const pdfUrl = jq(e.target).parents(".publications-item1").attr('pdfUrl')
                window.open(pdfUrl)
              })
          })
      }).catch((error) => {
      })
}

onMounted(()=>{
  getList()
})
</script>

<style lang="less" scoped>
.publications{
  font-family: Roboto;
  height: calc(100% - 80px);
  overflow-x: hidden;
  .public-item,.public-item1{
    padding: 6vh 4vw 1vh 6vw;
    .pub_ctn{
      display: flex;
      .timeline{
        flex-basis: 15%;
        display: flex;
        .year{
          font-family: Roboto;
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
        // margin-bottom: 36px;
        line-height: 30px;
        :deep(.title){
          color: rgba(2, 182, 205, 1);
          // cursor: pointer;
        }
        .articlesTitleUrl{
          :deep(.title:hover){
              color: rgba(2, 182, 205, 1);
              border-bottom: 1px solid;
              cursor: pointer;
            }
        }
        :deep(.pdf){
          color: #ffc300;
          // cursor: pointer;
        }
        .pdfUrl{
          :deep(.pdf:hover){
              color: #ffc300;
              cursor: pointer;
              border-bottom: 1px solid;
          }
        }
        :deep(i){
            // cursor: pointer;
        }
        .journalUrl{
          :deep(i:hover){
            cursor: pointer;
            border-bottom: 1px solid;
          }
        }
        .list-item{
          margin-bottom: 28px;
        }
      }
    }
    .pub_ctn:last-child{
          .cus-box::before{
            height: 68% !important;
          }
    }
  }
  .delider{
    height: 1px;
    background: rgba(166, 166, 166, 1);
    margin: 0 4vw 0 6vw;
  }
  .bookreview{padding: 6vh 4vw 0vh 6vw;font-size: 26px;font-weight: bold;}
}

</style>