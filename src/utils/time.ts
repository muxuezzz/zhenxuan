export const getTime = () => {
  let hour = new Date().getHours()
  if (hour <= 11) return '上午好'
  else if (hour <= 13) return '中午好'
  else if (hour <= 17) return '下午好'
  else return '晚上好'
}
