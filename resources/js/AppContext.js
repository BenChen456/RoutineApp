import React, { useState, createContext, useEffect } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken'; import cookie from 'js-cookie';
import { ContextDevTool } from 'react-context-devtool';
import {Spinner} from 'reactstrap';

export const AppContext = createContext();

export const AppProvider = (props) => {
    /* const jwt_token = process.env.MIX_JWT_SECRET; */ 
    const jwt_token = 'XcukIEKxxsDEo9BCpSud1da1aiPq3uSUcwXAcq4L9JPbDhMRNOklMZE8Gdw1uj0z';
    const [loggedIn, setLoggedIn] = useState(false);

    const [user, setUser] = useState({});
    const [tasksList, setTasksList] = useState([]); //All the tasklists
    const [mainTaskList, setMainTaskList] = useState({}); //Gets the tasklist you are completeing rn
    
    const [completion, setCompletion] = useState(0); //The state of the progress bar
    const [bgC, setBgC] = useState('black'); //The color of the progress bar (Only on progressbar.js, todolist.js, login.js)
    const [sbgC, setsBgC] = useState('black'); //The color of the 2nd progress bar

    const [acts, setActs] = useState([]); //The acts for the sidebar
    
    const [loaded, setLoaded] = useState(false);
    const [loaded2, setLoaded2] = useState(false);
    const [loaded3, setLoaded3] = useState(false); //If the day restarts and we reset the tasks
    const [loadedActs ,setLoadedActs] = useState(false); //If the acts loaded



    /* We have an Issue of things loading for the first time and there are some requests that 
    dont Work. I think this is due to only the app context having the headers set on load but 
    IDK  */



    const loadMePath = () => {
        axios.post('http://localhost:8000/api/auth/getTime', {status:'today'}).then(time => {
            let cTime = time.data;
            axios.post('http://127.0.0.1:8000/api/auth/me').then((res) => {
                setUser({
                    email: res.data.email, username:res.data.username, 
                    id: res.data.id, current_todolist: res.data.current_todolist, points:res.data.points,
                    current_time: res.data.current_time
                });
                    axios.post('http://localhost:8000/api/auth/todolist', {id: res.data.id})
                    .then(response => {
                        response.data.forEach(list => {
                            if(list.id === res.data.current_todolist)
                                setMainTaskList(list) //Getting the tasklist being currently worked on
                                console.log(res.data.current_time)
                                console.log(cTime)
                            if(res.data.current_time == cTime){
                                axios.post('http://localhost:8000/api/auth/task/tasksRestart', {
                                    user_id: res.data.id,
                                    completed: 0 //Does this work? <++++++++
                                }).then(taskRestartRes => {
                                    axios.post('http://localhost:8000/api/auth/update',{
                                        current_time: cTime
                                    }).then(updateRes => {
                                        setLoaded3(true)
                                    })
                                })
                            } else {
                                setLoaded3(true)
                            }
                        })
                        setTasksList([...response.data])
                        setLoaded2(true);
                    })
                    .catch(e => {
                        setLoaded2(true)
                        setLoginInfo({...loginInfo, errors: e.response.data})
                    });
                setLoggedIn(true);
                setLoaded(true); //Loading
            }).catch(e => {
                setUser({}); setLoggedIn(false);
                console.log('UnAuth')
                setLoaded(true); //Loading
                setLoaded2(true);
                setLoaded3(true);
            }) //Get the user info and confirms you are logged in
        })
    };

    const loadPathSecond = () => {
        axios.post('http://127.0.0.1:8000/api/auth/me').then(res => {
            setUser({
                email: res.data.email, username:res.data.username, 
                id: res.data.id, current_todolist: res.data.current_todolist, points:res.data.points,
                current_time: res.data.current_time
            });

            axios.post('http://localhost:8000/api/auth/acts', { //Getting the acts for the sidebar
                id: res.data.id,
            }).then(res => {
                setActs([...res.data])
                setLoadedActs(true);
            })
            
            axios.post('http://localhost:8000/api/auth/getTime', {id:res.data.id}).then(time => {
                axios.post('http://localhost:8000/api/auth/todolist', {id: res.data.id})
                .then(response => {
                    response.data.forEach(list => {
                        if(list.id === res.data.current_todolist)
                            setMainTaskList(list) //Getting the tasklist being currently worked on
                            console.log(time.data);
                        if(time.data == "Reset"){
                            axios.post('http://localhost:8000/api/auth/task/tasksRestart', {
                                user_id: res.data.id,
                                completed: 1 
                            }).then(taskRestartRes => {
                                setLoaded3(true)
                            })
                        } else {
                            setLoaded3(true)
                        }
                    })
                    setTasksList([...response.data])
                    setLoaded2(true);
                })
                .catch(e => {
                    setLoaded2(true)
                    setLoginInfo({...loginInfo, errors: e.response.data})
                });
            });
            setLoggedIn(true);
            setLoaded(true); //Loading
        })
        //Get the user info and confirms you are logged in (ERRORS)
        .catch(e => {
            setUser({}); setLoggedIn(false);
            console.log('UnAuth')
            setLoaded(true); //Loading
            setLoaded2(true);
            setLoaded3(true);
            setLoadedActs(true);
        }) 
    }

    useEffect(() => {
        
        let token = cookie.get('token');
        axios.defaults.headers.common["Authorization"] = `Bearer${token}`;
        jwt.verify(token, jwt_token, function(err, decoded){
            if(err){
                cookie.remove('token');
                token = null;
                /* console.log('if failed') */
            } else {
                if(decoded.iss !== 'http://localhost:8000/api/auth/login'){
                    cookie.remove('token');
                    token = null;
                    /* console.log('iss fialed') */
                }
            }
        }) //Verify The Token
        
        loadPathSecond();

    }, []);

    return(
        <div>{!loaded || !loaded2 || !loaded3 || !loadedActs ? 
            <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'90vh'}}>
                <Spinner color="dark" />
            </div>
                :
            <AppContext.Provider value={{
                tasksList, setTasksList, 
                loggedIn, setLoggedIn,
                user, setUser,
                mainTaskList, setMainTaskList,
                completion, setCompletion,
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