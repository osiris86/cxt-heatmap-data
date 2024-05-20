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

    const data = []
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
}
