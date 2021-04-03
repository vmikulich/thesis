const fetch  =(axios, payload) => {
  const url = `/api/order?offset=${payload.offset}&limit=${payload.limit}`
  return axios.get(url).then(res => Promise.resolve(res.data)).catch(e => Promise.reject(e.response.data))
}

const create = (axios, payload) => {
  const url = '/api/order'
  return axios.post(url, payload).then(res => Promise.resolve(res.data)).catch(e => Promise.reject(e.response.data))
}

export default {
  fetch,
  create
}