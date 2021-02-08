//React
import React from 'react'; import '../../css/app.css';
import ReactDOM from 'react-dom'; 
import {BrowserRouter as Router, Route} from 'react-router-dom';
//Context
import {AppProvider} from '../AppContext';
//Routes
import GuestRoute from '../routes/GuestRoute';
import AuthRoute from '../routes/AuthRoute';
//Components
import ProgressBar from './ProgressBar';
import TodoList from './TodoList'; 
import UserPanelVTwo from './UserPanelVTwo';
import UserPanel from './UserPanel';
import NewToDo from './NewToDo';
import Login from './Login'; 
import Register from './Register';
import Profile from './Profile';

function Main() {
    return (
        <Router>
            <AppProvider>
                <div>
                    {/* <Nav componet={Nav}/> */}
                    <ProgressBar componet={ProgressBar}/>
                    <GuestRoute path="/login" exact component={Login}/>
                    <GuestRoute path="/register" exact component={Register}/>
                    <AuthRoute path="/userpanel" exact component={UserPanel}/>
                    <AuthRoute path="/userpanel/:id" exact component={UserPanelVTwo}/>
                    <AuthRoute path="/todolist/edit/:id" exact component={NewToDo}/>
                    <AuthRoute path="/profile" exact component={Profile} />
                </div>
            </AppProvider>
        </Router>
    );
}

export default Main;

if (document.getElementById('main')) {
    ReactDOM.render(<Main />, document.getElementById('main'));
}
