import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import uuid from 'uuid/v1';
import $ from 'jquery';

import SpinnerClipLoader from '../SpinnerClipLoader';
import ContractorHourLogOneControls from './ContractorHourLogOneControls';
import ContractorTimeEntryTable from '../timeEntries/ContractorTimeEntryTable';

import { getContractorHourLog, clearContractorHourLogOneState } from '../../actions/contractorHourLog';
import { getActiveCompanies } from '../../actions/company';


class CompanyHourLogOne extends Component {
  componentDidMount() {
    const { match } = this.props;
    this.props.getContractorHourLog(match.params.contractorHourLogId);
    this.props.getActiveCompanies();
  }

  componentDidUpdate() {
    $('.contractor-time-entry-table-bulk-action').attr('disabled', false);
  }

  componentWillUnmount() {
    this.props.clearContractorHourLogOneState();
  }

  render() {
    const {
      auth, contractorHourLog, activeCompanies, match,
    } = this.props;

    if (!contractorHourLog.hourlyRate) {
      return (
        <div>
          <SpinnerClipLoader />
        </div>
      );
    }

    const createdTimeEntries = contractorHourLog.timeEntries.filter(timeEntry => timeEntry.status === 'created');
    const submittedTimeEntries = contractorHourLog.timeEntries.filter(timeEntry => timeEntry.status === 'approved' || timeEntry.status === 'hidden' || timeEntry.status === 'submitted');

    return (
      <div className="container table-font-size">
        <ContractorHourLogOneControls
          auth={auth}
          contractorHourLog={contractorHourLog}
          initialValues={contractorHourLog.title === 'Current' ? { title: moment.utc().format('YYYY-MM-DD') } : { title: contractorHourLog.title, notes: contractorHourLog.notes }}
        />
        <div className="m-5" />
        <ContractorTimeEntryTable
          auth={auth}
          contractorHourLogTitle={contractorHourLog.title}
          contractorHourLogHourlyRate={contractorHourLog.hourlyRate[0].USD}
          tableTitle="Created Time Entries"
          timeEntries={createdTimeEntries}
          activeCompanies={activeCompanies}
          match={match}
          key={uuid()}
          defaultPageSize={createdTimeEntries.length}
          minRows={createdTimeEntries.length}
        />
        <div className="m-5" />
        <ContractorTimeEntryTable
          auth={auth}
          contractorHourLogTitle={contractorHourLog.title}
          contractorHourLogHourlyRate={contractorHourLog.hourlyRate[0].USD}
          tableTitle="Submitted Time Entries"
          timeEntries={submittedTimeEntries}
          activeCompanies={activeCompanies}
          match={match}
          key={uuid()}
          defaultPageSize={submittedTimeEntries.length}
          minRows={submittedTimeEntries.length}
        />
      </div>
    );
  }
}

function mapStateToProps({ contractorHourLog, activeCompanies }) {
  return { contractorHourLog, activeCompanies };
}

export default connect(mapStateToProps, {
  getContractorHourLog, clearContractorHourLogOneState, getActiveCompanies,
})(CompanyHourLogOne);
