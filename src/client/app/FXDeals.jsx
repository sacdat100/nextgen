import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

let style = {
    tinyfont: {
      fontSize: "0.6em",
      fontWeight: "bold",
    },
}

/**
 * A simple table demonstableRowating the hierarchy of the `Table` component and its sub-components.
 */
const FXDeals = () => (
  <Table selectable={false}>
    <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false}>
      <TableRow>
        <TableHeaderColumn width="38%" >Deal ID</TableHeaderColumn>
        <TableHeaderColumn width="15%" >Currency</TableHeaderColumn>
        <TableHeaderColumn width="20%" >Amount</TableHeaderColumn>
        <TableHeaderColumn width="20%" >Expiry</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={false}>
      <TableRow>
        <TableRowColumn width="38%">D18020100001</TableRowColumn>
        <TableRowColumn width="15%">SGD</TableRowColumn>
        <TableRowColumn width="20%">20,000.00</TableRowColumn>
        <TableRowColumn width="20%">28/Feb/2018</TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn width="38%">D18020500039</TableRowColumn>
        <TableRowColumn width="15%">SGD</TableRowColumn>
        <TableRowColumn width="20%">5,000.00</TableRowColumn>
        <TableRowColumn width="20%">31/Mar/2018</TableRowColumn>
      </TableRow>
    </TableBody>
  </Table>
);

export default FXDeals;
