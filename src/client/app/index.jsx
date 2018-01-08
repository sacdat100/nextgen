import { MemoryRouter, BrowserRouter, Switch, Route } from 'react-router-dom';
import Faq from './Faq';
import About from './About';
import LoginForm from './security/login.jsx';

var React = require('react');
var ReactDOM = require('react-dom');

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={LoginForm}/>
            <Route path='/faq' component={Faq}/>
            <Route path='/about' component={About}/>
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
    <MemoryRouter>
        {<App />}
    </MemoryRouter>
), document.getElementById('app'));

