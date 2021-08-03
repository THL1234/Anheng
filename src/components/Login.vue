<template>
  <div id="back">
    <br><br><br><br><br><br><br><br><br><br>
    <div class="loginBox">
      <h1>分布式管理中心</h1>
      <form action="" @submit.prevent="onSubmit">
        <div class="item">
          <span style="font-weight: bold">用户名</span>
          <el-input v-model="info.phone" placeholder="请输入用户名"></el-input>
        </div>
        <div class="item">
          <span style="font-weight: bold">密码</span>
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
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>由于您两次登录ip地址不同，请您进行一次人脸识别，谢谢</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="cameraPreviewOpen()">确 定</el-button>
        </span>
    </el-dialog>
    <CameraPreview v-if="cameraPreviewVisible" name="cameraPreview" ref="cameraPreview" @refreshCameraPhoto="refreshCameraPhoto"></CameraPreview>
  </div>
</template>

<script>
  import { Message } from 'element-ui';
  import axios from '../request/request'
  import CameraPreview from '../components/cameraPreview.vue'
  export default {
    components:{CameraPreview},
    inject:['reload'],
    name:'login',
    data(){
      return{
        info:{
          phone:'',
          password:'',
          ip:'115.236.55.101',
          mac:'mac2'
        },
        code:'',
        dialogVisible: false,
        cameraPreviewVisible: false,
        picValueZero: '',
        params:{
          phone:'',
          password:'',
          ip:'',
          mac:'',
          face:''
        }
      }
    },
    mounted(){
      this.info.ip=returnCitySN.cip
    },
    methods:{
      cameraPreviewOpen(cameraType){
        this.dialogVisible = false
        this.cameraPreviewVisible = true
        this.$nextTick(() => {
          this.$refs.cameraPreview.init()
        });
      },
      refreshCameraPhoto(cameraPhoto){
        this.params.phone=this.info.phone
        this.params.password=this.info.password
        this.params.ip=this.info.ip
        this.params.mac=this.info.mac

        this.params.face=cameraPhoto

        let httpZp;
        axios.post('http://10.11.47.145:8081/User/face',{
          params:{
            imageFile: cameraPhoto,
            phone:self.info.phone,
            password:self.info.password,
            id:self.info.id,
            mac:'76-6E-69-E6-02-AD'
          }
        }).then((res) => {
          console.log(this.params)
          console.log(res)
          if (res.code !== 0) {
            return this.$message.error(res.msg)
          }
          httpZp = res.data.src;
          this.picValueZero = cameraPhoto;
        }).catch(() => {})
      },
      //登录事件
      loadBtn(){
        // 我暂时就不模拟了，直接取
        /* console.log(returnCitySN);*/

        if(this.info.phone.length==0||this.info.password.length==0){
          this.$message.error("请输入完整用户名和密码");
        }else{
          //axios发送请求
          self=this;
          axios.post('http://10.11.47.145/User/login',this.info).then(res=>{
            console.log(this.info)
            console.log(res)
            //存储token到localStorage
            var token = res.data.data.token;
            var role="老板";
            window.localStorage.setItem('token',token)
            window.localStorage.setItem('role',role);
            console.log(res.data.code)
            if(res.data.code===252){
              self.dialogVisible=true
            }/* else{
                setTimeout(function (){
                self.$router.replace('/all');
              }, 800) */
          })
        }
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
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
    height: 900px;
    margin-top: -200px;
    background-color: rgb(248, 255, 240);
    /* background-image: url(../assets/canvas.jpg);*/
    /*  background-image: url(../assets/1.jpg); */
  }

  label{
    color:#2a2a2a;
  }

  .loginBox {
    width: 400px;
    height: 380px;
    /* background-image: url(../assets/1.jpg); */
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
    margin-left: 90px;
    width:160px;
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
