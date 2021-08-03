//这份文件是用来拦截的
import axios from 'axios';
import { Message } from 'element-ui';
import router from '../router/index.js'

//创建一个单例
//const instance = axios.create({
/*  baseURL:"http://172.20.10.6:8888", */
// timeout:5000,
// withCredentials:true
//})

//拦截器
//请求拦截
axios.interceptors.request.use(
  (config)=>{
    /*     if(window.sessionStorage.getItem('tokenStr')){
           config.headers['Authorization']=window.sessionStorage
         }

        if(token){
            config.headers={
                'token':token
            }
        }*/
    return config
  },err=>{
    return Promise.reject(err)
  }
)


//响应拦截
axios.interceptors.response.use(
  res=>{
    if( res.status&&res.status == 200){
      if(res.data.code === 401 || res.data.code === 403){
        Message.error({message: res.data.message});
        /*     return; */
      } else if (res.data.code === 200) {
        Message.success({ message: res.data.message })
        router.replace('/all');
      }
      else if (res.data.code === 249) {
        Message.error({ message: res.data.message })
        router.replace('/login')
        return
      }
      else if (res.data.code === 251) {
        Message.error({ message: res.data.message })
        router.replace('/login')
        return
      }
      /*   else if (res.data.code === 252) {
          Message.error({ message: res.data.message })
             return
        } */
      else if (res.data.code === 253) {
        /*    Message.error({ message: res.data.message }) */
        router.replace('/login')
        return
      }/* else{
            setTimeout(function (){
            self.$router.replace('/all');
        },  800) */

    }
    return res
  },error=>{
    if(error.response.code==504||error.response.data.code==404){
      Message.error({message: error.response.data.message})
    }else if(error.response.code==403){
      Message.error({message: '权限不足，请联系管理员'})
    }else if(error.response.code==401){
      Message.error({message: '尚未登录'})
      router.replace('/login')
    }else{
      if(error.response.data.message){
        Message.error({message:error.response.data.message})
      }else{
        Message.error({message:'未知的错误!'})
      }
    }
    return;
  }
)

export default axios
