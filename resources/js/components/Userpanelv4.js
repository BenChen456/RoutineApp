import React from 'react'
import Acts from './Acts';
import SideBar from './SideBar';

export default function Userpanelv4() {
    return (
        <div>
            <div className="todoListsContainer">
                <div className="grid1">
                    <SideBar/>
                </div>
                <div className="grid2">
                    <div>
                        <Acts/>
                    </div>
                </div>
            </div>
        </div>
    )
}
