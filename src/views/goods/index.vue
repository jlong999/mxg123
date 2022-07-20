<template>
  <div>
    <!-- 搜索框 -->
    <el-form ref="searchMap"
             :inline="true"
             :model="searchMap"
             class="demo-form-inline"
             style="margin-top:20px">
      <el-form-item prop="name">
        <el-input v-model="searchMap.name"
                  placeholder="商品名称"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="searchMap.code"
                  placeholder="商品编码"></el-input>
      </el-form-item>
      <el-form-item prop="supplierName">
        <el-input readonly
                  @click.native="dialogSupplierVisible = true"
                  v-model="searchMap.supplierName"
                  placeholder="选择供应商"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="fetchData">查询</el-button>
        <el-button type="primary"
                   @click="handleAdd('pojoForm')">新增</el-button>
        <el-button @click="resetForm('searchMap')">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 列表 -->
    <el-table :data="list"
              border
              style="width: 100%"
              height="420px">
      <el-table-column fixed
                       type="index"
                       label="序号">
      </el-table-column>
      <el-table-column prop="name"
                       label="商品名称">
      </el-table-column>
      <el-table-column prop="code"
                       label="商品编码">
      </el-table-column>
      <el-table-column prop="spec"
                       label="商品规则">
      </el-table-column>
      <el-table-column prop="purchasePrice"
                       label="零售价">
      </el-table-column>
      <el-table-column prop="retailPrice"
                       label="进货价">
      </el-table-column>
      <el-table-column prop="storageNum"
                       label="库存数量">
      </el-table-column>
      <el-table-column prop="supplierName"
                       label="供应商">
      </el-table-column>
      <el-table-column fixed="right"
                       label="操作"
                       width="180px">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row.id)"
                     size="small">编辑</el-button>
          <el-button type="danger"
                     size="small"
                     @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="currentPage"
                   :page-sizes="[10, 20, 30, 40]"
                   :page-size="pageSize"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="total">
    </el-pagination>
    <!-- 弹出框 -->
    <el-dialog :title="pojo.id === null ? '新增商品' : '编辑商品'"
               :visible.sync="dialogFormVisible"
               width="500px"
               height="200px">
      <el-form :model="pojo"
               :rules="rules"
               ref="pojoForm"
               label-width="120px"
               label-position="right "
               style="width:400px">
        <el-form-item label="商品名称"
                      prop="name">
          <el-input v-model="pojo.name"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品编码"
                      prop="code">
          <el-input v-model="pojo.code"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品规则"
                      prop="spec">
          <el-input v-model="pojo.spec"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="零售价"
                      prop="purchasePrice">
          <el-input v-model="pojo.purchasePrice"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="进货价"
                      prop="retailPrice">
          <el-input v-model="pojo.retailPrice"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="库存数量"
                      prop="storageNum">
          <el-input v-model="pojo.storageNum"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="供应商"
                      prop="supplierName">
          <el-input v-model="pojo.supplierName"
                    autocomplete="off"
                    placeholder="选择供应商"
                    readonly
                    @click.native="editOptionSupplier"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <!-- <el-button type="primary" @click="addData('pojoForm')">确 定</el-button> -->
        <el-button type="primary"
                   @click="pojo.id === null ? addData('pojoForm') : updateData('pojoForm')">确 定
        </el-button>
      </div>
    </el-dialog>
    <!-- 选择供应商对话框 -->
    <el-dialog title="选择供应商"
               :visible.sync="dialogSupplierVisible"
               width="500px"
               height="200px">
      <SuppLier @a-boy="aBoy"
                :isDialog="true"></SuppLier>
    </el-dialog>
    <el-dialog title="选择供应商"
               :visible.sync="dialogSupplierVisible"
               width="500px"
               height="200px">
      <SuppLier @a-boy="aBoy"
                :isDialog="true"></SuppLier>
    </el-dialog>
  </div>
</template>

<script>
import goodsApi from '../../api/goods';
import SuppLier from '../../views/supplier/index.vue'
export default {
  // 注册子组件
  components: { SuppLier },
  data() {
    return {
      list: [],
      searchMap: {
        name: '',
        code: '',
        supplierName: ''
      },
      currentPage: 1,
      total: 0,
      pageSize: 10,
      pojo: {
        id: null,
        name: '',
        code: '',
        spec: "",
        purchasePrice: 0,
        retailPrice: 0,
        storageNum: 0,
        supplierName: ''
      },
      isEdit: false,//是否点击编辑窗口
      dialogFormVisible: false,
      dialogSupplierVisible: false,
      rules: {
        name: [{ required: true, message: '卡号不能为空', trigger: "blur" }],
        code: [{ required: true, message: '卡号不能为空', trigger: "blur" }],
      }
    }
  },
  // 自动获取数据
  created() {
    this.fetchData()
  },
  methods: {
    editOptionSupplier() {
      console.log("edit");
      this.isEdit = true;
      this.dialogSupplierVisible = true;
    },
    aBoy(currentRow) {
      if (this.isEdit) {
        this.pojo.supplierName = currentRow.name;
        this.pojo.supplierId = currentRow.id;
        // console.log("0000000000011111111", this.pojo);
      } else {
        // console.log(this.searchMap, '00000000000000');
        this.searchMap.supplierName = currentRow.name;
        this.searchMap.supplierId = currentRow.id;
      }
      this.isEdit = false;
      this.dialogSupplierVisible = false;
    },
    // 编辑-获取数据
    handleEdit(id) {
      console.log("编辑", id);
      this.handleAdd()
      goodsApi.getById(id).then(response => {
        const resp = response.data;
        if (resp.flag) {
          this.pojo = resp.data;
        } else {
          this.$message({
            message: resp.message,
            type: "warning",
          })
        }
      })
      this.pojo.id = id;
      console.log(this.pojo.id, "0000000");
    },
    //提交编辑数据
    updateData(formName) {
      // alert("编辑");
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          goodsApi.update(this.pojo).then(respons => {
            const reps = respons.data;

            if (reps.flag) {
              this.fetchData();
              this.dialogFormVisible = false;
              this.$message({
                message: reps.message,
                type: 'warning'
              })
            } else {
              this.$message({
                message: reps.message,
                type: 'warning'
              })
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
      console.log(this.pojo.id, 'submit');
      console.log(this.pojo, 'submit');
    },
    //提交新增数据
    addData(pojoForm) {
      // alert("1")
      this.$refs[pojoForm].validate((valid) => {
        if (valid) {
          alert('submit!');
          goodsApi.add(this.pojo).then(respons => {
            const reps = respons.data;
            console.log(reps, "pppppppppppppppppp");
            this.$message({
              message: reps.message,
              type: 'warning'
            })
            if (reps.flag) {
              this.fetchData();
              this.dialogFormVisible = false;
            } else {
              this.$message({
                message: reps.message,
                type: 'warning'
              })
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
      console.log(this.pojo.id, 'submit');
      console.log(this.pojo, 'submit');
    },
    //删除
    handleDelete(id) {
      console.log("删除", id);
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        goodsApi.deleteById(id).then(response => {
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
    fetchData() {
      goodsApi.goods(this.currentPage, this.pageSize, this.searchMap).then(respons => {
        const resp = respons.data;
        this.list = resp.data.rows;
        this.total = resp.data.total;
        // console.log(resp, "9999999999999999");
      })
    },
    resetForm(searchMap) {
      // console.log('submit!');
      this.$refs[searchMap].resetFields();
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.fetchData();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.fetchData();
    },
    handleAdd() {
      this.pojo = {
        id: null,
        name: '',
        code: '',
        spec: '',
        purchasePrice: 0,
        retailPrice: 0,
        storageNum: 0,
        supplierName: ''
      },
        this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs['pojoForm'].resetFields();
      })
    }

  },

}
</script>

<style>
</style>