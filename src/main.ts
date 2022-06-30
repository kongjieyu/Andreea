import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import VueLazyLoad from 'vue-lazyload'
import "@/assets/text/text.css";
createApp(App).use(router).use(VueLazyLoad, {
    error: './static/image/default.png', // 此处是图片加载失败时候 显示的图片
    loading: './static/image/default.png', // 此处是图片加载中 显示的图片
    attempt: 6, // 加载一屏图片
    preLoad: 1.3, // 失败尝试次数
  }).mount('#app')

