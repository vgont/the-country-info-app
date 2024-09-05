import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'

interface CountryPopulationChartProps {
  populationData: {
    year: number
    value: number
  }[]
}

export function CountryPopulationChart({
  populationData,
}: CountryPopulationChartProps) {
  const formatYAxis = (tick: number) => {
    const formattedTick = tick
      .toLocaleString()
      .replace(',000,000', 'M')
      .replace(',000', 'K')

    return formattedTick
  }

  return (
    <LineChart
      className="w-10 h-2"
      width={300}
      height={175}
      data={populationData}
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
    >
      <Line type="monotone" dataKey="value" stroke="#ccc" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="year" />
      <YAxis tickFormatter={formatYAxis} />
      <Tooltip />
    </LineChart>
  )
}
