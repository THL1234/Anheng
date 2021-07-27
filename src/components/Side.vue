<template>
  <div style="height: 100%">
    <el-row class="tac" style="height: 100%">
      <el-col :span="3" style="height: 100%">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          @open="handleOpen"
          @close="handleClose">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>导航二</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1">选项4</el-menu-item>
              <el-menu-item index="2-2">选项5</el-menu-item>
              <el-menu-item index="2-3">选项6</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>导航三</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1">选项7</el-menu-item>
              <el-menu-item index="3-2">选项8</el-menu-item>
              <el-menu-item index="3-3">选项9</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>导航四</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="4-1">选项10</el-menu-item>
              <el-menu-item index="4-2">选项11</el-menu-item>
              <el-menu-item index="4-3">选项12</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
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
    width:250px;
  }

</style>
