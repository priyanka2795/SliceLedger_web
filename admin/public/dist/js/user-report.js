$(document).ready(function() {
    // alert();
    setTimeout(() => {
        $('a[data-toggle="tab"]:first').trigger('click');
    }, 100);
    $('a[data-toggle="tab"]').on('shown.bs.tab', async function (e) {

        var activeTab = e.target // activated tab

        // get the category
        var category = $(activeTab).data('category');
        var userId = $('#user_id').val();
        $("span#loader").show();
        await getAccountingReport(category, userId);
        $("span#loader").hide();
    });
});



async function getAccountingReport(category, userId =null) {
    let result;
    try {
        result = await $.ajax({
            url: SITE_URL + "/user/reports/" + category,
            type: "GET",
            data: {raw: true,userId:userId},
            headers: {
                'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
            },
            dataType: "html",
            success: function(reportHtmlContent) {
                $("#reporting > div.tab-pane").html("");
                $("div#" + category).html(reportHtmlContent);
                setTimeout(function() {
                    setTableData(category);
                }, 100);
            },
        });
        return result;
    } catch (error) {
        $("span#loader").hide();
        errorObj = $.parseJSON(error.responseText);
        console.log(errorObj);
    }
}


function setTableData(category){
    if(category == "buy-token"){
        $('#buy-report-data-table-list').DataTable({});
    }
    if (category == "sale-token") {
        $('#sale-report-data-table-list').DataTable({});
    }

    if (category == "add-money") {
        $('#add-money-report-data-table-list').DataTable({});
    }

    if (category == "withdrawal-money") {
        $('#withdrawal-report-data-table-list').DataTable({});
    }

}
