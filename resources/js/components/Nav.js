import React, {useContext} from 'react'; 
import '../../css/nav.css';
import {Link} from 'react-router-dom';
import {AppContext} from '../AppContext';
import cookie from 'js-cookie';

export default function Nav() {
    const {user, setUser, loggedIn, setLoggedIn,setTasksList, tasksList} = useContext(AppContext);
    
    const log = () => {
        console.log(user)
        console.log(loggedIn)
        console.log(tasksList)
    }
    const logOut = () => {
        cookie.remove('token');
        setLoggedIn(false); 
        setUser({});
        setTasksList([]);
    };
    return (
        <div style={{
            background:'#5c6bc0', color:'white', height:'7.5vh', width:'100%',
            display:'flex', alignItems:'center', justifyContent:'space-between',
            padding:'0px 40px 0px 40px'
        }}>
            <div>TodoList</div>
            <button onClick={()=>log()}>check</button>
            <button onClick={()=>logging()}>Loggin</button>
            {loggedIn ? 
                <div style={{display:'flex'}}>
                    <Link to="/userpanel" className="navItem">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" fill="white" className="bi bi-person-fill" viewBox="0 0 16 16">
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                            </svg>
                    </Link>
                    <Link to="/login" className="navItem" onClick={()=>logOut()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" fill="white" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                        <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                        </svg>
                    </Link>
                </div>
                    :
                <div>
                    <div style={{display:'flex'}}>
                        <Link to="/register" className="navItem">
                            <svg xmlns="http://www.w3.org/2000/svg" width="38px" height="38px" fill="white" className="bi bi-person-fill" viewBox="0 0 16 16">
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                            </svg>
                        </Link>
                    </div>
                </div>
            }
        </div>
    )
}
