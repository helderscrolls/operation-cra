import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, of, switchMap, tap } from 'rxjs';
import { TimesheetsActions } from './timesheets.actions';
import { TimesheetsFacade } from './timesheets.facade';

@Injectable()
export class TimesheetsEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);
  private timesheetsFacade = inject(TimesheetsFacade);

  loadTimesheets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TimesheetsActions.loadTimesheets),
      switchMap(() => {
        const storedTimesheets = localStorage.getItem('timesheets');

        if (storedTimesheets) {
          return of(
            TimesheetsActions.loadTimesheetsSuccess({
              timesheets: JSON.parse(storedTimesheets),
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
        console.error('Error loading timesheets', error);
        return of(TimesheetsActions.loadTimesheetsFailure({ error }));
      })
    )
  );

  saveTimesheets$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TimesheetsActions.addTimesheet),
        tap((action) => {
          // Retrieve the existing timesheets from the localStorage or an empty array
          const timesheets = JSON.parse(
            localStorage.getItem('timesheets') ?? '[]'
          );

          timesheets.push(action.timesheet);

          // Stringify the updated array and store it back to the localStorage
          localStorage.setItem('timesheets', JSON.stringify(timesheets));
          console.log('here', timesheets);
        })
      ),
    { dispatch: false }
  );
}
