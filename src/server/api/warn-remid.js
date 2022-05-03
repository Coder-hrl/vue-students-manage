import request from '../request.js'

export const listWarn = (query) => {
  return request({
    url: '/plf_user_keeper_warning/list',
    method: 'get',
    params: query,
  })
}

export const addWarn = (data) => {
  return request({
    url: '/plf_user_keeper_warning/save',
    method: 'POST',
    data,
  })
}

export const editWarn = (data) => {
  return request({
    url: '/plf_user_keeper_warning/update',
    method: 'POST',
    data,
  })
}
export const delWarn = (data) => {
  return request({
    url: '/plf_user_keeper_warning/delete',
    method: 'POST',
    data,
  })
}
