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
      axios.get('./static/json/publications.json').then((response) => {
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
          buffer1.length > 0 && buffer3.unshift({
                year: 'UNDER REVIEW',
                list: buffer1
            })

          dataList.value = buffer3
         // @ts-ignore
          const jq =  window.$
          nextTick(() => {
              jq('.publications-item i').on('click', (e:any) => {
                const journalUrl = jq(e.target).parents(".publications-item").attr('journalUrl')
                if(journalUrl.length>0){
                    window.open(journalUrl)
                }
              })
              jq('.publications-item span.title').on('click', (e:any) => {
                const articlesTitleUrl = jq(e.target).parents(".publications-item").attr('articlesTitleUrl')
                if(articlesTitleUrl.length>0){
                    window.open(articlesTitleUrl)
                }
              })
              jq('.publications-item span.pdf').on('click', (e:any) => {
                const pdfUrl = jq(e.target).parents(".publications-item").attr('pdfUrl')
                if(pdfUrl.length>0){
                  window.open(pdfUrl)
                }
              })
          })
      }).catch((error) => {
      })
      axios.get('./static/json/book_reviews.json').then((response) => {
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
                if(journalUrl.length>0){
                  window.open(journalUrl)
                }    
              })
              jq('.publications-item1 span.title').on('click', (e:any) => {
                const articlesTitleUrl = jq(e.target).parents(".publications-item1").attr('articlesTitleUrl')
                if(articlesTitleUrl.length>0){
                  window.open(articlesTitleUrl)
                }
              })
              jq('.publications-item1 span.pdf').on('click', (e:any) => {
                const pdfUrl = jq(e.target).parents(".publications-item1").attr('pdfUrl')
                if(pdfUrl.length>0){
                  window.open(pdfUrl)
                }
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
@import url(@/style/publications.less);
</style>