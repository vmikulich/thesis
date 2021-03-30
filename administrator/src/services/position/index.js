const get = (axios, payload) => {
  const url = `/api/position/${payload}`
  return axios.get(url).then(res => Promise.resolve(res.data)).catch(e => Promise.reject(e.response.data))
}
const create = (axios, payload) => {
  const url = '/api/position'
  return axios.post(url, payload).then(res => Promise.resolve(res.data)).catch(e => Promise.reject(e.response.data))
}
const update = (axios, payload) => {
  const url = `/api/position/${payload.id}`
  return axios.patch(url, payload.data).then(res => Promise.resolve(res.data)).catch(e => Promise.reject(e.response.data))
}
const remove = (axios, payload) => {
  const url = `/api/position/${payload.id}`
  return axios.delete(url).then(res => Promise.resolve(res.data)).catch(e => Promise.reject(e.response.data))
}

export default {
  get,
  create,
  update,
  remove
}