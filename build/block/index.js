/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/block/block.json":
/*!*********************************!*\
  !*** ./src/js/block/block.json ***!
  \*********************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"nightly/toggle","version":"1.0.0","title":"Nightly","category":"design","icon":"visibility","description":"A dark mode toggle button for your website.","keywords":["dark","mode","toggle","theme","nightly"],"textdomain":"nightly","attributes":{"toggleType":{"type":"string","default":"theme"},"mode":{"type":"string","default":"custom"},"showText":{"type":"boolean","default":true},"buttonText":{"type":"string","default":"Toggle Theme"},"buttonStyle":{"type":"string","default":"rounded"},"buttonSize":{"type":"string","default":"medium"},"backgroundColor":{"type":"string","default":"#333333"},"backgroundColorHover":{"type":"string","default":"#555555"},"backgroundColorActive":{"type":"string","default":"#79c0ff"},"textColor":{"type":"string","default":"#ffffff"},"textColorHover":{"type":"string","default":"#ffffff"},"borderColor":{"type":"string","default":"transparent"},"borderWidth":{"type":"number","default":0},"borderRadius":{"type":"number","default":50},"fontSize":{"type":"number","default":16},"fontWeight":{"type":"string","default":"500"},"paddingTop":{"type":"number","default":12},"paddingBottom":{"type":"number","default":12},"paddingLeft":{"type":"number","default":16},"paddingRight":{"type":"number","default":16},"marginTop":{"type":"number","default":0},"marginBottom":{"type":"number","default":0},"marginLeft":{"type":"number","default":0},"marginRight":{"type":"number","default":0},"boxShadow":{"type":"string","default":"0 2px 4px rgba(0,0,0,0.1)"},"boxShadowHover":{"type":"string","default":"0 4px 8px rgba(0,0,0,0.15)"}},"supports":{"html":false,"align":["left","center","right"],"spacing":{"margin":true,"padding":true},"color":{"background":true,"text":true,"gradients":true},"typography":{"fontSize":true,"fontWeight":true,"lineHeight":true},"border":{"color":true,"width":true,"radius":true},"inserter":true,"multiple":true,"reusable":true}}');

/***/ }),

/***/ "./src/js/block/edit.js":
/*!******************************!*\
  !*** ./src/js/block/edit.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__);






/**
 * Block Edit Component
 */
function Edit({
  attributes,
  setAttributes
}) {
  const [previewTheme, setPreviewTheme] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)('light');
  const {
    buttonText,
    buttonStyle,
    buttonSize,
    backgroundColor,
    backgroundColorHover,
    backgroundColorActive,
    textColor,
    textColorHover,
    borderColor,
    borderWidth,
    borderRadius,
    fontSize,
    fontWeight,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    boxShadow,
    boxShadowHover
  } = attributes;
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)({
    className: 'nightly-toggle-block'
  });

  // Handle preview toggle
  const handlePreviewToggle = () => {
    setPreviewTheme(previewTheme === 'light' ? 'dark' : 'light');
  };

  // Generate inline styles for the button
  const buttonStyles = {
    backgroundColor: backgroundColor,
    color: textColor,
    borderColor: borderColor,
    borderWidth: `${borderWidth}px`,
    borderRadius: `${borderRadius}%`,
    fontSize: `${fontSize}px`,
    fontWeight: fontWeight,
    padding: `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`,
    margin: `${marginTop}px ${marginRight}px ${marginBottom}px ${marginLeft}px`,
    boxShadow: boxShadow
  };

  // Generate hover styles
  const hoverStyles = `
		.nightly-toggle-button:hover {
			background-color: ${backgroundColorHover} !important;
			color: ${textColorHover} !important;
			box-shadow: ${boxShadowHover} !important;
		}
	`;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Button Settings', 'nightly'),
    initialOpen: true
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Button Text', 'nightly'),
    value: buttonText,
    onChange: value => setAttributes({
      buttonText: value
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Button Style', 'nightly'),
    value: buttonStyle,
    options: [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Rounded', 'nightly'),
      value: 'rounded'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Square', 'nightly'),
      value: 'square'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Pill', 'nightly'),
      value: 'pill'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Circle', 'nightly'),
      value: 'circle'
    }],
    onChange: value => setAttributes({
      buttonStyle: value
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Button Size', 'nightly'),
    value: buttonSize,
    options: [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Small', 'nightly'),
      value: 'small'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Medium', 'nightly'),
      value: 'medium'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Large', 'nightly'),
      value: 'large'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Extra Large', 'nightly'),
      value: 'xlarge'
    }],
    onChange: value => setAttributes({
      buttonSize: value
    })
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Colors', 'nightly'),
    initialOpen: false
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "components-base-control"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "components-base-control__label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Background Color', 'nightly')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.ColorPalette, {
    value: backgroundColor,
    onChange: color => setAttributes({
      backgroundColor: color
    })
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "components-base-control"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "components-base-control__label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Hover Background Color', 'nightly')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.ColorPalette, {
    value: backgroundColorHover,
    onChange: color => setAttributes({
      backgroundColorHover: color
    })
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "components-base-control"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "components-base-control__label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Active Background Color', 'nightly')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.ColorPalette, {
    value: backgroundColorActive,
    onChange: color => setAttributes({
      backgroundColorActive: color
    })
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "components-base-control"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "components-base-control__label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Text Color', 'nightly')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.ColorPalette, {
    value: textColor,
    onChange: color => setAttributes({
      textColor: color
    })
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "components-base-control"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "components-base-control__label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Hover Text Color', 'nightly')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.ColorPalette, {
    value: textColorHover,
    onChange: color => setAttributes({
      textColorHover: color
    })
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "components-base-control"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "components-base-control__label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Border Color', 'nightly')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.ColorPalette, {
    value: borderColor,
    onChange: color => setAttributes({
      borderColor: color
    })
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Typography', 'nightly'),
    initialOpen: false
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Font Size (px)', 'nightly'),
    value: fontSize,
    onChange: value => setAttributes({
      fontSize: value
    }),
    min: 12,
    max: 48,
    step: 1
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Font Weight', 'nightly'),
    value: fontWeight,
    options: [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Normal', 'nightly'),
      value: '400'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Medium', 'nightly'),
      value: '500'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Semi Bold', 'nightly'),
      value: '600'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Bold', 'nightly'),
      value: '700'
    }],
    onChange: value => setAttributes({
      fontWeight: value
    })
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Spacing', 'nightly'),
    initialOpen: false
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Padding Top (px)', 'nightly'),
    value: paddingTop,
    onChange: value => setAttributes({
      paddingTop: value
    }),
    min: 0,
    max: 50,
    step: 1
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Padding Bottom (px)', 'nightly'),
    value: paddingBottom,
    onChange: value => setAttributes({
      paddingBottom: value
    }),
    min: 0,
    max: 50,
    step: 1
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Padding Left (px)', 'nightly'),
    value: paddingLeft,
    onChange: value => setAttributes({
      paddingLeft: value
    }),
    min: 0,
    max: 50,
    step: 1
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Padding Right (px)', 'nightly'),
    value: paddingRight,
    onChange: value => setAttributes({
      paddingRight: value
    }),
    min: 0,
    max: 50,
    step: 1
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Border & Shadow', 'nightly'),
    initialOpen: false
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Border Width (px)', 'nightly'),
    value: borderWidth,
    onChange: value => setAttributes({
      borderWidth: value
    }),
    min: 0,
    max: 10,
    step: 1
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Border Radius (%)', 'nightly'),
    value: borderRadius,
    onChange: value => setAttributes({
      borderRadius: value
    }),
    min: 0,
    max: 50,
    step: 1
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Box Shadow', 'nightly'),
    value: boxShadow,
    onChange: value => setAttributes({
      boxShadow: value
    }),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('CSS box-shadow value (e.g., 0 2px 4px rgba(0,0,0,0.1))', 'nightly')
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Hover Box Shadow', 'nightly'),
    value: boxShadowHover,
    onChange: value => setAttributes({
      boxShadowHover: value
    }),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('CSS box-shadow value for hover state', 'nightly')
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ...blockProps
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("style", null, hoverStyles), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: `nightly-toggle-button nightly-button-${buttonStyle} nightly-button-${buttonSize}`,
    onClick: handlePreviewToggle,
    "aria-pressed": previewTheme === 'dark' ? 'true' : 'false',
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Toggle dark mode', 'nightly'),
    style: buttonStyles
  }, buttonStyle === 'circle' ? '🌙' : buttonText)));
}

/***/ }),

/***/ "./src/js/block/save.js":
/*!******************************!*\
  !*** ./src/js/block/save.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Save)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);

/**
 * Block Save Component
 *
 * @package Nightly
 */



/**
 * Block Save Component
 */
function Save({
  attributes
}) {
  const {
    buttonText,
    buttonStyle,
    buttonSize,
    backgroundColor,
    backgroundColorHover,
    backgroundColorActive,
    textColor,
    textColorHover,
    borderColor,
    borderWidth,
    borderRadius,
    fontSize,
    fontWeight,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    boxShadow,
    boxShadowHover
  } = attributes;
  const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save({
    className: 'nightly-toggle-block'
  });

  // Generate inline styles for the button
  const buttonStyles = {
    backgroundColor: backgroundColor,
    color: textColor,
    borderColor: borderColor,
    borderWidth: `${borderWidth}px`,
    borderRadius: `${borderRadius}%`,
    fontSize: `${fontSize}px`,
    fontWeight: fontWeight,
    padding: `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`,
    margin: `${marginTop}px ${marginRight}px ${marginBottom}px ${marginLeft}px`,
    boxShadow: boxShadow
  };

  // Generate hover styles
  const hoverStyles = `
		.nightly-toggle-button:hover {
			background-color: ${backgroundColorHover} !important;
			color: ${textColorHover} !important;
			box-shadow: ${boxShadowHover} !important;
		}
	`;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ...blockProps
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("style", null, hoverStyles), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: `nightly-toggle-button nightly-button-${buttonStyle} nightly-button-${buttonSize}`,
    "data-nightly-toggle": attributes.toggleType || 'theme',
    "data-nightly-mode": attributes.mode || 'custom',
    "aria-pressed": "false",
    "aria-label": "Toggle dark mode",
    style: buttonStyles
  }, buttonStyle === 'circle' ? '🌙' : buttonText));
}

/***/ }),

/***/ "./src/scss/block.scss":
/*!*****************************!*\
  !*** ./src/scss/block.scss ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*******************************!*\
  !*** ./src/js/block/index.js ***!
  \*******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/js/block/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./save */ "./src/js/block/save.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./block.json */ "./src/js/block/block.json");
/* harmony import */ var _scss_block_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../scss/block.scss */ "./src/scss/block.scss");
/**
 * Block Editor Entry Point
 *
 * @package Nightly
 */








/**
 * Register the Nightly block
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_4__.name, {
  ..._block_json__WEBPACK_IMPORTED_MODULE_4__,
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"],
  save: _save__WEBPACK_IMPORTED_MODULE_3__["default"]
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map