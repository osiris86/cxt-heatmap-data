import dotenv from 'dotenv'
import { InfluxService } from './influx.service'
import { HeatmapService } from './heatmap.service'
import moment, { Moment } from 'moment'

dotenv.config()
moment.locale('de')

const drawSingleImage = async (time: Moment) => {
  console.log(`Drawing image for ${time.format('YYYY-MM-DD HH:mm')}`)

  const start = time.clone().subtract(5, 'minutes')
  const end = time.clone()
  const influxService = new InfluxService(
    process.env.INFLUX_URL || '',
    process.env.INFLUX_TOKEN || ''
  )
  const heatmapService = new HeatmapService()

  const data = await influxService.getDataFromTimeRange(
    start.format(),
    end.format()
  )

  const temperatureData = new Map<string, { value: number }>()
  for (const d of data) {
    temperatureData.set(d.seat, { value: d.temperature })
  }

  const label = end.format('dddd, HH:mm')
  const filename = `./images/${end.format('YYYY-MM-DD HH-mm')}.png`

  await heatmapService.createHeatmap(temperatureData, label, filename)
}

const drawImages = async () => {
  const start = moment('2024-05-19T03:40:00.000Z')
  const end = moment('2024-05-19T08:30:00.000Z')

  let current = start.clone()

  while (current.isBefore(end)) {
    await drawSingleImage(current)
    current.add(5, 'minutes')
  }
}

drawImages()
