import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TableComponent } from './table/table.component';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts'
import { PieChartComponent } from './pie-chart/pie-chart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,TableComponent,PieChartComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'employees-table';
}
