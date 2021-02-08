import React, {useState, useEffect, useContext} from 'react'; 
import '../../css/app.css';
import ReactDOM from 'react-dom';
import {Table} from 'reactstrap'; import {AppContext} from '../AppContext';

function TodoList({urlId}) {
    const {
        user, setUser, 
        setCompletion, 
        setBgC, setsBgC, 
        mainTaskList, setMainTaskList,
        acts ,setActs
    } = useContext(AppContext);
    const [tasks, setTasks] = useState([]); //Tasks 0 = completed 1 = not completed

    useEffect(() => {
        axios.post(`http://127.0.0.1:8000/api/auth/tasks`,{
            id: urlId
        }).then(res => {
            setTasks([...res.data])
        })
    }, [])

    const completed = (idNumber, change) => {
        let status = change;
        if(change == 1)
            status = 0;
        else status = 1;

        let index = tasks.findIndex(i => i.id === idNumber);
        let changedTasks = [...tasks];
        changedTasks[index] = {...changedTasks[index], completed: status};
        setTasks([...changedTasks]);
        //Making the change appear locally

        let done = 0;
        tasks.forEach(t => {
            if(t.completed === 0){
                done++;
            }
        });
            if(status === 0){
                done++;
            } else {
                done--;
            }
        
        let percent = done/tasks.length * 100;
        setCompletion(percent)

        //Setting the color based on points
            if(percent >= 75 && percent < 100){
                setBgC('#2FA360');
                setsBgC('green');
            }
            else if(percent < 75){
                setBgC('black');
                setsBgC('grey');
            }
            else if (percent >= 100){
                setBgC('#edce44');    
                setsBgC('yellow');
            }
        //Updating the streaks
        if(done/tasks.length === 1 && mainTaskList.completed==1){
            axios.post(`http://127.0.0.1:8000/api/auth/todolist/todolistUpdate`, {
                streak: mainTaskList.streak + 1,
                completed: 0,
                id: urlId
            });
            setMainTaskList({...mainTaskList, 
                streak: mainTaskList.streak + 1, completed: 0,
            });
        }

        //Updates the task in the database
        axios.post(`http://127.0.0.1:8000/api/auth/task/update`, {
            id: idNumber,
            completed: status
        });

        //Adding the Points
        if(done/tasks.length === 1 && mainTaskList.completed==1){
            axios.post(`http://127.0.0.1:8000/api/auth/update`, {
                points: user.points+110
            });
            setUser({...user, points: user.points+110});
        } else {
            axios.post(`http://127.0.0.1:8000/api/auth/update`, {
                points: user.points+10
            });
            setUser({...user, points: user.points+10});
        }

        //Updates the Activity List
        if(done/tasks.length === 1 && mainTaskList.completed==1){ //If todolist is completed
            if(acts.length < 9) //If the acts list isnt too long
                setActs([
                    {name:`${mainTaskList.name} completed`, id:Math.random()*Math.random()},
                    {name:changedTasks[index].name, id:Math.random()*Math.random()},
                    ...acts, 
                ]);
            else { //if the acts list is too long and needs to be truncated
                let newActs = [...acts];
                newActs.splice(8,2);
                newActs = [
                    {name:`${mainTaskList.name} completed`, id:Math.random()*Math.random()},
                    {name:changedTasks[index].name, id:Math.random()*Math.random()}, 
                ...newActs];
                setActs(newActs);
            }
            console.log(done/tasks.length === 1 && mainTaskList.completed==1)
            axios.post(`http://127.0.0.1:8000/api/auth/act/insert`, {
                user_id: user.id,
                name: changedTasks[index].name,
                listName: mainTaskList.name,
                todoCompleted: 0
            }).then(res => console.log(res.data));

        } else { // If todolist isn't completed
            if(acts.length < 10) //If the acts list isnt too long
                setActs([...acts, {name:changedTasks[index].name, id:Math.random()*Math.random()}]);
            else { //if the acts list is too long and needs to be truncated
                let newActs = [...acts];
                newActs.pop();
                newActs = [{name:changedTasks[index].name, id:Math.random()*Math.random()}, ...newActs];
                setActs(newActs);
            }
            
            axios.post(`http://127.0.0.1:8000/api/auth/act/insert`, {
                user_id: user.id,
                name: changedTasks[index].name,
                todoCompleted: 1
            }).then(res => console.log(res.data));
        }
    }

    return (
        <div className="container" style={{marginTop:"60px"}}>
            <div className="container">
                <div style={{display:'flex', alignItems:'flex-end', 
                    height:'55px', marginBottom:'20px'
                }}>
                    <div style={{fontSize:'32px'}}>{mainTaskList.name}</div>
                    <div style={{fontSize:'25px'}}>Streak {mainTaskList.streak}</div>
                </div>
                <Table>
                    <thead style={{height: "25px"}}>
                        <tr>
                            <th>Name</th>
                            <th>Completed</th>
                        </tr>
                    </thead>
                    {tasks.map((task) => {
                        return( 
                        <tbody className="tbodySection" 
                            id={task.completed == 0 ? "tbodySectionComplete" : ''}
                            key={task.id} onClick={()=>{
                                completed(task.id, task.completed);
                            }}
                        >
                            <tr>
                                <td>
                                    <div style={{
                                        display:'flex', 
                                        alignItems:"center", 
                                        height:"75px", 
                                        width:"100px"
                                    }}>
                                        {task.name}
                                    </div>
                                </td>
                                <td>
                                    <div style={{
                                        display:'flex', alignItems:"center", 
                                        height:"75px", width:"100px"
                                    }}>
                                        {task.completed === 1 ? 
                                            "Not Completed" : "Completed"}
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    )})}
                </Table>
            </div> 
        </div> 
    );
}

export default TodoList;

if (document.getElementById('todolist')) {
    ReactDOM.render(<TodoList />, document.getElementById('todolist'));
}