var red = [255, 0, 0, 255];
var orange = [255, 165, 0, 255];
var yellow = [255, 255, 0, 255];
var green = [0, 128, 0, 255];
var blue = [0, 0, 255, 255];
var purple = [128, 0, 128, 255];
var pink = [255, 192, 203, 255];
var white = [0, 0, 0, 255];
var black = [255, 255, 255, 255];
var grey = [128, 128, 128, 255];
var brown = [128, 42, 42, 255]

var colors = [red, orange, yellow, green, blue, purple, pink, white, black, brown, grey];


document.addEventListener('DOMContentLoaded', function() {
  var canvas = document.querySelector('.Canvas');
  var canvasCtx = canvas.getContext('2d');

  var uploader = document.querySelector('.Uploader');

  uploader.addEventListener('change', function(){
    var img = new Image();
    var reader = new FileReader();
    reader.onload = function (e) {
      img.src = e.target.result;
    };
    reader.readAsDataURL(this.files[0]);
    img.onload = function() {
      canvas.height = img.height;
      canvas.width = img.width;
      canvasCtx.drawImage(img, 0, 0);

      var newImgData = new ImageData(youngerBlood(canvasCtx, canvas.width, canvas.height), img.width);

      canvasCtx.putImageData(newImgData, 0, 0);
    };
  });
});

function getPixelAt(h, w, imWidth, imageData) {
  var redIndex = 4 * h * imWidth + w * 4;
  var red = imageData[redIndex];
  var green = imageData[redIndex + 1];
  var blue = imageData[redIndex + 2];
  var alpha = imageData[redIndex + 3];
  return [red, green, blue, alpha];
}

function youngerBlood(ctx, width, height) {
  var imageData = ctx.getImageData(0, 0, width, height).data;
  var newImageArray = [];

  for (var h = 0; h < height; h++) {
    for (var w = 0; w < width; w++) {
      var current = getPixelAt(h, w, width, imageData);

      var closest;
      var minDist = 1000000000; //temp
      for (var i = 0; i < colors.length; i++) {
        var color = colors[i];
        var redDiff = color[0] - current[0];
        var greenDiff = color[1] - current[1];
        var blueDiff = color[2] - current[2]
        var dist = (redDiff * redDiff) + (greenDiff * greenDiff) + (blueDiff * blueDiff);
        if (dist < minDist) {
          minDist = dist;
          closest = color;
        }
      }
      appendArray(newImageArray, closest);
    }
  }
  return new Uint8ClampedArray(newImageArray);
}

function appendArray(arr1, arr2) {
  for (var i = 0; i < arr2.length; i++) {
    arr1.push(arr2[i]);
  }
}