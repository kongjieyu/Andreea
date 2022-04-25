<template>
  <div class="home">
    <div class="bg">
      <img src="../../../public/static/image/woman.jpg" alt="">
    </div>
    <div class="ctn">
      <div class="occupationList"></div>
      <div class="introdution"></div>
      <div class="belife"></div>
      <div class="belifeList"></div>
      <div>
        <div>HIGHLIGHTS</div>
        <div>Contact me</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import {onMounted, reactive, ref} from "vue";

// let data = {
//     occupationList:['SPEAKER','WRITER','EDUCATOR'],
//     introdution:'I research various aspects of language,especially the language of social  media and I speak, write and teach courses and workshops about this.',
//     belife:'I am available  to :',
//     belifeList:['speak at your event.','run workshops for your company.','consult on for forensic linguistics as an expert witness.'],
//     highlights:[
//       {title:'Ted Ed educator',content:'Leading the lesson Does grammar matter (viewed more than 2 million times). '},
//       {title:'Academic track-record',content:'10+ years research experience in NZ and UK universities. '},
//       {title:'Latest book',content:'Linguistics of Social Media(Routledge, to appear in 2023).'},
//     ],
//     contact:{
//       email:'andreea.calude@waikato.ac.nz',
//       post:['School of Computer Science','The University of Auckland','Private Bag 92019','Auckland, New Zealand',],
//       address:['Room 810.839,  School of Computer Science','Corner Short Street with Eden Crescent','The University of Auckland','Auckland, New Zealand']
//     }
// }
onMounted(()=>{
  getHomeData()
})
const getHomeData = async() =>{ //获取home数据
    try{
       let res = await axios.get
    }catch{

    }
}


</script>

<style lang="less" scoped>
.home{
display: flex;
.bg{
  width:30vw;
  img{
    width: 100%;
  }
}
.ctn{}
}
</style>