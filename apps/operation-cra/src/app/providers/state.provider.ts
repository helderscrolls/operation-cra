import { importProvidersFrom } from '@angular/core';
import { StateAgentsModule } from '@operation-cra/agents';
import { StateMissionsModule } from '@operation-cra/missions';
import { StateTimesheetModule } from '@operation-cra/timesheet';

export const provideState = () =>
  importProvidersFrom([
    StateAgentsModule,
    StateMissionsModule,
    StateTimesheetModule,
  ]);
