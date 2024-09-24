import request from '@/utils/request'

//获取所有货源
export function getSourceAll() {
  return request.get('/source/all')
}

//通过id获取货源
export function getSourceById(id) {
  return request.get(`/source/${id}`)
}

//新增货源
export function addSource(data) {
  return request.post('/source/add', data)
}

//删除货源
export function deleteSource(id) {
  return request.delete(`/source/delete/${id}`)
}

//修改货源
export function editSource(data) {
  return request.post('/source/edit', data)
}

//搜索货源
export function searchSource(data) {
  return request({
    url: '/source/search',
    method: 'post',
    params: {
      name: data
    }
  })
}
