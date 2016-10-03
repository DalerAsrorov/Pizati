angular
  .module('app', ['ngRoute'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/editor/:essayType', {
        templateUrl: '/templates/pizati.html',
        controller: 'PizatiCtrl',
        controllerAs: 'vm',
        resolve: {
          getEssayType: function($route, $location) {
            var essayType =  $route.current.pathParams.essayType;
            if(!essayType)
              $location.path("/dashboard");
            return essayType;
          }
        }
      })
      .when('/dashboard', {
        templateUrl: '/templates/dashboard.html',
        controller: 'DashCtrl',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/dashboard'
      });
  });
