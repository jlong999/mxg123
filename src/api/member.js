import response from '@/utils/request';

export default {
  getList() {
    return response({
      url: `/member/list`,
      method: 'get'
    })
  },
  search(page, size, searchMap) {
    return response({
      url: `/member/list/search/${page}/${size}`,
      method: 'post',
      data: searchMap
    })
  },
  // data 里面是提交数据
  add(pojo) {
    return response({
      url: `/member`,
      method: 'post',
      data: pojo
    })
  },
  getByid(id) {
    return response({
      url: `/member/${id}`,
      method: 'get',
    })
  },
  update(pojo) {
    return response({
      url: `/member/${pojo.id}`,
      method: 'put',
      data: pojo
    })
  },
  deleteById(id) {
    return response({
      url: `/member/${id}`,
      method: 'delete',
    })
  },
}