import React, {Component} from 'react';
import './App.css';



function popElementAtIndex(arr, index) {
  let temp = arr[arr.length - 1];

  arr[arr.length - 1] = arr[index];

  arr[index] = temp;
 return arr.pop();
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks : [
        // {task : "clean", isComplete : false},
        // {task : "eat", isComplete : false},
        // {task : "play", isComplete : false},
        // {task : "learn", isComplete : false},
      ],
      task : '',
      listType : true,
      completedTasks : [
        // {title : "one", isComplete : true}
      ]
    }

  }//end constructor


  //add task
  addTask = e => {
    e.preventDefault();
    let newTask = {};
    let tmp = [...this.state.tasks ];

    if(this.state.task.length > 0) {
      newTask = {
        title : this.state.task,
        isComplete : false
      };
      console.log(newTask.title,  newTask.isComplete + " is being added to tasks");
      this.state.tasks.push(newTask);
      console.log(this.state.tasks);

      this.setState({tasks : [...this.state.tasks], newTask});
      console.log(this.state.tasks);
      this.setState({task : ""});
    }
    else {
      console.log("no user input");
    }


  }


  ////toggle task
  userInput = e => {
    console.log("user input: " + e.target.value);
    this.setState({task: e.target.value});
  }


  //change 
  markComplete = (i, e) => {
    //this is this
    // alert("this is " + (this.state.tasks));

    //what what is i (first argument is the id)
    console.log(" i is: " + i);
    //what is e (second argument is the event)
    console.log(" e is: " + e.type);

    //remove element from list
    let temp = [...this.state.tasks];
    let completed = [...this.state.completedTasks];

    console.log("removed: " + temp[i].title);
    console.log("adding: " + temp[i] + " to completed tasks");

    
    completed.push(popElementAtIndex(temp, i));

    this.setState({tasks : temp, completedTasks : completed});
  }


  unCheck(i){
    console.log("whats is passing in " + i);
    let ref = 'ref_' + i;
    this.refs[ref].checked = !this.refs[ref].checked;
 }

 changeView = e => {
   this.setState({listType : !this.state.listType})
   if(this.state.listType) {
    console.log("true");
   }
   else {
    console.log("flase");
   }
 }


  render() {
    return (
      <div className="App">
        {this.state.listType ?
        <h1 className='title'>TO DO</h1>:
        <h1 className='title'>COMPLETED</h1>
        }
        <div className='row justify-content-center'>
          <div className='center-box col-lg-4 col-md-4 col-sm-6"'>
            <div className='row justify-content-center'>
              <div className="form-group mx-sm-3 mb-2 col-lg-6 col-md-6 col-sm-6">
              {this.state.listType ?
                <form onSubmit={this.addTask}>
                  <input
                    className="form-control" 
                    onChange={this.userInput} 
                    value={this.state.task} 
                    type="text" 
                    placeholder="your task"
                   />
                  <button type="submit" className="btn invisble mb-2" placeholder=" " />
                </form>:
                <div></div>
              }

                {this.state.listType ? 
                <button 
                      onClick={this.changeView}type="submit" 
                      className="btn btn-md btn-success mb-2" 
                      placeholder="check completed" 
                >
                      check completed
                </button>:
                <button 
                onClick={this.changeView}type="submit" 
                className="btn btn-md btn-success mb-2" 
                placeholder="check completed" 
                >
                  check ToDO
                </button>      
                }
              </div>
            </div>
            
             {
              this.state.listType ? 
              <div className="justify-content-center">
                {
                  this.state.tasks.map( (task, i) =>
                  <div className='task row' key={i}>

                      <input 
                        type="checkbox" 
                        onChange={this.markComplete.bind(this, i)}  
                        onClick={this.unCheck.bind(this, i)} 
                        ref={'ref_' + i} 
                        className="align-self-start  ml-1 mr-5" 
                        />
                      <h1>{task.title}</h1>
                  </div>
                  )
                }
              </div>: 

              <div className="justify-content-center mt-5">
                {
                  this.state.completedTasks.map( (task, i) =>
                    <div className='task row' key={i}>
                      <h3 className='mx-auto'><label className="align-self-end ">{task.title}</label></h3> 
                    </div>
                  )
                }
              </div>
              }
              
              




            
          </div>  
        </div>  
      </div>
    );
  }//end return

}//end class App

export default App;
