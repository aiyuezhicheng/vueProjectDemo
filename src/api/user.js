import request from '@/utils/request'

export function login(data) {
  // LoginID Password
  return request({
    url: '/User/GetToken?expiresHours=24',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/UserConfig/TokenUser',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/User/Logoff_Token',
    method: 'post'
  })
}

export function modifyPasseWord(data, newPassword) {
  return request({
    url: `User/ChangePassword?newPassword=${newPassword}`,
    method: 'post',
    data
  })
}
