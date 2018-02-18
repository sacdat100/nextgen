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
import {Bar} from 'react-chartjs-2';

let chartData = {
        labels: ["CASA A/C", "Fixed Deposits", "Loans"],
        datasets: [{
          label: "Company Portfolio",
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: [1256000, 2500000, 5000000],
        }]
    };

/**
 * A simple table demonstrating the hierarchy of the `Table` component and its sub-components.
 */
const Portfolio = () => (
  <div>
     <Bar data={chartData}/>
  </div>
);

export default Portfolio;