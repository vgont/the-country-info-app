import { Request, Response } from 'express'
import { ContryInfoSchema } from '../schemas/country.schemas'
import { ZodError } from 'zod'
import countryService from '../services/country.service'

class CountryController {
  async getAvailableCountries(_req: Request, res: Response) {
    try {
      const countries = await countryService.getAvailableCountries()

      const { data: countriesFlags } =
        await countryService.getAllCountriesFlagUrl()

      const countriesWithFlags = countries.map((country) => {
        const countryFlag = countriesFlags.find(
          (cf) => cf.iso2 === country.countryCode,
        )
        return {
          ...country,
          flagUrl: countryFlag ? countryFlag.flag : null,
        }
      })

      return res.send(countriesWithFlags)
    } catch (error) {
      return res.status(500).send('Something gone wrong')
    }
  }

  async getCountryData(req: Request, res: Response) {
    try {
      const { data, error } = ContryInfoSchema.safeParse(req.params)

      if (error) {
        throw new ZodError(error.issues)
      }

      const { countryCode } = data

      const countryInfo = await countryService.getCountryInfo(countryCode)
      const { data: countriesFlags } =
        await countryService.getAllCountriesFlagUrl()

      const { flag: countryFlag, iso3 } = countriesFlags.find(
        (flag) => flag.iso2 === countryInfo.countryCode,
      )

      const populationData = await countryService.getCountryPopulationData(iso3)

      const borders = countryInfo.borders.map((border) => {
        const borderFlag = countriesFlags.find(
          (flag) => flag.iso2 === border.countryCode,
        )
        return {
          ...border,
          flagUrl: borderFlag ? borderFlag.flag : null,
          iso3: borderFlag ? borderFlag.iso3 : null,
        }
      })

      return res.send({
        ...countryInfo,
        borders,
        iso3,
        flagUrl: countryFlag,
        populationData,
      })
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).send({ error: error.issues[0].message })
      }

      return res.status(500).send({ error: 'Something gone wrong' })
    }
  }
}

export default new CountryController()
