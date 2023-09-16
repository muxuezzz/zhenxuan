<!--  -->
<template>
  <el-card>
    <el-form :inline="true">
      <el-form-item label="一级分类">
        <el-select
          v-model="categoryStore.c1Id"
          @change="handler"
          :disabled="scene"
        >
          <el-option
            v-for="(c1, index) in categoryStore.c1Arr"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          v-model="categoryStore.c2Id"
          @change="handler1"
          :disabled="scene"
        >
          <el-option
            v-for="(c2, index) in categoryStore.c2Arr"
            :key="c2.id"
            :label="c2.name"
            :value="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select v-model="categoryStore.c3Id" :disabled="scene">
          <el-option
            v-for="(c3, index) in categoryStore.c3Arr"
            :key="c3.id"
            :label="c3.name"
            :value="c3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import useCategoryStore from '@/store/modules/category'
let categoryStore = useCategoryStore()

// 分类全局组件挂载
onMounted(() => {
  getC1()
})

const getC1 = () => {
  // 通知分类仓库获取一级分类的数据
  categoryStore.c2Id = ''
  categoryStore.c3Id = ''
  categoryStore.c2Arr = []
  categoryStore.c3Arr = []
  categoryStore.getC1()
}

// 一级分类的change事件
const handler = () => {
  categoryStore.c2Id = ''
  categoryStore.c3Id = ''
  categoryStore.c3Arr = []
  categoryStore.getC2()
}
// 二级分类的change事件
const handler1 = () => {
  categoryStore.c3Id = ''
  categoryStore.getC3()
}

// 接收父组件中的场景参数来保证修改时锁定
defineProps(['scene'])
</script>

<style lang="scss" scoped></style>
