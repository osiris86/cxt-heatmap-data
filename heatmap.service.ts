import { saalplanMap } from './saalplanMap'
import { Canvas, createCanvas, Image } from 'canvas'
import { CANVAS_FILE } from './Constants'
import fs, { copyFileSync, createWriteStream, readFileSync, rmSync } from 'fs'
import { TemperatureMap } from './temperatureMap'

const IMAGE_WIDTH = 1903
const IMAGE_HEIGHT = 1124
const w = 1280
const h = 756

const leftAlignedRows = ['B', 'D', 'F', 'H', 'J', 'L', 'N', 'P', 'R', 'T']
const rightAlignedRows = ['A', 'C', 'E', 'G', 'I', 'K', 'M', 'O', 'Q', 'S']

export class HeatmapService {
  async createHeatmap(
    currentTemperatures: Map<string, { value: number }>,
    label: string,
    filename: string,
    timestamp: Date
  ) {
    const temperaturePoints: {
      x: number
      y: number
      place: string
      timestamp: Date
      value: number
    }[] = []

    for (const [key, value] of currentTemperatures) {
      const seatLocation = saalplanMap[key as keyof typeof saalplanMap]
      if (key === 'Outside') {
        temperaturePoints.push({
          x: 0,
          y: (890 * h) / IMAGE_HEIGHT,
          place: key,
          timestamp,
          value: value.value
        })
      } else {
        temperaturePoints.push({
          x: (seatLocation.x * w) / IMAGE_WIDTH,
          y: (seatLocation.y * h) / IMAGE_HEIGHT,
          place: key,
          timestamp,
          value: value.value
        })
      }
    }

    const canvas = createCanvas(w, h)
    const context = canvas.getContext('2d')
    const img = new Image()
    img.src = readFileSync(CANVAS_FILE)
    const temperatureMap = new TemperatureMap(context)

    const outsideTemp = temperaturePoints.find((pnt) => pnt.place === 'Outside')
    const insideTemps = temperaturePoints.filter(
      (pnt) => pnt.place !== 'Outside'
    )
    temperatureMap.setPoints(insideTemps, w, h)

    const leftAlignedPoints = insideTemps
      .filter(
        (point) => leftAlignedRows.indexOf(point.place.substring(0, 1)) !== -1
      )
      .map((point) => {
        return { x: point.x, y: point.y, value: point.value }
      })
    const rightAlignedPoints = insideTemps
      .filter(
        (point) => rightAlignedRows.indexOf(point.place.substring(0, 1)) !== -1
      )
      .map((point) => {
        return { x: point.x, y: point.y, value: point.value }
      })
    await temperatureMap.drawFull(false)
    await temperatureMap.drawLeftAlignedPoints(leftAlignedPoints)
    await temperatureMap.drawRightAlignedPoints(rightAlignedPoints)
    await temperatureMap.drawOutsideTemp(outsideTemp)
    await temperatureMap.drawScale(w / IMAGE_WIDTH)
    const img2 = new Image()
    img2.onload = () => {
      if (!context) return
      context.drawImage(img, 0, 0, img.width, img.height, 0, 0, w, h)
      context.drawImage(img2, 0, 0, w, h)
      context.font = '40px Impact'
      context.textAlign = 'right'
      context.fillStyle = 'white'
      context.fillText(label, (1880 / IMAGE_WIDTH) * w, (50 / IMAGE_HEIGHT) * h)

      const out = createWriteStream('./temp.png')
      const stream = canvas.createPNGStream()
      stream.pipe(out)
      out.on('finish', () => {
        copyFileSync('./temp.png', filename)
        rmSync('./temp.png')
      })
    }
    img2.src = canvas.toDataURL()
  }
}
