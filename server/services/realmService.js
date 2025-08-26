import axios from 'axios'
import { config } from '../config/config.js'
import { getAccessToken } from './tokenService.js'

/**
 * Extract realm data from API response
 * @param {Array} realms - Raw realms data from API
 * @returns {Array} Filtered realm data
 */
const filterRealms = (realms) => {
  return realms.map((realm) => realm.data)
}

/**
 * Fetch realms for a specific page
 * @param {number} page - Page number to fetch
 * @param {Object} headers - Request headers with auth token
 * @returns {Promise<Array>} Array of realms for the specified page
 * @throws {Error} If API request fails
 */
const fetchRealmPage = async (page, headers) => {
  try {
    const url = `${config.baseUrl}/data/wow/search/realm`
    const params = {
      namespace: 'dynamic-eu',
      locale: 'fr_FR',
      _page: page,
    }

    const response = await axios.get(url, {
      headers,
      params,
    })

    return filterRealms(response.data.results)
  } catch (error) {
    console.error(`Error fetching realms for page ${page}:`, error.message)
    throw new Error(`Failed to fetch realms for page ${page}`)
  }
}

/**
 * Get all available realms from Battle.net API
 * @returns {Promise<Array>} Array of all realms
 * @throws {Error} If token acquisition or API requests fail
 */
const getRealms = async () => {
  try {
    console.log('Fetching realms')
    const accessToken = await getAccessToken()
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    }

    // Fetch first page to get total page count
    const url = `${config.baseUrl}/data/wow/search/realm`
    const params = {
      namespace: 'dynamic-eu',
      locale: 'fr_FR',
    }
    const initialResponse = await axios.get(url, {
      headers,
      params,
    })

    const { pageCount } = initialResponse.data
    const allRealms = []

    // Fetch all pages concurrently
    const pagePromises = Array.from({ length: pageCount }, (_, i) => fetchRealmPage(i + 1, headers))

    const results = await Promise.all(pagePromises)
    results.forEach((realms) => allRealms.push(...realms))

    const filteredRealms = allRealms.filter((item) => item.locale === 'frFR')

    return filteredRealms
  } catch (error) {
    console.error('Failed to fetch realms:', error.message)
    throw new Error('Failed to fetch realms data')
  }
}

export { getRealms }
