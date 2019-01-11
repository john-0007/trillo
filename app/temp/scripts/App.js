/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/scripts";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_sprite__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_sprite___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__modules_sprite__);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

function embed(parent, svg, target) {
  // if the target exists
  if (target) {
    // create a document fragment to hold the contents of the target
    var fragment = document.createDocumentFragment(),
        viewBox = !svg.hasAttribute('viewBox') && target.getAttribute('viewBox');
    // conditionally set the viewBox on the svg
    viewBox && svg.setAttribute('viewBox', viewBox);
    // copy the contents of the clone into the fragment
    for (
    // clone the target
    var clone = target.cloneNode(!0); clone.childNodes.length;) {
      fragment.appendChild(clone.firstChild);
    }
    // append the fragment into the svg
    parent.appendChild(fragment);
  }
}

function loadreadystatechange(xhr) {
  // listen to changes in the request
  xhr.onreadystatechange = function () {
    // if the request is ready
    if (4 === xhr.readyState) {
      // get the cached html document
      var cachedDocument = xhr._cachedDocument;
      // ensure the cached html document based on the xhr response
      cachedDocument || (cachedDocument = xhr._cachedDocument = document.implementation.createHTMLDocument(''), cachedDocument.body.innerHTML = xhr.responseText, xhr._cachedTarget = {}), // clear the xhr embeds list and embed each item
      xhr._embeds.splice(0).map(function (item) {
        // get the cached target
        var target = xhr._cachedTarget[item.id];
        // ensure the cached target
        target || (target = xhr._cachedTarget[item.id] = cachedDocument.getElementById(item.id)),
        // embed the target into the svg
        embed(item.parent, item.svg, target);
      });
    }
  }, // test the ready state change immediately
  xhr.onreadystatechange();
}

function svg4everybody(rawopts) {
  function oninterval() {
    // while the index exists in the live <use> collection
    for (
    // get the cached <use> index
    var index = 0; index < uses.length;) {
      // get the current <use>
      var use = uses[index],
          parent = use.parentNode,
          svg = getSVGAncestor(parent),
          src = use.getAttribute('xlink:href') || use.getAttribute('href');
      if (!src && opts.attributeName && (src = use.getAttribute(opts.attributeName)), svg && src) {
        if (polyfill) {
          if (!opts.validate || opts.validate(src, svg, use)) {
            // remove the <use> element
            parent.removeChild(use);
            // parse the src and get the url and id
            var srcSplit = src.split('#'),
                url = srcSplit.shift(),
                id = srcSplit.join('#');
            // if the link is external
            if (url.length) {
              // get the cached xhr request
              var xhr = requests[url];
              // ensure the xhr request exists
              xhr || (xhr = requests[url] = new XMLHttpRequest(), xhr.open('GET', url), xhr.send(), xhr._embeds = []), // add the svg and id as an item to the xhr embeds list
              xhr._embeds.push({
                parent: parent,
                svg: svg,
                id: id
              }), // prepare the xhr ready state change event
              loadreadystatechange(xhr);
            } else {
              // embed the local id into the svg
              embed(parent, svg, document.getElementById(id));
            }
          } else {
            // increase the index when the previous value was not "valid"
            ++index, ++numberOfSvgUseElementsToBypass;
          }
        }
      } else {
        // increase the index when the previous value was not "valid"
        ++index;
      }
    }
    // continue the interval
    (!uses.length || uses.length - numberOfSvgUseElementsToBypass > 0) && requestAnimationFrame(oninterval, 67);
  }
  var polyfill,
      opts = Object(rawopts),
      newerIEUA = /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/,
      webkitUA = /\bAppleWebKit\/(\d+)\b/,
      olderEdgeUA = /\bEdge\/12\.(\d+)\b/,
      edgeUA = /\bEdge\/.(\d+)\b/,
      inIframe = window.top !== window.self;
  polyfill = 'polyfill' in opts ? opts.polyfill : newerIEUA.test(navigator.userAgent) || (navigator.userAgent.match(olderEdgeUA) || [])[1] < 10547 || (navigator.userAgent.match(webkitUA) || [])[1] < 537 || edgeUA.test(navigator.userAgent) && inIframe;
  // create xhr requests object
  var requests = {},
      requestAnimationFrame = window.requestAnimationFrame || setTimeout,
      uses = document.getElementsByTagName('use'),
      numberOfSvgUseElementsToBypass = 0;
  // conditionally start the interval if the polyfill is active
  polyfill && oninterval();
}

function getSVGAncestor(node) {
  for (var svg = node; 'svg' !== svg.nodeName.toLowerCase() && (svg = svg.parentNode);) {}
  return svg;
}

svg4everybody();

/***/ })
/******/ ]);