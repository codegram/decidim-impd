/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../../.asdf/installs/ruby/2.7.2/lib/ruby/gems/2.7.0/bundler/gems/decidim-d3b88afe90e5/decidim-elections/app/packs/src/decidim/votings/polling_officer_zone/new-closure.js":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ../../.asdf/installs/ruby/2.7.2/lib/ruby/gems/2.7.0/bundler/gems/decidim-d3b88afe90e5/decidim-elections/app/packs/src/decidim/votings/polling_officer_zone/new-closure.js ***!
  \*********************************************************************************************************************************************************************************/
/***/ (function() {

$(function () {
  var $submitBtn = $("#submit-verify-votes");
  var $modalBtn = $("#btn-modal-closure-count-error");
  var $totalBallotsInput = $("#envelopes_result_total_ballots_count");
  var $electionVotesInput = $("#envelopes_result_election_votes_count");

  var checkValues = function checkValues() {
    var totalBallotsInputValue = parseInt($totalBallotsInput.val(), 10);
    var electionVotesInputValue = parseInt($electionVotesInput.val(), 10);

    if (totalBallotsInputValue === electionVotesInputValue) {
      $submitBtn.removeClass("disabled hide");
      $modalBtn.addClass("hide");
    } else {
      $submitBtn.addClass("hide");
      $modalBtn.removeClass("hide");
    }
  };

  $totalBallotsInput.on("blur", checkValues);
  $("#submit-verify-votes").addClass("disabled");
  $totalBallotsInput.on("keyup", function () {
    $("#modal-total-ballots-value").html(parseInt($totalBallotsInput.val(), 10));
  });
  $("#envelopes_result_polling_officer_notes").on("keyup", function () {
    var modalPollingOfficerNotes = $("#envelopes_result_polling_officer_notes").val();
    $("#btn-submit-from-modal").toggleClass("disabled", !modalPollingOfficerNotes.trim());
  });
});

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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!************************************************************************************************************************************************************************************************!*\
  !*** ../../.asdf/installs/ruby/2.7.2/lib/ruby/gems/2.7.0/bundler/gems/decidim-d3b88afe90e5/decidim-elections/app/packs/entrypoints/decidim_votings_voting_polling_officer_zone-new-closure.js ***!
  \************************************************************************************************************************************************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var src_decidim_votings_polling_officer_zone_new_closure__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/decidim/votings/polling_officer_zone/new-closure */ "../../.asdf/installs/ruby/2.7.2/lib/ruby/gems/2.7.0/bundler/gems/decidim-d3b88afe90e5/decidim-elections/app/packs/src/decidim/votings/polling_officer_zone/new-closure.js");
/* harmony import */ var src_decidim_votings_polling_officer_zone_new_closure__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(src_decidim_votings_polling_officer_zone_new_closure__WEBPACK_IMPORTED_MODULE_0__);

}();
/******/ })()
;
//# sourceMappingURL=decidim_votings_voting_polling_officer_zone_new_closure-80572e8ff35fcb17b8c2.js.map