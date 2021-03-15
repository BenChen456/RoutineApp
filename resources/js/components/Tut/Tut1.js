import React, {useContext, useEffect} from 'react';
import {AppContext} from '../../AppContext';
import {Link} from 'react-router-dom';
import SideBar from '../SideBar';

export default function Tut1() {
    const {user,acts} = useContext(AppContext);
    useEffect(()=>{

    },[])

    return (
        <div>
            <div style={{display:'flex', justifyContent:'center', 
                paddingTop:'100px'
            }}>
                <div style={{
                    width:'800px',height:'600px', background:'#F8FAFC',
                    border:'3px solid #c5c6c7', borderRadius:'5px'
                }}>
                    <div style={{margin:'25px'}}>
                        <div style={{fontSize:'50px'}}>Welcome to Routine!</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
