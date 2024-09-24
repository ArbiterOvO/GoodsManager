import request from '@/utils/request'

//获取所有新闻
export function getNewsAll() {
  return request.get('/news/all')
}

//根据id获取新闻
export function getNewsById(id) {
  return request.get(`/news/${id}`)
}
