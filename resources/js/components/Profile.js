import React, {useState, useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import {AppContext} from '../AppContext';
import axios from 'axios';
import cookie from 'js-cookie';

export default function Profile() {
    const {
        user, setUser,
        setTasksList, setMainTaskList, setActs,
        setLoggedIn,
    } = useContext(AppContext);
    const [loaded, setLoaded] = useState(true);
    const [userInfo, setUserInfo] = useState({
        username: '', id: null, email: ''
    }); //User info

    useEffect(() => {
        setUserInfo({...user});
    }, []);

    const handleForm = () => {
        setLoaded(false);
        axios.post('/api/auth/update', {
            username: userInfo.username,
            /* email:userInfo.email, */
        })
            .then(res => {
                setUserInfo({
                    username: userInfo.username
                })
                setUser({
                    username: userInfo.username
                })
                setLoaded(true);
            })
            .catch(e => console.log(e.response.data))
    }; //Submit Form
    const logOut = () => {
        cookie.remove('token');
        setLoggedIn(false); 
        setUser({});
        setTasksList([]);
        setMainTaskList({});
        setActs([]);
    }

    const handleOnChange = event => {
        const { name, value } = event.target;
        setUserInfo({ ...userInfo, [name]: value });
    }; //Handles the login input fields

    return (
        <div>
        {!loaded ?
            <div>Loading</div> 
                :
            <div className='gridProfile' style={{paddingTop:'7.5vh'}}>

                <div>
                    <Link className="sideBarItem" to="/profile" style={{textDecoration:'none',color:'black'}}>
                        Profile
                    </Link>
                    <Link className="sideBarItem" to="/profile_theme" style={{textDecoration:'none',color:'black'}}>
                        Theme
                    </Link>
                </div>

                {/* Divide */}

                <div className="mainBar">
                    <div style={{padding:'25px'}}>
                        <div style={{
                            fontSize:'25px', height: '50px',marginBottom: '20px',
                            borderBottom:'2px solid black'
                        }}>
                            Profile
                        </div>
{/*                         <div className="mainBarItemTi">Email</div>
                        <input 
                            className="mainBarItemIn" type="email" 
                            name="email" 
                            value={userInfo.email}
                            onChange={handleOnChange}
                        /> */}
                        <div className="mainBarItemTi">Username</div>
                        <input 
                            className="mainBarItemIn" type="username" 
                            name="username" 
                            value={userInfo.username}
                            onChange={handleOnChange}
                        />

                        <div style={{display:'flex'}}>
                            {userInfo.username !== user.username ?
                                <div className="notBtn" onClick={()=>handleForm()}
                                    style={{marginTop:'10px'
                                }}>
                                    Change
                                </div>
                                    :
                                <div className="notBtnGrey" style={{marginTop:'10px'}}>
                                    Change
                                </div>
                            }
                        </div>

                        <div style={{
                            fontSize:'25px', height: '50px',marginBottom: '20px',
                            borderBottom:'2px solid black', marginTop:'50px'
                        }}>
                            Log Out
                        </div>
                            <div className="logOutProfile" onClick={()=>logOut()}
                                style={{margin:'25px 0px 0px 0px'}}>
                                Log Out
                            </div>

                        </div>

                </div>
            </div>
        }    
        </div>
    )
}
