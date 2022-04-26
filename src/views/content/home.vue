<template>
  <div class="home">
    <div class="bg">
      <img src="/public/static/image/woman.jpg" alt="">
    </div>
    <div class="ctn">
      <div class="occupationList">
        <template v-for="(item,index) in occupationList" :key="index">
          <div>{{item}}</div>
        </template>
      </div>
      <div class="introdution">
        <div class="text" v-html="introdution"></div>
        <div class="diver"></div>
      </div>
      <div class="belife">
        {{belife}}
      </div>
      <div class="belifeList" style="white-space: pre-wrap;">    
        <template v-for="(item,index) in belifeList" :key="index">
          <div class="belife-item">
            <div class="circle"></div>{{item}}
          </div>  
        </template>          
      </div>
      <div class="btn-bottom">
        <div class="btn-one" @click="openModal(highlights)">HIGHLIGHTS</div>
        <div class="btn-two" @click="openModal(contact)">Contact me</div>
      </div>
      <div class="iconList">
        <div>
          <img src="/public/static/image/Instagram.png" alt="">
        </div>
        <div>
          <img src="/public/static/image/Linkedin.png" alt="">
        </div>
        <div>
          <img src="/public/static/image/twitter.png" alt="">
        </div>
    </div>
    </div>
    <div class="custom-modal">
        <div class="header">
          <div>{{title}}</div>
          <div></div>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import {onMounted, reactive, ref} from "vue";

let respData  = 
onMounted(()=>{
  getHomeData()
  
})

const belife = ref('')          //信条
const belifeList = ref([])      //列表
const contact = ref({})         //联系
const highlights = ref([])      //高亮
const introdution = ref('')     //介绍
const occupationList = ref([])  //职业
//获取home数据
const getHomeData = () =>{ 
    try{
       axios.get('/public/static/json/home.json').then(response=>{
          console.log(66,response.data)
            belife.value = response.data.belife
            belifeList.value = response.data.belifeList
            contact.value = response.data.contact
            highlights.value = response.data.highlights
            introdution.value = response.data.introdution.replace(/\n/g,'<br>')
            occupationList.value = response.data.occupationList

       })
    }catch{

    }
}
const hightlightShow = ref(false)
const contactShow = ref(false)
//按钮点击事件
const openModal = (type:any) =>{
    if(type=='highlights'){
        hightlightShow.value = true
    }else{
        contactShow.value = true
    }
}


</script>

<style lang="less" scoped>
.home{
display: flex;
height: calc(100% - 75px);
.bg{
  width:32vw;
  img{
    width: 100%;
    height: 100%;
  }
}
.ctn{
  width: 56.5vw;
  margin: 0 6.5vw 0 5vw;
  position: relative;
  .occupationList{
    display: flex;
    justify-content: space-between;
    margin-top: 2.6vw;
    div{
      color: rgba(2, 182, 205, 1);
      font-family: ArchivoNarrow;
      font-weight: bold;
      font-size: 50px;
    }
  }
  .introdution{
    .text{
      margin-top: 2vw;
      font-family: chancery;
      font-size: 30px;
      color: rgba(32, 33, 36, 1);
    }
    .diver{
      width: 50%;
      margin: 1vw 0 2.5vw 0;
      border: 1px solid rgba(166, 166, 166, 0.7);;
    }
  }
  .belife{
     font-family: Roboto;
     color:rgba(32, 33, 36, 1);
     font-size: 30px;

  }
  .belifeList{
    margin-top: 2.5vw;
    .belife-item{
      display: flex;
      font-family: Roboto;
      color:rgba(32, 33, 36, 1);
      font-size: 30px;
      margin-bottom: 1vw;
      .circle{
        display: inline-block;
        width: 18px;
        height: 18px;
        background:rgba(2, 182, 205, 1) ;
        border-radius: 18px;
        margin-right: 1.5vw;
        margin-top: 10px;
      }
    }
  }
  .btn-bottom{
    display: flex;
    justify-content: center;
    margin-top: 80px;
    cursor: pointer;
    .btn-one{
        background: rgba(253, 194, 16, 1);
        color: #fff;
        padding: 15px 25px;
        border-radius: 40px;
        margin-right: 6.5vw;
    }
    .btn-two{
        background:rgba(2, 182, 205, 1);
        color: #fff;
        padding: 15px 25px;
        border-radius: 40px;

    }

  }
  .iconList{
    position: absolute;
    right: 0;
    bottom: 76px;
    div{
      width: 41px;
      height: 41px;
      margin-top: 28px;
      cursor: pointer;
    }
  }
}
}
</style>