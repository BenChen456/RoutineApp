import React from 'react';
import {Link} from 'react-router-dom';

export default function UserCreated() {
    return (
        <div style={{fontSize:'30px'}}>
            <div style={{display:'flex',justifyContent:'center',paddingTop:'20%'}}>
                User Successfully Created.
            </div>
            <div style={{display:'flex',justifyContent:'center',marginTop:'25px'}}>
                <Link to="/login">Go To Login</Link>
            </div>
        </div>
    )
}
