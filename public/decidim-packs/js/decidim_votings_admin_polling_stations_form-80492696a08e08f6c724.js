/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../.asdf/installs/ruby/2.7.2/lib/ruby/gems/2.7.0/bundler/gems/decidim-d3b88afe90e5/decidim-core/app/packs/src/decidim/geocoding/attach_input.js":
/*!**********************************************************************************************************************************************************!*\
  !*** ../../.asdf/installs/ruby/2.7.2/lib/ruby/gems/2.7.0/bundler/gems/decidim-d3b88afe90e5/decidim-core/app/packs/src/decidim/geocoding/attach_input.js ***!
  \**********************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ attachGeocoding; }
/* harmony export */ });
var getCoordinateInputName = function getCoordinateInputName(coordinate, $input, options) {
  var key = "".concat(coordinate, "Name");

  if (options[key]) {
    return options[key];
  }

  var inputName = $input.attr("name");
  var subNameMatch = /\[[^\]]+\]$/;

  if (inputName.match(subNameMatch)) {
    return inputName.replace(subNameMatch, "[".concat(coordinate, "]"));
  }

  return coordinate;
};
/**
 * You can use this method to "attach" front-end geocoding to any forms in the
 * front-end which have address fields with geocoding autocompletion
 * functionality already applied to them.
 *
 * To learn more about the front-end geocoding autocompletion, please refer to
 * the maps documentation at: /docs/customization/maps.md.
 *
 * When the geocoding autocompletion finishes, most of the times, its results
 * will also contain the geocoordinate information for the selected address.
 * This method allows you to pass these coordinates (latitude and longitude)
 * to the same front-end form where the geocoding autocompletion address field
 * is located at (which is the $input you pass to this method). The latitude
 * and longitude coordinates will be added or "attached" to the form once the
 * user selects one of the suggested addresses.
 *
 * Therefore, if there was the following geocoding autocompletion field at
 * your form:
 *   <input
 *     id="record_address"
 *     type="text"
 *     name="record[address]"
 *     data-decidim-geocoding="{&quot;url&quot;:&quot;https://photon.example.org/api/&quot;}"
 *   />
 *
 * You would then "attach" the geocoding result coordinates to the same form
 * where this input is at as follows:
 *   $(document).ready(function() {
 *     window.Decidim.attachGeocoding($("#record_address"));
 *   });
 *
 * Now, after the user selects one of the suggested geocoding autocompletion
 * addresses and the geocoding autocompletion API provides the coordinates in
 * the results, you would have the following fields automatically generated
 * to your form:
 *   <input id="record_address" type="text" name="record[address]" value="Selected address, 00210, City" ... />
 *   <input id="record_latitude" type="hidden" name="record[latitude]" value="1.123" />
 *   <input id="record_longitude" type="hidden" name="record[longitude]" value="2.234" />
 *
 * If you would not do the attachment, these hidden longitude and latitude
 * fields would not be generated and the geocoding would have to happen at the
 * server-side when the form is submitted. The problem with that approach
 * would be that the server-side address geocoding could potentially result in
 * different coordinates than what the user actually selected in the front-end
 * because the autocompletion API can return different coordinates than the
 * geocoding API. Another reason is to avoid unnecessary calls to the
 * geocoding API as the front-end geocoding suggestion already returned the
 * coordinate values we need.
 *
 * @param {jQuery} $input The input jQuery element for the geocoded address
 *   field.
 * @param {Object} options (optional) Extra options if you want to customize
 *   the latitude and longitude element IDs or names from the default.
 * @returns {void}
 */


function attachGeocoding($input, options) {
  var attachOptions = $.extend({}, options);
  var inputIdParts = $input.attr("id").split("_");
  inputIdParts.pop();
  var idPrefix = "".concat(inputIdParts.join("_"));
  var config = $.extend({
    latitudeId: "".concat(idPrefix, "_latitude"),
    longitudeId: "".concat(idPrefix, "_longitude"),
    latitudeName: getCoordinateInputName("latitude", $input, attachOptions),
    longitudeName: getCoordinateInputName("longitude", $input, attachOptions)
  }, options);
  var geocoded = false;

  var createCoordinateFields = function createCoordinateFields() {
    var $latitude = $("#".concat(config.latitudeId));

    if ($latitude.length < 1) {
      $latitude = $("<input type=\"hidden\" name=\"".concat(config.latitudeName, "\" id=\"").concat(config.latitudeId, "\" />"));
      $input.after($latitude);
    }

    var $longitude = $("#".concat(config.longitudeId));

    if ($longitude.length < 1) {
      $longitude = $("<input type=\"hidden\" name=\"".concat(config.longitudeName, "\" id=\"").concat(config.longitudeId, "\" />"));
      $input.after($longitude);
    }
  };

  var clearCoordinateFields = function clearCoordinateFields() {
    if (geocoded) {
      return;
    }

    $("#".concat(config.latitudeId)).val("").removeAttr("value");
    $("#".concat(config.longitudeId)).val("").removeAttr("value");
  };

  var setCoordinates = function setCoordinates(coordinates) {
    createCoordinateFields();
    $("#".concat(config.latitudeId)).val(coordinates[0]).attr("value", coordinates[0]);
    $("#".concat(config.longitudeId)).val(coordinates[1]).attr("value", coordinates[1]);
  }; // When the user changes the value of the coordinate field without selecting
  // any of the geocoding autocomplete results, clear the current latitude and
  // longitude values to let the backend do the geocoding. Once a geocoding
  // autocomplete value has been selected, assume the user just wants to
  // refine the address formatting without changing the location point value.
  // If they want, they can still modify the point in the next step of the
  // proposal creation/editing.


  $input.on("change.decidim", function () {
    clearCoordinateFields();
  }); // When we receive the geocoding event on the field, update the coordinate
  // values.

  $input.on("geocoder-suggest-coordinates.decidim", function (_ev, coordinates) {
    setCoordinates(coordinates);
    geocoded = true;
  }); // Set the initial values if the field defines the coordinates

  var coordinates = "".concat($input.data("coordinates")).split(",").map(parseFloat);

  if (Array.isArray(coordinates) && coordinates.length === 2) {
    setCoordinates(coordinates);
  }
}

/***/ }),

/***/ "../../.asdf/installs/ruby/2.7.2/lib/ruby/gems/2.7.0/bundler/gems/decidim-d3b88afe90e5/decidim-elections/app/packs/src/decidim/votings/admin/polling_stations_form.js":
/*!****************************************************************************************************************************************************************************!*\
  !*** ../../.asdf/installs/ruby/2.7.2/lib/ruby/gems/2.7.0/bundler/gems/decidim-d3b88afe90e5/decidim-elections/app/packs/src/decidim/votings/admin/polling_stations_form.js ***!
  \****************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var src_decidim_geocoding_attach_input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/decidim/geocoding/attach_input */ "../../.asdf/installs/ruby/2.7.2/lib/ruby/gems/2.7.0/bundler/gems/decidim-d3b88afe90e5/decidim-core/app/packs/src/decidim/geocoding/attach_input.js");

$(function () {
  var $form = $(".edit_polling_station, .new_polling_station");
  (0,src_decidim_geocoding_attach_input__WEBPACK_IMPORTED_MODULE_0__.default)($form.find("#polling_station_address"));
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
  !*** ../../.asdf/installs/ruby/2.7.2/lib/ruby/gems/2.7.0/bundler/gems/decidim-d3b88afe90e5/decidim-elections/app/packs/entrypoints/decidim_votings_admin_polling_stations_form.js ***!
  \************************************************************************************************************************************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var src_decidim_votings_admin_polling_stations_form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/decidim/votings/admin/polling_stations_form */ "../../.asdf/installs/ruby/2.7.2/lib/ruby/gems/2.7.0/bundler/gems/decidim-d3b88afe90e5/decidim-elections/app/packs/src/decidim/votings/admin/polling_stations_form.js");

}();
/******/ })()
;
//# sourceMappingURL=decidim_votings_admin_polling_stations_form-80492696a08e08f6c724.js.map