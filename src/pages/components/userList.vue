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
          <template slot-scope="scope" >
            <el-button
              size="mini"
              type='primary'
              @click.native='remarkUserClick(scope.$index,scope.row,$event)'>备注</el-button>
            <el-button
              size="mini"
              type='info'
              @click.native='deleteUser(scope.$index,scope.row,$event)'>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pageInfoTip :options='page'></pageInfoTip>
      <remarkDialog :options='remarkOptions' @visibleFun='visibleFun' v-if='remarkOptions.visible'></remarkDialog>
    </div>
</template>

<script>
  import pageInfoTip from "@/components/newPage"
  import remarkDialog from "@/pages/remarkDialog"
    export default {
        name: "userList",
        components: {
          pageInfoTip,
          remarkDialog
        },
        props: [],
        data() {
            return {
              realName:"",
              tel:"",
              userData:[],
              remarkOptions:{
                visible:false,
                row:{},

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
              },{
                prop:"remark",
                label:"备注",
              }],
              page:{
                pageInfo:{
                  handleSizeChange(){},
                  handleCurrentChange(){},
                  pageSize:10,
                  currentPage:1,
                  total:0,
                }
              },

            }
        },
        mounted() {
          let vm=this;
          vm.initTable(1,10)
        },
        methods: {
          searchFun(){
            let vm=this;
            this.initTable(1,vm.page.pageInfo.pageSize);
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
          remarkUserClick(index,row){
            let vm=this;
            console.log(row);
            this.remarkOptions.row=row;
            this.remarkOptions.visible=true;

          },
          handleSizeChange(value){
            this.initTable(1,value)
          },
          handleCurrentChange(value){
            let vm=this;
            this.initTable(value,vm.page.pageInfo.pageSize)
          },
          initTable(page,size){
            let vm=this;
            let obj={
              "realName.contains":vm.realName,
              "tel.equals":vm.tel,
              page:page-1,
              size:size
            };
            if(vm.realName==""){
              delete obj["realName.contains"]
            }
            if(vm.tel==""){
              delete obj["tel.equals"]
            }
            vm.$api.get("api/user/list",obj,function ({data}) {
              vm.userData=data.data.list;
              vm.page.pageInfo={
                pageSize:size,
                currentPage:page,
                total:data.data.total,
                handleSizeChange:vm.handleSizeChange,
                handleCurrentChange:vm.handleCurrentChange,

              };
            })
          },
          visibleFun(type){
            let vm=this;
            vm.remarkOptions.visible=false;
            if(type=="submit"){
              vm.initTable(vm.page.pageInfo.currentPage,vm.page.pageInfo.pageSize);
            }
          }
        }
    }
</script>

<style scoped lang='less'>
  .el-input{
    width: 200px;
  }
</style>
