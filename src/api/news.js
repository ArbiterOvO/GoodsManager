import request from '@/utils/request'

//获取所有新闻
export function getNewsAll() {
  return request.get('/news/all')
}
