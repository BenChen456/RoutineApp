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
    const [mainTasks, setMainTasks] = useState([]); //The tasks for the tasklist currently {...list, tasks:[]}
    const [contextTasks, setContextTasks] = useState([]); //The tasks for this user
    const [routines, setRoutines] = useState([]); // {[{list:list, tasks:[]}]}
    const [topTasksList, setTopTasksList] = useState({}); // The one tasklist at the top of the hr
    
    const [loaded, setLoaded] = useState(false);
    const [loaded2, setLoaded2] = useState(false);
    const [loaded3, setLoaded3] = useState(true); //If the day restarts and we reset the tasks
    const [loadedActs ,setLoadedActs] = useState(false); //If the acts loaded
    
    const [userThemes, setUserThemes] = useState({
        filled: false,
        themes : [
            {
                name:'Default', main_color:'#2FA360',done_color:'#edce44',text_color:'white',
                id:1,fk_user_id:user.id,theme_id:1,points:0
            }
        ]
    }); //The owned themes by the current user (ThemesStore and Profile)
    const [themes, setThemes] = useState([
        {
            name:'Default', main_color:'#2FA360',done_color:'#edce44',text_color:'white',
            id:1,fk_user_id:user.id,theme_id:1,points:0
        },
        {
            name:'Ocean', main_color:'#35aef0',done_color:'#21a8af',text_color:'white',
            id:2,fk_user_id:user.id,theme_id:2,points:100
        },
        {
            name:'Sunset', main_color:'#ffaf11',done_color:'#cc1111',text_color:'white',
            id:2,fk_user_id:user.id,theme_id:3,points:300
        },
    ]) // Full of themes objects // (ThemesStore)
    
    const loadPath = () => {
        axios.post('/api/auth/me').then(user => { 

            //The User Info
            setUser({...user.data});
            
            axios.post('/api/auth/loginHelper', {id: user.data.id}).then(res => {

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
                /* console.log('verify fail') */
            } else { /* http://localhost:8000/ */
                if(/* decoded.iss != 'http://routineapp2ndpart.herokuapp.com/api/auth/login' &&  */
                decoded.iss != 'https://routineapp2ndpart.herokuapp.com/api/auth/login'){
                    cookie.remove('token');
                    token = null;
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
                tasksList, setTasksList, 
                loggedIn, setLoggedIn,
                user, setUser,
                userThemes, setUserThemes,
                themes, setThemes,
                mainTaskList, setMainTaskList,
                routines, setRoutines,
                mainTasks,setMainTasks,
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