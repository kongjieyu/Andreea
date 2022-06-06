<template>
  <div class="press">
      <div class="changeBtn">
        <span @click="changeTab('Courses')" :class="{'active': current == 'Courses'}">Courses</span>
        <span @click="changeTab('Supervisions')" :class="{'active': current == 'Supervisions'}">Supervisions</span>
      </div>
      <div class="wrtten" v-if="isWrittem=='supervisions'">
          <div class="title">Supervisions</div>
          <div class="supervisions">
            <div v-for="(item,index) in studentList" :key="index" class="super-mian">
              <div class="sortName" :style="{'color':titleColor(item.title)}">{{item.title}}</div>
              <div class="sortMain">
                  <div class="sortList" v-for="(obj,i) in item.list" :key="i">
                      <div class="left-ctn">
                        <div class="left" @click="openTo(obj.student_link)" v-lazy:background-image="{src: obj.photo}" :key="obj.photo"  :class="{'noUrl':!obj.photo,'curson':obj.student_link}"></div>
                        <div class="nickName" :class="{'curson':obj.student_link}"  @click="openTo(obj.student_link)">{{obj.student}}</div>
                      </div>
                      <div class="right">
                        <div class="date" :style="{'color':titleColor(item.title)}">{{obj.researchPeriod}}</div>
                        <div class="nickName"  :class="{'curson':obj.student_link}"  @click="openTo(obj.student_link)">{{obj.student}}</div>
                        <div class="text" :class="{'curson':obj.intro_link}" @click="openTo(obj.intro_link)" v-html="obj.intro"></div>
                        <div class="institution">{{obj.institution}}</div>
                      </div>
                  </div>
              </div>
            </div>
          </div>
      </div>
      <div class="wrtten video" v-if="isWrittem=='courses'">
            <div class="title">Courses</div>
            <div class="mediaList">
              <div v-for="(item,index) in mediaList" :key="index" class="media-item">
                  <!-- <div class="date">{{item.date}}</div> -->
                  <div class="media-image" v-lazy:background-image="{src: item.cover_url}" :key="item.cover_url"  @click="openTo(item.course_link)" :class="{'noUrl':!item.cover_url,'curson': item.course_link}"></div>
                  <div class="course-parent">
                      <div class="bookCourse" :class="{'curson': item.course_link}" @click="openTo(item.course_link)">{{item.course}}</div>
                      <div class="intro" v-html="item.courseIntro"></div>
                      <div class="time">{{item.year}}</div>
                  </div>
              </div>
            </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { log } from "console";
import {onMounted, reactive, ref,toRaw,watchEffect,watch} from "vue";
import { useRoute,useRouter} from 'vue-router'

const route = useRoute()
const router = useRouter();
const current = ref('Courses')
onMounted(() => {
    isWrittem.value = 'courses'
    getListData('courses')
})
const isWrittem = ref('') //类型
watch(
      () => route.params,
      (val, oval) => {
            if(oval.type=='Courses'){ //Courses
              isWrittem.value = 'courses'
              getListData('courses')
            }else{  //Supervisions
              isWrittem.value = 'supervisions'
              getListData('supervisions')
            }
      }
);
watchEffect(()=>{
  if(isWrittem.value == 'supervisions'){
      current.value = 'Supervisions'
  }else{
    current.value = 'Courses'
  }
})

const mediaList:any = ref([])   //Courses
const studentList:any = ref([]) //Supervisions
//获取数据
const getListData = (type:any) =>{ 
    try{
       axios.get(`/static/json/${type}.json`).then(response=>{
          if(type=='courses'){//Courses
              mediaList.value = response.data.Courses
              mediaList.value&&mediaList.value.forEach((item:any)=>{
                item.courseIntro = item.courseIntro.replace(/\n/g,'<br>')
              })
          }else{//Supervisions
            studentList.value=[]
            let data = toRaw(response.data)
            for(let key in data){
              for(let child in data[key]){
                studentList.value.push({
                  title:child,
                  list:data[key][child]
                })
              }
            }
            // console.log('test',studentList.value);
            
          }      
       })
    }catch{

    }
}
const changeTab = (data:any)=>{
  current.value = data
  if(data=='Courses'){ //Courses
    isWrittem.value = 'courses'
    getListData('courses')
  }else{  //Supervisions
    isWrittem.value = 'supervisions'
    getListData('supervisions')
  }
}
const openTo = (data:string) =>{
  if(data){
      window.open(data);
  }
}
//标题颜色
const titleColor=(color:any)=>{
  switch (color){
    case 'Ph.D': return 'rgba(255, 195, 0, 1)';break
    case 'Master': return 'rgba(2, 182, 205, 1)';break;
    case 'Honors': return 'rgba(181, 108, 212, 1)';break;
    case 'Summer Scholarships': return 'rgba(250, 145, 40, 1)';break;
  }
}
</script>

<style lang="less" scoped>
@import url(@/style/teaching.less);
</style>