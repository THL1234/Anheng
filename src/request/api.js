import request from './request'
//按需导出每个请求

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
    const req=request({
      method:'post',
      url:'/login',
      data:params
    })
    return req
  }
}
