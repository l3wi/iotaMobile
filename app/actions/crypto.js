import * as types from './types'
import { RetrieveBox, DeleteBox, OpenBox, hashPwd } from '../libs/crypto'

export const checkBox = () => {
  return (dispatch, getState) => {
    RetrieveBox('seed').then(box => {
      if (box) {
        return dispatch(boxFlag(true))
      } else {
        return dispatch(boxFlag(false))
      }
    })
  }
}

export function boxFlag (box) {
  return {
    type: types.BOX_FLAG,
    box
  }
}
