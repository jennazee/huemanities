import Artifier from './Artifier.js';

export default class GlitchRothko extends Artifier {
  constructor() {
    super();
  }

  artFunction(ctx, width, height) {
    let imageData = ctx.getImageData(0, 0, width, height).data;
    let reds = [];
    let greens = [];
    let blues = [];
    let grayscales = [];

    for (let h = 0; h < height; h++) {
      for (let w = 0; w < width; w++) {
        let current = this.getPixelAt(h, w, width, imageData);

        let winnerType = this.getHighestOfThree(current);

        if (winnerType === 'red') {
          this.appendArray(reds, current);
        }
        if (winnerType === 'green') {
          this.appendArray(greens, current);
        }
        if (winnerType === 'blue') {
          this.appendArray(blues, current);
        }
        if (winnerType === 'grayscale') {
          this.appendArray(grayscales, current);
        }
      }
    }

    let newImageArray = [];
    this.appendArray(newImageArray, reds);
    this.appendArray(newImageArray, greens);
    this.appendArray(newImageArray, blues);
    this.appendArray(newImageArray, grayscales);
    return new Uint8ClampedArray(newImageArray);
  }

  getHighestOfThree(arr) {
    let winnerType, winnerIndex;

    if (arr[0] === arr[1] && arr[0] === arr[2]) {
      return 'grayscale';
    }

    if (arr[0] > arr[1]) {
      winnerType = 'red';
      winnerIndex = 0;
    } else {
      winnerType = 'green';
      winnerIndex = 1;
    }

    if (arr[2] > arr[winnerIndex]) {
      winnerType = 'blue';
    }

    return winnerType;
  }
}
