import response from '@/utils/request'

export function login(username, password) {
  return response({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getUserInfo(token) {
  return response({
    url : `/user/info/${token}`,
    method: 'get'
  })
}
export function logout(token) {
  return response({
    url : `/user/logout`,
    method: 'post',
    data:{
      token
    }
  })
}