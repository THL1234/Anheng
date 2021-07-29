<template>
  <div>
    <el-container>
      <el-aside width="190px"><side></side></el-aside>
      <el-container class="app_content">
        <!--头部区域-->
        <el-header style="box-shadow: 0 1px 2px rgba(205,205,205,205);height: 70px;">
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" style="margin-top: 20px;margin-left: 1180px;"></el-avatar>
           <div style="float:right;margin-top: 30px;margin-right: 0px;">
             <el-dropdown>
              <span class="el-dropdown-link">
                用户名<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
               <el-dropdown-menu slot="dropdown">
                 <el-dropdown-item>用户名</el-dropdown-item>
                 <el-dropdown-item>电话</el-dropdown-item>
                 <el-dropdown-item @click.native="quit()">退出登录</el-dropdown-item>
               </el-dropdown-menu>
             </el-dropdown>
           </div>
        </el-header>

        <!-- 内容区域 -->
        <el-main style="width:1320px;">
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import side from '../components/Side.vue'
  import tabledata from '../components/Table.vue'
  export default {
    name: 'all',
    components:{
      side,
      tabledata
    },
    methods:{
      quit(){
        window.localStorage.setItem('token',null);
        this.$message.success("欢迎您下次登录");
        this.$router.replace('/login')
      }
    }
  }
</script>

<style>
  .app_content {
    min-height: 500px;
    margin-left: 0px;
    border: 1px solid #eee;
    box-sizing: border-box;
  }
</style>

