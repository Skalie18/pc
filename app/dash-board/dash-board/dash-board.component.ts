import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DashboardDataService } from '../dashboard-service.service';
import swal from 'sweetalert2';
import { DashboardDataClass } from '../dash-board-class';
import { totalmem } from 'os';
import { ChartModule } from 'primeng/primeng';
import { Globals } from '../../globals';
import * as _ from 'underscore';

const DEFAULT_COLORS = ['#3366CC', '#DC3912', '#FF9900', '#109618', '#990099',
  '#3B3EAC', '#0099C6', '#DD4477', '#66AA00', '#B82E2E',
  '#316395', '#994499', '#22AA99', '#AAAA11', '#6633CC',
  '#E67300', '#8B0707', '#329262', '#5574A6', '#3B3EAC'];

@Component({
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: []
})
export class DashBoardComponent implements OnInit {
  progresschartServiceData: any;
  sardata: any;
  mydata: any;
  newitemsdata: any;
  pendeddata: any;
  regiondata: any;
  progressdata: any;
  saroptions: any;
  myoptions: any;
  newoptions: any;
  pendedoptions: any;
  regionoptions: any;
  progoptions: any ;
  errorMessage: string;

  progValue = 0;
  isLoaded = false;
  @ViewChild('sarchart') sarchart;
  @ViewChild('mychart') mychart;
  @ViewChild('newitems') newitems;
  @ViewChild('pendedchart') pendedchart;
  @ViewChild('regionitems') regionitems;
  @ViewChild('progresschart') progresschart;
  caseFilter = 'VDDL';
  constructor(private dashboadDataService: DashboardDataService, private globals: Globals) { }

  ngOnInit() {

    this.setupCharts();
    this.setupChartOptions();
    const interval = setInterval(() => {
      // this.progValue +=10;  // this.progValue + Math.floor(Math.random() * 10) + 1;
      if (this.dashboadDataService.testReady()) {
        if (this.progValue === 0) {
          this.loadProgressDash();
          this.loadDashData();   // load data when the webapi connects
          this.progValue = 10;
        }
      }
      if (this.isLoaded) {
        clearInterval(interval);    // stop the timer
      }
    }, 1000);
  }

  private configureDefaultColours(data: number[]): string[] {
    let customColours = [];
    if (data.length) {
      customColours = data.map((element, idx) => {
        return DEFAULT_COLORS[idx % DEFAULT_COLORS.length];
      });
    }
    return customColours;
  }

  loadDashData() {
    this.dashboadDataService.getDashBoard()
      .subscribe(res => {
        if (res != null) {
          this.generateChart(res);
          this.dashboadDataService.getMyDashBoard()
            .subscribe(mres => {
              if (mres != null) {
                this.generateMyChart(mres);
              } else {
                this.mychart.refresh();
                this.isLoaded = true;
              }
            });
          } else {
          swal('No Records Found!', '', 'info');
        }
      },
        error => this.errorMessage = <any>error);
  }

  generateChart(res: any) {
    let sdata = res;
    sdata = this.summariseData(sdata, 'CurrentStatus');
    this.sardata.datasets[0].data = sdata.map(a => a[1]);

    const pieColors = this.configureDefaultColours(sdata.map(a => a[1]));
    this.sardata.datasets[0].backgroundColor = pieColors;
    this.sardata.labels = sdata.map(a => a[0]);

    let regdata = res;
    regdata = this.summariseData(regdata, 'RegionName');
    const regColors = this.configureDefaultColours(regdata.map(a => a[1]));
    this.regiondata.datasets[0].data = regdata.map(a => a[1]);
    this.regiondata.datasets[0].backgroundColor = regColors;
    this.regiondata.labels = regdata.map(a => a[0]);

    let newdata = res.filter(x => x.MasterStatus === 'New');
    newdata = this.summariseData(newdata, 'MasterStatus');

    this.newitemsdata.datasets[0].data = newdata.map(a => a[1]);
    this.newitemsdata.labels = newdata.map(a => a[0]);
    // CRCS: Pending
    let pendedcases = res.filter(x => x.CurrentStatus === 'CRCS: Pending');
    pendedcases = this.summariseData(pendedcases, 'MasterStatus');
    this.pendeddata.datasets[0].data = pendedcases.map(a => a[1]);
    this.pendeddata.labels = pendedcases.map(a => a[0]);

    this.sarchart.refresh();
    this.newitems.refresh();
    this.pendedchart.refresh();
    this.regionitems.refresh();
  }

  generateMyChart(res: any) {
    let vdata = res;
    vdata = this.summariseData(vdata, 'CurrentStatus');
    this.mydata.labels = vdata.map(a => a[0]);
    this.mydata.datasets[0].data = vdata.map(a => a[1]);
    const vColors = this.configureDefaultColours(vdata.map(a => a[1]));
    this.mydata.datasets[0].backgroundColor = vColors;
    this.mychart.refresh();
    this.isLoaded = true;
  }
  summariseData(data: any, fieldname: string): any {
    return function (data) {
      const r = [];
      data.forEach(function (a) {
        if (!this[a[fieldname]]) {
          this[a[fieldname]] = [a[fieldname], 0];
          r.push(this[a[fieldname]]);
        }
        this[a[fieldname]][1] += +a['Cases'];
      }, {});
      return r;
    }(data);
  }

  setupCharts() {
    this.sardata = {
      labels: [],
      datasets: [
        {
          label: 'Current Status',
          data: []
        }
      ]
    };
    this.mydata = {
      labels: [],
      datasets: [
        {
          label: 'My Current Status',
          data: [],
          fillText: []
        }
      ]
    };
    this.newitemsdata = {
      labels: [],
      datasets: [
        {
          label: 'New Cases',
          backgroundColor: 'green',
          data: []
        }
      ]
    };
    this.regiondata = {
      labels: [],
      datasets: [
        {
          label: 'Cases per region',
          data: []
        }
      ]
    };
    this.pendeddata = {
      labels: [],
      datasets: [
        {
          backgroundColor: 'blue',
          data: []
        }
      ]
    };
  }

  setupChartOptions() {
    this.saroptions = {
      title: {
        display: true,
        text: 'All Case Summary',
        fontSize: 20,
        fontColor: 'black'
      },
      legend: {
        display: false
      },
      responsive: true,
      maintainAspectRatio: false,
      cutoutPercentage: 30
    };

    this.newoptions = {
      title: {
        display: true,
        text: 'New Cases',
        fontSize: 20,
        fontColor: 'black'
      },
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            fontColor: 'black'
          }
        }],
        xAxes: [{
          display: false
        }]
      },
      responsive: true,
      maintainAspectRatio: false
    };

    this.pendedoptions = {
      title: {
        display: true,
        text: 'Pending Cases',
        fontSize: 20,
        fontColor: 'black'
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            fontColor: 'black'
          }
        }],
        xAxes: [{
          ticks: {
            fontColor: 'black'
          }
        }]
      },
      legend: {
        position: 'none'
      },
      responsive: true,
      maintainAspectRatio: false
    };

    this.regionoptions = {
      title: {
        display: true,
        text: 'Region Information',
        fontSize: 20,
        fontColor: 'black'
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            fontColor: 'black'
          }
        }],
        xAxes: [{
          ticks: {
            fontColor: 'black'
          }
        }]
      },
      legend: {
        position: 'bottom',
        labels: {
          fontColor: 'black',
          fontStyle: 'bold',
          fontSize: 14,
          boxWidth: 0
        }
      },
      responsive: true,
      maintainAspectRatio: false
    };


    this.myoptions = {
      title: {
        display: true,
        text: 'My Cases',
        fontSize: 20,
        fontColor: 'black'
      },
      legend: {
        position: 'right',
        labels: {
          fontColor: 'black',
          fontSize: 12
        }
      },
      events: true,
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 500,
        onComplete: function () {
          const ctx = this.chart.ctx;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'bottom';
          const that = this.data.labels;
          this.data.datasets.forEach(function (dataset) {
            for (let i = 0; i < dataset.data.length; i++) {
              const model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model,
                total = dataset._meta[Object.keys(dataset._meta)[0]].total,
                mid_radius = model.innerRadius + (model.outerRadius - model.innerRadius) / 2,
                start_angle = model.startAngle,
                end_angle = model.endAngle,
                mid_angle = start_angle + (end_angle - start_angle) / 2;

              const x = mid_radius * Math.cos(mid_angle);
              const y = mid_radius * Math.sin(mid_angle);

              ctx.fillStyle = '#fff';
              if (i === 3) { // Darker text color for lighter background
                ctx.fillStyle = '#444';
              };
              const percent = String(Math.round(dataset.data[i] / total * 100)) + '%';
              // ctx.fillText(dataset.data[i] + ' ' + that[i], model.x + x, model.y + y);
              // Display percent in another line, line break doesn't work for fillText
              ctx.fillText(percent, model.x + x, model.y + y + 15);
            }
          });
        }
      }
    };

    this.progoptions = {
      title: {
        display: true,
        text: 'Case by time (hours)',
        fontSize: 20,
        fontColor: 'black'
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            fontColor: 'black'
          }
        }],
        xAxes: [{
          ticks: {
            fontColor: 'black'
          }
        }]
      },
      legend: {
        position: 'none',
      },
      responsive: true,
      maintainAspectRatio: false
    };
  }


  loadProgressDash() {
    this.dashboadDataService.getProgressDashBoard()
      .subscribe(res => {
        if  (res != null) {
          this.progresschartServiceData = res;
          this.generateProgressChart();
        }
      });
  }

  redrawProgressChart(val) {
    this.caseFilter = val;
    this.generateProgressChart();
  }
  generateProgressChart() {
    let pdata = this.progresschartServiceData;
    switch (this.caseFilter ) {
      case 'VDDL':
        pdata = pdata.filter(x => x.CaseType === 'VDDL');
        break;
      case 'SAR':
        pdata = pdata.filter(x => x.CaseType === 'SAR');
        break;
      case 'RA':
        pdata = pdata.filter(x => x.CaseType === 'RA');
        break;
    };
    // let ldata = Array.from(new Set(pdata.CurrentStatus));
    const ldata = [];
    const pLength = pdata.length;
    for (let m = 0 ; m < pLength ; m++) {
      if (ldata.indexOf(pdata[m].CurrentStatus) === -1 && pdata[m] !== '') {
        ldata.push(pdata[m].CurrentStatus);
      }
    }
    this.progressdata = {
         labels: [],
         datasets: []
    };

    this.progressdata.labels = ldata;
    const labelLength = ldata.length;
    const cases = [] ;
    for (let k = 0; k < labelLength ; k++) {
      if (cases.indexOf(pdata[k].CaseRefNo) === -1 && pdata[k] !== '') {
              cases.push(pdata[k].CaseRefNo);
      }
    }
    const pColors = this.configureDefaultColours(cases.map(a => a['CaseRefNo']));
    for (let index = 0; index < cases.length; index++) {
      let dataset: any ;
      const valdata = pdata.filter(x => x.CaseRefNo === cases[index]);
      // valdata = _.sortBy(valdata, 'rn');
      const progress = [];
      // init empty array
      for (let j = 0 ; j < labelLength ; j++) {
        progress.push(0);
      }
      for (let i = 0 ; i < labelLength ; i++) {
        const CurStat = valdata.map(x => x.CurrentStatus);
        if ( CurStat.toString() === ldata[i].toString()) {
            const prog = valdata.map(x => x.Progress) / 60 ;
            progress[i] = prog;
          }
      };
      dataset = {
        label: cases[index],
        data: progress,
        fill: true,
        backgroundColor: pColors[index]
      };
      this.progressdata.datasets.push(dataset);
    }
    this.progresschart.refresh();
  };
}
