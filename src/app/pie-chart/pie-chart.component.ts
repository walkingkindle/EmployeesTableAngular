import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { TableComponent } from '../table/table.component';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { Inject,PLATFORM_ID } from '@angular/core';
import { NgxEchartsDirective, NgxEchartsModule } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import { error } from 'console';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
  standalone:true,
  imports:[TableComponent,CommonModule,NgxEchartsDirective],
  providers:[EmployeeService]
})
export class PieChartComponent implements OnInit {
  public isBrowser:boolean; 
  @ViewChild('pieChart')
  pieChart!: ElementRef<HTMLCanvasElement>;
  chartOption:EChartsOption;
  employees!:Employee[]
  totalHoursMap:{[key:string]:number} = {};
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private employeeService: EmployeeService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.chartOption = {
      backgroundColor: '#2c343c',
      title: {
        text: 'Employees and Work Hours',
        left: 'center',
        top: 20,
        textStyle: {
          color: '#ccc',
        },
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      series: [{
        name: 'Counters',
        type: 'pie',
        radius: '55%',
        center: ['50%', '50%'],
        roseType: 'radius',
        label: {
          color: 'rgba(255, 255, 255, 0.3)',
        },
        labelLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.3)',
          },
          smooth: 0.2,
          length: 10,
          length2: 20,
        },
        itemStyle: {
          color: '#c23531',
          shadowBlur: 200,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      }],
    };
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.employeeService.getTimeEntries().subscribe(data => {
        this.employees = data;
        this.totalHoursMap = this.employeeService.calculateTotalHours(this.employees);
        this.updateChart();
      },error => {
        console.error("Error retrieving data from the API",error);
      });
    }
  }
  updateChart() {
    const chartData = Object.keys(this.totalHoursMap).map(key => ({
      name: key,
      value: this.totalHoursMap[key],
    }));
    if (Array.isArray(this.chartOption.series)) {
      (this.chartOption.series[0] as any).data = chartData;
    }
  }
}


