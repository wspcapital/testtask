$(function(){
    
    var cities = sendRequest({'table_name':'cities'}, 'GET', 'city');
    var states = sendRequest({'table_name':'states'}, 'GET', 'state');
    
    $('#state').bind('change', function(){
        var state_sities = sendRequest({'table_name':'state_cities', 'state_id':$(this).val()}, 'GET', 'state_cities');
        $('span').html($('option:selected',this).attr('lang'));
    });
    
    $('#city').bind('change', function(){
        $('span').html($('option:selected',this).attr('lang'));
    });
     
});

function sendRequest (params, method, key) {

    jQuery.ajax({
            type: method,
            url: "index.php",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: params,
            success: function (data) {
               
                    var objData = JSON.parse(JSON.stringify(data));
                    if(objData['warn'])
                    {
                        if(objData['warn'] != 'empty') alert(objData['warn']);
                        $('#city').html('');
                        $('#city').append('<option value="" lang="">Города не указаны</opton>');
                        return;
                    }
                    
                    var npp = 0;
                    if(key == 'state_cities')
                    {
                        $('#city').html('');
                        $('#city').append('<option value="" lang="">Выбрать город</opton>');
                        
                    }
                    
                    for (objKey in objData) {
                         npp++;
                         if(key == 'state')
                         {
                           $('#state').append('<option value=' + objData[objKey]['state_id'] + ' lang="'+objData[objKey]['lg_name']+'">' + objData[objKey]['state_name']+ '&nbsp;' + objData[objKey]['state_iso'] + '</opton>');
                         }
                     
                         else if(key == 'city' || key == 'state_cities')
                         {
                           $('#city').append('<option value=' + objData[objKey]['city_id'] + ' lang="'+objData[objKey]['lg_name']+'">' + objData[objKey]['city_name']+ '</opton>');  
                         }
	            }
                
            },
   
            error: function (jqXHR, status) {
               
            }
    });
}