import * as types from './types'
import { Alert } from 'react-native'
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

export const showSeed = pwd => {
  return async (dispatch, getState) => {
    var seed = await OpenBox('seed', hashPwd(pwd))
    if (!seed) return Alert.alert('Error', 'Incorrect Password')
    Alert.alert('Wallet Seed:', seed)
  }
}

export const deleteSeed = () => {
  return (dispatch, getState) => {
    DeleteBox('seed')
  }
}

export function boxFlag (box) {
  return {
    type: types.BOX_FLAG,
    box
  }
}
