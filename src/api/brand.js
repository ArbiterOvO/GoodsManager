import request from '@/utils/request'

//获取所有品牌
export const getBrandAll = () => {
  return request.get('/brand/all')
}
