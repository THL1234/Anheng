<template>
  <div style="height: 100%">
    <el-row class="tac" style="height: 100%">
      <el-col :span="3" style="height: 100%">
        <el-menu
          :default-active="$route.path"
          router
          class="el-menu-vertical-demo"
          background-color="rgb(48, 65, 86)"
          @open="handleOpen"
          @close="handleClose">
          <el-menu-item index="/all/table">
            <i class="el-icon-menu"></i>
            <span slot="title" class="MenuText">用户管理</span>
          </el-menu-item>
          <el-menu-item index="/all/dataAnalysis">
            <i class="el-icon-setting"></i>
            <span slot="title" class="MenuText">数据分析</span>
          </el-menu-item>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span class="MenuText">数据列表</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1"><span class="MenuText">个人数据列表</span></el-menu-item>
              <el-menu-item index="1-2"><span class="MenuText">整体数据列表</span></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="4">
            <i class="el-icon-s-data"></i>
            <span slot="title" class="MenuText">请求管理</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'side',
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped>
  .el-menu-vertical-demo{
    height: 1600px;
    width:200px;
  }

  .MenuText{
    color:rgb(191, 203, 217);
  }

  .el-menu-item.is-active{
    color: #5560f4 !important;
  }
</style>
