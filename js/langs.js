$(function(){
    
    var langs = sendRequest({'table_name':'languages'}, 'GET');
    
    $(document).on('click','a.adell',function(e){
        e.preventDefault();
        if(confirm("Вы хотите удалить указанный язык?"))
        {
            var del_id = $(this).parent().parent().attr('id');
            
            var states_dell = sendRequest({'table_name':'languages', 'lg_id':del_id}, 'DELETE');
        }
        return;
    });
    
    $(document).on('click','a.aedit',function(e){
        e.preventDefault();
        $('#lg_name').val($(this).parent().parent().find($("td.lg_name")).html());
        $('#lg_brief').val($(this).parent().parent().find($("td.lg_brief")).html());
        
        $("#id_lang").val($(this).parent().parent().attr('id'));
        return;
    });
    
    $('#data_cancel').bind('click', function(){
        $('#lang').val('');
        $('#lg_brief').val('');
        return;
    });
    
    $('#data_save').bind('click', function(){
        var error = false;
        if($('#lg_name').val().length === 0)
        {
           $('#lg_name').attr('placeholder','Заполните поле');
           $('#lg_name').parent().addClass('has-error');
           error = true;
        }
        if($('#lg_brief').val().length === 0)
        {
          $('#lg_brief').attr('placeholder','Заполните поле');
          $('#lg_brief').parent().addClass('has-error');
          error = true;
        }
        if(!error){
           if($("#id_lang").val().length > 0)
           { 
              var ed_lang = sendRequest({'table_name':'languages', 'where_lg_id':$("#id_lang").val(), 'lg_name':$('#lg_name').val(), 'lg_brief':$('#lg_brief').val()}, 'PUT');
           }
           else 
               var new_lang = sendRequest({'table_name':'languages', 'lg_name':$('#lg_name').val(), 'lg_brief':$('#lg_brief').val()}, 'POST');
           
        }
    });
     
});

function sendRequest (params, method) {

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
                        $('table').append('<tr id="'+ objData[objKey]['lg_id'] +'"><td>' + npp + '</td><td class="lg_name">' + objData[objKey]['lg_name'] + '</td><td class="lg_brief">' + objData[objKey]['lg_brief'] + '</td><td><a href="" class="adell">Удалить<a></td><td><a href="" class="aedit">Редактировать<a></td></tr>');
	            }
                }
                
                if (method == 'POST' || method == 'PUT' || method == 'DELETE')
                {
                    $(location).attr('href','languages.html');
                }
                
                return;
            },
            
            error: function (jqXHR, status) {
                alert('Операция не была осуществлена');
                return;
            }
    });
}