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
    ptcShops: any[];
    destinations : any[]; 
    closetDis: any[];
    list : any[];
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
 
      this.ptcShops = this.shops.filter((el)=> {
         return el.PTC === 1; 
      });

      var z = this.taskService.getDestinationData();
      z.snapshotChanges().subscribe(item => {
         this.list = [];
         item.forEach(element => {
           var y = element.payload.toJSON();
           y["$key"] = element.key;
           this.list.push(y as any);
         });
        
        this.closetDis = this.findClosestDestination(this.list,this.ptcShops);
       });
    }); 
  }

  findClosestDestination(compareDestList, compareShopList) {
    var distance;
    var distanceArray = [];
    for (var i=0; i<compareDestList.length; i++) {
      for (var j=0; j<compareShopList.length; j++) {
        distance = this.getDistanceFromLatLonInKm(compareDestList[i].DEST_LAT, compareDestList[i].DEST_LON, compareShopList[j].LAT, compareShopList[j].LON);
        if (distance <= 125) {
            distanceArray.push(compareDestList[i]);
        }
      }
      // Thres hold for shop area is 125 feet
    }
  
    return distanceArray;
  }

  getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 3959; // Radius of the earth in miles
    var a =
                  Math.sin(this.deg2rad(lat1)) * Math.sin(this.deg2rad(lat2)) +
                  Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
                  Math.cos(this.deg2rad(lon2-lon1));
    var c = Math.acos(a);
    var d = R * c; // Distance in miles
    return d;
}

  deg2rad(deg) {
    return deg*(Math.PI/180);
  }
}
