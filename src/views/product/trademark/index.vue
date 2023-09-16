<!--  -->
<template>
  <el-card class="box-card">
    <!-- 头部具名插槽 
            <template #header>
            <div class="card-header">
                <span>Card name</span>
                <el-button class="button" text>Operation button</el-button>
            </div>
        </template> -->

    <!-- 顶部添加卡牌的按钮 -->
    <el-button type="primary" size="default" icon="Plus" @click="addTradeMark">
      添加品牌
    </el-button>
    <!-- 表格组件 -->
    <el-table style="margin: 10px 0px" border :data="trademarkArr">
      <el-table-column width="80px" label="序号" type="index" align="center"></el-table-column>
      <!-- <el-table-column label="品牌名称" prop="tmName"></el-table-column> -->
      <!-- 除了使用prop外还有自定义方式，可以加一些操作 -->
      <el-table-column label="品牌名称">
        <template #="{ row, $index }">
          <pre style="color: red">{{ row.tmName }}</pre>
        </template>
      </el-table-column>
      <el-table-column label="品牌LOGO">
        <template #="{ row, $index }">
          <img :src="row.logoUrl" style="height: 100px; width: 100px" />
        </template>
      </el-table-column>
      <el-table-column label="品牌操作">
        <template #="{ row, $index }">
          <el-button type="primary" size="small" icon="Edit" @click="updateTradeMark(row)"></el-button>
          <el-popconfirm :title="`您确认要删除当前品牌${row.tmName}吗`" width="250px" icon="Delete"
            @confirm="removeTrademark(row.id)">
            <template #reference>
              <el-button type="primary" size="small" icon="Delete"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
      <!-- <el-pagination background layout="prev, pager, next" :total="1000" /> -->
    </el-table>

    <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>

    <!-- 分页器组件 
            v-model:current-page->设置当前页码
            v-model:page-size->设置每页显示多少条数据
            :page-sizes->设置每页显示多少条数据，可修改 而改变页数
            :small->设置分页器的大小 boolean值,默认为false
            :background->设置分页器是否有背景色 boolean值
            :layout->设置分页器的六个子组件的布局，相互之间的位置,->表示中间被空白填充
        -->

    <el-pagination @current-change="getHasTrademark" @size-change="sizeChange" v-model:current-page="pageNo"
      v-model:page-size="limit" :page-sizes="[3, 5, 10, 20, 30, 40]" :small="true" :background="true"
      layout="total, sizes, prev, pager, ->,next, jumper" :total="total" />
  </el-card>

  <!-- 对话框组件:在添加已有品牌和修改已有品牌时使用的结构 -->
  <el-dialog v-model="dialogFormVisible" title="添加品牌">
    <el-form style="width: 80%" :model="trademarkParams" :rules="rules" ref="formRef">
      <el-form-item label="品牌名称" label-width="80px" prop="tmName">
        <el-input placeholder="请输入品牌名称" v-model="trademarkParams.tmName"></el-input>
      </el-form-item>
      <el-form-item label="品牌logo" label-width="80px" prop="logoUrl">
        <el-upload class="avatar-uploader" action="http://sph-api.atguigu.cn/admin/product/fileUpload"
          :show-file-list="true" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <!-- el-dialog中的具名插槽 -->
    <template #footer>
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
      <el-button type="primary" size="default" @click="confirm">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import {
  reqHasTrademark,
  reqAddorUpdateTrademark,
  reqDeleteTrademark,
} from '@/api/product/trademark/index'
import {
  Records,
  TrademarkResponseData,
  Trademark,
} from '@/api/product/trademark/type'
import { ElMessage, UploadProps } from 'element-plus'
// 当前页码
let pageNo = ref<number>(1)
// 每页显示多少条数据
let limit = ref<number>(3)
// 存储已有品牌的数据总数
let total = ref<number>(0)
//  存储已有品牌的数据
let trademarkArr = ref<Records>([])
// 控制对话窗的显示和隐藏
let dialogFormVisible = ref<boolean>(true)
// 定义新增品牌的数据
let trademarkParams = reactive<Trademark>({
  tmName: '',
  logoUrl: '',
})

// 获取上面得到的组件实例
let formRef = ref()

// let pageNo = ref<number>(1);

// 将获取已有品牌的接口封装为一个函数
const getHasTrademark = async (pager = 1) => {
  pageNo.value = pager
  let result: TrademarkResponseData = await reqHasTrademark(
    pageNo.value,
    limit.value,
  )
  console.log(result)
  if (result.code === 200) {
    // 已有品牌的数据总数
    total.value = result.data.total
    trademarkArr.value = result.data.records
  }
}

//上传图片组件->上传图片之前触发的钩子函数
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  //钩子是在图片上传成功之前触发,上传文件之前可以约束文件类型与大小
  //要求:上传文件格式png|jpg|gif 4M
  if (
    rawFile.type == 'image/png' ||
    rawFile.type == 'image/jpeg' ||
    rawFile.type == 'image/gif'
  ) {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '上传文件大小不能超过4M',
      })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上传文件格式务必PNG|JPG|GIF',
    })
    return false
  }
}

//图片上传成功钩子
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response
) => {
  //response:即为当前这次上传图片post请求服务器返回的数据
  //收集上传图片的地址,添加一个新的品牌的时候带给服务器
  trademarkParams.logoUrl = response.data
  //图片上传成功,清除掉对应图片校验结果
  formRef.value.clearValidate('logoUrl')
}

// 组件挂载完毕钩子，调用获取已有品牌的接口
onMounted(() => {
  getHasTrademark()
})

// 分页器产生页码变化时产生
const sizeChange = () => {
  getHasTrademark()
}

const addTradeMark = () => {
  dialogFormVisible.value = true
  trademarkParams.id = 0
  trademarkParams.tmName = ''
  trademarkParams.logoUrl = ''

  // 第一次调用时 formRef 还没有初始化
  formRef.value?.clearValidate('tmName')
  formRef.value?.clearValidate('logoUrl')
}

const updateTradeMark = (row: Trademark) => {
  // ES6一行搞定
  // trademarkParams.id = row.id;
  // trademarkParams.tmName = row.tmName;
  // trademarkParams.logoUrl = row.logoUrl;
  // dialogFormVisible.value = true;

  // 第一次调用时 formRef 还没有初始化
  // formRef.value?.clearValidate('tmName');
  // formRef.value?.clearValidate('logoUrl');
  formRef.value?.resetFields()

  dialogFormVisible.value = true
  Object.assign(trademarkParams, row)
}

const cancel = () => {
  dialogFormVisible.value = false
}

const confirm = async () => {
  // 触发所有校验规则，避免上传文件时无法触发trigger的问题
  await formRef.value.validate()
  // console.log(checkResult);

  let result: any = await reqAddorUpdateTrademark(trademarkParams)
  console.log(result)
  if (result.code === 200) {
    // 添加成功，先关闭对话框
    dialogFormVisible.value = false
    // 弹出提示并更新
    ElMessage({
      type: 'success',
      message: trademarkParams.id ? '修改成功' : '添加成功',
    })
    // 修改时不应该跳转页面
    getHasTrademark(trademarkParams.id ? pageNo.value : 1)
  } else {
    ElMessage({
      type: 'error',
      message: trademarkParams.id ? '修改失败' : '添加失败',
    })
  }
  dialogFormVisible.value = false
}

const validatorTmName = (rule: any, value: any, callback: any) => {
  console.log(rule)
  // 自定义校验规则
  if (value.trim().length < 2) {
    callback(new Error('品牌名需要大于等于两位'))
  } else {
    callback()
  }
}

const validatorLogoUrl = (value: any, callback: any) => {
  if (!value) {
    callback(new Error('请上传品牌logo'))
  } else {
    callback()
  }
}

// 表单校验规则对象
const rules = {
  tmName: [
    {
      required: true,
      message: '请输入品牌名称',
      trigger: 'blur',
      validator: validatorTmName,
    },
  ],
  logoUrl: [
    { required: true, message: '请上传品牌logo', validator: validatorLogoUrl },
  ],
}

const removeTrademark = async (id: number) => {
  let result = await reqDeleteTrademark(id)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除品牌成功',
    })
    // 再次获得已有的品牌数据
    getHasTrademark(
      trademarkArr.value.length > 1 ? pageNo.value - 1 : pageNo.value,
    )
  } else {
    ElMessage({
      type: 'error',
      message: '删除品牌失败',
    })
  }
}
</script>

<style lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.el-upload img {
  height: 100%;
  width: 100%;
  border: 1px solid black;
}
</style>
