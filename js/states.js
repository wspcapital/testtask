$(function(){
    
    var langs = sendRequest({'table_name':'languages'}, 'GET', 'lang');
    var states = sendRequest({'table_name':'states'}, 'GET', 'state');
    
    $(document).on('click','a.adell',function(e){
        e.preventDefault();
        
        if(confirm("Вы хотите удалить выбранную страну?"))
        {
          var del_id = $(this).parent().parent().attr('id');
          
          var states_dell = sendRequest({'table_name':'states', 'state_id':del_id}, 'DELETE', 'state');
          
          if(states_dell)
          {
            $(this).parent().parent().hide();
          }
        }
        
        return;
    });
    
    $(document).on('click','a.aedit',function(e){
        e.preventDefault();
        $('#state').val($(this).parent().parent().find($("td.state_name")).html());
        
        $('#iso-code').val($(this).parent().parent().find($("td.state_iso")).html());
        
        var selected_lang = $(this).parent().parent().find($("td.lg_name")).html();
        
        $('#lang option').each(function () {
            if ($(this).html() == selected_lang) {
                $('#lang').val($(this).attr('value'));
                return;
            };
        });
        
        $("#id_state").val($(this).parent().parent().attr('id'));
        return;
    });
    
    $('#data_cancel').bind('click', function(){
        $('#state').val('');
        $('#iso-code').val('');
        $('#lang').val('');
        $("#id_state").val('');
        return;
    });
    
    $('#data_save').bind('click', function(){
        var error = false;
        if($('#state').val().length === 0)
        {
           $('#state').attr('placeholder','Заполните поле');
           $('#state').parent().addClass('has-error');
           error = true;
        }
        if($('#iso-code').val().length === 0)
        {
          $('#iso-code').attr('placeholder','Заполните поле');
          $('#iso-code').parent().addClass('has-error');
          error = true;
        }
        if($('#lang').val().length === 0)
        {
          $('#lang').attr('placeholder','Заполните поле');
          $('#lang').parent().addClass('has-error');
          error = true;
        }
        if(!error){
           if($("#id_state").val().length > 0)
           {
             var ed_state = sendRequest({'table_name':'states', 'where_state_id':$("#id_state").val(), 'state_name':$('#state').val(), 'state_iso':$('#iso-code').val(), 'state_lg_id':$('#lang').val()}, 'PUT', 'state'); 
           }
           else
               var new_state = sendRequest({'table_name':'states', 'state_name':$('#state').val(), 'state_iso':$('#iso-code').val(), 'state_lg_id':$('#lang').val()}, 'POST', 'state');
           $('#state').val('');
           $('#iso-code').val('');
        }
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
                         if(key == 'state')
                         {
                           $('table').append('<tr id="'+ objData[objKey]['state_id'] +'"><td>' + npp + '</td><td class="state_name">' + objData[objKey]['state_name'] + '</td><td class="state_iso">' + objData[objKey]['state_iso'] + '</td><td class="lg_name">' + objData[objKey]['lg_name'] + '</td><td><a href="" class="adell">Удалить<a></td><td><a href="" class="aedit">Редактировать<a></td></tr>');
                         }
                     
                         else if(key == 'lang')
                         { 
                            $('select').append('<option value=' + objData[objKey]['lg_id'] + '>' + objData[objKey]['lg_name'] + '</opton>');  
                         }
	            }
                }
                
                if (method == 'POST' || method == 'PUT' || method == 'DELETE')
                {
                    $(location).attr('href','states.html');
                    
                }
                return;
            },
   
            error: function (jqXHR, status) {
               alert('Операция не была осуществлена');
               return;
            }
    });
}