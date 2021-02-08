import Axios from 'axios';
import '../../css/components.css';
import React, {useState,useContext} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'js-cookie'; import {AppContext} from '../AppContext';

export default function Login(props) {
    const {
        setUser, setLoggedIn, setTasksList, 
        setMainTaskList, setCompletion, 
        setBgC, setsBgC
    } = useContext(AppContext);
    const [loginInfo, setLoginInfo] = useState({
        email:'', password: '', errors: {}
    }); //Login Info
      
    const handleOnChange = event => {
        const { name, value } = event.target;
        setLoginInfo({ ...loginInfo, [name]: value });
    }; //Handles the login input fields

    const handleForm = (e) => {
        e.preventDefault();
        const data = {
            email:loginInfo.email, 
            password:loginInfo.password
        };
        Axios.post('http://localhost:8000/api/auth/login', data)
            .then(userRes => {
                cookie.set('token', userRes.data.access_token);
                Axios.post('http://localhost:8000/api/auth/getTime', {id:userRes.data.user.id})
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
                            });
                            setLoggedIn(true);
                            props.history.push('/profile');
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
                })
            })
            .catch(e => {
                alert("Incorrect Login");
                setLoginInfo({...loginInfo, errors: e.response.data})
            });
    };

    return (
        <div>
            <div className="flex">
                <div className="signUpForm">
                    <form onSubmit={handleForm}>
                        <h1 style={{marginTop:'90px'}}>Login</h1>
                        <div>Email</div>
                        <input 
                            className="signUpInput"
                            type="email" 
                            name="email" 
                            value={loginInfo.email}
                            onChange={handleOnChange}
                        />
                        <div>Password</div>
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
        </div>
    )
}
