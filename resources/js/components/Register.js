import React, {useState, useContext} from 'react';
import '../../css/components.css';
import Axios from 'axios'; import {Link} from 'react-router-dom';
import cookie from 'js-cookie';
import {AppContext} from '../AppContext';

export default function Register(props) {
    const {setUser, setLoggedIn} = useContext(AppContext);
    const [loginInfo, setLoginInfo] = useState({
        email:'', username: '', password: '', passwordC:'', errors: {}
    }); //Login Info

    const handleOnChange = event => {
        const { name, value } = event.target;
        setLoginInfo({ ...loginInfo, [name]: value });
    }; //Handles the login input fields

    const handleForm = (e) => {
        e.preventDefault();

        //Password Checking
        if(loginInfo.password !== loginInfo.passwordC){
            return alert("Passwords Do Not Match")
        }
        if(loginInfo.password === '' || loginInfo.password === ' '){
            return alert("Password is empty")
        }
        if(loginInfo.password.length < 8){
            return alert("Password has to be at least 8 characters long")
        }

        let hasCapOrSpecialChar = false; //Uppercase
        for (var i = 0; i < loginInfo.password.length; i++) {
            if(loginInfo.password[i].toUpperCase() === loginInfo.password[i])
                hasCapOrSpecialChar = true;
        }
        
        if(!hasCapOrSpecialChar){
            return alert('Please include one capital or special character in password')
        }

        axios.post('http://localhost:8000/api/auth/getTime', {status:'today'}).then(res => {
            console.log(res.data)
            Axios.post('http://localhost:8000/api/auth/register', {
                email:loginInfo.email, 
                username: loginInfo.username,
                password:loginInfo.password,
                current_time: res.data
            })
                .then(res => {
                    cookie.set('token', res.data.access_token);
                    console.log(res.data.user)
                    setUser({...res.data.user});
                    setLoggedIn(true);
                    props.history.push('/profile');
                })
                .catch(e => {
                    alert('Error: Please enter all fields')
                    setLoginInfo({...loginInfo, errors: e.response.data})
                })
        })
    };

    return (
        <div>
            <div className="flex">
                <div className="signUpForm">
                    <form onSubmit={handleForm}>
                        <h1 style={{marginTop:'30px'}}>Register</h1>
                        <div style={{fontSize:'18px'}}>
                            Email
                        </div>
                        <input 
                            className="signUpInput"
                            type="email" 
                            name="email" 
                            value={loginInfo.email}
                            onChange={handleOnChange}
                        />
                        <div style={{fontSize:'18px'}}>Name</div>
                        <input 
                            className="signUpInput"
                            type="name" 
                            name="username" 
                            value={loginInfo.username}
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
                        <div style={{margin:'-10px 0px 10px 0px', color:'#5e5f65',fontSize:'16px'}}>
                            Password must be at least 8 characters long
                        </div>
                        <div style={{fontSize:'18px'}}>Confirm Password</div>
                        <input 
                            className="signUpInput"
                            type="password" 
                            name="passwordC" 
                            value={loginInfo.passwordC}
                            onChange={handleOnChange}
                        />
                        <div/>
                        <input 
                            className="BtnSuccess" 
                            type="submit" value="Submit"
                        />
                        <Link style={{
                            margin:'0px 0px 0px 20px',
                            fontSize:'16px'
                        }}
                            to="/login"
                        >
                            Login
                        </Link>
                    </form> 
                </div>
            </div>
        </div>
    )
}
