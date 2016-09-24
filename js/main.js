angular
  .module('app', ['ngRoute'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/templates/pizati.html',
        controller: 'PizatiCtrl',
        controllerAs: 'vm'
      })
      .when('/dasbhoard', {
        templateUrl: '/templates/dashboard.html',
        controller: 'DashCtrl',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
