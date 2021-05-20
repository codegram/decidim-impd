/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../../.asdf/installs/ruby/2.7.2/lib/ruby/gems/2.7.0/bundler/gems/decidim-d3b88afe90e5/decidim-elections/app/packs/src/decidim/votings/admin/polling_officers_picker.js":
/*!******************************************************************************************************************************************************************************!*\
  !*** ../../.asdf/installs/ruby/2.7.2/lib/ruby/gems/2.7.0/bundler/gems/decidim-d3b88afe90e5/decidim-elections/app/packs/src/decidim/votings/admin/polling_officers_picker.js ***!
  \******************************************************************************************************************************************************************************/
/***/ (function() {

$(function () {
  var $content = $(".picker-content"),
      pickerMore = $content.data("picker-more"),
      pickerPath = $content.data("picker-path"),
      toggleNoPollingOfficers = function toggleNoPollingOfficers() {
    var showNoPollingOfficers = $("#polling_officers_list li:visible").length === 0;
    $("#no_polling_officers").toggle(showNoPollingOfficers);
  };

  var jqxhr = null;
  toggleNoPollingOfficers();
  $(".data_picker-modal-content").on("change keyup", "#polling_officers_filter", function (event) {
    var filter = event.target.value.toLowerCase();

    if (pickerMore) {
      if (jqxhr !== null) {
        jqxhr.abort();
      }

      $content.html("<div class='loading-spinner'></div>");
      jqxhr = $.get("".concat(pickerPath, "?q=").concat(filter), function (data) {
        $content.html(data);
        jqxhr = null;
        toggleNoPollingOfficers();
      });
    } else {
      $("#polling_officers_list li").each(function (index, li) {
        $(li).toggle(li.textContent.toLowerCase().includes(filter));
      });
      toggleNoPollingOfficers();
    }
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
/*!**************************************************************************************************************************************************************************************!*\
  !*** ../../.asdf/installs/ruby/2.7.2/lib/ruby/gems/2.7.0/bundler/gems/decidim-d3b88afe90e5/decidim-elections/app/packs/entrypoints/decidim_votings_admin_polling_officers_picker.js ***!
  \**************************************************************************************************************************************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var src_decidim_votings_admin_polling_officers_picker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/decidim/votings/admin/polling_officers_picker */ "../../.asdf/installs/ruby/2.7.2/lib/ruby/gems/2.7.0/bundler/gems/decidim-d3b88afe90e5/decidim-elections/app/packs/src/decidim/votings/admin/polling_officers_picker.js");
/* harmony import */ var src_decidim_votings_admin_polling_officers_picker__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(src_decidim_votings_admin_polling_officers_picker__WEBPACK_IMPORTED_MODULE_0__);

}();
/******/ })()
;
//# sourceMappingURL=decidim_votings_admin_polling_officers_picker-693770aec636c73e1e43.js.map