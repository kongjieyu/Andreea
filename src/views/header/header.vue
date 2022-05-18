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
            </div>
        </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { log } from "console";
import {onMounted, reactive, ref, watchEffect, nextTick} from "vue";
import { useRouter} from 'vue-router'
const router = useRouter();
const navList:any= ref(['Home','Books','Publications','Press','Interviews','Teaching','Funding','Consultancy']) //头部导航栏
const pressNav:any = ref(['Written','Video/Podcasts']) //press二级菜单
const teachingNav:any = ref(['Courses','Supervisions'])
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
     if(data=='Press'||data=='Written'||data=='Video/Podcasts'){
         router.push({
                name:'Press',
                params:{type:data}
        })  
     }else if(data=='Teaching'||data=='Courses'||data=='Supervisions'){
         router.push({
                name:'Teaching',
                params:{type:data}
        })  
     }else{
         router.push({name:data})
     }
}
//...显示
const showNavIcon = ref(false)
const isNavIconShow = () => {
    let topNav = document.querySelector('#top-nav') as HTMLElement
    let height = topNav.scrollHeight
    // let scrollHeight = topNav.scrollHeight
    let width = topNav.scrollWidth
    let siderNum = 70
    // let relheight = scrollHeight - height
    if(height > 75) {
        const hiddenItems:any = []
        const menuItems = document.querySelectorAll('#top-nav .nav-item')
        setTimeout(() => {
            menuItems.forEach((item:any) => {
                if(item.offsetTop > 0) {
                    hiddenItems.push(item.innerHTML)
                }
            })
        }, 100)
    }
    // if( width < 575) {
    //     showNavIcon.value = true
    //     dataSection(width)
    //     console.log('qujina',topNav.scrollWidth)
    // } else {
    //     showNavIcon.value = false
    // }
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
    window.onresize = () => {
        isNavIconShow()
    }
})






//document.querySelector('.nav').scrollHeight
</script>

<style lang="less" scoped>
.header{
    display: flex;
    .header-bg{
        min-width: 560px;
        text-align: left;
        img {
            height: 70px;
            margin-top: 5px;
            margin-left: 5vw;
        }
    }
    .nav {
        margin: 0 4vw;
        width:calc(100% - 560px);
        ul{
            margin: 0;
            padding: 0;
        }
        li{
            list-style: none;
        }
        .nav-parent{
            // flex-wrap: wrap;
            // overflow: hidden;
            font-family: Roboto;
            flex-basis: auto;
            flex-grow: 1;
            flex-shrink: 1;
            height: 75px;
            color: rgb(32, 33, 36);
            font-size: 20px;
            display: flex;
            justify-content: space-between;
            .nav-item{
                cursor: pointer;
                line-height: 72px;
                margin-right:20px;
            }
            .nav-item:hover, .press-style ul li:hover{
                color:rgba(2, 182, 205, 1);
            }
            .active{
                color:rgba(2, 182, 205, 1);
                border-bottom: 3px solid rgba(2, 182, 205, 1);
            }
            .press-style{
                position: relative;
            } 
            .press-style .press-more ,
            .press-style .teching-more{
                position: absolute;
                display: none;
                top:75px;
                left: -65px;
                border: 1px solid rgba(166, 166, 166, 0.6);
                box-shadow: 0px 2px 6px rgba(166, 166, 166, 0.4);
                border-radius: 2px;
                background: rgb(239,239,239);
                z-index: 99;
                text-align: center;
                color: rgb(32, 33, 36);
            }
            .press-style .teching-more{
                left: -45px;
            }
            .press-style:hover .press-more,
            .press-style:hover .teching-more{
                display: inline-block;
            } 
            .press-style ul li{
                line-height: 40px;
                z-index: 99;
                padding: 10px 25px ;
            }
            .press-style ul li:nth-child(1){
                border-bottom: 1px solid rgba(166, 166, 166, 0.2);
            }
        }
    }
}
</style>
