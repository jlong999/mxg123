<template>
  <div>
    <el-form ref="searchForm" :inline="true" :model="searchMap" class="demo-form-inline" style="margin-top:20px"
      width="100px">
      <el-form-item prop="cardNum">
        <el-input v-model="searchMap.cardNum" placeholder="会员卡号"></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input v-model="searchMap.name" placeholder="会员名字"></el-input>
      </el-form-item>
      <el-form-item prop="region">
        <el-select v-model="searchMap.region" placeholder="支付类型">
          <el-option v-for="pay  in payTypeOptions" :key="pay.type" :label="pay.name" :value="pay.type"></el-option>
          <!-- <el-option label="区域一" value="shanghai"></el-option> -->
          <!-- <el-option label="区域二" value="beijing"></el-option> -->
        </el-select>
      </el-form-item>
      <el-form-item prop="birthday">
        <el-date-picker value-format="yyyy-MM-dd" v-model="searchMap.birthday" type="date" placeholder="出生日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <div class="footer">
          <el-button type="primary" size=" mini" icon="el-icon-search" @click="fetchData">查询</el-button>
          <el-button type="primary" icon="el-icon-edit" @click="handleAdd('pojoForm')" size=" mini">新增</el-button>
          <el-button @click="resetForm('searchForm')" size=" mini">重置</el-button>
        </div>

      </el-form-item>
    </el-form>
    <el-table :data="list" border style="width: 100%" height="420px">
      <el-table-column type="index" label="序号">
      </el-table-column>
      <el-table-column prop="cardNum" label="会员卡号">
      </el-table-column>
      <el-table-column prop="name" label="会员姓名">
      </el-table-column>
      <el-table-column prop="integral" label="可用积分">
      </el-table-column>
      <el-table-column prop="phone" label="手机号码">
      </el-table-column>
      <el-table-column prop="birthday" label="会员生日">
      </el-table-column>
      <el-table-column prop="payType" label="支付类型">
        <template slot-scope="scope">
          <span>{{ scope.row.payType | payTypeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="money" label="开卡金额">

      </el-table-column>
      <el-table-column prop="address" label="会员地址">
      </el-table-column>
      <el-table-column label="操作" width="150px">
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <!-- 弹出框 -->
    <el-dialog :title="pojo.id === null ? '会员新增' : '会员编辑'" :visible.sync="dialogFormVisible" width="500px">
      <el-form :rules="rules" :model="pojo" ref="pojoForm" label-width="120px" label-position="right "
        style="width:400px">
        <el-form-item label="会员卡号" label-width="120px" prop="cardNum">
          <el-input v-model="pojo.cardNum"></el-input>
        </el-form-item>
        <el-form-item label="会员姓名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="pojo.name"></el-input>
        </el-form-item>
        <el-form-item label="会员生日" prop="birthday">
          <el-date-picker value-format="yyyy-MM-dd" v-model="pojo.birthday" type="date" placeholder="会员生日">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="手机号码" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="pojo.phone"></el-input>
        </el-form-item>
        <el-form-item label="开卡金额" :label-width="formLabelWidth" prop="money">
          <el-input v-model="pojo.money"></el-input>
        </el-form-item>
        <el-form-item label="可以积分" :label-width="formLabelWidth" prop="integral">
          <el-input v-model="pojo.integral"></el-input>
        </el-form-item>
        <!-- <el-form-item label="支付类型" :label-width="formLabelWidth">
          <el-select v-model="pojo.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="支付类型" :label-width="formLabelWidth" prop="region">
          <el-select v-model="pojo.region" placeholder="支付类型" style="width:120px">
            <el-option v-for="pay  in payTypeOptions" :key="pay.type" :label="pay.name" :value="pay.payType">
            </el-option>
            <!-- <el-option label="区域一" value="shanghai"></el-option> -->
            <!-- <el-option label="区域二" value="beijing"></el-option> -->
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="会员地址" >
          <el-input v-model="pojo.address"></el-input>
        </el-form-item> -->
        <el-form-item label="会员地址" prop="address" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="pojo.address"></el-input>
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
import memberApi from '../../api/member';
const payTypeOptions = [
  { type: '1', name: '现金' },
  { type: '2', name: '微信' },
  { type: '3', name: '支付宝' },
  { type: '4', name: '银行卡' },
]
export default {
  data() {
    return {
      list: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      searchMap: {
        cardNum: '',
        name: '',
        region: '',
        birthday: ''
      },
      payTypeOptions,
      dialogTableVisible: false,
      dialogFormVisible: false,
      pojo: {
        id: null,
        integral: null,
        cardNum: '',
        name: '',
        region: '',
        birthday: '',
        address: '',
        money: null,
        phone: ''

      },
      rules:
      {
        cardNum: [{ required: true, message: '卡号不能为空', trigger: "blur" }],
        name: [{ required: true, message: '姓名不能为空', trigger: "blur" }],
        // region: [{ required: true, message: '支付类型不能为空', trigger: "change" }],
        // desc: [
        //   { required: true, message: '请填写活动形式', trigger: 'blur' }
        // ]
      },
      formLabelWidth: '120px',
    }
  }
  ,
  created() {
    this.fetchData()
  },
  methods: {
    resetForm(searchForm) {
      console.log("重置", searchForm);
      this.$refs[searchForm].resetFields();
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val
      this.fetchData()
    },
    fetchData() {
      // memberApi.getList().then(response => {
      memberApi.search(this.currentPage, this.pageSize, this.searchMap).then(response => {

        const resp = response.data
        console.log(resp, "resp");
        this.list = resp.data.rows;
        this.total = resp.data.total
        // this.currentPage=resp.
        // this.list = resp.data;


      })
    },
    addData(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert('新增成功!');
          memberApi.add(this.pojo).then(response => {
            const resp = response.data
            this.$message({
              message: "新增成功",
              type: 'warning'
            })
            if (resp.flag) {
              this.fetchData();
              this.dialogFormVisible = false

            } else {
              this.$message({
                message: resp.message,
                type: 'warning',
              })
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    handleAdd() {
      this.dialogFormVisible = true;
      // this.$refs['pojoForm'].resetFields();
      this.$nextTick(() => {
        this.$refs['pojoForm'].resetFields();
      })

    },
    //打开编辑窗口
    handleEdit(id) {
      console.log("编辑", id);
      this.handleAdd()
      memberApi.getByid(id).then(response => {
        const resp = response.data;
        console.log(resp, "1111111111");
        if (resp.flag) {
          this.pojo = resp.data;

        }
      })

    },
    updateData(formName) {
      console.log('updateData', this.pojo);
      this.$refs[formName].validate(valid => {
        if (valid) {
          memberApi.update(this.pojo).then(response => {
            const resp = response.data;
            console.log(resp, "1111111111");
            this.$message({
              message: "编辑成功",
              type: 'warning'
            })
            if (resp.flag) {
              this.fetchData();
              this.dialogFormVisible = false;

            } else {
              this.$message({
                message: resp.message,
                type: 'warning'
              })
            }
          })
        }
      })
    },
    // handleDelete(pojo) {
    //   console.log();
    // },
    handleDelete(id) {
      console.log("delete", id);
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        memberApi.deleteById(id).then(response => {
          const resp = response.data;
          // this.$message({
          //   message: resp.message,
          //   type:resp.flag ? 'success' : 'error'
          // })
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
    }
  },
  filters: {
    payTypeFilter(payType) {
      // payTypeOptions.find(obj=>{
      //   return obj.type == type;

      // })
      const objPay = payTypeOptions.find(obj => obj.type === payType);
      return objPay ? objPay.name : null;
    }
  }

}

</script>

<style>

</style>