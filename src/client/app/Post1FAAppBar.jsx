import React, {Component} from 'react';
import {Avatar, AppBar, IconButton, IconMenu, MenuItem} from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

const Logged = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem primaryText="Refresh" />
    <MenuItem primaryText="Help" />
    <MenuItem primaryText="Sign out" />
  </IconMenu>
);

Logged.muiName = 'IconMenu';

/**
 * This example is taking advantage of the composability of the `AppBar`
 * to render different components depending on the application state.
 */
class Post1FAAppBar extends Component {
  render() {
    return (
      <div>
        <AppBar
          title="GEB Next Gen"
          iconElementRight={ <Logged />}>
          <div style={{margin: 10}}>
            <table><tr><td rowspan="2">&nbsp;&nbsp;&nbsp;<Avatar src="../../img/me.jpg" /></td><td><small><b>Last login</b> : 02/Feb/2018</small></td></tr>
            <tr><td align="right" colspan="2"><small>5:55:00 PM</small></td></tr></table></div>
          </AppBar>
      </div>
    );
  }
}

export default Post1FAAppBar;