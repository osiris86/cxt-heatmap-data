import { InfluxDB, Point } from '@influxdata/influxdb-client'

export class InfluxService {
  private readonly influxDB

  constructor(private readonly url: string, private readonly token: string) {
    this.influxDB = new InfluxDB({
      url,
      token
    })
  }

  async getAllData() {
    const queryApi = this.influxDB.getQueryApi('cxt')
    const fluxQuery =
      'from(bucket: "cxt") |> range(start: 0) |> filter(fn: (r) => r._measurement == "temperature")'

    const data: { time: Date; seat: string; temperature: number }[] = []
    for await (const { values, tableMeta } of queryApi.iterateRows(fluxQuery)) {
      const o = tableMeta.toObject(values)
      data.push({
        time: o._time,
        seat: o.place,
        temperature: o._value
      })
    }

    return data
  }

  async getDataFromTimeRange(start: string, end: string) {
    const queryApi = this.influxDB.getQueryApi('cxt')
    const fluxQuery = `from(bucket: "cxt") |> range(start: ${start}, stop: ${end}) |> filter(fn: (r) => r._measurement == "temperature") |> group(columns: ["place"]) |> mean()`

    const data: { seat: string; temperature: number }[] = []
    for await (const { values, tableMeta } of queryApi.iterateRows(fluxQuery)) {
      const o = tableMeta.toObject(values)
      data.push({
        seat: o.place,
        temperature: o._value
      })
    }

    return data
  }
}
