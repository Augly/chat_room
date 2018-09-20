<template>
  <!-- 登录页 -->
  <div class="login-wrap">
    <div class="ms-title">后台管理系统</div>
    <div class="ms-login">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </div>
        <!-- <p style="font-size:12px;line-height:30px;color:#999;">Tips : 用户名和密码随便填。</p> -->
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    localStorage.removeItem("ACCESS_TOKEN");
  },
  methods: {
    // 提交账户名和密码
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$ajax
            .post(
              this.$api + "/login/userLogin",
              this.qs.stringify({
                account: this.ruleForm.username,
                password: this.ruleForm.password
              })
            )
            .then(response => {
              console.log(response);
              console.log(response.data.msg);
              if (response.data.msg == "success") {
                localStorage.setItem(
                  "ACCESS_TOKEN",
                  response.data.data.ACCESS_TOKEN
                );
                localStorage.setItem("userid", response.data.data.userInfo.id);
                localStorage.setItem("ms_username", this.ruleForm.username);
                this.$message({
                  message: "登陆成功!",
                  type: "success",
                  center: true
                });
                // console.log()
                localStorage.setItem(
                  "hx_userName",
                  response.data.data.userInfo.nickname
                );

                localStorage.setItem(
                  "hx_pwd",
                  response.data.data.userInfo.password
                );

                this.$imConn.open({
                  apiUrl: WebIM.config.apiURL,
                  user: response.data.data.userInfo.nickname,
                  pwd: response.data.data.userInfo.password,
                  appKey: WebIM.config.appkey
                });
                this.$router.push("/index");
              } else {
                this.$message.error("账号密码错误");
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        } else {
          this.$message.error("账号密码错误");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #409eff;
}

.ms-title {
  position: absolute;
  top: 50%;
  width: 100%;
  margin-top: -230px;
  text-align: center;
  font-size: 30px;
  color: #fff;
}

.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 360px;
  /* height: 160px; */
  margin: -150px 0 0 -190px;
  padding: 40px;
  border-radius: 5px;
  background: #fff;
}

.login-btn {
  text-align: center;
}

.login-btn button {
  width: 100%;
  height: 36px;
}
</style>