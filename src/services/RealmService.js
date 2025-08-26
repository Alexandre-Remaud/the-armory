import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
})

class RealmService {
  /**
   * Get all available realms
   * @returns {Promise} Response from the API containing raw realms data
   */
  getRealms() {
    return apiClient.get('/realms')
  }

  /**
   * Get all realms ordered by name
   * @returns {Promise<Array>} Array of realms ordered by name
   */
  async getOrderedRealms() {
    const { data } = await this.getRealms()
    const realms = data.data

    return realms
      .map((realm) => ({
        name: realm.name.fr_FR,
        slug: realm.slug,
      }))
      .sort((a, b) => a.name.localeCompare(b.name))
  }
}

export default new RealmService()
