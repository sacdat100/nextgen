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
 * A simple table demonstrating the hierarchy of the `Table` component and its sub-components.
 */
const AccountSummary = () => (
  <Table selectable={false}>
    <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false}>
      <TableRow>
        <TableHeaderColumn width="35%">Account</TableHeaderColumn>
        <TableHeaderColumn width="13%">Currency</TableHeaderColumn>
        <TableHeaderColumn width="25%">Available Balance</TableHeaderColumn>
        <TableHeaderColumn width="*">Ledger Balance</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={false}>
      <TableRow>
        <TableRowColumn width="35%">12135987675 <br/><span style={style.tinyfont}>General Expense Account</span></TableRowColumn>
        <TableRowColumn width="13%">SGD</TableRowColumn>
        <TableRowColumn width="25%">120,000.00</TableRowColumn>
        <TableRowColumn width="*">1200,00.00</TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn width="35%">12135981234 <br/><span style={style.tinyfont}>Travel Expense Account</span></TableRowColumn>
        <TableRowColumn width="13%">USD</TableRowColumn>
        <TableRowColumn width="25%">10,000.00</TableRowColumn>
        <TableRowColumn width="*">10,00.00</TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn width="35%">12135989999 <br/><span style={style.tinyfont}>Payroll Account</span></TableRowColumn>
        <TableRowColumn width="13%">SGD</TableRowColumn>
        <TableRowColumn width="25%">3,000,000.00</TableRowColumn>
        <TableRowColumn width="*">3,000,000.00</TableRowColumn>
      </TableRow>
    </TableBody>
  </Table>
);

export default AccountSummary;
