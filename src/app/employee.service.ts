import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './employee';

@Injectable()
export class EmployeeService {
private apiurl = "https://rc-vault-fap-live-1.azurewebsites.net/api/gettimeentries?code=vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ=="
employees:Employee[];
totalHoursMap:{[key:string]:number} = {};
constructor(private httpClient:HttpClient) {
    this.employees = [];
    this.totalHoursMap = {};
 }


getTimeEntries():Observable<Employee[]>{
    return this.httpClient.get<Employee[]>(this.apiurl);
}

calculateTotalHours(employees: Employee[]): { [key: string]: number } {
  const totalHoursMap: { [key: string]: number } = {};

  employees.forEach(employee => {
      if (employee.StarTimeUtc && employee.EndTimeUtc) {
          const startTime = new Date(employee.StarTimeUtc);
          const endTime = new Date(employee.EndTimeUtc);
          const difference: number = endTime.getTime() - startTime.getTime();
          const hoursWorked: number = Math.floor(difference / (1000 * 60 * 60));

          if (totalHoursMap[employee.EmployeeName]) {
              totalHoursMap[employee.EmployeeName] += hoursWorked;
          } else {
              totalHoursMap[employee.EmployeeName] = hoursWorked;
          }
      }
  });

  return totalHoursMap;
}
}



