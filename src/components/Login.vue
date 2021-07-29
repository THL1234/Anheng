<template>
  <div id="back">
    <br><br><br><br><br><br><br><br><br><br>
    <div class="loginBox">
      <h2>login</h2>
      <form action="" @submit.prevent="onSubmit">
        <div class="item">
          <input type="text" v-model="info.user">
          <label for="">用户名</label>
        </div>
        <div class="item">
          <input type="password" v-model="info.pass">
          <label for="">密码</label>
        </div>
      <!--  <div class="item" style="width: 160px!important;">
          <input type="text" v-model="code">
          <label for="">验证码</label>
          <img :src="catpChaurl">
        </div>-->
        <button class="btn" @click="loadBtn()">登录
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </button><br>
        <div style="margin-left: 76px;margin-top:35px;">
          <a v-on:mouseover="changelong()" v-on:mouseout="changeshort()" @click="transfer()">还没账号?请求第三方登录</a>
          <div style="margin-right:60px;">
            <div ref="line" id="line"></div><br><br>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import textAPI from '../request/api.js'
  export default {
    inject:['reload'],
    name:'login',
    data(){
      return{
        info:{
          user:'',
          pass:'',
        },
        code:'',
        backgroundImage:'url(../assets/bg.jpg)'
      }
    },
    methods:{
      //登录事件
      loadBtn(){
        // 我暂时就不模拟了，直接取
          if(this.info.user.length==0||this.info.pass.length==0){
            this.$message.error("请输入完整用户名和密码");
          }else{
            //axios发送请求
            self=this;
            textAPI.LoginAPI(this.info).then(res=>{
              //存储token到localStorage
              var token = res.data.data.username+res.data.data.phone;
              window.localStorage.setItem('token',token);
              setTimeout(function (){
                self.$router.replace('/all');
              }, 800)
          })

          }
        },

      //阻止表单提交
        onSubmit(){
          return false;
        },

        changelong(){
          this.$refs.line.style.width='183px';
        },

        changeshort(){
          this.$refs.line.style.width='0px';
        },

        transfer(){
          this.$router.push('/sanfang');
        }
      },
  };

</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
    color:#01ddff;
  }

  #back{
    width:100%;
    height: 1000px;
    margin-top: -200px;
    background: url("../assets/back.jpg") no-repeat;
  }

  input,
  button {
    background: transparent;
    border: 0;
    outline: none;
  }
  label{
    color:#01ddff;
  }

  .loginBox {
    width: 400px;
    height: 380px;
    background-color: #0c1622;
    margin-left: 600px;
    margin-top: 160px;
    border-radius: 10px;
    box-shadow: 0 15px 25px 0 rgba(0, 0, 0, .6);
    padding: 40px;
    box-sizing: border-box;
  }

  h2 {
    text-align: center;
    color: aliceblue;
    margin-bottom: 30px;
    font-family: 'Courier New', Courier, monospace;
  }

  .item {
    height: 45px;
    border-bottom: 1px solid #fff;
    margin-bottom: 25px;
    position: relative;
  }

  .item input {
    width: 100%;
    height: 100%;
    color: #fff;
    padding-top: 20px;
    box-sizing: border-box;
  }

  .item input:focus+label,
  .item input:valid+label {
    top: 0px;
    font-size: 16px;
  }

  .item label {
    position: absolute;
    left: 0;
    top: 12px;
    transition: all 0.5s linear;
  }

  .btn {
    padding: 10px 20px;
    margin-top: 10px;
    margin-left:20px;
    color: #03e9f4;
    position: relative;
    overflow: hidden;
    text-transform: uppercase;
    letter-spacing: 2px;
    left: 35%;
  }

  .btn:hover {
    border-radius: 5px;
    color: #fff;
    background: #03e9f4;
    box-shadow: 0 0 5px 0 #03e9f4,
    0 0 25px 0 #03e9f4,
    0 0 50px 0 #03e9f4,
    0 0 100px 0 #03e9f4;
    transition: all 1s linear;
  }

  .btn>span {
    position: absolute;
  }

  .btn>span:nth-child(1) {
    width: 100%;
    height: 2px;
    background: -webkit-linear-gradient(left, transparent, #03e9f4);
    left: -100%;
    top: 0px;
    animation: line1 1s linear infinite;
  }

  @keyframes line1 {

    50%,
    100% {
      left: 100%;
    }
  }

  .btn>span:nth-child(2) {
    width: 2px;
    height: 100%;
    background: -webkit-linear-gradient(top, transparent, #03e9f4);
    right: 0px;
    top: -100%;
    animation: line2 1s 0.25s linear infinite;
  }

  @keyframes line2 {

    50%,
    100% {
      top: 100%;
    }
  }

  .btn>span:nth-child(3) {
    width: 100%;
    height: 2px;
    background: -webkit-linear-gradient(left, #03e9f4, transparent);
    left: 100%;
    bottom: 0px;
    animation: line3 1s 0.75s linear infinite;
  }

  @keyframes line3 {
    50%,
    100% {
      left: -100%;
    }
  }

  .btn>span:nth-child(4) {
    width: 2px;
    height: 100%;
    background: -webkit-linear-gradient(top, transparent, #03e9f4);
    left: 0px;
    top: 100%;
    animation: line4 1s 1s linear infinite;
  }

  @keyframes line4 {
    50%,
    100% {
      top: -100%;
    }
  }

  #line{
    margin:0px auto;    /* 指产生的组件自适应居中,就产生了从中间到两边的动态效果 */
    margin-top: 10px;
    height: 2px;
    width:0px;
    background-color: #01ddff;
    transition: width 0.2s ;
  }
  </style>
