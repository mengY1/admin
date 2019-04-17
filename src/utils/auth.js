import { storageUtil } from './tools/storageUtil'

const TokenKey = 'Admin-Token'
// const UserKey = 'Admin-User'
export function getToken() {
  return storageUtil.get(TokenKey)
}

export function setToken(token) {
  return storageUtil.set(TokenKey, token)
}

export function removeToken() {
  return storageUtil.remove(TokenKey)
}

// export function getUser() {
//   return storageUtil.get(UserKey)
// }
// export function setUser(userinfo) {
//   return storageUtil.set(UserKey, userinfo)
// }
