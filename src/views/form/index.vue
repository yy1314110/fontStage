<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="名称">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="发布者" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Pageviews" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="change">去考试</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="发布时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/table'
export default {
  name:'Form',
  filters: {
    statusFilter(status) {
      const statusMap = {
        
      }
    }
  },

  data() {
    return {
      list:null,
      listLoading:false
    }
  },

  created() {
    this.fetchData()
  },
  methods: {

    fetchData() {
      this.listLoading = true
      getList().then(res => {
        this.list = res.data.items
        this.listLoading = false
      })
    },
    
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    change() {
      console.log('点击了按钮');
      this.$router.push('/')
      this.$router.beforeEach((to,from,next) => {
        console.log('to去哪里'+to);
        console.log('from从哪个路由来'+from);
        
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

