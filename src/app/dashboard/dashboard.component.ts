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
      /* ----------===================---------- */

      const dataDailySalesChart: any = {
          labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
          series: [
              [12, 17, 7, 17, 23, 18, 38]
          ]
      };

     const optionsDailySalesChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
      }

      var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

      this.startAnimationForLineChart(dailySalesChart);


      /* ----------====================---------- */

      const dataCompletedTasksChart: any = {
          labels: ['12am', '3pm', '6pm', '9pm', '12pm', '3am', '6am', '9am'],
          series: [
              [230, 750, 450, 300, 280, 240, 200, 190]
          ]
      };

     const optionsCompletedTasksChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0}
      }

      var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

      // start animation for the Completed Tasks Chart - Line Chart
      this.startAnimationForLineChart(completedTasksChart);



      /* ----------====================---------- */

      var dataEmailsSubscriptionChart = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        series: [
          [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

        ]
      };
      var optionsEmailsSubscriptionChart = {
          axisX: {
              showGrid: false
          },
          low: 0,
          high: 1000,
          chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
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
      return el.status === 'Ad Hoc'
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

   });

   var y = this.taskService.getShopData();
   y.snapshotChanges().subscribe(item => {
     this.taskList = [];
     item.forEach(element => {
       var q = element.payload.toJSON();
       q["$key"] = element.key;
       this.taskList.push(q as any);
     });

     this.shopList = this.taskList.filter((el)=> {
        return el.PTC === 1; 
     });
   });

    var destination = this.taskService.getDestinationData();
    destination.snapshotChanges().subscribe(item => {
        this.taskList = [];
        item.forEach(element => {
          var q = element.payload.toJSON();
          q["$key"] = element.key;
          this.taskList.push(q as any);
        });

        this.destList = this.taskList;
     });
}

getDistanceFromLatLonInKm(at1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km

    var dLat = deg2rad(lat2-lat1);  // deg2rad below

    var dLon = deg2rad(lon2-lon1);

    var a =

    Math.sin(dLat/2) * Math.sin(dLat/2) +

    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *

    Math.sin(dLon/2) * Math.sin(dLon/2);

  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  var d = R * c; // Distance in km

  return d;
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
    }else{
      this.taskService.updateTask(taskForm.value);
      this.resetForm(taskForm);
      console.log("Task Updated");
    }
      
  }
}


