import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { error } from 'console';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  imports:[CommonModule],
  providers:[EmployeeService,HttpClient],
  standalone:true
})
export class TableComponent implements OnInit {
  employees:Employee[];

  totalHoursMap:{[key:string]:number} = {};
  constructor(private employeeService:EmployeeService) {
    this.employees = [];
    this.totalHoursMap = {};
   }

  ngOnInit():void {
    this.employeeService.getTimeEntries().subscribe(data => {
      this.employees = data; 
      this.totalHoursMap = this.employeeService.calculateTotalHours(this.employees)
    }, error => {
      console.error("Error retrieving data from the API",error);
    })
  }

  formatHours(hours:number):string{
    return Math.round(hours) + ' hours';
  }
  



}
