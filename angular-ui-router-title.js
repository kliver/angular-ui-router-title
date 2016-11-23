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
    .run(["$rootScope", "$timeout", "$transitions", "$injector", function ($rootScope, $timeout, $transitions, $injector) {
        $transitions.onStart({}, function (trans) {
            trans.promise.finally(function () {
                var title = trans.injector().get('$title');
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