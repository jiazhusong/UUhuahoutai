/**
* 作者: jsz
* 日期: 2018-11-09
* 描述:
*/
<template>
    <div  style='text-align: left;margin: 20px;'>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">

        <el-tab-pane label="用户管理" name="first">
          <userList  v-if='activeName=="first"'></userList>
        </el-tab-pane>
        <el-tab-pane label="贷款申请" name="second">
          <applyList  v-if='activeName=="second"'></applyList>
        </el-tab-pane>
        <el-tab-pane label="逾期账单" name="third">
          <overBillList v-if='activeName=="third"'></overBillList>
        </el-tab-pane>

      </el-tabs>

    </div>
</template>

<script>
  import userList from "@/pages/components/userList"
  import applyList from "@/pages/components/applyList"
  import overBillList from "@/pages/components/overBillList"
  import pageInfoTip from "@/components/newPage"
    export default {
        name: "tablePage",
        components: {
          pageInfoTip,
          userList,
          applyList,
          overBillList,
        },
        props: [],
        data() {
            return {
              activeName:"",
            }
        },
        mounted() {
          let vm=this;
          vm.activeName=vm.$router.history.current.query.active
        },
        methods: {
          handleClick(value){
            let vm=this;
            if(vm.activeName=="first"){
              vm.$router.push({
                path:"/infoTable",
                query:{
                  active:"first"
                }

              })
            }else if(vm.activeName=="second") {
              vm.$router.push({
                path:"/infoTable",
                query:{
                  active:"second"
                }

              })
            }else {
              vm.$router.push({
                path:"/infoTable",
                query:{
                  active:"third"
                }

              })
            }
          },
          //延期
          postpone(index,row){
            let vm=this;
            vm.$confirm('确认要延期吗', '延期', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
            }).then(()=>{
              vm.$api.post("api/bill/delay/"+row.id,"",function ({data}) {
                if(data.code==20){
                  vm.$message.success("延期成功");
                  vm.initTable2(vm.page2.pageInfo.currentPage,vm.page2.pageInfo.pageSize);
                }
              })
            }).catch(() => {
              // 取消的时候对应的函数
              // vm.$set(vm.tableLeft.tableData)
              // fn();
              vm.$message.info('已取消');
            });
          },




        }
    }
</script>

<style scoped lang='less'>

</style>
