import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'
import {Task} from './task.model';
@Injectable()
export class TaskService {
 taskList: AngularFireList<any>;
 selectedTask: any;
 constructor(private firebase :AngularFireDatabase ) { }

 getData(){
   this.taskList = this.firebase.list('/tasks'); //if we want to do the users taks will be /Y4072/tasks
   return this.taskList;
 }

 insertTask(task : any)
 {
   this.taskList.push({
    locoId: task.locoId,
    repairman: task.repairman,
    status: task.status,
    description: task.description,
    arrivalDate: task.arrivalDate
   });
 }

 updateTask(task : any){
   this.taskList.update(task.$key,
     {
        locoId: task.locoId,
        repairman: task.repairman,
        status: task.status,
        description: task.description,
        arrivalDate: task.arrivalDate
     });
 }

 deleteTask($key : string){
   this.taskList.remove($key);
 }

}