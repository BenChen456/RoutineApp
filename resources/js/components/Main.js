import React from 'react'; import '../../css/app.css';
import ReactDOM from 'react-dom'; 
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import Example from './Example'; import NewToDo from './NewToDo';
import {AppProvider} from '../AppContext';

function Main() {
    return (
        <Router>
            <AppProvider>
                <div>
                    <Route path="/" exact component={Example}/>
                    <Route path="/newtodo" component={NewToDo}/>
                </div>
            </AppProvider>
        </Router>
    );
}

export default Main;

if (document.getElementById('main')) {
    ReactDOM.render(<Main />, document.getElementById('main'));
}
