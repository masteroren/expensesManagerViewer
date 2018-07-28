import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SelectItem } from 'primeng/primeng';

var moment = require('moment');

export interface IDateRange {
  start: number;
  end: number;
}

@Component({
  selector: 'month-picker',
  templateUrl: './month-picker.component.html',
  styleUrls: ['./month-picker.component.scss']
})
export class MonthPickerComponent implements OnInit {

  @Output() onDateChanged: EventEmitter<IDateRange> = new EventEmitter();

  public selectedYear: number;
  public selectedMonth: number;
  public years: SelectItem[] = [];
  public months: SelectItem[] = [];
  private monthNames: string[] = ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'];

  constructor() { }

  ngOnInit() {
    for (let startYear = 2000; startYear <= 2050; startYear++) {
      this.years.push({ label: startYear.toString(), value: startYear })
    }
    for (let startMonth = 1; startMonth <= 12; startMonth++) {
      this.months.push({ label: this.monthNames[startMonth - 1], value: startMonth })
    }

    this.selectedYear = this.years.find(p => p.value == moment().get('year')).value;
    this.selectedMonth = this.months[moment().get('month')].value;

    this.dateChanged()
  }

  private dateChanged() {
    const year = this.years.find(p => p.value == this.selectedYear).value;
    const month = this.months[this.selectedMonth - 1].value;
    const daysInMonth = moment([year, month - 1]).daysInMonth();

    const start = moment([year, month - 1, 1]).toDate().getTime();
    const end = moment([year, month - 1, daysInMonth]).toDate().getTime();

    this.onDateChanged.emit({ start: start, end: end })
  }

}
