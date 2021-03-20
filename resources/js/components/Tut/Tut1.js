import React, {useContext, useState} from 'react';
import {AppContext} from '../../AppContext';
import {Link} from 'react-router-dom';
import SideBar from '../SideBar';
import png1 from '../Pictures/routine1.png';
import png2 from '../Pictures/routine2.png';
import png3 from '../Pictures/routine3.png';
import png4 from '../Pictures/routine4.png';
import png5 from '../Pictures/routine5.png';
import png6 from '../Pictures/routine6.jpg';
import axios from 'axios';

export default function Tut1(props) {
    const {user,acts} = useContext(AppContext);
    const [page, setPage] = useState(1);

    const completeTut = () =>{
        if(user.tut){
            props.history.push('/userpanel')
        }

        axios.post('/api/auth/tut', {tut: 0});
        props.history.push('/userpanel')
    }

    return (
        <div>
            <div style={{display:'flex', justifyContent:'center', 
                paddingTop:'100px', position:'absolute', width:'100%', height:'100%',
                zIndex:'1000'
            }}>
                <div style={{
                    width:'800px',height:'600px', background:'#F8FAFC',
                    border:'3px solid #c5c6c7', borderRadius:'5px'
                }}>
                    <div style={{margin:'25px'}}>
                        {
                            {
                                1: <Pg1 setPage={setPage} page={page} props={props}/>,
                                2: <Pg2 setPage={setPage} page={page}/>,
                                3: <Pg3 setPage={setPage} page={page}/>,
                                4: <Pg4 setPage={setPage} page={page}/>,
                                5: <Pg5 setPage={setPage} page={page}/>,
                                6: <Pg6 setPage={setPage} page={page} completeTut={completeTut} props={props}/>
                            }[page]
                        }
                    </div>
                </div>
            </div>

            <div style={{
                paddingTop:'100px', position:'absolute', width:'100%', height:'100%', 
                background:'grey', opacity:'50%'
            }}>
            </div>

            <div>
                <SideBar />
            </div>
        </div>
    )
}

const Pg1 = ({setPage,page,props}) => {

    const completeTut = () =>{
        axios.post('/api/auth/tut', {tut: 0});
        props.history.push('/userpanel')
    }

    return(
        <div>
            <div style={{fontSize:'50px'}}>Welcome to Routine!</div>
            <div style={{fontSize:'18px'}}>
                On Routine, you can create your own daily routines to follow 
                and finish in order to create healthy habits. 
            </div>
            <div style={{fontSize:'18px',marginTop:'20px'}}>
                Do you wish to complete a quick 5 minute tutorial in order 
                to learn how to use Routine and get the most out of this website?
            </div>
            <div style={{fontSize:'18px',color:'grey'}}>
            We recommend that new users take the tutorial but if you choose not to
            there is an option to retake the tutorial on your profile page</div>

            <div style={{fontSize:'18px',marginTop:'200px',
                display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <Link to='/userpanel' onClick={()=>completeTut()}>No</Link>
                <button style={{
                    width:'100px', height:'50px', background:'#3390ff',color:'white',
                    border:'2px solid #35aef0', borderRadius:'5px'
                }} onClick={()=>setPage(page+1)}>
                    Yes
                </button>
            </div>
        </div>
    )
}

const Pg2 = ({setPage,page}) => {
    return(
        <div style={{height:'500px'}}>
            <div>
                <div style={{fontSize:'50px'}}>How to create Routines</div>
                <div style={{fontSize:'18px'}}>
                    Routines are essentially a checklist for all the tasks you have 
                    for that certain routine and allows you to easily check off
                    completed tasks.
                </div>
                <img src={png2} alt="Routine" style={{width:'700px'}}/>
                <div style={{fontSize:'18px', marginTop:'15px'}}>
                    On the userpanel, there is a create new routine button
                    near the bottom. By entering a name and clicking the 
                    plus button you will end up creating a brand new routine.
                </div>
                <img src={png1} alt="Add Routine Button"/>
            </div>

            <div style={{fontSize:'18px',width:'100%',
                display:'flex',justifyContent:'flex-end',alignItems:'center'}}>
                <button style={{
                    width:'100px', height:'50px', background:'#3390ff',color:'white',
                    border:'2px solid #35aef0', borderRadius:'5px'
                }} onClick={()=>setPage(page+1)}>
                    Forward
                </button>
            </div>
        </div>
    )
}

const Pg3 = ({setPage,page}) =>{
    return(
        <div style={{height:'500px'}}>
            <div>
                <div style={{fontSize:'50px'}}>Filling Routines up with Tasks</div>
                <div style={{fontSize:'18px'}}>
                    Clicking on a routine in your userpanel will take you to the
                    editing page for that routine.
                </div>
                <div style={{fontSize:'18px'}}>
                    On this page, you can add new tasks to your routine or 
                    update and delete old ones.
                </div>
                <img src={png3} style={{
                    margin:'10px 0px 0px 5px'
                }}/>
                <div style={{fontSize:'18px',marginBottom:'10px'}}>
                    Setting your routine as the current routine
                    will change your taskbar. The taskbar
                    will now fill up as you as complete your tasks.
                </div>
            </div>

            <div style={{fontSize:'18px',width:'100%',
                display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <button style={{
                    width:'100px', height:'50px', background:'#3390ff',color:'white',
                    border:'2px solid #35aef0', borderRadius:'5px'
                }} onClick={()=>setPage(page-1)}>
                    Back
                </button>
                <button style={{
                    width:'100px', height:'50px', background:'#3390ff',color:'white',
                    border:'2px solid #35aef0', borderRadius:'5px'
                }} onClick={()=>setPage(page+1)}>
                    Forward
                </button>
            </div>
        </div>        
    )
}

const Pg4 = ({setPage,page}) => {
    return(
        <div style={{height:'500px'}}>
            <div>
                <div style={{fontSize:'50px'}}>Going to your Routine</div>
                <div style={{width:'100%',height:'55px', display:'flex', alignItems:'center',
                        justifyContent:'space-between',background:'#9E9E9E'}}>
                        <div style={{display:'flex', alignItems:'center'}}>
                            <svg
                                style={{marginLeft:'5px'}}
                                width="26"
                                height="26"
                                viewBox="0 0 24 24"
                                fill="white"
                                xmlns="http://www.w3.org/2000/svg"
                                >
                                <path d="M13 10H17V16H13V10Z" fill="white" fillOpacity="0.5" />
                                <path d="M11 4H7V16H11V4Z" fill="white" />
                                <path d="M18 18H6V20H18V18Z" fill="white" />
                            </svg>
                            <div style={{color:'white',fontSize:'22px'}}>Routine</div>
                        </div>
                        <div style={{fontSize:'18px',color:'white'}}>Basketball Workout</div>
                        <div style={{display:'flex'}}>
                            <div className="navItem">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" fill="white" className="bi bi-house-fill" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 3.293l6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
                                <path fillRule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
                                </svg>
                            </div>
                            <div className="navItem">
                                <svg xmlns="http://www.w3.org/2000/svg" width="27px" height="27px" fill="white" className="bi bi-award-fill" viewBox="0 0 16 16">
                                <path d="M8 0l1.669.864 1.858.282.842 1.68 1.337 1.32L13.4 6l.306 1.854-1.337 1.32-.842 1.68-1.858.282L8 12l-1.669-.864-1.858-.282-.842-1.68-1.337-1.32L2.6 6l-.306-1.854 1.337-1.32.842-1.68L6.331.864 8 0z"/>
                                <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z"/>
                                </svg>
                            </div>
                            <div className="navItem">
                                <svg xmlns="http://www.w3.org/2000/svg" width="27px" height="27px" fill="white" className="bi bi-person-fill" viewBox="0 0 16 16">
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <img src={png4} style={{margin:'10px 0px 0px 5px'}}/>
                    <div style={{fontSize:'18px', marginBottom:'20px'}}>
                        You can access your current routine's checklist by
                        either clicking on the routine name in your taskbar or the "go to routine" 
                        button on the top of your editing page.
                    </div>
            </div>

            <div style={{fontSize:'18px',width:'100%',
                display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <button style={{
                    width:'100px', height:'50px', background:'#3390ff',color:'white',
                    border:'2px solid #35aef0', borderRadius:'5px'
                }} onClick={()=>setPage(page-1)}>
                    Back
                </button>
                <button style={{
                    width:'100px', height:'50px', background:'#3390ff',color:'white',
                    border:'2px solid #35aef0', borderRadius:'5px'
                }} onClick={()=>setPage(page+1)}>
                    Forward
                </button>
            </div>
        </div>
    )
}

const Pg5 = ({setPage,page}) => {
    return(
        <div style={{height:'500px'}}>
            <div style={{fontSize:'50px'}}>Going to your Routine</div>
            <div style={{display:'flex',marginBottom:'20px'}}>
                <img src={png5} style={{margin:'10px 0px 0px 5px'}}/>
                <div>
                    <div style={{fontSize:'18px', marginLeft:'20px',width:'200px'}}>
                        On your routine page you will see your routine name
                        and streak. Fully completing your routine each day will up 
                        your streak count.
                    </div>
                    <div style={{fontSize:'18px', margin:'10px 0px 0px 20px'}}>
                        Clicking on a task will mark it done and award you 10 points.
                        Fully completing your routine will earn you a solid 100 points.
                    </div>
                </div>
            </div>

            <div style={{fontSize:'18px',width:'100%',
                display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <button style={{
                    width:'100px', height:'50px', background:'#3390ff',color:'white',
                    border:'2px solid #35aef0', borderRadius:'5px'
                }} onClick={()=>setPage(page-1)}>
                    Back
                </button>
                <button style={{
                    width:'100px', height:'50px', background:'#3390ff',color:'white',
                    border:'2px solid #35aef0', borderRadius:'5px'
                }} onClick={()=>setPage(page+1)}>
                    Forward
                </button>
            </div>
        </div>
    )
}

const Pg6 = ({setPage,page,completeTut,props}) => {
    return(
        <div style={{height:'500px'}}>
            <div style={{fontSize:'50px'}}>Spending your points on Themes</div>

            <div style={{fontSize:'18px', marginTop:'10px'}}>
                With the points you earn from completing routines you can spend 
                those points on themes. The themes store can be found by clicking 
                the 
                ribbon icon 
                        <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="grey" className="bi bi-award-fill" viewBox="0 0 16 16">
                        <path d="M8 0l1.669.864 1.858.282.842 1.68 1.337 1.32L13.4 6l.306 1.854-1.337 1.32-.842 1.68-1.858.282L8 12l-1.669-.864-1.858-.282-.842-1.68-1.337-1.32L2.6 6l-.306-1.854 1.337-1.32.842-1.68L6.331.864 8 0z"/>
                        <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z"/>
                        </svg>
                in your taskbar. 
            </div>
            <img src={png6} style={{marginTop:'10px'}}/>

            <div style={{fontSize:'18px',width:'100%',
                display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <button style={{
                    width:'100px', height:'50px', background:'#3390ff',color:'white',
                    border:'2px solid #35aef0', borderRadius:'5px'
                }} onClick={()=>setPage(page-1)}>
                    Back
                </button>
                <button style={{
                    width:'100px', height:'50px', background:'#49b74d',color:'white',
                    border:'2px solid #38c172', borderRadius:'5px'
                }} onClick={()=>completeTut()}>
                    Finish
                </button>
            </div>
        </div>
    )
}
