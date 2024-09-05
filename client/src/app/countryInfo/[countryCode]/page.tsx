'use client'

import { useParams, useRouter } from 'next/navigation'
import wretch from 'wretch'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import CountryDisplay from '@/app/components/CountryDisplay'
import { CountryPopulationChart } from '@/app/components/CountryPopulationChart'
import Link from 'next/link'

export interface Border {
  commonName: string
  officialName: string
  countryCode: string
  region: string
  flagUrl: string
  iso3: string
}

export interface PopulationDatum {
  year: number
  value: number
}

export interface CountryInfo {
  commonName: string
  officialName: string
  countryCode: string
  region: string
  flagUrl: string
  borders: Border[]
  populationData: PopulationDatum[]
}

export default function CountryInfo() {
  const { countryCode } = useParams()
  const router = useRouter()

  const [countryInfo, setCountryInfo] = useState<CountryInfo | null>(null)
  const [isBordersOpen, setBordersOpen] = useState(false)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const handleCountryClick = (countryCode: string) => {
    router.push(`/countryInfo/${countryCode}`)
  }

  useEffect(() => {
    if (!countryCode) return

    const fetchCountryInfo = async () => {
      try {
        setLoading(true)
        const url = `${process.env.SERVER_URL}/country/info/${countryCode}`
        const data = await wretch(url).get().json<CountryInfo>()
        setCountryInfo(data)
      } catch (error) {
        setError('Failed to fetch country info')
      } finally {
        setLoading(false)
      }
    }

    fetchCountryInfo()
  }, [countryCode])

  if (loading) {
    return (
      <>
        <Link href="/">
          <button className="font-semibold m-8 underline">All Countries</button>
        </Link>
        <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
          <h1 className="mb-4 text-2xl font-extrabold">Loading...</h1>
        </div>
      </>
    )
  }

  if (error) {
    return (
      <>
        <Link href="/">
          <button className="font-semibold m-8 underline">All Countries</button>
        </Link>
        <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
          <h1 className="mb-4 text-2xl font-extrabold text-red-500">
            Error: {error}
          </h1>
        </div>
      </>
    )
  }

  if (!countryInfo) {
    return (
      <>
        <Link href="/">
          <button className="font-semibold m-8 underline">All Countries</button>
        </Link>
        <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
          <h1 className="mb-4 text-2xl font-extrabold">
            Country Info Not Found
          </h1>
        </div>
      </>
    )
  }

  return (
    <>
      <Link href="/">
        <button className="font-semibold m-8 underline">All Countries</button>
      </Link>
      <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] flex flex-col w-auto">
        <h1 className="mb-4 text-2xl font-extrabold flex flex-row gap-4">
          {countryInfo.officialName}
          {countryInfo.flagUrl && (
            <Image
              src={countryInfo.flagUrl}
              width={36}
              height={36}
              alt={`${countryCode} Flag`}
            />
          )}
        </h1>
        <p className="text-lg font-medium">Region: {countryInfo.region}</p>
        <p className="text-lg font-medium">
          Country Code: {countryInfo.countryCode}
        </p>
        <div className="flex flex-col justify-center">
          <CountryPopulationChart populationData={countryInfo.populationData} />
        </div>
        <div>
          <div
            className="hover:cursor-pointer hover:bg-slate-800  text-xl font-semibold border-2 rounded px-6 py-4"
            onClick={() => setBordersOpen(!isBordersOpen)}
          >
            Border Countries Widget
          </div>
          {isBordersOpen &&
            countryInfo.borders.map((b) => {
              return (
                <CountryDisplay
                  key={b.officialName}
                  countryCode={b.countryCode}
                  name={b.commonName}
                  flagUrl={b.flagUrl}
                  onClick={() => handleCountryClick(b.countryCode)}
                />
              )
            })}
        </div>
      </div>
    </>
  )
}
