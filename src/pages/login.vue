/**
* 作者: jsz
* 日期: 2018-11-09
* 描述:
*/
<template>
    <div style='background: url("../../static/bg.jpg");height: 100%;border: 1px solid #fff'>
      <div style='margin:300px auto;position: relative'>
        <div style='border: 1px solid #ccc;width: 400px;background: #FFF;text-align: center;position: absolute;right: 264px;top:110px'>
          <div style='padding: 20px'>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="用户名" prop="username">
                <el-input v-model="ruleForm.username" placeholder='请输入用户名'></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="ruleForm.password" type='password'  placeholder='请输入密码'></el-input>
              </el-form-item>
              <el-form-item prop="valideCode" label='验证码' class='valid-input'>
              <!-- 注意：prop与input绑定的值一定要一致，否则验证规则中的value会报undefined，因为value即为绑定的input输入值 -->
              <el-input    v-model="ruleForm.valideCode" placeholder="请输入验证码" class="identifyinput">
                <template slot="append">
                  <img  :src="imgUrl" @click='imgFun'>
                </template>
              </el-input>

             </el-form-item>
              <div>
                <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                <router-link to='./editpassword'>
                  <el-button type="primary">重置密码</el-button>
                </router-link>

              </div>
            </el-form>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import SIdentify from '@/components/valideCode.vue'
    export default {
        name: "login",
        components: {
          SIdentify
        },
        props: [],
        data() {
            return {
              ruleForm: {
                username: '',
                password: '',
                valideCode:"",
              },
              imgUrl:"api/system/kaptcha",
              rules: {
                username: [
                  { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                password: [
                  { required: true, message: '请输入密码', trigger: 'blur' }
                ],
                valideCode: [
                  { required: true, message: '请输入验证码', trigger: 'blur' }
                ],
              },
            }
        },
        mounted() {
          // 验证码初始化

        },
        methods: {
          submitForm(formName) {
            let vm=this;
            this.$refs[formName].validate((valid) => {
              if (valid) {
                  this.$api.post("api/system/admin/login",{
                    kaptcha:this.ruleForm.valideCode,
                    password:this.ruleForm.password,
                    username:this.ruleForm.username
                  },function ({data}) {
                    console.log(data);
                    if(data.code==20){
                      sessionStorage.setItem('username',vm.username)
                      vm.$router.push({
                        path:"/infoTable",
                        query:{
                          active:"first"
                        }
                      })
                    }else {
                      vm.$message.error(data.message)
                    }
                  })
              } else {
                return false;
              }
            });
          },
          imgFun(){
            this.imgUrl='api/system/kaptcha?'+Math.random();
          },
          resetForm(formName) {
            this.$refs[formName].resetFields();
          },
          randomNum(min, max) {
            return Math.floor(Math.random() * (max - min) + min)
          },
          // 切换验证码
          refreshCode() {
            this.identifyCode = ''
            this.makeCode(this.identifyCodes, 4)
          },
          // 生成四位随机验证码
          makeCode(o, l) {
            for (let i = 0; i < l; i++) {
              this.identifyCode += this.identifyCodes[
                this.randomNum(0, this.identifyCodes.length)
                ]
            }
          }
        }
    }
</script>

<style scoped lang='less'>
.valid-input{
  /deep/.el-input{
    text-align: left;
    .el-input-group__append, .el-input-group__prepend{
      border: none;
    }
  }
  /deep/.el-input__inner{
    width: 100px;
    display: inline-block;
  }
}
.identifybox{
  display: inline-block;

}
</style>
