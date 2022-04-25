<template>
    <div class="header">
        <div class="header-bg">
            <img src="../../../public/static/image/header.png" alt="photo">
        </div>
        <div class="nav">
            <div class="nav-item" :class="{'active':currentAtive==item}" v-for="(item,index) in navList"  @click="changeTab(item)" :key="index">{{item}}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import { useRouter} from 'vue-router'
const router = useRouter();
const navList:any= ref([]) //头部导航栏
const currentAtive = ref('Home')

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
    .header-bg{
        width:30vw;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
            width:26vw;
        }
    }
    .nav{
        display: flex;
        font-family: "Roboto";
        color: rgba(32, 33, 36, 1);
        font-size: 22px ;
        justify-content: space-evenly;
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
}
</style>>
