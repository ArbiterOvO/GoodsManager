import request from '@/utils/request'

//获取所有商品
export const getGoodAll = () => {
  return request.get('/good/all')
}

//通过id获取商品信息
export const getGoodById = (id) => {
  return request.get(`/good/${id}`)
}

//新增商品
export const addGood = (data) => {
  return request.post('/good/add', data)
}

//编辑商品
export const editGood = (data) => {
  return request.post('/good/edit', data)
}

//根据id删除商品
export const deleteGood = (id) => {
  return request.delete(`/good/delete/${id}`)
}

//搜索商品
export const searchGood = (data) => {
  return request.post('/good/search', data)
}

//上传图片
export const uploadImg = (file, data) => {
  return request({
    url: '/good/upload/imgs',
    method: 'post',
    data: file,
    params: {
      goodId: data.goodId,
      type: data.type
    }
  })
}
