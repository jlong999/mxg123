<template>
  <div>
    <!-- 输入框 -->
    <el-form ref="searchMap" :inline="true" :model="searchMap" class="demo-form-inline" style="margin-top:20px">
      <el-form-item prop="name">
        <el-input v-model="searchMap.name" placeholder="供应商名称"></el-input>
      </el-form-item>
      <el-form-item prop="linkman">
        <el-input v-model="searchMap.linkman" placeholder="联系人" v-if="!isDialog"></el-input>
      </el-form-item>
      <el-form-item prop="mobile">
        <el-input v-model="searchMap.mobile" placeholder="电话号码" v-if="!isDialog"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="fetchData">查询</el-button>
        <el-button type="primary" icon="el-icon-edit" @click="handleAdd('pojoForm')" v-if="!isDialog">新增</el-button>
        <el-button @click="resetForm('searchMap')" v-if="!isDialog">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 新增 -->

    <!-- 列表 -->
    <el-table :highlight-current-row="isDialog"  @current-change="handleCurrentChange1" :data="list" border style="width: 100%" height="420px">
      <el-table-column type="index" label="序号">
      </el-table-column>
      <el-table-column prop="name" label="供应商名称">
      </el-table-column>
      <el-table-column prop="linkman" label="联系人">
      </el-table-column>
      <el-table-column prop="mobile" label="电话号码" v-if="!isDialog">
      </el-table-column>
      <el-table-column prop="remark" label="备注" v-if="!isDialog">
      </el-table-column>
      <el-table-column label="操作" width="150px" v-if="!isDialog">
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination 
    :layout='!isDialog ? "total, sizes, prev, pager, next, jumper" : "prev, pager, next"'
      @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" :total="total">
    </el-pagination>

    <!-- 弹出框 -->
    <el-dialog v-if="!isDialog" :title="pojo.id === null ? '会员新增' : '会员编辑'" :visible.sync="dialogFormVisible" width="500px">
      <el-form :rules="rules" :model="pojo" ref="pojoForm" label-width="120px" label-position="right "
        style="width:400px">
        <el-form-item label="供应商名称" label-width="120px" prop="name">
          <el-input v-model="pojo.name"></el-input>
        </el-form-item>
        <el-form-item label="联系人" :label-width="formLabelWidth" prop="linkman">
          <el-input v-model="pojo.linkman"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" :label-width="formLabelWidth" prop="mobile">
          <el-input v-model="pojo.mobile"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="pojo.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <!-- <el-button type="primary" @click="addData('pojoForm')">确 定</el-button> -->
        <el-button type="primary" @click="pojo.id === null ? addData('pojoForm') : updateData('pojoForm')">确 定
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import supplierApi from '../../api/supplier';
export default {
  //   props: {
  //     // 接收父组件传递过来 的数据,通过isDialog来判断 是否为弹框
  //     // 如果为 true, 则是弹框, false 就是列表
  //     isDialog: Boolean
  // },
  props: {
    isDialog: Boolean
  },
  data() {
    return {
      list: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      searchMap: {
        name: '',
        linkman: '',
        mobile: ''
      },
      pojo: {
        id: null,
        name: '',
        linkman: '',
        mobile: '',
        remark: ''
      },
      dialogFormVisible: false,
      rules: {
        linkman: [{ required: true, message: '卡号不能为空', trigger: "blur" }],
        name: [{ required: true, message: '姓名不能为空', trigger: "blur" }],
      },
      formLabelWidth: '120px',
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    //单选行
    handleCurrentChange1(currentRow){
      // this.currentRow = val;
      console.log(currentRow.name,"hello");
      // this.name = currentRow.name
      this.$emit("a-boy",currentRow);
    }
    ,
    fetchData() {
      // supplierApi.getList().then(response => {
      supplierApi.search(this.currentPage, this.pageSize, this.searchMap).then(response => {
        const resp = response.data;
        // console.log(resp.data, "0000000000000000000");
        this.list = resp.data.rows;
        this.total = resp.data.total;
        this.$refs.searchMap.resetFields();
      })
    },

    //输入框

    // 重置
    resetForm(searchMap) {
      console.log("重置", searchMap);
      this.$refs[searchMap].resetFields();
    },

    //编辑成功
    handleEdit(id) {
      console.log("编辑", id);
      this.handleAdd()
      // this.dialogFormVisible = true;
      supplierApi.getById(id).then(response => {
        const resp = response.data;
        if (resp.flag) {
          this.pojo = resp.data;
        } else {
          this.$message({
            message: resp.message,
            type: 'warning'
          })
        }
      })
      this.pojo.id = id;
    },
    updateData(formName) {
      // console.log("提交编辑数据");
      this.$refs[formName].validate((valid) => {
        if (valid) {
          supplierApi.update(this.pojo).then(response => {
            const resp = response.data;
            this.$message({
              message: resp.message,
              type: 'success'
            })
            if (resp.flag) {
              this.fetchData();
              this.dialogFormVisible = false;
            } else (
              this.$message({
                message: resp.message,
                type: 'error'
              })
            )
          })
        } else {
          return false;
        }
      });
    },
    //删除
    handleDelete(id) {
      console.log("删除", id);
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        supplierApi.deleteById(id).then(response => {
          const resp = response.data;
          if (resp.flag) {
            this.fetchData();
          } else {
            this.$message({
              type: 'error',
              message: '删除失败!'
            });
          }
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);//当前页 10,20,30,40
      this.pageSize = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);//当前页 1,2,3,4,5,6,7,8,9,10......
      this.currentPage = val
      this.fetchData()
    },
    //新增
    handleAdd() {
     
      this.dialogFormVisible = true;
      // this.$refs['pojoForm'].resetFields();
      this.$nextTick(() => {
        this.$refs['pojoForm'].resetFields();
      })
    },
    addData(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          supplierApi.search1(this.pojo).then(response => {
            const resp = response.data;

            this.$message({
              message: "新增成功",
              type: 'warning'
            })
            if (resp.flag) {
              this.fetchData()
              this.dialogFormVisible = false;
            } else {
              this.$message({
                message: resp.message,
                type: 'warning',
              })
            }
          })
        } else {
          return false;
        }
      });
    }
  }
}
</script>

<style>
</style>