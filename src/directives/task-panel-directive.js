/* TEST - push succeeded */
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
        controller: () => { },
        link: (scope) => {                   
            const {vm} = scope;                       
            vm.displayTaskPanel = true;
            vm.removeTask = (task) => {
                TaskService.removeTask(task.id).then(() => { $state.reload(); });
            }
            vm.toggleActiveTask = (task) => {                                    
                if (task.isActive) {
                    TaskService.updateTask(task.id, {"isActive": false}).then(() => { $state.reload() });
                } else {
                    console.log('!task.isActive');
                    TaskService.clearActiveTask().then(() => { 
                        TaskService.updateTask(task.id, {"isActive": true}).then(() => { $state.reload() })
                    });
                }
            }

            vm.toggleTaskPanel = () => {                                  
                vm.displayTaskPanel = !vm.displayTaskPanel;
            } 

        }
    };
}

export default TaskPanelDirective;
