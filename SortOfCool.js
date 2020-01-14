import Artifier from './Artifier.js';

export default class SortOfCool extends Artifier {
  constructor() {
    super();
  }

  artFunction(ctx, width, height) {
    const imageData = ctx.getImageData(0, 0, width, height).data;
    let hslArray = [];
    let hslToRbgDict = {};

    for (let h = 0; h < height; h++) {
      for (let w = 0; w < width; w++) {
        let currentRgb = this.getPixelAt(h, w, width, imageData);
        let currentHsl = this.rgbToHslForHumans(currentRgb);
        hslArray.push(currentHsl);
        hslToRbgDict[currentHsl] = currentRgb;
      }
    }

    const hslSorted = hslArray.sort((hsl1, hsl2) => {
      return hsl2[0] - hsl1[0];
    });

    let newImageArray = [];
    hslSorted.forEach((hsl) => {
      console.log(hsl)
      this.mergeArrays(newImageArray, hslToRbgDict[hsl]);
    });

    return new Uint8ClampedArray(newImageArray);
  }
}
