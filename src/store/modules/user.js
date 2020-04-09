import { login, logout, apiGetSelfUser } from '@/api/tunnyApi.js'
import { Token,Authmode } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const user = {
  state: {
    token: Token.get(),
    user_id: null,
    username: null,
    authmode: null,
    roles: [],
    user_info: null,
  },
  mutations: {
    // 设置当前浏览器会话上下文的全局状态
    SET_TOKEN: (state, token) => {
      Token.set(token)
      state.token = token
    },
    SET_USERNAME: (state, username) => {
      state.username = username
    },
    SET_USER_ID: (state, id) => {
      state.user_id = id
    },
    SET_AUTHMODE: (state, authmode) => {
      Authmode.set(authmode)
      state.authmode = authmode
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_USERINFO: (state, user_info) => {
      state.user_info = user_info
    },
  },
  actions: {
    // user login
    Login({ commit }, loginParams) {
      return new Promise((resolve, reject) => {
        login(loginParams)
          .then(response => {
            const { data } = response
            commit('SET_TOKEN', data.token)
            resolve()
          }).catch(error => {
            reject(error)
          })
      })
    },
    // get user info
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        apiGetSelfUser()
          .then(response => {
            const { data } = response

            if (!data) {
              reject('Verification failed, please Login again.')
            }

            const { id, username, backend, roles } = data

            // roles must be a non-empty array
            // if (!roles || roles.length <= 0) {
            //   reject('store GetUserInfo: roles must be a non-null array!')
            // }
            // 登录成功后，设置当前浏览器会话上下文的状态属性
            commit('SET_USERNAME', username)
            commit('SET_AUTHMODE', backend)
            commit('SET_USER_ID', id)
            commit('SET_ROLES', roles)
            commit('SET_USERINFO', data)
            resolve(data)
          }).catch(error => {
            reject(error)
          })
      })
    },
    // user logout
    Logout({ commit, state }) {
      return new Promise(async (resolve, reject) => {
        state = {
          token: Token.get(),
          user_id: null,
          username: null,
          roles: [],
          user_nfo: null,
        }
        try {
          await logout(state.token)
        } catch (error) {} finally {
          commit('SET_TOKEN', '')
          commit('SET_USERNAME', '')
          Token.delete()
          resetRouter()
          resolve()
        }
      })
    },
    // remove token
    ResetToken({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        Token.delete()
        resolve()
      })
    },
    // dynamically modify permissions
    changeRoles({ commit, dispatch }, role) {
      return new Promise(async resolve => {

        const { roles } = await dispatch('GetUserInfo')

        // generate accessible routes map based on roles
        const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

        resetRouter()
        // dynamically add accessible routes
        router.addRoutes(accessRoutes)

        resolve()
      })
    }
  }
}

export default user

