import React from 'react';
import Paper from 'material-ui/Paper';

let style = {

    subject: {
  		fontSize: "1.0em",
  		fontWeight: "bold",
      textAlign: "left",
      margin: 2,
      padding: 2,
    },

    content: {
      fontSize: "0.8em",
      wrap: "true",
      textAlign: "left",
      margin: 2,
      padding: 2,
    },
}

const News = () => (
  <div style={{width: '100%', height: '100%'}}>
    <Paper zDepth={2} style={{width: '100%', height: '50%'}}>
      <div style={style.subject}><u>Maintenance Notification</u></div>
      <div style={style.content}><p>There is a maintenance scheduled from 23/Feb/2018 09:00 pm to 24th/Feb/2018 06:00 AM. Please avoid using system during this period</p></div>
    </Paper>
  </div>
);

export default News;
