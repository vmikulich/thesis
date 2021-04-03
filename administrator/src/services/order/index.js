const create = (axios, payload) => {
  const url = '/api/order'
  return axios.post(url, payload).then(res => Promise.resolve(res.data)).catch(e => Promise.reject(e.response.data))
}

export default {
  create
}