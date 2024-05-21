import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, switchMap } from 'rxjs';
import { AgentsActions } from './agents.actions';

@Injectable()
export class AgentsEffects {
  private actions$ = inject(Actions);

  loadAgents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AgentsActions.loadAgents),
      switchMap(() => {
        const storedAgents = localStorage.getItem('agents');

        if (storedAgents) {
          return of(
            AgentsActions.loadAgentsSuccess({
              agents: JSON.parse(storedAgents),
            })
          );
        } else {
          return of(
            AgentsActions.loadAgentsSuccess({
              agents: [
                { id: 1, name: 'Deder', availableVacations: 7 },
                { id: 2, name: 'Gecko', availableVacations: 7 },
                { id: 3, name: 'Valkyrie', availableVacations: 7 },
              ],
            })
          );
        }
      }),
      catchError((error) => {
        console.error('Error', error);
        return of(AgentsActions.loadAgentsFailure({ error }));
      })
    )
  );
}
