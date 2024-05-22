import { NgModule } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { MissionsEffects } from './+state/missions.effects';
import { MissionsFacade } from './+state/missions.facade';
import { MissionsFeature } from './+state/missions.feature';

@NgModule({
  providers: [
    MissionsFacade,
    provideState(MissionsFeature),
    provideEffects(MissionsEffects),
  ],
})
export class StateMissionsModule {}
