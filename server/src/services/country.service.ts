import wretch from 'wretch'
import { env } from '../env'

const dateNagerUrl = env.DATE_NAGER_URL
const countriesNowUrl = env.COUNTRIES_NOW_URL

class CountryService {
  async getCountryInfo(countryCode: string) {
    const countryInfoUrl = `${dateNagerUrl}/CountryInfo/${countryCode}`
    const countryInfo = await wretch(countryInfoUrl).get().json<{
      commonName: string
      officialName: string
      countryCode: string
      region: string
      borders: { countryCode: string; commonName: string; region: string }[]
    }>()

    return countryInfo
  }

  async getAvailableCountries() {
    const url = `${env.DATE_NAGER_URL}/AvailableCountries`
    const countries = await wretch(url)
      .get()
      .json<{ countryCode: string; name: string }[]>()

    return countries
  }

  async getAllCountriesFlagUrl() {
    const url = `${countriesNowUrl}/countries/flag/images`
    const countries = wretch(url).get().json<{
      data: { iso2: string; iso3: string; flag: string }[]
    }>()

    return countries
  }

  async getCountryPopulationData(iso3: string) {
    const url = `${countriesNowUrl}/countries/population`
    const { data } = await wretch(url).post({ iso3 }).json<{
      data: {
        populationCounts: { year: number; value: number }[]
      }
    }>()

    return data.populationCounts
  }
}

export default new CountryService()
