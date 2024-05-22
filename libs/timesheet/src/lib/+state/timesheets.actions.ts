import { createActionGroup, props } from '@ngrx/store';
import { TimesheetsEntity } from './timesheets.models';

export const TimesheetsActions = createActionGroup({
  source: 'Timesheets',
  events: {
    'Add Timesheet': props<{ timesheet: TimesheetsEntity }>(),
    'Remove Timesheet': props<{ timesheet: TimesheetsEntity }>(),
    'Load Timesheets': props<{ timesheets: TimesheetsEntity[] }>(),
    'Load Timesheets Success': props<{ timesheets: TimesheetsEntity[] }>(),
    'Load Timesheets Failure': props<{ error: any }>(),
  },
});
