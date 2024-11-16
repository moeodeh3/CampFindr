"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/resourceDetails",{

/***/ "./src/components/resourceDetails/resource-details.tsx":
/*!*************************************************************!*\
  !*** ./src/components/resourceDetails/resource-details.tsx ***!
  \*************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ ResourceDetails; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var src_hooks_api_query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/hooks/api/query */ \"./src/hooks/api/query.ts\");\n/* harmony import */ var _spacer_vertical_spacer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../spacer/vertical-spacer */ \"./src/components/spacer/vertical-spacer.tsx\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/image */ \"./node_modules/next/image.js\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _spacer_horizontal_spacer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../spacer/horizontal-spacer */ \"./src/components/spacer/horizontal-spacer.tsx\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils */ \"./src/components/resourceDetails/utils.tsx\");\n\n\n\n\n\n\nfunction ResourceDetails(props) {\n    const { resourceDetailsLoadable  } = props;\n    console.log(resourceDetailsLoadable);\n    const imageUrl = \"https://reservations.ontarioparks.ca/images/5b196a6e-a325-400a-b229-9bd9562c4378.png\";\n    return (0,src_hooks_api_query__WEBPACK_IMPORTED_MODULE_1__.onLoadable)(resourceDetailsLoadable)(()=>null, ()=>null, (resourceDetails)=>{\n        const formattedDescription = (0,_utils__WEBPACK_IMPORTED_MODULE_5__.getWithoutHtmlTags)(resourceDetails.description);\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"flex h-full w-full\",\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex flex-row justify-between h-full w-full\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"flex flex-col h-full w-1/2 p-8 space-y-8\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"flex flex-col space-y-4 w-full\",\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                        className: \"flex flex-col w-full items-center justify-center space-y-2\",\n                                        children: [\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_image__WEBPACK_IMPORTED_MODULE_3___default()), {\n                                                src: imageUrl,\n                                                alt: \"Failed to load\",\n                                                width: 335,\n                                                height: 187.5,\n                                                className: \"rounded-xl\"\n                                            }, void 0, false, {\n                                                fileName: \"/Users/moeodeh/Desktop/CampFindr/src/components/resourceDetails/resource-details.tsx\",\n                                                lineNumber: 33,\n                                                columnNumber: 19\n                                            }, this),\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                                className: \"text-text-primary text-xl font-semibold\",\n                                                children: resourceDetails.fullName\n                                            }, void 0, false, {\n                                                fileName: \"/Users/moeodeh/Desktop/CampFindr/src/components/resourceDetails/resource-details.tsx\",\n                                                lineNumber: 40,\n                                                columnNumber: 19\n                                            }, this)\n                                        ]\n                                    }, void 0, true, {\n                                        fileName: \"/Users/moeodeh/Desktop/CampFindr/src/components/resourceDetails/resource-details.tsx\",\n                                        lineNumber: 32,\n                                        columnNumber: 17\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                            className: \"text-text-primary text-base font-normal\",\n                                            children: formattedDescription\n                                        }, void 0, false, {\n                                            fileName: \"/Users/moeodeh/Desktop/CampFindr/src/components/resourceDetails/resource-details.tsx\",\n                                            lineNumber: 46,\n                                            columnNumber: 19\n                                        }, this)\n                                    }, void 0, false, {\n                                        fileName: \"/Users/moeodeh/Desktop/CampFindr/src/components/resourceDetails/resource-details.tsx\",\n                                        lineNumber: 45,\n                                        columnNumber: 17\n                                    }, this)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/moeodeh/Desktop/CampFindr/src/components/resourceDetails/resource-details.tsx\",\n                                lineNumber: 31,\n                                columnNumber: 15\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_spacer_horizontal_spacer__WEBPACK_IMPORTED_MODULE_4__.HorizontalSpacer, {}, void 0, false, {\n                                fileName: \"/Users/moeodeh/Desktop/CampFindr/src/components/resourceDetails/resource-details.tsx\",\n                                lineNumber: 51,\n                                columnNumber: 15\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"flex flex-col w-full\",\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                        className: \"text-text-primary text-xl font-semibold\",\n                                        children: \"Locations\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/moeodeh/Desktop/CampFindr/src/components/resourceDetails/resource-details.tsx\",\n                                        lineNumber: 53,\n                                        columnNumber: 17\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(LocationCard, {}, void 0, false, {\n                                        fileName: \"/Users/moeodeh/Desktop/CampFindr/src/components/resourceDetails/resource-details.tsx\",\n                                        lineNumber: 56,\n                                        columnNumber: 17\n                                    }, this)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/moeodeh/Desktop/CampFindr/src/components/resourceDetails/resource-details.tsx\",\n                                lineNumber: 52,\n                                columnNumber: 15\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/moeodeh/Desktop/CampFindr/src/components/resourceDetails/resource-details.tsx\",\n                        lineNumber: 30,\n                        columnNumber: 13\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_spacer_vertical_spacer__WEBPACK_IMPORTED_MODULE_2__.VerticalSpacer, {}, void 0, false, {\n                        fileName: \"/Users/moeodeh/Desktop/CampFindr/src/components/resourceDetails/resource-details.tsx\",\n                        lineNumber: 59,\n                        columnNumber: 13\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"flex h-full bg-blue-500 w-1/3\"\n                    }, void 0, false, {\n                        fileName: \"/Users/moeodeh/Desktop/CampFindr/src/components/resourceDetails/resource-details.tsx\",\n                        lineNumber: 61,\n                        columnNumber: 13\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/moeodeh/Desktop/CampFindr/src/components/resourceDetails/resource-details.tsx\",\n                lineNumber: 29,\n                columnNumber: 11\n            }, this)\n        }, void 0, false, {\n            fileName: \"/Users/moeodeh/Desktop/CampFindr/src/components/resourceDetails/resource-details.tsx\",\n            lineNumber: 28,\n            columnNumber: 9\n        }, this);\n    });\n}\n_c = ResourceDetails;\nconst LocationCard = ()=>{\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"h-8 w-full px-4 bg-black\"\n    }, void 0, false, {\n        fileName: \"/Users/moeodeh/Desktop/CampFindr/src/components/resourceDetails/resource-details.tsx\",\n        lineNumber: 73,\n        columnNumber: 5\n    }, undefined);\n};\n_c1 = LocationCard;\nvar _c, _c1;\n$RefreshReg$(_c, \"ResourceDetails\");\n$RefreshReg$(_c1, \"LocationCard\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9yZXNvdXJjZURldGFpbHMvcmVzb3VyY2UtZGV0YWlscy50c3guanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7QUFDMkQ7QUFDQTtBQUM1QjtBQUNnQztBQUNsQjtBQU05QixTQUFTSyxnQkFBZ0JDLEtBQTJCLEVBQUU7SUFDbkUsTUFBTSxFQUFFQyx3QkFBdUIsRUFBRSxHQUFHRDtJQUVwQ0UsUUFBUUMsR0FBRyxDQUFDRjtJQUNaLE1BQU1HLFdBQ0o7SUFFRixPQUFPViwrREFBVUEsQ0FBQ08seUJBQ2hCLElBQU0sSUFBSSxFQUNWLElBQU0sSUFBSSxFQUNWLENBQUNJLGtCQUFvQjtRQUNuQixNQUFNQyx1QkFBdUJSLDBEQUFrQkEsQ0FDN0NPLGdCQUFnQkUsV0FBVztRQUc3QixxQkFDRSw4REFBQ0M7WUFBSUMsV0FBVTtzQkFDYiw0RUFBQ0Q7Z0JBQUlDLFdBQVU7O2tDQUNiLDhEQUFDRDt3QkFBSUMsV0FBVTs7MENBQ2IsOERBQUNEO2dDQUFJQyxXQUFVOztrREFDYiw4REFBQ0Q7d0NBQUlDLFdBQVU7OzBEQUNiLDhEQUFDYixtREFBS0E7Z0RBQ0pjLEtBQUtOO2dEQUNMTyxLQUFJO2dEQUNKQyxPQUFPO2dEQUNQQyxRQUFRO2dEQUNSSixXQUFVOzs7Ozs7MERBRVosOERBQUNLO2dEQUFFTCxXQUFVOzBEQUNWSixnQkFBZ0JVLFFBQVE7Ozs7Ozs7Ozs7OztrREFJN0IsOERBQUNQO2tEQUNDLDRFQUFDTTs0Q0FBRUwsV0FBVTtzREFDVkg7Ozs7Ozs7Ozs7Ozs7Ozs7OzBDQUlQLDhEQUFDVCx1RUFBZ0JBOzs7OzswQ0FDakIsOERBQUNXO2dDQUFJQyxXQUFVOztrREFDYiw4REFBQ0s7d0NBQUVMLFdBQVU7a0RBQTBDOzs7Ozs7a0RBR3ZELDhEQUFDTzs7Ozs7Ozs7Ozs7Ozs7Ozs7a0NBR0wsOERBQUNyQixtRUFBY0E7Ozs7O2tDQUVmLDhEQUFDYTt3QkFBSUMsV0FBVTs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFJdkI7QUFFSixDQUFDO0tBdkR1QlY7QUEwRHhCLE1BQU1pQixlQUFlLElBQU07SUFFekIscUJBQ0UsOERBQUNSO1FBQUlDLFdBQVU7Ozs7OztBQUtuQjtNQVJNTyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvY29tcG9uZW50cy9yZXNvdXJjZURldGFpbHMvcmVzb3VyY2UtZGV0YWlscy50c3g/MTdhOCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXNvdXJjZUVudHJ5IH0gZnJvbSBcIkBwYWNrYWdlcy90eXBlc1wiO1xuaW1wb3J0IHsgTG9hZGFibGUsIG9uTG9hZGFibGUgfSBmcm9tIFwic3JjL2hvb2tzL2FwaS9xdWVyeVwiO1xuaW1wb3J0IHsgVmVydGljYWxTcGFjZXIgfSBmcm9tIFwiLi4vc3BhY2VyL3ZlcnRpY2FsLXNwYWNlclwiO1xuaW1wb3J0IEltYWdlIGZyb20gXCJuZXh0L2ltYWdlXCI7XG5pbXBvcnQgeyBIb3Jpem9udGFsU3BhY2VyIH0gZnJvbSBcIi4uL3NwYWNlci9ob3Jpem9udGFsLXNwYWNlclwiO1xuaW1wb3J0IHsgZ2V0V2l0aG91dEh0bWxUYWdzIH0gZnJvbSBcIi4vdXRpbHNcIjtcblxuaW50ZXJmYWNlIFJlc291cmNlRGV0YWlsc1Byb3BzIHtcbiAgcmVzb3VyY2VEZXRhaWxzTG9hZGFibGU6IExvYWRhYmxlPFJlc291cmNlRW50cnk+O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBSZXNvdXJjZURldGFpbHMocHJvcHM6IFJlc291cmNlRGV0YWlsc1Byb3BzKSB7XG4gIGNvbnN0IHsgcmVzb3VyY2VEZXRhaWxzTG9hZGFibGUgfSA9IHByb3BzO1xuXG4gIGNvbnNvbGUubG9nKHJlc291cmNlRGV0YWlsc0xvYWRhYmxlKTtcbiAgY29uc3QgaW1hZ2VVcmwgPVxuICAgIFwiaHR0cHM6Ly9yZXNlcnZhdGlvbnMub250YXJpb3BhcmtzLmNhL2ltYWdlcy81YjE5NmE2ZS1hMzI1LTQwMGEtYjIyOS05YmQ5NTYyYzQzNzgucG5nXCI7XG5cbiAgcmV0dXJuIG9uTG9hZGFibGUocmVzb3VyY2VEZXRhaWxzTG9hZGFibGUpKFxuICAgICgpID0+IG51bGwsXG4gICAgKCkgPT4gbnVsbCxcbiAgICAocmVzb3VyY2VEZXRhaWxzKSA9PiB7XG4gICAgICBjb25zdCBmb3JtYXR0ZWREZXNjcmlwdGlvbiA9IGdldFdpdGhvdXRIdG1sVGFncyhcbiAgICAgICAgcmVzb3VyY2VEZXRhaWxzLmRlc2NyaXB0aW9uXG4gICAgICApO1xuXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaC1mdWxsIHctZnVsbFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXJvdyBqdXN0aWZ5LWJldHdlZW4gaC1mdWxsIHctZnVsbFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGgtZnVsbCB3LTEvMiBwLTggc3BhY2UteS04XCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBzcGFjZS15LTQgdy1mdWxsXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIHctZnVsbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgc3BhY2UteS0yXCI+XG4gICAgICAgICAgICAgICAgICA8SW1hZ2VcbiAgICAgICAgICAgICAgICAgICAgc3JjPXtpbWFnZVVybH1cbiAgICAgICAgICAgICAgICAgICAgYWx0PVwiRmFpbGVkIHRvIGxvYWRcIlxuICAgICAgICAgICAgICAgICAgICB3aWR0aD17MzM1fVxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ9ezE4Ny41fVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJyb3VuZGVkLXhsXCJcbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXRleHQtcHJpbWFyeSB0ZXh0LXhsIGZvbnQtc2VtaWJvbGRcIj5cbiAgICAgICAgICAgICAgICAgICAge3Jlc291cmNlRGV0YWlscy5mdWxsTmFtZX1cbiAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXRleHQtcHJpbWFyeSB0ZXh0LWJhc2UgZm9udC1ub3JtYWxcIj5cbiAgICAgICAgICAgICAgICAgICAge2Zvcm1hdHRlZERlc2NyaXB0aW9ufVxuICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPEhvcml6b250YWxTcGFjZXIgLz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIHctZnVsbFwiPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtdGV4dC1wcmltYXJ5IHRleHQteGwgZm9udC1zZW1pYm9sZFwiPlxuICAgICAgICAgICAgICAgICAgTG9jYXRpb25zXG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDxMb2NhdGlvbkNhcmQgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxWZXJ0aWNhbFNwYWNlciAvPlxuICAgICAgICAgICAgey8qIFRoaXMgaXMgd2hlcmUgdGhlIG1hcCB3aWxsIGdvICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGgtZnVsbCBiZy1ibHVlLTUwMCB3LTEvM1wiPjwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuICApO1xufVxuXG5cbmNvbnN0IExvY2F0aW9uQ2FyZCA9ICgpID0+IHtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiaC04IHctZnVsbCBweC00IGJnLWJsYWNrXCI+XG5cbiAgICA8L2Rpdj5cbiAgKVxuXG59XG4iXSwibmFtZXMiOlsib25Mb2FkYWJsZSIsIlZlcnRpY2FsU3BhY2VyIiwiSW1hZ2UiLCJIb3Jpem9udGFsU3BhY2VyIiwiZ2V0V2l0aG91dEh0bWxUYWdzIiwiUmVzb3VyY2VEZXRhaWxzIiwicHJvcHMiLCJyZXNvdXJjZURldGFpbHNMb2FkYWJsZSIsImNvbnNvbGUiLCJsb2ciLCJpbWFnZVVybCIsInJlc291cmNlRGV0YWlscyIsImZvcm1hdHRlZERlc2NyaXB0aW9uIiwiZGVzY3JpcHRpb24iLCJkaXYiLCJjbGFzc05hbWUiLCJzcmMiLCJhbHQiLCJ3aWR0aCIsImhlaWdodCIsInAiLCJmdWxsTmFtZSIsIkxvY2F0aW9uQ2FyZCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/components/resourceDetails/resource-details.tsx\n"));

/***/ })

});