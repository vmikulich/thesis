export default (axios) => {
  const url = '/api/analytics/overview'
  return axios.get(url).then(res => Promise.resolve(res.data)).catch(e => Promise.reject(e.response.data))
}