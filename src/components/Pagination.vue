<template>
  <el-pagination
    background
    layout="prev, pager, next"
    :total="1000"
    class="pag">
  </el-pagination>
</template>

<script>
  export default {
    name: 'pagination',
  };

</script>

<style>
 .pag{
   margin-left: 380px;
   margin-top: 30px;
 }

</style>
