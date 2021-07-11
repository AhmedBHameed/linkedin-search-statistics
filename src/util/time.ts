import {Moment} from 'moment';

// eslint-disable-next-line
const moment = require('moment');

function utcTime(): Moment {
  return (moment(new Date()) as Moment).utc();
}

function parseYearFromDate(timestamp: string): string {
  return moment(timestamp).format('yyyy');
}

function stringYearToDate(year: string): Date {
  return moment(year, 'yyyy').toDate();
}

function getPassedTimeFrom(timestamp: string): number {
  return moment().diff(timestamp, 'minutes');
}

function addYear(timestamp: string, yearNum: number): Date {
  return moment(timestamp).add(yearNum, 'year').toDate();
}

function subMinutes(timestamp: Date, minutes: number): Date {
  return moment(timestamp).subtract(minutes, 'minutes').toDate();
}

export {utcTime, addYear, stringYearToDate, subMinutes, parseYearFromDate, getPassedTimeFrom};
