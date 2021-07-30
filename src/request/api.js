import request from './request'
//按需导出每个请求
console.log('request', request)
export default{
//1 请求用户列表
  GetListAPI(){
    const req = request({
      method:'get',
      url:'/msg2'
    })
    return req
  },

  //2 登陆界面按钮
  LoginAPI(params){
    console.log(params)
    const req=request({
      method:'post',
      url:'/login',
      data:params
    })
    return req
  },

  //第三方登录请求
  SanfangLoginAPI(params){
    const req=request({
      method:'post',
      url:'/sanfang',
      data:params
    })
    return req
  },

  //初始化地图数据
  MapAPI(){
    const req=request({
      method:'get',
      url:'/Login_Data/GetLogin_NumByAddress',
    })
    return req
  }
}
