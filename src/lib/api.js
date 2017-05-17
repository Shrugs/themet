import keyBy from 'lodash/keyBy'
import Config from './config'

export async function getRecordings () {
  return fetch(`${Config.API_BASE}/recordings`)
    .then(resp => resp.json())
    .then(resp => keyBy(resp, 'id'))
}
