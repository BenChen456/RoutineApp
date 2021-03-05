//React
import React from 'react'; import '../../css/app.css';
import ReactDOM from 'react-dom'; 
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
//Context
import {AppProvider} from '../AppContext';
//Routes
import GuestRoute from '../routes/GuestRoute';
import AuthRoute from '../routes/AuthRoute';
//Components
import Nav from './Nav';
import WelcomePage from './WelcomePage';
import UserPanel from './UserPanel';
import UserPanelVTwo from './UserPanelVTwo';
import UserPanelV3 from './UserPanelV3';
import Userpanelv4 from './Userpanelv4';
import Login from './Login'; 
import Register from './Register';
import UserCreated from './tut/UserCreated';
import Profile from './Profile';
import Error from './Error';

function Main() {
    return (
        <Router>
            <AppProvider>
                <div>
                    <Nav componet={Nav}/>
                    <Switch>
                    <GuestRoute path="/" exact component={WelcomePage}/>
                    <GuestRoute path="/login" exact component={Login}/>
                    <GuestRoute path="/register" exact component={Register}/>
                    <AuthRoute path="/userpanel" exact component={UserPanel}/>
                    <AuthRoute path="/routine" exact component={UserPanelVTwo}/> {/* TodoList */}
                    <AuthRoute path="/edit/:id" exact component={UserPanelV3}/> {/* NewTodo */}
                    <AuthRoute path="/activity" exact component={Userpanelv4} /> {/* Acts */}
                    <AuthRoute path="/profile" exact component={Profile} />
                    <Route path="/user_created" exact component={UserCreated} />
                    <Route component={Error}/>
                    </Switch>
                </div>
            </AppProvider>
        </Router>
    );
}

export default Main;

if (document.getElementById('main')) {
    ReactDOM.render(<Main />, document.getElementById('main'));
}
