<template>
    <div class="home">
        <div class="sidebar" :style="style"></div>
        <div class="content">
            <div style="position:relative;z-index:10;">
                <div class="occupation">
                    <template v-for="(item, index) in occupationList" :key="index">
                        <div>{{item}}</div>
                    </template>
                </div>
                <div class="introdution">
                    <div class="text" v-html="introdution"></div>
                    <div class="divider"></div>
                </div>
                <div class="skill">
                    {{belife}}
                </div>
                <div class="skill-list">
                    <template v-for="(item, index) in belifeList" :key="index">
                        <div class="skill-item">
                            <div class="circle"></div>    
                            <div class="text">{{item}}</div>
                        </div>
                    </template>
                </div>
                <div class="btn-bottom">
                    <div class="btn btn-one" @click="openModal('highlights')">HIGHLIGHTS</div>
                    <div class="btn btn-two" @click="openModal('contact')">Contact me</div>
                </div>
            </div>
            <div class="popover-container">
                <div class="custom-modal custom-pd" v-if="hightlightShow">
                <div class="header HIGHLIGHTS">
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
                    <div class="header Contact">
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
        <div class="icon-list">
            <div v-for="(item,index) in iconList" :key="index">
                <a :href="item.pic_url" target="_blank">
                    <img :src="item.pic_src" />
                </a>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { log } from "console";
import {onMounted, ref, watchEffect,nextTick} from "vue";

const bgPic = ref('')              //背景图片
const belife = ref('')          //信条
const belifeList = ref([])      //列表
const contact:any = ref([])         //联系
const highlights:any = ref([])      //高亮
const introdution = ref('')     //介绍
const occupationList = ref([])  //职业
const iconList:any = ref([])        //外部链接

const style = ref({
    backgroundImage: ''
})

const getHomeData = () =>{ 
    try{
       axios.get('/static/json/home.json').then(response=>{
            bgPic.value = response.data.backgroundBg
            belife.value = response.data.belife
            belifeList.value = response.data.belifeList
            contact.value = response.data.contact
            highlights.value = response.data.highlights
            highlights.value.forEach((item:any)=>{
                item.title = item.title.replace(/\n/g,'<br>')
            })
            introdution.value = response.data.introdution.replace(/\n/g,'<br>')
            occupationList.value = response.data.occupationList
            iconList.value = response.data.iconList
            contact.value.forEach((item:any)=>{
              item.list = item.list.replace(/\n/g,'<br>')
            })
            style.value.backgroundImage = 'url(' + response.data.backgroundBg + ')'
       })
    }catch(error){
      console.log(error)
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

onMounted(()=>{
    getHomeData()
})
</script>

<style lang="less">
.home {
    display: flex;
    position: relative;
    .sidebar {
        width: 560px;
        height: calc(100vh - 75px);
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }
    .icon-list {
        position: absolute;
        right: 2vw;
        z-index: 20;
        bottom: 2vw;
        img {
            width: 38px;
            height: 38px;
            margin-top: 28px;
            cursor: pointer;
        }
    }
}
.content {
    flex: 1;
    padding: 0 8vw 0 6vw;
    overflow: auto;
    position: relative;
    height: calc(100vh - 75px);
    .occupation {
        display: flex;
        flex-wrap: wrap;
        text-align: center;
        justify-content: space-between;
        color: #02b6cd;
        font-family: ArchivoNarrow;
        min-width: 750px;  
        max-width: 850px;
        word-break: break-word;
        font-weight: bold;
        font-size: 58px;
        margin-top: 8vh;
        div{
            margin-right: 22px;
        }
    }
    .introdution {
        min-width: 750px;  
        max-width: 850px;
        .text {
            margin-top: 4vh;
            font-family: chancery;
            font-size: 28px;
            color: #202124;
            letter-spacing: 1px;
        }
    }
    .divider {
        width: 60%;
        margin: 2vh 0;
        border: 1px solid rgba(166, 166, 166, 0.5);
    }
    .skill {
        font-family: Roboto;
        min-width: 750px;  
        max-width: 850px;
        color: #202124;
        font-size: 28px;
        padding: 20px 0 20px;
    }
    .skill-list {
        font-family: Roboto;
        min-width: 750px;  
        max-width: 850px;
        margin-top: 12px;
        .skill-item {
            display: flex;
            align-items: flex-start;
            color: #202124;
            font-size: 28px;
            line-height: 38px;
            margin-bottom: 0.8vw;
            .circle {
                width: 16px;
                height: 16px;
                background: #02b6cd;
                border-radius: 50%;
                margin-top: 14px;
                margin-right: 24px;
            }
            .text {flex: 1;}
        }
    }
    .btn-bottom {
        font-family: Roboto;
        display: flex;
        justify-content: center;
        min-width: 750px;  
        max-width: 850px;
        margin-top: 6vh;
        font-size: 20px;
        margin-bottom: 4vh;
        .btn {
            color: #fff;
            border-radius: 40px;
            display: flex;
            padding: 15px 0px;
            width: 186px;
            border-radius: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
        }
        .btn-one {
            background: #fdc210;
            box-shadow: 6px 8px 6px 2px rgb(255 196 3 / 27%);
            margin-right: 40px;
        }
        .btn-two {
            background: #02b6cd;
            box-shadow: 6px 8px 6px 2px rgb(67 114 120 / 18%);
            margin-left: 40px;
        }
    }
    .custom-modal{
            font-family: Roboto;
            padding: 38px 45px;
            width: 600px;
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
                width: 22px;
                height: 3px;
                background: #999;
                line-height: 0;
                font-size: 0;
                vertical-align: middle;
                -webkit-transform: rotate(45deg);
                }
                .cancle:after{
                content: "/";
                display: block;
                width: 22px;
                height: 3px;
                background: #999;
                -webkit-transform: rotate(-90deg);
                }
            }
            .contain{
                    margin-top: 55px;
                    // font-family: Roboto;
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
                                letter-spacing: 1px;
                            }
                        }
                        .customList{
                        // margin-left: 32px;
                        flex: 1;
                        margin-left: 10px;
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
                            margin-right: 30px;
                            line-height: 32px;
                            .item-list{
                                display: inline-block;
                                border-bottom: 2px solid rgba(255, 195, 0, 1);
                            }
                        }
                }
            }
    
  }
    .custom-pd{padding: 38px 45px 38px 40px;}
}

.popover-container {
    position: absolute;top: 0;left: 0;width: 100%;height: 100%;
    align-items: center;
    justify-content: center;
    display: flex;
}
.blue{
    color:rgba(2, 182, 205, 1) ;
    font-weight: bold;
}
.yellow{
    color: rgba(255, 195, 0, 1);
    font-weight: bold;
}
.HIGHLIGHTS .cancle:hover,
.HIGHLIGHTS .cancle:hover:after{
    background: rgba(255, 195, 0, 1) !important;
}
.Contact .cancle:hover,
.Contact .cancle:hover:after{
    background:rgba(2, 182, 205, 1) !important;
}
</style>