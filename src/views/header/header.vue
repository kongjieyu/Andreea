<template>
    <div class="header">
        <div class="header-bg">
            <img src="../../../public/static/image/header.png" alt="photo">
        </div>
        <div class="nav">
            <div class="nav-item" :class="{'active':currentAtive==item}" v-for="(item,index) in navList"  @click="changeTab(item)" :key="index">{{item}}</div>
            <!-- <div class="nav-item circle-es">...</div> -->
        </div>
        <!-- <div class="expand-show">other</div> -->
    </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref,watchEffect} from "vue";
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

onMounted(()=>{
    currentAtive.value = <any>router.currentRoute.value.name
    getList()
})

</script>

<style lang="less" scoped>
.header{
    display: flex;
    height: 75px;
    position: relative;
    .header-bg{
        flex: 0 0 560px;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
            height: 70px;
            margin-top: 5px;
        }
    }
    .nav{
        flex: 1;
        display: flex;
        font-family: "Roboto";
        color: rgba(32, 33, 36, 1);
        font-size: 20px ;
        margin: 0 4.5vw 0 5vw;
        justify-content: space-between;
        flex: 1;
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
</style>>
