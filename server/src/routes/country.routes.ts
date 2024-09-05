import { Router } from 'express'
import countryController from '../controllers/country.controller'

const router = Router()

router.get('/availableCountries', countryController.getAvailableCountries)

router.get('/country/info/:countryCode', countryController.getCountryData)

export default router
