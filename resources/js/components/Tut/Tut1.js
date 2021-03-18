import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from '../../AppContext';
import {Link} from 'react-router-dom';
import SideBar from '../SideBar';
import png1 from '../Pictures/routine1.png';
import png2 from '../Pictures/routine2.png';

export default function Tut1() {
    const {user,acts} = useContext(AppContext);
    const [page, setPage] = useState(3);
    useEffect(()=>{

    },[])

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
                                1: <Pg1 setPage={setPage} page={page}/>,
                                2: <Pg2 setPage={setPage} page={page}/>,
                                3: <Pg3 setPage={setPage} page={page}/>
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

const Pg1 = ({setPage,page}) => {
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
                <Link to='/userpanel'>No</Link>
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

}