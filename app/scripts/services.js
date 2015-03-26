(function () {
	'use strict';
	angular.module('web.services', ['ngResource']);
	function Project ($resource, BaseUrl) {
		return $resource(BaseUrl + '/projects/:postId',
			{ projectId: '@_id' });
	}
	function Comment ($resource, BaseUrl) {
		return $resource(BaseUrl + '/comments/:commentId',
			{ commentId: '@_id' });
	}
	function User ($resource, BaseUrl) {
		return $resource(BaseUrl + '/users/:userId',
			{ userId: '@_id' });
	}
	angular
		.module('web.services')
		.constant('BaseUrl', 'http://localhost:3000')
		.factory('Project', Project)
		.factory('Comment', Comment)
		.factory('User', User);
})();
