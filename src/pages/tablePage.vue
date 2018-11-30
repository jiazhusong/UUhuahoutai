/**
* 作者: jsz
* 日期: 2018-11-09
* 描述:
*/
<template>
    <div  style='text-align: left;margin: 20px;'>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">

        <el-tab-pane label="用户管理" name="first">
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
                  type='info'
                  @click.native='deleteUser(scope.$index,scope.row,$event)'>删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <pageInfoTip :options='page1'></pageInfoTip>
        </el-tab-pane>
        <el-tab-pane label="贷款申请" name="second">
          <div style='margin-left: 20px;margin-bottom: 20px;'>
            <span>姓名：</span>
            <el-input></el-input>
            <span style='margin-left: 20px;'>电话：</span>
            <el-input></el-input>
            <el-button type='primary'>搜索</el-button>
          </div>
          <el-table
            :data="applicData"
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
                    type='primary'
                    v-if='scope.row.status=="PENDING"'
                    @click.native='loanMoney(scope.$index,scope.row,$event)'>放款</el-button>
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
          <pageInfoTip :options='page2'></pageInfoTip>
        </el-tab-pane>

      </el-tabs>
    </div>
</template>

<script>
  import pageInfoTip from "@/components/newPage"
    export default {
        name: "tablePage",
        components: {
          pageInfoTip
        },
        props: [],
        data() {
            return {
              activeName:"first",
              realName:"",
              tel:"",
              page1:{
                pageInfo:{
                  handleSizeChange(){},
                  handleCurrentChange(){},
                  pageSize:10,
                  currentPage:1,
                  total:0,
                }
              },
              page2:{
                pageInfo:{
                  handleSizeChange(){},
                  handleCurrentChange(){},
                  pageSize:10,
                  currentPage:1,
                  total:0,
                }
              },
              userTableHeader:[{
                prop:"realName",
                label:"姓名",
              },{
                prop:"tel",
                label:"电话",
              },{
                prop:"password",
                label:"密码",
              },{
                prop:"wechat",
                label:"微信",
              },{
                prop:"qq",
                label:"QQ",
              },{
                prop:"idCart",
                label:"身份证",
              },{
                prop:"xxwzh",
                label:"学信网账号",
              },{
                prop:"xxwmm",
                label:"学信网密码",
              },{
                prop:"fqxm",
                label:"父亲姓名",
              },{
                prop:"fqdh",
                label:"父亲电话",
              },{
                prop:"mqxm",
                label:"母亲姓名",
              },{
                prop:"mqdh",
                label:"母亲电话",
              },{
                prop:"txxm",
                label:"同学姓名",
              },{
                prop:"txdh",
                label:"同学电话",
              },{
                prop:"familyAddress",
                label:"通讯地址",
              },{
                prop:"bankAccount",
                label:"银行账号",
              },{
                prop:"fhxx",
                label:"分行信息",
              },{
                prop:"yysmm",
                label:"运营商密码",
              },],
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
                prop:"loadtime",
                label:"放款时间",
              },{
                prop:"",
                label:"操作",
              },],
              userData:[],
              applicData:[],
            }
        },
        mounted() {
          let vm=this;
          vm.activeName=vm.$router.history.current.query.active
          if(vm.activeName=="first"){
            vm.initTable1(1,10)
          }else {
            vm.initTable2(1,10)
          }

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
              vm.initTable1(1,10);
            }else {
              vm.$router.push({
                path:"/infoTable",
                query:{
                  active:"second"
                }

              })
              vm.initTable2(1,10);
            }
          },
          loanMoney(index,row){
            let vm=this;
            console.log(row);
            vm.$api.post("api/bill/"+row.id+"/pass","",function ({data}) {
              if(data.code==20){
                vm.$message.success("放款成功");
                vm.initTable2(vm.page2.pageInfo.currentPage,vm.page2.pageInfo.pageSize);
              }
            })
          },
          repayment(index,row){
            let vm=this;
            vm.$api.post("api/bill/"+row.id+"/end","",function ({data}) {
              if(data.code==20){
                vm.$message.success("还款成功");
                vm.initTable2(vm.page2.pageInfo.currentPage,vm.page2.pageInfo.pageSize);
              }
            })

          },
          deleteUser(index,row){
            let vm=this;
            vm.$confirm('确认要删除吗?删除将删除用户所有数据', '删除', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
            }).then(() => {
              vm.$api.delete("api/user/"+row.id,"",({data})=>{
                if(data.code==20){
                  vm.$message.success("删除成功");
                  vm.initTable1(vm.page1.pageInfo.currentPage,vm.page1.pageInfo.pageSize);
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
                  vm.initTable2(vm.page2.pageInfo.currentPage,vm.page2.pageInfo.pageSize);
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
          initTable1(page,size){
            let vm=this;
            let obj={
              "realName.contains":vm.realName,
              "tel.contains":vm.tel,
              page:page-1,
              size:size
            };
            if(vm.realName==""){
              delete obj["realName.contains"]
            }
            if(vm.tel==""){
              delete obj["tel.contains"]
            }
            vm.$api.get("api/user/list",obj,function ({data}) {
              vm.userData=data.data.list;
              vm.page1.pageInfo={
                pageSize:size,
                currentPage:page,
                total:data.data.total,
                handleSizeChange:vm.handleSizeChange,
                handleCurrentChange:vm.handleCurrentChange,

              };
            })
          },
          initTable2(page,size){
            let vm=this;
            let obj={
              "realName.contains":vm.realName,
              "tel.contains":vm.tel,
              page:page-1,
              size:size,
              sort:"createdTime,desc"
            };
            if(vm.realName==""){
              delete obj["realName.contains"]
            }
            if(vm.tel==""){
              delete obj["tel.contains"]
            }
            vm.$api.get("api/admin/loan/history",obj,function ({data}) {
              vm.applicData=data.data.list;
              vm.page2.pageInfo={
                pageSize:size,
                currentPage:page,
                total:data.data.total,
                handleSizeChange:vm.handleSizeChange2,
                handleCurrentChange:vm.handleCurrentChange2,

              };
            })
          },
          searchFun(){
            let vm=this;
            this.initTable1(1,vm.page1.pageInfo.pageSize);
          },
          handleSizeChange(value){
            this.initTable1(1,value)
          },
          handleCurrentChange(value){
            let vm=this;
            this.initTable1(value,vm.page1.pageInfo.pageSize)
          },
          handleSizeChange2(value){
            this.initTable2(1,value)
          },
          handleCurrentChange2(value){
            let vm=this;
            this.initTable2(value,vm.page2.pageInfo.pageSize)
          }
        }
    }
</script>

<style scoped lang='less'>
  .el-input{
    width: 200px;
  }
</style>
