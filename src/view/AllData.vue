<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%;margin-top: 30px;">
      <el-table-column
        prop="name"
        label="省份"
        width="180">
      </el-table-column>
      <el-table-column
        prop="minvalue"
        label="最低"
        width="180">
      </el-table-column>
      <el-table-column
        prop="middlevalue"
        label="中位数">
      </el-table-column>
      <el-table-column
        prop="frequentmodule"
        label="访问频率最高模块">
      </el-table-column>

      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" @click="handleEditClick(scope.$index,scope.row)"  size="mini">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDelClick(scope.$index,scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>


<script>
  export default {
    name: "alldata",
    data() {
      return{
        radio: 3,
        tableData:[{
          name:'唐海林',
          minvalue:1312211,
          middlevalue:'海南海口',
          frequentmodule:'电脑城'
        },{
          name:'唐海林',
          minvalue:1312211,
          middlevalue:'海南海口',
          frequentmodule:'电脑城'
        }],
        input:'',
        addBox : false,
        editBox:false,
        user:{},
      }
    },
    methods:{
      handleEditClick(index,row){
        console.log(row);
        this.editBox = true
        this.user = row
        this.editIndex = index
      },
      // eslint-disable-next-line no-unused-vars
      handleDelClick(index,row){
        this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.tableData.splice(index,1)
          this.$message({showClose: true, message: "删除成功", type: 'success'});
        })
      },

      handleEditUser(){
        this.tableData.splice(this.editIndex,1,this.user)
        this.$message({showClose: true, message: "修改成功", type: 'success'});
        this.editBox = false
      },
      handleAddClick(){
        this.addBox = true
      }
    }
  }
</script>

<style scoped>

</style>

