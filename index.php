<?php
    error_reporting(E_ALL);
    ini_set('display_errors', '1');
//DB parameters--------------------    
    define('db_host', 'localhost');
    define('db_user', 'root');
    define('db_password', 'root');
    define('db_name', 'testtask');
//---------------------------------    
    include_once('mysql_driver.php');
    MySQL_driver::getInstance();
    
    $rest_method  = $_SERVER['REQUEST_METHOD'];
    
    switch ($rest_method) {
    case 'GET':
        $get = array();
        $get = $_GET;
        
        if(isset($get['table_name']) && $get['table_name'] != '')
        {
          if($get['table_name'] == 'languages') $query = "select * from {$get['table_name']} where lg_active = '1' order by lg_name";
          
          if($get['table_name'] == 'states') 
          {
            $query = "select {$get['table_name']}.*, languages.lg_name, languages.lg_brief from {$get['table_name']} inner join languages on(lg_id=state_lg_id) where state_active = '1' order by state_name";
          }
          
          if($get['table_name'] == 'cities') 
          {
            $query = "select {$get['table_name']}.*, languages.lg_name, languages.lg_brief, states.state_name, states.state_iso from {$get['table_name']} inner join languages on(lg_id=city_lg_id) inner join states on(state_id=city_state_id) where city_active = '1' order by city_name";
          }
          
          if($get['table_name'] == 'state_cities') 
          {
            foreach($get as $key=>$val)
            {
              if($key == 'table_name') continue;
              $where = $key . "='" . $val . "' ";
            }
            
            $query = "select cities.*, languages.lg_name, languages.lg_brief, states.state_name, states.state_iso from cities inner join languages on(lg_id=city_lg_id) inner join states on(state_id=city_state_id) where city_active = '1' and {$where} order by city_name";
        
            if($records = MySQL_driver::query($query))
            {
                die(json_encode($records));
            }
            else die(json_encode(array('warn'=>'Не указаны города для выбранной страны')));
          }
    
          if($records = MySQL_driver::query($query))
          {
             die(json_encode($records));
          }
          else die(json_encode(array('warn'=>'empty')));
        }
    break;
        
    case 'POST':
        $post = array();
        parse_str(file_get_contents('php://input'), $post);
        
        $new_record = array();
        foreach($post as $key=>$val)
        {
          if($key == 'table_name') continue;
          $new_record[$key] = $val;
        }
        
        if($new_id = MySQL_driver::add($post['table_name'],$new_record))
        {
          die(json_encode(array($new_id)));
        }
        else die('');

            break;
        
    case 'PUT':
        $put = array();
        parse_str(file_get_contents('php://input'), $put);
        
        foreach($put as $key=>$val)
        {
          if($key == 'table_name') continue;
          if(preg_match('/where_/',$key))
          {
            $contition[str_replace('where_', '', $key)] = $val; 
            continue;
          }
          $ed_record[$key] = $val;
        }
        
        if(MySQL_driver::edit($put['table_name'], $contition, $ed_record))
        {
          die(json_encode($ed_record));
        }
        else die('');
        
            break;
        
    case 'DELETE':
        $delete = array();
        parse_str(file_get_contents('php://input'), $delete);
        
        foreach($delete as $key=>$val)
        {
          if($key == 'table_name') continue;
          $del_record[$key] = $val;
        }
        
        if($delete['table_name'] == 'states')
        {
          $query = "select * from `cities` where `city_state_id` = '{$del_record[$key]}'";
          
          if($records = MySQL_driver::query($query))
          {
              die(json_encode(array('warn'=>'Предварительно необходимо всем городам которые принадлежат к удаляемой стране, изменить страну.')));
          }
        }
        
        if($delete['table_name'] == 'languages')
        {
          $query = "select * from `states` where `state_lg_id` = '{$del_record[$key]}'";
          if($records = MySQL_driver::query($query))
          {
              die(json_encode(array('warn'=>'Предварительно необходимо всем странам добавленным к удаляемому языку, изменить язык')));
          }
          $query = "select * from `cities` where `city_lg_id` = '{$del_record[$key]}'";
          if($records = MySQL_driver::query($query))
          {
              die(json_encode(array('warn'=>'Предварительно необходимо всем городам добавленным к удаляемому языку, изменить язык')));
          }
        }
        
        if(MySQL_driver::del($delete['table_name'],$del_record))
        {
          die(json_encode($del_record));
        }
        else die('');
            break;

    default:
        break;
}