/**
 * Interface for the 'Timesheets' data
 */
export interface TimesheetsEntity {
  id: string; // combination of missionId and date
  missionId: number;
  date: string; // ISO date string (YYYY-MM-DD)
  agentIds: number[];
}
