<template>
  <div class="press">
      <div class="wrtten" v-if="isWrittem=='supervisions'">
          <div class="title">Supervisions</div>
          <div class="supervisions">
            <div v-for="(item,index) in studentList" :key="index" class="super-mian">
              <div class="sortName" :style="{'color':titleColor(item.title)}">{{item.title}}</div>
              <div class="sortMain">
                  <div class="sortList" v-for="(obj,i) in item.list" :key="i">
                      <div class="left-ctn">
                        <div class="left" @click="openTo(obj.student_link)" :style="{backgroundImage:'url(' + obj.photo + ')'}" :class="{'noUrl':!obj.photo}"></div>
                      </div>
                      <div class="right">
                        <div class="date" :style="{'color':titleColor(item.title)}">{{obj.researchPeriod}}</div>
                        <div class="nickName" @click="openTo(obj.student_link)">{{obj.student}}</div>
                        <div class="text" @click="openTo(obj.intro_link)" v-html="obj.intro"></div>
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
                  <div class="media-image cuspointer" :style="{backgroundImage:'url(' + item.cover_url + ')'}" @click="openTo(item.course_link)" :class="{'noUrl':!item.cover_url}"></div>
                  <div class="course-parent">
                      <div class="bookCourse" @click="openTo(item.course_link)">{{item.course}}</div>
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
            console.log('test',studentList.value);
            
          }      
       })
    }catch{

    }
}

const openTo = (data:string) =>{
  if(data){
      window.open(data);
  }else{
    window.alert('No website，Coming soon')
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
.press{
  height: calc(100% - 75px);
  width: 100%;
  overflow: scroll;
  .wrtten{
    width: 1420px;
    margin: 0 auto;
    padding: 0 5vw;
    .title{
      margin-top: 3vh;
      font-weight: bold;
      font-size: 26px;
      color: rgba(32, 33, 36, 1);
    }
    .mediaList{
      margin-top: 4vh;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .media-item{
          border: 1px solid rgba(166, 166, 166, 0.6);
          box-shadow: 0px 2px 6px rgba(166, 166, 166, 0.2);
          border-radius: 6px;
          width: 420px;
          margin-right: 3vw;
          margin-bottom: 6vh;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .date{
            padding: 12px 0 12px 25px;
            color: rgba(32, 33, 36, 1);
            font-size: 18px;
          }
          .media-image{
            height: 230px;
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
            border-top: 1px solid rgba(166, 166, 166, 0.2);
            border-bottom: 1px solid rgba(166, 166, 166, 0.2);
          }
          .cuspointer{
            cursor: pointer;
          }
          .text{
            padding: 12px 25px;
            height: 85px;
            overflow: auto;
            color: rgba(32, 33, 36, 1);
            font-size: 18px;
            line-height: 28px;
          }
          .video-date{
            padding: 10px 25px 20px 25px;
            color: rgba(112, 117, 122, 0.9);
            font-size: 18px;
          }
          .operation{
            padding: 12px 25px;
            display: flex;
            justify-content: right;
            .opration-item{
              color: rgba(2, 182, 205, 1);
              font-size: 18px;
              margin-right: 15px;
              cursor: pointer;
            }
            .more-img{
              width: 25px;
              height: 25px;
              cursor: pointer;
              img{
                width: 100%;
                height: 100%;
              }
            }
          }
      }
      .media-item:nth-child(3n){
        margin-right: 0;
      }
    }
  }
  .video{
    width: 1420px;
  }
  .video .mediaList .media-item .text{
    min-height: 60px;
  }
  .noUrl{
    background: rgba(229, 229, 229, 1);
  }
  .course-parent{
    display: flex;
    flex-direction: column;
    padding: 30px 20px 20px 20px;
    .bookCourse{
      font-family: Roboto;
      color: rgba(32, 33, 36, 1);
      font-size: 20px;
      font-weight: 500;
      margin-bottom: 10px;
      cursor: pointer;
    }
    :deep(.intro){
      color: rgba(112, 117, 122, 0.9);
      font-weight: 400;
      font-family: Roboto;
      font-size: 18px;
      height: 80px;
      overflow: auto;
    }
    .time{
      color: rgba(112, 117, 122, 0.9);
      font-weight: 400;
      font-family: Roboto;
      font-size: 20px;
    }
  }
  .supervisions{
    margin-top: 2vh;
    .sortName{
      font-family: Roboto;
      font-weight: bold;
      font-size: 26px;
      margin-bottom: 20px;
    }
    .sortMain{
      display: flex;
      flex-wrap: wrap;
      .sortList{
            border: 1px solid rgba(166, 166, 166, 0.6);
            box-shadow: 0px 2px 6px rgba(166, 166, 166, 0.2);
            border-radius: 6px;
            width: 450px;
            margin: 0 30px 40px 0;
            display: flex;
          .left-ctn{
                flex-basis: 25%;
                margin: 35px 25px;
                margin-right: 0;
                .left{
                  width: 150px;
                  height: 150px;
                  cursor: pointer;
                  border-radius: 100%;
                  background-repeat: no-repeat;
                  background-position: center;
                  background-size: cover;
                }
            }
            .right{
              flex: 1;
              padding: 20px 20px 15px 20px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
                .date{
                  color: rgba(32, 33, 36, 1);
                  font-size: 14px;
                  font-family: Roboto;
                }
                .text{
                  height: 100px;
                  overflow: auto;
                  color: rgba(32, 33, 36, 0.9);
                  font-size: 14px;
                  line-height: 20px;
                  font-family: Roboto;
                  cursor: pointer;
                }
                .nickName{
                  color: rgba(32, 33, 36, 1);
                  font-size: 20px;
                  font-family: Roboto;
                  cursor: pointer;
                }
                .institution{
                  font-size: 12px;
                  text-align: right;
                  color: rgba(112, 117, 122, 0.9);
                }
            }
      }
      .sortList:last-child{
        margin-right: 0;
      }
    }
  }
}

</style>