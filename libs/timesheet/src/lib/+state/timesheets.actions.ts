import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { TimesheetsEntity } from './timesheets.models';

export const TimesheetsActions = createActionGroup({
  source: 'Timesheets',
  events: {
    'Add Timesheet': props<{ timesheet: TimesheetsEntity }>(),
    'Remove Timesheet': props<{ timesheetId: number }>(),
    'Load Timesheets': emptyProps(),
    'Load Timesheets Success': props<{ timesheets: TimesheetsEntity[] }>(),
    'Load Timesheets Failure': props<{ error: any }>(),
  },
});
