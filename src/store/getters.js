const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  name: state => state.user.name,
  userid: state => state.user.userid,
  loginname: state => state.user.loginname,
  projectid: state => state.user.projectid,
  avatar: state => state.user.avatar,
  threeDimensionalModelToken: state => state.dongzhen.token
}
export default getters
