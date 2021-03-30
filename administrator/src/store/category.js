import axios from 'axios'
import categoriesService from '../services/category/index'

export default {
  state: {
    categories: null,
    categoryById: null
  },

  actions: {
    async getCategories({ commit }) {
      commit('setLoading', true)
      const res = await categoriesService.get(axios)
      commit('setCategories', res)
      commit('setLoading', false)
      // axios.get(`http://localhost:5000/api/category`).then(res => {
      //   context.commit("setCategories", res.data)
      //   context.commit('setLoading', false)
      // })
    },
    async getCategoryById({ commit }, payload) {
      const res = await categoriesService.getById(axios, { id: payload })
      commit('setCategoryById', res)
      // axios.get(`http://localhost:5000/api/category/${payload}`)
      //   .then(res => {
      //     context.commit("setCategoryById", res.data)
      //   });
    },
    async createCategory({ commit }, payload) {
      commit('setLoading', true)
      const fd = new FormData()
      if (payload.imageSrc) {
        fd.append('image', payload.imageSrc, payload.imageSrc.name)
      }
      fd.append('name', payload.name)
      const res = await categoriesService.create(axios, fd)
      commit('adCategory', res)
      commit('setLoading', false)
      // axios.post(`http://localhost:5000/api/category`, fd)
      //   .then((res) => {
      //     context.commit("adCategory", res.data)
      //     context.commit('setLoading', false)
      //   })
    },
    async updateCategory(context, payload) {
      const fd = new FormData()
      if (payload.imageSrc) {
        fd.append('image', payload.imageSrc, payload.imageSrc.name)
      }
      fd.append('name', payload.name)
      await categoriesService.update(axios, { data: fd, id: payload.id })
      // axios.patch(`http://localhost:5000/api/category/${payload.id}`, fd)
    },
    async removeCategory(context, payload) {
      await categoriesService.remove(axios, { id: payload })
      // return axios.delete(`http://localhost:5000/api/category/${payload}`)
    }
  },

  mutations: {
    setCategories(state, payload) {
      state.categories = payload
    },
    setCategoryById(state, payload) {
      state.categoryById = payload
    },
    adCategory(state, payload) {
      state.categories.push(payload)
    },
    setCategoryPositions(state, payload) {
      state.categoryPositions = payload
    }
  },

  getters: {
    categories(state) {
      return state.categories
    },
    currentCategory(state) {
      return state.categoryById
    }
  }
}