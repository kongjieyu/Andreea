<template>
  <div class="books">
    <div v-for="(item,index) in books" :key="index" class="book-item">
      <div @click="linkTo(item.book_url)" class="book-pic">
        <img :src="item.book_image" alt="" v-if="item.book_image">
      </div>
      <!-- <div @click="linkTo(item.book_url)" class="title" >{{item.title}}</div> -->
      <div class="desc">
        {{item.des}}
        <span v-if="item.publish_year">({{item.publish_year}})</span>
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
       axios.get('/public/static/json/books.json').then(response=>{
          books.value = response.data.books
          books.value.push({
            book_image: "",
            book_url: "",
            des: "What Everyone Should Know About Language in the 21st Century",
            publish_year: " 2008",
            publisher: "VDM Verlag",
            title: "Cleft Constructions in Spoken English",
          })
       })
    }catch{

    }
}
//点击跳转
const linkTo = (data:any) =>{
    window.open(data);
}
</script>

<style lang="less" scoped>
.books{
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  margin: 0 7vw;
  .book-item{
    width: 240px;
    margin-top: 80px;
    .book-pic{
      width: 100%;
      cursor: pointer;
      height: 350px;
      background:rgba(166, 166, 166, 0.5) ;
      border-radius: 4px;
      box-shadow: 0px 2px 6px 2px rgba(166, 166, 166, 0.5);
      img{
        width: 100%;
        height: 100%;
        border-radius: 4px;
      }
    }
    .title{
      cursor: pointer;
      font-family: Roboto;
      color: rgba(32, 33, 36, 1);
      margin-top: 30px;
      font-size: 22px;
      line-height: 32px;
    }
    .desc{
      margin-top:17px ;
      font-family: Roboto;
      color: rgba(112, 117, 122, 0.9);
      font-size: 18px;
      line-height: 32px;
    }
  }
}
</style>