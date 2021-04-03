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
    },
    async getCategoryById({ commit }, payload) {
      const res = await categoriesService.getById(axios, { id: payload })
      commit('setCategoryById', res)
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
    },
    async updateCategory(context, payload) {
      const fd = new FormData()
      if (payload.imageSrc) {
        fd.append('image', payload.imageSrc, payload.imageSrc.name)
      }
      fd.append('name', payload.name)
      await categoriesService.update(axios, { data: fd, id: payload.id })
    },
    async removeCategory(context, payload) {
      await categoriesService.remove(axios, { id: payload })
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