import React from 'react';
import SideBar from './SideBar';
import NewTodo from './NewToDo';

export default function UserPanelV3(props) {
    return (
        <div>
            <div className="todoListsContainer" style={{overflow:'hidden'}}>
                <div className="grid1">
                    <SideBar/>
                </div>
                <div className="grid2">
                    <div style={{height:'100%',overflow:'auto'}}>
                        <NewTodo urlId={props.match.params.id} props={props}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
