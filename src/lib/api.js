import keyBy from 'lodash/keyBy'
import Config from './config'

export async function getRecordings () {
  // @TODO(shrugs) throw cloudflare in front of heroku,
  // cache every 30 minutes, only one pending request,
  // then call it a day
  return fetch(`${Config.API_BASE}/recordings`)
    .then(resp => resp.json())
    .then(resp => keyBy(resp, 'id'))
}
