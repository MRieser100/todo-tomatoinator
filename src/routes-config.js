import homeTemplate from './controllers/home.html';

function routesConfig($stateProvider, $urlRouterProvider) {
  'ngInject';

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      // controller: 'HomeController as vm', // Defining in this manner requires methods to be tied to this in controller
      controller: 'HomeController', // Defining in normal fashion means methods must be tied directly to $scope
      template: homeTemplate,
      resolve: {
        tasks: (TaskService) => {
          'ngInject';
                    
          return TaskService.getTasks();
        },
      },
    })
    // .state('search', {
    //   url: '/search/{query}',
    //   controller: 'SearchController as vm',
    //   template: searchTemplate,
    //   resolve: {
    //     query: ($stateParams) => {
    //       'ngInject';

    //       return $stateParams.query;
    //     },
    //     searchResults: ($stateParams, SearchService) => {
    //       'ngInject';

    //       return SearchService.search($stateParams.query);
    //     },
    //   }
    // });
}

export default routesConfig;
