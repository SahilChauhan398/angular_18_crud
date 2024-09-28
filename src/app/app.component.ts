import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { EmployeeModel } from './model/Employee';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular_18_crud';

  employeeForm: FormGroup = new FormGroup({});
  employeeObj: EmployeeModel = new EmployeeModel();
  employeeList: EmployeeModel[] = [];
  constructor() {
    this.createForm();
    const oldData = localStorage.getItem("EmpData");
    if (oldData != null) {
      const parseData = JSON.parse(oldData);
      this.employeeList = parseData;
    }
  }

  createForm() {
    this.employeeForm = new FormGroup({
      empId: new FormControl(this.employeeObj.empId),
      name: new FormControl(this.employeeObj.name, [Validators.required]),
      emailId: new FormControl(this.employeeObj.emailId),
      contactNo: new FormControl(this.employeeObj.contactNo),
      state: new FormControl(this.employeeObj.state),
      city: new FormControl(this.employeeObj.city),
      pincode: new FormControl(this.employeeObj.pincode, [Validators.required, Validators.minLength(6)]),
      address: new FormControl(this.employeeObj.address)
    });
  }

  onSave() {
    const oldData = localStorage.getItem("EmpData");
    if (oldData != null) {
      const parseData = JSON.parse(oldData);
      this.employeeForm.controls['empId'].setValue(parseData.length + 1);
      this.employeeList.unshift(this.employeeForm.value);
    } else {
      this.employeeList.unshift(this.employeeForm.value);
    }
    localStorage.setItem("EmpData", JSON.stringify(this.employeeList));
    this.reset();
  }

  onEdit(item: EmployeeModel) {
    this.employeeObj = item;
    this.createForm();
  }

  onUpdate() {
    const record = this.employeeList.find(m => m.empId == this.employeeForm.controls['empId'].value);
    if (record != undefined) {
      record.name = this.employeeForm.controls['name'].value;
      record.emailId = this.employeeForm.controls['emailId'].value;
      record.contactNo = this.employeeForm.controls['contactNo'].value;
      record.state = this.employeeForm.controls['state'].value;
      record.city = this.employeeForm.controls['city'].value;
      record.pincode = this.employeeForm.controls['pincode'].value;
      record.address = this.employeeForm.controls['address'].value;
    }
    localStorage.setItem("EmpData", JSON.stringify(this.employeeList));
    this.reset();
  }
  onDelete(id: number) {
    const isDelete = confirm("Are you sure Want to Delete the Record");
    if (isDelete) {
      const index = this.employeeList.findIndex(m => m.empId == id);
      this.employeeList.splice(index, 1);
      localStorage.setItem("EmpData", JSON.stringify(this.employeeList));
    }
  }

  reset() {
    this.employeeObj = new EmployeeModel();
    this.createForm();
  }
}

