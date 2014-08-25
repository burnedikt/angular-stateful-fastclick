
(function(window, angular, undefined) {'use strict';
// define ngTouch module
/* global -ngTouch */
var ngTouch = angular.module('ngTouch', []);

/**
 * @ngdoc directive
 * @name ngClick
 *
 * @description
 * A more powerful replacement for the default ngClick designed to be used on touchscreen
 * devices. Most mobile browsers wait about 300ms after a tap-and-release before sending
 * the click event. This version handles them immediately, and then prevents the
 * following click event from propagating.
 *
 * Requires the {@link ngTouch `ngTouch`} module to be installed.
 *
 * This directive can fall back to using an ordinary click event, and so works on desktop
 * browsers as well as mobile.
 *
 * This directive also sets the CSS class `ng-click-active` while the element is being held
 * down (by a mouse click or touch) so you can restyle the depressed element if you wish.
 *
 * @element ANY
 * @param {expression} ngClick {@link guide/expression Expression} to evaluate
 * upon tap. (Event object is available as `$event`)
 *
 * @example
    <example module="ngClickExample" deps="angular-touch.js">
      <file name="index.html">
        <button ng-click="count = count + 1" ng-init="count=0">
          Increment
        </button>
        count: {{ count }}
      </file>
      <file name="script.js">
        angular.module('ngClickExample', ['ngTouch']);
      </file>
    </example>
 */
ngTouch.config(['$provide', function($provide) {
  $provide.decorator('ngClickDirective', ['$delegate', function($delegate) {
    // drop the default ngClick directive
    $delegate.shift();
    return $delegate;
  }]);
}]);

// redefine the ngClick directive
ngTouch.directive('ngClick', ['$parse',
  function($parse) {
    // Actual linking function.
    return function(scope, element, attr) {
      // parse the function to be executed on click
      var fn = $parse(attr.ngClick);
      // attach the modified fastclick handler to this element
      FastClick.attach(element.context);
      // listen to the click events (fired by Fastclick or per browser default)
      // and execute the action accordingly
      element.on('click', function(event) {
        scope.$apply(function() {
          fn(scope, {$event:event});
        });
      });
    };
  }]
);

})(window, window.angular);
