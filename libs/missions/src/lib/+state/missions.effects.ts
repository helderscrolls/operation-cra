import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, switchMap } from 'rxjs';
import { MissionsActions } from './missions.actions';

@Injectable()
export class MissionsEffects {
  private actions$ = inject(Actions);

  loadMissions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MissionsActions.loadMissions),
      switchMap(() => {
        const storedMissions = localStorage.getItem('missions');

        if (storedMissions) {
          return of(
            MissionsActions.loadMissionsSuccess({
              missions: JSON.parse(storedMissions),
            })
          );
        } else {
          return of(
            MissionsActions.loadMissionsSuccess({
              missions: [
                { id: 1, topSecretMissionName: '006: Save The Nyan Cat' },
                {
                  id: 2,
                  topSecretMissionName: '009: The King of Zumba',
                },
                {
                  id: 3,
                  topSecretMissionName: '007: From Wish',
                },
              ],
            })
          );
        }
      }),
      catchError((error) => {
        console.error('Error', error);
        return of(MissionsActions.loadMissionsFailure({ error }));
      })
    )
  );
}
