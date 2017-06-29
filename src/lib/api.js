import keyBy from 'lodash/keyBy'
import { AsyncStorage } from 'react-native'

import Config from './config'

export async function getRecordings (bustCache = false) {
  const url = `${Config.API_BASE}/recordings`

  if (bustCache) {
    await AsyncStorage.removeItem(url)
  }

  try {
    const value = await AsyncStorage.getItem(url)
    if (value !== null) {
      const meta = JSON.parse(value)
      const expiry = new Date(meta.expiry)
      if (expiry < new Date()) {
        // expired, delete from cache
        await AsyncStorage.removeItem(url)
      } else {
        // valid result
        return meta.value
      }
    }
  } catch (error) {
    // some fundamental failure, ignore and request as normal
  }

  const res = await fetch(url)
    .then(resp => resp.json())
    .then(resp => keyBy(resp, 'id'))

  const today = new Date()
  const meta = {
    // cache for 1 day
    expiry: today.setDate(today.getDate() + 1),
    value: res,
  }

  // store in cache
  await AsyncStorage.setItem(url, JSON.stringify(meta))

  return res
}
