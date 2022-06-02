<template>
  <div class="bookView">
    <div class="bookTitle">Books</div>
    <div class="books">
      <div v-for="(item,index) in books" :key="index" class="book-item">
        <div @click="linkTo(item.book_url)" class="book-pic">
          <div  class="bookImage"  :style="{backgroundImage:'url(' + item.book_image + ')'}"></div>
        </div>
        <div @click="linkTo(item.book_url)" class="title" v-if="item.title">{{item.title}}</div>
        <div class="desc">
          {{item.des}}
          <span v-if="item.publish_year">( 
            <span>{{item.publisher}}</span>
            <span class="publisher" >,</span>
            <span class="publisher">{{item.publish_year}}</span>)
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import {onMounted, reactive, ref} from "vue";
onMounted(()=>{
  getHomeData()
  
})

const books:any = ref([])
//获取book数据
const getHomeData = () =>{ 
    try{
       axios.get('/static/json/books.json').then(response=>{
          books.value = response.data.books
       })
    }catch{

    }
}
//点击跳转
const linkTo = (data:any) =>{
  if(data){
      window.open(data);
  }else{
    window.alert('No website，Coming soon')
  }
    
}

</script>

<style lang="less" scoped>
@import url(@/style/books.less);
</style>