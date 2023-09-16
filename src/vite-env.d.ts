/// <reference types="vite/client" />
//解决ts文件引入vue文件出现红色警告问题
declare module '*.vue' {
  import { defineComponent } from 'vue'
  const Component: ReturnType<typeof defineComponent>
  export default Component
}

declare module 'echarts' {
  const echarts: any
  export default echarts
}


// import { ElMessage } from "element-plus";
// declare module 'element-plus' {
//     export class ElMessage {
//         static success(message: string): void;
//         static warning(message: string): void;
//         static info(message: string): void;
//         static error(message: string): void;
//     }
// }
