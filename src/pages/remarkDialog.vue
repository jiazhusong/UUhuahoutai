/**
* 作者: jsz
* 日期: 2019-01-09
* 描述:
*/
<template>
  <el-dialog title="备注" :visible.sync="options.visible">

    <el-input type='textarea' :autosize='{minRows: 2, maxRows: 6}' v-model="remark" autocomplete="off"></el-input>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelClick">取 消</el-button>
      <el-button type="primary" @click="submitClick">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
    export default {
        name: "remarkDialog",
        components: {},
        props: ["options"],
        data() {
            return {
                remark: '',
            }
        },
        mounted() {
          this.remark=this.$props["options"].row.remark;
        },
        methods: {
          cancelClick(){
            let vm=this;
            vm.$emit("visibleFun")
          },
          submitClick(){
            let vm=this;
            vm.$api.put("api/user/"+vm.$props["options"].row.id+"/remark",{
              remark:vm.remark
            },function ({data}) {
              if(data.code==20){
                vm.$message.success("修改成功");
                vm.$emit("visibleFun","submit")
              }else {
                vm.$message.error(data.message);
              }
            })
          }
        }
    }
</script>

<style scoped lang='less'>

</style>
