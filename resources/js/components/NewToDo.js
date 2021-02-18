import React, {useState, useEffect, useContext} from 'react'; import '../../css/app.css';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Table, Button, Spinner} from 'reactstrap'; import {AppContext} from '../AppContext';

function NewTodo({urlId, props}) {
    const {
        tasksList, setTasksList,
        mainTaskList, setMainTaskList, 
        setCompletion, setBgC, setsBgC,
        user} = useContext(AppContext);

    const max = 30; //Max tasks per routine
    const [loaded, setLoaded] = useState(false); //If tasks are loaded
    const [loaded2, setLoaded2] = useState(false); //If list is loaded

    const [list, setList] = useState(null); //The list for this editing session
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
        todolist_id: urlId, 
        id: Math.random() * -1 * 10,
        status: 'post',
        user_id: user.id
    }); //The New Item being made (change this for changes to uploading tasks)

    useEffect(() => {
        axios.post(`http://127.0.0.1:8000/api/auth/tasks/`, {id: urlId})
        .then(res => {

            /* Setting the tasklist being worked on */
            tasksList.forEach(list => {
                if(list.id == urlId){
                    setList({...list})
                    setChangedList({...changedList, name: list.name})
                }
            })

            /* Sets the other stuff for updating the tasklist */
            setOriginalTasks([...res.data]);
            setTasks([...res.data]);
            
            setLoaded(true);
            setLoaded2(true);
        }).catch(e => {
            setLoaded(true);
            setLoaded2(true);
        })
    }, [])

    const editingTime = (task, state) => {
        if(state){
            setEditing(task.id); setSelectedItem(task)
        } else {
            setEditing(null); setSelectedItem({})
        }
    }
    const addToTask = () => {
        if(newItem.name[0] === " " 
            || newItem.name[0] === '' 
            || newItem.name[0] === undefined 
            || newItem.name[0] === null)
            {return alert('Name can not be empty.');}
        setTasks([...tasks, newItem]);
        setNewItem({
            name: '',
            todolist_id: urlId, 
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

    const onName = (e) => {setSelectedItem({...selectedItem, name : e.target.value})} 
    const onNewName = (e) => {setNewItem({...newItem, name : e.target.value})}
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
                status: statusForPosting,
                user_id: user.id
            }; //The Tasks are updated

        let sortedOriginalTasks = [...originalTasks];
        let originalIndex = sortedOriginalTasks.findIndex(i => i.id === idNumber);
            sortedOriginalTasks[originalIndex] = {
                ...sortedOriginalTasks[originalIndex],
                name: selectedItem.name, 
                status: statusForPosting,
                user_id: user.id
            } //The original tasks array is updated to be pushable

        editingTime(false);
        setOriginalTasks(sortedOriginalTasks);
        setTasks(sortedTasks);
    }
    const updateTodoList = () => {
        setEditing(null); //Close anything editing that the user didnt close

        if(tasks.length > max && list.name == changedList.name) //A cap of max tasks per routine
            return alert(`Max of ${max} tasks per routine`)
        
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
                    id: urlId,
                }).then(res => {
                    setTasks(res.data);
                    setOriginalTasks(res.data);
                    setDeletedOriginalTasks([]);
                    setUpdateCode({...updateCode, task: false});
                    setLoaded(true);
                })
            }

        //Changing the name of the list
        if(list.name !== changedList.name){
            axios.post(`http://127.0.0.1:8000/api/auth/todolist/todolistUpdate`, {
                name: changedList.name,
                id: urlId
            }).then(res => {
                setList({...list, name: changedList.name});
                setChangedList({...changedList, changed:false});
                
                var index = tasksList.findIndex(l => l.id === list.id);
                var standInList = [...tasksList];
                standInList.splice(index, 1, {...list, name:changedList.name})

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
    const delRoutine = () => {
        axios.post('http://localhost:8000/api/auth/todolist/todolistDelete', {
            id: urlId,
        });
        
        //Removing the routine in the appcontext
            let newList = [...tasksList];
            let index = tasksList.findIndex(l => l.id == urlId);
            newList.splice(index, 1);
            setTasksList([...newList]);

        //Stuff in case the maintasklist is the one we are removing
            if(mainTaskList.id == urlId){
                setMainTaskList({});
                setCompletion(0);
                axios.post('http://localhost:8000/api/auth/update', {
                    current_todolist: null,
                })
            }
        //Redirect to userpanel
        props.history.push('/userpanel');
    }

    return (
        <div>{list === null && loaded && loaded2?

        <div> {/* 404 Error */}
            <div style={{
                display:'flex', justifyContent:'center',
                paddingTop:'20vh', fontSize:'25px'
            }}>
                Error: This Routine does not exist
            </div>

            <div style={{
                display:'flex', justifyContent:'center',
                fontSize:'23px'
            }}>
            <Link to='/userpanel'>Click here to return to the userpanel to select one</Link>
            </div>
        </div>
                    :
        <div className="container" style={{marginTop:"40px"}}>
        {list !== null ?
            <div> 
        {!loaded || !loaded2 ?
            <div style={{
                display: 'flex', justifyContent:'center', alignItems:'center'
            }}>
                <Spinner color="dark" />
            </div>
                :
            <div className="container userpanelContainer">
                {true ? 
                    <div style={{display:'flex', alignItems:'center'}}>
                        <div style={{fontSize:'20px'}}>Routine Name</div>
                        <input className="newItem" 
                            type="text" value={changedList.name} onChange={onNewListName}
                            style={{margin:'0px 0px 20px 30px'}}    
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
                    {tasks.length >= max ? null :
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
                            <div><p style={{marginBottom: "-15px"}}>Task Name</p>
                            <input className="newItem" type="text" value={newItem.name} onChange={onNewName}/>
                            </div>
                        </div>
                        <div style={{margin:'20px 0px 0px 20px'}}>Max of 30 tasks</div>
                    </div>}
                    <div className="saveBtns" style={{marginBottom:'50px'}}>
                        <div >
                            {updateCode.task || changedList.changed ?
                                <div>
                                    <button onClick={()=>{
                                        updateTodoList(); 
                                    }} 
                                        className="updateBtnSuccess">
                                        Update Routine
                                    </button>
                                    {list.id !== mainTaskList.id ?
                                        <button className="setCurrentBtn"
                                            onClick={()=>currentListStuff(list.id)}>
                                            Set as Current Routine
                                        </button> 
                                            :
                                        <button className="removeCurrentBtn"
                                            onClick={()=>currentListStuff(null)}>
                                            Remove as Current Routine
                                        </button>
                                    }
                                    <button to="/userpanel" 
                                        className="deleteBtn"
                                        onClick={()=>delRoutine()}>
                                        <div style={{
                                            display:'flex', 
                                            justifyContent:'center',alignItems:'center',
                                            width:'100%', height:'100%'
                                        }}>
                                            Delete Routine
                                        </div>
                                    </button>
                                </div>
                                    :
                                <div style={{display:'flex'}}>
                                    <button onClick={()=>alert('No Changes Made')} className="updateBtnFail">
                                        Update Routine
                                    </button>
                                    {list.id !== mainTaskList.id ?
                                        <button className="setCurrentBtn" 
                                            onClick={()=>currentListStuff(list.id)}>
                                            Set as Current Routine
                                        </button> 
                                            :
                                        <button className="removeCurrentBtn"
                                        onClick={()=>currentListStuff(null)}>
                                            Remove as Current Routine
                                        </button>
                                    }
                                    <button to="/userpanel" 
                                        className="deleteBtn"
                                        onClick={()=>delRoutine()}>
                                        <div style={{
                                            display:'flex', 
                                            justifyContent:'center',alignItems:'center',
                                            width:'100%', height:'100%'
                                        }}>
                                            Delete Routine
                                        </div>
                                    </button>
                                </div>
                            }
                        </div>
{/*                         <div >
                            <button onClick={()=>{console.log(list)}}>consolelog</button>
                        </div> */}
                    </div>
            </div>
        } </div>
            :
            <div>{!loaded || !loaded2 ?
                <div style={{
                    display: 'flex', justifyContent:'center', alignItems:'center'
                }}>
                    <Spinner color="dark" />
                </div>
                    :
                <div style={{
                    display:'flex', justifyContent:'center', alignItems:'center',
                    height:'80vh'
                }}>
                    <div>
                        <div style={{width:'50vw', fontSize:'40px',
                        display:'flex', justifyContent:'center'}}>
                            404 Error
                        </div>
                        <div style={{width:'50vw', fontSize:'30px', color:'grey',
                        display:'flex', justifyContent:'center'}}>
                            This routine does 
                            not exist please enter a valid url
                        </div>
                    </div>
                </div>
            }</div>
        }</div>
        }</div> 
    );
}

export default NewTodo;

if (document.getElementById('todolist')) {
    ReactDOM.render(<TodoList />, document.getElementById('todolist'));
}
