const validatorUserName = (value: string, callback: any) => {
  // rule即为校验规则对象
  // value即为需要校验的值
  // callback是一个回调函数

  // 如果callback()则表示校验通过
  // 如果callback(new Error('xxx'))则表示校验失败，并且会提示Error中的错误信息
  if (value.length >= 5) {
    callback
  } else {
    callback(new Error('用户名长度至少五位'))
  }
}

export const rules = {
  username: [
    { required: true, validator: validatorUserName, trigger: 'change' },
  ],
  password: [
    {
      required: true,
      min: 6,
      max: 16,
      message: '密码长度至少六位',
      trigger: 'change',
    },
    // { required: true, min: 6, max: 16, message: '密码长度至少六位', trigger: 'change' },
  ],
}
// 一个规则对应数组里的一个对象
