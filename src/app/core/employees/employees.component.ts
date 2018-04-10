import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SelectItem } from 'primeng/primeng';
import { IEmployee } from '../../shared/interfaces/IEmployee';
import { HttpService } from '../../shared/services/httpService';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  employees: IEmployee[] = [];
  form: FormGroup;
  editMode: boolean = false;
  departments: SelectItem[] = [{
    label: 'R&D',
    value: 'R&D'
  }, {
    label: 'UX',
    value: 'UX'
  }, {
    label: 'Graphics',
    value: 'Graphics'
  }, {
    label: 'Sales',
    value: 'Sales'
  }];

  constructor(private httpService: HttpService, private fb: FormBuilder) {
    this.form = fb.group({
      id: ['', Validators.required],
      name: '',
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: '',
      phone: '',
      department: ''
    })
  }

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees() {
    this.httpService.employees().subscribe((data: IEmployee[]) => {
      this.employees = data
    });
  }

  addEmployee() {

    this.form.controls['name'].setValue(this.form.controls['firstName'].value + ' ' + this.form.controls['lastName'].value);

    if (this.form.valid) {
      this.httpService.addEmployee(this.form.value).subscribe(response => {
        this.getEmployees();
        this.resetValues();
      }, error => {

      })
    } else {
      console.log('form not valid');
    }

  }

  updateEmployee() {
    if (this.form.valid) {
      this.httpService.updateEmployee(this.form.value).subscribe(response => {
        this.getEmployees();
        this.resetValues();
        this.editMode = false;
      }, error => {

      })
    } else {
      console.log('form not valid');
    }
  }

  deleteEmployee() {
    this.httpService.deleteEmployee(this.form.value).subscribe(response => {
      this.getEmployees();
      this.resetValues();
      this.editMode = false;
    }, error => {

    })
  }

  returnToAdd() {
    this.getEmployees();
    this.resetValues();
    this.editMode = false;
  }

  onRowSelect(event) {
    this.form.controls['id'].setValue(event.data.id);
    this.form.controls['firstName'].setValue(event.data.firstName);
    this.form.controls['lastName'].setValue(event.data.lastName);
    this.form.controls['address'].setValue(event.data.address);
    this.form.controls['phone'].setValue(event.data.phone);
    this.form.controls['department'].setValue(event.data.department);
    this.editMode = true;
  }

  private resetValues() {
    this.form.controls['id'].setValue('');
    this.form.controls['firstName'].setValue('');
    this.form.controls['lastName'].setValue('');
    this.form.controls['address'].setValue('');
    this.form.controls['phone'].setValue('');
  }

}
