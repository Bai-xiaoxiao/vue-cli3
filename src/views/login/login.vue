<template>
  <div id="login">
    <el-form :label-position="labelPosition" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="userMsg.userName"></el-input>
      </el-form-item>
      <el-form-item label="用户密码">
        <el-input v-model="userMsg.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox label="是否同意饿了么用户协议" v-model="agree"></el-checkbox>
        <el-button size="mini" type="text" class="pull-right">立即注册</el-button>
      </el-form-item>
      <el-form-item>
        <el-button class="loginBtn" type="primary" @click="login" :loading="isIng">{{btnTxt}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: "right",
      userMsg: {
        userName: "",
        password: ""
      },
      agree: false,
      isIng: false,
      btnTxt: '登录',
    };
  },
  methods: {
    login() {
      this.toggleBtnSyle();

      // 遇到了跨域问题。。。。。
      // 在vue.config.js中配置proxy代理，然后把axios中的baseUrl指定为/api
      // proxy中repath。把/api指向了实际的服务器地址
      this.$http.post('/login',{
          name: this.userMsg.userName,
          password: this.userMsg.password
      }).then(res=>{
          console.log(res);
          this.$store.commit('SaveToken',{userToken: res.data.token});
          this.$router.push('/about');
      }).catch(err=>{
        this.toggleBtnSyle();
      });

    },
    toggleBtnSyle(){
        this.isIng = !this.isIng;
        this.btnTxt == '登录' ? this.btnTxt = '登录中' : this.btnTxt = '登录';
    }
  },
  watch:{
      agree(){
          this.$notify.info({
          title: '用户协议',
          message: '饿了么用户协议是XXXXXXXXX',
          duration: 0
        });
      }
  }
};
</script>

<style lang="scss" scoped>
#login {
  width: 500px;
  margin: 100px auto;
  .loginBtn{
      width: 100%;
  }
}
</style>


