$(function(){
    
    var langs = sendRequest({'table_name':'languages'}, 'GET', 'lang');
    var states = sendRequest({'table_name':'states'}, 'GET', 'state');
    var cities = sendRequest({'table_name':'cities'}, 'GET', 'city');
    
    $(document).on('click','a.adell',function(e){
        e.preventDefault();
        if(confirm("Вы хотите удалить указанный город?"))
        {
            var del_id = $(this).parent().parent().attr('id');
            
            var states_dell = sendRequest({'table_name':'cities', 'city_id':del_id}, 'DELETE', 'city');
        }
        return;
    });
    
    $(document).on('click','a.aedit',function(e){
        e.preventDefault();
        $('#city').val($(this).parent().parent().find($("td.city_name")).html());
        
        var selected_state = $(this).parent().parent().find($("td.state_name")).html()
        $('#state option').each(function () {
            if ($(this).html() == selected_state) {
                $('#state').val($(this).attr('value'));
                return;
            };
        });
        
        var selected_lang = $(this).parent().parent().find($("td.lg_name")).html()
        $('#lang option').each(function () {
            if ($(this).html() == selected_lang) {
                $('#lang').val($(this).attr('value'));
                return;
            };
        });
        
        $("#id_city").val($(this).parent().parent().attr('id'));
        return;
    });
    
    $('#data_cancel').bind('click', function(){
        $('#city').val('');
        $('#state').val('');
        $('#lang').val('');
        $("#id_city").val('');
        return;
    });
    
    
    $('#data_save').bind('click', function(){
        var error = false;
        if($('#city').val().length === 0)
        {
           $('#city').attr('placeholder','Заполните поле');
           $('#city').parent().addClass('has-error');
           error = true;
        }
        if($('#state').val().length === 0)
        {
          $('#state').attr('placeholder','Заполните поле');
          $('#state').parent().addClass('has-error');
          error = true;
        }
        if($('#lang').val().length === 0)
        {
          var lang_state = $("#state option:selected").attr('lang');
          if(lang_state.lanfth === 0)
          {
            $('#lang').parent().addClass('has-error');
            error = true;  
          }
          else $("#lang").val(lang_state);
        }
        if(!error){
           if($("#id_city").val().length > 0)
           {
             var ed_city = sendRequest({'table_name':'cities', 'where_city_id':$("#id_city").val(), 'city_name':$('#city').val(), 'city_lg_id':$('#lang').val(), 'city_state_id':$('#state').val()}, 'PUT', 'city');  
           }
           else
               var new_city = sendRequest({'table_name':'cities', 'city_name':$('#city').val(), 'city_lg_id':$('#lang').val(), 'city_state_id':$('#state').val()}, 'POST', 'city');
           
        }
        return;
    });
    
    $("#state").bind('change', function(){
        var lang_state = $("#state option:selected").attr('lang');
        $("#lang").val(lang_state);
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
                    return;
                }
               
               if(method == 'GET')
               {
                    var npp = 0;
                    for (objKey in objData) {
                         npp++;
                         if(key == 'city')
                         {
                           $('table').append('<tr id="'+ objData[objKey]['city_id'] +'"><td>' + npp + '</td><td class="city_name">' + objData[objKey]['city_name'] + '</td><td class="state_name">' + objData[objKey]['state_name'] + '</td><td class="lg_name">' + objData[objKey]['lg_name'] + '</td><td><a href="" class="adell">Удалить<a></td><td><a href="" class="aedit">Редактировать<a></td></tr>');
                         }
                         
                         else if(key == 'state')
                         { 
                            $('#state').append('<option value=' + objData[objKey]['state_id'] + ' lang="'+objData[objKey]['state_lg_id']+'">' + objData[objKey]['state_name']+ '</opton>');  
                         }
                     
                         else if(key == 'lang')
                         { 
                            $('#lang').append('<option value=' + objData[objKey]['lg_id'] + '>' + objData[objKey]['lg_name'] + '</opton>');  
                         }
	            }
                }
                
                if (method == 'POST' || method == 'PUT' || method == 'DELETE')
                {
                    $(location).attr('href','cities.html');
                    
                }
                return;
            },
   
            error: function (jqXHR, status) {
               alert('Операция не была осуществлена');
               return;
            }
    });
}