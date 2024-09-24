import request from '@/utils/request'

//获取所有品牌
export const getBrandAll = () => {
  return request.get('/brand/all')
}

//通过id获取品牌
export const getBrandById = (id) => {
  return request.get(`/brand/${id}`)
}

//添加品牌
export const addBrand = (data) => {
  return request.post('/brand/add', data)
}

//删除品牌
export const deleteBrand = (id) => {
  return request.delete(`/brand/delete/${id}`)
}

//修改品牌
export const editBrand = (data) => {
  return request.post('/brand/edit', data)
}

//搜索品牌
export function searchBrand(data) {
  return request({
    url: '/brand/search',
    method: 'post',
    params: {
      name: data
    }
  })
}
