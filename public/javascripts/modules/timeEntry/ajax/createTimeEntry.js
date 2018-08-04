import createTimeEntryValidation from '../createTimeEntryValidation';

import axios from 'axios';
import moment from 'moment';

$('#createTimeEntryForm').on('submit', ajaxAddCreatedTimeEntry);

function ajaxAddCreatedTimeEntry(e) {
  console.log(`ajaxAddCreatedTimeEntry`);
  e.preventDefault();
  createTimeEntryValidation();
  axios
    .post(this.action, {
      date: this.date.value,
      company: this.company.value,
      hours: this.hours.value,
      description: this.description.value
    })
    .then(res => {
      const createdTimeEntriesTable = $('#createdTimeEntriesTable');
      const createdTimeEntriesTableRowNumber = createdTimeEntriesTable.find('tr').length-2;
      const companyName = $(this).find('option:selected').text();
      const editSVG = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve"><image xlink:href="/images/icons/pencil.svg" x="0" y="0" width="100%" height="100%"/></svg>`;
      let html = '';
      if (res.data.admin === true) {
        html += `<form class="time-entry-table-action-approve form d-inline" action='/api/v1/timeEntry/${res.data.timeEntry._id}/approve' method="POST"><button class="btn btn-sm btn-link" type="submit">Approve</button></form>`;
        html += `<form class="time-entry-table-action-hide form d-inline" action='/api/v1/timeEntry/${res.data.timeEntry._id}/hide' method="POST"><button class="btn btn-sm btn-link" type="submit">Hide</button></form>`;
        html += `<form class="time-entry-table-action-submit form d-inline" action='/api/v1/timeEntry/${res.data.timeEntry._id}/submit' method="POST"><button class="btn btn-sm btn-link" type="submit">Submit</button></form>`;
        html += `<button class="delete-time-entry-btn btn btn-sm btn-link" data-toggle='modal' data-target='#confirmDeleteTimeEntryModal' data-timeentry=${res.data.timeEntry._id}>Delete</button>`;
        html += `<button class="edit-time-entry-btn btn btn-sm btn-link" data-toggle='modal' data-target='#editTimeEntryModal' data-rownumber=${createdTimeEntriesTableRowNumber} data-timeentry=${res.data.timeEntry._id} data-date=${res.data.timeEntry.date} data-company=${res.data.timeEntry.company} data-hours=${res.data.timeEntry.hours} data-description=${res.data.timeEntry.description}>${editSVG}</button>`;
      } else {
        html += `<form class="time-entry-table-action-submit form d-inline" action='/api/v1/timeEntry/${res.data.timeEntry._id}/submit' method="POST"><button class="btn btn-sm btn-link" type="submit">Submit</button></form>`;
        html += `<button class="delete-time-entry-btn btn btn-sm btn-link" data-toggle='modal' data-target='#confirmDeleteTimeEntryModal' data-timeentry=${res.data.timeEntry._id}>Delete</button>`;
        html += `<button class="edit-time-entry-btn btn btn-sm btn-link" data-toggle='modal' data-target='#editTimeEntryModal' data-rownumber=${createdTimeEntriesTableRowNumber} data-timeentry=${res.data.timeEntry._id} data-date=${res.data.timeEntry.date} data-company=${res.data.timeEntry.company} data-hours=${res.data.timeEntry.hours} data-description=${res.data.timeEntry.description}>${editSVG}</button>`;
      }
      createdTimeEntriesTable.DataTable().row.add([
        `${moment.utc(res.data.timeEntry.date).format("YYYY-MM-DD")}`,
        `${companyName}`,
        `${res.data.timeEntry.hours}`,
        `${res.data.timeEntry.description}`,
        `${html}`
      ]).draw().node().id = `createdTimeEntriesTableRow-${createdTimeEntriesTableRowNumber}`;
      $('#createdTimeEntriesTableRow-'+createdTimeEntriesTableRowNumber).find('td:nth-child(3)').addClass('time-entry-hours');
      const totalCreatedHours = $('#totalCreatedHours');
      const newTotal = +totalCreatedHours.html() + +res.data.timeEntry.hours;
      totalCreatedHours.html(newTotal);
      // instantiateTimeEntryTableActions();
      // instantiateEditTimeEntryButton();
      $('#createTimeEntryForm #hours, #description').val('');
    })
    .catch(console.error);
}