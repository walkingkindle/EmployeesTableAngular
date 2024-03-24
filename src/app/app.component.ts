import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TableComponent } from './table/table.component';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,TableComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'employees-table';
}
