import React, {useState, useEffect, useContext} from 'react'; import '../../css/app.css';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Table, Button, Spinner} from 'reactstrap'; import {AppContext} from '../AppContext';

function TodoList({match}) {
    const {tasksList, mainTaskList, setMainTaskList, user} = useContext(AppContext);
    const [loaded, setLoaded] = useState(false); //If tasks are loaded
    const [loaded2, setLoaded2] = useState(false); //If list is loaded
    const [list, setList] = useState(); //The list for this editing session
    const [changedList, setChangedList] = useState({
        name: '', changed: false
    }); //The name of the list for this editing session
    const [tasks, setTasks] = useState([]); //Tasks 0 = completed 1 = not completed | The tasks with negative ids are the ones that need to be posted
    const [originalTasks, setOriginalTasks] = useState([]); //For orignal tasks that need modification before being posted again
    const [deletedOriginalTasks, setDeletedOriginalTasks] = useState([]); //Original tasks that need deleting
    const [editing, setEditing] = useState(null); //If it === the task.id you are editing it
    const [selectedItem, setSelectedItem] = useState({}); //The item being edited
    const [updateCode, setUpdateCode] = useState({
        task: false,
        list: false
    }); //This will turn the update btn blue when ready (task if for task updates and etc)
    const [newItem, setNewItem] = useState({
        name: '',
        difficulty: 0,
        todolist_id: match.params.id, 
        id: Math.random() * -1 * 10,
        status: 'post',
        user_id: user.id
    }); //The New Item being made (change this for changes to uploading tasks)

    useEffect(() => {
        sortingTime();
    }, [])

    const editingTime = (task, state) => {
        if(state){
            setEditing(task.id); setSelectedItem(task)
        } else {
            setEditing(null); setSelectedItem({})
        }
    }
    const sortingTime = () => {
        axios.post(`http://127.0.0.1:8000/api/auth/tasks/`, {id: match.params.id})
        .then(res => {

            /* Setting the tasklist being worked on */
            tasksList.forEach(list => {
                if(list.id == match.params.id)
                    setList({...list})
                    setChangedList({...changedList, name: list.name})
            })

            /* Sets the other stuff for updating the tasklist */
            let sortedTasks = [...res.data];
            sortedTasks.sort((a, b)=>{return (b.difficulty-a.difficulty)}) 
            setOriginalTasks(sortedTasks);
            setTasks(sortedTasks);
            setLoaded(true);
            setLoaded2(true);
        });
    }
    const addToTask = () => {
        if(newItem.name[0] === " " 
            || newItem.name[0] === '' 
            || newItem.name[0] === undefined 
            || newItem.name[0] === null)
            {return alert('Name can not be empty.');}
        if (newItem.difficulty <= 0 || newItem.difficulty > 100)
            return alert(`The points amount shoud be between 1 - 100.`);
        setTasks([...tasks, newItem]);
        setNewItem({
            name: '',
            difficulty: 0,
            todolist_id: match.params.id, 
            id: Math.random() * -1,
            status: 'post',
            user_id: user.id
        })
    }
    const del = (task) => {
        let delTask = {...task, status: 'delete'};
        if(task.status === 'original')
            setDeletedOriginalTasks([...deletedOriginalTasks, delTask]);
        let faskTasks = [...tasks];
        let index = tasks.indexOf(task);
        faskTasks.splice(index, 1);
        setTasks(faskTasks);
    }

    const onDifficulty = (e) => {setSelectedItem({...selectedItem, difficulty : e.target.value})}
    const onName = (e) => {setSelectedItem({...selectedItem, name : e.target.value})} 
    const onNewName = (e) => {setNewItem({...newItem, name : e.target.value})}
    const onNewDifficulty = (e) => {setNewItem({...newItem, difficulty : e.target.value})}
    const onNewListName = (e) => {setChangedList({changed:true,name:e.target.value})}  
    
    const save = (idNumber) => {
        let statusForPosting = 'post'; //This is in case the user makes an edit to a status of post item. Now it won't change the status to update
        if(idNumber < 0){
            statusForPosting = 'post'
        } else {
            statusForPosting = 'update'
        }
        let sortedTasks = [...tasks];
        let index = sortedTasks.findIndex(i => i.id === idNumber);
            sortedTasks[index] = {
                ...sortedTasks[index], 
                name: selectedItem.name, 
                difficulty: selectedItem.difficulty,
                status: statusForPosting,
                user_id: user.id
            }; //The Tasks are updated

        let sortedOriginalTasks = [...originalTasks];
        let originalIndex = sortedOriginalTasks.findIndex(i => i.id === idNumber);
            sortedOriginalTasks[originalIndex] = {
                ...sortedOriginalTasks[originalIndex],
                name: selectedItem.name, 
                difficulty: selectedItem.difficulty,
                status: statusForPosting,
                user_id: user.id
            } //The original tasks array is updated to be pushable

        editingTime(false);
        setOriginalTasks(sortedOriginalTasks);
        setTasks(sortedTasks);
    }
    const updateTodoList = () => {
        if(updateCode.task && list.name !== changedList.name){
            setLoaded(false);
            setLoaded2(false);
        } 
        else if(updateCode.task){
            setLoaded(false);
        }
        else if(list.name !== changedList.name){
            setLoaded2(false);
        }

        if(updateCode.task){
            //Updating the Tasks
            var tasksToPost = [];
                for (let i=0; i < tasks.length; i++){
                    if(tasks[i].status === 'post'){
                        tasksToPost.push({...tasks[i], status: 'original'});
                    }
                }
    
            axios.post(`http://127.0.0.1:8000/api/task/oneStopUpdate`, {
                originalTasks:originalTasks,
                deletedOriginalTasks:deletedOriginalTasks,
                tasks: tasksToPost,
                id: match.params.id,
            }).then(res => {
                setTasks(res.data);
                setOriginalTasks(res.data);
                setDeletedOriginalTasks([]);
                setUpdateCode({...updateCode, task: false})
                console.log(res.data)
                setLoaded(true);
            })
        }

        if(list.name !== changedList.name){
            axios.post(`http://127.0.0.1:8000/api/auth/todolist/todolistUpdate`, {
                name: changedList.name,
                id: match.params.id
            }).then(res => {
                setList({...list, name: changedList});
                setChangedList({...changedList, changed:false});
                setLoaded2(true);
            });
        }
        
    }
    const currentListStuff = (id) => {
        if(id === null){
            setMainTaskList({});
            axios.post('http://localhost:8000/api/auth/update', {
                current_todolist: null,
            })
        } else {
            setMainTaskList({...list});
            axios.post('http://localhost:8000/api/auth/update', {
                current_todolist: id,
            })
        }
    }

    return (
        <div className="container" style={{marginTop:"80px"}}>
        {!loaded || !loaded2 ?
            <div style={{
                display: 'flex', justifyContent:'center', alignItems:'center'
            }}>
                <Spinner color="dark" />
            </div>
                :
            <div className="container">
                {true ? 
                    <div style={{display:'flex', alignItems:'center'}}>
                        <div style={{fontSize:'20px'}}>Routine Name</div>
                        <input className="newItem" 
                            type="text" value={changedList.name} onChange={onNewListName}
                            style={{margin:'10px 0px 20px 30px'}}    
                        />
                    </div>
                        :
                    <div style={{fontSize:'30px', marginBottom:'20px'}}>
                        {list.name}
                    </div>
                }
                <Table>
                    <thead style={{height: "25px"}}>
                        <tr>
                            <th><div>Points</div></th>
                            <th>Name</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    {tasks.map((task) => {
                        return( 
                        <tbody className="tbodySection" 
                            id={selectedItem.id===task.id ? 'selected' : ''}
                            key={task.id}
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
                                <td>{editing !== null && editing !== task.id?
                                    <div></div> :
                                    <div style={{display:'flex', alignItems:"center", height:"75px", width:"125px"}}>{task.id === editing ? 
                                        <div>
                                        <Button 
                                            color="success" 
                                            size="sm" 
                                            className="mr-2" 
                                            onClick={()=>{
                                                save(task.id); 
                                                setUpdateCode({...updateCode, task:true});
                                            }}
                                        >
                                            Save
                                        </Button>
                                        <Button 
                                            color="danger" 
                                            size="sm" 
                                            className="mr-2" 
                                            onClick={()=>editingTime(task, false)
                                        }>
                                            Cancel
                                        </Button>
                                        </div> 
                                            : 
                                        <div>
                                        <Button 
                                            color="success"
                                            size="sm" 
                                            className="mr-2" 
                                            onClick={()=>editingTime(task, true)
                                        }>
                                            Edit
                                        </Button>
                                        <Button 
                                            color="danger" 
                                            size="sm" 
                                            className="mr-2" 
                                            onClick={()=>{
                                                del(task);
                                                setUpdateCode({...updateCode, task:true});
                                            }}
                                        >
                                            Delete
                                        </Button>
                                        </div>
                                    }</div>
                                }
                                </td>
                            </tr>
                        </tbody>
                    )})}
                </Table>
                    <div id="postBtn" style={{
                        display:'flex', 
                        height:'100px', marginTop: '-18px',
                        width:'100',
                        borderTop: '2.5px solid #DEE2E6',
                        alignItems: 'center'
                    }}>
                        <div >
                            <svg onClick={()=>{addToTask(); setUpdateCode({...updateCode, task:true});}} id="hoverGreen" style={{marginTop: "10px",marginRight:'25px'}} xmlns="http://www.w3.org/2000/svg" width="65" height="55" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                            </svg>
                        </div>
                        <div >
                            <div style={{marginRight:'25px'}}><p style={{marginBottom: "-15px"}}>Points</p>
                                <input className="newItem" type="number" value={newItem.difficulty} onChange={onNewDifficulty}/>
                            </div>
                        </div>
                        <div >
                            <div><p style={{marginBottom: "-15px"}}>Task Name</p>
                            <input className="newItem" type="text" value={newItem.name} onChange={onNewName}/>
                            </div>
                        </div>
                    </div>
                    <div className="saveBtns">
                        <div >
                            {updateCode.task || changedList.changed ?
                                <div>
                                    <button onClick={()=>{
                                        updateTodoList(); 
                                    }} 
                                        className="updateBtnSuccess">
                                        Update Todo List
                                    </button>
                                    {list.id !== mainTaskList.id ?
                                        <button className="setCurrentBtn"
                                            onClick={()=>currentListStuff(list.id)}>
                                            Set as Current List
                                        </button> 
                                            :
                                        <button className="removeCurrentBtn"
                                            onClick={()=>currentListStuff(null)}>
                                            Remove as Current List
                                        </button>
                                    }
                                </div>
                                    :
                                <div style={{display:'flex'}}>
                                    <button onClick={()=>alert('No Changes Made')} className="updateBtnFail">
                                        Update Todo List
                                    </button>
                                    {list.id !== mainTaskList.id ?
                                        <button className="setCurrentBtn" 
                                            onClick={()=>currentListStuff(list.id)}>
                                            Set as Current List
                                        </button> 
                                            :
                                        <button className="removeCurrentBtn"
                                        onClick={()=>currentListStuff(null)}>
                                            Remove as Current List
                                        </button>
                                    }
                                </div>
                            }
                        </div>
                        <div >
                            <button onClick={()=>{console.log(list.name, changedList, updateCode.task)}}>consolelog</button>
                        </div>
                    </div>
            </div>
            } 
        </div> 
    );
}

export default TodoList;

if (document.getElementById('todolist')) {
    ReactDOM.render(<TodoList />, document.getElementById('todolist'));
}
