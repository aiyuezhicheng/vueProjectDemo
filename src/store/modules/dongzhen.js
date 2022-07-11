import { loginThreeDimensionalModel} from '@/api/dongzhen'
import { getThreeDimensionalModelToken, setThreeDimensionalModelToken, removeThreeDimensionalModelToken } from '@/utils/dongzhen/auth'
import { resetRouter } from '@/router'
import qs from 'qs'

const getDefaultState = () => {
  return {
    serviceProjectID: '',
    taskGroupID:'',
    token:''
  }
}

const state = getDefaultState()

const mutations = {
  SET_TOKEN:(state, token) => {
    state.token = token
  },
  SET_SERVICEPROJECTID: (state, serviceProjectID) => {
    state.serviceProjectID = serviceProjectID
  },
  SET_TASKGROUPID: (state, taskGroupID) => {
    state.taskGroupID = taskGroupID
  },
}

const actions = {
  // user login
  login({ commit }) {
    return new Promise((resolve, reject) => {
      const params ={
        "name": "aidong",
        "password": "aidong1234",
        "isRemember": false
      }
      loginThreeDimensionalModel(qs.stringify(params)).then(response => {
        const {data} = response
        const {access_token} = data
        commit('SET_TOKEN',  access_token)
        setThreeDimensionalModelToken(access_token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

