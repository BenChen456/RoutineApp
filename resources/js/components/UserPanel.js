import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from '../AppContext';
import axios from 'axios';
import {Spinner} from 'reactstrap';
import SideBar from './SideBar';

export default function UserPanel(props) {
    const {
            user, tasksList, setMainTaskList, setTasksList, 
            setCompletion, setBgC, setsBgC,
            bottomTasksList,topTasksList,
            setTopTasksList,setBottomTasksList,
            contextTasks
        } = useContext(AppContext);

    const max = 10; //Max of 8 lists only
/*     const [topTasksList, setTopTasksList] = useState({}); // The one tasklist at the top of the hr
    const [bottomTasksList, setBottomTasksList] = useState([]); //The tasklists that are at the bottom of the hr */
    const [name, setName] = useState(''); //The name of the new list you are making at the bot
        
    const [rightLoaded, setRightLoaded] = useState(false);
    const [loaded, setLoaded] = useState(false);
    
    useEffect(() => {
        setRightLoaded(true);
        setLoaded(true);
    }, [])
    const onName = (e) => {setName(e.target.value)};

    const toTodo = (todoId) =>{
        props.history.push(`/edit/${todoId}`);
    } //To the todo list page
    const todoSetBtn = (id) => {
        setRightLoaded(false);
        axios.post('http://localhost:8000/api/auth/update', {
            current_todolist: id,
        })/* .then(res => { */
            if(id === null) /* If we are removing an item */  {
                setBottomTasksList([...bottomTasksList, topTasksList])
                setTopTasksList({});
                setMainTaskList({});
                setCompletion(0);
                setRightLoaded(true);
            } else /* Picking a new item */ {
                let testBot = [...bottomTasksList];
                let index = testBot.findIndex(list => list.id === id);

                //This is to put the toplist into the bottom but only if there is a top list so if the top list empty we put nothing here
                    let final = null;
                    if(topTasksList.id === undefined){
                        final = testBot.splice(index, 1);
                    } else {
                        final = testBot.splice(index, 1, {...topTasksList});
                    }

                //Setting the progress bar
                    let tasks = [];  
                    contextTasks.forEach(t => {
                        if(t.todolist_id === id)
                            tasks.push(t);
                    })  

                    let done = 0;
                    tasks.forEach(t => {
                        if(t.completed === 0){
                                done++;
                            }
                        });
                        
                    let percent = 0;
                    if(done !== 0) {
                        percent = done/tasks.length * 100;
                    }
                    setCompletion(percent);

                    if(percent >= 0 && percent < 100){
                        setBgC('#2FA360');
                        setsBgC('green');
                    }
                    else{
                        setBgC('#edce44');    
                        setsBgC('yellow');
                    }

                    
                    //Setting the lists on the page
                    setBottomTasksList([...testBot]);
                    setMainTaskList({...final[0]});
                    setTopTasksList({...final[0]});

                    setRightLoaded(true);
            }
        /* }) */
    } //To set the todolist as the main one and push it to the top
    const addNewList = () => {
        setLoaded(false);
        axios.post('http://localhost:8000/api/auth/todolist/todolistStore', {
            user_id: user.id,
            name: name
        }).then(res => {
            setBottomTasksList([...bottomTasksList, {
                id: res.data,
                name: name,
                user_id: user.id,
                streak: 0
            }]);
            setTasksList([...tasksList, {
                id: res.data,
                name: name,
                user_id: user.id,
                streak: 0
            }]); 
            setName('');
            setLoaded(true);
        })
    };

    return (
        <div>{!rightLoaded || !loaded? 
            <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'90vh'}}>
                <Spinner />
            </div>
                :
            <div className="todoListsContainer">
                <div className="grid1">
                    <SideBar />
{/*                     <button onClick={()=>console.log(topTasksList, bottomTasksList)}>
                    tasklists for page</button> */}
                </div>
                <div className="grid2">
                    <div className="todoListFeed" style={{marginTop:'-20px'}}>
                        <div className="todoListFeedContainer userpanelContainer">{
                            topTasksList.id === undefined ?
                            <div style={{display:'center', alignContent:'center', fontSize:'25px'}}>
                                All Done!
                            </div> 
                                :
                            <div className="todoListBar">
                                <div className="todoName"
                                    onClick={()=>toTodo(topTasksList.id)}
                                >
                                    {topTasksList.name}
                                </div>
                                <div onClick={()=>toTodo(topTasksList.id)}></div>
                                <div className="todoSetBtn"
                                    onClick={()=>todoSetBtn(null)}
                                >
                                    In Progress
                                </div>
                            </div>
                        }</div>
                        <div style={{display:'flex', width:'100%', justifyContent:'center'}}>
        {/* HR Line */}        <div style={{background:'grey', width:'95%', height:'1px'}}></div>
                        </div>
                        <div style={{width:'100%', height:'60vh', overflow:'auto'}}>
                            {bottomTasksList.map(list => 
                                <div key={list.id} 
                                    style={{
                                        display:'flex', justifyContent:'center', width:'100%',
                                        marginTop:'25px'
                                }}>
                                    <div className="todoListBar">
                                        <div className="todoName" onClick={()=>toTodo(list.id)}>
                                            {list.name}
                                        </div>
                                        <div onClick={()=>toTodo(list.id)}></div>
                                        <div className="todoSetBtn"
                                            onClick={()=>todoSetBtn(list.id)}
                                        >
                                            Set As Current
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div 
                                style={{
                                    display:'flex', justifyContent:'center', width:'100%',
                                    marginTop:'25px'
                            }}>
                                {/* Add New List */}
                                {tasksList.length >= max ? null :
                                <div style={{
                                        width:'93%', height: '140px', 
                                        borderRadius: '3px',
                                        display: 'flex'
                                }}>

                                    <div style={{height:'100%', display:'flex', 
                                        margin:'0px 0px 0px 25px',
                                        alignItems:'center', justifyContent:'center'
                                    }}>
                                        <svg onClick={()=>addNewList()} id="hoverGreen" xmlns="http://www.w3.org/2000/svg" width="75" height="75" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                        </svg>
                                    </div>

                                    <div style={{
                                        display:'flex', justifyContent:'center', alignItems:'center',
                                        width:'400px', height:'100%'
                                    }}>
                                        <div style={{marginRight:'20px', fontSize:'17px'}}>
                                            Name
                                        </div>
                                        <input type="text" onChange={onName}  value={name}
                                            style={{
                                                height:'50px', width:'70%', fontSize:'15px',
                                                padding:'0px 15px'
                                        }}/>
                                        <div style={{fontSize:'16px', marginLeft:'20px'}}>
                                            Max of {max} routines
                                        </div>
                                    </div>

                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }</div>
    )
}
