"use strict";
import React from 'react';
import { Route, Redirect} from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        sessionStorage.getItem('isAuthenticated')
            ? <Component {...props} />
            : <Redirect to='/src/client/index.html' />
    )} />
);
export default PrivateRoute;

// export default class PrivateRoute extends React.Component {
//
//     constructor(props){
//         super();
//     }
//
//     render(){
//         var isAuthenticate = sessionStorage.getItem('isAuthenticated');
//         console.log(' llll ' + isAuthenticate);
//         console.log(this.props.component);
//         return <h1>Hello</h1>
//     }
//
// }