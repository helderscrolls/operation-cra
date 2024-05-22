import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'lib-month-selector',
  standalone: true,
  imports: [NgFor],
  templateUrl: './month-selector.component.html',
  styleUrl: './month-selector.component.scss',
})
export class MonthSelectorComponent {
  @Input({ required: true }) currentMonth!: number;
  @Input({ required: true }) currentYear!: number;
  @Output() monthChanged = new EventEmitter<number>();

  getMonthName(month: number): string {
    const date = new Date();
    date.setMonth(month);
    return date.toLocaleString('default', { month: 'long' });
  }

  onMonthChange(event: Event): void {
    const selectedMonth = (event.target as HTMLSelectElement).value;
    this.monthChanged.emit(parseInt(selectedMonth, 10));
  }
}
