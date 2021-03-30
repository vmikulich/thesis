const get = (axios) => {
  const url = '/api/category'
  return axios.get(url).then(res => Promise.resolve(res.data)).catch(e => Promise.reject(e.response.data))
}
const getById = (axios, payload) => {
  const url = `/api/category/${payload.id}`
  return axios.get(url).then(res => Promise.resolve(res.data)).catch(e => Promise.reject(e.response.data))
}
const create = (axios, payload) => {
  const url = '/api/category'
  return axios.post(url, payload).then(res => Promise.resolve(res.data)).catch(e => Promise.reject(e.response.data))
}
const update = (axios, payload) => {
  const url = `/api/category/${payload.id}`
  return axios.patch(url, payload.data).then(res => Promise.resolve(res.data)).catch(e => Promise.reject(e.response.data))
}
const remove = (axios, payload) => {
  const url = `/api/category/${payload.id}`
  return axios.delete(url).then(res => Promise.resolve(res.data)).catch(e => Promise.reject(e.response.data))
}

export default {
  get,
  getById,
  create,
  update,
  remove
}