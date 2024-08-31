import request from '@/utils/request'

//获取所有货源
export function getSourceAll() {
  return request.get('/source/all')
}
