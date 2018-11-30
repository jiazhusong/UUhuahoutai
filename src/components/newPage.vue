/**
* 作者: jsz
* 日期: 2018-10-19
* 描述:
*/
<template>
  <div class="block" style='text-align: right;margin-top: 10px;margin-bottom: 10px;'>
    <el-pagination
      @size-change="options.pageInfo.handleSizeChange"
      @current-change="options.pageInfo.handleCurrentChange"
      :current-page="options.pageInfo.currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="options.pageInfo.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="options.pageInfo.total">
    </el-pagination>
    <!--<el-pagination v-if="options.pageInfo && options.pageInfo.total>0" @size-change="options.pageInfo.handleSizeChange" @current-change="options.pageInfo.handleCurrentChange" :current-page="options.pageInfo.currentPage" :page-size="options.pageInfo.pageSize" :layout="options.pageInfo.layout" :total="options.pageInfo.total" :class="options.pageInfo.className" :prev-text="options.pageInfo.prevText" :next-text="options.pageInfo.nextText"  class="pagination">-->
			<!--<span class="pageInfo" v-if="!options.pageInfo.leftHide">-->
				<!--&lt;!&ndash;Page {{options.pageInfo.currentPage}} of  {{ Math.ceil(options.pageInfo.total/options.pageInfo.pageSize)}}，&ndash;&gt;-->
        <!--&lt;!&ndash;<span>总共 {{options.pageInfo.total}} 条数据</span>&ndash;&gt;-->
			<!--</span>-->
    <!--</el-pagination>-->
  </div>
</template>

<script>
    export default {
        name: "newPage",
        components: {},
        props: ['options'],
        data() {
            return {}
        },
        mounted() {

        },
        methods: {}
    }
</script>

<style scoped>

</style>
