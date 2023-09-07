import { createStore } from 'vuex'

const axios = require('axios')
const instance = axios.create({
  baseURL: "http://localhost:3000/api/v1"
})

let user = localStorage.getItem("user")
if (!user) {
  user = {
    userId: '',
    token: ''
  }
} else {
  try {
    user= JSON.parse(user)
    instance.defaults.headers.comment['Authorization'] = `Bearer ${user.token}`
  } catch (exception) {
    user = {
      userId: '',
      token: ''
    }
  }
}

export default createStore({
  state: {
    status: '',
    user: {
      userId: user.userId,
      token: user.token,
      email: '',
    },
    projects: undefined,
    overviews: undefined,
    images: undefined,
    files: undefined
  },
  getters: {
  },
  mutations: {
    SET_STATUS(state, status) {
      state.status = status
    },
    SET_EMAIL(state, email) {
      state.user.email = email
    },
    LOG(state, user) {
      state.user = user.instance.defaults.header.common['Authorization'] = `Bearer ${user.token}`
      localStorage.setItem('user', JSON.stringify({ userId: user.userId, token: user.token}))
    },
    UNLOG(state) {
      localStorage.removeItem('user')
      state.user = {
        userId: '',
        token: '',
        email: ''
      }
    },
    FILL_PROJECT_ARRAY(state, projects) {
      state.projects = projects
    },
    FILL_OVERVIEWS(state, overviews) {
      state.overviews = overviews
    },
    FILL_IMAGES(state, images) {
      state.images = images
    },
    FILL_FILES(state, files) {
      state.files = files
    }
  },
  actions: {
    login: ({commit}, userLogDatas) => {
      commit('SET_STATUS', 'pending')
      return new Promise((resolve, reject) => {
        instance.post('/auth/login', userLogDatas)
          .then((res) => {
            commit('SET_STATUS', 'logedIn')
            commit('LOG', res.data)
            commit('SET_EMAIL', userLogDatas.email)
            resolve(res)
          })
          .catch((error) => {
            commit('SET_STATUS', 'error_user_path--login')
            reject(error)
          })
      })
    },
    unlog: ({commit}) => {
      commit('SET_STATUS', '')
      commit('UNLOG')
    },
    relog: ({commit}, userLogDatas) => {
      instance.defaults.headers.common['Authorization'] = `Bearer ${userLogDatas.token}`
      return new Promise((resolve, reject) => {
        instance.post('/auth/relog', userLogDatas)
          .then((res) => {
            commit('SET_STATUS', 'logedIn')
            commit('SET_EMAIL', res.data.email)
            commit('LOG', res.data)
            resolve(res)
          })
          .catch((error) => {
            commit('SET_STATUS', 'error_user_path--relog')
            localStorage.removeItem('user')
            reject(error)
          })
      })
    },
    getProjects: ({commit}) => {
      return new Promise((resolve, reject) => {
        instance.get('/project')
          .then((response) => {
            commit('FILL_PROJECT_ARRAY', response.data)
            resolve(response)
          })
          .catch((error) => reject(error))
      })
    },
    getOverviews: ({commit}, howMany) => {
      return new Promise((resolve, reject) => {
        instance.get(`/overviews/?count=${howMany}`)
          .then((res) => {
            commit('FILL_OVERVIEWS', res.data)
            resolve(res)
          })
          .catch((error) => reject(error))
      })
    },
  },
  modules: {
  }
})
