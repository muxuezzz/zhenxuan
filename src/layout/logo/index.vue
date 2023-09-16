!
<!--  -->
<template>
  <div class="logo" v-if="setting.logoHidden">
    <img src="@/assets/public/logo.png" alt="" />
    <p>{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
// 引入设置文件中的设置
import setting from '@/setting'
</script>

<script lang="ts">
export default {
  name: 'Logo',
}
</script>

<style lang="scss" scoped>
.logo {
  width: 100%;
  height: $base-menu-logo-height;
  color: white;
  display: flex;
  align-items: center;
  padding: 10px;

  img {
    height: 40px;
    width: 40px;
  }

  p {
    font-size: $base-menu-logo-title-fontsize;
    margin-left: 10px;
    white-space: nowrap;
  }
}
</style>
