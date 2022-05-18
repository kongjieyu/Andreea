import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: ()=>import('../views/main.vue'),
    children:[
      {
        path:'/home',
        name:'Home',
        component: ()=>import('../views/content/home.vue'),
      },
      {
        path:'/books',
        name:'Books',
        component: ()=>import('../views/content/books.vue'),
      },
      {
        path:'/consultancy',
        name:'Consultancy',
        component: ()=>import('../views/content/consultancy.vue'),
      },
      {
        path:'/press',
        name:'Press',
        component: ()=>import('../views/content/press.vue'),
      },
      {
        path:'/publications',
        name:'Publications',
        component: ()=>import('../views/content/publications.vue'),
      },
      {
        path:'/teaching',
        name:'Teaching',
        component: ()=>import('../views/content/teaching.vue'),
      },
      {
        path:'/funding',
        name:'Funding',
        component: ()=>import('../views/content/funding.vue'),
      },
      {
        path:'/interviews',
        name:'Interviews',
        component: ()=>import('../views/content/interviews.vue'),
      },
    ]
  },
];
// Home
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// // 路由全局前置守卫
// router.beforeEach((to, from, next) => {
//   // console.log("路由全局前置守卫", to, from);
//   next();
// });

// // 路由全局后置守卫
// router.afterEach((to, from, next) => {
//   console.log('路由全局后置守卫', to, from);
//   next();
// });

export default router;

