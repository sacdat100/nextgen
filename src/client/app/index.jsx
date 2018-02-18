import { Router, Switch, Route } from 'react-router-dom';
import Faq from './Faq';
import About from './About';
import LoginForm from './security/login.jsx';
import Home from './protected/Home.jsx';
import history from "./utils/history.js";
import PrivateRoute from './utils/PrivateRoute.jsx';

var React = require ('react');
var ReactDOM = require ('react-dom');

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/src/client/index.html' component={LoginForm}/>
            <Route path='/faq' component={Faq}/>
            <Route path='/about' component={About}/>
            <PrivateRoute path='/1fa/home' component={Home}/>
        </Switch>
    </main>
);

// this component will be rendered by our <___Router>
const App = () => (
    <div>
        <Main />
    </div>
);

ReactDOM.render((
    //<Router  history={history}>
    //    {<App />}
    // </Router>
    < About />
), document.getElementById('app'));

