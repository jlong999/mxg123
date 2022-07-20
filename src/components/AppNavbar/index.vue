<template>
  <div class="navbar">
    <el-menu :router="true" default-active="/" class="el-menu-vertical-demo" background-color="#545c64"
      text-color="#fff" active-text-color="#ffd04b">
      <el-menu-item index="/home">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/menber/">
        <i class="el-icon-s-custom"></i>
        <span slot="title">会员管理</span>
      </el-menu-item>
      <el-menu-item index="/supplier/">
        <i class="el-icon-s-check"></i>
        <span slot="title">供应商管理</span>
      </el-menu-item>
      <el-menu-item index="/goods/">
        <i class="el-icon-s-shop"></i>
        <span slot="title">商品管理</span>
      </el-menu-item>
      <el-menu-item index="/staff/">
        <i class="el-icon-user-solid"></i>
        <span slot="title">员工管理</span>
      </el-menu-item>
      <el-menu-item index="/chaoji/">
        <i class="el-icon-user-solid"></i>
        <span slot="title">超级会员</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {


}
</script>

<style>
.navbar {
  position: absolute;
  width: 230px;
  background-color: rgb(84, 92, 100);
  top: 50px;
  left: 0px;
  bottom: 0px;
  overflow-y: auto;
}

.el-menu {
  border-right: none;
}
</style>