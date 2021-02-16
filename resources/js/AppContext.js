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
    const [acts, setActs] = useState([]); //The acts for the sidebar (Login, AppContext get())

    const [completion, setCompletion] = useState(0); //The state of the progress bar
    const [bgC, setBgC] = useState('#2FA360'); //The color of the progress bar (Only on nav,todolist,login,userpanel)
    const [sbgC, setsBgC] = useState('#008000'); //The color of the 2nd progress bar

    const [loaded, setLoaded] = useState(false);
    const [loaded2, setLoaded2] = useState(false);
    const [loaded3, setLoaded3] = useState(true); //If the day restarts and we reset the tasks
    const [loadedActs ,setLoadedActs] = useState(false); //If the acts loaded

    const loadPathSecond = () => {
        axios.post('http://127.0.0.1:8000/api/auth/me').then(res => {
            setUser({
                email: res.data.email, username:res.data.username, 
                id: res.data.id, current_todolist: res.data.current_todolist, points:res.data.points,
                current_time: res.data.current_time
            });

            axios.post('http://localhost:8000/api/auth/acts', { //Getting the acts for the sidebar
                id: res.data.id,
                number: 10
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

    const loadPathSecond2 = () => {
        axios.post('http://127.0.0.1:8000/api/auth/me').then(user => { 

            //The User Info
            setUser({
                email: user.data.email, username:user.data.username, 
                id: user.data.id, current_todolist: user.data.current_todolist, points:user.data.points,
                current_time: user.data.current_time
            });

            axios.post('http://127.0.0.1:8000/api/auth/loginActsLists', {id: user.data.id}).then(res => {

                //The Lists
                setTasksList([...res.data[0]]);

                //Setting the active list the user is completing
                res.data[0].forEach(list => {
                    if(list.id === user.data.current_todolist)
                        setMainTaskList({...list})
                })

                //The Acts
                setActs([...res.data[1]]);
                
                //Setting the Color of the Nav Bar (only if the tasks aren't reset) (!resets as we only need color if we don't need to reset otherwise everything will be grey default)
                if(!res.data[3]){
                    let done = 0
                    res.data[2].forEach(t => {
                        if(t.completed === 0){
                            done++;
                        }
                    });
                    let percent = done/res.data[2].length * 100;
                    setCompletion(percent);
    
                    if(percent >= 0 && percent < 100){
                        setBgC('#2FA360');
                        setsBgC('green');
                    }
                    else {
                        setBgC('#edce44');    
                        setsBgC('yellow');
                    }
                }

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
        
        loadPathSecond2();

    }, []);

    return(
        <div>{!loaded || !loaded2 || !loaded3 || !loadedActs ? 
            <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'90vh'}}>
                <Spinner color="dark" />
            </div>
                :
            <AppContext.Provider value={{
                loadPathSecond,
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