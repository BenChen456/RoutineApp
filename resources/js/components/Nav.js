import React, {useContext,useEffect} from 'react'; 
import '../../css/nav.css';
import {Link} from 'react-router-dom';
import {AppContext} from '../AppContext';

<<<<<<< HEAD
export default function Nav() {
<<<<<<< HEAD
=======
=======
export default function ProgressBar() {
>>>>>>> f0131deaa37ece93267df05f4e09094a8aded98d
>>>>>>> f70a2fc93fce0f32d1a29ad2467d501d1e6e35ea
    const {
        user, setUser, 
        loggedIn, setLoggedIn,
        setTasksList, tasksList, 
        mainTaskList, setMainTaskList,
        completion, setCompletion,
        bgC, setBgC,
<<<<<<< HEAD
        sbgC, setsBgC, 
        acts, setActs
=======
<<<<<<< HEAD
        sbgC, setsBgC, 
        acts, setActs
=======
        sbgC, setsBgC, acts
>>>>>>> f0131deaa37ece93267df05f4e09094a8aded98d
>>>>>>> f70a2fc93fce0f32d1a29ad2467d501d1e6e35ea
    } = useContext(AppContext);
    
    useEffect(() => {
        if(mainTaskList.id !== undefined){
            axios.post(`http://127.0.0.1:8000/api/auth/tasks`,{
                id: mainTaskList.id
            }).then(res => {
                    let done = 0;
                    res.data.forEach(t => {
                        if(t.completed == 0){
                            done++;
                        }
                    });
                    let points = done/res.data.length * 100;
                    setCompletion(done/res.data.length * 100); //Setting the amount of points
    
                    //Setting the color based on points
                        if(points >= 0 && points < 100){
                            setBgC('#2FA360');
                            setsBgC('green')
                        }
                        else {
                            setBgC('#edce44');
                            setsBgC('yellow');
                        }
            })
        }
    }, [])

    const log = () => {
<<<<<<< HEAD
        console.log(user/* ,mainTaskList, tasksList,acts */)
    }
=======
<<<<<<< HEAD
        console.log(user/* ,mainTaskList, tasksList,acts */)
    }
=======
        console.log(user,mainTaskList, tasksList,acts)
    }
    const logOut = () => {
        cookie.remove('token');
        setLoggedIn(false); 
        setUser({});
        setTasksList([]);
        setMainTaskList({});
        setCompletion(0);
    };
>>>>>>> f0131deaa37ece93267df05f4e09094a8aded98d
>>>>>>> f70a2fc93fce0f32d1a29ad2467d501d1e6e35ea

    return (
        <div style={{position:'fixed'}}>
            <div className={mainTaskList.id === undefined ? 'bgcNothing' : 'bgcSomething'}>
                {mainTaskList.id !== undefined ? 
                    <div className='transition' 
                        style={{
                            background: `${bgC}`,
                            color:'white', height:'7.5vh', width:`${completion}%`,
                            display:'flex', alignItems:'center' 
                    }} />
                        :
                    null
                }
                {loggedIn ? 
                    <div className="navBtns" id="pBarG">
                        <div style={{display:'flex'}}>
                            <svg
                                style={{marginTop:'3px'}}
                                width="26"
                                height="26"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                >
                                <path d="M13 10H17V16H13V10Z" fill="currentColor" fillOpacity="0.5" />
                                <path d="M11 4H7V16H11V4Z" fill="currentColor" />
                                <path d="M18 18H6V20H18V18Z" fill="currentColor" />
<<<<<<< HEAD
                            </svg>
                            <div style={{fontSize:'22px'}}>Routine</div>
                        </div>
                        <button onClick={()=>log()}>check</button>
                            <Link to='/routine' style={{textDecoration: 'none'}}>
                                <div className="navName">
                                    {mainTaskList.name}
                                </div>
                            </Link>
                        <div style={{display:'flex'}}>
                            <Link to="/userpanel" className="navItem" style={{textDecoration: 'none'}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" fill="white" className="bi bi-house-fill" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 3.293l6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
                                <path fillRule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
                                </svg>
                            </Link>
                            <Link to="/profile" className="navItem" style={{textDecoration: 'none'}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" fill="white" className="bi bi-person-fill" viewBox="0 0 16 16">
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                </svg>
                            </Link>
{/*                             <Link to="/login" className="navItem" onClick={()=>logOut()} style={{textDecoration: 'none'}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" fill="white" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                                <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                                </svg>
                            </Link> */}
                        </div>
                    </div>
                        :
                    <div className="navBtns">
                        <div style={{display:'flex'}}>
                            <svg
                                style={{marginTop:'3px'}}
                                width="26"
                                height="26"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                >
                                <path d="M13 10H17V16H13V10Z" fill="currentColor" fillOpacity="0.5" />
                                <path d="M11 4H7V16H11V4Z" fill="currentColor" />
                                <path d="M18 18H6V20H18V18Z" fill="currentColor" />
                            </svg>
                            <div style={{fontSize:'22px'}}>Routine</div>
                        </div>
=======
                            </svg>
                            <div style={{fontSize:'22px'}}>Routine</div>
                        </div>
                        <button onClick={()=>log()}>check</button>
                            <Link to='/routine' style={{textDecoration: 'none'}}>
                                <div className="navName">
                                    {mainTaskList.name}
                                </div>
                            </Link>
                        <div style={{display:'flex'}}>
                            <Link to="/userpanel" className="navItem" style={{textDecoration: 'none'}}>
<<<<<<< HEAD
                                <svg xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" fill="white" className="bi bi-house-fill" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 3.293l6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
                                <path fillRule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
                                </svg>
                            </Link>
                            <Link to="/profile" className="navItem" style={{textDecoration: 'none'}}>
=======
>>>>>>> f0131deaa37ece93267df05f4e09094a8aded98d
                                <svg xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" fill="white" className="bi bi-person-fill" viewBox="0 0 16 16">
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                </svg>
                            </Link>
<<<<<<< HEAD
{/*                             <Link to="/login" className="navItem" onClick={()=>logOut()} style={{textDecoration: 'none'}}>
=======
                            <Link to="/login" className="navItem" onClick={()=>logOut()} style={{textDecoration: 'none'}}>
>>>>>>> f0131deaa37ece93267df05f4e09094a8aded98d
                                <svg xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" fill="white" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                                <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                                </svg>
<<<<<<< HEAD
                            </Link> */}
=======
                            </Link>
>>>>>>> f0131deaa37ece93267df05f4e09094a8aded98d
                        </div>
                    </div>
                        :
                    <div className="navBtns">
                        <div>Routine</div>
>>>>>>> f70a2fc93fce0f32d1a29ad2467d501d1e6e35ea
                        <div style={{display:'flex'}}>
                            <Link to="/register" className="navItem" style={{textDecoration: 'none'}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="38px" height="38px" fill="white" className="bi bi-person-fill" viewBox="0 0 16 16">
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                </svg>
                            </Link>
                        </div>
                    </div>
                }
            </div>
            <div style={{background: 'grey', height:'2px', width:'100%',
                position:'fixed', top:'55px'}}>
                {mainTaskList.id === undefined ?
                    <div style={{height:'2px', width:'100%', background:'#3348ce'}}/>
                        :
                    <div className='transition'
                    style={{background: `${sbgC}`, height:'2px', width:`${completion}%`}}/>
                }
            </div>
        </div>
    )
}
