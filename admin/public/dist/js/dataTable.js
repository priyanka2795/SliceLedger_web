
const dateFilter = (fieldNumber) => {
    $.fn.dataTable.ext.search.push(
        function(settings, data, dataIndex) {
            var min = $('#date-filter-min').datepicker("getDate");
            var max = $('#date-filter-max').datepicker("getDate");
            console.log(max)
            date_format = "DD/MM/YYYY"
            var startDate = moment(data[fieldNumber], date_format).toDate()
            // var startDate = new Date(data[fieldNumber]);
            if (min == null && max == null) { return true; }
            if (min == null && startDate <= max) { return true; }
            if (max == null && startDate >= min) { return true; }
            if (startDate <= max && startDate >= min) { return true; }
            return false;
        }
    );
}


if ($('#buy-token-table').length) {
    var orderTable =  $('#buy-token-table').DataTable({

           "responsive": true,
            select: true,
            colReorder: true,
             buttons: [
                {
                    extend: 'excelHtml5',
                    text: '<i class="fas fa-file-excel"></i> Excel',
                    titleAttr: 'Excel',
                    exportOptions: {
                        columns: [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ]
                    }
                },
                {
                    extend: 'csvHtml5',
                    text: '<i class="fas fa-file-csv"></i> CSV',
                    titleAttr: 'CSV',
                    exportOptions: {
                        columns: [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ]
                    }
                },
                {
                    extend: 'print',
                    text: '<i class="fas fa-print"></i> Print',
                    titleAttr: 'Print',
                    exportOptions: {
                        columns: [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ]
                    }
                }

            ]
        });
    orderTable.buttons().container().appendTo($('#buyTokenExport'));
}

if ($('#sell-token-table').length) {
    var orderTable =  $('#sell-token-table').DataTable({

           "responsive": true,
            select: true,
            colReorder: true,
             buttons: [
                {
                    extend: 'excelHtml5',
                    text: '<i class="fas fa-file-excel"></i> Excel',
                    titleAttr: 'Excel',
                    exportOptions: {
                        columns: [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ]
                    }
                },
                {
                    extend: 'csvHtml5',
                    text: '<i class="fas fa-file-csv"></i> CSV',
                    titleAttr: 'CSV',
                    exportOptions: {
                        columns: [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ]
                    }
                },
                {
                    extend: 'print',
                    text: '<i class="fas fa-print"></i> Print',
                    titleAttr: 'Print',
                    exportOptions: {
                        columns: [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ]
                    }
                }

            ]
        });
    orderTable.buttons().container().appendTo($('#sellTokenExport'));
}

if ($('#transfer-token-table').length) {
    var orderTable =  $('#transfer-token-table').DataTable({

           "responsive": true,
            select: true,
            colReorder: true,
             buttons: [
                {
                    extend: 'excelHtml5',
                    text: '<i class="fas fa-file-excel"></i> Excel',
                    titleAttr: 'Excel',
                    exportOptions: {
                        columns: [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ]
                    }
                },
                {
                    extend: 'csvHtml5',
                    text: '<i class="fas fa-file-csv"></i> CSV',
                    titleAttr: 'CSV',
                    exportOptions: {
                        columns: [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ]
                    }
                },
                {
                    extend: 'print',
                    text: '<i class="fas fa-print"></i> Print',
                    titleAttr: 'Print',
                    exportOptions: {
                        columns: [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ]
                    }
                }

            ]
        });
    orderTable.buttons().container().appendTo($('#transferExport'));
}

if ($('#withdraw-found-table').length) {
    var orderTable =  $('#withdraw-found-table').DataTable({

           "responsive": true,
            select: true,
            colReorder: true,
             buttons: [
                {
                    extend: 'excelHtml5',
                    text: '<i class="fas fa-file-excel"></i> Excel',
                    titleAttr: 'Excel',
                    exportOptions: {
                        columns: [ 0, 1, 2, 3, 4, 5, 6, 7 ]
                    }
                },
                {
                    extend: 'csvHtml5',
                    text: '<i class="fas fa-file-csv"></i> CSV',
                    titleAttr: 'CSV',
                    exportOptions: {
                        columns: [ 0, 1, 2, 3, 4, 5, 6, 7 ]
                    }
                },
                {
                    extend: 'print',
                    text: '<i class="fas fa-print"></i> Print',
                    titleAttr: 'Print',
                    exportOptions: {
                        columns: [ 0, 1, 2, 3, 4, 5, 6, 7 ]
                    }
                }

            ]
        });
    orderTable.buttons().container().appendTo($('#withdrawExport'));
}

if ($('#user-table').length) {
    var usertable = $('#user-table').DataTable({
           "responsive": true,
            select: true,
            colReorder: true,
             buttons: [
                {
                    extend: 'excelHtml5',
                    text: '<i class="fas fa-file-excel"></i> Excel',
                    titleAttr: 'Excel',
                    exportOptions: {
                        columns: [ 0, 1, 2, 3 ]
                    }
                },
                {
                    extend: 'csvHtml5',
                    text: '<i class="fas fa-file-csv"></i> CSV',
                    titleAttr: 'CSV',
                    exportOptions: {
                        columns: [ 0, 1, 2, 3 ]
                    }
                },
                {
                    extend: 'print',
                    text: '<i class="fas fa-print"></i> Print',
                    titleAttr: 'Print',
                    exportOptions: {
                        columns: [ 0, 1, 2, 3 ]
                    }
                }

            ],
    });
    var userexprost = usertable.buttons().container().appendTo($('#userExport'));
}

if ($('#kyc-table').length) {
    var kyctable = $('#kyc-table').DataTable({
           "responsive": true,
            select: true,
            colReorder: true,
    });
}

if ($('#feedback-table').length) {
    var feedbackCredit = $('#feedback-table').DataTable( {
        "responsive": true,
            select: true,
            colReorder: true,
             buttons: [
                {
                    extend: 'excelHtml5',
                    text: '<i class="fas fa-file-excel"></i> Excel',
                    titleAttr: 'Excel',
                    exportOptions: {
                        columns: [ 1, 2, 3, 4, 5, 6, 7 ]
                    }
                },
                {
                    extend: 'csvHtml5',
                    text: '<i class="fas fa-file-csv"></i> CSV',
                    titleAttr: 'CSV',
                    exportOptions: {
                        columns: [ 1, 2, 3, 4, 5, 6, 7 ]
                    }
                },
                {
                    extend: 'print',
                    text: '<i class="fas fa-print"></i> Print',
                    titleAttr: 'Print',
                    exportOptions: {
                        columns: [ 1, 2, 3, 4, 5, 6, 7 ]
                    }
                }

            ]
    });
    feedbackCredit.buttons().container().appendTo($('#feedbackExport'));
}

if ($('#stock-debit').length) {
    var stockdedit = $('#stock-debit').DataTable( {
        "responsive": true,
        select: true,
        searching: false,
        colReorder: true,
        buttons: [
            {
                extend: 'excelHtml5',
                text: '<i class="fas fa-file-excel"></i> Excel',
                titleAttr: 'Excel',
            },
            {
                extend: 'csvHtml5',
                text: '<i class="fas fa-file-csv"></i> CSV',
                titleAttr: 'CSV'
            },
            {
                extend: 'pdfHtml5',
                text: '<i class="fas fa-file-pdf"></i> PDF',
                titleAttr: 'PDF'
            },
            {
                extend: 'print',
                text: '<i class="fas fa-print"></i> Print',
                titleAttr: 'Print'
            }

        ],

    });
}





