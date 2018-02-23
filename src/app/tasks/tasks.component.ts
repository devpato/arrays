import { Component, OnInit } from '@angular/core';
import { TaskService } from '../shared/task.service'
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  providers: [TaskService]
})
export class TasksComponent implements OnInit {

  constructor(private taskService : TaskService) { }

  ngOnInit() {
  }

}
