import express from 'express'
import { getRealms } from '../services/realmService.js'
import { getCharacter } from '../services/characterService.js'

const router = express.Router()

/**
 * @route GET /realms
 * @description Get all available realms
 * @access Public
 */
router.get('/realms', async (req, res, next) => {
  try {
    const realmsData = await getRealms()

    if (!realmsData) {
      return res.status(404).json({
        success: false,
        message: 'No realms data found',
      })
    }

    res.status(200).json({
      success: true,
      data: realmsData,
    })
  } catch (error) {
    next({
      status: 500,
      message: 'Failed to fetch realms data',
      error: error.message,
    })
  }
})

/**
 * @route GET /character/:realmSlug/:characterName
 * @description Get a character profile
 * @access Public
 */
router.get('/character/:realmSlug/:characterName', async (req, res, next) => {
  try {
    const { realmSlug, characterName } = req.params
    const data = await getCharacter(realmSlug, characterName)
    res.status(200).json({ success: true, data })
  } catch (error) {
    next({ status: 500, message: 'Failed to fetch character', error: error.message })
  }
})

export default router
