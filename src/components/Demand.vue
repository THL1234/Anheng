<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%;margin-top: 30px;">
      <el-table-column
        prop="invitedname"
        label="请求者姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="invitedphone"
        label="请求者电话"
        width="180">
      </el-table-column>
      <el-table-column
        prop="invitedrole"
        label="请求角色">
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" @click="handleEditClick(scope.$index,scope.row)"  size="mini">同意</el-button>
          <el-button type="danger" size="mini" @click="handleDelClick(scope.$index,scope.row)">拒绝</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="修改用户" :visible.sync="editBox" width="50%" :before-close="handleClose">
      <el-form ref="form" label-width="100px" v-model="user">
        <el-form-item label="时间:">
          <el-input placeholder="请输入时间" maxlength="50" v-model = "user.name"></el-input>
        </el-form-item>
        <el-form-item label="名字:">
          <el-input placeholder="请输入名字" maxlength="50" v-model = "user.telephone"></el-input>
        </el-form-item>
        <el-form-item label="地址:">
          <el-input placeholder="请输入地址" maxlength="50" v-model = "user.belong"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleEditUser">确 定</el-button>
            </span>
    </el-dialog>

    <!--对话框组件-->
    <el-dialog title="添加用户" :visible.sync="addBox" width="50%" :before-close="handleClose">
      <el-form ref="form" label-width="100px" v-model="addUserData">
        <el-form-item label="名字">
          <el-input placeholder="新用户姓名" maxlength="50" v-model = "addUserData.name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input placeholder="密码" maxlength="50" v-model = "addUserData.name"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input placeholder="确认密码:" maxlength="50" v-model = "addUserData.name"></el-input>
        </el-form-item>
        <el-form-item label="选择省份">
          <el-select placeholder="选择省份">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="权限">
          <el-radio-group v-model="radio">
            <el-radio :label="3">省长</el-radio>
            <el-radio :label="6">市长</el-radio>
            <el-radio :label="9">区长</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleAddUser">确 定</el-button>
            </span>
    </el-dialog>

  </div>
</template>


<script>
  export default {
    name: "demand",
    data() {
      return{
        radio: 3,
        tableData:[{
          invitedname:'唐海林',
          invitedphone:1312211,
          invitedrole:'海南海口',
        },{
          invitedname:'唐海林',
          invitedphone:1312211,
          invitedrole:'海南海口',
        }],
        input:'',
        addBox : false,
        editBox:false,
        user:{},
        editIndex:"",
        addUserData:{
          date : "",
          name : "",
          address : ""
        }
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
      handleClose(done) {
        done();
      },
      handleEditUser(){
        this.tableData.splice(this.editIndex,1,this.user)
        this.$message({showClose: true, message: "修改成功", type: 'success'});
        this.editBox = false
      },
      handleAddClick(){
        this.addBox = true
      },
      handleAddUser(){
        let strDate = dateFormat("YYYY-mm-dd",this.addUserData.date)
        this.addUserData.date = strDate
        this.tableData.push(this.addUserData)
        this.addBox = false
        this.addUserData = {}
        this.$message({showClose: true, message: "添加成功", type: 'success'});
      },
    }
  }

</script>

<style scoped>

</style>
