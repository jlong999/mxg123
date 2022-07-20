import response from '@/utils/request';
export default {
  getList() {
    return response({
      url: `/supplier/list`,
      method: 'get',
    })
  },
  //查询-----分页 page当前页,size 显示多少条
  search(page,size,searchMap){
    return response({
      url: `/supplier/list/search/${page}/${size}`,
      method: 'post',
      data: searchMap
    })
  },
  //新增
  search1(pojo){
    return response({
      url: `/supplier`,
      method: 'post',
      data: pojo
    })
  },
  //编辑查询
  getById(id) {
    return response({
      url: `/supplier/${id}`,
      method: 'get',
    })
  },
  // 编辑查询
  update(pojo) {
    return response({
      url: `/supplier/${pojo.id}`,
      method: 'put',
      data:pojo,//提交修改数据
    })
  },
  //删除
  deleteById(id) {
    return response({
      url: `/supplier/${id}`,
      method: 'delete',
    })
  },
}