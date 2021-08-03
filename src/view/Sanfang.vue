<template>
  <div>
    <div style="display: flex;justify-content: center;background-color: aliceblue;height: 1300px;">
      <el-card id="el-card">
        <div slot="header" class="clearfix">
          <span style="margin-left: 140px;font-size:23px;">第三方登录</span>
        </div>
        <table class="table1">
          <tr>
            <td>用户名</td>
            <td>
              <el-input class="el-input" v-model="user.requestName" placeholder="请输入用户名"></el-input>
            </td>
          </tr>

          <tr>
            <td>手机号</td>
            <td>
              <el-input class="el-input" type="password"  v-model="user.requestPhoneNum" placeholder="请输入手机号"></el-input>
              <!-- @keydown.enter.native="doLogin"当按下enter键的时候也会执行doLogin方法-->
            </td>
          </tr>

          <tr>
            <td>请求角色</td>
            <td>
              <el-select v-model="user.role_Id" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </td>
          </tr>

          <tr>
            <td>被请求者手机号</td>
            <td>
              <el-input class="el-input" type="password" v-model="user.responsePhoneNum" placeholder="被请求者手机号" @keydown.enter.native="doLogin"></el-input>
            </td>
          </tr>

          <tr>
            <!-- 占两行-->
            <td colspan="2">
                <div style="margin-left: 60px">
                  <el-button style="width: 100px" type="primary" @click="doLogin">登录</el-button>
                  <el-button style="width: 100px" type="primary" @click="retu">取消</el-button>
              </div>
            </td>
          </tr>
        </table>
      </el-card>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    name:'sanfang',
    data() {
      //相当于以前的function data(){},这是es5之前的写法，新版本可以省略掉function
      return{
        options: [{
          value: '1',
          label: '省级干部'
        }, {
          value: '2',
          label: '市级干部'
        }, {
          value: '3',
          label: '同志'
        }],
        value:'',
        user:{
          requestName:'',
          requestPhoneNum:'',
          responsePhoneNum:'',
          role_Id:''
        }
      }
    },
    methods:{
      doLogin(){
        if(this.user.requestName.length==0||this.user.requestPhoneNum.length==0||this.user.responsePhoneNum.length==0||this.user.role_Id.length==0){
           this.$message.error("请输入完整信息");
        }else {
          window.localStorage.setItem('Sanfanglogin',JSON.stringify(this.user))  //将三方登录信息存入浏览器
          self=this;
          axios.post('http://10.11.32.195:7002/provider/request',this.user).then(res=>{
            window.localStorage.setItem('role',"第三方用户");
            window.localStorage.setItem('token','tempory');
            self.$router.replace('/all/demand')
          })

        }
      },

      retu(){
        this.$router.push('/login');
      }
    }
  }
</script>

<style scoped>
  .table1{
    border-collapse: separate;
    border-spacing:19px;
    table-layout:auto !important;
  }

  #el-card{
    width: 430px;
    height: 430px;
    border-radius: 12px;
    margin-left: 100px;
    margin-top: 140px;
    box-shadow: 0 15px 25px 0 rgba(0, 0, 0, .6);
  }

  .el-input{
    width: 250px;
  }


</style>
