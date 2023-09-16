<!--  -->
<template>
  <el-card>
    <div class="box">
      <img :src="userStore.avatar" alt="" class="avatar" />
      <div class="bottom">
        <h3 class="title">{{ getTime() }}呀{{ userStore.username }}</h3>
        <p class="subtitle">硅谷甄选运营平台</p>
      </div>
    </div>
  </el-card>
  <div class="bottoms">
    <svg-icon name="welcome" width="600px" height="300px"></svg-icon>
  </div>
</template>

<script setup lang="ts">
// 在路由守卫中获取用户信息

// // 引入组合式API的生命周期函数
import { getTime } from '@/utils/time'
import { onMounted } from 'vue'
// 获取仓库
import useUserStore from '@/store/modules/user.ts'
let userStore = useUserStore()

// 获取用户信息
const getUserInfo = () => {
  userStore.userInfo()
}

onMounted(() => {
  getUserInfo()
})
</script>

<style lang="scss" scoped>
.box {
  display: flex;

  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }

  .bottom {
    margin-left: 20px;

    .title {
      font-size: 30px;
      font-weight: 900;
      margin-bottom: 30px;
    }

    .subtitle {
      font-style: italic;
      color: skyblue;
    }
  }
}

.bottoms {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}
</style>
