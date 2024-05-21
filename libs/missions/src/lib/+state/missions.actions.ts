import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { MissionsEntity } from './missions.models';

export const MissionsActions = createActionGroup({
  source: 'Missions',
  events: {
    'Load Missions': emptyProps(),
    'Load Missions Success': props<{ missions: MissionsEntity[] }>(),
    'Load Missions Failure': props<{ error: any }>(),
    'Select Id': props<{ selectedId: number }>(),
  },
});
