import React, {useState, useEffect, useContext} from 'react'; import '../../css/app.css';
import ReactDOM from 'react-dom';
import {Table, Button} from 'reactstrap'; import {AppContext} from '../AppContext';

function Example() {
    const [tasksList, setTasksList] = useContext(AppContext);
    const [asc, setAsc] = useState(false); //What order the list is going
    const [tasks, setTasks] = useState([]); //Tasks 0 = completed 1 = not completed
    const [editing, setEditing] = useState(null); //If it === the task.id you are editing it
    const [selectedItem, setSelectedItem] = useState({}); //The item being edited
    const [newItem, setNewItem] = useState({name: '',difficulty: 0,todolist_id: 1}); //The New Item being made

    useEffect(() => {
        sortingTime()
    }, [])
/*     useEffect(() => {
        sortingTime();
    }, [asc]) */

    const totalPoints = () => {
        let total = 0;
        tasks.forEach(task => total = total + task.difficulty)
        return total
    }
    const editingTime = (task, state) => {
        if(state){
            setEditing(task.id); setSelectedItem(task)
        } else {
            setEditing(null); setSelectedItem({})
        }
    }
    const sortingTime = () => {
        /* console.log(asc) */
        let sortedTasks = tasksList;
        asc ? sortedTasks.sort((a, b)=>{return (a.difficulty-b.difficulty)}) :
              sortedTasks.sort((a, b)=>{return (b.difficulty-a.difficulty)}) 
            /* console.log(sortedTasks) */
        setTasks(sortedTasks);
    }
    const onDifficulty = (e) => {setSelectedItem({...selectedItem, difficulty : e.target.value})}
    const onName = (e) => {setSelectedItem({...selectedItem, name : e.target.value})} 
    const onNewName = (e) => {setNewItem({...newItem, name : e.target.value})}
    const onNewDifficulty = (e) => {setNewItem({...newItem, difficulty : e.target.value})} 
    const save = (sortedTasks, idNumber) => {
        let index = sortedTasks.findIndex(i => i.id === idNumber);
        sortedTasks[index] = {...sortedTasks[index], name: selectedItem.name, difficulty: selectedItem.difficulty };
        sortedTasks.sort((a, b)=>{return (b.difficulty-a.difficulty)});
        axios.put(`http://127.0.0.1:8000/api/task/${selectedItem.id}`, selectedItem);
        editingTime(false);
    }
    const post = () => {
        if(newItem.name[0] === " " || newItem.name[0] === '' || newItem.name[0] === undefined || newItem.name[0] === null)
            return alert('Name can not be empty.');
        if (newItem.difficulty <= 0 || newItem.difficulty > 100)
            return alert(`The points amount shoud be between 1 - 100. You have ${100 - totalPoints()} left to fill.`)
        axios.post(`http://127.0.0.1:8000/api/task`, newItem).then(res => {
            let sortedTasks = res.data; 
            sortedTasks.sort((a, b)=>{return (b.difficulty-a.difficulty)});
            setTasks(sortedTasks);
        });
    }
    const del = (idNumber) => {
        axios.delete(`http://127.0.0.1:8000/api/task/${idNumber}`).then(res => {
            let sortedTasks = res.data; 
            sortedTasks.sort((a, b)=>{return (b.difficulty-a.difficulty)});
            setTasks(sortedTasks);
        });
    }
    const completed = (sortedTasks,idNumber) => {
        let index = sortedTasks.findIndex(i => i.id === idNumber);
        sortedTasks[index] = {...sortedTasks[index], completed: 0};
        axios.put(`http://127.0.0.1:8000/api/task/${idNumber}`, sortedTasks[index]);
        editingTime(false);
    }

    return (
        <div className="container" style={{marginTop:"100px"}}>
            <div className="container">
                <Table>
                    <thead style={{height: "25px"}}>
                        <tr>
                       {/*  onClick={()=>{setAsc(!asc);}} */}
                            <th><div>Points</div></th>
                            <th>Name</th>
                            <th>Completed</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    {tasks.map((task) => {
                        return( 
                        <tbody className="tbodySection" 
                            id={task.completed == 0 ? "tbodySectionComplete" : ''}
                            key={task.id} onClick={()=>completed(tasks,task.id)}
                        >
                            <tr>
                                <td className="points" style={{padding: 'none'}}><div style={{display:'flex', alignItems:"center", height:"75px"}}>{task.id === editing ? 
                                    <input type="number" className="bordersSmall" maxLength="3" onChange={onDifficulty} value={selectedItem.difficulty}/> 
                                        : 
                                    task.difficulty}
                                </div></td>
                                <td><div style={{display:'flex', alignItems:"center", height:"75px", width:"100px"}}>{task.id === editing ? 
                                    <input className="borders" onChange={onName} value={selectedItem.name}/>  
                                        : 
                                    task.name}
                                </div></td>
                                <td><div style={{display:'flex', alignItems:"center", height:"75px", width:"100px"}}>{task.completed === 1 ? "Not Completed" : "Completed"}</div></td>
                                <td>{editing !== null && editing !== task.id?
                                    <div></div> :
                                    <div style={{display:'flex', alignItems:"center", height:"75px", width:"125px"}}>{task.id === editing ? 
                                        <div>
                                        <Button color="success" size="sm" className="mr-2" onClick={()=>save(tasks, task.id)}>Save</Button>
                                        <Button color="danger" size="sm" className="mr-2" onClick={()=>editingTime(task, false)}>Cancel</Button>
                                        </div> 
                                            : 
                                        <div>
                                        <Button color="success" size="sm" className="mr-2" onClick={()=>editingTime(task, true)}>Edit</Button>
                                        <Button color="danger" size="sm" className="mr-2" onClick={()=>del(task.id)}>Delete</Button>
                                        </div>
                                    }</div>
                                }
                                </td>
                            </tr>
                        </tbody>
                    )})}
                        <tbody><tr style={{height: '75px'}}>
                            <td>
                                <svg onClick={()=>post()} id="hoverGreen" style={{marginTop: "7px"}} xmlns="http://www.w3.org/2000/svg" width="65" height="55" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                </svg>
                            </td>
                            <td>
                                <div><p style={{marginBottom: "-15px"}}>Points</p>
                                    <input className="newItem" type="number" value={newItem.difficulty} onChange={onNewDifficulty}/>
                                </div>
                            </td>
                            <td>
                                <div><p style={{marginBottom: "-15px"}}>Task Name</p>
                                <input className="newItem" type="text" value={newItem.name} onChange={onNewName}/>
                                </div>
                            </td>
                        </tr></tbody>
                </Table>
            </div> 
        </div> //1;34
    );
}

export default Example;

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
