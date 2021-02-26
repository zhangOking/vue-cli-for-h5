import * as TYPE from './mutation-types'

export default {
  // actions
  userInfo: ({ commit }, args) => {
    commit(TYPE.EASYFM_USERINFO, args)
  }
}
