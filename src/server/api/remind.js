import request from '../request.js'

// 教师新增提醒
export const listRemind = (query) => {
  return request({
    url: '/plf_user_keeper_remind/list',
    method: 'get',
    params: query,
  })
}

export const addRemind = (data) => {
  return request({
    url: '/plf_user_keeper_remind/save',
    method: 'POST',
    data,
  })
}

export const editRemind = (data) => {
  return request({
    url: '/plf_user_keeper_remind/update',
    method: 'POST',
    data,
  })
}
export const delRemind = (data) => {
  return request({
    url: '/plf_user_keeper_remind/delete',
    method: 'POST',
    data,
  })
}
