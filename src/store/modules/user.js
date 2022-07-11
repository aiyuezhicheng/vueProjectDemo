import { login, logout, getInfo ,modifyPasseWord} from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    userid: '',
    loginname: '',
    projectid: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_USERID: (state, id) => {
    state.userid = id
  },
  SET_LOGINNAME: (state, loginname) => {
    state.loginname = loginname
  },
  SET_PROJECTID: (state, projectid) => {
    state.projectid = projectid
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      const params = {
        LoginID: username.trim(),
        Password: password,
        Project: '',
        ModuleID: 'cdcf3dfa-e72e-480c-b624-bcd398137f56'
      }
      login(params).then(response => {
        commit('SET_TOKEN', 'Bearer ' + response)
        setToken('Bearer ' + response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        console.log(response)
        const { IsOk, Response } = response

        if (!IsOk) {
          return reject('Verification failed, please Login again.')
        }

        const { UserName, UserID, LoginName, ProjectID } = Response

        commit('SET_NAME', UserName)
        commit('SET_USERID', UserID)
        commit('SET_LOGINNAME', LoginName)
        commit('SET_PROJECTID', ProjectID)
        const avatar = `localhost:80/Avatar/${ProjectID}/user/${UserID}.png?` + new Date().getTime()
        commit('SET_AVATAR', avatar)
        resolve(Response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },

  // 修改用户密码
  modifyPasseWord({ state }, passwordObj) {
    return new Promise((resolve, reject) => {
      const data = {
        "Project": state.projectid,
        "LoginID": state.loginname,
        "Password": passwordObj.oldpass,
      }
      console.log(data)
      modifyPasseWord(data, passwordObj.pass).then((result) => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

