import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { TaskService } from '../../shared/task.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [TaskService]
})
export class NavbarComponent implements OnInit {
    private listTitles: any[];
    location: Location;
    private toggleButton: any;
    private sidebarVisible: boolean;
    taskList: any[]
    urgencyNumber: number;
    completedNumber: number;
    inProgressNumber: number;
    notStartedNumber: number;
    urgencyTaskList: any[];
    completedTaskList: any[];
    inProgressTaskList: any[];
    notStartedTaskList: any[];
    

    constructor(location: Location,  private element: ElementRef, private taskService : TaskService) {
      this.location = location;
          this.sidebarVisible = false;
    }

    ngOnInit(){
      this.listTitles = ROUTES.filter(listTitle => listTitle);
      const navbar: HTMLElement = this.element.nativeElement;
      this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];

      //Pull the data
    var x = this.taskService.getData();
    x.snapshotChanges().subscribe(item => {
        this.taskList = [];
        item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.taskList.push(y as any);
        });

        this.urgencyTaskList = this.taskList.filter((el)=> {
        return el.status === 'Ad Hoc'
        });

        this.completedTaskList = this.taskList.filter((el)=> {
        return el.status === 'Completed'
        });

        this.notStartedTaskList = this.taskList.filter((el)=> {
        return el.status === 'Not Started'
        });

        this.inProgressTaskList = this.taskList.filter((el)=> {
        return el.status === 'In Progress'
        });
        this.urgencyNumber = this.urgencyTaskList.length;
        this.completedNumber = this.completedTaskList.length;
        this.inProgressNumber = this.inProgressTaskList.length;
        this.notStartedNumber = this.notStartedTaskList.length;

    });

    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);
        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };

    getTitle(){
      var titlee = this.location.prepareExternalUrl(this.location.path());
      if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 2 );
      }
      titlee = titlee.split('/').pop();

      for(var item = 0; item < this.listTitles.length; item++){
          if(this.listTitles[item].path === titlee){
              return this.listTitles[item].title;
          }
      }
      return 'Dashboard';
    }
}
