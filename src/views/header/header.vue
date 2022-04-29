<template>
    <div class="header">
        <div class="header-bg">
            <img src="../../../public/static/image/header.png" alt="photo">
        </div>
        <div id="top-nav" class="nav">
            <div class="nav-item" :class="{'active':currentAtive==item}" v-for="(item,index) in navList"  @click="changeTab(item)" :key="index">{{item}}</div>
            <div v-if="showNavIcon" class="nav-icon">...</div>
        </div>
        <!-- <div class="expand-show">other</div> -->
    </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref, watchEffect, nextTick} from "vue";
import { useRouter} from 'vue-router'
const router = useRouter();
const navList:any= ref([]) //头部导航栏
const currentAtive = ref('Home')

// const navWidth = ref('')
// watchEffect(()=>{
//   window.onresize = function () {
//     navWidth.value = document.body.clientWidth - 560
//     console.log(222,navWidth.value);
//   }
// })

//获取导航栏
const getList = () =>{
    navList.value = ['Home','Books','Publications','Press','Interviews','Teaching','Consultancy']
}

//点击切换
const changeTab = (data:any) =>{
    currentAtive.value = data
    router.push({name:data})
}

const showNavIcon = ref(false)
const isNavIconShow = () => {
    let topNav = document.querySelector('#top-nav') as HTMLElement
    let height = topNav.clientHeight
    let scrollHeight = topNav.scrollHeight
    if(scrollHeight > height) {
        showNavIcon.value = true
    } else {
        showNavIcon.value = false
    }
}
onMounted(()=>{
    currentAtive.value = <any>router.currentRoute.value.name
    getList()
    nextTick(() => {
        isNavIconShow()
    })
    window.onresize = function () {
        isNavIconShow()
    }
})


//document.querySelector('.nav').scrollHeight
</script>

<style lang="less" scoped>
.header{
    display: flex;
    .header-bg{
        width: 560px;
        text-align: center;
        img {
            height: 70px;
            margin-top: 5px;
        }
    }
    .nav {
        position: relative;
        overflow: hidden;
        padding: 0 4vw;
        flex: 1;
        display: flex;
        height: 75px;
        color: rgba(32, 33, 36, 1);
        font-size: 20px ;
        justify-content: space-between;
        flex-basis: auto;
        flex-wrap: wrap;
        flex-grow: 1;
        flex-shrink: 1;
        .nav-item{
            cursor: pointer;
            line-height: 75px;
        }
        .active{
            color:rgba(2, 182, 205, 1);
            border-bottom: 3px solid;
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
        width: 50px;
        height: 60px;
        background: blue;
        right: 35px;
        top: 60px;
    }
}
.nav-icon {
    position: absolute;
    bottom: 0px;
    right: 30px;
    background: #eee;
    padding: 10px;
    border-radius: 10px;
}
</style>
