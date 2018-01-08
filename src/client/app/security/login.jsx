import React from 'react';
import {Checkbox, Divider, MenuItem, Paper, RaisedButton, SelectField, Subheader, TextField} from "material-ui";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

let request = require('superagent');

//import other components
import Footer from '../Footer';

//import labels, messages and others which require multi langauge support.
let i18 = require('./i18');

//import validator
let validator = require('./validator');

//import styles
let style = require('./style');

const items = ['English', '简体中文', 'Bahasa'];
let itemsList = [];
for (let i = 0; i < items.length; i++) {
    itemsList.push(<MenuItem value={i} key={i} primaryText={items[i]} style={style.menuitem}/>);
}

/**
 * Component responsible for Login Form
 */
export default class LoginForm extends React.Component {

    constructor(props){
        super(props);

        console.log("Start LoginForm");

        //store only real data here. Any interim UI state store uiState
        this.state = {
            groupID:"",
            loginID: "",
            password: "",
            langPref: 0,
            remember: false
        };
        this.baseState = this.state;

        //store ui state such as field valid or not, field error message, field enable/disable.
        this.uiState = {
            groupIDErrorMessage: "",
            loginIDErrorMessage: "",
            passwordErrorMessage: "",
            groupIDValid: false,
            loginIDValid: false,
            passwordValid: false,
            submitdisabled: true,
            submissionError: "",
            password: ""
        };

        this.encParam = {};

        this.baseUIState = {...this.uiState};

        //initialize based on remember me
        if(localStorage.getItem("remember")) {
            console.info("Remember ME : " + localStorage.getItem("groupID") + " " + localStorage.getItem("loginID") + " >"
                + localStorage.getItem("langPref") + "<");
            this.state.remember = true;
            this.state.groupID = localStorage.getItem("groupID");
            this.state.loginID = localStorage.getItem("loginID");
            if(Number.isInteger(parseInt(localStorage.getItem("langPref")))) {
                this.state.langPref = Number.parseInt(localStorage.getItem("langPref"));
            }
            validator.validate("groupID", this.state.groupID, i18.getContent(this.state.langPref)[0], this.uiState);
            validator.validate("loginID", this.state.loginID, i18.getContent(this.state.langPref)[0], this.uiState);
        }

        //bind all event handling methods.
        this.handleChange = this.handleChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);

    };

    componentWillUpdate(newProps, newState) {
        console.log("componentWillUpdate: Component is about to update!");
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("componentDidUpdate: Component just updated!");
    }

    componentWillMount(){
        console.log("componentWillMount: Component is about to mount!");
        console.info("fetch encryption parameter from server : ");

        request
            .post('http://localhost:3000/public/getEncParam')
            .send({})
            .set('X-API-Key', 'foobar')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .then((res) => {
                this.encParam = JSON.parse(JSON.stringify(res.body));
                console.log(this.encParam.rsa_exp + " " + this.encParam.rsa_mod + " " + this.encParam.randomNumber + " " + this.encParam.sessionId);
            });
    }

    componentDidMount() {
        console.log("componentDidMount: Component just mounted!");
    }

    componentWillUnmount() {
        console.log("componentWillUnmount: Component is about to be removed from the DOM!");
    }

    /**
     * Called by component with onChange event.
     * @param event
     */
    handleChange(event) {
        console.info("in handleChange " + event.target.name + " " + event.target.value);
        if(event.target.name === 'remember'){
            this.setState({[event.target.name]: (!this.state.remember)});
        }
        else {
            let val = event.target.value;
            if (event.target.name !== "password" && event.target.name !== "remember") {
                val = val.toUpperCase();
            }
            this.setState({[event.target.name]: val});
            validator.validate(event.target.name, val, i18.getContent(this.state.langPref)[0], this.uiState);
        }
    }

    /**
     * To handle Remember Me button logic.
     * If click store the group id, login id, langauge in localstore else clear it from local store.
     * @param flag
     */
    setRememberMe(flag){
        if(flag){
            console.log("set the groupid, loginid and langauge in local store : ");
            localStorage.setItem("remember", "1");
            localStorage.setItem("groupID", this.state.groupID);
            localStorage.setItem("loginID", this.state.loginID);
            localStorage.setItem("langPref", this.state.langPref);
            console.info("Local Storage lang pref: " +  localStorage.getItem("langPref"));
        }
        else{
            console.log("remove the groupid, loginid and langauge from local store : ");
            localStorage.removeItem("remember");
            localStorage.removeItem("groupID");
            localStorage.removeItem("loginID");
            localStorage.removeItem("langPref");
        }
    }

    /**
     * To handle selectfield events for language field
     * @param event
     * @param index
     * @param value
     */
    handleSelectChange(event, index, value){
        console.info('in handleSelectChange ' + value);
        this.setState({langPref: value});
    }

    /**
     * To handle submit, cancel form level request
     * @param event
     */
    handleSubmit(event){
        console.info("handleSubmit");
        this.setRememberMe(this.state.remember);
        event.preventDefault();

        var passwordValue = this.uiState.password;
        this.setState( { 'password' :
            _getRPIN(passwordValue, this.uiState.rsa_exp, this.uiState.rsa_mod, this.uiState.randomNumber, this.uiState.sessionId)}
        );

        //clear password field
        this.uiState.password = "";

        var reqStr = JSON.stringify(this.state);
        console.info("send to server : " + reqStr);
        request
            .post('http://localhost:3000/public/login')
            .send(reqStr)
            .set('X-API-Key', 'foobar')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .then(function(res) {
                alert('yay got ' + JSON.stringify(res.body));
            });
    }

    /**
     * To handle submit, cancel form level request
     * @param event
     */
    handleReset(event){
        console.info("handleReset");
        this.setState(this.baseState);
        this.uiState = this.baseUIState;
    }

    /**
     * Render method called by React lifecycle to render this component.
     * @returns {*}
     */
    render () {
        console.info("Render is called");
        let config = i18.getContent(this.state.langPref)[0];
        return (
            <MuiThemeProvider>
                <div style={style.back}>
                    <Paper zDepth={2} style={style.raisedbox}>
                      <span>
                      <h3>{config.formlabels.greeting}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <SelectField
                              name="langauge"
                              value={this.state.langPref}
                              onChange={this.handleSelectChange}
                              style={style.selectfield}>
                          {itemsList}
                      </SelectField>
                      </h3>
                      </span>
                        <Divider /><br/>
                        <form onSubmit={this.handleSubmit} method="POST">
                            <TextField
                                name="groupID"
                                hintText={config.formlabels.groupID}
                                floatingLabelText={config.formlabels.groupID}
                                value={this.state.groupID}
                                onChange={this.handleChange}
                                errorText={this.uiState.groupIDErrorMessage}
                                autoFocus
                                maxLength="32"
                            />
                            <br/>
                            <TextField
                                name="loginID"
                                hintText={config.formlabels.loginID}
                                floatingLabelText={config.formlabels.loginID}
                                value={this.state.loginID}
                                onChange={this.handleChange}
                                errorText={this.uiState.loginIDErrorMessage}
                                maxLength="32"
                            />
                            <br/>
                            <TextField
                                name="password"
                                type="password"
                                hintText={config.formlabels.password}
                                floatingLabelText={config.formlabels.password}
                                value={this.uiState.password}
                                onChange={this.handleChange}
                                errorText={this.uiState.passwordErrorMessage}
                                maxLength="24"
                            />
                            <br/><br/><br/>
                            <Checkbox
                                name="remember"
                                label={config.formlabels.remember}
                                checked={this.state.remember}
                                onClick={this.handleChange}
                                style={style.checkbox}
                            />
                            <br/><Divider/>
                            <RaisedButton
                                name="submit"
                                label={config.formlabels.submit}
                                primary={true}
                                style={style}
                                disabled={this.uiState.submitdisabled}
                                onClick={this.handleSubmit}
                            />
                            <RaisedButton
                                name="reset"
                                label={config.formlabels.cancel}
                                secondary={true}
                                style={style}
                                onClick={this.handleReset}
                            />
                            <Subheader>{this.uiState.submissionError}</Subheader>
                        </form>
                    </Paper>
                    <Footer/>
                </div>
            </MuiThemeProvider>
        );
    }
}

