export default class Artifier {
  constructor() {
    this.artifyImageOnload();
  }

  artifyImageOnload() {
    document.addEventListener("DOMContentLoaded", () => {
      const canvas = document.querySelector(".Canvas");
      const canvasCtx = canvas.getContext("2d");

      const uploader = document.querySelector(".Uploader");

      uploader.addEventListener("change", e => {
        let img = new Image();
        let reader = new FileReader();
        reader.onload = function(e) {
          img.src = e.target.result;
        };
        reader.readAsDataURL(e.target.files[0]);
        img.onload = () => {
          const newHeight =
            document.querySelector(".Content").offsetHeight -
            document.querySelector(".UploadWrapper").offsetHeight;
          const scaleFactor = newHeight / img.height;
          const newWidth = Math.round(img.width * scaleFactor);

          canvas.height = newHeight;
          canvas.width = newWidth;
          canvasCtx.drawImage(img, 0, 0, newWidth, newHeight);

          // "this" needs to be Artifier
          let newImgData = new ImageData(
            this.artFunction(canvasCtx, newWidth, newHeight),
            newWidth
          );

          canvasCtx.putImageData(newImgData, 0, 0);
        };
      });
    });
  }

  artFunction(ctx, width, height) {
    // to be filled in by subclasses
    return new Uint8ClampedArray(ctx.getImageData(0, 0, width, height).data);
  }

  // https://gist.github.com/emanuel-sanabria-developer/5793377
  rgbToHsl(rgb) {
    // get all values as percentages
    const r = rgb[0] / 255;
    const g = rgb[1] / 255;
    const b = rgb[2] / 255;

    // find min and max values
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    let h, s;
    let l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
    return [h * 360, s * 100, l * 100];
  }

  rgbaToRgb(rgba) {
    // https://stackoverflow.com/questions/2049230/convert-rgba-color-to-rgb
    //
    // Source => Target = (BGColor + Source) =
    // Target.R = ((1 - Source.A) * BGColor.R) + (Source.A * Source.R)
    // Target.G = ((1 - Source.A) * BGColor.G) + (Source.A * Source.G)
    // Target.B = ((1 - Source.A) * BGColor.B) + (Source.A * Source.B)

    const sourceR = rgba[0] / 255;
    const sourceG = rgba[1] / 255;
    const sourceB = rgba[2] / 255;
    const sourceA = rgba[3] / 255;

    const rgb = [];
    rgb[0] = (1 - sourceA + sourceA * sourceR) * 255;
    rgb[1] = (1 - sourceA + sourceA * sourceG) * 255;
    rgb[2] = (1 - sourceA + sourceA * sourceB) * 255;

    return [...rgb, 255];
  }

  rgbToXyz(rgb) {
    let r = rgb[0] / 255;
    let g = rgb[1] / 255;
    let b = rgb[2] / 255;

    if (r > 0.04045) {
      r = Math.pow((r + 0.055) / 1.055, 2.4);
    } else {
      r = r / 12.92;
    }

    if (g > 0.04045) {
      g = Math.pow((g + 0.055) / 1.055, 2.4);
    } else {
      g = g / 12.92;
    }

    if (b > 0.04045) {
      b = Math.pow((b + 0.055) / 1.055, 2.4);
    } else {
      b = b / 12.92;
    }

    r = r * 100;
    g = g * 100;
    b = b * 100;

    const x = r * 0.4124 + g * 0.3576 + b * 0.1805;
    const y = r * 0.2126 + g * 0.7152 + b * 0.0722;
    const z = r * 0.0193 + g * 0.1192 + b * 0.9505;

    return [x, y, z];
  }

  xyzToLab(xyz) {
    let x = xyz[0] / 94.811;
    let y = xyz[1] / 100.0;
    let z = xyz[2] / 107.304;

    if (x > 0.008856) {
      x = Math.pow(x, 1 / 3);
    } else {
      x = 7.787 * x + 16 / 116;
    }

    if (y > 0.008856) {
      y = Math.pow(y, 1 / 3);
    } else {
      y = 7.787 * y + 16 / 116;
    }

    if (z > 0.008856) {
      z = Math.pow(z, 1 / 3);
    } else {
      z = 7.787 * z + 16 / 116;
    }

    const l = 116 * y - 16;
    const a = 500 * (x - y);
    const b = 200 * (y - z);

    return [l, a, b];
  }

  getPixelAt(h, w, imgWidth, imageData) {
    let redIndex = 4 * h * imgWidth + w * 4;
    let red = imageData[redIndex];
    let green = imageData[redIndex + 1];
    let blue = imageData[redIndex + 2];
    let alpha = imageData[redIndex + 3];
    return [red, green, blue, alpha];
  }

  mergeArrays(arr1, arr2) {
    arr1.push(...arr2);
  }
}
