<template>
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
          console.log(112,response.data.books,books.value);
          
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
  overflow: auto;
  height: calc( 100vh - 75px);
  flex-wrap: wrap;
  margin: 0 5vw;
  .book-item{
    width: 218px;
    margin-right: 30px;
    margin-top: 80px;
    // .book-pic{
    //   width: 100%;
    //   cursor: pointer;
    //   height: 350px;
    //   background:rgba(166, 166, 166, 0.5) ;
    //   border-radius: 4px;
    //   box-shadow: 0px 2px 6px 2px rgba(166, 166, 166, 0.5);
    //   img{
    //     width: 100%;
    //     height: 100%;
    //     border-radius: 4px;
    //   }
    // }
    .bookImage{
        cursor: pointer;
        background:rgba(166, 166, 166, 0.5) ;
        border-radius: 4px;
        box-shadow: 0px 2px 6px 2px rgba(166, 166, 166, 0.5);
        width: 100%;
        height: 330px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }
    .title{
      cursor: pointer;
      // font-family: Roboto;
      color: rgba(32, 33, 36, 1);
      margin-top: 15px;
      font-size: 18px;
      line-height: 30px;
    }
    .desc{
      margin-top:14px ;
      // font-family: Roboto;
      color: rgba(112, 117, 122, 0.9);
      font-size: 16px;
      line-height: 28px;
      .publisher,.douhao{
        margin:0 3px;
      }
      .douhao{

      }
    }
  }
}
</style>