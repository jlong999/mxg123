import response from '@/utils/request';

export default{
    //查询-----分页 page当前页,size 显示多少条
    search(page,size,searchMap){
      return response({
        url: `/staff/list/search/${page}/${size}`,
        method: 'post',
        data: searchMap
      })
    },
}