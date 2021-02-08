import React, {useState,useContext,useEffect} from 'react'; 
import '../../css/nav.css';
import {Link} from 'react-router-dom';
import {AppContext} from '../AppContext';
import cookie from 'js-cookie';

export default function ProgressBar(props) {
    const {
        user, setUser, 
        loggedIn, setLoggedIn,
        setTasksList, tasksList, 
        mainTaskList, setMainTaskList,
        completion, setCompletion,
        bgC, setBgC,
        sbgC, setsBgC
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
                        if(points >= 75 && points < 100){
                            setBgC('#2FA360');
                            setsBgC('green')
                        }
                        else if(points < 75){
                            setBgC('black');
                            setsBgC('grey');
                        }
                        else if (points >= 100){
                            setBgC('#edce44');
                            setsBgC('yellow');
                        }
            })
        }
    }, [])

    const log = () => {
        console.log(mainTaskList)
    }
    const logOut = () => {
        cookie.remove('token');
        setLoggedIn(false); 
        setUser({});
        setTasksList([]);
        setMainTaskList({});
        setCompletion(0);
    };

    return (
        <div>
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
                        <div>Routine</div>
                        <button onClick={()=>log()}>check</button>
                            <Link to={`/userpanel/${mainTaskList.id}`} style={{textDecoration: 'none'}}>
                                <div className="navName">
                                    {mainTaskList.name}
                                </div>
                            </Link>
                        <div style={{display:'flex'}}>
                            <Link to="/userpanel" className="navItem" style={{textDecoration: 'none'}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" fill="white" className="bi bi-person-fill" viewBox="0 0 16 16">
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                </svg>
                            </Link>
                            <Link to="/login" className="navItem" onClick={()=>logOut()} style={{textDecoration: 'none'}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" fill="white" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                                <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                                </svg>
                            </Link>
                        </div>
                    </div>
                        :
                    <div>
                        <div>Routine</div>
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
            <div style={{background: 'grey', height:'2px', width:'100%'}}>
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
