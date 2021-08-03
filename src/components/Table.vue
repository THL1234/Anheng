<template>
  <div>
    <!--添加新信息-->
    <el-button type="success" plain @click="handleAddClick" style="margin-left:0px;">增加新用户</el-button>
    <!--<el-button type="success" plain @click="mockdata()" style="margin-left:180px;">刷新</el-button>-->
    <el-table
      :data="tableData"
      border
      style="width: 100%;margin-top: 30px;">
      <el-table-column
        prop="username"
        label="姓名"
        width="260">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="电话"
        width="260">
      </el-table-column>

      <el-table-column
        prop="affiliation"
        label="管辖范围"
        width="260">
      </el-table-column>
      <el-table-column
        prop="role_Name"
        label="所属级别">
      </el-table-column>


      <el-table-column label="操作" width="240">
        <template slot-scope="scope">
          <el-button type="primary" @click="handleEditClick(scope.$index,scope.row)"  size="mini">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDelClick(scope.$index,scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="修改用户" :visible.sync="editBox" width="50%" :before-close="handleClose">
      <el-form ref="form" label-width="100px" v-model="user">
        <el-form-item label="姓名:">
          <el-input placeholder="请输入姓名" maxlength="50" v-model = "user.name"></el-input>
        </el-form-item>
        <el-form-item label="密码:">
          <el-input placeholder="请输入密码" maxlength="50" v-model = "user.telephone"></el-input>
        </el-form-item>
        <el-form-item label="电话:">
          <el-input placeholder="请输入电话" maxlength="50" v-model = "user.telephone"></el-input>
        </el-form-item>
        <el-form-item label="权限:">
          <el-select v-model="value1" placeholder="选择省份" @change="changeProvince()">
            <el-option
              v-for="item in option1"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

          <el-select v-model="value2" placeholder="选择市" @change="changeCity()">
            <el-option
              v-for="item in option2"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

          <el-select v-model="value3" placeholder="选择区">
            <el-option
              v-for="item in option3"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色">
          <el-radio-group v-model="radio">
            <el-radio :label="3">省长</el-radio>
            <el-radio :label="6">市长</el-radio>
            <el-radio :label="9">区长</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleEditUser">确 定</el-button>
            </span>
    </el-dialog>

    <!--对话框组件-->
    <el-dialog title="添加用户" :visible.sync="addBox" width="50%" :before-close="handleClose">
      <el-form ref="form" label-width="100px" v-model="addUserData">
        <el-form-item label="姓名">
          <el-input placeholder="新用户姓名" maxlength="50" v-model = "addUserData.name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input placeholder="密码" maxlength="50" v-model = "addUserData.name"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input placeholder="新用户电话:" maxlength="50" v-model = "addUserData.name"></el-input>
        </el-form-item>
        <el-form-item label="选择地区">
<!--          <el-select v-model="value1" placeholder="选择省份" @change="changeProvince()">
            <el-option
              v-for="item in option1"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

          <el-select v-model="value2" placeholder="选择市" @change="changeCity()">
            <el-option
              v-for="item in option2"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

          <el-select v-model="value3" placeholder="选择区">
            <el-option
              v-for="item in option3"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>-->
        </el-form-item>
        <el-form-item label="角色">
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

    <el-pagination
      background
      layout="prev, pager, next"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      style="margin-left: 540px;margin-top: 50px;"
      :total="total"
      class="pag">
    </el-pagination>
  </div>
</template>


<script>
  import axios from 'axios'
  export default {
    name: "tabledata",
    data() {
      return{
        radio: 3,
        tableData:[],
        total:0,
        addBox : false,
        editBox:false,
        user:{},
        editIndex:"",
        addUserData:{
          date : "",
          name : "",
          address : "",
        },
        currentPage:1,  //定义页数
        option1:[],
        option2:[],
        option3:[],
        value1:'',
        value2:'',
        value3:''
      }
    },

    created(){
      var self=this
      axios.get('http://10.11.47.145:8081/Manage/getUser?page=1&address=浙江省').then(res=>{
        console.log(res.data)
        var tableData=res.data.data.users;
        self.total=res.data.data.pages*10;  //定义页数
           for(var i=0;i<tableData.length;i++){
             var singledata=new Object();
             singledata.username=tableData[i].username;
             singledata.affiliation=tableData[i].affiliation;
             singledata.phone=tableData[i].phone;
             singledata.role_Name=tableData[i].role.role_Name;
             singledata.user_Id=tableData[i].user_Id;
             self.tableData.push(singledata);
           }
      })
    },

    methods:{

      //每页显示的条数
      handleSizeChange(val){
        this.getData(1)
        this.currentPage = 1
      },
      //显示第几页
      handleCurrentChange(val){
        this.currentPage = val
        this.getData(val)
      },
      handleEditClick(index,row){
        console.log(111,row);
        this.editBox = true
        this.user = row
        this.editIndex = index
      },

      // eslint-disable-next-line no-unused-vars
      handleDelClick(index,row){
        var user_Id=row.user_Id;
        var page=this.currentPage;
        var self=this;
        this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            axios.get('http://10.11.47.145:8081/Manage/deleteUserById?page='+page+"&user_Id="+user_Id+"&address=浙江").then(res =>{
            self.tableData=[];
            self.total=res.data.data.pages*10;
            var tableData=res.data.data.users;
            for(var i=0;i<tableData.length;i++){
              var singledata=new Object();
              singledata.username=tableData[i].username;
              singledata.affiliation=tableData[i].affiliation;
              singledata.phone=tableData[i].phone;
              singledata.role_Name=tableData[i].role.role_Name;
              singledata.user_Id=tableData[i].user_Id;
              self.tableData.push(singledata);
            }
          })
          this.$message({showClose: true, message: "删除成功", type: 'success'});
        })
      },
      handleClose(done) {
        done();
      },
      handleEditUser(){
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
      getdata(){
        axios.get('/msg1').then(function(response){
          this.tableData=response.data
          console.log(typeof(response.data.data[1]))
          console.log(response.data.data[1])
        })
      }
    }
  }

</script>

<style scoped>

</style>
