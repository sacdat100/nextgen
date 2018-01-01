import React from 'react';
import { Link } from 'react-router-dom';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper';

let style = {
    position: "absolute",
    left: 0,
    bottom: 0,
    width: "100%",
    height: "10%",
    leftbottombar : {
        textAlign: "left",
        position: "absolute",
        zDepth: 1,
        left: 0,
        bottom: 0,
        width: "50%"
    },
    rightbottombar : {
        textAlign: "right",
        position: "absolute",
        zDepth: 1,
        right: 0,
        bottom: 0,
        width: "50%"
    }
};

const aboutIcon = <FontIcon className="material-icons"></FontIcon>;
const faqIcon = <FontIcon className="material-icons"></FontIcon>;

export default class  Footer extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            selectedIndex: 0
        };
    }

    select(index){
        this.setState({selectedIndex: index});
    }

    render() {
        console.log("render of footer **********");
        return (
            <div>
                <div style={style.leftbottombar}>
                    <small>Copyright 2017-2020, All Rights Reserved</small>
                </div>
                <div style={style.rightbottombar}>
                    <small>
                        <Link to="/about">About</Link>&nbsp; | &nbsp;
                        <Link to="/faq">FAQ</Link>&nbsp; | &nbsp;
                        <Link to="/about">Terms And Conditions</Link>&nbsp; | &nbsp;
                        <Link to="/faq">Privacy and Security</Link>&nbsp; | &nbsp;
                        <Link to="/about">Important Information</Link>&nbsp; | &nbsp;
                    </small>
                </div>
            </div>
        );
    }
}