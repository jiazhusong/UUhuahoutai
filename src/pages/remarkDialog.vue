/**
* 作者: jsz
* 日期: 2019-01-09
* 描述:
*/
<template>
  <el-dialog title="备注" :visible.sync="dialogFormVisible">
    <el-form :model="form">
      <el-form-item label="备注" >
        <el-input type='textarea' :autosize='{minRows: 2, maxRows: 6}' v-model="form.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
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
              form: {
                remark: '',
                dialogFormVisible:true
              }
            }
        },
        mounted() {

        },
        methods: {}
    }
</script>

<style scoped lang='less'>

</style>
