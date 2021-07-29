<template>
  <div>
    <!--选择省市区-->
    <span>省份:</span>
    <el-select v-model="value" placeholder="选择省份">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>

    <span>市:</span>
    <el-select v-model="value2" placeholder="选择市">
      <el-option
        v-for="item in options2"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>

    <span>区:</span>
    <el-select v-model="value3" placeholder="选择区">
      <el-option
        v-for="item in options3"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>

   <!-- 输入框-->
    <el-button icon="el-icon-search" circle style="margin-left:40px;"></el-button>
    <el-input v-model="input" placeholder="检索信息" style="width: 200px;"></el-input>

    <!--添加新信息-->
    <el-button type="success" plain @click="handleAddClick" style="margin-left:195px;">增加新用户</el-button>
    <!--<el-button type="success" plain @click="mockdata()" style="margin-left:180px;">刷新</el-button>-->
    <el-table
      :data="tableData"
      border
      style="width: 100%;margin-top: 30px;">
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="telephone"
        label="电话"
        width="180">
      </el-table-column>
      <el-table-column
        prop="belong"
        label="所属级别">
      </el-table-column>


      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" @click="handleEditClick(scope.$index,scope.row)"  size="mini">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDelClick(scope.$index,scope.row)">删除</el-button>
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
    name: "tabledata",
    data() {
      return{
        radio: 3,
        tableData:[{
          name:'唐海林',
          telephone:1312211,
          belong:'海南海口'
        },{
          name:'唐海林',
          telephone:1312211,
          belong:'海南海口'
        },{
          name:'唐海林',
          telephone:1312211,
          belong:'海南海口'
        },{
          name:'唐海林',
          telephone:1312211,
          belong:'海南海口'
        },{
          name:'唐海林',
          telephone:1312211,
          belong:'海南海口'
        },{
          name:'唐海林',
          telephone:1312211,
          belong:'海南海口'
        }],
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
        options2: [{
          value: '选项1',
          label: '杭州市'
        }, {
          value: '选项2',
          label: '宁波市'
        }, {
          value: '选项3',
          label: '温州市'
        },
          {
            value: '选项4',
            label: '嘉兴市'
          }],
        options3: [{
          value: '选项1',
          label: '上城区'
        }, {
          value: '选项2',
          label: '下城区'
        }, {
          value: '选项3',
          label: '江干区'
        },
          {
            value: '选项4',
            label: '西湖区'
          }],
        value: '',
        value2:'',
        value3:'',
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

      mockdata(){
        this.$axios.get('http://localhost:8081/test/city').then(res => {
          console.log(77, res)
          if (res.data) {
            this.cityList = res.data.cityList
          }
        })
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
      getdata(){
        axios.get('/msg1').then(function(response){
          this.tableData=response.data
          console.log(typeof(response.data.data[1]))
          console.log(response.data.data[1])
        })
      }
    }
  }

  function dateFormat(fmt, date) {
    let ret;
    const opt = {
      "Y+": date.getFullYear().toString(),        // 年
      "m+": (date.getMonth() + 1).toString(),     // 月
      "d+": date.getDate().toString(),            // 日
      "H+": date.getHours().toString(),           // 时
      "M+": date.getMinutes().toString(),         // 分
      "S+": date.getSeconds().toString()          // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
        fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
      }
    }
    return fmt;

  }
</script>

<style scoped>

</style>
