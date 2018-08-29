<template>
  <div>
    <el-card class="box-card" style="height: 600px">
      <div slot="header" class="clearfix">
        <el-button
          type="primary"
          @click="addUserVisible = true"
          icon="el-icon-circle-plus">新增</el-button>
      </div>
      <el-dialog title="新建用户" :visible.sync="addUserVisible" width="500px">
        <el-form :model="form" :rules="rules" ref="form" label-width="80px">
          <el-form-item label="登录名" prop="logName">
            <el-input v-model="form.logName" placeholder="用户登录时的用户名"></el-input>
          </el-form-item>
          <el-form-item label="用户姓名" prop="name">
            <el-input v-model="form.name" auto-complete="off" placeholder="用户真实姓名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="form.password"
              id="password"
              auto-complete="off"
              type="password"
              style="width: 324px;"
              placeholder="用户登录时的密码"></el-input>
              <el-button
                icon="el-icon-view"
                @click="switchPwd"
                style="float: right;"></el-button>
          </el-form-item>
          <el-form-item label="手机" prop="phone">
            <el-input
              v-model="form.phone"
              auto-complete="off"
              placeholder="用户的联系号码，用来接收短信"></el-input>
          </el-form-item>
          <el-form-item label="职位" prop="position">
            <el-input
              v-model="form.position"
              auto-complete="off"
              placeholder="用户在公司的职位"></el-input>
          </el-form-item>
          <el-form-item label="用户角色" prop="role">
            <el-checkbox-group v-model="form.role">
              <el-checkbox label="管理员"></el-checkbox>
              <el-checkbox label="技术人员"></el-checkbox>
              <el-checkbox label="运维工程师"></el-checkbox>
              <el-checkbox label="审核人员"></el-checkbox>
              <el-checkbox label="任务分配"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addUserVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('form')">确 定</el-button>
        </div>
      </el-dialog>
      <el-table
        :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        stripe
        style="width: 100%;text-align: center;"
        height="440">
        <el-table-column
          type="index"
          label="#"
          width="180"
          header-align=center>
        </el-table-column>
        <el-table-column
          prop="logName"
          label="登录名"
          width="180"
          header-align=center>
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180"
          header-align=center>
        </el-table-column>
        <el-table-column
          prop="position"
          label="职位"
          header-align=center>
        </el-table-column>
        <el-table-column
          prop="edit"
          label="操作"
          header-align=center>
          <template slot-scope="scope">
            <el-button type="text" @click="editItem(scope.$index)">编辑</el-button>
            <el-button
              type="text"
              style="color: red"
              @click="deleteItem(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        style="float: right"
        :total="totalCount">
      </el-pagination>
      <el-dialog title="编辑用户" :visible.sync="editUserVisible" width="500px">
        <el-form :model="editForm" :rules="editRules" ref="editForm" label-width="80px">
          <el-form-item label="登录名" prop="logName">
            <el-input v-model="editForm.logName" placeholder="用户登录时的用户名"></el-input>
          </el-form-item>
          <el-form-item label="用户姓名" prop="name">
            <el-input v-model="editForm.name" auto-complete="off" placeholder="用户真实姓名"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="phone">
            <el-input
              v-model="editForm.phone"
              auto-complete="off"
              placeholder="用户的联系号码，用来接收短信"></el-input>
          </el-form-item>
          <el-form-item label="职位" prop="position">
            <el-input
              v-model="editForm.position"
              auto-complete="off"
              placeholder="用户在公司的职位"></el-input>
          </el-form-item>
          <el-form-item label="用户角色" prop="role">
            <el-checkbox-group v-model="editForm.role">
              <el-checkbox label="管理员"></el-checkbox>
              <el-checkbox label="技术人员"></el-checkbox>
              <el-checkbox label="运维工程师"></el-checkbox>
              <el-checkbox label="审核人员"></el-checkbox>
              <el-checkbox label="任务分配"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" style="float: left" @click="resetPwd">重置密码</el-button>
          <el-button @click="editUserVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitEditForm('editForm')">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="重置密码" :visible.sync="resetVisible" width="500px">
        <el-form :model="resetForm" :rules="resetRules" ref="resetForm" label-width="80px">
          <el-form-item label="原密码" prop="oldPassword">
            <el-input
              v-model="resetForm.oldPassword"
              auto-complete="off"
              type="password"
              style="width: 324px;"
              placeholder="用户原始密码"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input
              v-model="resetForm.newPassword"
              auto-complete="off"
              type="password"
              style="width: 324px;"
              placeholder="用户新密码"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="resetVisible = false;editUserVisible = true">取 消</el-button>
          <el-button type="primary" @click="resetPwdForm('resetForm')">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Crud',
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      totalCount: 1,
      form: {
        logName: '',
        name: '',
        password: '',
        phone: '',
        position: '',
        role: [],
      },
      rules: {
        logName: [
          { required: true, message: '请输入登录名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符' },
        ],
        name: [
          { required: true, message: '请输入用户姓名', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符' },
        ],
        phone: [
          // { required: true, message: '请输入活动名称', trigger: 'blur' },
          { len: 11, message: '长度为11' },
        ],
        position: [
          // { required: true, message: '请输入活动名称', trigger: 'blur' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
        ],
        role: [
          { type: 'array', required: true, message: '请至少选择一个用户角色', trigger: 'change' },
        ],
      },
      tableData: [{
        logName: '2016-05-02',
        name: '王小虎',
        password: '123456',
        phone: '12345612345',
        position: '总经理',
        role: ['管理员', '技术人员', '运维工程师', '任务分配', '审核人员'],
      }, {
        logName: '2016-05-02',
        name: '王小虎',
        password: '123456',
        phone: '12345612345',
        position: '总经理',
        role: [],
      }, {
        logName: '2016-05-02',
        name: '王小虎',
        password: '123456',
        phone: '12345612345',
        position: '总经理',
        role: [],
      }, {
        logName: '2016-05-02',
        name: '王小虎',
        password: '123456',
        phone: '12345612345',
        position: '总经理',
        role: [],
      }, {
        logName: '2016-05-02',
        name: '王小虎',
        password: '123456',
        phone: '12345612345',
        position: '总经理',
        role: [],
      }],
      addUserVisible: false,
      editUserVisible: false,
      editIndex: 0,
      editForm: {
        logName: '',
        name: '',
        password: '',
        phone: '',
        position: '',
        role: [],
      },
      editRules: {
        logName: [
          { required: true, message: '请输入登录名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符' },
        ],
        name: [
          { required: true, message: '请输入用户姓名', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符' },
        ],
        phone: [
          // { required: true, message: '请输入活动名称', trigger: 'blur' },
          { len: 11, message: '长度为11' },
        ],
        position: [
          // { required: true, message: '请输入活动名称', trigger: 'blur' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
        ],
        role: [
          { type: 'array', required: true, message: '请至少选择一个用户角色', trigger: 'change' },
        ],
      },
      resetVisible: false,
      resetForm: {
        oldPassword: '',
        newPassword: '',
      },
      resetRules: {
        oldPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符' },
        ],
        newPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符' },
        ],
      },
    };
  },
  created() {
    this.totalCount = this.tableData.length;
    // console.log(JSON.parse(localStorage.data));
    this.tableData = JSON.parse(localStorage.data);
    this.totalCount = JSON.parse(localStorage.data).length;
    // localStorage.clear();
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          this.addUserVisible = false;
          this.tableData.push({
            logName: this.form.logName,
            name: this.form.name,
            password: this.form.password,
            phone: this.form.phone,
            position: this.form.position,
            role: this.form.role,
          });
          this.$message({
            showClose: true,
            message: '添加成功！',
            type: 'success',
          });
          this.totalCount = this.tableData.length;
          this.form = {
            logName: '',
            name: '',
            password: '',
            phone: '',
            position: '',
            role: [],
          };
          localStorage.data = JSON.stringify(this.tableData);
          return true;
        }
        this.$message.error('添加失败！');
        return false;
      });
    },
    switchPwd() {
      const showPwd = document.getElementById('password');
      if (showPwd.type === 'password') {
        showPwd.type = 'text';
      } else if (showPwd.type === 'text') {
        showPwd.type = 'password';
      }
    },
    deleteItem(index) {
      this.tableData.splice(index, 1);
      this.$message({
        showClose: true,
        message: '删除成功！',
        type: 'success',
      });
      localStorage.data = JSON.stringify(this.tableData);
    },
    editItem(index) {
      this.editUserVisible = true;
      this.editForm = this.tableData[index];
      // console.log(this.editForm);
      this.editIndex = index;
    },
    submitEditForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          // this.editVisible = false;
          const index = this.editIndex;
          this.tableData[index].logName = this.editForm.logName;
          this.tableData[index].name = this.editForm.name;
          this.tableData[index].phone = this.editForm.phone;
          this.tableData[index].position = this.editForm.position;
          this.tableData[index].role = this.editForm.role;
          this.$message({
            showClose: true,
            message: '编辑成功！',
            type: 'success',
          });
          this.editUserVisible = false;
          localStorage.data = JSON.stringify(this.tableData);
          return true;
        }
        this.$message.error('编辑失败！');
        return false;
      });
    },
    resetPwd() {
      this.editUserVisible = false;
      this.resetVisible = true;
      this.resetForm = {
        oldPassword: '',
        newPassword: '',
      };
    },
    resetPwdForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          // this.editVisible = false;
          const index = this.editIndex;
          if (this.resetForm.oldPassword === this.tableData[index].password) {
            this.tableData[index].password = this.resetForm.newPassword;
            this.resetVisible = false;
            this.$message({
              showClose: true,
              message: '重置成功！',
              type: 'success',
            });
            // this.$message.error('请输入正确的原密码！');
            // this.editUserVisible = true;
            localStorage.data = JSON.stringify(this.tableData);
          } else {
            this.$message.error('请输入正确的原密码！');
          }
        }
      });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
</style>
