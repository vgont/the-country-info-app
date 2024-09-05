import Image from 'next/image'

interface CountryDisplayProps {
  name: string
  countryCode: string
  flagUrl: string | null
  onClick: () => void
}

export default function CountryDisplay({
  name,
  countryCode,
  flagUrl,
  onClick,
}: CountryDisplayProps) {
  return (
    <>
      <div
        className="flex flex-col border-2 rounded border-white p-4 hover:bg-slate-500 hover:cursor-pointer"
        onClick={onClick}
      >
        <h2 className="text-xl font-bold flex flex-row gap-x-2 justify-start">
          {name}
          {flagUrl && (
            <Image
              src={flagUrl}
              width={25}
              height={25}
              alt={`${countryCode} Flag`}
            />
          )}
        </h2>
        <p className="text-sm">Code: {countryCode}</p>
      </div>
    </>
  )
}
