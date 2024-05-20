import { saalplanMap } from './saalplanMap'
import { Canvas, createCanvas, Image } from 'canvas'
import { TemperatureMap } from './temperatureMap'
import { CANVAS_FILE } from './Constants'
import fs, { copyFileSync, createWriteStream, readFileSync, rmSync } from 'fs'

export class HeatmapService {
  async createHeatmap(
    currentTemperatures: Map<string, { value: number }>,
    label: string,
    filename: string
  ) {
    const temperaturePoints: { x: number; y: number; value: number }[] = []

    for (const [key, value] of currentTemperatures) {
      const seatLocation = saalplanMap[key]
      const x = seatLocation.x
      const y = seatLocation.y
      const v = value.value
      temperaturePoints.push({ x: x, y: y, value: v })
    }

    const canvas = createCanvas(1903, 1124)
    const ctx = canvas.getContext('2d')
    const img = new Image()
    const drw = new TemperatureMap(ctx)
    img.onload = () => {
      drw.setPoints(temperaturePoints, 1903, 1124)
      drw.drawFull(false, () => {
        drw.drawPoints(async () => {
          const img2 = new Image()
          img2.onload = () => {
            const combinedCanvas = createCanvas(1903, 1124)
            const combinedCtx = combinedCanvas.getContext('2d')
            combinedCtx.drawImage(img as unknown as Canvas, 0, 0)
            combinedCtx.drawImage(img2 as unknown as Canvas, 0, 0)
            combinedCtx.font = '40px Impact'
            combinedCtx.textAlign = 'right'
            combinedCtx.fillStyle = 'white'
            combinedCtx.fillText(label, 1880, 50)

            const out = createWriteStream('./temp.png')
            const stream = combinedCanvas.createPNGStream()
            stream.pipe(out)
            out.on('finish', () => {
              copyFileSync('./temp.png', filename)
              rmSync('./temp.png')
            })
          }
          img2.src = canvas.toDataURL()
        })
      })
    }
    img.src = readFileSync(CANVAS_FILE)
  }
}
