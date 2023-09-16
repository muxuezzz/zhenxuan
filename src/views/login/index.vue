<!--  -->
<!-- <template>
    <div class="login_container">
        <el-row>
            <el-col :span="12" :xs="0"> </el-col>
            <el-col :span="12" :xs="24">
                <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForms">
                    <h1>Hello</h1>

                    <h2>欢迎来到硅谷甄选</h2>
                    <el-form-item prop="username">
                        <el-input :prefix-icon='User' v-model="loginForm.username"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" :prefix-icon='Lock' v-model="loginForm.password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button :loading="loading" class="login_btn" type="primary" size="default"
                            @click="login">登录</el-button>
                    </el-form-item>
                </el-form>

            </el-col>
        </el-row>
    </div>
</template> -->

<template>
  <div class="content">
    <div class="introduce">
      <div class="introduce-content">
        <p class="tips animate__animated animate__backInLeft">
          硅谷甄选商城是一个服务于线上商城管理的后台项目，它主要用于实现多类型多来源商品数据的提交、管理和共享以及不同用户的信息管理及权限调整、根据用户信息进行用户画像的可视化处理。
        </p>
      </div>
    </div>
    <div class="form-wrapper animate__animated animate__slideInRight">
      <el-form
        class="login-form"
        :model="loginForm"
        :rules="rules"
        ref="loginForms"
      >
        <h1>您好</h1>
        <span>欢迎来到硅谷甄选!</span>
        <div class="other-login">
          <img
            src="@/assets/images/WeChat.png"
            alt=""
            style="margin-right: 8px"
          />
          <span>使用微信登录</span>
        </div>
        <div class="divider">
          <span class="line"></span>
          <span class="divider-text">或者使用账号密码登录</span>
          <span class="line"></span>
        </div>
        <!-- <el-form-item prop="username">
                                <el-input :prefix-icon='User' v-model="loginForm.username"></el-input>
                            </el-form-item>
                            <el-form-item prop="password">
                                <el-input type="password" :prefix-icon='Lock' v-model="loginForm.password"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button :loading="loading" class="login_btn" type="primary" size="default"
                                    @click="login">登录</el-button>
                            </el-form-item> -->
        <el-form-item class="form">
          <el-form-item class="input-wrapper" prop="username">
            <span class="input-tips">用户名</span>
            <!-- <el-input :prefix-icon='User' v-model="loginForm.username" class="ipt"
                            placeholder="usernamed"></el-input> -->
            <input
              type="text"
              :prefix-icon="User"
              v-model="loginForm.username"
              class="ipt"
              placeholder="username"
            />
            <!-- <input type="text" class="ipt" placeholder="mail@website.com"> -->
          </el-form-item>
          <el-form-item class="input-wrapper" prop="password">
            <span class="input-tips">密码</span>
            <input
              type="password"
              :prefix-icon="Lock"
              v-model="loginForm.password"
              class="ipt"
              placeholder="password"
            />
            <!-- <el-form-item prop="password">
                            <el-input type="password" :prefix-icon='Lock'
                                v-model="loginForm.password"></el-input>
                        </el-form-item> -->
            <!-- <input type="password" class="ipt" placeholder="Min. 8 character"> -->
          </el-form-item>
          <!-- <button class="btn" @click="login">Login</button> -->
          <el-form-item class="input-wrapper">
            <el-button
              :loading="loading"
              class="btn"
              native-type
              type="primary"
              size="large"
              @click="login"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import useUserStore from '@/store/modules/user'
import { ElNotification } from 'element-plus'
import { getTime } from '@/utils/time'
import { rules } from '@/utils/formCheck'

let userStore = useUserStore()
let $router = useRouter()
let $route = useRoute()
// 定义变量控制按钮加载效果
let loading = ref(false)

let loginForm = reactive({
  username: 'admin',
  password: 'atguigu123',
})
let loginForms = ref()

const login = async () => {
  // 点击登录按钮之后干什么？
  // 通知仓库发出登录请求
  // 请求成功->首页展示数据的内容
  // 请求失败->弹出失败提

  // 1。根据el-form中的validate方法进行表单验证
  // await loginForms.value.validate();

  loading.value = true
  try {
    // 保证登录成功
    await userStore.userLogin(loginForm)
    loading.value = false
    // 编程示导航跳转到首页

    // 判断路由当中是否有redirect参数
    let redirect = $route.query.redirect as string
    $router.push({ path: redirect || '/' })
    ElNotification({
      title: '登录成功',
      message: getTime(),
      type: 'success',
    })
  } catch (err) {
    loading.value = false
    console.log(err)
    ElNotification({
      title: '登录失败',
      message: (err as Error).message,
      type: 'error',
    })
  }
}
</script>

<style scoped lang="scss">
// @import url(style/style.css);
@import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css');

.content {
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  overflow: hidden;
  background-image: url('@/assets/images/bg.jpg');
  // background-image: url('@/assets/images/background.jpg');
  background-attachment: fixed;
  background-size: cover;
  color: #fff;

  .introduce {
    width: 50%;
    height: 100%;
    position: relative;
    position: relative;

    .introduce-content {
      .tips {
        margin: 20px 0;
        font-size: 25px;
        position: absolute;
        left: 20%;
        right: 15%;
        top: 40%;
        transform: translateY(-50%);
      }
    }
  }

  .form-wrapper {
    width: 50%;
    height: 100%;
    position: absolute;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20% 10%;
    box-sizing: border-box;
    background: rgb(0 0 0 / 6%);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);

    .login-form {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      font-family: Butler_Light;

      h1 {
        font-size: 55px;
        margin-bottom: 20px;
      }

      .login-tips {
        font-size: 20px;
      }

      .other-login {
        width: 100%;
        height: 50px;
        line-height: 50px;
        border: 1px solid #fff;
        text-align: center;
        border-radius: 10px;
        box-sizing: border-box;
        margin: 50px 0 10px 0;
        cursor: pointer;
        transition: 0.2s;

        &:hover {
          border: 1px solid #9faff8;
        }

        img {
          width: 30px;
          height: 30px;
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .divider {
        width: 100%;
        margin: 20px 0;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .line {
          display: inline-block;
          flex: 1;
          height: 1px;
          background-color: #fff;
        }

        .divider-text {
          vertical-align: middle;
          margin: 0 20px;
          display: inline-block;
          color: #fff;
          white-space: normal;
        }
      }

      .form {
        .input-wrapper {
          width: 100%;
          height: 60px;
          color: #fff;
          margin: 20px 0 50px 0;

          span {
            display: inline-block;
            margin-bottom: 5px;
          }

          .ipt {
            width: 100%;
            height: 100%;
            border-radius: 10px;
            border: 1px solid #fff;
            padding: 10px 0 10px 30px;
            box-sizing: border-box;
            background-color: transparent;
            outline: none;
            color: #fff;
            font-size: 20px;
            transition: 0.2s;

            &:focus {
              border: 1px solid #9faff8;
            }

            &::-webkit-input-placeholder {
              /* 使用webkit内核的浏览器 */
              color: #fff;
            }

            &:-moz-placeholder {
              /* Firefox版本4-18 */
              color: #fff;
            }

            &::-moz-placeholder {
              /* Firefox版本19+ */
              color: #fff;
            }

            &:-ms-input-placeholder {
              /* IE浏览器 */
              color: #fff;
            }
          }
        }

        .other-setting {
          display: flex;
          justify-content: space-between;

          .rem-pwd {
            cursor: pointer;
          }

          .forget-pwd {
            cursor: pointer;
          }
        }

        .btn {
          width: 100%;
          height: 50px;
          border: 0;
          background-color: #fff;
          border-radius: 5px;
          color: #000;
          text-align: center;
          margin: 50px 0;
          font-size: 20px;
          cursor: pointer;
        }
      }

      .register {
        color: #fff;
        cursor: pointer;
      }
    }
  }
}

@media (max-width: 768px) {
  .content {
    .introduce {
      display: none;
    }

    .form-wrapper {
      width: 100%;

      .login-form {
        .divider {
          margin: 10px 0;
        }

        .other-login {
          margin: 10px 0;
        }

        .form {
          .btn {
            margin: 20px 0;
          }
        }
      }
    }
  }
}

// .login_container {
//     width: 100%;
//     height: 100vh;
//     background: url('@/assets/images/background.jpg') no-repeat;
//     background-size: cover;
//     // background-color: red ;
// }

// .login_form {
//     width: 30%;
//     position: absolute;
//     top: 30vh;
//     background: url('@/assets/images/login_form.png') no-repeat;

//     // background-color: red;
//     background-size: cover;

//     h1 {
//         color: white;
//         font-style: 40px;
//     }

//     h2 {
//         color: gray;
//         font-style: 20px;
//         margin: 20px 0px;
//     }
// }

// .login_btn {
//     width: 100%;
// }
</style>
