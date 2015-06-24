
(function(window, angular, undefined) {'use strict';
// define ngTouch module
/* global -ngTouch */
var ngTouch = angular.module('ngTouch');

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
      // attach the modified fastclick handler to this element (needs the real domNode)
      var fastclickableElement = new StatefulFastclick(element[0]);
      // attach a specific class to the clickable element indicating that it is handled via fastclick
      element[0].classList.add('fastclickable');
      // listen to the click events (fired by Fastclick or per browser default)
      // and execute the action accordingly
      element.on('click', function(event) {
        scope.$apply(function() {
          fn(scope, {$event:event});
        });

        // support restore-after attribute, which resets the state of the active element
        // after the given timespan (in ms)
        if (angular.isDefined(attr.restoreAfter) && typeof fastclickableElement !== 'undefined') {
          var delay = parseInt(attr.restoreAfter);
          // execute the reset function after the given delay
          // make sure to bind the scope properly to the fastclickable elememnt (else IE9 executes the function in
          // the window' scope)
          window.setTimeout(fastclickableElement.resetState.bind(fastclickableElement), delay);
        }
      });

      // watch the attribute cancelTap's value for changes --> as soon as the attribute is set to true,
      // reset the elements state immediately
      if (angular.isDefined(attr.cancelTap)) {
        var unwatchCancelTap = scope.$watch(attr.cancelTap, function(newVal) {
          if (newVal && typeof fastclickableElement !== 'undefined') {
            fastclickableElement.resetState();
          }
        });
        // also make sure to remove the watcher when the scope is destroyed
        scope.$on('$destroy', function() {
          unwatchCancelTap();
        });
      }
    };
  }]
);

})(window, window.angular);
