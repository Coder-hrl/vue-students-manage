// /plf_user_student_remind/save
import request from '../request.js'

export const listRemind = (query) => {
  return request({
    url: '/plf_user_student_remind/list',
    method: 'get',
    params: query,
  })
}
export const addRemind = (data) => {
  return request({
    url: '/plf_user_student_remind/save',
    method: 'post',
    data,
  })
}
export const editRemind = (data) => {
  return request({
    url: '/plf_user_student_remind/update',
    method: 'post',
    data,
  })
}
export const delRemind = (data) => {
  return request({
    url: '/plf_user_student_remind/delete',
    method: 'post',
    data,
  })
}
