import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { TaskService } from '../shared/task.service'
import { NgForm } from '@angular/forms'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [TaskService]
})
export class DashboardComponent implements OnInit {
  taskList: any[]
  urgencyNumber: number;
  completedNumber: number;
  inProgressNumber: number;
  notStartedNumber: number;
  shopList: any[];
  destList: any[];
  urgencyTaskList: any[];
  completedTaskList: any[];
  inProgressTaskList: any[];
  notStartedTaskList: any[];
  shops : any[]; 
  ptcShops: any[];
  destinations : any[]; 
  closetDis: any[];
  list : any[];
  toBeDeleted : string;
  /*********/

  constructor(private taskService : TaskService) { }
  startAnimationForLineChart(chart){
      let seq: any, delays: any, durations: any;
      seq = 0;
      delays = 80;
      durations = 500;

      chart.on('draw', function(data) {
        if(data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if(data.type === 'point') {
              seq++;
              data.element.animate({
                opacity: {
                  begin: seq * delays,
                  dur: durations,
                  from: 0,
                  to: 1,
                  easing: 'ease'
                }
              });
          }
      });

      seq = 0;
  };
  startAnimationForBarChart(chart){
      let seq2: any, delays2: any, durations2: any;

      seq2 = 0;
      delays2 = 80;
      durations2 = 500;
      chart.on('draw', function(data) {
        if(data.type === 'bar'){
            seq2++;
            data.element.animate({
              opacity: {
                begin: seq2 * delays2,
                dur: durations2,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            });
        }
      });

      seq2 = 0;
  };
  ngOnInit() {      
     

      this.resetForm();  
   /****
   * FIREBASE DISPLAY TASK
   */ 
   

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
      return el.status === 'Pending'
    });

    this.completedTaskList = this.taskList.filter((el)=> {
      return el.status === 'Completed'
    });

    this.notStartedTaskList = this.taskList.filter((el)=> {
      return el.status === 'Incoming'
    });

    this.inProgressTaskList = this.taskList.filter((el)=> {
      return el.status === 'In Progress'
    });
    this.urgencyNumber = this.urgencyTaskList.length;
    this.completedNumber = this.completedTaskList.length;
    this.inProgressNumber = this.inProgressTaskList.length;
    this.notStartedNumber = this.notStartedTaskList.length;

    /* ----------====================---------- */
    //ADHOC graph RED GRAPH
    var janList = this.urgencyTaskList.filter((el)=> {
      return el.arrivalDate.split('-')[1] === '01'
    });

    var febList = this.urgencyTaskList.filter((el)=> {
      return el.arrivalDate.split('-')[1] === '02'
    });

    var marchList = this.urgencyTaskList.filter((el)=> {
      return el.arrivalDate.split('-')[1] === '03'
    });

    var apriList = this.urgencyTaskList.filter((el)=> {
      return el.arrivalDate.split('-')[1] === '04'
    });

    var mayList = this.urgencyTaskList.filter((el)=> {
      return el.arrivalDate.split('-')[1] === '05'
    });

    var junList = this.urgencyTaskList.filter((el)=> {
      return el.arrivalDate.split('-')[1] === '06'
    });

    var julyList = this.urgencyTaskList.filter((el)=> {
      return el.arrivalDate.split('-')[1] === '07'
    });

    var agtList = this.urgencyTaskList.filter((el)=> {
      return el.arrivalDate.split('-')[1] === '08'
    });

    var sepList = this.urgencyTaskList.filter((el)=> {
      return el.arrivalDate.split('-')[1] === '09'
    });

    var octList = this.urgencyTaskList.filter((el)=> {
      return el.arrivalDate.split('-')[1] === '10'
    });

    var novList = this.urgencyTaskList.filter((el)=> {
      return el.arrivalDate.split('-')[1] === '11'
    });

    var decList = this.urgencyTaskList.filter((el)=> {
      return el.arrivalDate.split('-')[1] === '12'
    });
    const dataCompletedTasksChart: any = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        series: [
            [janList.length, febList.length, marchList.length, apriList.length, mayList.length, junList.length, julyList.length, agtList.length, sepList.length, octList.length, novList.length,decList.length]
        ]
    };

   const optionsCompletedTasksChart: any = {
        lineSmooth: Chartist.Interpolation.cardinal({
            tension: 0
        }),
        low: 0,
        high: 10, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
        chartPadding: { top: 0, right: 0, bottom: 0, left: 0}
    }

    var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

    // start animation for the Completed Tasks Chart - Line Chart
    this.startAnimationForLineChart(completedTasksChart);
    /* ----------===================---------- */
    var janListc = this.completedTaskList.filter((el)=> {
      return el.arrivalDate.split('-')[1] === '01'
    });

    var febListc = this.completedTaskList.filter((el)=> {
      return el.arrivalDate.split('-')[1] === '02'
    });

    var marchListc = this.completedTaskList.filter((el)=> {
      return el.arrivalDate.split('-')[1] === '03'
    });

    var apriListc = this.completedTaskList.filter((el)=> {
      return el.arrivalDate.split('-')[1] === '04'
    });

    var mayListc = this.completedTaskList.filter((el)=> {
      return el.arrivalDate.split('-')[1] === '05'
    });

    var junListc = this.completedTaskList.filter((el)=> {
      return el.arrivalDate.split('-')[1] === '06'
    });

    var julyListc = this.completedTaskList.filter((el)=> {
      return el.arrivalDate.split('-')[1] === '07'
    });

    var agtListc = this.completedTaskList.filter((el)=> {
      return el.arrivalDate.split('-')[1] === '08'
    });

    var sepListc = this.completedTaskList.filter((el)=> {
      return el.arrivalDate.split('-')[1] === '09'
    });

    var octListc = this.completedTaskList.filter((el)=> {
      return el.arrivalDate.split('-')[1] === '10'
    });

    var novListc = this.completedTaskList.filter((el)=> {
      return el.arrivalDate.split('-')[1] === '11'
    });

    var decListc = this.completedTaskList.filter((el)=> {
      return el.arrivalDate.split('-')[1] === '12'
    });

    const dataDailySalesChart: any = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      series: [
          [janListc.length, febListc.length, marchListc.length, apriListc.length, mayListc.length, junListc.length, julyListc.length, agtListc.length, sepListc.length, octListc.length, novListc.length,decListc.length]
      ]
  };

 const optionsDailySalesChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0
      }),
      low: 0,
      high: 10, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
  }

  var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

  this.startAnimationForLineChart(dailySalesChart);

  /* ----------====================---------- */
  //3rd graph
  var janLista = this.closetDis.filter((el)=> {
    return el.DEST_LAT === 39.62992575
  });

  var febLista = this.closetDis.filter((el)=> {
    return el.DEST_LAT === 38.42227118
  });

  var marchLista = this.closetDis.filter((el)=> {
    return el.DEST_LAT === 39.62992575
  });
  console.log("graphsss")
  console.log(this.closetDis)
  var dataEmailsSubscriptionChart = {
    labels: ['WAYCROSS','HUNTINGTON','CUMBERLAND'],
    series: [
      [1,2,3]
  ]
  };
  var optionsEmailsSubscriptionChart = {
      axisX: {
          showGrid: false
      },
      low: 0,
      high: 10,
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0}
  };
  var responsiveOptions: any[] = [
    ['screen and (max-width: 640px)', {
      seriesBarDistance: 5,
      axisX: {
        labelInterpolationFnc: function (value) {
          return value[0];
        }
      }
    }]
  ];
  var emailsSubscriptionChart = new Chartist.Bar('#emailsSubscriptionChart', dataEmailsSubscriptionChart, optionsEmailsSubscriptionChart, responsiveOptions);

  //start animation for the Emails Subscription Chart
  this.startAnimationForBarChart(emailsSubscriptionChart);

   });
   /*********************************/
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
        /* ----------====================---------- */
  //3rd graph
  var janLista = this.closetDis.filter((el)=> {
    return el.CITY_N === 'WAYCROSS SHOP'
  });

  var febLista = this.closetDis.filter((el)=> {
    return el.CITY_N == 'HUNTINGTON SHOP'
  });

  var marchLista = this.closetDis.filter((el)=> {
    return el.CITY_N === 'CUMBERLAND SHOP'
  });
  console.log("waycross")
  console.log(this.closetDis)
  var dataEmailsSubscriptionChart = {
    labels: ['WAYCROSS','HUNTINGTON','CUMBERLAND'],
    series: [
      [janLista.length,febLista.length,marchLista.length]
  ]
  };
  var optionsEmailsSubscriptionChart = {
      axisX: {
          showGrid: false
      },
      low: 0,
      high: 50,
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0}
  };
  var responsiveOptions: any[] = [
    ['screen and (max-width: 640px)', {
      seriesBarDistance: 5,
      axisX: {
        labelInterpolationFnc: function (value) {
          return value[0];
        }
      }
    }]
  ];
  var emailsSubscriptionChart = new Chartist.Bar('#emailsSubscriptionChart', dataEmailsSubscriptionChart, optionsEmailsSubscriptionChart, responsiveOptions);

  //start animation for the Emails Subscription Chart
  this.startAnimationForBarChart(emailsSubscriptionChart);

 
       
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
          compareDestList[i].CITY_N = compareShopList[j].CITY_N;
          distanceArray.push(compareDestList[i]);
      }
    }
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

delete(loco) {
 this.toBeDeleted = loco.value;
 console.log('asdfa');
  console.log(loco.value);
}

format(data) {
  return data.split('-')[0];
}

//TABLE OPERATIONS
onEdit(task: any ) {
  this.taskService.selectedTask = Object.assign({}, task);
}

onDelete(key: string) {
  if (confirm('Are you sure to delete this record ?') == true) {
    this.taskService.deleteTask(key);
    console.log("Deleted Successfully", "Task register");
  }
}

//FORM OPERATIONS
resetForm(taskForm?: NgForm) {
  if (taskForm != null)
  taskForm.reset();
  this.taskService.selectedTask = {
    $key: null,
    locoId: '',
    repairman: '',
    status: '',
    description: '',
    arrivalDate: ''
  }
}
  onSubmit(taskForm: NgForm) {
    if (taskForm.value.$key == null) {
       console.log(taskForm.value);
      this.taskService.insertTask(taskForm.value);
      console.log("Task Created");
      console.log(taskForm.value.$key);
      //this.taskService.deleteLoco(this.toBeDeleted);
      this.closetDis.pop();
    }else{
      this.taskService.updateTask(taskForm.value);
      this.resetForm(taskForm);
      console.log("Task Updated");
      console.log(taskForm.value.$key);
    }
      
  }
}


