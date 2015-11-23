$(function(){
    
    var RegExp = [];
    RegExp['remail'] = /^[^@]+@[^@]+.[a-z]{2,}$/i;
    RegExp['rename'] = /^[A-Za-zА-Яа-яё]{3,50}$/i;
    RegExp['statename'] = /^[A-Z]{2}$/i;
    RegExp['rephone'] = /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i;
    var err = false;
    
    $("input,select").bind('focusout', function(){
        if($(this).val().length == 0)
        {
            $(this).parent().parent().addClass('has-warning');
            $(this).parent().find('.req_note').show(); 
        }
        else if($(this).attr('regexp') !== 'undefined')
        {
           if($(this).val().search(RegExp[$(this).attr('regexp')]) == -1)
           {
               $(this).parent().parent().addClass('has-warning');
               $(this).val('');
               $(this).parent().find('.reg_note').show();
           }
        }
    });
    
    $("input,select").bind('focusin', function(){
        $(this).parent().parent().removeClass('has-warning');
        $(this).parent().parent().removeClass('has-error');
        $(this).parent().find('.req_note').hide();
        $(this).parent().find('.reg_note').hide();
    });
    
    $("form").bind('submit',function(e){
        $("div.form-group").removeClass('has-warning');
        $(".req_note,.reg_note").hide();
        
        var err = false;
        $("input,select").each(function(){
            if($(this).val().length == 0)
            {
                $(this).parent().parent().addClass('has-error');
                $(this).parent().find('.req_note').show(); 
            }
            else if($(this).attr('regexp') !== 'undefined')
            {
               if($(this).val().search(RegExp[$(this).attr('regexp')]) == -1)
               {
                   $(this).parent().parent().addClass('has-error');
                   $(this).val('');
                   $(this).parent().find('.reg_note').show();
               }
            }
        });
        
        e.preventDefault();
        
        
    })
    
    $("#usemail").focus();
    
    $('#usphone').mask('+00 (000) 00 00 000');
    
});