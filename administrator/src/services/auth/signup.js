export default (axios, payload) => {
  const url = '/api/auth/register'
  return axios.post(url, payload).then(res => Promise.resolve(res.data)).catch(e => Promise.reject(e.response.data))
}