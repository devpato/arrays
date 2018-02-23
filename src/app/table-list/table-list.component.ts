import { Component, OnInit } from '@angular/core';
import { TaskService } from '../shared/task.service'
@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css'],
  providers: [TaskService]
})
export class TableListComponent implements OnInit {

  constructor(private taskService : TaskService) { }

  ngOnInit() {
  }

}
