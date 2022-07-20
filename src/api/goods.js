import response from '@/utils/request';

export default {
  //获取数据
  //查询-----分页 page当前页,size 显示多少条
  goods(page, size, searchMap) {
    return response({
      url: `/goods/list/search/${page}/${size}`,
      method: 'post',
      data: searchMap
    })
  },
  //新增
  add(pojo) {
    return response({
      url: `/goods`,
      method: 'post',
      data: pojo
    })
  },
  //编辑查询
  getById(id) {
    return response({
      url: `/goods/${id}`,
      method: "get",
    })
  },
  //提交编辑数据
  update(pojo) {
    return response({
      url: `/goods/${pojo.id}`,
      method: "put",
      data:pojo
    })
  },
  // 
  deleteById(id) {
    return response({
      url: `/goods/${id}`,
      method: 'delete',
    })
  },
}