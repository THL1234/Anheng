<template>
  <div id="back">
    <br><br><br><br><br><br><br><br><br><br>
    <div class="loginBox">
      <h1>login</h1>
      <form action="" @submit.prevent="onSubmit">
        <div class="item">
          <span>用户名</span>
          <el-input v-model="info.phone" placeholder="请输入用户名"></el-input>
        </div>
        <div class="item">
          <span>密码</span>
          <el-input  type="password" v-model="info.password" placeholder="请输入密码"></el-input>
        </div>
        <el-button class="btn" type="primary" @click="loadBtn()" plain>登录</el-button><br>
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
  import axios from 'axios'
  export default {
    inject:['reload'],
    name:'login',
    data(){
      return{
        info:{
          phone:'15068598954',
          password:'0123',
          ip:'115.159.55.236',
          mac:'mac2'
        },
        code:'',
      }
    },
    mounted(){

    },
    methods:{
      //登录事件
      loadBtn(){
        // 我暂时就不模拟了，直接取
         /* console.log(returnCitySN);*/
          if(this.info.phone.length==0||this.info.password.length==0){
            this.$message.error("请输入完整用户名和密码");
          }else{
            var self=this;
            axios.post('http://10.11.47.145:8081/User/login',this.info).then(res=>{
              console.log(res)
              if(res.data.code==200){
                this.$message.success(res.data.message);
                var token = res.data.data.token;
                var role="老板";
                window.localStorage.setItem('token',token)
                window.localStorage.setItem('role',role);
                window.localStorage.setItem('userPhone',self.info.phone)
                window.localStorage.setItem('affiliation',res.data.affiliation)
                setTimeout(function (){
                  self.$router.replace('/all');
                }, 800);
              }else{
                this.$message.error(res.data.message);
              }
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
    color:#2a2a2a;
  }

  #back{
    width:100%;
    height: 1000px;
    margin-top: -200px;
    background-color: aliceblue;
   /* background-image: url(../assets/canvas.jpg);*/
  }

  label{
    color:#2a2a2a;
  }

  .loginBox {
    width: 400px;
    height: 380px;
    background-color: #ffffff;
    margin-left: 580px;
    margin-top: 160px;
    border-radius: 10px;
    box-shadow: 0 15px 25px 0 rgba(0, 0, 0, .6);
    padding: 40px;
    box-sizing: border-box;
  }

  h1 {
    text-align: center;
    color: #2a2a2a;
    margin-bottom: 30px;
    font-family: 'Courier New', Courier, monospace;
  }

  .item {
    display:flex;
    height: 45px;
    border-bottom: 1px solid #fff;
    margin-bottom: 25px;
    position: relative;
  }

  .item span{
    width:70px;
    margin-top: 10px;
    margin-left: -20px;
  }

  .item el-input {
    width: 200px;
    height: 50px;
    color: #2a2a2a;
    padding-top: 20px;
    box-sizing: border-box;
  }

  .item label {
    position: absolute;
    left: 0;
    top: 12px;
    transition: all 0.5s linear;
  }

  .btn{
    margin-left: 120px;
    width:80px;
    height: 40px;
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
