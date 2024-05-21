import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AgentsEntity } from './agents.models';

export const AgentsActions = createActionGroup({
  source: 'Agents',
  events: {
    'Load Agents': emptyProps(),
    'Load Agents Success': props<{ agents: AgentsEntity[] }>(),
    'Load Agents Failure': props<{ error: any }>(),
    'Select Id': props<{ selectedId: number }>(),
  },
});
