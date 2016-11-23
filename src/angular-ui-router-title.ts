"use strict";

let documentTitleCallback: (title: string) => string = undefined;
let defaultDocumentTitle = document.title;

angular.module("ui.router.title", ["ui.router"])
	.run(["$rootScope", "$timeout", "$title", "$injector", function(
		$rootScope: ng.IRootScopeService,
		$timeout: ng.ITimeoutService,
		$title: ng.ui.ITitleService,
		$injector
	) {

		$rootScope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams, options, $transition) {
			var title = $transition.getResolvable('$title').data;
			$timeout(function() {
				$rootScope.$title = title;
				const documentTitle = documentTitleCallback ? $injector.invoke(documentTitleCallback) : title || defaultDocumentTitle;
				document.title = documentTitle;
			});

			$rootScope.$breadcrumbs = $title.breadCrumbs();
		});

	}]);

function getTitleValue(title) {
	return angular.isFunction(title) ? title() : title;
}
