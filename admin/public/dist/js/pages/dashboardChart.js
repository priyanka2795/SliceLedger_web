/* global Chart:false */
const formatToCurrency = amount => {
    return "₹" + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  };
var ticksStyle = {
    fontColor: '#495057',
    fontStyle: 'bold'
  }
  var mode = 'index'
  var intersect = true

$(document).ready(async function() {
    getChartElements();
});

function getChartElements() {
    let orderChartID = $("#orders-chart");
    let stockChartID = $("#stock-chart");

    generateCharts(orderChartID, stockChartID);
}

async function generateCharts(orderChartID, stockChartID) {
    let reportData = await getReportData();

    $("#pandingAmount").text(formatToCurrency(reportData.orderReportData.pandingAmount));
    $("#total-amount").text(formatToCurrency(reportData.orderReportData.totalAmount));
    $("#paid-amount").text(formatToCurrency(reportData.orderReportData.paidAmount));
    $("#deliverd-order").text(reportData.orderReportData.deliverdorder);
    $("#panding-order").text(reportData.orderReportData.pandingorder);
    $("#all-order").text(reportData.orderReportData.allorder);
    $("#all-stock").text(reportData.orderReportData.stockCount+" KG");
    $("#all-flour").text(reportData.orderReportData.flourCount+" KG");
    $("#all-sale").text(reportData.orderReportData.saleCount+" KG");

    pendingChart = new Chart(orderChartID, {
        data: {
          labels: ['JUN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
          datasets: [
          {
            type: 'line',
            data: reportData.orderReportData.ordersReport,
            backgroundColor: 'transparent',
            borderColor: '#fd8e0d',
            pointBorderColor: '#fd8e0d',
            pointBackgroundColor: '#fd8e0d',
            fill: false
            // pointHoverBackgroundColor: '#007bff',
            // pointHoverBorderColor    : '#007bff'
          },
          {
            type: 'line',
            data: reportData.orderReportData.ordersCashReport,
            backgroundColor: 'tansparent',
            borderColor: '#f7b556',
            pointBorderColor: '#f7b556',
            pointBackgroundColor: '#f7b556',
            fill: false
            // pointHoverBackgroundColor: '#f7b556',
            // pointHoverBorderColor    : '#f7b556'
          },
          {
            type: 'line',
            data: reportData.orderReportData.ordersOnlineReport,
            backgroundColor: 'tansparent',
            borderColor: '#ced4da',
            pointBorderColor: '#ced4da',
            pointBackgroundColor: '#ced4da',
            fill: false
            // pointHoverBackgroundColor: '#ced4da',
            // pointHoverBorderColor    : '#ced4da'
          }

        ]
        },
        options: {
          maintainAspectRatio: false,
          tooltips: {
            mode: mode,
            intersect: intersect
          },
          hover: {
            mode: mode,
            intersect: intersect
          },
          legend: {
            display: false
          },
          scales: {
            yAxes: [{
              // display: false,
              gridLines: {
                display: true,
                lineWidth: '4px',
                color: 'rgba(0, 0, 0, .2)',
                zeroLineColor: 'transparent'
              },
              ticks: $.extend({
                beginAtZero: true,
                suggestedMax: 100
              }, ticksStyle)
            }],
            xAxes: [{
              display: true,
              gridLines: {
                display: false
              },
              ticks: ticksStyle
            }]
          }
        }
    });
    paidChart = new Chart(stockChartID, {
        data: {
          labels: ['JUN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
          datasets: [
          {
            type: 'line',
            data: reportData.orderReportData.sale,
            backgroundColor: 'transparent',
            borderColor: '#fd8e0d',
            pointBorderColor: '#fd8e0d',
            pointBackgroundColor: '#fd8e0d',
            fill: false
            // pointHoverBackgroundColor: '#007bff',
            // pointHoverBorderColor    : '#007bff'
          },
          {
            type: 'line',
            data: reportData.orderReportData.stock,
            backgroundColor: 'tansparent',
            borderColor: '#f7b556',
            pointBorderColor: '#f7b556',
            pointBackgroundColor: '#f7b556',
            fill: false
            // pointHoverBackgroundColor: '#f7b556',
            // pointHoverBorderColor    : '#f7b556'
          },
          {
            type: 'line',
            data: reportData.orderReportData.flour,
            backgroundColor: 'tansparent',
            borderColor: '#ced4da',
            pointBorderColor: '#ced4da',
            pointBackgroundColor: '#ced4da',
            fill: false
            // pointHoverBackgroundColor: '#ced4da',
            // pointHoverBorderColor    : '#ced4da'
          }

        ]
        },
        options: {
          maintainAspectRatio: false,
          tooltips: {
            mode: mode,
            intersect: intersect
          },
          hover: {
            mode: mode,
            intersect: intersect
          },
          legend: {
            display: false
          },
          scales: {
            yAxes: [{
              // display: false,
              gridLines: {
                display: true,
                lineWidth: '4px',
                color: 'rgba(0, 0, 0, .2)',
                zeroLineColor: 'transparent'
              },
              ticks: $.extend({
                beginAtZero: true,
                suggestedMax: 100
              }, ticksStyle)
            }],
            xAxes: [{
              display: true,
              gridLines: {
                display: false
              },
              ticks: ticksStyle
            }]
          }
        }
    });

}

async function getReportData(type = null) {
    let result;
    let year = $("select[name='select_year']").val();
    let graphTypeLastMonths = $("select[name='last-months-drop']").val();
    if (year) {
        var url = SITE_URL + "/admin/dashboard?type='chart'&year=" + year;
    } else {
        var url = SITE_URL + "/admin/dashboard?type='chart'";
    }
    try {
        result = await $.ajax({
            url: url,
            type: "GET",
            headers: {
                'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
            },
            dataType: "json",
            success: function(response) {

            },
        });
        return result;
    } catch (error) {
        errorObj = $.parseJSON(error.responseText);
        console.error(errorObj);
    }
}

$(document).on("change", "select[name='select_year']", function(e) {
    getChartElements();
});


$(function() {

    var start = "Sat Jan 01 2022 00:00:00 GMT+0530";
    var end = moment();

    $('#reportrange').daterangepicker({
            startDate: start,
            endDate: end,
            ranges: {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            }
        },

        function (start, end) {
            $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
        }
    );
});

