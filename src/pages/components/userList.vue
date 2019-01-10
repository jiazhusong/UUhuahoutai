/**
* 作者: jsz
* 日期: 2019-01-10
* 描述:
*/
<template>
    <div>
      <div style='margin-left: 20px;margin-bottom: 20px;'>
        <span>姓名：</span>
        <el-input v-model='realName'></el-input>
        <span style='margin-left: 20px;'>电话：</span>
        <el-input v-model='tel'></el-input>
        <el-button type='primary' @click='searchFun'>搜索</el-button>
      </div>
      <el-table
        :data="userData"
        style="width: 100%">
        <template v-for='item in userTableHeader'>
          <el-table-column
            :prop="item.prop"
            :label="item.label"
          >
          </el-table-column>
        </template>
        <el-table-column
          prop=""
          label="操作"
          width=""
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type='primary'
              @click.native='remarkUser(scope.$index,scope.row,$event)'>备注</el-button>
            <el-button
              size="mini"
              type='info'
              @click.native='deleteUser(scope.$index,scope.row,$event)'>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pageInfoTip :options='page1'></pageInfoTip>
    </div>
</template>

<script>
    export default {
        name: "userList",
        components: {},
        props: [],
        data() {
            return {}
        },
        mounted() {

        },
        methods: {}
    }
</script>

<style scoped lang='less'>

</style>
