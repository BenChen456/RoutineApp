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
        setBgC, setsBgC, setActs, setContextTasks,
        setRoutines, routines,
        setTopTasksList,setBottomTasksList
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
        setLoaded(false); /* http://localhost:8000 */
        Axios.post('/api/auth/login', data)
        .then(userRes => {
            cookie.set('token', userRes.data.access_token);
            let token = cookie.get('token');
            Axios.defaults.headers.common["Authorization"] = `Bearer${token}`;
            setUser({...userRes.data.user}); //The user detail (username, email, etc)

            Axios.post('/api/auth/loginHelper', {id: userRes.data.user.id})
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

                //The Routines
                    let index = 0;
                    var tasksAndLists = [];
                    actsListsRes.data[0].forEach(list => {
                        tasksAndLists = [...tasksAndLists, {list:list, tasks: [...actsListsRes.data[4][0+index]]}]
                        index++;
                    });
                    setRoutines([...tasksAndLists]);
                    console.log(tasksAndLists)
                
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
                    <form onSubmit={handleForm}>
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
