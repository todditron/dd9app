import React from 'react';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';

import 'react-table/react-table.css';
import ContractorTimeEntryTableActions from './ContractorTimeEntryTableActions';
import ContractorTimeEntryTableBulkActions from './ContractorTimeEntryTableBulkActions';

const ContractorTimeEntryTable = ({
  auth, contractorHourLogTitle, contractorHourLogHourlyRate, tableTitle, timeEntries, match, defaultPageSize, minRows,
}) => {
  let columns;

  /**
   * Open contractorHourLog Time Entries Table
   */
  if (contractorHourLogTitle === 'Current') {
    columns = [{
      Header: () => (
        <span className="table-title-font-size">{tableTitle}</span>
      ),
      columns: [{
        Header: 'Date',
        id: 'date',
        accessor: 'date',
        Cell: timeEntry => <span title={timeEntry.original.date}>{timeEntry.original.date.split('T')[0]}</span>,
        maxWidth: 95,
      }, {
        Header: 'Company',
        accessor: 'company.name',
        Cell: timeEntry => <span title={timeEntry.original.company.name}><Link
          to={`/company/${timeEntry.original.company._id}`}>{timeEntry.original.company.name}</Link></span>,
        maxWidth: 175,
      }, {
        Header: 'Hours',
        accessor: 'hours',
        maxWidth: 70,
        Footer: (
          <span>
            {timeEntries.map(timeEntry => timeEntry.hours).reduce((prev, next) => prev + next, 0)}
          </span>
        ),
      }, {
        Header: 'Payment',
        id: 'payment',
        accessor: timeEntry => <span>{`$${((timeEntry.hours * parseInt(contractorHourLogHourlyRate)).toFixed(2))}`}</span>,
        maxWidth: 80,
        Footer: (
        <div>
          <span>
            ${timeEntries.map(timeEntry => timeEntry.hours).reduce((prev, next) => prev + (next * parseInt(contractorHourLogHourlyRate)), 0).toFixed(2)}
          </span>
        </div>
        ),
      }, {
        Header: 'Description',
        id: 'description',
        accessor: timeEntry =>
          <span title={timeEntry.description}>{timeEntry.description}</span>,
      }, {
        Header: '',
        id: 'timeEntryTableRowActions',
        accessor: timeEntry => (
          <div className="text-center">
            <ContractorTimeEntryTableActions
              auth={auth}
              timeEntry={timeEntry}
            />
          </div>
        ),
        maxWidth: 150,
        Footer: (
          <div className="text-center">
            <ContractorTimeEntryTableBulkActions
              auth={auth}
              tableTitle={tableTitle}
              match={match}
            />
          </div>
        ),
      }],
    }];
    return (
      <ReactTable
        data={timeEntries}
        columns={columns}
        showPagination={false}
        defaultPageSize={defaultPageSize}
        minRows={minRows}
        className="-striped -highlight"
        noDataText="Empty"
        sortable={false}
        defaultSorted={[
          {
            id: 'date',
            desc: true,
          },
        ]}
        SubComponent={row => (
          <div style={{padding: '10px'}}>
            <em>Adjudicated, Public Time Entry Data</em>
            <table className="table">
              <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">User</th>
                <th scope="col">Company</th>
                <th scope="col">Hours</th>
                <th scope="col">cost</th>
                <th scope="col">Status</th>
                <th scope="col">Description</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>{row.original.publicDate}</td>
                <td>{row.original.publicUser.name.full}</td>
                <td>{row.original.publicCompany.name}</td>
                <td>{row.original.publicHours}</td>
                <td>{`$${((row.original.publicHours * parseInt(contractorHourLogHourlyRate)).toFixed(2))}`}</td>
                <td>{row.original.status}</td>
                <td>{row.original.publicDescription}</td>
              </tr>
              </tbody>
            </table>
          </div>
        )}
      />
    );
  }

  /**
   * Closed contractorHourLog Time Entries Table
   */
  columns = [{
    Header: () => (
      <span className="table-title-font-size">{tableTitle}</span>
    ),
    columns: [{
      Header: 'Date',
      id: 'date',
      accessor: 'date',
      Cell: timeEntry => <span title={timeEntry.original.date}>{timeEntry.original.date.split('T')[0]}</span>,
      maxWidth: 95,
    }, {
      Header: 'Company',
      accessor: 'company.name',
      Cell: timeEntry => <span title={timeEntry.original.company.name}><Link
        to={`/company/${timeEntry.original.company._id}`}>{timeEntry.original.company.name}</Link></span>,
      maxWidth: 175,
    }, {
      Header: 'Hours',
      accessor: 'hours',
      maxWidth: 70,
      Footer: (
        <span>
            {timeEntries.map(timeEntry => timeEntry.hours).reduce((prev, next) => prev + next, 0)}
          </span>
      ),
    }, {
      Header: 'Payment',
      id: 'payment',
      accessor: timeEntry => <span>{`$${((timeEntry.hours * parseInt(contractorHourLogHourlyRate)).toFixed(2))}`}</span>,
      maxWidth: 80,
      Footer: (
        <div>
          <span>
            ${timeEntries.map(timeEntry => timeEntry.hours).reduce((prev, next) => prev + (next * parseInt(contractorHourLogHourlyRate)), 0).toFixed(2)}
          </span>
        </div>
      ),
    }, {
      Header: 'Description',
      id: 'description',
      accessor: timeEntry =>
        <span title={timeEntry.description}>{timeEntry.description}</span>,
    }],
  }];
  return (
    <ReactTable
      data={timeEntries}
      columns={columns}
      showPagination={false}
      defaultPageSize={defaultPageSize}
      minRows={minRows}
      className="-striped -highlight"
      noDataText="Empty"
      sortable={false}
      defaultSorted={[
        {
          id: 'date',
          desc: true,
        },
      ]}
      SubComponent={row => (
        <div style={{padding: '10px'}}>
          <em>Adjudicated, Public Time Entry Data</em>
          <table className="table">
            <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">User</th>
              <th scope="col">Company</th>
              <th scope="col">Hours</th>
              <th scope="col">Payment</th>
              <th scope="col">Status</th>
              <th scope="col">Description</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>{row.original.publicDate}</td>
              <td>{row.original.publicUser.name.full}</td>
              <td>{row.original.publicCompany.name}</td>
              <td>{row.original.publicHours}</td>
              <td>{`$${((row.original.publicHours * parseInt(contractorHourLogHourlyRate)).toFixed(2))}`}</td>
              <td>{row.original.status}</td>
              <td>{row.original.publicDescription}</td>
            </tr>
            </tbody>
          </table>
        </div>
      )}
    />
  );
};

export default ContractorTimeEntryTable;
