import { Route } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { MissionsEffects } from './+state/missions.effects';
import { MissionsFacade } from './+state/missions.facade';
import { MissionsFeature } from './+state/missions.feature';
import { MissionsComponent } from './missions.component';

export const missionsRoutes: Route[] = [
  {
    path: '',
    component: MissionsComponent,
    providers: [
      MissionsFacade,
      provideState(MissionsFeature),
      provideEffects(MissionsEffects),
    ],
  },
];
