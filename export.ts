import { InfluxService } from './influx.service'
import dotenv from 'dotenv'
import fs from 'fs'

dotenv.config()

const convertCXT26Seat = (seat: string) => {
  const oldSeatNumber = parseInt(seat.substring(1))
  if (isNaN(oldSeatNumber)) {
    return seat
  }
  let intermediate = oldSeatNumber - 20
  if (intermediate < 0) {
    intermediate *= -1
  }
  const newSeatNumber = intermediate + 1
  return seat.substring(0, 1) + newSeatNumber
}

const exportData = async () => {
  const influxService = new InfluxService(
    process.env.INFLUX_URL || '',
    process.env.INFLUX_TOKEN || ''
  )

  const data = await influxService.getAllData()

  let csvOutput = 'time,seat,temperature\n'
  for (const d of data) {
    // Convert seat screwup of CXT26
    d.seat = convertCXT26Seat(d.seat)

    csvOutput += `${d.time},${d.seat},${d.temperature}\n`
  }

  fs.writeFileSync('data.csv', csvOutput)
}

exportData()
