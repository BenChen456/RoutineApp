import React, {useContext} from 'react';
import {AppContext} from '../AppContext';
import {Link} from 'react-router-dom';

export default function SideBar() {
    const {user, acts} = useContext(AppContext);
    return (
        <div className="profileFeed">
            <div className="profileFeedContainer">
                <div id="PFwelback">Welcome Back</div>
                {/* <button onClick={()=>console.log(acts)}>acts</button> */}
                <div id="PFusername">
                    {user.username}
                </div>
                <div id="PFpoints">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="#ffaf11" className="bi bi-award-fill" viewBox="0 0 16 16">
                    <path d="M8 0l1.669.864 1.858.282.842 1.68 1.337 1.32L13.4 6l.306 1.854-1.337 1.32-.842 1.68-1.858.282L8 12l-1.669-.864-1.858-.282-.842-1.68-1.337-1.32L2.6 6l-.306-1.854 1.337-1.32.842-1.68L6.331.864 8 0z"/>
                    <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z"/>
                    </svg>
                    <div style={{marginLeft:'10px'}}>{user.points} Points</div>
                </div>
                <div id="PFactivitylist">
                    <Link style={{color:'black'}} to="/activity">Activity List</Link>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" className="bi bi-arrow-down-short" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"/>
                    </svg>
                </div>
                {/* <button onClick={()=>console.log(acts)}>Acts</button> */}
                <div>
                    {acts.map(a => 
                        <div key={a.id}
                            style={{display:'grid', 
                            gridTemplateColumns:'75% 25%', gridTemplateRows:'100%',
                            width: '250px', height:'30px'
                        }}>
                            <div key={a.id} style={{display:'flex', alignItems:'center',
                            width:'150px', borderLeft:'green 1px solid'}}>
                                <div style={{marginLeft:'10px', display:'flex'}}>
                                    {a.type === "list" ?
                                        <div>
                                            {a.name} Completed
                                        </div>
                                            :
                                        <div>
                                            {a.name}
                                        </div>
                                    }
                                </div>
                            </div>
                            <div style={{margin:'0px 0px 0px 10px',
                                display:'flex', alignItems:'center', 
                            }}>
                                {a.type === "list" ? 
                                    <div style={{color:'#ffaf11'}}>
                                        +100
                                    </div>
                                        :
                                    <div style={{color:'green'}}>
                                        +10
                                    </div>
                                }
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
