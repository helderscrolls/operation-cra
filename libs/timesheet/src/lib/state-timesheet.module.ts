import { NgModule } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { TimesheetsEffects } from './+state/timesheets.effects';
import { TimesheetsFacade } from './+state/timesheets.facade';
import { TimesheetsFeature } from './+state/timesheets.feature';

@NgModule({
  providers: [
    TimesheetsFacade,
    provideState(TimesheetsFeature),
    provideEffects(TimesheetsEffects),
  ],
})
export class StateTimesheetModule {}
