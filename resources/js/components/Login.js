import Axios from 'axios';
import '../../css/components.css';
import React, {useState,useContext} from 'react';
import {Link} from 'react-router-dom';
import {Spinner} from 'reactstrap';
import cookie from 'js-cookie'; import {AppContext} from '../AppContext';

export default function Login(props) {
    const {
        setUser, setLoggedIn, setTasksList, 
        setMainTaskList, setCompletion, 
        setBgC, setsBgC, setActs
    } = useContext(AppContext);

    const [loaded, setLoaded] = useState(true); //Only in the catch as you go to userpage after loading
    const [loginInfo, setLoginInfo] = useState({
        email:'', password: '', errors: {}
    }); //Login Info
      
    const handleOnChange = event => {
        const { name, value } = event.target;
        setLoginInfo({ ...loginInfo, [name]: value });
    }; //Handles the login input fields

    const handleForm = (e) => {
        e.preventDefault();

        setLoaded(false);
        
        const data = {
            email:loginInfo.email, 
            password:loginInfo.password
        };

        setLoaded(false);

        Axios.post('http://localhost:8000/api/auth/login', data)
<<<<<<< HEAD
        .then(userRes => {
            cookie.set('token', userRes.data.access_token);
            let token = cookie.get('token');
            Axios.defaults.headers.common["Authorization"] = `Bearer${token}`;
            setUser({...userRes.data.user}); //The user detail (username, email, etc)

            Axios.post('http://localhost:8000/api/auth/loginHelper', {id: userRes.data.user.id})
            .then(actsListsRes => {

                //The Lists
                setTasksList([...actsListsRes.data[0]]);

                //Setting the active list the user is completing
                actsListsRes.data[0].forEach(list => {
                    if(list.id === userRes.data.user.current_todolist)
                        setMainTaskList({...list})
=======
            .then(userRes => {
                cookie.set('token', userRes.data.access_token);
                Axios.post('http://localhost:8000/api/auth/getTime', {
                    id:userRes.data.user.id
                })
                .then(time => {
                    //The Time stuff
                    if(time.data == "Reset"){ //We know tasks will be all incomplete and thus we don't have to fill in the colors
                        console.log('reset login')
                        axios.post('http://localhost:8000/api/auth/task/tasksRestart', {
                            user_id: userRes.data.user.id,
                            completed: 1
                        }).then(tasksRestartRes => {
                            Axios.post('http://localhost:8000/api/auth/todolist', {id:userRes.data.user.id})
                            .then(response => {
                                setTasksList([...response.data]);
                                setUser({...userRes.data.user});

                                //Getting the acts for the sidebar
                                axios.post('http://localhost:8000/api/auth/acts', { 
                                id: userRes.data.id,
                                number: 10
                                }).then(res => {
                                    //Setting Logged in
                                    setLoggedIn(true);
                                    props.history.push('/profile');
                                })
                            });
                        })
                        
                    } else { //Tasks may be done and we need colors
                        console.log('No Reset Needed Login')
                        Axios.post('http://localhost:8000/api/auth/todolist', {id:userRes.data.user.id})
                        .then(response => {
                                setTasksList([...response.data]);
                                setUser({...userRes.data.user});
                                response.data.forEach(l => {
                                    if(l.id === userRes.data.user.current_todolist){
                                        setMainTaskList({...l});
                                        axios.post(`http://127.0.0.1:8000/api/auth/tasks`,{
                                            id: userRes.data.user.current_todolist
                                        }).then(tasksRes => {
                                            let done = 0;
                                            tasksRes.data.forEach(t => {
                                                if(t.completed === 0){
                                                    done++;
                                                }
                                            });
                                            let percent = done/tasksRes.data.length * 100;
                                            setCompletion(percent);
        
                                            if(percent >= 75 && percent < 100){
                                                setBgC('#2FA360');
                                                setsBgC('green');
                                            }
                                            else if(percent < 75){
                                                setBgC('black');
                                                setsBgC('grey');
                                            }
                                            else if (percent >= 100){
                                                setBgC('#edce44');    
                                                setsBgC('yellow');
                                            }
                                            //Setting Login
                                            setLoggedIn(true);
                                            props.history.push('/profile');
                                        })
                                    } else {
                                        //Setting Login
                                        setLoggedIn(true);
                                        props.history.push('/profile');
                                    }
                                });
                            })
                    }                 
>>>>>>> f0131deaa37ece93267df05f4e09094a8aded98d
                })

                //The Acts
                setActs([...actsListsRes.data[1]]);
                
                //Setting the Color of the Nav Bar (only if the tasks aren't reset or maintask is null) (!resets as we only need color if we don't need to reset otherwise everything will be grey default)
                if(!actsListsRes.data[3] && actsListsRes.data[2] !== null){
                    let done = 0
                    actsListsRes.data[2].forEach(t => {
                        if(t.completed === 0){
                            done++;
                        }
                    });
                    let percent = done/actsListsRes.data[2].length * 100;
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
                props.history.push('/userpanel');
            })
<<<<<<< HEAD
        }).catch(e => {
            setLoaded(true);
            alert("Incorrect Login");
            setLoginInfo({...loginInfo, errors: e.response.data});
        })   
    }
=======
            .catch(e => {
                setLoaded(true);
                alert("Incorrect Login");
                setLoginInfo({...loginInfo, errors: e.response.data});
            });
    };
>>>>>>> f0131deaa37ece93267df05f4e09094a8aded98d

    const handleForm2 = (e) => {
        e.preventDefault();

        setLoaded(false);
        
        const data = {
            email:loginInfo.email, 
            password:loginInfo.password
        };

        Axios.post('http://localhost:8000/api/auth/login', data)
        .then(userRes => {
            cookie.set('token', userRes.data.access_token);
            setUser({...userRes.data.user}); //The user detail (username, email, etc)

            Axios.post('http://localhost:8000/api/auth/loginActsLists', {id: userRes.data.user.id})
            .then(actsListsRes => {

                //The Lists
                setTasksList([...actsListsRes.data[0]]);

                //Setting the active list the user is completing
                actsListsRes.data[0].forEach(list => {
                    if(list.id === userRes.data.user.current_todolist)
                        setMainTaskList({...list})
                })

                //The Acts
                setActs([...actsListsRes.data[1]]);
                
                //Setting the Color of the Nav Bar (only if the tasks aren't reset) (!resets as we only need color if we don't need to reset otherwise everything will be grey default)
                if(!actsListsRes.data[3]){
                    let done = 0
                    actsListsRes.data[2].forEach(t => {
                        if(t.completed === 0){
                            done++;
                        }
                    });
                    let percent = done/actsListsRes.data[2].length * 100;
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
                props.history.push('/userpanel');
            })
        }).catch(e => {
            setLoaded(true);
            alert("Incorrect Login");
            setLoginInfo({...loginInfo, errors: e.response.data});
        })   
    }

    return (
        <div>{!loaded ? 

            <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'90vh'}}>
                <Spinner />
            </div>

                :

            <div className="flex">
                <div className="signUpForm">
                    <form onSubmit={handleForm2}>
                        <h1 style={{marginTop:'90px'}}>Login</h1>
                        <div style={{fontSize:'18px'}}>Email</div>
                        <input 
                            className="signUpInput"
                            type="email" 
                            name="email" 
                            value={loginInfo.email}
                            onChange={handleOnChange}
                        />
                        <div style={{fontSize:'18px'}}>Password</div>
                        <input 
                            className="signUpInput"
                            type="password" 
                            name="password" 
                            value={loginInfo.password}
                            onChange={handleOnChange}
                        />
                        <div/>
                        <input className="BtnSuccess"
                            type="submit" value="Login"/>
                        <Link style={{
                            margin:'0px 0px 0px 20px',
                            fontSize:'16px'
                        }}
                            to="/Register"
                        >
                            Register
                        </Link>
                    </form> 
                </div>
            </div>
        }</div>
    )
}
