// Code to connect to the firebase database
//TODO: Replace the following with your app's Firebase project configuration
var firebaseConfig = {
    apiKey: "AIzaSyCGZwf8Trjn70HhlqTWcvKy8vcxD9ZSrms",
    authDomain: "geo-lean-spot.firebaseapp.com",
    databaseURL: "https://geo-lean-spot.firebaseio.com",
    projectId: "geo-lean-spot",
    storageBucket: "geo-lean-spot.appspot.com",
    messagingSenderId: "376675735017",
    appId: "1:376675735017:web:5a312db977430ace"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();
var labels_west = [];
var data_west = [];
var labels_east = [];
var data_east = [];
window.onload = updateChartWest();
window.onload = updateChartEast();

function getDataWest(){
  places = database.ref('Places/Centro_Estudiantil_West').once('value').then(function(snapshot) {
      var spots = snapshot.val();
      for (key in spots){
          for(key2 in spots[key]){
              var average = spots[key][key2].reduce((a,b) => a+b, 0) / 3;
              var shortKey = new Date(Number(key2.slice(0,10) * 1000));
              labels_west.push((shortKey.getHours().toString()) + ":" + (shortKey.getMinutes()));
              data_west.push(average);
          }
      }
  });
};

function getDataEast(){
  places = database.ref('Places/Centro_Estudiantil_East').once('value').then(function(snapshot) {
    var spots = snapshot.val();
      for (key in spots){
          for(key2 in spots[key]){
              var average = spots[key][key2].reduce((a,b) => a+b, 0) / 3;
              var shortKey = new Date(Number(key2.slice(0,10) * 1000));
              labels_east.push((shortKey.getHours().toString()) + ":" + (shortKey.getMinutes()));
              data_east.push(average);
          }
      }
  });
};



setInterval(
  function () {
    updateChartWest();
    updateChartEast();
  }, 
  10000 // every 15 seconds
);

function updateChartWest(){
  getDataWest();
  // Area Chart Example
  var ctx = document.getElementById("centroWest");
  var myLineChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels_west,
      datasets: [{
        label: "People in the area",
        lineTension: 0.3,
        backgroundColor: "rgba(78, 115, 223, 0.05)",
        borderColor: "rgba(78, 115, 223, 1)",
        pointRadius: 3,
        pointBackgroundColor: "rgba(78, 115, 223, 1)",
        pointBorderColor: "rgba(78, 115, 223, 1)",
        pointHoverRadius: 3,
        pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
        pointHoverBorderColor: "rgba(78, 115, 223, 1)",
        pointHitRadius: 10,
        pointBorderWidth: 2,
        data: data_west,
      }],
    },
    options: {
      maintainAspectRatio: false,
      layout: {
        padding: {
          left: 10,
          right: 25,
          top: 25,
          bottom: 0
        }
      },
      scales: {
        xAxes: [{
          time: {
            unit: 'date'
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          ticks: {
            maxTicksLimit: 7
          }
        }],
        yAxes: [{
          ticks: {
            maxTicksLimit: 5,
            padding: 10,
            // Include a dollar sign in the ticks
            callback: function(value, index, values) {
              return number_format(value);
            }
          },
          gridLines: {
            color: "rgb(234, 236, 244)",
            zeroLineColor: "rgb(234, 236, 244)",
            drawBorder: false,
            borderDash: [2],
            zeroLineBorderDash: [2]
          }
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        titleMarginBottom: 10,
        titleFontColor: '#6e707e',
        titleFontSize: 14,
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        intersect: false,
        mode: 'index',
        caretPadding: 10,
        callbacks: {
          label: function(tooltipItem, chart) {
            var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
            return datasetLabel + ':' + number_format(tooltipItem.yLabel);
          }
        }
      }
    }
  });
  var westNum = document.getElementById("west");
  westNum.innerHTML = Math.floor(data_west[data_west.length - 1]);
  labels_west = [];
  data_west = [];
}

function updateChartEast(){
  getDataEast();
  // Area Chart Example
  var ctx = document.getElementById("centroEast");
  var myLineChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels_east,
      datasets: [{
        label: "People in the area",
        lineTension: 0.3,
        backgroundColor: "rgba(78, 115, 223, 0.05)",
        borderColor: "rgba(78, 115, 223, 1)",
        pointRadius: 3,
        pointBackgroundColor: "rgba(78, 115, 223, 1)",
        pointBorderColor: "rgba(78, 115, 223, 1)",
        pointHoverRadius: 3,
        pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
        pointHoverBorderColor: "rgba(78, 115, 223, 1)",
        pointHitRadius: 10,
        pointBorderWidth: 2,
        data: data_east,
      }],
    },
    options: {
      maintainAspectRatio: false,
      layout: {
        padding: {
          left: 10,
          right: 25,
          top: 25,
          bottom: 0
        }
      },
      scales: {
        xAxes: [{
          time: {
            unit: 'date'
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          ticks: {
            maxTicksLimit: 7
          }
        }],
        yAxes: [{
          ticks: {
            maxTicksLimit: 5,
            padding: 10,
            // Include a dollar sign in the ticks
            callback: function(value, index, values) {
              return number_format(value);
            }
          },
          gridLines: {
            color: "rgb(234, 236, 244)",
            zeroLineColor: "rgb(234, 236, 244)",
            drawBorder: false,
            borderDash: [2],
            zeroLineBorderDash: [2]
          }
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        titleMarginBottom: 10,
        titleFontColor: '#6e707e',
        titleFontSize: 14,
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        intersect: false,
        mode: 'index',
        caretPadding: 10,
        callbacks: {
          label: function(tooltipItem, chart) {
            var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
            return datasetLabel + ':' + number_format(tooltipItem.yLabel);
          }
        }
      }
    }
  });
  var eastNum = document.getElementById("east");
  eastNum.innerHTML = Math.floor(data_east[data_east.length - 1]);
  labels_east = [];
  data_east = [];
}


// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + '').replace(',', '').replace(' ', '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}


