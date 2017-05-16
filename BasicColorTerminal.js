import {RED, ORANGE, YELLOW, GREEN, BLUE, PURPLE, PINK, WHITE, BLACK, GRAY, BROWN} from './constants.js';
import Artifier from './Artifier.js';

export default class BasicColorTerminal extends Artifier {
  constructor() {
    super();
    this.colors = [RED, ORANGE, YELLOW, GREEN, BLUE, PURPLE, PINK, WHITE, BLACK, GRAY, BROWN];
  }

  artFunction(ctx, width, height) {
    const imageData = ctx.getImageData(0, 0, width, height).data;
    const colors = this.colors;
    let newImageArray = [];

    for (let h = 0; h < height; h++) {
      for (let w = 0; w < width; w++) {
        let current = this.getPixelAt(h, w, width, imageData);

        let closest;
        let minDist = 1000000000; //temp
        for (let i = 0; i < colors.length; i++) {
          let color = colors[i];
          let redDiff = color[0] - current[0];
          let greenDiff = color[1] - current[1];
          let blueDiff = color[2] - current[2]
          let dist = (redDiff * redDiff) + (greenDiff * greenDiff) + (blueDiff * blueDiff);
          if (dist < minDist) {
            minDist = dist;
            closest = color;
          }
        }
        this.appendArray(newImageArray, closest);
      }
    }
    return new Uint8ClampedArray(newImageArray);
  }
}
