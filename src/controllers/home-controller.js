function HomeController($scope, $state, TaskService, tasks) {
  'ngInject';

  // const vm = this;  
  $scope.username = 'Michael';

  // $scope.tasklvl = '1';
  $scope.taskLevels = [1,2,3,4]; // TODO: Extract to service || properties file
  $scope.title = null;
  $scope.importance = '1'; // A

  $scope.refreshState = () => {
    $state.reload();           
    // $state.transitionTo($state.current, {}, {reload: true});
  }

  $scope.refreshTasks = () => {
    // // console.log(new Promise( (resolve, reject) => {
      TaskService.getTasks().then( (tasks) => {        
        $scope.sortedTasks = getTasksByImportance(tasks);
      }).then( () => { $state.reload() })    
    }

  $scope.getTasksByImportance = (tasks) => {
    return tasks.reduce( (map, task) => {
      let taskImportance = task["importance"];
      if( !(taskImportance in map) ) { map[taskImportance] = []; }
      map[taskImportance].push(task);
      return map;
    }, {});    
  }

  $scope.sortedTasks = $scope.getTasksByImportance(tasks);

  $scope.addTask = () => {
    return TaskService.addTask(
      {
        "title": $scope.title,
        "importance": parseInt($scope.importance), // TODO: convert to subtype
        "staus": 0, // (0: Not Started, 1: In Progress, 2: Paused, 3: Completed),
        "createDate": new Date(Date.now()).toISOString().substring(0, 10),
        "startDate": null,
        "notes": {}
      }
    ).then( () => { $scope.refreshState() });
  }

  // TODO: Determine how to pass this into task-panel-directive.js and use accordingly
  // $scope.removeTask = (task) => {
  //   console.log('removeTask()');
  //   TaskService.removeTask(task).then($state.transitionTo($state.current, {}, {reload: true}));
  // }

  // TODO: create factory/method to convert task ENUM to value. see notes.txt

}

export default HomeController;
