"use strict";

let documentTitleCallback: (title: string) => string = undefined;
let defaultDocumentTitle = document.title;

angular.module("ui.router.title", ["ui.router"])
	.run(["$rootScope", "$timeout", "$transitions", "$injector", function(
		$rootScope: ng.IRootScopeService,
		$timeout: ng.ITimeoutService,
		$transitions,
		$injector
	) {
		
		$transitions.onStart({ }, function(trans) {
			trans.promise.finally(function() {
				var title = trans.injector().get('$title');
				$rootScope.$title = title;
				const documentTitle = documentTitleCallback ? $injector.invoke(documentTitleCallback) : title || defaultDocumentTitle;
				document.title = documentTitle;
			});
		});

	}]);

function getTitleValue(title) {
	return angular.isFunction(title) ? title() : title;
}
