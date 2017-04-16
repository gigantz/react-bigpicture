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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reactDom = __webpack_require__(7);

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var
// assign window object to variable
global = window,

// trigger element used to open popup
el,

// set to true after first interaction
initialized,

// container element holding html needed for script
container,

// currently active display element (image, video, youtube / vimeo iframe container)
displayElement,

// popup image element
displayImage,

// popup video element
displayVideo,

// container element to hold youtube / vimeo iframe
iframeContainer,

// iframe to hold youtube / vimeo player
iframeSiteVid,

// store requested image source
imgSrc,

// button that closes the container
closeButton,

// youtube / vimeo video id
siteVidID,

// keeps track of loading icon display state
isLoading,

// timeout to check video status while loading
checkVidTimeout,

// loading icon element
loadingIcon,

// caption element
caption,

// caption content element
captionText,

// store caption content
captionContent,

// hide caption button element
captionHideButton,

// open state for container element
isOpen,

// used during close animation to avoid triggering timeout twice
isClosing,

// array of prev viewed image urls to check if cached before showing loading icon
imgCache,

// store whether remote image is already cached on request
cached,

// store whether image requested is remote or local
remoteImage,

// store animation opening callbacks
animationStart,
    animationEnd,

// set to true if user wants to hide loading icon
noLoader,

// Save bytes in the minified version
doc = document,
    appendEl = 'appendChild',
    createEl = 'createElement',
    removeEl = 'removeChild',
    htmlInner = 'innerHTML',
    pointerEventsAuto = 'pointer-events:auto',
    cHeight = 'clientHeight',
    cWidth = 'clientWidth',
    listenFor = 'addEventListener',
    timeout = global.setTimeout,
    clearTimeout = global.clearTimeout; // BigPicture.js | license MIT | henrygd.me/bigpicture


var big = function big(options) {
    // initialize called on initial open to create elements / style / event handlers
    initialized || initialize();

    // clear currently loading stuff
    if (isLoading) {
        clearTimeout(checkVidTimeout);
        removeContainer();
    }

    // store video id if youtube / vimeo video is requested
    siteVidID = options.ytSrc || options.vimeoSrc;

    // store optional callbacks
    animationStart = options.animationStart;
    animationEnd = options.animationEnd;

    // store whether user requests to hide loading icon
    noLoader = options.noLoader;

    // set trigger element
    el = options.el;

    // wipe existing remoteImage state
    remoteImage = false;

    // set caption if provided
    captionContent = el.getAttribute('title');
    if (captionContent) {
        captionText[htmlInner] = captionContent;
        container[appendEl](caption);
    }

    // if vimeo or youtube video
    if (siteVidID) {
        toggleLoadingIcon(true);
        displayElement = iframeContainer;
        createIframe(!!options.ytSrc);
    }
    // if remote image
    else if (options.imgSrc) {
            remoteImage = true;
            imgSrc = options.imgSrc;
            cached = ~imgCache.indexOf(imgSrc);
            !cached && toggleLoadingIcon(true);
            displayElement = displayImage;
            displayElement.src = imgSrc;
        }
        // if direct video link
        else if (options.vidSrc) {
                toggleLoadingIcon(true);
                displayElement = displayVideo;
                displayElement.src = options.vidSrc;
                checkVid();
            }
            // local image / background image already loaded on page
            else {
                    displayElement = displayImage;
                    // get img source or element background image
                    displayElement.src = el.tagName === 'IMG' ? el.src : global.getComputedStyle(el).backgroundImage.replace(/^url|[\(|\)|'|"]/g, '');
                }

    // add container to page
    container[appendEl](displayElement);
    doc.body[appendEl](container);
};

// create all needed methods / store dom elements on first use
function initialize() {

    // return close button elements
    function createCloseButton() {
        var el = doc[createEl]('button');
        el.className = 'bp-x';
        el[htmlInner] = '&#215;';
        return el;
    }

    // imgCache holds displayed image urls to prevent loader on cached images
    imgCache = [];

    // add style
    // if you want to tweak, grab from doc head & run through beautifier
    var style = doc[createEl]('STYLE');
    style[htmlInner] = '#bp_caption,#bp_container{bottom:0;left:0;right:0;position:fixed;opacity:0}#bp_container>*,.bp-x,#bp_loader{position:absolute;right:0}#bp_container{top:0;z-index:9999;background:rgba(0,0,0,.7);opacity:0;pointer-events:none;transition:opacity .35s}#bp_loader{top:0;left:0;bottom:0;display:-webkit-flex;display:flex;margin:0;cursor:wait;z-index:9}#bp_loader svg{width:40%;max-height:40%;margin:auto;' + webkitify('animation:', 'ldr .7s infinite linear;') + '}' + webkitifyKeyframes('keyframes ldr{to{' + webkitify('transform:', 'rotate(1turn);') + '}}') + '#bp_container img,#bp_sv,#bp_vid{max-height:96%;max-width:96%;top:0;bottom:0;left:0;margin:auto;box-shadow:0 0 3em rgba(0,0,0,.4);z-index:-1}#bp_sv{width:171vh}#bp_caption{font-size:.9em;font-family:Arial;padding:1.3em;background:rgba(15,15,15,.94);color:#fff;text-align:center;transition:opacity .3s}.bp-x{font-family:Arial;top:0;cursor:pointer;opacity:.8;font-size:3em;padding:0 .3em;color:#fff;background:transparent;border:0;text-shadow:0 0 2px #000}#bp_caption .bp-x{left:2%;top:auto;right:auto;bottom:100%;padding:0 .6em;background:#d74040;border-radius:2px 2px 0 0;font-size:2.3em;text-shadow:none}.bp-x:hover,.bp-x:focus{opacity:1}.bp-x:active{outline:0}@media (max-aspect-ratio:9/5){#bp_sv{height:53vw}}';
    doc.head[appendEl](style);

    // create container element
    container = doc[createEl]('DIV');
    container.id = 'bp_container';
    container.onclick = close;
    closeButton = createCloseButton();
    container[appendEl](closeButton);

    // create display image element
    displayImage = doc[createEl]('IMG');

    // create display video element
    displayVideo = doc[createEl]('VIDEO');
    displayVideo.id = 'bp_vid';
    displayVideo.autoplay = true;
    displayVideo.controls = true;
    displayVideo.loop = true;

    // create caption elements
    caption = doc[createEl]('DIV');
    caption.id = 'bp_caption';
    captionHideButton = createCloseButton();
    captionHideButton.onclick = function () {
        changeCSS(caption, 'opacity:0');
        timeout(function () {
            captionContent = false;
            container[removeEl](caption);
        }, 300);
    };
    caption[appendEl](captionHideButton);
    captionText = doc[createEl]('SPAN');
    caption[appendEl](captionText);

    // create loading icon element
    loadingIcon = doc[createEl]('DIV');
    loadingIcon.id = 'bp_loader';
    loadingIcon[htmlInner] = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 399 399"><path d="M341 58.5C303 20.8 253 0 199.6 0 146.4 0 96.2 20.8 58.5 58.5 20.8 96.2 0 146.5 0 199.7 0 253 20.8 303.2 58.5 341c37.7 37.6 88 58.4 141.2 58.4 53.3 0 103.5-20.8 141.2-58.5 37.6-37.8 58.4-88 58.4-141.3 0-53.3-20.8-103.5-58.5-141.2zm-13 12.8c34.3 34.3 53.2 80 53.2 128.4h-41c0-77.4-63-140.4-140.5-140.4-4.6 0-9 .2-13.6.7V18.7c4.6-.4 9-.5 13.7-.5 48.5 0 94 18.8 128.4 53zM199.8 322c-67.4 0-122.2-55-122.2-122.3S132.3 77.5 199.7 77.5 322 132.3 322 199.7 267 322 199.6 322z"/></svg>';

    // create youtube / vimeo container
    iframeContainer = doc[createEl]('DIV');
    iframeContainer.id = 'bp_sv';

    // create iframe to hold youtube / vimeo player
    iframeSiteVid = doc[createEl]('IFRAME');
    iframeSiteVid.allowFullscreen = true;
    iframeSiteVid.onload = open;
    changeCSS(iframeSiteVid, 'border:0px;height:100%;width:100%');
    iframeContainer[appendEl](iframeSiteVid);

    // display image bindings for image load and error
    displayImage.onload = open;
    displayImage.onerror = open.bind(null, 'image');

    // adjust loader position on window resize
    global[listenFor]('resize', function () {
        isLoading && toggleLoadingIcon(true);
    });

    // close container on escape key press
    doc[listenFor]('keyup', function (e) {
        e.keyCode === 27 && isOpen && close(container);
    });

    // trap focus within conainer while open
    doc[listenFor]('focus', function (e) {
        if (isOpen && !container.contains(e.target)) {
            e.stopPropagation();
            closeButton.focus();
        }
    }, true);

    // all done
    initialized = true;
}

// return transform style to make full size display el match trigger el size
function getRect() {
    // var elWidth = ReactDOM.findDOMNode(this.refs.the_input).getBoundingClientRect().width
    // var rect = el.getBoundingClientRect();
    var rect = _reactDom2.default.findDOMNode(el).getBoundingClientRect();

    var leftOffset = rect.left - (container[cWidth] - rect.width) / 2;
    var centerTop = rect.top - (container[cHeight] - rect.height) / 2;
    var scaleWidth = el[cWidth] / displayElement[cWidth];
    var scaleHeight = el[cHeight] / displayElement[cHeight];
    return webkitify('transform:', 'translate3D(' + leftOffset + 'px, ' + centerTop + 'px, 0) scale3D(' + scaleWidth + ', ' + scaleHeight + ', 0);');
}

// create youtube / vimeo video iframe
function createIframe(isYoutube) {
    // create appropriate url for youtube or vimeo
    var url = isYoutube ? 'www.youtube.com/embed/' + siteVidID + '?enablejsapi=1&html5=1&rel=0&showinfo=0&' : 'player.vimeo.com/video/' + siteVidID + '?';

    // set iframe src to url
    iframeSiteVid.src = 'https://' + url + 'autoplay=1';
}

// timeout to check video status while loading
// onloadeddata event doesn't seem to fire in less up-to-date browsers like midori & epiphany
function checkVid() {
    if (displayElement.readyState === 4) open();else if (displayVideo.error) open('video');else checkVidTimeout = timeout(checkVid, 35);
}

// hide / show loading icon
function toggleLoadingIcon(bool) {
    // don't show loading icon if noLoader is specified
    if (noLoader) return;
    // bool is true if we want to show icon, false if we want to remove
    // change style to match trigger element dimensions if we want to show
    bool && changeCSS(loadingIcon, 'top:' + el.offsetTop + 'px;left:' + el.offsetLeft + 'px;height:' + el[cHeight] + 'px;width:' + el[cWidth] + 'px');
    // add or remove loader from DOM
    el.parentElement[bool ? appendEl : removeEl](loadingIcon);
    isLoading = bool;
}

// animate open of image / video; display caption if needed
function open(err) {
    // hide loading spinner
    isLoading && toggleLoadingIcon();

    // execute animationStart callback
    animationStart && animationStart();

    // check if we have an error string instead of normal event
    if (typeof err === 'string') {
        removeContainer();
        return alert('Error: The requested ' + err + ' could not be displayed.');
    }

    // if remote image is loaded, add url to imgCache array
    remoteImage && !cached && imgCache.push(imgSrc);

    // transform displayEl to match trigger el
    changeCSS(displayElement, getRect());

    // fade in container
    changeCSS(container, 'opacity:1;' + pointerEventsAuto);

    // set animationEnd callback to run after animation ends (cleared if container closed)
    animationEnd = timeout(animationEnd, 410);

    isOpen = true;

    // enlarge displayEl, fade in caption if hasCaption
    timeout(function () {
        changeCSS(displayElement, webkitify('transition:', 'transform .35s;') + webkitify('transform:', 'none;'));
        captionContent && timeout(changeCSS.bind(null, caption, 'opacity:1'), 250);
    }, 60);
}

// close active display element
function close(e) {
    var target = e.target;
    var clickEls = [caption, captionHideButton, displayVideo, captionText];

    // blur to hide close button focus style
    target && target.blur();

    // don't close if one of the clickEls was clicked or container is already closing
    if (isClosing || ~clickEls.indexOf(target)) {
        return;
    }

    // animate closing
    displayElement.style.cssText += getRect();
    changeCSS(container, pointerEventsAuto);

    // timeout to remove els from dom; use variable to avoid calling more than once
    timeout(removeContainer, 350);

    // clear animationEnd timeout
    clearTimeout(animationEnd);

    isOpen = false;
    isClosing = true;
}

// remove container / display element from the DOM
function removeContainer() {
    // remove container from DOM & clear inline style
    doc.body[removeEl](container);
    container[removeEl](displayElement);
    changeCSS(container, '');

    // clear src of displayElement (or iframe if display el is iframe container)
    (displayElement === iframeContainer ? iframeSiteVid : displayElement).removeAttribute('src');

    if (captionContent) {
        changeCSS(caption, '');
        container[removeEl](caption);
    }
    isClosing = false;
}

// style helper functions
function changeCSS(element, newStyle) {
    element.style.cssText = newStyle;
}
function webkitify(prop, val) {
    var webkit = '-webkit-';
    var propVal = prop + val;
    return webkit + propVal + prop + webkit + val + propVal;
}
function webkitifyKeyframes(css) {
    return '@-webkit-' + css + '@' + css;
}

exports.default = big;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

if (false) {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = require('./factoryWithTypeCheckers')(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(6)();
}


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BVimeo = exports.BYoutube = exports.BVideo = exports.BPicture = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _bigpicture = __webpack_require__(0);

var _bigpicture2 = _interopRequireDefault(_bigpicture);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BPicture = exports.BPicture = function (_Component) {
    _inherits(BPicture, _Component);

    function BPicture(props) {
        _classCallCheck(this, BPicture);

        var _this = _possibleConstructorReturn(this, (BPicture.__proto__ || Object.getPrototypeOf(BPicture)).call(this, props));

        _this.zoomHandle = function () {
            (0, _bigpicture2.default)({
                el: _this.refs.link,
                imgSrc: _this.props.src
            });
        };

        return _this;
    }

    _createClass(BPicture, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'bigpicture link picture', onClick: this.zoomHandle, ref: 'link', title: this.props.caption, style: { display: 'inline-block' } },
                this.props.children
            );
        }
    }]);

    return BPicture;
}(_react.Component);

BPicture.propTypes = {
    src: _propTypes2.default.string.isRequired,
    caption: _propTypes2.default.string
};

var BVideo = exports.BVideo = function (_Component2) {
    _inherits(BVideo, _Component2);

    function BVideo(props) {
        _classCallCheck(this, BVideo);

        var _this2 = _possibleConstructorReturn(this, (BVideo.__proto__ || Object.getPrototypeOf(BVideo)).call(this, props));

        _this2.zoomHandle = function () {
            console.log({ el: _this2.refs.link,
                src: _this2.props.src });
            (0, _bigpicture2.default)({
                el: _this2.refs.link,
                vidSrc: _this2.props.src
            });
        };

        return _this2;
    }

    _createClass(BVideo, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'bigpicture link video', onClick: this.zoomHandle, ref: 'link', title: this.props.caption, style: { display: 'inline-block' } },
                this.props.children
            );
        }
    }]);

    return BVideo;
}(_react.Component);

BVideo.propTypes = {
    src: _propTypes2.default.string.isRequired,
    caption: _propTypes2.default.string
};

var BYoutube = exports.BYoutube = function (_Component3) {
    _inherits(BYoutube, _Component3);

    function BYoutube(props) {
        _classCallCheck(this, BYoutube);

        var _this3 = _possibleConstructorReturn(this, (BYoutube.__proto__ || Object.getPrototypeOf(BYoutube)).call(this, props));

        _this3.zoomHandle = function () {
            (0, _bigpicture2.default)({
                el: _this3.refs.link,
                ytSrc: _this3.props.src.split('=')[1]
            });
        };

        return _this3;
    }

    _createClass(BYoutube, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'bigpicture link video', onClick: this.zoomHandle, ref: 'link', title: this.props.caption, style: { display: 'inline-block' } },
                this.props.children
            );
        }
    }]);

    return BYoutube;
}(_react.Component);

BYoutube.propTypes = {
    src: _propTypes2.default.string.isRequired,
    caption: _propTypes2.default.string
};

var BVimeo = exports.BVimeo = function (_Component4) {
    _inherits(BVimeo, _Component4);

    function BVimeo(props) {
        _classCallCheck(this, BVimeo);

        var _this4 = _possibleConstructorReturn(this, (BVimeo.__proto__ || Object.getPrototypeOf(BVimeo)).call(this, props));

        _this4.zoomHandle = function () {
            var vimeoID = _this4.props.src.split('/');
            (0, _bigpicture2.default)({
                el: _this4.refs.link,
                vimeoSrc: vimeoID[vimeoID.length - 1]
            });
        };

        return _this4;
    }

    _createClass(BVimeo, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'bigpicture link video', onClick: this.zoomHandle, ref: 'link', title: this.props.caption, style: { display: 'inline-block' } },
                this.props.children
            );
        }
    }]);

    return BVimeo;
}(_react.Component);

BVimeo.propTypes = {
    src: _propTypes2.default.string.isRequired,
    caption: _propTypes2.default.string
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (false) {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var emptyFunction = __webpack_require__(4);
var invariant = __webpack_require__(5);

module.exports = function() {
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  function shim() {
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ })
/******/ ]);