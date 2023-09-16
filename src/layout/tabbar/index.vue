<!--  -->
<template>
  <div class="tabbar">
    <div class="tabbar-left">
      <!-- 顶部的左侧静态 -->
      <Breadcrumb></Breadcrumb>
    </div>
    <div class="tabbar-right">
      <Setting></Setting>
    </div>
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from './breadcrumb/index.vue'
import Setting from './setting/index.vue'
</script>

<script lang="ts">
export default {
  name: 'Tabbar',
}
</script>

<style lang="scss" scoped>
.tabbar {
  width: 100%;
  height: 100%;
  // background-color: #f00;
  display: flex;
  justify-content: space-between;
  // 加渐变色
  background-image: linear-gradient(
    to right,
    rgb(188, 187, 187),
    rgb(192, 109, 109),
    rgb(169, 166, 166)
  );

  .tabbar-left {
    display: flex;
    align-items: center;
    margin-left: 20px;
  }

  .tabbar-right {
    display: flex;
    align-items: center;
    margin-right: 20px;
  }
}
</style>
