import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, of, switchMap } from 'rxjs';
import { TimesheetsActions } from './timesheets.actions';
import { TimesheetsFacade } from './timesheets.facade';

@Injectable()
export class TimesheetsEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);
  private timesheetsFacade = inject(TimesheetsFacade);

  loadAssignments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TimesheetsActions.loadTimesheets),
      switchMap(() => {
        const storedAssignments = localStorage.getItem('timesheets');

        if (storedAssignments) {
          return of(
            TimesheetsActions.loadTimesheetsSuccess({
              timesheets: JSON.parse(storedAssignments),
            })
          );
        } else {
          return of(
            TimesheetsActions.loadTimesheetsSuccess({
              timesheets: [],
            })
          );
        }
      }),
      catchError((error) => {
        console.error('Error loading assignments', error);
        return of(TimesheetsActions.loadTimesheetsFailure({ error }));
      })
    )
  );

  // saveAssignments$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(
  //         TimesheetsActions.addTimesheet,
  //         TimesheetsActions.removeTimesheet
  //       ),
  //       withLatestFrom(this.timesheetsFacade.allTimesheets$),
  //       tap(([_, timesheetsState]) => {
  //         const timesheets = timesheetsState.entities;
  //         const timesheetsArray = Object.keys(timesheets).map(
  //           (key) => timesheets[key]
  //         );
  //         localStorage.setItem('timesheets', JSON.stringify(timesheetsArray));
  //       })
  //     ),
  //   { dispatch: false }
  // );
}
