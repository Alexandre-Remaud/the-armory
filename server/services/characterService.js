import axios from 'axios'
import { config } from '../config/config.js'
import { getAccessToken } from './tokenService.js'

/**
 * Fetch a WoW character profile by realm and name
 * @param {string} realmSlug
 * @param {string} characterName
 * @returns {Promise<Object>} Character profile data
 */
export const getCharacter = async (realmSlug, characterName) => {
  try {
    const accessToken = await getAccessToken()
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    }
    const url = `${config.baseUrl}/profile/wow/character/${encodeURIComponent(realmSlug)}/${encodeURIComponent(
      characterName.toLowerCase(),
    )}`
    const params = {
      namespace: 'profile-eu',
      locale: 'fr_FR',
    }

    const { data } = await axios.get(url, { headers, params })
    return data
  } catch (error) {
    console.error('Failed to fetch character profile:', error.message)
    throw new Error('Failed to fetch character profile')
  }
}

/**
 * Fetch a WoW character media by realm and name
 * @param {string} realmSlug
 * @param {string} characterName
 * @returns {Promise<Object>} Character media data
 */
export const getCharacterMedia = async (realmSlug, characterName) => {
  try {
    const accessToken = await getAccessToken()
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    }
    const url = `${config.baseUrl}/profile/wow/character/${encodeURIComponent(realmSlug)}/${encodeURIComponent(
      characterName.toLowerCase(),
    )}/character-media`
    const params = {
      namespace: 'profile-eu',
      locale: 'fr_FR',
    }

    const { data } = await axios.get(url, { headers, params })
    return data
  } catch (error) {
    console.error('Failed to fetch character media:', error.message)
    throw new Error('Failed to fetch character media')
  }
}
