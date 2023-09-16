import SvgIcon from './SvgIcon/index.vue'
import Category from './Category/index.vue'
import Pagination from './Pagination/index.vue'
import type { App, Component } from 'vue'

// 引入el-plus中所有的图表组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const components: { [name: string]: Component } = {
  SvgIcon,
  Pagination,
  Category,
}
export default {
  install(app: App) {
    Object.keys(components).forEach((key: string) => {
      app.component(key, components[key])
    })

    for (const [key, components] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, components)
    }
  },
}
