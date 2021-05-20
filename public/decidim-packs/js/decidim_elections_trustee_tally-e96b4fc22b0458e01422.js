/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ "./node_modules/regenerator-runtime/runtime.js");


/***/ }),

/***/ "../../.asdf/installs/ruby/2.7.2/lib/ruby/gems/2.7.0/bundler/gems/decidim-d3b88afe90e5/decidim-elections/app/packs/entrypoints/decidim_elections_trustee_tally.js":
/*!************************************************************************************************************************************************************************!*\
  !*** ../../.asdf/installs/ruby/2.7.2/lib/ruby/gems/2.7.0/bundler/gems/decidim-d3b88afe90e5/decidim-elections/app/packs/entrypoints/decidim_elections_trustee_tally.js ***!
  \************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var src_decidim_elections_trustee_tally__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/decidim/elections/trustee/tally */ "../../.asdf/installs/ruby/2.7.2/lib/ruby/gems/2.7.0/bundler/gems/decidim-d3b88afe90e5/decidim-elections/app/packs/src/decidim/elections/trustee/tally.js");


/***/ }),

/***/ "../../.asdf/installs/ruby/2.7.2/lib/ruby/gems/2.7.0/bundler/gems/decidim-d3b88afe90e5/decidim-elections/app/packs/src/decidim/elections/trustee/tally.js":
/*!****************************************************************************************************************************************************************!*\
  !*** ../../.asdf/installs/ruby/2.7.2/lib/ruby/gems/2.7.0/bundler/gems/decidim-d3b88afe90e5/decidim-elections/app/packs/src/decidim/elections/trustee/tally.js ***!
  \****************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _codegram_decidim_bulletin_board__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @codegram/decidim-bulletin_board */ "./node_modules/@codegram/decidim-bulletin_board/src/index.js");
/* harmony import */ var _codegram_voting_schemes_dummy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @codegram/voting_schemes-dummy */ "./node_modules/@codegram/voting_schemes-dummy/src/index.js");
/* harmony import */ var _codegram_voting_schemes_electionguard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @codegram/voting_schemes-electionguard */ "./node_modules/@codegram/voting_schemes-electionguard/src/index.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}




$(function () {
  // UI Elements
  var $tally = $(".trustee-step");
  var $startButton = $tally.find(".start");

  var getStepRow = function getStepRow(step) {
    return $("#".concat(step.replace(".", "-")));
  };

  var $restoreModal = $("#show-restore-modal");
  var $restoreButton = $restoreModal.find(".upload-election-keys");
  var $backButton = $tally.find(".back");
  var TRUSTEE_AUTHORIZATION_EXPIRATION_TIME_IN_HOURS = 2; // Data

  var bulletinBoardClientParams = {
    apiEndpointUrl: $tally.data("apiEndpointUrl")
  };
  var electionUniqueId = "".concat($tally.data("authoritySlug"), ".").concat($tally.data("electionId"));
  var authorityPublicKeyJSON = JSON.stringify($tally.data("authorityPublicKey"));
  var schemeName = $tally.data("schemeName");
  var trusteeContext = {
    uniqueId: $tally.data("trusteeSlug"),
    publicKeyJSON: JSON.stringify($tally.data("trusteePublicKey"))
  };
  var trusteeIdentificationKeys = new _codegram_decidim_bulletin_board__WEBPACK_IMPORTED_MODULE_1__.IdentificationKeys(trusteeContext.uniqueId, trusteeContext.publicKeyJSON);
  var currentStep = null; // Use the correct trustee wrapper adapter

  var trusteeWrapperAdapter = null;

  if (schemeName === "dummy") {
    trusteeWrapperAdapter = new _codegram_voting_schemes_dummy__WEBPACK_IMPORTED_MODULE_2__.TrusteeWrapperAdapter({
      trusteeId: trusteeContext.uniqueId
    });
  } else if (schemeName === "electionguard") {
    trusteeWrapperAdapter = new _codegram_voting_schemes_electionguard__WEBPACK_IMPORTED_MODULE_3__.TrusteeWrapperAdapter({
      trusteeId: trusteeContext.uniqueId,
      workerUrl: "/assets/electionguard/webworker.js"
    });
  } else {
    throw new Error("Voting scheme ".concat(schemeName, " not supported."));
  } // Use the tally component and bind all UI events


  var component = new _codegram_decidim_bulletin_board__WEBPACK_IMPORTED_MODULE_1__.TallyComponent({
    authorityPublicKeyJSON: authorityPublicKeyJSON,
    trusteeUniqueId: trusteeContext.uniqueId,
    trusteeIdentificationKeys: trusteeIdentificationKeys,
    trusteeWrapperAdapter: trusteeWrapperAdapter
  });

  var bindComponentEvents = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return component.setupElection({
                bulletinBoardClientParams: bulletinBoardClientParams,
                electionUniqueId: electionUniqueId,
                authorizationExpirationTimestamp: Math.ceil(Number(new Date()) / 1000) + TRUSTEE_AUTHORIZATION_EXPIRATION_TIME_IN_HOURS * 3600
              });

            case 2:
              _context.next = 4;
              return component.bindEvents({
                onEvent: function onEvent(event) {
                  var messageIdentifier = _codegram_decidim_bulletin_board__WEBPACK_IMPORTED_MODULE_1__.MessageIdentifier.parse(event.message.messageId);

                  if (event.type === _codegram_decidim_bulletin_board__WEBPACK_IMPORTED_MODULE_1__.MESSAGE_RECEIVED) {
                    if (currentStep && currentStep !== messageIdentifier.typeSubtype) {
                      var $previousStep = getStepRow(currentStep);
                      $previousStep.attr("data-step-status", "completed");
                    }

                    currentStep = messageIdentifier.typeSubtype;
                    var $currentStep = getStepRow(currentStep);

                    if ($currentStep.data("step-status") !== "completed") {
                      $currentStep.attr("data-step-status", "processing");
                    }
                  }
                },
                onBindStartButton: function onBindStartButton(onEventTriggered) {
                  $startButton.on("click", onEventTriggered);
                },
                onStart: function onStart() {
                  $startButton.prop("disabled", true);
                },
                onComplete: function onComplete() {
                  var $allSteps = $(".step_status");
                  $allSteps.attr("data-step-status", "completed");
                  $startButton.addClass("hide");
                  $backButton.removeClass("hide");
                  $.ajax({
                    method: "PATCH",
                    url: $tally.data("updateElectionStatusUrl"),
                    contentType: "application/json",
                    data: JSON.stringify({
                      status: "tally"
                    }),
                    headers: {
                      "X-CSRF-Token": $("meta[name=csrf-token]").attr("content")
                    }
                  });
                },
                onTrusteeNeedsToBeRestored: function onTrusteeNeedsToBeRestored() {
                  $restoreModal.foundation("open");
                },
                onBindRestoreButton: function onBindRestoreButton(onEventTriggered) {
                  $restoreButton.on("change", ".restore-button-input", onEventTriggered);
                },
                onRestore: function onRestore() {
                  $restoreModal.foundation("close");
                }
              });

            case 4:
              $startButton.prop("disabled", false);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function bindComponentEvents() {
      return _ref.apply(this, arguments);
    };
  }();

  trusteeIdentificationKeys.present( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2(exists) {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!exists) {
                _context2.next = 3;
                break;
              }

              _context2.next = 3;
              return bindComponentEvents();

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }());
});

/***/ }),

/***/ "?b254":
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/***/ (function() {

/* (ignored) */

/***/ }),

/***/ "?8fcd":
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/***/ (function() {

/* (ignored) */

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
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					result = fn();
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	!function() {
/******/ 		__webpack_require__.hmd = function(module) {
/******/ 			module = Object.create(module);
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'exports', {
/******/ 				enumerable: true,
/******/ 				set: function() {
/******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 				}
/******/ 			});
/******/ 			return module;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	!function() {
/******/ 		__webpack_require__.nmd = function(module) {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"decidim_elections_trustee_tally": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) var result = runtime(__webpack_require__);
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkdecidim"] = self["webpackChunkdecidim"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_regenerator-runtime_runtime_js","vendors-node_modules_codegram_decidim-bulletin_board_src_index_js","vendors-node_modules_codegram_voting_schemes-dummy_src_index_js-node_modules_codegram_voting_-13cf33"], function() { return __webpack_require__("../../.asdf/installs/ruby/2.7.2/lib/ruby/gems/2.7.0/bundler/gems/decidim-d3b88afe90e5/decidim-elections/app/packs/entrypoints/decidim_elections_trustee_tally.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=decidim_elections_trustee_tally-e96b4fc22b0458e01422.js.map