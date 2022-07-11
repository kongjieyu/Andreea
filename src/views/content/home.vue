<template>
    <div class="home" v-if="!isLoading">
        <div class="mobileBg">
            <div class="sidebar" :style="style"></div>
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
                    <div class="skill-first" v-html="occupationDes"></div>
                    <div class="divider"></div>
                </div>
                <div class="skill">{{Capablity}}</div>
                <div class="skill-list">
                    <template v-for="(item, index) in CapablityList" :key="index">
                        <div class="skill-item">
                            <div class="circle" ></div>    
                            <div class="text" v-html="item"></div>
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
                                <div  class="customList" :title="item.content" v-html="item.content"></div>
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
                        <div  class="customList" :title="item.content" v-html="item.content"></div>
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
            <div class="loading-one" v-html="infoList.first"></div>
            <div class="loading-two" v-html="infoList.second"></div>
            <div class="loading-three" v-html="infoList.last"></div>
        </div>
        
    </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { loadImageEnd } from "../../utils/utils";
import {onMounted, ref, watchEffect,nextTick} from "vue";

const bgPic = ref('')              //背景图片
const occupationDes = ref([])      //职业描述
const Capablity = ref('')          //信条
const CapablityList = ref([])      //列表
const contact:any = ref([])         //联系
const highlights:any = ref([])      //高亮
const introdution = ref('')     //介绍
const occupationList = ref([])  //职业
const iconList:any = ref([])        //外部链接

const style = ref({
    backgroundImage: ''
})
const infoList = ref({first:'',second:'',last:''})
const isLoading = ref(true) //加载中
const getHomeData = () =>{ 
    try{
       axios.get('./static/json/home.json').then(response=>{
            isLoading.value = true
            infoList.value.first = response.data.infoList.first
            infoList.value.second = response.data.infoList.second
            infoList.value.last = response.data.infoList.last
            bgPic.value = response.data.backgroundBg
            Capablity.value = response.data.Capablity
            CapablityList.value = response.data.CapablityList
            CapablityList.value.forEach((item:any)=>{
                item = item.replace(/\n/g,'<br>')
             })

            occupationDes.value = response.data.occupationDes.replace(/\n/g,'<br>')
            contact.value = response.data.contact
            highlights.value = response.data.highlights
            highlights.value.forEach((item:any)=>{
                item.title = item.title.replace(/\n/g,'<br>')
                item.content = item.content.replace(/\(/g,'<br>(')
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

</script>

<style lang="less" scoped>
@import url(@/style/home.less);
</style>