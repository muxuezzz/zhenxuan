<!--  -->
<template>
  <div>
    <!-- <h1>App根组件</h1> -->
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
// import '@/styles/index.scss'
import { onMounted } from 'vue'
import { reqLogin } from './api/user'
onMounted(() => {
  reqLogin({ username: 'admin', password: '111111' })
})
</script>

<style lang="scss" scoped>
div {
  h1 {
    color: red;
  }
}
</style>
