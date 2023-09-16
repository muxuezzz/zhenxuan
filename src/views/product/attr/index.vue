<!--  -->
<template>
  <Category :scene="scene"></Category>
  <el-card style="margin: 10px 0px">
    <div v-show="scene == 0">
      <el-button
        type="primary"
        size="default"
        icon="Plus"
        :disabled="categoryStore.c3Id ? false : true"
        @click="addAttr"
      >
        添加属性
      </el-button>
      <el-table border style="margin: 10px 0px" :data="attrArr">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80px"
        ></el-table-column>
        <el-table-column
          label="属性名称"
          width="120px"
          prop="attrName"
        ></el-table-column>
        <el-table-column label="属性值名称">
          <template #="{ row, $index }">
            <el-tag
              style="margin: 5px"
              v-for="(item, index) in row.attrValueList"
              :key="item.id"
            >
              {{ item.valueName }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <!-- row：已有的属性对象 -->
          <template #="{ row, $index }">
            <!-- 修改已有属性的按钮 -->
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="updateAttr(row)"
            ></el-button>
            <el-popconfirm
              :title="`你确定删除${row.attrName}?`"
              width="200px"
              @confirm="deleteAttr(row.id)"
            >
              <template #reference>
                <el-button
                  type="primary"
                  size="small"
                  icon="Delete"
                ></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-show="scene == 1">
      <el-form :inline="true">
        <el-form-item label="属性名称">
          <el-input
            placeholder="请你输入属性名称"
            v-model="attrParams.attrName"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button
        type="primary"
        @click="addAttrValue"
        :disabled="!attrParams.attrName"
        size="small"
        icon="Plus"
      >
        添加属性值
      </el-button>
      <el-button type="primary" size="small">取消</el-button>
      <el-table
        border
        style="margin: 10px 0px"
        :data="attrParams.attrValueList"
      >
        <el-table-column
          label="序号"
          width="80px"
          type="index"
          align="center"
        ></el-table-column>
        <el-table-column label="属性值名称">
          <!-- row为当前的属性值对象 -->
          <template #="{ row, $index }">
            <el-input
              :ref="(vc: any) => inputArr[$index] = vc"
              v-if="row.flag"
              @blur="toLook(row, $index)"
              size="small"
              placeholder="请你输入属性值名称"
              v-model="row.valueName"
            ></el-input>
            <div v-else @click="toEdit(row, $index)">{{ row.valueName }}</div>
          </template>
        </el-table-column>

        <el-table-column label="属性值操作">
          <template #="{ row, $index }">
            <el-button
              type="primary"
              size="small"
              icon="Delete"
              @click="() => attrParams.attrValueList.splice($index, 1)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" size="small" @click="save">保存</el-button>
      <el-button type="primary" size="small" @click="cancel">取消</el-button>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { watch, ref, reactive, nextTick, onBeforeUnmount } from 'vue'
import {
  reqAttr,
  reqAddOrUpdateAttr,
  reqRemoveAttr,
} from '@/api/product/attr/index'
import type { AttrResponseData, Attr, AttrValue } from '@/api/product/attr/type'

import useCategoryStore from '@/store/modules/category'
import { ElMessage } from 'element-plus'
let categoryStore = useCategoryStore()

let attrArr = ref<Attr[]>([])

// 定义card内容切换的变量
let scene = ref<number>(0) //scene: 0:属性列表 1:添加&修改属性

// 定义一个数据来控制input栏编辑模式和响应模式的切换
// let flag = ref<boolean>(true);
// 全局只用了一个flag会导致互相影响

// 收集新增或者修改的数据
let attrParams = reactive<Attr>({
  attrName: '',
  attrValueList: [],
  categoryId: '', //三级分类的ID
  categoryLevel: 3,
})

//准备一个数组:将来存储对应的组件实例el-input
let inputArr = ref<any>([])

// 监听三级分类的变化
watch(
  () => categoryStore.c3Id,
  () => {
    // 每次变换时需要清除原始的数据
    attrArr.value = []
    if (categoryStore.c3Id) {
      getAttr()
    }
  },
)

const getAttr = async () => {
  // 获取分类的ID
  const { c1Id, c2Id, c3Id } = categoryStore
  let result: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id)
  console.log('getAttr()')
  console.log(result)
  if (result.code === 200) {
    attrArr.value = result.data
  }
}

const updateAttr = (row: Attr) => {
  scene.value = 1

  // 展示已有的属性与属性值赋值给attrParams
  // 这行代码是浅拷贝，会指向同一个地址
  // Object.assign(attrParams, row);
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
  // console.log(row);
}

const deleteAttr = async (id: number) => {
  let result: any = await reqRemoveAttr(id)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getAttr()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}

const addAttr = () => {
  // 每次点击的时候需要清空原始的数据
  Object.assign(attrParams, {
    attrName: '',
    attrValueList: [],
    categoryId: categoryStore.c3Id, //三级分类的ID
    categoryLevel: 3,
  })

  //获取最后el-input组件聚焦
  nextTick(() => {
    inputArr.value[attrParams.attrValueList.length - 1].focus()
  })

  scene.value = 1
  // 点击新增属性时收集三级分类的ID,在初始化的时候完成
  // attrParams.categoryId = categoryStore.c3Id;
}

const save = async () => {
  // 保存属性
  let result: any = await reqAddOrUpdateAttr(attrParams)
  if (result.code == 200) {
    // 切换场景
    scene.value = 0
    ElMessage({
      type: 'success',
      message: attrParams.id ? '修改成功' : '添加成功',
    })
    // 更新列表
    getAttr()
  } else {
    ElMessage({
      type: 'error',
      message: attrParams.id ? '修改失败' : '添加失败',
    })
  }
}

const cancel = () => {
  scene.value = 0
}

const addAttrValue = () => {
  //点击添加属性按钮的时候向数组添加一个属性值对象
  attrParams.attrValueList.push({
    valueName: '',
    flag: true,
  })
}

//属性值表单元素失却焦点事件回调
const toLook = (row: AttrValue, $index: number) => {
  //非法情况判断1
  if (row.valueName.trim() == '') {
    //删除调用对应属性值为空的元素
    attrParams.attrValueList.splice($index, 1)
    //提示信息
    ElMessage({
      type: 'error',
      message: '属性值不能为空',
    })
    return
  }
  //非法情况2
  let repeat = attrParams.attrValueList.find((item) => {
    //切记把当前失却焦点属性值对象从当前数组扣除判断
    if (item != row) {
      return item.valueName === row.valueName
    }
  })

  if (repeat) {
    //将重复的属性值从数组当中干掉
    attrParams.attrValueList.splice($index, 1)
    //提示信息
    ElMessage({
      type: 'error',
      message: '属性值不能重复',
    })
    return
  }
  //相应的属性值对象flag:变为false,展示div
  row.flag = false
}

//属性值div点击事件
const toEdit = (row: AttrValue, $index: number) => {
  //相应的属性值对象flag:变为true,展示input
  row.flag = true
  // nextTick:响应式数据发生变化,获取更新的DOM(组件实例)
  nextTick(() => {
    inputArr.value[$index].focus()
  })
}

const handle = () => {
  console.log('handle')
}

onBeforeUnmount(() => {
  // 切换路由时清空数据
  useCategoryStore().$reset()
})
</script>

<style lang="scss" scoped></style>
