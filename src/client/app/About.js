import React from 'react';
import Draggable from 'react-draggable';
import {Paper, AppBar} from "material-ui";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ExchangeRates from './ExchangeRates.jsx';
import PendingTransactions from './PendingTransactions.jsx';
import Post1FAAppBar from './Post1FAAppBar.jsx';
import Portfolio from './Portfolio.jsx';
import AccountSummary from './AccountSummary.jsx';
import Calendar from 'material-ui/DatePicker/Calendar'
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';



let style = {

    tinyfont: {
		fontSize: "0.6em", 
		fontWeight: "bold",
    },

    back: {
        width: "99%",
        height: "95%",
        margin: 5,
	    padding: 5,
        position: "relative",
        overflow: 'auto',

    },

    plsm: {
      height: 300,
	  width: 400,
	  margin: 5,
	  padding: 1,
	  textAlign: 'center',
	  display: 'inline-block',
	  cursor: 'no-cursor',
	},

	plmi: {
      height: 300,
	  width: 600,
	  margin: 5,
	  padding: 1,
	  textAlign: 'center',
	  display: 'inline-block',
	  cursor: 'no-cursor',
	},

	plmi1: {
      height: 410,
	  width: 310,
	  margin: 5,
	  padding: 1,
	  textAlign: 'center',
	  display: 'inline-block',
	  cursor: 'no-cursor',
	},

	plbdsm: {
	  height: "80%",
	  width: "99%",
	  margin: 0,
	  padding: 0,
	  textAlign: 'center',
	  display: 'block',
	  cursor: 'no-cursor',
	  overflow: 'auto',
	},

	plbdmi: {
	  height: "80%",
	  width: 600,
	  margin: 0,
	  padding: 0,
	  textAlign: 'center',
	  display: 'block',
	  cursor: 'no-cursor',
	  overflow: 'auto',
	},

	strong: {
      background: '#ddd',
      border: '1px solid #999',
      height: 30,
      borderRadius: 0,
      display: 'block',
      marginBottom: 1,
      padding: 1,
      textAlign: 'left',
      cursor: 'pointer'
    }

};

export default class About extends React.Component{

      constructor(props){
      	super(props);
  		this.state = {
  			  activeDrags: 0,
		      deltaPosition: {
		        x: 0, y: 0
		      },
		      controlledPosition: {
		        x: -400, y: 200
		      }
  		}
      }

	  handleDrag(e, ui) {
	    const {x, y} = this.state.deltaPosition;
	    this.setState({
	      deltaPosition: {
	        x: x + ui.deltaX,
	        y: y + ui.deltaY,
	      }
	    });
	  }

	  onStart() {
	    this.setState({activeDrags: ++this.state.activeDrags});
	  }

	  onStop() {
	    this.setState({activeDrags: --this.state.activeDrags});
	  }

	  // For controlled component
	  adjustXPos(e) {
	    e.preventDefault();
	    e.stopPropagation();
	    const {x, y} = this.state.controlledPosition;
	    this.setState({controlledPosition: {x: x - 10, y}});
	  }

	  adjustYPos(e) {
	    e.preventDefault();
	    e.stopPropagation();
	    const {controlledPosition} = this.state;
	    const {x, y} = controlledPosition;
	    this.setState({controlledPosition: {x, y: y - 10}});
	  }

	  onControlledDrag(e, position) {
	    const {x, y} = position;
	    this.setState({controlledPosition: {x, y}});
	  }

	  onControlledDragStop(e, position) {
	    this.onControlledDrag(e, position);
	    this.onStop();
	  }

	render(){
		const dragHandlers = {onStart: this.onStart, onStop: this.onStop};

		return(
		   <MuiThemeProvider>
		        <div style={style.back}>
		        	<Post1FAAppBar/>
			        <Draggable>
			           <Paper style={style.plsm} zDepth={2} {...dragHandlers}>
			              <strong style={style.strong}>
			              	<table width="100%">
		                    	<tr>
		                    		<td style={{width: '40%', verticalAlign: 'top', margin: 2, padding: 2}}><strong>Exchange Rate</strong></td>
		               				<td style={{width: '60%', verticalAlign: 'top', textAlign: 'right', margin: 2, padding: 2}}>
		               					<span style={style.tinyfont}>Base Currency(SGD), 12/Feb/2018 01:29:00 PM</span>
		               				</td>
		               			</tr>
		               		</table>
			              </strong>
			              <Paper style={style.plbdsm}>
						  	<ExchangeRates/>
						  </Paper>
						</Paper>
			        </Draggable>

			        <Draggable>
			           <Paper style={style.plmi} zDepth={2} {...dragHandlers}>
			              <strong style={style.strong}>
		                    <table width="100%">
		                    	<tr>
		                    		<td style={{width: '80%', verticalAlign: 'top', margin: 2, padding: 2}}><strong>Pending Transactions</strong></td>
		               				<td style={{width: '20%', verticalAlign: 'top', textAlign: 'right', margin: 2, padding: 2}}>
		               					<NotificationsIcon style={{verticalAlign: 'top', top: 0, margin: 0, padding: 0}}/>
		               					<Badge badgeContent={10} secondary={true} badgeStyle={{top:0, right: 12, radius: 6}} />
		               				</td>
		               			</tr>
		               		</table>
			               </strong>
			              <Paper style={style.plbdmi}>
						  	<PendingTransactions/>
						  </Paper>
						</Paper>
			        </Draggable>

			        <Draggable>
			           <Paper style={style.plmi1} zDepth={2} {...dragHandlers}>
			              <strong style={style.strong}><div>Calendar Events</div></strong>
						  <Calendar autoOk={false} container={'inline'} cancelLabel={false}  firstDayOfWeek={1} mode={'portrait'} open={true} ref="calendar"/>
						</Paper>
			        </Draggable>
			         
			        <Draggable>
			           <Paper style={style.plsm} zDepth={2} {...dragHandlers}>
			              <strong style={style.strong}><div>Cash Portfolio</div></strong>
			              <Paper style={style.plbdsm}>
						  	<Portfolio/>
						  </Paper>
						</Paper>
			        </Draggable>

			        <Draggable>
			           <Paper style={style.plmi} zDepth={2} {...dragHandlers}>
			              <strong style={style.strong}><div>Account Summary</div></strong>
			              <Paper style={style.plbdmi}>
						  	<AccountSummary/>
						  </Paper>
						</Paper>
			        </Draggable>

		         </div>

           	</MuiThemeProvider>
		   );
	}
}

