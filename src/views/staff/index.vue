<template>
  <div>
    <!-- 搜索 -->
    <el-form :inline="true"
             :model="staffFrom"
             class="demo-form-inline"
             style="margin-top:20px">
      <el-form-item>
        <el-input v-model="staffFrom.account "
                  placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="staffFrom.name"
                  placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="onSubmit">查询</el-button>
        <el-button type="primary"
                   @click="onSubmit">新增</el-button>
        <el-button @click="onSubmit">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 列表 -->
    <el-table :data="list"
              border
              style="width: 100%">
      <el-table-column fixed
                       type="index"
                       label="序号">
      </el-table-column>
      <el-table-column prop="name"
                       label="账号">
      </el-table-column>
      <el-table-column prop="name"
                       label="姓名"
                       width="120">
      </el-table-column>
      <el-table-column prop="age"
                       label="年龄">
      </el-table-column>
      <el-table-column prop="mobile"
                       label="电话"
                       width="300">
      </el-table-column>
      <el-table-column prop="salary"
                       label="薪资">
      </el-table-column>
      <el-table-column prop="entryDate"
                       label="入职时间">
      </el-table-column>
      <el-table-column fixed="right"
                       width="150px"
                       label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)"
                     size="small">编辑</el-button>
          <el-button size="small"
                     type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="currentPage"
                   :page-sizes="[10, 20, 30, 40]"
                   :page-size="100"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="total">
    </el-pagination>
  </div>
</template>

<script>
import stallApi from "../../api/staff.js";
export default {
  data() {
    return {
      staffFrom: {},
      list: [],
      currentPage: 1,
      total: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    //加载数据
    fetchData() {
      stallApi.search(this.page, this.size, this.searchMap).then(response => {
        const resp = response.data;
        console.log(resp.data.rows);
        this.list = resp.data.rows;
        this.total = resp.data.total;
      })
    },
    onSubmit() {
      console.log("1");
    },
    handleClick(id) {
      console.log(id);
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }

}
</script>

<style>
</style>