(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";function _toConsumableArray(e){if(Array.isArray(e)){for(var r=0,t=Array(e.length);r<e.length;r++)t[r]=e[r];return t}return Array.from(e)}function _classCallCheck(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,r){for(var t=0;t<r.length;t++){var a=r[t];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(r,t,a){return t&&e(r.prototype,t),a&&e(r,a),r}}(),Artifier=function(){function e(){_classCallCheck(this,e),this.artifyImageOnload()}return _createClass(e,[{key:"artifyImageOnload",value:function(){var e=this;document.addEventListener("DOMContentLoaded",function(){var r=document.querySelector(".Canvas"),t=r.getContext("2d");document.querySelector(".Uploader").addEventListener("change",function(a){var n=new Image,o=new FileReader;o.onload=function(e){n.src=e.target.result},o.readAsDataURL(a.target.files[0]),n.onload=function(){if(n.height*n.width>2e7)return void document.querySelector(".Error").classList.remove("Hidden");document.querySelector(".Error").classList.add("Hidden"),r.height=n.height,r.width=n.width,t.drawImage(n,0,0);var a=new ImageData(e.artFunction(t,r.width,r.height),n.width);t.putImageData(a,0,0),document.querySelector(".Footer").classList.remove("Hidden")}})})}},{key:"artFunction",value:function(e,r,t){return new Uint8ClampedArray(e.getImageData(0,0,r,t).data)}},{key:"rgbToHsl",value:function(e){var r=e[0]/255,t=e[1]/255,a=e[2]/255,n=Math.max(r,t,a),o=Math.min(r,t,a),i=void 0,u=void 0,c=(n+o)/2;if(n===o)i=u=0;else{var l=n-o;switch(u=c>.5?l/(2-n-o):l/(n+o),n){case r:i=(t-a)/l+(t<a?6:0);break;case t:i=(a-r)/l+2;break;case a:i=(r-t)/l+4}i/=6}return[360*i,100*u,100*c]}},{key:"rgbToHslForHumans",value:function(e){var r=e[0]/255,t=e[1]/255,a=e[2]/255,n=Math.max(r,t,a),o=Math.min(r,t,a),i=void 0;if(n===o)i=0;else{var u=n-o;switch(n){case r:i=(t-a)/u+(t<a?6:0);break;case t:i=(a-r)/u+2;break;case a:i=(r-t)/u+4}i/=6}return[360*i,50,50]}},{key:"rgbaToRgb",value:function(e){var r=e[0]/255,t=e[1]/255,a=e[2]/255,n=e[3]/255,o=[];return o[0]=255*(1-n+n*r),o[1]=255*(1-n+n*t),o[2]=255*(1-n+n*a),[].concat(o,[255])}},{key:"getPixelAt",value:function(e,r,t,a){var n=4*e*t+4*r;return[a[n],a[n+1],a[n+2],a[n+3]]}},{key:"mergeArrays",value:function(e,r){e.push.apply(e,_toConsumableArray(r))}}]),e}();exports.default=Artifier;

},{}],2:[function(require,module,exports){
"use strict";function _interopRequireDefault(t){return t&&t.__esModule?t:{default:t}}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function _inherits(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var _createClass=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),_constants=require("./constants.js"),_Artifier2=require("./Artifier.js"),_Artifier3=_interopRequireDefault(_Artifier2),BasicColorTerminal=function(t){function e(){_classCallCheck(this,e);var t=_possibleConstructorReturn(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return t.colors=[_constants.RED,_constants.ORANGE,_constants.YELLOW,_constants.GREEN,_constants.BLUE,_constants.PURPLE,_constants.PINK,_constants.WHITE,_constants.BLACK,_constants.GRAY,_constants.BROWN],t}return _inherits(e,t),_createClass(e,[{key:"artFunction",value:function(t,e,r){for(var n=t.getImageData(0,0,e,r).data,o=this.colors,s=[],a=0;a<r;a++)for(var i=0;i<e;i++){var c=this.getPixelAt(a,i,e,n);255!==c[3]&&(c=this.rgbaToRgb(c));for(var u=void 0,l=1e9,f=0;f<o.length;f++){var _=o[f],p=_[0]-c[0],b=_[1]-c[1],h=_[2]-c[2],y=p*p+b*b+h*h;y<l&&(l=y,u=_)}this.mergeArrays(s,u)}return new Uint8ClampedArray(s)}}]),e}(_Artifier3.default),bct=new BasicColorTerminal;

},{"./Artifier.js":1,"./constants.js":3}],3:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var RED=exports.RED=[255,0,0,255],ORANGE=exports.ORANGE=[255,165,0,255],YELLOW=exports.YELLOW=[255,255,0,255],GREEN=exports.GREEN=[0,128,0,255],BLUE=exports.BLUE=[0,0,255,255],PURPLE=exports.PURPLE=[128,0,128,255],PINK=exports.PINK=[255,192,203,255],WHITE=exports.WHITE=[0,0,0,255],BLACK=exports.BLACK=[255,255,255,255],GRAY=exports.GRAY=[128,128,128,255],BROWN=exports.BROWN=[128,42,42,255];

},{}]},{},[2]);
