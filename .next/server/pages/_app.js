/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function() {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./components/CodeBlock.tsx":
/*!**********************************!*\
  !*** ./components/CodeBlock.tsx ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ CodeBlock; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var prism_react_renderer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prism-react-renderer */ \"prism-react-renderer\");\n/* harmony import */ var prism_react_renderer__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prism_react_renderer__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var prism_react_renderer_themes_nightOwl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prism-react-renderer/themes/nightOwl */ \"prism-react-renderer/themes/nightOwl\");\n/* harmony import */ var prism_react_renderer_themes_nightOwl__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prism_react_renderer_themes_nightOwl__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _CodeBlock_module_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CodeBlock.module.css */ \"./components/CodeBlock.module.css\");\n/* harmony import */ var _CodeBlock_module_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_CodeBlock_module_css__WEBPACK_IMPORTED_MODULE_4__);\n\nvar _jsxFileName = \"/Volumes/data/projects/next-mdx/components/CodeBlock.tsx\";\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\nfunction CodeBlock({\n  children,\n  className\n}) {\n  const language = className.replace(/language-/, '');\n  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((prism_react_renderer__WEBPACK_IMPORTED_MODULE_2___default()), _objectSpread(_objectSpread({}, prism_react_renderer__WEBPACK_IMPORTED_MODULE_2__.defaultProps), {}, {\n    theme: (prism_react_renderer_themes_nightOwl__WEBPACK_IMPORTED_MODULE_3___default()),\n    code: children.trim(),\n    language: language,\n    children: ({\n      className,\n      style,\n      tokens,\n      getLineProps,\n      getTokenProps\n    }) => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"pre\", {\n      className: [className, (_CodeBlock_module_css__WEBPACK_IMPORTED_MODULE_4___default().pre)].join(' '),\n      style: style,\n      children: tokens.map((line, i) => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", _objectSpread(_objectSpread({}, getLineProps({\n        line,\n        key: i\n      })), {}, {\n        className: (_CodeBlock_module_css__WEBPACK_IMPORTED_MODULE_4___default().line),\n        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n          className: (_CodeBlock_module_css__WEBPACK_IMPORTED_MODULE_4___default().lineNo),\n          children: i + 1\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 16,\n          columnNumber: 15\n        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n          className: (_CodeBlock_module_css__WEBPACK_IMPORTED_MODULE_4___default().lineContent),\n          children: line.map((token, key) => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", _objectSpread({}, getTokenProps({\n            token,\n            key\n          })), key, false, {\n            fileName: _jsxFileName,\n            lineNumber: 19,\n            columnNumber: 19\n          }, this))\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 17,\n          columnNumber: 15\n        }, this)]\n      }), i, true, {\n        fileName: _jsxFileName,\n        lineNumber: 15,\n        columnNumber: 13\n      }, this))\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 13,\n      columnNumber: 9\n    }, this)\n  }), void 0, false, {\n    fileName: _jsxFileName,\n    lineNumber: 11,\n    columnNumber: 5\n  }, this);\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXh0LW1keC8uL2NvbXBvbmVudHMvQ29kZUJsb2NrLnRzeD9hZWIzIl0sIm5hbWVzIjpbIkNvZGVCbG9jayIsImNoaWxkcmVuIiwiY2xhc3NOYW1lIiwibGFuZ3VhZ2UiLCJyZXBsYWNlIiwiZGVmYXVsdFByb3BzIiwidGhlbWUiLCJ0cmltIiwic3R5bGUiLCJ0b2tlbnMiLCJnZXRMaW5lUHJvcHMiLCJnZXRUb2tlblByb3BzIiwic3R5bGVzIiwiam9pbiIsIm1hcCIsImxpbmUiLCJpIiwia2V5IiwidG9rZW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFFZSxTQUFTQSxTQUFULENBQW1CO0FBQUVDLFVBQUY7QUFBWUM7QUFBWixDQUFuQixFQUFpRDtBQUM5RCxRQUFNQyxRQUFRLEdBQUdELFNBQVMsQ0FBQ0UsT0FBVixDQUFrQixXQUFsQixFQUErQixFQUEvQixDQUFqQjtBQUVBLHNCQUNFLDhEQUFDLDZEQUFELGtDQUFlQyw4REFBZjtBQUE2QixTQUFLLEVBQUVDLDZFQUFwQztBQUEyQyxRQUFJLEVBQUVMLFFBQVEsQ0FBQ00sSUFBVCxFQUFqRDtBQUFrRSxZQUFRLEVBQUVKLFFBQTVFO0FBQUEsY0FDRyxDQUFDO0FBQUVELGVBQUY7QUFBYU0sV0FBYjtBQUFvQkMsWUFBcEI7QUFBNEJDLGtCQUE1QjtBQUEwQ0M7QUFBMUMsS0FBRCxrQkFDQztBQUFLLGVBQVMsRUFBRSxDQUFDVCxTQUFELEVBQVlVLGtFQUFaLEVBQXdCQyxJQUF4QixDQUE2QixHQUE3QixDQUFoQjtBQUFtRCxXQUFLLEVBQUVMLEtBQTFEO0FBQUEsZ0JBQ0dDLE1BQU0sQ0FBQ0ssR0FBUCxDQUFXLENBQUNDLElBQUQsRUFBT0MsQ0FBUCxrQkFDVixxR0FBaUJOLFlBQVksQ0FBQztBQUFFSyxZQUFGO0FBQVFFLFdBQUcsRUFBRUQ7QUFBYixPQUFELENBQTdCO0FBQWlELGlCQUFTLEVBQUVKLG1FQUE1RDtBQUFBLGdDQUNFO0FBQU0sbUJBQVMsRUFBRUEscUVBQWpCO0FBQUEsb0JBQWlDSSxDQUFDLEdBQUc7QUFBckM7QUFBQTtBQUFBO0FBQUE7QUFBQSxnQkFERixlQUVFO0FBQU0sbUJBQVMsRUFBRUosMEVBQWpCO0FBQUEsb0JBQ0dHLElBQUksQ0FBQ0QsR0FBTCxDQUFTLENBQUNJLEtBQUQsRUFBUUQsR0FBUixrQkFDUix3RkFBb0JOLGFBQWEsQ0FBQztBQUFFTyxpQkFBRjtBQUFTRDtBQUFULFdBQUQsQ0FBakMsR0FBV0EsR0FBWDtBQUFBO0FBQUE7QUFBQTtBQUFBLGtCQUREO0FBREg7QUFBQTtBQUFBO0FBQUE7QUFBQSxnQkFGRjtBQUFBLFVBQVVELENBQVY7QUFBQTtBQUFBO0FBQUE7QUFBQSxjQUREO0FBREg7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUZKO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFERjtBQWtCRCIsImZpbGUiOiIuL2NvbXBvbmVudHMvQ29kZUJsb2NrLnRzeC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgSGlnaGxpZ2h0LCB7IGRlZmF1bHRQcm9wcyB9IGZyb20gJ3ByaXNtLXJlYWN0LXJlbmRlcmVyJztcbmltcG9ydCB0aGVtZSBmcm9tICdwcmlzbS1yZWFjdC1yZW5kZXJlci90aGVtZXMvbmlnaHRPd2wnO1xuXG5pbXBvcnQgc3R5bGVzIGZyb20gJy4vQ29kZUJsb2NrLm1vZHVsZS5jc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDb2RlQmxvY2soeyBjaGlsZHJlbiwgY2xhc3NOYW1lIH06IGFueSkge1xuICBjb25zdCBsYW5ndWFnZSA9IGNsYXNzTmFtZS5yZXBsYWNlKC9sYW5ndWFnZS0vLCAnJyk7XG5cbiAgcmV0dXJuIChcbiAgICA8SGlnaGxpZ2h0IHsuLi5kZWZhdWx0UHJvcHN9IHRoZW1lPXt0aGVtZX0gY29kZT17Y2hpbGRyZW4udHJpbSgpfSBsYW5ndWFnZT17bGFuZ3VhZ2V9PlxuICAgICAgeyh7IGNsYXNzTmFtZSwgc3R5bGUsIHRva2VucywgZ2V0TGluZVByb3BzLCBnZXRUb2tlblByb3BzIH0pID0+IChcbiAgICAgICAgPHByZSBjbGFzc05hbWU9e1tjbGFzc05hbWUsIHN0eWxlcy5wcmVdLmpvaW4oJyAnKX0gc3R5bGU9e3N0eWxlfT5cbiAgICAgICAgICB7dG9rZW5zLm1hcCgobGluZSwgaSkgPT4gKFxuICAgICAgICAgICAgPGRpdiBrZXk9e2l9IHsuLi5nZXRMaW5lUHJvcHMoeyBsaW5lLCBrZXk6IGkgfSl9IGNsYXNzTmFtZT17c3R5bGVzLmxpbmV9PlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e3N0eWxlcy5saW5lTm99PntpICsgMX08L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17c3R5bGVzLmxpbmVDb250ZW50fT5cbiAgICAgICAgICAgICAgICB7bGluZS5tYXAoKHRva2VuLCBrZXkpID0+IChcbiAgICAgICAgICAgICAgICAgIDxzcGFuIGtleT17a2V5fSB7Li4uZ2V0VG9rZW5Qcm9wcyh7IHRva2VuLCBrZXkgfSl9IC8+XG4gICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICkpfVxuICAgICAgICA8L3ByZT5cbiAgICAgICl9XG4gICAgPC9IaWdobGlnaHQ+XG4gICk7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./components/CodeBlock.tsx\n");

/***/ }),

/***/ "./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ App; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _mdx_js_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mdx-js/react */ \"@mdx-js/react\");\n/* harmony import */ var _mdx_js_react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _components_CodeBlock__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/CodeBlock */ \"./components/CodeBlock.tsx\");\n\nvar _jsxFileName = \"/Volumes/data/projects/next-mdx/pages/_app.tsx\";\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\nconst mdComponents = {\n  h1: props => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", _objectSpread({\n    style: {\n      color: 'tomato'\n    }\n  }, props), void 0, false, {\n    fileName: _jsxFileName,\n    lineNumber: 6,\n    columnNumber: 23\n  }, undefined),\n  pre: props => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", _objectSpread({}, props), void 0, false, {\n    fileName: _jsxFileName,\n    lineNumber: 7,\n    columnNumber: 24\n  }, undefined),\n  code: _components_CodeBlock__WEBPACK_IMPORTED_MODULE_3__.default\n};\nfunction App({\n  Component,\n  pageProps\n}) {\n  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__.MDXProvider, {\n    components: mdComponents,\n    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, _objectSpread({}, pageProps), void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 14,\n      columnNumber: 7\n    }, this)\n  }, void 0, false, {\n    fileName: _jsxFileName,\n    lineNumber: 13,\n    columnNumber: 5\n  }, this);\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXh0LW1keC8uL3BhZ2VzL19hcHAudHN4PzcyMTYiXSwibmFtZXMiOlsibWRDb21wb25lbnRzIiwiaDEiLCJwcm9wcyIsImNvbG9yIiwicHJlIiwiY29kZSIsIkNvZGVCbG9jayIsIkFwcCIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFFQSxNQUFNQSxZQUFZLEdBQUc7QUFDbkJDLElBQUUsRUFBR0MsS0FBRCxpQkFBZ0I7QUFBSSxTQUFLLEVBQUU7QUFBRUMsV0FBSyxFQUFFO0FBQVQ7QUFBWCxLQUFvQ0QsS0FBcEM7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUREO0FBRW5CRSxLQUFHLEVBQUdGLEtBQUQsaUJBQWdCLHVGQUFTQSxLQUFUO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFGRjtBQUduQkcsTUFBSSxFQUFFQywwREFBU0E7QUFISSxDQUFyQjtBQU1lLFNBQVNDLEdBQVQsQ0FBYTtBQUFFQyxXQUFGO0FBQWFDO0FBQWIsQ0FBYixFQUE2RTtBQUMxRixzQkFDRSw4REFBQyxzREFBRDtBQUFhLGNBQVUsRUFBRVQsWUFBekI7QUFBQSwyQkFDRSw4REFBQyxTQUFELG9CQUFlUyxTQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFERjtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBREY7QUFLRCIsImZpbGUiOiIuL3BhZ2VzL19hcHAudHN4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IE1EWFByb3ZpZGVyIH0gZnJvbSAnQG1keC1qcy9yZWFjdCc7XG5pbXBvcnQgQ29kZUJsb2NrIGZyb20gJy4uL2NvbXBvbmVudHMvQ29kZUJsb2NrJztcblxuY29uc3QgbWRDb21wb25lbnRzID0ge1xuICBoMTogKHByb3BzOiBhbnkpID0+IDxoMSBzdHlsZT17eyBjb2xvcjogJ3RvbWF0bycgfX0gey4uLnByb3BzfSAvPixcbiAgcHJlOiAocHJvcHM6IGFueSkgPT4gPGRpdiB7Li4ucHJvcHN9IC8+LFxuICBjb2RlOiBDb2RlQmxvY2ssXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBBcHAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9OiB7IENvbXBvbmVudD86IGFueTsgcGFnZVByb3BzPzogYW55IH0pIHtcbiAgcmV0dXJuIChcbiAgICA8TURYUHJvdmlkZXIgY29tcG9uZW50cz17bWRDb21wb25lbnRzfT5cbiAgICAgIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cbiAgICA8L01EWFByb3ZpZGVyPlxuICApO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/_app.tsx\n");

/***/ }),

/***/ "./components/CodeBlock.module.css":
/*!*****************************************!*\
  !*** ./components/CodeBlock.module.css ***!
  \*****************************************/
/***/ (function(module) {

eval("// Exports\nmodule.exports = {\n\t\"pre\": \"CodeBlock_pre__1UMNv\",\n\t\"line\": \"CodeBlock_line__2ZbOF\",\n\t\"lineNo\": \"CodeBlock_lineNo__2dJBR\",\n\t\"lineContent\": \"CodeBlock_lineContent__1aqh5\"\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXh0LW1keC8uL2NvbXBvbmVudHMvQ29kZUJsb2NrLm1vZHVsZS5jc3M/ODM4MSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiIuL2NvbXBvbmVudHMvQ29kZUJsb2NrLm1vZHVsZS5jc3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBFeHBvcnRzXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0XCJwcmVcIjogXCJDb2RlQmxvY2tfcHJlX18xVU1OdlwiLFxuXHRcImxpbmVcIjogXCJDb2RlQmxvY2tfbGluZV9fMlpiT0ZcIixcblx0XCJsaW5lTm9cIjogXCJDb2RlQmxvY2tfbGluZU5vX18yZEpCUlwiLFxuXHRcImxpbmVDb250ZW50XCI6IFwiQ29kZUJsb2NrX2xpbmVDb250ZW50X18xYXFoNVwiXG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./components/CodeBlock.module.css\n");

/***/ }),

/***/ "@mdx-js/react":
/*!********************************!*\
  !*** external "@mdx-js/react" ***!
  \********************************/
/***/ (function(module) {

"use strict";
module.exports = require("@mdx-js/react");;

/***/ }),

/***/ "prism-react-renderer":
/*!***************************************!*\
  !*** external "prism-react-renderer" ***!
  \***************************************/
/***/ (function(module) {

"use strict";
module.exports = require("prism-react-renderer");;

/***/ }),

/***/ "prism-react-renderer/themes/nightOwl":
/*!*******************************************************!*\
  !*** external "prism-react-renderer/themes/nightOwl" ***!
  \*******************************************************/
/***/ (function(module) {

"use strict";
module.exports = require("prism-react-renderer/themes/nightOwl");;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ (function(module) {

"use strict";
module.exports = require("react");;

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ (function(module) {

"use strict";
module.exports = require("react/jsx-dev-runtime");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = (__webpack_exec__("./pages/_app.tsx"));
module.exports = __webpack_exports__;

})();