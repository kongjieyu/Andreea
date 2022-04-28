<template>
  <div class="home">
    <div class="bg">
      <img :src="bgPic" alt="">
    </div>
    <div class="ctn">
      <div style="position:relative;z-index:10;">
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
          <div class="btn-one" @click="openModal('highlights')">HIGHLIGHTS</div>
          <div class="btn-two" @click="openModal('contact')">Contact me</div>
        </div>
      </div>
    <div class="popover-container">
        <div class="custom-modal custom-pd" v-if="hightlightShow">
          <div class="header">
            <div class="title yellow" >HIGHLIGHTS</div>
            <div class="cancle" @click="cancleModal"></div>
          </div>
          <div class="contain">
              <div v-for="item in highlights" v-if="hightlightShow" class="ctn-main">
                <div class="hight-item yellow">
                    <div class="item-list" v-html="item.title"></div>
                </div>
                <div  class="customList" :title="item.content">{{item.content}}</div>
              </div>
          </div>
        </div>
        <div class="custom-modal"  v-if="contactShow">
            <div class="header">
              <div class="title blue">Contact me</div>
              <div class="cancle" @click="cancleModal"></div>
            </div>
            <div class="contain">
                <div v-for="item in contact" v-if="contactShow" class="ctn-main">
                  <div class="customAction blue">
                    <div class="pic"><img :src="item.icon" alt=""></div>
                    <div class="title" >{{item.title}}</div>
                  </div>
                  <div class="customList" :title="item.list" v-html="item.list">
                  </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    <div class="iconList">
        <div v-for="(item,index) in iconList" :key="index">
          <a :href="item.pic_url" target="_blank">
              <img :src="item.pic_src" alt="">
          </a>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { log } from "console";
import {onMounted, ref} from "vue";


onMounted(()=>{
  getHomeData()
  
})

const bgPic = ref('')              //背景图片
const belife = ref('')          //信条
const belifeList = ref([])      //列表
const contact = ref([])         //联系
const highlights = ref([])      //高亮
const introdution = ref('')     //介绍
const occupationList = ref([])  //职业
const iconList = ref([])        //外部链接
//获取home数据
const getHomeData = () =>{ 
    try{
       axios.get('/public/static/json/home.json').then(response=>{
            bgPic.value = response.data.backgroundBg
            belife.value = response.data.belife
            belifeList.value = response.data.belifeList
            contact.value = response.data.contact
            highlights.value = response.data.highlights
            highlights.value.forEach(item=>{
                item.title = item.title.replace(/\n/g,'<br>')
            })
            introdution.value = response.data.introdution.replace(/\n/g,'<br>')
            occupationList.value = response.data.occupationList
            iconList.value = response.data.iconList
            contact.value.forEach(item=>{
              item.list = item.list.replace(/\n/g,'<br>')
            })

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
        contactShow.value = false
    }else{
        contactShow.value = true
        hightlightShow.value = false
    }
}
//关闭弹窗
const cancleModal = () =>{
  hightlightShow.value = false
  contactShow.value = false
}


</script>

<style lang="less" scoped>
.popover-container {
  position: absolute;top: 0;left: 0;width: 100%;height: 100%;
        align-items: center;
        justify-content: center;
        display: flex;
}
.home{
  display: flex;
  height: calc(100% - 75px);
  box-sizing: border-box;
  position: relative;
.bg{
  flex: 0 0 560px;
  display: flex;
  align-items: flex-end;
  img{
    width: 100%;
    height: 100%;
  }
}
.ctn{
  flex: 1;
  margin: 0 4.5vw 0 5vw;
  position: relative;
  .occupationList{
    display: flex;
    justify-content: space-between;
    margin-top: 70px;
    flex-wrap: wrap;
    div{
      color: rgba(2, 182, 205, 1);
      font-family: ArchivoNarrow;
      font-weight: bold;
      font-size: 48px;
    }
  }
  .introdution{
    .text{
      margin-top: 40px;
      font-family: chancery;
      font-size: 28px;
      color: rgba(32, 33, 36, 1);
    }
    .diver{
      width: 60%;
      margin: 20px 0 30px 0;
      border: 1px solid rgba(166, 166, 166, 0.5);;
    }
  }
  .belife{
     font-family: Roboto;
     color:rgba(32, 33, 36, 1);
     font-size: 28px;

  }
  .belifeList{
    margin-top: 2.5vw;
    .belife-item{
      display: flex;
      font-family: Roboto;
      color:rgba(32, 33, 36, 1);
      font-size: 28px;
      margin-bottom: 1vw;
      .circle{
        display: inline-block;
        width: 16px;
        height: 16px;
        background:rgba(2, 182, 205, 1) ;
        border-radius: 16px;
        margin-right: 25px;
        margin-top: 10px;
      }
    }
  }
  .btn-bottom{
    font-family: Roboto;
    display: flex;
    justify-content: center;
    margin-top: 5vw;
    cursor: pointer;
    font-size: 20px;
    .btn-one{
        background: rgba(253, 194, 16, 1);
        box-shadow: 6px 8px 6px 2px rgba(255, 196, 3, 0.27);
        color: #fff;
        padding: 15px 30px;
        border-radius: 40px;
        margin-right: 6.5vw;
    }
    .btn-two{
        background:rgba(2, 182, 205, 1);
        box-shadow: 6px 8px 6px 2px rgba(67, 114, 120, 0.18);
        color: #fff;
        padding: 15px 30px;
        border-radius: 40px;

    }

  }
  .custom-modal{
    
    padding: 38px 45px;
   
    width: 500px;
    height: 410px;
    background: rgba(255, 255, 255, 1);;
    border-radius: 4px;
    box-shadow: 0px 2px 6px 2px rgba(166, 166, 166, 0.5);
    z-index:99;
    .header{
      display: flex;
      justify-content: center;
      position: relative;
      .title{
          font-family: Roboto;
          font-weight: bold;
          font-size: 28px;
      }
        .cancle{
          position: absolute;
          margin-top:18px;
          right: 0;
          cursor: pointer;
          display: inline-block;
          width: 18px;
          height: 4px;
          background: #999;
          line-height: 0;
          font-size: 0;
          vertical-align: middle;
          -webkit-transform: rotate(45deg);
        }
        .cancle:after{
          content: "/";
          display: block;
          width: 18px;
          height: 4px;
          background: #999;
          -webkit-transform: rotate(-90deg);
        }
    }
    .contain{
            margin-top: 55px;
            font-family: Roboto;
            font-size: 20px;
            .ctn-main{
              display: flex;
              margin-bottom: 25px;
                .customAction{
                    width: 160px;
                    display: flex;
                    .pic{
                          width: 32px;
                          height: 32px;
                          margin-left: 20px;
                        img{
                           padding: 3px;
                           width: 26px;
                           height: 26px;
                        }
                    }
                    .title{
                      width: 100px;
                      margin-left: 5px;
                      line-height: 32px;
                    }
                }
                .customList{
                  // margin-left: 32px;
                  flex: 1;
                  line-height: 32px;
                  max-width: 360px;
                  max-height: 100px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  // white-space: nowrap;
                }
                .hight-item{
                    width: 160px;
                    text-align:right;
                    margin-right: 20px;
                    line-height: 32px;
                    .item-list{
                        display: inline-block;
                        border-bottom: 2px solid rgba(255, 195, 0, 1);
                    }
                }
        }
    }
    
  }
  .custom-pd{padding: 38px 45px 38px 20px;}
}
.blue{
    color:rgba(2, 182, 205, 1) ;
    font-weight: bold;
}
.yellow{
    color: rgba(255, 195, 0, 1);
    font-weight: bold;
}
.t-right{text-align: right;}
.custom-span{
    height: 100%;
    padding-bottom: 14px;
    border-bottom: 2px solid;
}
.iconList{
    position: absolute;
    right: 40px;
    bottom: 76px;
    img{
      width: 41px;
      height: 41px;
      margin-top: 28px;
      cursor: pointer;
    }
  }
}
</style>