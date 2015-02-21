(function () {
	'use strict';
	angular.module('web', ['ngRoute', 'web.templates', 'web.controllers']);
	function config ($locationProvider, $routeProvider) {
		$locationProvider.html5Mode({
			enabled: true,
			requireBase: false
		});
		$routeProvider
			.when('/', {
				templateUrl: 'views/index.tpl.html',
				controller: 'IndexCtrl',
				controllerAs: 'index'
			})
			.when('/projects', {
				templateUrl: 'views/projects.tpl.html',
				controller: 'ProjectsCtrl',
				controllerAs: 'projects'
			})
			.when('/services', {
				templateUrl: 'views/services.tpl.html',
				controller: 'ServicesCtrl',
				controllerAs: 'services'
			})
			.when('/about', {
				templateUrl: 'views/about.tpl.html',
				controller: 'AboutCtrl',
				controllerAs: 'about'
			})
			.when('/contact', {
				templateUrl: 'views/contact.tpl.html',
				controller: 'ContactCtrl',
				controllerAs: 'contact'
			});
	}

	angular
		.module('web')
		.config(config);
})();
