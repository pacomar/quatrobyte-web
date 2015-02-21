(function () {
    'use strict';
    angular.module('web.controllers', ['web.services'])
    .controller('IndexCtrl', IndexCtrl)
    .controller('ProjectsCtrl', ProjectsCtrl)
    .controller('ServicesCtrl', ServicesCtrl)
    .controller('AboutCtrl', AboutCtrl)
    .controller('ContactCtrl', ContactCtrl)
    .controller('HeaderController', HeaderController);

    function IndexCtrl (Post) {
        this.posts = Post.query();
    }
    function ProjectsCtrl (Post) {
        this.posts = Post.query();
    }
    function ServicesCtrl (Post) {
        this.posts = Post.query();
    }
    function AboutCtrl (Post) {
        this.posts = Post.query();
    }
    function ContactCtrl (Post) {
        this.posts = Post.query();
    }

    function HeaderController($scope, $location) {
        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };
    }
})();
