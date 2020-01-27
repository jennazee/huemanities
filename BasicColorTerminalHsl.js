import {RED, ORANGE, YELLOW, GREEN, BLUE, PURPLE, PINK, WHITE, BLACK, GRAY, BROWN} from './constants.js';
import Artifier from './Artifier.js';

class BasicColorTerminalHsl extends Artifier {
  constructor() {
    super();
    this.colorsForCanvas = [RED, ORANGE, YELLOW, GREEN, BLUE, PURPLE, PINK, WHITE, BLACK, GRAY, BROWN]
    this.colors = this.colorsForCanvas.map(this.rgbToHsl);
  }

  artFunction(ctx, width, height) {
    const imageData = ctx.getImageData(0, 0, width, height).data;
    const colors = this.colors;
    let newImageArray = [];

    for (let h = 0; h < height; h++) {
      for (let w = 0; w < width; w++) {
        let currentRgb = this.getPixelAt(h, w, width, imageData);

        if (currentRgb[3] !== 255) {
          currentRgb = this.rgbaToRgb(currentRgb);
        }
      
        const current = this.rgbToHsl(currentRgb)

        let closest;
        let minDist = 1000000000; // temporary

        for (let i = 0; i < colors.length; i++) {
          let color = colors[i];
          let hDiff = color[0] - current[0];
          let sDiff = color[1] - current[1];
          let lDiff = color[2] - current[2]
          let dist = (hDiff * hDiff) + (sDiff * sDiff) + (lDiff * lDiff);
          if (dist < minDist) {
            minDist = dist;
            closest = i;
          }
        }
        this.mergeArrays(newImageArray, this.colorsForCanvas[closest]);
      }
    }
    return new Uint8ClampedArray(newImageArray);
  }
}

const bct = new BasicColorTerminalHsl();
