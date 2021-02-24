import React from 'react';
import {Link} from 'react-router-dom';

export default function WelcomePage() {
    return (
        <div>
            <div style={{
                paddingTop:'150px'
            }}>
                <div style={{fontSize:'80px', marginLeft:'15vw'}}>
                        <svg
                            style={{marginBottom:'17px'}}
                            width="80"
                            height="80"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            >
                            <path d="M13 10H17V16H13V10Z" fill="currentColor" fillOpacity="0.5" />
                            <path d="M11 4H7V16H11V4Z" fill="currentColor" />
                            <path d="M18 18H6V20H18V18Z" fill="currentColor" />
                        </svg>
                    Routine
                </div>
                <div style={{
                    padding:'25px 0px 0px 0px'
                }}>
                    <div style={{
                        display:'flex', justifyContent:'center',
                        margin:'0px 15vw 0px 50vw', fontSize:'25px', 
                    }}>
                        Help build healthy habits and discipline,
                        using this routine builder application
                    </div>
                    <div style={{
                        marginTop:'65px',
                        display:'flex', justifyContent:'center'
                    }}>
                        <Link 
                            to="/register"
                            style={{
                            fontSize:'20px', borderRadius:'10px',
                            display:'flex', justifyContent:'center',
                            alignItems:'center',marginRight:'50px',
                            background:'#3390ff', color:'white',
                            width: '120px', height:'50px',
                            textDecoration:'none'
                        }}>
                            Register
                        </Link>
                        <Link 
                            to="/login"
                            style={{
                            fontSize:'20px', borderRadius:'10px',
                            display:'flex', justifyContent:'center',
                            alignItems:'center',marginRight:'50px',
                            background:'#49b74d', color:'white',
                            width: '120px', height:'50px',
                            textDecoration:'none'
                        }}>
                            Log In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
