import { InfluxService } from './influx.service'
import dotenv from 'dotenv'
import fs from 'fs'

dotenv.config()

const exportData = async () => {
  const influxService = new InfluxService(
    process.env.INFLUX_URL || '',
    process.env.INFLUX_TOKEN || ''
  )

  const data = await influxService.getAllData()

  let csvOutput = 'time,seat,temperature\n'
  for (const d of data) {
    csvOutput += `${d.time},${d.seat},${d.temperature}\n`
  }

  fs.writeFileSync('data.csv', csvOutput)
}

exportData()
