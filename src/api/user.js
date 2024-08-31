import request from '@/utils/request'

//注册接口
export const registerService = ({ username, password, repassword, age, phone, gender }) => {
  return request.post('/user/register', {
    username,
    password,
    repassword,
    age,
    phone,
    gender
  })
}

//登录接口
export const loginService = ({ username, password }) => {
  return request.post('/user/login', {
    username,
    password
  })
}

//获取当前用户信息接口
export const getUserInfoService = () => {
  return request.get('/user/current')
}
