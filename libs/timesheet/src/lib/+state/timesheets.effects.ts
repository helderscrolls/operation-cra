import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, switchMap, tap } from 'rxjs';
import { TimesheetsActions } from './timesheets.actions';
import { TimesheetsEntity } from './timesheets.models';

@Injectable()
export class TimesheetsEffects {
  private actions$ = inject(Actions);

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
          const timesheets: TimesheetsEntity[] = JSON.parse(
            localStorage.getItem('timesheets') ?? '[]'
          );

          // Find the index of the existing timesheet with the same id
          const index = timesheets.findIndex(
            (ts) => ts.id === action.timesheet.id
          );

          if (index !== -1) {
            // If found, update the existing entry
            timesheets[index] = action.timesheet;
          } else {
            // Otherwise, add the new entry
            timesheets.push(action.timesheet);
          }

          // Stringify the updated array and store it back to the localStorage
          localStorage.setItem('timesheets', JSON.stringify(timesheets));
        })
      ),
    { dispatch: false }
  );
}
