import React from 'react';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';

import 'react-table/react-table.css';

const HourLogCompanyOneTable = ({ tableTitle, companyHourLogs }) => {
  const columns = [{
    Header: () => (
      <span className="table-title">{tableTitle}</span>
    ),
    columns: [{
      Header: 'Date Opened',
      accessor: 'dateOpened',
      Cell: data => data.original.dateOpened.split('T')[0],
      maxWidth: 120,
    }, {
      Header: 'Date Closed',
      accessor: 'dateClosed',
      Cell: data => {
        if (data.original.dateClosed === '1970-01-01T00:00:00.000Z') {
          return '';
        }
        return data.original.dateClosed.split('T')[0];
      },
      maxWidth: 120,
    }, {
      Header: 'Hour Log Titles',
      id: 'title',
      accessor: data => {
        if (data.totalSubmittedHours > 0) {
          return <Link to={`/hourLog/company/${data._id}`}><b>{data.title}*</b></Link>;
        }
        return <Link to={`/hourLog/company/${data._id}`}>{data.title}</Link>;
      },
    }, {
      Header: 'Hours',
      accessor: 'totalPublicHours',
      maxWidth: 100,
    }, {
      Header: 'Hidden',
      accessor: 'totalHiddenHours',
      Cell: data => <span style={{ color: '#AAAAAA' }}>{data.original.totalHiddenHours}</span>,
      maxWidth: 100,
    }],
  }];

  return (
    <ReactTable
      data={companyHourLogs}
      columns={columns}
      className="-striped -highlight"
      noDataText="Empty"
      defaultSorted={[
        {
          id: 'dateOpened',
          desc: true,
        },
      ]}
    />
  );
};

export default HourLogCompanyOneTable;
