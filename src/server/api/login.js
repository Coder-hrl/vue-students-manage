import request from '../request.js'

export const register = (data) => {
  return request({
    url: '/plf_user/register',
    method: 'POST',
    data,
  })
}

export const login = (data) => {
  return request({
    url: '/plf_user/login',
    method: 'POST',
    data,
  })
}

export const stuRegister = (data) => {
  return request({
    url: '/plf_user_student/save',
    method: 'POST',
    data,
  })
}
export const keeperRegister = (data) => {
  return request({
    url: '/plf_user_keeper/save',
    method: 'POST',
    data,
  })
}
