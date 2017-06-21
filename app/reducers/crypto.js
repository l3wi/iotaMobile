import createReducer from '../libs/createReducer'
import * as types from '../actions/types'

export const crypto = createReducer(
  {},
  {
    [types.BOX_FLAG] (state, action) {
      let newState = state
      newState.box = action.box
      console.log(newState)
      return newState
    }
  }
)
