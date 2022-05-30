<template>
    <div class="home" v-if="!isLoading">
        <div class="mobileBg">
            <div class="sidebar" :style="style" ref="siderbar"></div>
        </div>
        <div class="content">
            <div class="ctn-div">
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
                <div class="phone">
                    <div class="hights">
                        <div class="title">HIGHLIGHTS</div>
                        <div>
                            <div v-for="item in highlights">
                                <div>
                                    <div class="item-list" v-html="item.title"></div>
                                </div>
                                <div  class="customList" :title="item.content">{{item.content}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="contact">
                        <div class="title">Contact me</div>
                        <div>
                            <div v-for="item in contact"  class="ctn-main">
                                <div class="pic"><img :src="item.icon2"></div>
                                <div  class="customList" :title="item.list" v-html="item.list"></div>
                            </div>
                        </div>
                    </div>
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
    <div class="home" v-else>
        <div class="loadinging">
            <div class="rotate">
                <div class="item"></div>
                <div class="item"></div>
                <div class="item"></div>
                <div class="item"></div>
                <div class="item"></div>
                <div class="item"></div>
                <div class="item"></div>
                <div class="item"></div>
            </div>
            <div class="loading-one">Welcome to my page, I am Dr.Andreea Calude.</div>
            <div class="loading-two">I am bubbly and approachable and I can make anyone excited about </div>
            <div class="loading-three"><span class="larger">language</span>and<span class="larger">communication.</span></div>
        </div>
        
    </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { log } from "console";
import { loadImageEnd } from "../../utils/utils";
import {onMounted, ref, watchEffect,nextTick} from "vue";

const bgPic = ref('')              //背景图片
const belife = ref('')          //信条
const belifeList = ref([])      //列表
const contact:any = ref([])         //联系
const highlights:any = ref([])      //高亮
const introdution = ref('')     //介绍
const occupationList = ref([])  //职业
const iconList:any = ref([])        //外部链接
const siderbar = ref()

const style = ref({
    backgroundImage: ''
})

const isLoading = ref(true) //加载中
const getHomeData = () =>{ 
    try{
       axios.get('/static/json/home.json').then(response=>{
            isLoading.value = true
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
            let imgArr = []
            imgArr.push(response.data.backgroundBg)
            loadImageEnd(imgArr,()=>{
                isLoading.value = false;
            },'')
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
watchEffect(()=>{
            //     nextTick(()=>{
            //     isLoading.value = false
            // })
            if(siderbar.value){
                let sidebarData:any = document.getElementsByClassName('sidebar')
                console.log(6699999,sidebarData[0]);
                
            }
})
</script>

<style lang="less">
@import url(@/style/home.less);
</style>