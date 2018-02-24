import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'
import {Task} from './task.model';
@Injectable()
export class TaskService {
 taskList: AngularFireList<any>;
 destList: AngularFireList<any>;
 shopList: AngularFireList<any>;
 locoList: AngularFireList<any>; 
 selectedTask: any;
 constructor(private firebase :AngularFireDatabase ) { }

 getData(){
   this.taskList = this.firebase.list('/tasks'); //if we want to do the users taks will be /Y4072/tasks
   return this.taskList;
 }

 getShops(){
  this.shopList = this.firebase.list('/shops'); //if we want to do the users taks will be /Y4072/tasks
  return this.shopList;
}

 getDestinationData() {
   this.destList = this.firebase.list('/destination'); //if we want to do the users taks will be /Y4072/tasks
   return this.destList;
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

 deleteLoco(LOCOMOTIVE_I : string){
  this.destList.remove(LOCOMOTIVE_I);
}

}