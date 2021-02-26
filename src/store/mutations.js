import * as TYPE from './mutation-types'

export default {
  // mutations
  [TYPE.EASYFM_USERINFO](state, value = false) {
    if (value) {
      state.userInfo = value
      return
    }
    state.userInfo = ''
  }
}
