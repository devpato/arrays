import { Component, OnInit } from '@angular/core';
import { TaskService } from '../shared/task.service'
@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css'],
  providers: [TaskService],
  
})
export class TableListComponent implements OnInit {
  shops : any[]; 
  ptcShops: any[];
  destinations : any[]; 
  closetDis: any[];
  list: any[];
  trains: any[];
  trainList: any[];
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

        var z = this.taskService.getDestinationData();
        z.snapshotChanges().subscribe(item => {
          this.trains = [];
          item.forEach(element => {
            var y = element.payload.toJSON();
            y["$key"] = element.key;
            this.trains.push(y as any);
          });

          this.trainList = this.mapTrainsWithDest(this.destinations, this.trains);
        });
       });
    });
  }

  mapTrainsWithDest(destList, trainList) {
    var tempList = [];
    for (var i=0; i<destList.length; i++) {
      for (var j=0; j<trainList.length; j++) {
        if (destList[i].TRAIN_I === trainList[j].TRAIN_I) {
          tempList.push(trainList[j]);
        }
      }
    }
    return tempList;
  }

  changeShop() {

  }

  findClosestDestination(compareDestList, compareShopList) {
    var distance;
    var distanceArray = [];
    for (var i=0; i<compareDestList.length; i++) {
      for (var j=0; j<compareShopList.length; j++) {
        distance = this.getDistanceFromLatLonInKm(compareDestList[i].LAT, compareDestList[i].LON, compareShopList[j].LAT, compareShopList[j].LON);
        if (distance <= 125) {
            distanceArray.push(compareDestList[i]);
        }
      }
      // Thres hold for shop area is 125 feet
    }
  
    return distanceArray;
  }

  getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km

    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below

    var dLon = this.deg2rad(lon2-lon1);

    var a =

    Math.sin(dLat/2) * Math.sin(dLat/2) +

    Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *

    Math.sin(dLon/2) * Math.sin(dLon/2);

  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  var d = R * c; // Distance in km

  return d;
}

deg2rad(deg) {
  return deg*(Math.PI/180);
}

}
