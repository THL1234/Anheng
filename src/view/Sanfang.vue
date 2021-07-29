<template>
  <div>
    <div style="display: flex;justify-content: center;margin-top: 150px">
      <el-card style="width: 400px">
        <div slot="header" class="clearfix">
          <span style="margin-left: 140px;">第三方登录</span>
        </div>
        <table class="table1">
          <tr>
            <td>用户名:</td>
            <td>
              <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
            </td>
          </tr>

          <tr>
            <td>手机号:</td>
            <td>
              <el-input type="password" v-model="user.phone" placeholder="请输入手机号"></el-input>
              <!-- @keydown.enter.native="doLogin"当按下enter键的时候也会执行doLogin方法-->
            </td>
          </tr>

          <tr>
            <td>请求角色:</td>
            <td>
              <el-select v-model="value" placeholder="请选择">
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
            <td>被请求者手机号:</td>
            <td>
              <el-input type="password" v-model="user.invitednumber" placeholder="请输入密码" @keydown.enter.native="doLogin"></el-input>
            </td>
          </tr>

          <tr>
            <td>被请求者角色:</td>
            <td>
              <el-input type="password" v-model="user.invitedrole" placeholder="请输入密码" @keydown.enter.native="doLogin"></el-input>
              <!-- @keydown.enter.native="doLogin"当按下enter键的时候也会执行doLogin方法-->
            </td>
          </tr>


          <tr>
            <!-- 占两行-->
            <td colspan="2">
                <div style="margin-left: 60px">
                <el-button style="width: 100px" type="primary">取消</el-button>
                <el-button style="width: 100px" type="primary" @click="doLogin">登录</el-button>
              </div>
            </td>
          </tr>
        </table>
      </el-card>
    </div>
  </div>
</template>
<script>
  export default {
    name:'sanfang',
    data() {
      //相当于以前的function data(){},这是es5之前的写法，新版本可以省略掉function
      return{
        options: [{
          value: '选项1',
          label: '省级干部'
        }, {
          value: '选项2',
          label: '市级干部'
        }, {
          value: '选项3',
          label: '同志'
        }],
        value:'',
        user:{
          username:'',
          phone:'',
          invitednumber:'',
          invitedrole:''
        }
      }
    },
    methods:{
      doLogin(){//一点击登录按钮，这个方法就会执行


      }
    }
  }
</script>

<style scoped>
  .table1{
    border-collapse: separate;
    border-spacing:0 8px;
    table-layout:auto !important;
  }

</style>
