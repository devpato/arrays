import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'
import {Task} from './task.model';
@Injectable()
export class TaskService {
 taskList: AngularFireList<any>;
 selectedEmployee: any;
 constructor(private firebase :AngularFireDatabase ) { }

 getData(){
   this.taskList = this.firebase.list('task');
   return this.taskList;
 }

 insertTask(task : Task)
 {
   this.taskList.push({
    locoId: task.locoId,
    repairman: task.repairman,
    status: task.status,
    description: task.description
   });
 }

 updateEmployee(task : Task){
   this.taskList.update(task.$key,
     {
        locoId: task.locoId,
        repairman: task.repairman,
        status: task.status,
        description: task.description
     });
 }

 deleteEmployee($key : string){
   this.taskList.remove($key);
 }

}