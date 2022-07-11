<template>
        <div class="header">
            <div class="header-bg">
                <img :src="bgImage" alt="">
            </div>
            <div class="nav">
                <ul class="nav-parent" id="top-nav">
                    <li class="nav-item"  :class="{'active':currentAtive==item,'press-style':item=='Press'||item=='Teaching'}" v-for="(item,index) in navList"  @click="changeTab(item)" :key="index">
                        <span>{{item}}</span>
                        <ul v-if="item=='Press'" class="press-more">
                            <li v-for="(item,ibdex) in pressNav" :key="index" @click="changeTab(item)">{{item}}</li>
                        </ul>
                        <ul v-if="item=='Teaching'" class="teching-more">
                            <li v-for="(item,ibdex) in teachingNav" :key="index" @click="changeTab(item)">{{item}}</li>
                        </ul>
                    </li>
                    <!-- <div class="press">
                        <div>Written</div>
                        <div>Video/Podcasts</div>
                    </div> -->
                </ul>
                <div class="moreItem" v-if="hiddenItemsOut.length>0">
                    <span>...</span>
                    <ul class="item-ul">
                        <li v-for="(item,index) in hiddenItemsOut"  @click="changeTab(item)" :key="index">{{item}}</li>
                    </ul>
                </div>
                <div class="listIcon">
                    <img class="iconMore" :src="list" @click="openUl">
                    <ul class="list-ul" v-if="isShow">
                        <li v-for="(item,index) in navList"  @click="changeTab(item)" :key="index">{{item}}</li>
                    </ul>
                </div>
            </div>
        </div>
</template>

<script setup lang="ts">
import axios from "axios";
import {onMounted, ref, nextTick, watchEffect} from "vue";
import { useRouter} from 'vue-router'
import list from '@/assets/image/list.svg'

const router = useRouter();
const navList:any= ref(['Home','Books','Publications','Press','Interviews','Teaching','Funding','Consultancy']) //头部导航栏
const pressNav:any = ref(['Written','Video/Podcasts']) //press二级菜单
const teachingNav:any = ref(['Courses','Supervision'])
const currentAtive = ref('Home')
const bgImage:any = ref('')
//获取导航栏
const getList = () =>{
    try{
       axios.get('./static/json/header.json').then(response=>{
           navList.value = response.data.navList
           bgImage.value = response.data.title
          })
    }catch{

    }
}

const isShow = ref(false)
//缩略显示
const hiderSider:any = ref([])
//点击切换
const changeTab = (data:any) =>{
    currentAtive.value = data
     if(data=='Press'||data=='Written'||data=='Video/Podcasts'){
         router.push({
                name:'Press',
                params:{type:data}
        })  
     }else if(data=='Teaching'||data=='Courses'||data=='Supervision'){
         router.push({
                name:'Teaching',
                params:{type:data}
        })  
     }else{
         router.push({name:data})
     }
     isShow.value = false
}
//...显示
const showMoreItem = ref(false)
const hiddenItemsOut = ref([])
const isNavIconShow = () => {
    hiddenItemsOut.value = []
    let topNav = document.querySelector('#top-nav') as HTMLElement
    let height = topNav.scrollHeight
    if(height > 75) {
        const hiddenItems:any = []
        const menuItems = document.querySelectorAll('#top-nav .nav-item')
        setTimeout(() => {
            menuItems.forEach((item:any) => {
                if(item.offsetTop > 0) {
                    let ele = item.querySelectorAll('span:first-child')[0].innerText 
                    hiddenItems.push(ele)
                }
            })
            hiddenItemsOut.value = hiddenItems
        }, 100)
    }
}
const openUl = () =>{
    isShow.value = true
}
//判断数值区间
const dataSection =(num:number)=>{
        hiderSider.value = []
        switch (true) {
        // case num*2 > height && height > num: 
        case 576>num&&num > 469:
            hiderSider.value = ['Consultancy']; break
        case 469>num&&num >378: 
            hiderSider.value = ['Teaching','Consultancy']; break
        case 378>num&&num > 278: 
            hiderSider.value = ['Interviews','Teaching','Consultancy']; break
        case 278>num&&num >231: 
            hiderSider.value = ['Press','Interviews','Teaching','Consultancy']; break
        case 117<num&&num < 231: 
            hiderSider.value = ['Publications','Press','Interviews','Teaching','Consultancy']; break
        case num==117: 
            hiderSider.value = ['Books','Publications','Press','Interviews','Teaching','Consultancy']; break
        // default: hiderSider.value =[]
        
}
}
//鼠标移入事件
const showBar = ref(false)
const mouseOver =(e:any)=>{
    showBar.value = true
// console.log('移入：', e,e.currentTarget.className);
    // e.currentTarget.className = "xxx";
}
//鼠标移出事件
const mouseLeave =(e:any)=>{
    showBar.value = false
// console.log('移出：', e,e.currentTarget.className);
}
onMounted(()=>{
    currentAtive.value = <any>router.currentRoute.value.name
    getList()
    nextTick(() => {
        isNavIconShow()
    })
    window.onresize = () => {
        isNavIconShow()
    }
})

//document.querySelector('.nav').scrollHeight
</script>

<style lang="less" scoped>
@import url(@/style/header.less);
</style>
