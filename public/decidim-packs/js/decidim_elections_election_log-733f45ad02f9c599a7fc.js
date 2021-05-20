/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ "./node_modules/regenerator-runtime/runtime.js");


/***/ }),

/***/ "../../.asdf/installs/ruby/2.7.2/lib/ruby/gems/2.7.0/bundler/gems/decidim-d3b88afe90e5/decidim-elections/app/packs/entrypoints/decidim_elections_election_log.js":
/*!***********************************************************************************************************************************************************************!*\
  !*** ../../.asdf/installs/ruby/2.7.2/lib/ruby/gems/2.7.0/bundler/gems/decidim-d3b88afe90e5/decidim-elections/app/packs/entrypoints/decidim_elections_election_log.js ***!
  \***********************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var src_decidim_elections_election_log__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/decidim/elections/election_log */ "../../.asdf/installs/ruby/2.7.2/lib/ruby/gems/2.7.0/bundler/gems/decidim-d3b88afe90e5/decidim-elections/app/packs/src/decidim/elections/election_log.js");


/***/ }),

/***/ "../../.asdf/installs/ruby/2.7.2/lib/ruby/gems/2.7.0/bundler/gems/decidim-d3b88afe90e5/decidim-elections/app/packs/src/decidim/elections/election_log.js":
/*!***************************************************************************************************************************************************************!*\
  !*** ../../.asdf/installs/ruby/2.7.2/lib/ruby/gems/2.7.0/bundler/gems/decidim-d3b88afe90e5/decidim-elections/app/packs/src/decidim/elections/election_log.js ***!
  \***************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _codegram_decidim_bulletin_board__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @codegram/decidim-bulletin_board */ "./node_modules/@codegram/decidim-bulletin_board/src/index.js");


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
/**
 * This file is responsible to get LogEntries
 * for an election for the election log.
 */



$( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
  var $electionLog, $createElectionStep, $keyCeremonyStep, $voteStep, $tallyStep, $resultStep, authorityPublicKeyJSON, bulletinBoardClient, electionUniqueId, parser, logEntries, setMessageTime, addChainedHash, getLogEntryByMessageId, createElectionLogEntry, startKeyCeremonyLogEntry, endKeyCeremonyLogEntry, startVoteLogEntry, endVoteLogEntry, startTallyLogEntry, endTallyLogEntry, resultsLogEntry;
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          // UI Elements
          $electionLog = $(".election-log");
          $createElectionStep = $electionLog.find("#create-election-step");
          $keyCeremonyStep = $electionLog.find("#key-ceremony-step");
          $voteStep = $electionLog.find("#vote-step");
          $tallyStep = $electionLog.find("#tally-step");
          $resultStep = $electionLog.find("#results-step"); // Data

          authorityPublicKeyJSON = JSON.stringify($electionLog.data("authorityPublicKey"));
          bulletinBoardClient = new _codegram_decidim_bulletin_board__WEBPACK_IMPORTED_MODULE_1__.Client({
            apiEndpointUrl: $electionLog.data("apiEndpointUrl")
          });
          electionUniqueId = "".concat($electionLog.data("authoritySlug"), ".").concat($electionLog.data("electionId"));
          parser = new _codegram_decidim_bulletin_board__WEBPACK_IMPORTED_MODULE_1__.MessageParser({
            authorityPublicKeyJSON: authorityPublicKeyJSON
          });
          _context2.next = 12;
          return bulletinBoardClient.getElectionLogEntries({
            electionUniqueId: electionUniqueId,
            types: ["create_election", "start_key_ceremony", "end_key_ceremony", "start_vote", "end_vote", "start_tally", "end_tally", "publish_results"]
          });

        case 12:
          logEntries = _context2.sent; // Functions to be used for each step
          // adds the `iat` of the message to the UI

          setMessageTime = /*#__PURE__*/function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee(logEntryStep, uiStep) {
              var parsedData, messageTime, year, time;
              return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      if (logEntryStep.signedData) {
                        _context.next = 3;
                        break;
                      }

                      uiStep.find(".time").html("");
                      return _context.abrupt("return");

                    case 3:
                      _context.next = 5;
                      return parser.parse(logEntryStep);

                    case 5:
                      parsedData = _context.sent;
                      messageTime = new Date(parsedData.decodedData.iat * 1000);
                      year = messageTime.toDateString();
                      time = messageTime.toLocaleTimeString();
                      uiStep.find(".time").html("".concat(year, " ").concat(time));

                    case 10:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee);
            }));

            return function setMessageTime(_x, _x2) {
              return _ref2.apply(this, arguments);
            };
          }(); // adds the chained Hash of the message to the UI


          addChainedHash = function addChainedHash(logEntryStep, uiStep) {
            uiStep.find(".card__footer--transparent").removeClass("hide");
            uiStep.find(".chained-hash").html(logEntryStep.chainedHash);
          }; // finds the logEntry for each step


          getLogEntryByMessageId = function getLogEntryByMessageId(step) {
            return logEntries.find(function (logEntry) {
              return logEntry.messageId.includes(step);
            });
          }; // CREATE ELECTION STEP


          createElectionLogEntry = getLogEntryByMessageId("create_election");

          if (!createElectionLogEntry) {
            _context2.next = 23;
            break;
          }

          $createElectionStep.find(".no-election-created").addClass("hide");
          $createElectionStep.find(".election-created").removeClass("hide");
          _context2.next = 22;
          return setMessageTime(createElectionLogEntry, $createElectionStep);

        case 22:
          addChainedHash(createElectionLogEntry, $createElectionStep);

        case 23:
          // KEY CEREMONY STEP
          startKeyCeremonyLogEntry = getLogEntryByMessageId("start_key_ceremony");
          endKeyCeremonyLogEntry = getLogEntryByMessageId("end_key_ceremony");

          if (!(startKeyCeremonyLogEntry && !endKeyCeremonyLogEntry)) {
            _context2.next = 34;
            break;
          }

          $keyCeremonyStep.find(".key-ceremony-not-started").addClass("hide");
          $keyCeremonyStep.find(".card__text").removeClass("hide");
          _context2.next = 30;
          return setMessageTime(startKeyCeremonyLogEntry, $keyCeremonyStep);

        case 30:
          $keyCeremonyStep.find(".key-ceremony-started").removeClass("hide");
          addChainedHash(startKeyCeremonyLogEntry, $keyCeremonyStep);
          _context2.next = 42;
          break;

        case 34:
          if (!endKeyCeremonyLogEntry) {
            _context2.next = 42;
            break;
          }

          $keyCeremonyStep.find(".key-ceremony-not-started").addClass("hide");
          $keyCeremonyStep.find(".card__text").removeClass("hide");
          _context2.next = 39;
          return setMessageTime(endKeyCeremonyLogEntry, $keyCeremonyStep);

        case 39:
          $keyCeremonyStep.find(".key-ceremony-started").addClass("hide");
          $keyCeremonyStep.find(".key-ceremony-completed").removeClass("hide");
          addChainedHash(endKeyCeremonyLogEntry, $keyCeremonyStep);

        case 42:
          // VOTING STEP
          startVoteLogEntry = getLogEntryByMessageId("start_vote");
          endVoteLogEntry = getLogEntryByMessageId("end_vote");

          if (!(startVoteLogEntry && !endVoteLogEntry)) {
            _context2.next = 53;
            break;
          }

          $voteStep.find(".vote-not-started").addClass("hide");
          $voteStep.find(".card__text").removeClass("hide");
          _context2.next = 49;
          return setMessageTime(startVoteLogEntry, $voteStep);

        case 49:
          $voteStep.find(".vote-started").removeClass("hide");
          addChainedHash(startVoteLogEntry, $voteStep);
          _context2.next = 61;
          break;

        case 53:
          if (!endVoteLogEntry) {
            _context2.next = 61;
            break;
          }

          $voteStep.find(".vote-not-started").addClass("hide");
          $voteStep.find(".card__text").removeClass("hide");
          _context2.next = 58;
          return setMessageTime(endVoteLogEntry, $voteStep);

        case 58:
          $voteStep.find(".vote-started").addClass("hide");
          $voteStep.find(".vote-completed").removeClass("hide");
          addChainedHash(endVoteLogEntry, $voteStep);

        case 61:
          // TALLY STEP
          startTallyLogEntry = getLogEntryByMessageId("start_tally");
          endTallyLogEntry = getLogEntryByMessageId("end_tally");

          if (!(startTallyLogEntry && !endTallyLogEntry)) {
            _context2.next = 72;
            break;
          }

          $tallyStep.find(".tally-not-started").addClass("hide");
          $tallyStep.find(".card__text").removeClass("hide");
          _context2.next = 68;
          return setMessageTime(startTallyLogEntry, $tallyStep);

        case 68:
          $tallyStep.find(".tally-started").removeClass("hide");
          addChainedHash(startTallyLogEntry, $tallyStep);
          _context2.next = 80;
          break;

        case 72:
          if (!endTallyLogEntry) {
            _context2.next = 80;
            break;
          }

          $tallyStep.find(".tally-not-started").addClass("hide");
          $tallyStep.find(".card__text").removeClass("hide");
          _context2.next = 77;
          return setMessageTime(endTallyLogEntry, $tallyStep);

        case 77:
          $tallyStep.find(".tally-started").addClass("hide");
          $tallyStep.find(".tally-completed").removeClass("hide");
          addChainedHash(endTallyLogEntry, $tallyStep);

        case 80:
          // RESULTS STEP
          resultsLogEntry = getLogEntryByMessageId("publish_results");

          if (!resultsLogEntry) {
            _context2.next = 88;
            break;
          }

          $resultStep.find(".results-not-published").addClass("hide");
          $resultStep.find(".card__text").removeClass("hide");
          _context2.next = 86;
          return setMessageTime(resultsLogEntry, $resultStep);

        case 86:
          $resultStep.find(".results-published").removeClass("hide");
          addChainedHash(resultsLogEntry, $resultStep);

        case 88:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2);
})));

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
/******/ 			"decidim_elections_election_log": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_regenerator-runtime_runtime_js","vendors-node_modules_codegram_decidim-bulletin_board_src_index_js"], function() { return __webpack_require__("../../.asdf/installs/ruby/2.7.2/lib/ruby/gems/2.7.0/bundler/gems/decidim-d3b88afe90e5/decidim-elections/app/packs/entrypoints/decidim_elections_election_log.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=decidim_elections_election_log-733f45ad02f9c599a7fc.js.map