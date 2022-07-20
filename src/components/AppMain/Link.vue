<template>
      <el-breadcrumb  separator="/">
      <el-breadcrumb-item class="lint" :to="{ path: $route.path }">{{ $route.meta.title }}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {

}
</script>

<style>
.el-breadcrumb{
  /* width:10px; */
  height: 10px;
  padding: 10px;
  margin-top: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  
}
.lint{
  border-left: 2px solid #31c;
  padding-left: 10px;
}
</style>