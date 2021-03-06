import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from '../AppContext';
import axios from 'axios';
import {Spinner} from 'reactstrap';
import SideBar from './SideBar';
import RoutineBlock from './Userpanel/RoutineBlock';

export default function UserPanel(props) {
    const {
            user,
            setMainTaskList, mainTaskList,
            routines, setRoutines,
        } = useContext(AppContext);

    const max = 10; //Max of 10 lists only
    const [name, setName] = useState(''); //The name of the new list you are making at the bot

    const [rightLoaded, setRightLoaded] = useState(false);
    const [loaded, setLoaded] = useState(false);
    
    useEffect(() => {
        /* console.log(routines) */
        setRightLoaded(true);
        setLoaded(true);
    }, [])
    const onName = (e) => {setName(e.target.value)};

    const todoSetBtn = (id) => {
        setRightLoaded(false);
        axios.post('http://localhost:8000/api/auth/update', {
            current_todolist: id,
        })
            if(id === null) /* If we are removing an item */  {
                setMainTaskList({});
                setRightLoaded(true);
            } else /* Picking a new item */ {

                routines.forEach(r => {
                    if(r.list.id === id){
                        setMainTaskList({
                            completed: r.list.completed,
                            id:  r.list.id,
                            name: r.list.name,
                            streak: r.list.streak,
                            tasks: [...r.tasks]
                        });
                    }
                })

                setRightLoaded(true);
            }
            
    } //To set the todolist as the main one and push it to the top
    const log = (id) => {
        console.log(mainTaskList)
    }
    const addNewList = () => {
        if(name === '' || name===" ")
            return alert('Name can not be empty')
        if(name.length > 20)
            return alert('Name can be a maxium of 20 characters long')

        setLoaded(false);
        axios.post('http://localhost:8000/api/auth/todolist/todolistStore', {
            user_id: user.id,
            name: name
        }).then(res => {
            setRoutines([...routines, {
                list: {
                    completed: 1,
                    id: res.data,
                    name: name,
                    streak: 0,
                    user_id: user.id
                },
                tasks: []
            }])
            setName('');
            setLoaded(true);
        }).catch(e => alert('Error in creating name'))
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
                    {/* <button onClick={()=>console.log(mainTaskList)}>
                    tasklists for page</button> */}
                </div>
                <div className="grid2">
                    <div className="todoListFeed" style={{marginTop:'-20px'}}>
                        <div className="todoListFeedContainer userpanelContainer">{
                            mainTaskList.id === undefined ?
                            <div style={{display:'center', alignContent:'center', fontSize:'25px'}}>
                                All Done!
                            </div> 
                                :
                            
                            <div style={{width:'100%', marginBottom:'30px'}}>
                                <RoutineBlock list={{
                                    completed: mainTaskList.completed,
                                    id: mainTaskList.id,
                                    name: mainTaskList.name,
                                    streak: mainTaskList.streak
                                }} 
                                    tasks={mainTaskList.tasks} props={props} 
                                    todoSetBtn={todoSetBtn}
                                />
                            </div>
                        }</div>
                        <div style={{display:'flex', width:'100%', justifyContent:'center'}}>

        {/* HR Line */}        <div style={{background:'grey', width:'95%', height:'1px'}}></div>

                        </div>
                        <div style={{width:'100%', height:'60vh', overflow:'auto'}}>
                            {routines.map(r =>
                                <div key={r.list.id}>{r.list.id === mainTaskList.id ?
                                    null 
                                        :
                                    <RoutineBlock list={r.list} 
                                        tasks={r.tasks} props={props} 
                                        todoSetBtn={todoSetBtn}
                                    />
                                }</div>
                            )}
                            
                            <div style={{
                                display:'flex',justifyContent:'center',width:'100%',marginTop:'25px'
                            }}>
                                {/* Add New List */}
                                {routines.length >= max ? null :
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
