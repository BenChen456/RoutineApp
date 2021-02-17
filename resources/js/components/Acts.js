import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from '../AppContext';
import axios from 'axios';
import {Spinner} from 'reactstrap';

export default function Acts() {
    const {user} = useContext(AppContext);

    const [acts, setActs] = useState([]);
    const [loaded, setLoaded] = useState(false);
    
    useEffect(() => {
        axios.post('http://localhost:8000/api/auth/acts' ,{
            id: user.id,
            number: 0
        }).then(res =>{
            setActs([...res.data]);
            setLoaded(true);
        })
    }, []);

    return (
        <div>{!loaded ? 
            <div style={{
                display: 'flex', justifyContent:'center', alignItems:'center', paddingTop:'150px'
            }}>
                <Spinner color="dark" />
            </div>
                :
            <div>
                <div style={{margin:'100px 0px 20px 50px',fontSize:'30px'}}>Activity History</div>
                <div style={{height:'500px', width:'100%', overflow:'auto'}}>
                    {acts.map(a => 
                        <div key={a.id} style={{display:'flex', 
                            margin:'0px 0px 0px 50px', fontSize:'20px'}}>
                            <div style={{width:'400px', display:'flex', justifyContent:'space-between'}}>
                                <div>{a.type === 'task' ?
                                    <div>{a.name}</div>
                                        :
                                    <div>{a.name} completed</div>
                                }</div>
                                <div>{a.type === 'task' ?
                                    <div style={{color:'green'}}>+10</div>
                                        :
                                    <div style={{color:'#ffaf11'}}>+100</div>
                                }</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        }
        </div>
    )
}
