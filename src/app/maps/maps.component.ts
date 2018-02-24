import { Component, OnInit } from '@angular/core';
import { TaskService } from '../shared/task.service'
declare const google: any;
interface Marker {
lat: number;
lng: number;
label?: string;
draggable?: boolean;
}
@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css'],
  providers: [TaskService]
})
export class MapsComponent implements OnInit {
    lat: number = 31.18317569;
    lng: number = -82.3937315;
    zoom: number = 6;
    shops : any[]; 
  constructor(private taskService : TaskService) { }

  ngOnInit() {
    var x = this.taskService.getShops();
    x.snapshotChanges().subscribe(item => {
      this.shops = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.shops.push(y as any);
      });
      console.log(/********************************/);
      this.shops.forEach(element => {
        console.log(element.LAT + "+" + element.LON );
      });
    });
  }

}
