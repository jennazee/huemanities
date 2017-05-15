export default class Artifier {
  constructor() {
    this.artifyImageOnload();
  }

  artifyImageWithOnload() {
    document.addEventListener('DOMContentLoaded', function() {
      const canvas = document.querySelector('.Canvas');
      const canvasCtx = canvas.getContext('2d');

      const uploader = document.querySelector('.Uploader');

      uploader.addEventListener('change', function(){
        let img = new Image();
        let reader = new FileReader();
        reader.onload = function(e) {
          img.src = e.target.result;
        };
        reader.readAsDataURL(this.files[0]);
        img.onload = function() {
          canvas.height = img.height;
          canvas.width = img.width;
          canvasCtx.drawImage(img, 0, 0);

          let newImgData = new ImageData(this.artFunction(canvasCtx, canvas.width, canvas.height), img.width);

          canvasCtx.putImageData(newImgData, 0, 0);
        };
      });
    });
  };

  artFunction() { }

  getPixelAt(h, w, imWidth, imageData) {
    let redIndex = 4 * h * imWidth + w * 4;
    let red = imageData[redIndex];
    let green = imageData[redIndex + 1];
    let blue = imageData[redIndex + 2];
    let alpha = imageData[redIndex + 3];
    return [red, green, blue, alpha];
  }

  //TODO: use spread operator maybe?
  appendArray(arr1, arr2) {
    for (let i = 0; i < arr2.length; i++) {
      arr1.push(arr2[i]);
    }
  }
}