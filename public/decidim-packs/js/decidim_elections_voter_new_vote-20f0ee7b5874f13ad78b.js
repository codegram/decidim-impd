/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ "./node_modules/regenerator-runtime/runtime.js");


/***/ }),

/***/ "../../.asdf/installs/ruby/2.7.2/lib/ruby/gems/2.7.0/bundler/gems/decidim-d3b88afe90e5/decidim-elections/app/packs/entrypoints/decidim_elections_voter_new-vote.js":
/*!*************************************************************************************************************************************************************************!*\
  !*** ../../.asdf/installs/ruby/2.7.2/lib/ruby/gems/2.7.0/bundler/gems/decidim-d3b88afe90e5/decidim-elections/app/packs/entrypoints/decidim_elections_voter_new-vote.js ***!
  \*************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var src_decidim_elections_voter_new_vote__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/decidim/elections/voter/new-vote */ "../../.asdf/installs/ruby/2.7.2/lib/ruby/gems/2.7.0/bundler/gems/decidim-d3b88afe90e5/decidim-elections/app/packs/src/decidim/elections/voter/new-vote.js");


/***/ }),

/***/ "../../.asdf/installs/ruby/2.7.2/lib/ruby/gems/2.7.0/bundler/gems/decidim-d3b88afe90e5/decidim-elections/app/packs/src/decidim/elections/voter/new-vote.js":
/*!*****************************************************************************************************************************************************************!*\
  !*** ../../.asdf/installs/ruby/2.7.2/lib/ruby/gems/2.7.0/bundler/gems/decidim-d3b88afe90e5/decidim-elections/app/packs/src/decidim/elections/voter/new-vote.js ***!
  \*****************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var src_decidim_elections_voter_vote_questions_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/decidim/elections/voter/vote_questions.component */ "../../.asdf/installs/ruby/2.7.2/lib/ruby/gems/2.7.0/bundler/gems/decidim-d3b88afe90e5/decidim-elections/app/packs/src/decidim/elections/voter/vote_questions.component.js");


function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

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
/* eslint-disable no-console */


 // The voting component might come from set-preview.js or setup-vote.js, it depends if it's a preview
// so in the view template we load the component and attach it to window

var setupVoteComponent = window.Decidim.setupVoteComponent;
$( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
  var $voteWrapper, $ballotHash, ballotStyleId, questionsComponent, voteComponent;
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // UI Elements
          $voteWrapper = $(".vote-wrapper");
          $ballotHash = $voteWrapper.find(".ballot-hash");
          ballotStyleId = $voteWrapper.data("ballotStyleId"); // Use the questions component

          questionsComponent = new src_decidim_elections_voter_vote_questions_component__WEBPACK_IMPORTED_MODULE_1__.default($voteWrapper);
          questionsComponent.init();
          $(document).on("on.zf.toggler", function () {
            // continue and back btn
            questionsComponent.init();
          }); // Get the vote component and bind it to all UI events

          voteComponent = setupVoteComponent($voteWrapper);
          _context.next = 9;
          return voteComponent.bindEvents({
            onBindEncryptButton: function onBindEncryptButton(onEventTriggered) {
              $(".button.confirm").on("click", onEventTriggered);
            },
            onStart: function onStart() {},
            onVoteEncryption: function onVoteEncryption(validVoteFn) {
              var getFormData = function getFormData(formData) {
                return formData.serializeArray().reduce(function (acc, _ref2) {
                  var name = _ref2.name,
                      value = _ref2.value;

                  if (!acc[name]) {
                    acc[name] = [];
                  }

                  acc[name] = [].concat(_toConsumableArray(acc[name]), ["".concat(name, "_").concat(value)]);
                  return acc;
                }, {});
              };

              var formData = getFormData($voteWrapper.find(".answer_input"));
              validVoteFn(formData, ballotStyleId);
            },
            castOrAuditBallot: function castOrAuditBallot(_ref3) {
              var encryptedData = _ref3.encryptedData,
                  encryptedDataHash = _ref3.encryptedDataHash;
              $voteWrapper.find("#encrypting").addClass("hide");
              $ballotHash.text(encryptedDataHash);
              $voteWrapper.find("#ballot_decision").removeClass("hide");
              var $form = $("form.new_vote");
              $("#vote_encrypted_data", $form).val(encryptedData);
              $("#vote_encrypted_data_hash", $form).val(encryptedDataHash);
            },
            onBindAuditBallotButton: function onBindAuditBallotButton(onEventTriggered) {
              $(".audit_ballot").on("click", onEventTriggered);
            },
            onBindCastBallotButton: function onBindCastBallotButton(onEventTriggered) {
              $(".cast_ballot").on("click", onEventTriggered);
            },
            onAuditBallot: function onAuditBallot(auditedData, auditedDataFileName) {
              var vote = JSON.stringify(auditedData);
              var link = document.createElement("a");
              $voteWrapper.find(".button.cast_ballot").addClass("hide");
              $voteWrapper.find(".button.back").removeClass("hide");
              questionsComponent.voteCasted = true;
              link.setAttribute("href", "data:text/plain;charset=utf-8,".concat(vote));
              link.setAttribute("download", auditedDataFileName);
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            },
            onAuditComplete: function onAuditComplete() {
              console.log("Audit completed");
            },
            onCastBallot: function onCastBallot() {
              questionsComponent.voteCasted = true;
              $(".cast_ballot").prop("disabled", true);
            },
            onCastComplete: function onCastComplete() {
              console.log("Cast completed");
            },
            onInvalid: function onInvalid() {
              console.log("Something went wrong.");
            }
          });

        case 9:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));

/***/ }),

/***/ "../../.asdf/installs/ruby/2.7.2/lib/ruby/gems/2.7.0/bundler/gems/decidim-d3b88afe90e5/decidim-elections/app/packs/src/decidim/elections/voter/vote_questions.component.js":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ../../.asdf/installs/ruby/2.7.2/lib/ruby/gems/2.7.0/bundler/gems/decidim-d3b88afe90e5/decidim-elections/app/packs/src/decidim/elections/voter/vote_questions.component.js ***!
  \*********************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ VoteQuestionsComponent; }
/* harmony export */ });
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
/**
 * Vote Questions component.
 */


var VoteQuestionsComponent = /*#__PURE__*/function () {
  function VoteQuestionsComponent($voteWrapper) {
    var _this = this;

    _classCallCheck(this, VoteQuestionsComponent);

    this.$voteWrapper = $voteWrapper;
    this.$continueButton = this.$voteWrapper.find("a.focus__next");
    this.$confirmButton = this.$voteWrapper.find("a.focus__next.confirm");
    this.$continueSpan = this.$voteWrapper.find("span.disabled-continue");
    this.$currentStep = "";
    this.$currentStepMaxSelection = "";
    this.$answerCounter = 0;
    this.voteCasted = false;

    window.onbeforeunload = function () {
      if (_this.voteCasted) {
        return null;
      }

      return "";
    };
  }

  _createClass(VoteQuestionsComponent, [{
    key: "init",
    value: function init() {
      this.setCurrentStep();
      this.toggleContinueButton();
      this.$confirmButton.addClass("show").removeClass("hide");
      $(".evote__counter-min").text(this.$answerCounter);
      this.answerCounter();
      this.disableCheckbox();
    }
  }, {
    key: "setCurrentStep",
    value: function setCurrentStep() {
      this.$currentStep = this.$voteWrapper.find(".focus__step:visible");
      this.setSelections();
      this.onSelectionChange();
    }
  }, {
    key: "toggleContinueButton",
    value: function toggleContinueButton() {
      if (this.checkAnswers()) {
        // next step enabled
        this.$continueButton.addClass("show").removeClass("hide");
        this.$continueSpan.addClass("hide").removeClass("show");
      } else {
        // next step disabled
        this.$continueButton.addClass("hide").removeClass("show");
        this.$continueSpan.addClass("show").removeClass("hide");
      }
    } // check if answers are correctly checked

  }, {
    key: "checkAnswers",
    value: function checkAnswers() {
      var currentAnswersChecked = $("#".concat(this.$currentStep.attr("id"), " .answer_input:checked")).length;
      var notaAnswerChecked = $("#".concat(this.$currentStep.attr("id"), " .nota_input:checked")).length;
      return (currentAnswersChecked >= 1 || notaAnswerChecked > 0) && currentAnswersChecked <= this.$currentStepMaxSelection;
    }
  }, {
    key: "answerCounter",
    value: function answerCounter() {
      var checked = $("#".concat(this.$currentStep.attr("id"), " .answer_input:checked")).length;
      $(".evote__counter-min").text(checked);
    } // disable checkboxes if NOTA option is selected

  }, {
    key: "disableCheckbox",
    value: function disableCheckbox() {
      var _this2 = this;

      $("[data-disabled-by]").on("click", function (event) {
        if ($(event.target).attr("aria-disabled") || $(event.target).hasClass("is-disabled")) {
          event.preventDefault();
        }
      });
      $("[data-disable-check]").on("change", function (event) {
        var checkId = $(event.target).attr("id");
        var checkStatus = event.target.checked;

        _this2.$currentStep.find("[data-disabled-by='#".concat(checkId, "']")).each(function (_index, element) {
          if (checkStatus) {
            $(element).addClass("is-disabled");
            $(element).find("input[type=checkbox]").prop("checked", false);
            $(element).find("input[type=checkbox]").attr("aria-disabled", "");
          } else {
            $(element).removeClass("is-disabled");
            $(element).find("input[type=checkbox]").removeAttr("aria-disabled");
          }
        });
      });
    }
  }, {
    key: "setSelections",
    value: function setSelections() {
      this.$currentStepMaxSelection = this.$currentStep.find(".evote__options").data("max-selection");
    }
  }, {
    key: "onSelectionChange",
    value: function onSelectionChange() {
      var _this3 = this;

      var $voteOptions = this.$currentStep.find(".evote__options");
      $voteOptions.on("change", function () {
        _this3.toggleContinueButton();

        _this3.toggleConfirmAnswers();

        _this3.answerCounter();
      });
    } // receive confirmed answers

  }, {
    key: "toggleConfirmAnswers",
    value: function toggleConfirmAnswers() {
      $(".answer_input:checked").each(function (_index, element) {
        var confirmedAnswer = $(".evote__confirm").find("#".concat(element.value));
        $(confirmedAnswer).removeClass("hide");
      });
      $(".answer_input").not(":checked").each(function (_index, element) {
        var confirmedAnswer = $(".evote__confirm").find("#".concat(element.value));
        $(confirmedAnswer).addClass("hide");
      });
      $(".nota_input:checked").each(function (_index, element) {
        var confirmedAnswer = $(".evote__confirm").find(".".concat(element.value));
        $(confirmedAnswer).removeClass("hide");
      });
      $(".nota_input").not(":checked").each(function (_index, element) {
        var confirmedAnswer = $(".evote__confirm").find(".".concat(element.value));
        $(confirmedAnswer).addClass("hide");
      });
    }
  }]);

  return VoteQuestionsComponent;
}();



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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"decidim_elections_voter_new_vote": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_regenerator-runtime_runtime_js"], function() { return __webpack_require__("../../.asdf/installs/ruby/2.7.2/lib/ruby/gems/2.7.0/bundler/gems/decidim-d3b88afe90e5/decidim-elections/app/packs/entrypoints/decidim_elections_voter_new-vote.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=decidim_elections_voter_new_vote-20f0ee7b5874f13ad78b.js.map