import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from '../AppContext';
import axios from 'axios';
import {Spinner} from 'reactstrap';
import SideBar from './SideBar';

export default function UserPanel(props) {
    const {user, tasksList, setMainTaskList} = useContext(AppContext);
    const [rightLoaded, setRightLoaded] = useState(false);
    const [topTasksList, setTopTasksList] = useState({}); // The one tasklist at the top of the hr
    const [bottomTasksList, setBottomTasksList] = useState([]); //The tasklists that are at the bottom of the hr
    useEffect(() => {
        tasksList.forEach(list => {
            if(list.id === user.current_todolist){
                setTopTasksList({...list})
            } else {
                console.log(user.current_todolist)
                console.log(list.id)
                setBottomTasksList([...bottomTasksList, list])
            }
        })
        setRightLoaded(true);
    }, [])

    const toTodo = (todoId) =>{
        props.history.push(`/todolist/edit/${todoId}`);
    } //To the todo list page

    const todoSetBtn = (id) => {
        setRightLoaded(false);
        axios.post('http://localhost:8000/api/auth/update', {
            current_todolist: id,
        }).then(res => {
            if(id === null) /* If we are removing an item */  {
                setBottomTasksList([...bottomTasksList, topTasksList])
                setTopTasksList({});
                setRightLoaded(true);
                setMainTaskList({});
            } else /* Picking a new item */ {
                let testBot = [...bottomTasksList];
                let index = testBot.findIndex(list => list.id === id);
                let final = testBot.splice(index, 1);
                setBottomTasksList([...testBot]);
                setMainTaskList({...final[0]});
                setTopTasksList({...final[0]});
            }
            setRightLoaded(true);
        })
    } //To set the todolist as the main one and push it to the top

    const info = () => {
        console.log(topTasksList)
        console.log(bottomTasksList)
    }

    return (
        <div>{!rightLoaded ? 
            <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'90vh'}}>
                <Spinner />
            </div>
                :
            <div className="todoListsContainer">
                <div className="grid1">
                    <SideBar />
                </div>
                <div className="grid2">
                    <div className="todoListFeed">
                        <div className="todoListFeedContainer">{
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
                        <div className="todoListFeedContainer">
                            {bottomTasksList.map(list => 
                                <div className="todoListBar" key={list.id}>
                                    <div className="todoName" onClick={()=>toTodo(list.id)}>
                                        {list.name}
                                    </div>
                                    <div onClick={()=>toTodo(list.id)}></div>
                                    <div className="todoSetBtn"
                                        onClick={()=>todoSetBtn(list.id)}
                                    >
                                        Set As Main
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        }</div>
    )
}
