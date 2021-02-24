import React, {useContext,useEffect} from 'react'; 
import '../../css/nav.css';
import {Link} from 'react-router-dom';
import {AppContext} from '../AppContext';

export default function Nav() {
    const {
        user, setUser, 
        loggedIn, setLoggedIn,
        setTasksList, tasksList, 
        mainTaskList, setMainTaskList,
        completion, setCompletion,
        bgC, setBgC,
        sbgC, setsBgC, 
        acts, setActs, bottomTasksList
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
        console.log(tasksList,bottomTasksList,mainTaskList)
    }

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
                            </svg>
                            <div style={{fontSize:'22px'}}>Routine</div>
                        </div>
                        <button onClick={()=>log()}>check</button>
                            {mainTaskList.id === undefined ?
                                null
                                    :
                                <Link to='/routine' style={{textDecoration: 'none'}}>
                                    <div className="navName">
                                        {mainTaskList.name}
                                    </div>
                                </Link>
                            }
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
                    
{/*                     <div 
                        style={{
                            background: 'grey', height:'7.5vh', width:'100%', 
                            paddingTop:'7.5vh',
                            position:'absolute', 
                    }}>
                        {mainTaskList.id === undefined ?
                            <div style={{height:'2px', width:'100%', background:'#3348ce'}}/>
                                :
                            <div className='transition'
                            style={{background: `${sbgC}`, height:'2px', width:`${completion}%`}}/>
                        }
                    </div> */}
        </div>
    )
}
