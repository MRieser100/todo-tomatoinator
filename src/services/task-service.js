function TaskService($http) {
  'ngInject';

  function _responseTransformer(response) {
    return response.data.map((result) => {
      return {id: result.id,
              title: result.title,
              importance: result.importance,
              isActive: result.isActive,
              status: result.status,
              createDate: result.createDate,
              startDate: result.startDate,
              notes: result.notes
            };
    });
  }

  function _getActiveTask(response) {      
    return response.filter( (task) => {      
      if (task.isActive) { return task; }
    })[0];    
  }

  function _clearActiveTask(task) {    
    return task === undefined ? true : updateTask(task.id, {"isActive": false});    
  }

  function addTask(params) {
    // let testParams = {
    //                   "title": "New Task!", 
    //                   "importance": 2,
    //                   "status": 2,
    //                   "createDate": "2017-03-05",
    //                   "startDate": "2017-03-05",
    //                   "notes": [
    //                     {                          
    //                       "title": "If you feel overwhelmed, just do something, slowly",
    //                       "date": "2017-03-05"
    //                     }                
    //                   ]      
    //                 };    

    return $http.post('/api/tasks', params)
      // .then(function(result) {
      //   console.log(result);
      // });
  }

  function getTasks() {            
    return $http.get('/api/tasks')
      .then(_responseTransformer);
  }

  function updateTask(taskID, updateParams) {
    return $http.patch(`/api/tasks/${taskID}`, updateParams);    
    // Question: possible/easier/faster to just update patched task??
  }

  function removeTask(taskID) {
    // return $http.delete('/api/tasks', {"id": taskID})
    return $http.delete(`/api/tasks/${taskID}`);
      // .then(function(result) {
      //   console.log(result);
      // });
  }  

  function getActiveTask() {
    return getTasks().then(_getActiveTask);
  }

  function clearActiveTask() {
    return getActiveTask().then(_clearActiveTask);
  }

  return {    
    addTask,
    getTasks,
    updateTask,
    removeTask,
    getActiveTask,
    clearActiveTask
  };
}

export default TaskService;
