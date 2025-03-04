import axios from 'axios'
import { config } from '../config/config.js'

const OAUTH_URL = 'https://eu.battle.net/oauth/token'
const GRANT_TYPE = 'client_credentials'
const CONTENT_TYPE = 'application/x-www-form-urlencoded'

/**
 * Fetches an access token from the Battle.net API
 * @returns {Promise<string>} The access token
 * @throws {Error} If token retrieval fails
 */
const getAccessToken = async function () {
  const params = new URLSearchParams()
  params.append('grant_type', GRANT_TYPE)

  const authString = Buffer.from(`${config.clientId}:${config.clientSecret}`).toString('base64')

  const headers = {
    Authorization: `Basic ${authString}`,
    'Content-Type': CONTENT_TYPE,
  }

  try {
    const response = await axios.post(OAUTH_URL, params, { headers })
    return response.data.access_token
  } catch (error) {
    console.error('Error while fetching access token:', {
      status: error.response?.status,
      message: error.message,
    })
    throw new Error('Failed to authenticate with Battle.net')
  }
}

export { getAccessToken }
