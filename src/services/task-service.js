function TaskService($http) {
  'ngInject';

  function _responseTransformer(response) {
    return response.data.map((result) => {
      return {id: result.id,
              title: result.title,
              importance: result.importance,
              status: result.status,
              createDate: result.createDate,
              startDate: result.startDate,
              notes: result.notes
            };
    });
  }

  function getTasks() {        
    console.log('TaskService#getTasks');
    return $http.get('/api/tasks')
      .then(_responseTransformer);
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

  function removeTask(taskID) {
    // return $http.delete('/api/tasks', {"id": taskID})
    return $http.delete(`/api/tasks/${taskID}`)
      // .then(function(result) {
      //   console.log(result);
      // });
  }  

  return {
    getTasks,
    addTask,
    removeTask
  };
}

export default TaskService;
