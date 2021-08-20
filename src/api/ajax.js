//这个文件势对axios进行二次封装
//额外的让axios发送请求的时候，具有其他功能


import axios from "axios";
//引入nprogress相关的js和css
import NProgress from "nprogress";
import 'nprogress/nprogress.css'
import store from '@/store'

//以后只要是对axios二次封装，不会axios身上直接去封装，而是创建一个axios实例进行封装

// 1.配置基础路径和超时限制:
//axios.create()创建一个新的和axios具有相同功能的一个实例
const service = axios.create({
  baseURL: '/api',//设置，当前项目当中所有接口路径的公共路径部分，基础路径 
  timeout: 5000,//当ajax请求超过设置的这个时间，就会报错
})

// 2.添加进度条信息 nprogress
// 以后如果想要对axios添加额外的功能，或者给请求头添加额外的信息，必然用到axios的请求拦截器和响应拦截器

//请求拦截器，每个ajax请求都要经过这个拦截器去拦截
service.interceptors.request.use(
  //请求拦截器中，成功的回调
  (config) => {
    //config其实就是我们的请求报文
    //这个请求报文，最后一定要返回去， 因为还要继续往下走
    //在这里可以添加额外的功能，也可以给请求头添加需要的数据
    NProgress.start(); //开启进度条

    //请求头内部选哟添加临时标识，后期每个请求都会带上这个临时标识
    let userTempId = store.state.user.userTempId
    if(userTempId) {
      config.headers.userTempId = userTempId
    }

    return config
  },
  //请求拦截器中失败的回调一般不写，因为失败也就没有下文了
  // () => {}
);

//响应拦截器
// 返回的响应不再需要从data属性当中拿数据， 而是响应就是我们要的数据 ==> return response.data
service.interceptors.response.use(
  (response) => {
    //response其实就是我们的响应报文
    //我们也可以添加额外的功能或者对响应报文进行处理
    NProgress.done();//停止进度条

    return response.data
  },
  // 统一处理请求错误， 具体请求也可以选择处理或不处理
  (error) => {
    NProgress.done();//停止进度条

    //统一处理
    alert('发送ajax请求失败' + error.message || '未知错误')
    //统一处理完成后，这个错误可以让后面继续处理，也可以不处理
    //return Promise.reject(new Error('发生ajax请求失败'))//后面想继续处理这个错误，返回失败的promise，后期可通过catch继续处理
    //也可以不让后面继续处理，那就中断promise链
    return new Promise( () => {} ) //返回的是pending状态的promise， 代表中断promise链，后期也就没办法处理了
  }
);

export default service  //把封装好的axios实例，暴露出去，后面去用