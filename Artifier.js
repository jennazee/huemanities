export default class Artifier {
  constructor() {
    this.artifyImageOnload();
  }

  artifyImageOnload() {
    document.addEventListener('DOMContentLoaded', () => {
      const canvas = document.querySelector('.Canvas');
      const canvasCtx = canvas.getContext('2d');

      const uploader = document.querySelector('.Uploader');

      uploader.addEventListener('change', (e) => {
        let img = new Image();
        let reader = new FileReader();
        reader.onload = function(e) {
          img.src = e.target.result;
        };
        reader.readAsDataURL(e.target.files[0]);
        img.onload = () => {
          if (img.height * img.width > 20000000 ) {
            document.querySelector('.Error').classList.remove('Hidden');
            return;
          } else {
            document.querySelector('.Error').classList.add('Hidden');
          }
          canvas.height = img.height;
          canvas.width = img.width;
          canvasCtx.drawImage(img, 0, 0);

          //"this" needs to be Artifier
          let newImgData = new ImageData(this.artFunction(canvasCtx, canvas.width, canvas.height), img.width);

          canvasCtx.putImageData(newImgData, 0, 0);
          document.querySelector('.Footer').classList.remove('Hidden');
        };
      });
    });
  };

  artFunction(ctx, width, height) {
    // to be filled in by subclasses
    return new Uint8ClampedArray(ctx.getImageData(0, 0, width, height).data);
  }

  rgbToHsl(rgb) {
    let r = rgb[0]/255;
    let g = rgb[1]/255;
    let b = rgb[2]/255;

    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);

    let h, s;
    let l = (max + min)/2;

    if (max === min) {
      h = s = 0;
    } else {
      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return [h * 360, s * 100, l * 100];
  }

  rgbToHslForHumans(rgb) {
    let r = rgb[0]/255;
    let g = rgb[1]/255;
    let b = rgb[2]/255;

    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);

    let h, s;
    let l = (max + min)/2;

    if (max === min) {
      h = s = 0;
    } else {
      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return [h * 360, 50, 50];
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
    rgb[0] = ((1 - sourceA) + (sourceA * sourceR)) * 255;
    rgb[1] = ((1 - sourceA) + (sourceA * sourceG)) * 255;
    rgb[2] = ((1 - sourceA) + (sourceA * sourceB)) * 255;

    return [...rgb, 255];
  }

  getPixelAt(h, w, imWidth, imageData) {
    let redIndex = 4 * h * imWidth + w * 4;
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
