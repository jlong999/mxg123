<template>
  <div class="main">
    <app-link v-show="$route.path !== '/home'"></app-link>
    <router-view></router-view>
  </div>
</template>

<script>
import AppLink from './Link'
export default {
      components:{
    AppLink
}
}
</script>

<style scoped>
.main {
  position: absolute;
  top: 50px;
  left: 230px;
  /* background-color: aqua; */
  right: 0px;
  bottom: 0px;
  overflow-y: auto;
  padding: 0px;
}

</style>