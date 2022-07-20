<template>
  <div class="login-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" class="login-from">
      <h2 class="login-title">梦学谷会员管理系统</h2>
      <el-form-item label="账号" prop="username">
        <el-input v-model="form.username" placeholder="请输入账号名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password" placeholder="请输入账号密码"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login, getUserInfo } from "@/api/login"
export default {
  data() {
    return {
      form: {
        username: '123',
        password: '123',

      },
      rules: {
        username: [
          { required: true, message: '账号不能为空', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log(valid);
          login(this.form.username, this.form.password).then(response => {
            const resp = response.data;
            console.log(resp, "resp.flag", resp.flag);
            if (resp.flag) {
              console.log('111111111111111111111');
              getUserInfo(resp.data.token).then(response => {
                const respUser = response.data;
                if (respUser.flag) {
                  // console.log(resp.data.token,'1111111111');
                  // console.log(response.data,'2222222222');
                  // console.log(resp.data.token,'33333333');
                  // console.log(respUser.data,'4444444444');
                  localStorage.setItem("mxg-msm-user", JSON.stringify(respUser.data));
                  localStorage.setItem("mxg-msm-token", resp.data.token);
                  this.$router.push('/')
                  this.$message({
                    showClose: true,
                    message: '验证成功',
                    type: 'warning'
                  });
                } else {
                  this.$message({
                    showClose: true,
                    message: respUser.message,
                    type: 'warning'
                  });
                }
              })
            } else {
              this.$message({
                showClose: true,
                message: '验证失败',
                type: 'warning'
              });
            }
          });
        } else {
          this.$message({
            showClose: true,
            message: '请输入账号或密码',
            type: 'warning'
          });
        }
      });
    },
  }

}
</script>

<style>
.login-from {
  width: 350px;
  margin: 160px auto;
  background-color: hsla(0, 0%, 100%, .8);
  padding: 28px;
  border-radius: 20px;
}

.login-container {
  width: 100%;
  height: 100%;
  background: url("../../assets/login.jpg");
  position: absolute;
}

.login-title {
  color: #303133;
  text-align: center;
}
</style>