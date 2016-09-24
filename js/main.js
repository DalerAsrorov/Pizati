angular
  .module('app', ['ngRoute'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/editor', {
        templateUrl: '/templates/pizati.html',
        controller: 'PizatiCtrl',
        controllerAs: 'vm'
      })
      .when('/dashboard', {
        templateUrl: '/templates/dashboard.html',
        controller: 'DashCtrl',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/editor'
      });
  });
