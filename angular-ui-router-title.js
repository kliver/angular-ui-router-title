/**
 * AngularJS module for updating browser title/history based on the current ui-router state.
 *
 * @link https://github.com/nonplus/angular-ui-router-title
 *
 * @license angular-ui-router-title v0.1.0
 * (c) Copyright Stepan Riha <github@nonplus.net>
 * License MIT
 */

(function(angular) {

"use strict";
var documentTitleCallback = undefined;
var defaultDocumentTitle = document.title;
angular.module("ui.router.title", ["ui.router"])
    .run(["$rootScope", "$timeout", "$injector", function ($rootScope, $timeout, $injector) {
        $rootScope.$on("$stateChangeSuccess", function (event, toState, toParams, fromState, fromParams, options, $transition) {
            var title = $transition.getResolvable('$title').data;
            $timeout(function () {
                $rootScope.$title = title;
                var documentTitle = documentTitleCallback ? $injector.invoke(documentTitleCallback) : title || defaultDocumentTitle;
                document.title = documentTitle;
            });
        });
    }]);
function getTitleValue(title) {
    return angular.isFunction(title) ? title() : title;
}


})(window.angular);