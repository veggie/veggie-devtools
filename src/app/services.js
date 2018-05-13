import * as veggieApi from 'veggie'

export async function getProfiles () {
  const { data } = await veggieApi._getAllProfiles()
  const { ids, byId, current } = data

  return {
    profileIds: ids,
    profilesById: byId,
    currentProfile: current
  }
}
