'use client'

import { useEffect, useState } from 'react'
import CountryDisplay from './components/CountryDisplay'
import wretch from 'wretch'
import { useRouter } from 'next/navigation'

interface Country {
  name: string
  countryCode: string
  flagUrl: string | null
}

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleCountryClick = (countryCode: string) => {
    router.push(`/countryInfo/${countryCode}`)
  }

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true)
        const url = `${process.env.SERVER_URL}/availableCountries`
        const availableCountries = await wretch(url).get().json<Country[]>()

        setCountries(availableCountries)
      } catch (error) {
        setError('Failed to fetch countries')
      } finally {
        setLoading(false)
      }
    }

    fetchCountries()
  }, [])

  if (loading) {
    return (
      <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <h1 className="mb-4 text-2xl font-extrabold">Loading...</h1>
      </div>
    )
  }

  if (error) {
    return (
      <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <h1 className="mb-4 text-2xl font-extrabold text-red-500">
          Error: {error}
        </h1>
      </div>
    )
  }

  if (!countries) {
    return (
      <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <h1 className="mb-4 text-2xl font-extrabold">Countries not found</h1>
      </div>
    )
  }

  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="mb-4 text-2xl font-extrabold">Available Countries</h1>
      <div className="flex flex-col gap-2">
        {countries.map((c) => {
          return (
            <CountryDisplay
              name={c.name}
              onClick={() => handleCountryClick(c.countryCode)}
              countryCode={c.countryCode}
              flagUrl={c.flagUrl}
              key={c.name}
            />
          )
        })}
      </div>
    </div>
  )
}
