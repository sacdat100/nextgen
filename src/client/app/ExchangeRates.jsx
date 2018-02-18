import React from 'react';
import Subheader from 'material-ui/Subheader';

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
const ExchangeRates = () => (
  <div>
  <Table selectable={false}>
    <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false}>
      <TableRow>
        <TableHeaderColumn>Currency</TableHeaderColumn>
        <TableHeaderColumn>Rate</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={false}>
      <TableRow selectable={false}>
        <TableRowColumn>USD</TableRowColumn>
        <TableRowColumn>0.89</TableRowColumn>
      </TableRow>
      <TableRow selectable={false}>
        <TableRowColumn>MYR</TableRowColumn>
        <TableRowColumn>3.33</TableRowColumn>
      </TableRow>
      <TableRow selectable={false}>
        <TableRowColumn>IDR</TableRowColumn>
        <TableRowColumn>11,000</TableRowColumn>
      </TableRow>
      <TableRow  selectable={false}>
        <TableRowColumn>JPY</TableRowColumn>
        <TableRowColumn>78</TableRowColumn>
      </TableRow>
    </TableBody>
  </Table>
  </div>
);

export default ExchangeRates;
