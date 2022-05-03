import { createStore } from 'vuex'
import localCache from '@/utils/cache'
import router from '@/router'

export default createStore({
  state: {
    userInfo: {
      userPower: '1'
    },
    token: ''
  },
  mutations: {
    changeUserInfo: (state, payload) => {
      state.userInfo = payload
    },
    changeToken: (state, payload) => {
      state.token = payload
    }
  },
  actions: {
    getInitialDataAction({ commit }) {
      const userInfo = localCache.getCache('userInfo')
      commit('changeUserInfo', userInfo)
      const token = localCache.getCache('token')
      commit('changeToken', token)
      // commit('changeEntirRole', roleList)
      if (userInfo.stuName && token) {
        router.push('/students')
      } else {
        router.push('/teachers')
      }

    }
  },
  modules: {},
})
