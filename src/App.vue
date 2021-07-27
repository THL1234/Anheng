<template>
  <div id="app">
    <el-container>
      <side/>
      <el-container class="app_content">
        <el-header style="width:1268px;text-align: right; font-size: 12px;background-color: aqua">
          <el-button lain type="primary" style="margin-top: 10px;"><i class="el-icon-setting" style="margin-right: 15px"></i>退出</el-button>
        </el-header>
        <!-- 内容区域 -->
        <el-main style="background-color: mediumslateblue;width:1268px;">
          <!-- 二级路由跳转 -->
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import login from './components/Login.vue'
  import side from './components/Side.vue'
export default {
  name: 'App',
  components:{
    login,
    side
  },

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
