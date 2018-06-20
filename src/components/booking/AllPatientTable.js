import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { browserHistory } from 'react-router';
import GlobalStyle from '../../utils/Styles';
import statusMapping from '../../utils/StatusMapping';

export default class BookingTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCheckboxes: false,
      selectable: false,
      fixedHeader: true,
    };
  }

  handleCellClick(rowNumber, columnNumber, evt) {
    const id = evt.target.dataset.uid;
    browserHistory.push(`/home/admin/patient-history/${id}`);
  }

  render() {
    console.log('console..log', this.props);
    const rows = this.props.rows.map(data => (
      <TableRow style={GlobalStyle.tableRowSpacing} key={data.id} className="table-row-style">
        {/* <TableRowColumn data-uid={data.id}>{data.dropoffDate}</TableRowColumn>
                    <TableRowColumn data-uid={data.id}>02:20Pm</TableRowColumn> */}
        <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{data.name}</TableRowColumn>
        <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{data.gender}</TableRowColumn>
        <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{data.age}</TableRowColumn>
        <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{data.disease}</TableRowColumn>
        <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{data.bloodGroup}</TableRowColumn>
        <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{data.height}</TableRowColumn>
        <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{data.operated}</TableRowColumn>
        <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{data.weight}</TableRowColumn>
      </TableRow>

    ));
    return (
      <Table selectable onCellClick={this.handleCellClick}>
        <TableHeader style={GlobalStyle.tableHeaderSpacing} displaySelectAll={this.state.showCheckboxes} adjustForCheckbox={this.state.showCheckboxes}>
          <TableRow style={GlobalStyle.tableHeaderSpacing} className="table-header-style">
            <TableHeaderColumn style={GlobalStyle.tableRowCell}>Name</TableHeaderColumn>
            <TableHeaderColumn style={GlobalStyle.tableRowCell}>Gender</TableHeaderColumn>
            <TableHeaderColumn style={GlobalStyle.tableRowCell}>Age</TableHeaderColumn>
            <TableHeaderColumn style={GlobalStyle.tableRowCell}>Disease</TableHeaderColumn>
            <TableHeaderColumn style={GlobalStyle.tableRowCell}>Blood Group</TableHeaderColumn>
            <TableHeaderColumn style={GlobalStyle.tableRowCell}>Height</TableHeaderColumn>
            <TableHeaderColumn style={GlobalStyle.tableRowCell}>Operated</TableHeaderColumn>
            <TableHeaderColumn style={GlobalStyle.tableRowCell}>Weight</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={this.state.showCheckboxes} >
          {rows}
        </TableBody>
      </Table>
    );
  }
}
