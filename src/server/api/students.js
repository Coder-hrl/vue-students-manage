// /plf_user_student/list
import request from '../request.js'

export const listStudent = (query) => {
  return request({
    url: '/plf_user_student/list',
    method: 'get',
    params: query,
  })
}

export const addStudent = (data) => {
  return request({
    url: '/plf_user_student/save',
    method: 'POST',
    data,
  })
}

export const editStudent = (data) => {
  return request({
    url: '/plf_user_student/update',
    method: 'POST',
    data,
  })
}

export const delStudent = (data) => {
  return request({
    url: '/plf_user_student/delete',
    method: 'POST',
    data,
  })
}
