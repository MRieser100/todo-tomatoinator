import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routesConfig from './routes-config';
import taskImportanceValueFilter from './filters/task-importance-value-filter';
import TaskService from './services/task-service';
import TaskPanelDirective from './directives/task-panel-directive';
import HomeController from './controllers/home-controller';

const todoTomatoinator = angular.module('todo-tomatoinator',
  [
    uiRouter,
  ])
  .controller('HomeController', HomeController)  
  .factory('TaskService', TaskService)
  .directive('taskPanel', TaskPanelDirective)
  .filter('taskImportanceValue', taskImportanceValueFilter)  
  .config(routesConfig)
  .config(['$qProvider', function ($qProvider) {
    // Workaround for ng 1.5.9 + ui-router 2.1.x bug that results in 4 'Possibly unhandled rejection {}' errors
    //  See: https://github.com/angular-ui/ui-router/issues/2889
    $qProvider.errorOnUnhandledRejections(false);
  }]);

export default todoTomatoinator.name;
