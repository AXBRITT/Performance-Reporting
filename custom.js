$(document).ready(function () {
    $("#hellocard").text("Welcome "+_spPageContextInfo.userDisplayName);
    var listName="Operations%20contacts";
    var SectionTitle="Performance reporting";
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle(" + listName + ")/items",
        type: "GET",
        headers: { "Accept": "application/json;odata=verbose"},
        success: function (data) { 
            for (var i = 0; i < data.d.results.length; i++) {
                var item = data.d.results[i];
                var itemUrl = item.__metadata.uri+"/FieldValuesAsText";
                promises.push( $.ajax({
                    url: itemUrl,
                    type: "GET",
                    headers: { "Accept": "application/json;odata=verbose" },
                        success: function(data){
                            if(data.d.Section == SectionTitle){
                                var name = data.d.OData__x005f_x0063_x005f_re4;
                                var title = data.d.Job_x005f_x0020_x005f_title;
                                $("#" + title.replace(/ /g,"")).append('<div class="col-sm"><div class="card border-secondary"><div class="card-header bg-secondary text-white"><h4>'+name+'</h4></div><div class="card-body"><p class="card-text">'+title+'</p></div></div></div>' );
                            }
                        },
                        error: function(data){
                            console.log("Error getting user data " + itemUrl);
                        }
                }));
            }
        }
    })
})