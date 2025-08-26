import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
})

class CharacterService {
  /**
   * Get a character profile
   * @param {string} realmSlug
   * @param {string} characterName
   * @returns {Promise<Object>}
   */
  getCharacter(realmSlug, characterName) {
    return apiClient.get(
      `/character/${encodeURIComponent(realmSlug)}/${encodeURIComponent(characterName)}`,
    )
  }
}

export default new CharacterService()
