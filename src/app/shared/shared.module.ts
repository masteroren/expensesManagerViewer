import { MonthPickerComponent } from './components/month-picker/month-picker.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule
  ],
  declarations: [
    MonthPickerComponent
  ],
  exports: [
    MonthPickerComponent
  ]
})
export class SharedModule { }
