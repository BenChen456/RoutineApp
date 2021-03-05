import React, { useState, createContext, useEffect } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken'; import cookie from 'js-cookie';
import { ContextDevTool } from 'react-context-devtool';
import {Spinner} from 'reactstrap';

export const AppContext = createContext();

export const AppProvider = (props) => {
    const jwt_token = process.env.MIX_JWT_SECRET;
    const [loggedIn, setLoggedIn] = useState(false);

    const [user, setUser] = useState({});
    const [tasksList, setTasksList] = useState([]); //All the tasklists
    const [mainTaskList, setMainTaskList] = useState({}); //Gets the tasklist you are completeing rn
    const [acts, setActs] = useState([]); //The acts for the sidebar (Login, AppContext get())
    const [mainTasks, setMainTasks] = useState([]); //The tasks for the tasklist currently
    const [contextTasks, setContextTasks] = useState([]); //The tasks for this user
    const [routines, setRoutines] = useState([]); // {[{list:list, tasks:[]}]}
    const [topTasksList, setTopTasksList] = useState({}); // The one tasklist at the top of the hr
    const [bottomTasksList, setBottomTasksList] = useState([]); //The tasklists that are at the bottom of the hr

    const [bgC, setBgC] = useState('#2FA360'); //The color of the progress bar (Only on nav,todolist,login,userpanel,newtodo)
    const [sbgC, setsBgC] = useState('#008000'); //The color of the 2nd progress bar

    const [loaded, setLoaded] = useState(false);
    const [loaded2, setLoaded2] = useState(false);
    const [loaded3, setLoaded3] = useState(true); //If the day restarts and we reset the tasks
    const [loadedActs ,setLoadedActs] = useState(false); //If the acts loaded

    const loadPath = () => {
        axios.post('http://127.0.0.1:8000/api/auth/me').then(user => { 

            //The User Info
            setUser({
                email: user.data.email, username:user.data.username, 
                id: user.data.id, current_todolist: user.data.current_todolist, points:user.data.points,
                current_time: user.data.current_time
            });

            axios.post('http://127.0.0.1:8000/api/auth/loginHelper', {id: user.data.id}).then(res => {

                //The Lists
                setTasksList([...res.data[0]]);

                //Setting the active list the user is completing
                let mTaskList = null;
                res.data[0].forEach(list => {
                    if(list.id === user.data.current_todolist){
                        mTaskList = {...list};
                        setMainTaskList({...list})
                    }
                })
                let btmList = [];
                res.data[0].forEach(list => {
                    if(list.id === user.data.current_todolist){
                        setTopTasksList({...list})
                    } else {
                        btmList.push(list)
                    }
                })
                setBottomTasksList(btmList);

                //The Acts
                setActs([...res.data[1]]);
                
                //The Routines
                let index = 0;
                var tasksAndLists = [];
                res.data[0].forEach(list => {
                    if(user.data.current_todolist === list.id){
                        setMainTaskList({...mTaskList, tasks:[...res.data[4][0+index]]})
                    }
                    tasksAndLists = [...tasksAndLists, {list:list, tasks: [...res.data[4][0+index]]}]
                    index++;
                });
                setRoutines([...tasksAndLists]);
                /* console.log(tasksAndLists) */

                setLoggedIn(true);
                setLoaded(true); 
                setLoaded2(true);
                setLoaded3(true);
                setLoadedActs(true);
            })
        }).catch(e => {
            console.log(e)
            setUser({}); setLoggedIn(false);
            setLoaded(true);
            setLoaded2(true);
            setLoaded3(true);
            setLoadedActs(true);
        })  
    }
    //How are these two routes setting routine when I don't have it set routine????
    const setRoutinesListNameHelper = (listId, listName) => {
        let listIndex = routines.findIndex(r => r.list.id === listId);
        let routinesCopy = [...routines];
        routinesCopy[listIndex].list.name = listName;

        /* console.log(routinesCopy); */
        setRoutines(routinesCopy);
    };
    const setRoutinesTasksHelper = (listId, tasks) => {
        let listIndex = routines.findIndex(r => r.list.id === listId);
        let routinesCopy = [...routines];
        routinesCopy[listIndex].tasks = [...tasks];

        /* console.log(routinesCopy) */
        setRoutines(routinesCopy);
    }

    useEffect(() => {
        
        let token = cookie.get('token');
        axios.defaults.headers.common["Authorization"] = `Bearer${token}`;
        jwt.verify(token, jwt_token, function(err, decoded){
            if(err){
                cookie.remove('token');
                token = null;
            } else {
                if(decoded.iss !== 'http://localhost:8000/api/auth/login'){
                    cookie.remove('token');
                    token = null;
                    /* console.log('iss fialed') */
                }
            }
        }) //Verify The Token
        
        loadPath();

    }, []);
    useEffect(() => {
        if(mainTaskList === undefined) return;
        routines.forEach(r => {
            if(r.list.id === mainTaskList.id){
                setMainTaskList({...r.list, tasks: [...r.tasks]})
            }
        })
    }, [routines])

    return(
        <div>{!loaded || !loaded2 || !loaded3 || !loadedActs ? 
            <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'90vh'}}>
                <Spinner color="dark" />
            </div>
                :
            <AppContext.Provider value={{
                loadPath, 
                setRoutinesListNameHelper, //NewTodo
                setRoutinesTasksHelper, //NewTodo Todolist
                contextTasks, setContextTasks,
                topTasksList, setTopTasksList,
                bottomTasksList, setBottomTasksList,
                tasksList, setTasksList, 
                loggedIn, setLoggedIn,
                user, setUser,
                mainTaskList, setMainTaskList,
                routines, setRoutines,
                mainTasks,setMainTasks,
                bgC, setBgC,
                sbgC, setsBgC,
                acts, setActs
            }}>
            <ContextDevTool context={AppContext} 
            id="uniqContextId" 
            displayName="Context" />
                {props.children}
            </AppContext.Provider>
        }</div>
    );
}