import template from './task-panel.html';

function TaskPanelDirective(TaskService, $state) {
    'ngInject';

    return {
        template,        
        // transclude: true,
        restrict: 'E',
        scope: { // creates an isolate scope, mirroring the passed parent's scope                              
        },
        controllerAs: 'vm',
        bindToController: {
            tasklvl: '=',                                          
            tasks: '='
        },
        controller: () => {},
        link: (scope) => {
            const {vm} = scope;
              vm.removeTask = (task) => {                           
                TaskService.removeTask(task.id).then( () => {
                    $state.transitionTo($state.current, {}, {reload: true});
                })
            }
        }
    };
}

export default TaskPanelDirective;
