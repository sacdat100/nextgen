import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

/**
 * A simple table demonstrating the hierarchy of the `Table` component and its sub-components.
 */
const PendingTransactions = () => (
  <Table multiSelectable={true}>
    <TableHeader adjustForCheckbox={true}>
      <TableRow>
        <TableHeaderColumn width="40%">Type</TableHeaderColumn>
        <TableHeaderColumn width="40%">Beneficiary</TableHeaderColumn>
        <TableHeaderColumn width="30%">Amount</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableRowColumn width="40%">Transfer to UOB A/C</TableRowColumn>
        <TableRowColumn width="40%">A & A Associates</TableRowColumn>
        <TableRowColumn width="30%">SGD 12,000.00</TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn width="40%">Transfer to Other Bank A/C</TableRowColumn>
        <TableRowColumn width="40%">Michael Page Law LLC</TableRowColumn>
        <TableRowColumn width="30%">USD 65,125.00</TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn width="40%">Telegraphics Transfer</TableRowColumn>
        <TableRowColumn width="40%">Eissenhaur Inc</TableRowColumn>
        <TableRowColumn width="30%">USD 315,000.00</TableRowColumn>
      </TableRow>
    </TableBody>
  </Table>
);

export default PendingTransactions;
