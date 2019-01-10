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
        <el-button type='primary' @click='overdueFun'>搜索</el-button>
      </div>
      <el-table
        :data="overdueData"
        style="width: 100%">
        <template v-for='item in applicTableHeader'>
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
              type='danger'
              v-if='scope.row.status=="PASS"'
              @click.native='repayment(scope.$index,scope.row,$event)'>还款</el-button>
            <el-button
              size="mini"
              type='info'
              @click.native='deleteInfo(scope.$index,scope.row,$event)'>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pageInfoTip :options='page'></pageInfoTip>
    </div>
</template>

<script>
  import pageInfoTip from "@/components/newPage"
    export default {
        name: "overBillList",
        components: {
          pageInfoTip
        },
        props: [],
        data() {
            return {
              overdueData:[],
              realName:"",
              tel:"",
              page:{
                pageInfo:{
                  handleSizeChange(){},
                  handleCurrentChange(){},
                  pageSize:10,
                  currentPage:1,
                  total:0,
                }
              },
              applicTableHeader:[{
                prop:"realName",
                label:"姓名",
              },{
                prop:"tel",
                label:"电话",
              },{
                prop:"qq",
                label:"QQ",
              },{
                prop:"bill",
                label:"申请金额",
              },{
                prop:"penalty",
                label:"逾期滞纳金",
              },
                {
                  prop:"loanDay",
                  label:"申请周期",
                },{
                  prop:"bankAccount",
                  label:"银行卡号",
                },{
                  prop:"bank",
                  label:"银行",
                },{
                  prop:"fhxx",
                  label:"分行信息",
                },{
                  prop:"applyTime",
                  label:"申请时间",
                },{
                  prop:"loanTime",
                  label:"放款时间",
                }],
              applicData:[],

            }
        },
        mounted() {
          let vm=this;
          vm.initTable(1,10)
        },
        methods: {
          initTable(page,size){
            let vm=this;
            let obj={
              "realName.contains":vm.realName,
              "tel.equals":vm.tel,
              page:page-1,
              size:size,
              sort:"createdTime,desc"
            };
            if(vm.realName==""){
              delete obj["realName.contains"]
            }
            if(vm.tel==""){
              delete obj["tel.equals"]
            }
            vm.$api.get("api/admin/loan/overdue/history",obj,function ({data}) {
              vm.overdueData=data.data.list;
              vm.page.pageInfo={
                pageSize:size,
                currentPage:page,
                total:data.data.total,
                handleSizeChange:vm.handleSizeChange,
                handleCurrentChange:vm.handleCurrentChange,

              };
            })
          },

          deleteInfo(index,row){
            let vm=this;
            vm.$confirm('确认要删除吗?', '删除', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
            }).then(() => {
              vm.$api.delete("api/admin/bill/"+row.id,"",({data})=>{
                if(data.code==20){
                  vm.$message.success("删除成功");
                  vm.initTable(vm.page.pageInfo.currentPage,vm.page.pageInfo.pageSize);
                }else {
                  vm.$message.error(data.message);
                }
              })
            }).catch(() => {
              // 取消的时候对应的函数
              // vm.$set(vm.tableLeft.tableData)
              // fn();
              vm.$message.info('已取消');
            });
          },
          //逾期账单搜索
          overdueFun(){
            let vm=this;
            this.initTable(1,vm.page.pageInfo.pageSize);
          },
          repayment(index,row){
            let vm=this;
            vm.$confirm('确认要还款吗', '还款', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
            }).then(()=>{
              vm.$api.post("api/bill/"+row.id+"/end","",function ({data}) {
                if(data.code==20){
                  vm.$message.success("还款成功");
                  vm.initTable(vm.page.pageInfo.currentPage,vm.page.pageInfo.pageSize);
                }
              })
            }).catch(() => {
              // 取消的时候对应的函数
              // vm.$set(vm.tableLeft.tableData)
              // fn();
              vm.$message.info('已取消');
            });


          },

          handleSizeChange(value){
            this.initTable(1,value)
          },
          handleCurrentChange(value){
            let vm=this;
            this.initTable(value,vm.page.pageInfo.pageSize)
          }
        }
    }
</script>

<style scoped lang='less'>
  .el-input{
    width: 200px;
  }
</style>
