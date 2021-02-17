import React from 'react';
import TodoList from './TodoList';
import SideBar from './SideBar';

export default function UserPanelVTwo() {
    return (
        <div>
            <div className="todoListsContainer">
                <div className="grid1">
                    <SideBar/>
                </div>
                <div className="grid2">
                    <div>
                        <TodoList/>
                    </div>
                </div>
            </div>
        </div>
    )
}


