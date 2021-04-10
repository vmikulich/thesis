import axios from 'axios'
import analyticsService from '../services/analytics/index'

export default {
  state: {
    overview: null,
    analytics: {}
  },

  actions: {
    async fetchOverviewData ({ commit }, payload) {
      const res = await analyticsService.overview(axios, payload)
      commit('setOverviewData', res)
    },
    async fetchAnalyticsData ({ commit }, payload) {
      const res = await analyticsService.analytics(axios, payload)
      commit('setOAnalyticsData', res)
    }
  },

  mutations: {
    setOverviewData (state, payload) {
      state.overview = payload
    },
    setOAnalyticsData (state, payload) {
      state.analytics = payload
    }
  },

  getters: {
    overview (state) {
      return state.overview
    },
    analytics (state) {
      return state.analytics
    }
  }
}