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
            <div className="todoListsContainer">
                <div className="grid1Tut">
                    <SideBar/>
                </div>

                <div className="grid2"></div>
            </div>

        </div>
    )
}
