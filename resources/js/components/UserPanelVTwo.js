import React, {useContext, useEffect, useState} from 'react';
import '../../css/componentsVTwo.css';
import {AppContext} from '../AppContext';
import axios from 'axios';
import {Spinner} from 'reactstrap';
import TodoList from './TodoList';
import UserPanel from './Userpanel';
import SideBar from './SideBar';

export default function UserPanelVTwo(props) {
    const {user, tasksList, setMainTaskList} = useContext(AppContext);
    const [rightLoaded, setRightLoaded] = useState(false);
    /* const [acts, setActs] = useState([]);  */
    const [topTasksList, setTopTasksList] = useState({}); // The one tasklist at the top of the hr
    const [bottomTasksList, setBottomTasksList] = useState([]); //The tasklists that are at the bottom of the hr
    useEffect(() => {
        tasksList.forEach(list => {
            if(list.id === user.current_todolist){
                setTopTasksList({...list})
            } else {
                setBottomTasksList([...bottomTasksList, list])
            }
        })
/*         axios.post('http://localhost:8000/api/auth/acts', {
            id: user.id,
        }).then(res => {
            setActs([...res.data])
        }) */
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
                    <SideBar/>
                </div>
                <div className="grid2">
                    <div>
                        <TodoList urlId={props.match.params.id} />
                    </div>
                </div>
            </div>
        }</div>
    )
}


