/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../.asdf/installs/ruby/2.7.2/lib/ruby/gems/2.7.0/bundler/gems/decidim-d3b88afe90e5/decidim-admin/app/packs/src/decidim/admin/field_dependent_inputs.component.js":
/*!***************************************************************************************************************************************************************************!*\
  !*** ../../.asdf/installs/ruby/2.7.2/lib/ruby/gems/2.7.0/bundler/gems/decidim-d3b88afe90e5/decidim-admin/app/packs/src/decidim/admin/field_dependent_inputs.component.js ***!
  \***************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ createFieldDependentInputs; }
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
/* eslint-disable require-jsdoc */


var FieldDependentInputsComponent = /*#__PURE__*/function () {
  function FieldDependentInputsComponent() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, FieldDependentInputsComponent);

    this.controllerField = options.controllerField;
    this.wrapperSelector = options.wrapperSelector;
    this.dependentFieldsSelector = options.dependentFieldsSelector;
    this.dependentInputSelector = options.dependentInputSelector;
    this.enablingCondition = options.enablingCondition;

    this._bindEvent();

    this._run();
  }

  _createClass(FieldDependentInputsComponent, [{
    key: "_run",
    value: function _run() {
      var $controllerField = this.controllerField;
      var $dependentFields = $controllerField.parents(this.wrapperSelector).find(this.dependentFieldsSelector);
      var $dependentInputs = $dependentFields.find(this.dependentInputSelector);

      if (this.enablingCondition($controllerField)) {
        $dependentInputs.prop("disabled", false);
        $dependentFields.show();
      } else {
        $dependentInputs.prop("disabled", true);
        $dependentFields.hide();
      }
    }
  }, {
    key: "_bindEvent",
    value: function _bindEvent() {
      var _this = this;

      this.controllerField.on("change", function () {
        _this._run();
      });
    }
  }]);

  return FieldDependentInputsComponent;
}();

function createFieldDependentInputs(options) {
  return new FieldDependentInputsComponent(options);
}

/***/ }),

/***/ "../../.asdf/installs/ruby/2.7.2/lib/ruby/gems/2.7.0/bundler/gems/decidim-d3b88afe90e5/decidim-elections/app/packs/src/decidim/votings/admin/polling_officers_form.js":
/*!****************************************************************************************************************************************************************************!*\
  !*** ../../.asdf/installs/ruby/2.7.2/lib/ruby/gems/2.7.0/bundler/gems/decidim-d3b88afe90e5/decidim-elections/app/packs/src/decidim/votings/admin/polling_officers_form.js ***!
  \****************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var src_decidim_admin_field_dependent_inputs_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/decidim/admin/field_dependent_inputs.component */ "../../.asdf/installs/ruby/2.7.2/lib/ruby/gems/2.7.0/bundler/gems/decidim-d3b88afe90e5/decidim-admin/app/packs/src/decidim/admin/field_dependent_inputs.component.js");

$(function () {
  var $participantType = $("#polling_officer_existing_user");
  (0,src_decidim_admin_field_dependent_inputs_component__WEBPACK_IMPORTED_MODULE_0__.default)({
    controllerField: $participantType,
    wrapperSelector: ".user-fields",
    dependentFieldsSelector: ".user-fields--email",
    dependentInputSelector: "input",
    enablingCondition: function enablingCondition($field) {
      return $field.val() === "false";
    }
  });
  (0,src_decidim_admin_field_dependent_inputs_component__WEBPACK_IMPORTED_MODULE_0__.default)({
    controllerField: $participantType,
    wrapperSelector: ".user-fields",
    dependentFieldsSelector: ".user-fields--name",
    dependentInputSelector: "input",
    enablingCondition: function enablingCondition($field) {
      return $field.val() === "false";
    }
  });
  (0,src_decidim_admin_field_dependent_inputs_component__WEBPACK_IMPORTED_MODULE_0__.default)({
    controllerField: $participantType,
    wrapperSelector: ".user-fields",
    dependentFieldsSelector: ".user-fields--user-picker",
    dependentInputSelector: "input",
    enablingCondition: function enablingCondition($field) {
      return $field.val() === "true";
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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!************************************************************************************************************************************************************************************!*\
  !*** ../../.asdf/installs/ruby/2.7.2/lib/ruby/gems/2.7.0/bundler/gems/decidim-d3b88afe90e5/decidim-elections/app/packs/entrypoints/decidim_votings_admin_polling_officers_form.js ***!
  \************************************************************************************************************************************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var src_decidim_votings_admin_polling_officers_form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/decidim/votings/admin/polling_officers_form */ "../../.asdf/installs/ruby/2.7.2/lib/ruby/gems/2.7.0/bundler/gems/decidim-d3b88afe90e5/decidim-elections/app/packs/src/decidim/votings/admin/polling_officers_form.js");

}();
/******/ })()
;
//# sourceMappingURL=decidim_votings_admin_polling_officers_form-d58f1629dd799f5f984a.js.map