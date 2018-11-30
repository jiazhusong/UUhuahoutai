/**
* 作者: jsz
* 日期: 2018-11-09
* 描述:
*/
<template>
  <div style='background: pink;height: 100%;border: 1px solid #fff'>
    <div style='margin:300px auto;'>
      <div style='border: 1px solid #ccc;width: 400px;margin: 30px auto;background: #FFF;text-align: center'>
        <div style='padding: 20px'>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="ruleForm.username" placeholder='请输入用户名'></el-input>
            </el-form-item>
            <el-form-item label="旧密码" prop="oldpassword">
              <el-input v-model="ruleForm.oldpassword" type='password'  placeholder='请输入密码'></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newpassword">
              <el-input v-model="ruleForm.newpassword" type='password'  placeholder='请输入密码'></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="turepassword">
              <el-input v-model="ruleForm.turepassword" type='password'  placeholder='请输入密码'></el-input>
            </el-form-item>

            <div>
              <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "editPassword",
        components: {},
        props: [],
        data() {
            return {
              ruleForm: {
                username: '',
                oldpassword: '',
                newpassword:"",
                truepassword:"",
              },
              rules: {
                username: [
                  { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                oldpassword: [
                  { required: true, message: '请输入旧密码', trigger: 'blur' }
                ],
                newpassword: [
                  { required: true, message: '请输入新密码', trigger: 'blur' }
                ],
                turepassword: [
                  { required: true, message: '请输入确认密码', trigger: 'blur' }
                ],
              },
            }
        },
        mounted() {

        },
        methods: {
          submitForm(formName){
            let vm=this;
            this.$refs[formName].validate((valid) => {
              if (valid) {
                if(vm.ruleForm.newpassword!==vm.ruleForm.turepassword){
                 vm.$message.warning("密码和确认密码不一致");
               }else {
                  vm.$api.put("api/system/admin/resetPassword",{
                    newPassword:vm.ruleForm.newpassword,
                    oldPassword:vm.ruleForm.oldpassword,
                    username:vm.ruleForm.username
                  },function ({data}) {
                    if(data.code==20){
                      vm.$message.success("修改成功");
                      vm.$router.push("/")
                    }else {
                      vm.$message.error(data.message)
                    }
                  })
                }
              } else {
                return false;
              }
            });
          }
        }
    }
</script>

<style scoped lang='less'>

</style>
