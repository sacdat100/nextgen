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
    tb: {
      margin: 0,
      padding: 0,
      align: 'left',
      border: 1
    },

    tinyfont: {
      fontSize: "0.6em", 
      fontWeight: "bold",
    },
}

/**
 * A simple table demonstrating the hierarchy of the `Table` component and its sub-components.
 */
const AccountSummary = () => (
  <Table selectable={false} style={style.tb}>
    <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false}>
      <TableRow>
        <TableHeaderColumn width="38%">Account</TableHeaderColumn>
        <TableHeaderColumn width="15%">Currency</TableHeaderColumn>
        <TableHeaderColumn width="@0%">Available Balance</TableHeaderColumn>
        <TableHeaderColumn width="20%">Ledger Balance</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={false}>
      <TableRow>
        <TableRowColumn width="38%">12135987675 <br/><span style={style.tinyfont}>General Expense Account</span></TableRowColumn>
        <TableRowColumn width="15%">SGD</TableRowColumn>
        <TableRowColumn width="20%">120,000.00</TableRowColumn>
        <TableRowColumn width="20%">1200,00.00</TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn width="38%">12135981234 <br/><span style={style.tinyfont}>Travel Expense Account</span></TableRowColumn>
        <TableRowColumn width="15%">USD</TableRowColumn>
        <TableRowColumn width="20%">10,000.00</TableRowColumn>
        <TableRowColumn width="20%">10,00.00</TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn width="38%">12135989999 <br/><span style={style.tinyfont}>Payroll Account</span></TableRowColumn>
        <TableRowColumn width="15%">SGD</TableRowColumn>
        <TableRowColumn width="20%">3,000,000.00</TableRowColumn>
        <TableRowColumn width="20%">3,000,000.00</TableRowColumn>
      </TableRow>
    </TableBody>
  </Table>
);

export default AccountSummary;