import React, {useState, useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import '../../css/components.css';
import {AppContext} from '../AppContext';
import Axios from 'axios';

export default function Profile() {
    const {user, setUser} = useContext(AppContext);
    const [loaded, setLoaded] = useState(true);
    const [userInfo, setUserInfo] = useState({
        username: '', id: null, email: ''
    }); //User info

    useEffect(() => {
        setUserInfo({...user});
    }, []);

    const handleForm = () => {
        setLoaded(false);
        Axios.post('http://localhost:8000/api/auth/update', {
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

    const handleOnChange = event => {
        const { name, value } = event.target;
        setUserInfo({ ...userInfo, [name]: value });
    }; //Handles the login input fields

    return (
        <div>
        {!loaded ?
            <div>Loading</div> 
                :
            <div className='gridProfile'>
                <div className="sideBar">
                    <div>
                        <Link to="/profile" className="text-link" 
                            className="sideBarItem">
                            Profile
                        </Link>
                    </div>
                </div>
                <div className="mainBar">
                    <div className="mainBarMargins">
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
                        {userInfo.username !== user.username ?
                            <div className="notBtn" onClick={()=>handleForm()}
                                style={{marginTop:'10px'
                            }}>
                                Submit
                            </div>
                                :
                            <div className="notBtnGrey" style={{marginTop:'10px'}}>
                                Submit
                            </div>
                        }
                        </div>
                </div>
            </div>
        }    
        </div>
    )
} //442
