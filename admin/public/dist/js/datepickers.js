let date = new Date(moment.now());
let today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
let tomorrow = new Date(+date + 86400000);
let lastDayofMonth = moment().clone().endOf('month').format('YYYY-MM-DD');
let startDayofMonth = moment().clone().startOf('month').format('YYYY-MM-DD');
let startOfTheYear = moment().startOf('year').format('YYYY-MM-DD');

let pickerOptsGeneral = {
    uiLibrary: 'bootstrap4',
    format: "dd/mm/yyyy",
    date: getDateInFormat(today),
    autoclose: true,
    minView: 2,
    maxView: 2,
    todayHighlight: true,
    templates: {
        leftArrow: '<i class="fa fa-chevron-left"></i>',
        rightArrow: '<i class="fa fa-chevron-right"></i>',
    },
    icons: {
        time: "fa fa-clock-o",
        date: "fa fa-calendar",
        up: "fa fa-arrow-up",
        down: "fa fa-arrow-down",
        previous: "fa fa-chevron-left",
        next: "fa fa-chevron-right",
        today: "fa fa-clock-o",
        clear: "fa fa-trash-o"
    },
};

function getDateInFormat(date = null) {
    if (date) {
        return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
    }
}

$(document).ready(function() {

    $('#date-filter-min').datepicker(Object.assign({}, pickerOptsGeneral, {
        changeMonth: true,
        endDate:new Date(),
        changeYear: true
    }));
    $('#date-filter-max').datepicker(Object.assign({}, pickerOptsGeneral, {
        changeMonth: true,
        endDate:new Date(),
        changeYear: true
    }));
    $('#date-filter-min').datepicker(pickerOptsGeneral).on('changeDate', function(ev) {
        endDate = new Date(ev.date);

        $('#date-filter-max').datepicker('setStartDate', endDate);

        let fromtDate = $(this).datepicker('getDate');
        let toDate = $('#date-filter-max').datepicker('getDate');

        if (fromtDate > toDate) {
            $('#date-filter-max').val("");
        }
    });

    $('#stick-credit-update-date').datepicker(Object.assign({}, pickerOptsGeneral, {
        changeMonth: true,
        changeYear: true,
        endDate:new Date()

    }));

    $('#stick-debit-update-date').datepicker(Object.assign({}, pickerOptsGeneral, {
        changeMonth: true,
        changeYear: true,
         endDate:new Date()

    }));

    $('#stock-date').datepicker(Object.assign({}, pickerOptsGeneral, {
        changeMonth: true,
        changeYear: true,
         endDate:new Date()

    }));

    $('#stock-date-debit').datepicker(Object.assign({}, pickerOptsGeneral, {
        changeMonth: true,
        changeYear: true,
         endDate:new Date()

    }));

    $('#leave_from_date').datepicker(Object.assign({}, pickerOptsGeneral, { startDate: new Date() }));
    $('#leave_to_date').datepicker(Object.assign({}, pickerOptsGeneral, { startDate: new Date() }));
    $('#leave_from_date, #leave_to_date').datepicker(pickerOptsGeneral).on('changeDate', function(ev) {
        endDate = $('#leave_from_date').val();

        $('#leave_to_date').datepicker('setStartDate', endDate);

        let fromtDate = $(this).datepicker('getDate');
        let toDate = $('#leave_to_date').datepicker('getDate');

        if (fromtDate > toDate) {
            $('#leave_to_date').val("");
            $("#number_of_days").val("");
        }
        let start = new Date( $('#leave_from_date').val() ).getTime(),
        end = new Date( $('#leave_to_date').val() ).getTime();
        let days = (end - start) / 86400000;
        if (start && end) {
            $("#number_of_days").val(days+1);
        }
    });



});



