<template>
  <div class="header">
    <a href="#/">
      <img class="logo"
           src="@/assets/logo copy.png"
           alt="梦学谷会员管理系统"
           width="25px">
      <span class="company">梦学谷会员管理系统1111</span>
    </a>

    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        {{user.id}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-edit"
                          command="a">修改密码</el-dropdown-item>
        <el-dropdown-item icon="el-icon-folder-delete "
                          command="b">退出系统</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!-- 弹出框 -->
    <el-dialog title="修改密码"
               :visible.sync="dialogFormVisible"
               width="480px">
      <el-form :model="ruleForm"
               :rules="rules"
               status-icon
               label-position="left"
               ref="ruleForm">
        <el-form-item label="原始密码"
                      prop="name1"
                      :label-width="formLabelWidth"
                      fixed="left">
         
          <el-input v-model="ruleForm.name1" type="password"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码"
                      prop="name2"
                      :label-width="formLabelWidth">
          <el-input v-model="ruleForm.name2"  type="password"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确定密码"
                      prop="name3"
                      :label-width="formLabelWidth">
          <el-input v-model="ruleForm.name3"  type="password"
                    autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button type="primary"
                   @click="submitForm('ruleForm')">确 定</el-button>
        <el-button @click="$refs['ruleForm'].resetFields()">重置</el-button>

      </div>
    </el-dialog>
  </div>

</template>

<script>
import { logout } from '@/api/login'
import passwordApi from '../../api/password';
export default {
  data() {
    var validateOldPass = (rule, value, callback) => {
      passwordApi.checkPwd(this.user.id, value).then(response => {
        const resp = response.data;
        if (resp.flag) {
          callback();
        } else {
          callback(new Error(resp.message));
        }
      })
    }
    var validateNewPass = (rule, value, callback) => {
      if (value !== this.ruleForm.name2) {
        callback(new Error('密码不一致'))
      } else {
        callback();
      }
    }
    return {
      user: JSON.parse(localStorage.getItem('mxg-msm-user')),
      ruleForm: {
        name1: '',
        name2: '',
        name3: '',
      },
      formLabelWidth: '120px',
      dialogFormVisible: false,
      user: JSON.parse(localStorage.getItem('mxg-msm-user')),
      rules: {
        name1: [
          { required: true, message: '原密码不能为空', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
          { validator: validateOldPass, trigger: 'blur' }
        ],
        name2: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        name3: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
          { validator: validateNewPass, trigger: 'change' }
        ],
      }
    }
  }
  ,
  methods: {
    handleCommand(command) {

      switch (command) {
        case 'a':
          this.handlePwd()
          // this.$message('修改密码 ' + command);
          break;
        case 'b':
          this.handLoginout()

          break;

        default:
          break;
      }
    },
    // 修改密码
    handlePwd(command) {
      this.dialogFormVisible = true;
      this.$nextTick(() => { this.$refs['ruleForm'].resetFields() })
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 验证通过，提交添加 
          console.log("校验成功");
          passwordApi.updataPwd(this.user.id, this.ruleForm.name3).then(response => {
            const resp = response.data;
            // console.log(resp);
            if(resp.flag){
              this.$message({
                type:'success',
                message:resp.message
              });
              this.handLoginout()
            }else{
                            this.$message({
                type:'warning',
                message:resp.message
              });
            }
          })
        } else {
          // 验证不通过 
          return false;
        }
      })
    }
    ,
    // 退出系统
    handLoginout(command) {
      logout(localStorage.getItem("mxg-msm-token")).then(response => {
        console.log(response.data);
        const resp = response.data;
        if (resp.flag) {
          localStorage.removeItem("mxg-msm-token")
          localStorage.removeItem("mxg-msm-user")
          this.$router.push('/login')
          this.$message(resp.message + command);
        } else {
          this.$message({
            showClose: true,
            message: resp.message,
            type: 'warning',
            duration: 5000
          });
        }

      })
    }
  }
}
</script>

<style scoped>
.header {
  position: absolute;
  line-height: 50px;
  top: 0px;
  left: 0px;
  right: 0px;
  background-color: #2d3a4b;
}

.logo {
  vertical-align: middle;
  padding: 0px 10px 0px 40px;
}

.el-dropdown-link {
  color: white;
  cursor: pointer;
}

.company {
  color: white;
  position: absolute;
}

.el-dropdown {
  float: right;
  margin-right: 40px;
}
</style>