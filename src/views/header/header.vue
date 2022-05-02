<template>
    <div style="position: relative;">
        <div class="header">
            <div class="header-bg">
                <img :src="bgImage" alt="">
            </div>
            <div id="top-nav" class="nav">
                <div class="nav-item" :class="{'active':currentAtive==item}" v-for="(item,index) in navList"  @click="changeTab(item)" :key="index">{{item}}</div>
                <div v-if="showNavIcon" class="nav-icon" @mouseover="mouseOver" >...</div>
            </div>
            <div class="expand-show" v-if="hiderSider.length>0&&showBar" @mouseleave="mouseLeave">
                <div v-for="(item,index) in hiderSider" :key="index" @click="changeTab(item)">{{item}}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import axios from "axios";
import {onMounted, reactive, ref, watchEffect, nextTick} from "vue";
import { useRouter} from 'vue-router'
const router = useRouter();
const navList:any= ref(['Home','Books','Publications','Press','Interviews','Teaching','Consultancy']) //头部导航栏
const currentAtive = ref('Home')
const bgImage:any = ref('')
//获取导航栏
const getList = () =>{
    try{
       axios.get('/static/json/header.json').then(response=>{
           navList.value = response.data.navList
           bgImage.value = response.data.title
          })
    }catch{

    }
}


//缩略显示
const hiderSider:any = ref([])

//点击切换
const changeTab = (data:any) =>{
    currentAtive.value = data
    router.push({name:data})
}
//...显示
const showNavIcon = ref(false)
const isNavIconShow = () => {
    let topNav = document.querySelector('#top-nav') as HTMLElement
    // let height = topNav.clientHeight
    // let scrollHeight = topNav.scrollHeight
    let width = topNav.scrollWidth
    let siderNum = 70
    // let relheight = scrollHeight - height
    if( width < 575) {
        showNavIcon.value = true
        dataSection(width)
        console.log('qujina',topNav.scrollWidth)
    } else {
        showNavIcon.value = false
    }
    // console.log(2258,relheight);
    
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
    window.onresize = function () {
        nextTick(() => {
            isNavIconShow()
        })
    }
})






//document.querySelector('.nav').scrollHeight
</script>

<style lang="less" scoped>
.header{
    display: flex;
    z-index: 99;
    .header-bg{
        width: 560px;
        text-align: center;
        z-index: 99;
        img {
            height: 70px;
            margin-top: 5px;
        }
    }
    .nav {
        // position: relative;
        overflow: hidden;
        margin: 0 4vw;
        flex: 1;
        display: flex;
        height: 75px;
        color: rgba(32, 33, 36, 1);
        font-size: 20px ;
        justify-content: space-between;
        // flex-basis: auto;
        flex-wrap: wrap;
        flex-grow: 1;
        flex-shrink: 1;
        .nav-item{
            cursor: pointer;
            line-height: 72px;
            margin-right: 20px;
        }
        .active{
            color:rgba(2, 182, 205, 1);
            border-bottom: 3px solid rgba(2, 182, 205, 1);
        }
    }
    .circle-es:hover{
        color:rgba(2, 182, 205, 1);

    }
    .circle-hihe{
        display: none;
    }
    .circle-show{
        display: block;
    }
    .expand-show{
        position: absolute;
        padding: 9px 15px;
        border: 1px solid rgba(166, 166, 166, 0.2);
        box-shadow: 0px 2px 6px 2px rgba(166, 166, 166, 0.2);
        z-index: 99;
        border-radius: 2px;
        right: 18px;
        top: 55px;
        div{
            cursor: pointer;
        }
    }
    .expand-show div:hover{
        color: rgba(2, 182, 205, 1);
    }
}
.nav-icon {
    position: absolute;
    padding: 10px;
    line-height: 39px;
    right: 10px;
    cursor: pointer;
}
</style>
