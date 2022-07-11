import Cookies from 'js-cookie'

const TokenKey = 'threeDimensionalModel'

export function getThreeDimensionalModelToken() {
  return Cookies.get(TokenKey)
}

export function setThreeDimensionalModelToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeThreeDimensionalModelToken() {
  return Cookies.remove(TokenKey)
}
