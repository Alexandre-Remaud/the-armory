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

  /**
   * Get character media
   * @param {string} realmSlug
   * @param {string} characterName
   * @returns {Promise<Object>}
   */
  getCharacterMedia(realmSlug, characterName) {
    return apiClient.get(
      `/character/${encodeURIComponent(realmSlug)}/${encodeURIComponent(characterName)}/media`,
    )
  }
}

export default new CharacterService()
