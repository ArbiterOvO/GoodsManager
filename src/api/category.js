import request from '@/utils/request'

//获得所有分类
export const getCategoryAll = () => {
  return request.get('/category/all')
}
