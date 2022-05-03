import request from '../request'

// /plf_room/save
export const listRoomd = (query) => {
  return request({
    url: '/plf_room/list',
    method: 'get',
    params: query,
  })
}
export const addRoomd = (data) => {
  return request({
    url: '/plf_room/save',
    method: 'POST',
    data,
  })
}
export const editRoomd = (data) => {
  return request({
    url: '/plf_room/update',
    method: 'POST',
    data,
  })
}
export const deleteRoomd = (data) => {
  return request({
    url: '/plf_room/delete',
    method: 'POST',
    data,
  })
}
