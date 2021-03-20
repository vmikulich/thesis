export default (axios, payload) => {
  const url = '/api/auth/login'
  return axios.post(url, payload).then(res => Promise.resolve(res.data)).catch(e => Promise.reject(e.response.data))
}