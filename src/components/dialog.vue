<template>
  <el-dialog title="添加用户" :visible.sync="addBox" width="50%" :before-close="handleClose">
    <el-form ref="form" label-width="100px" v-model="addUserData">
      <el-form-item label="名字">
        <el-input placeholder="新用户姓名" maxlength="50" v-model = "addUserData.name"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input placeholder="密码" maxlength="50" v-model = "addUserData.pass"></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input placeholder="确认密码:" maxlength="50" v-model = "addUserData.check"></el-input>
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
</template>

<script>
  export default{
    name:'dialog',
    data(){
      return{
        options: [{
          value: '选项1',
          label: '浙江省'
        }, {
          value: '选项2',
          label: '安徽省'
        }, {
          value: '选项3',
          label: '湖北省'
        }],
        addUserData:{
           name:'',
           pass:'',
           check:''
        }
      }
    },
    methods:{
      handleAddUser(){

      },
    }
  }
</script>
