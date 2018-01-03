var db  = {}; 
var mysql = require('mysql'); 
var pool = mysql.createPool({ 
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database :'ttjlbms',      // 数据库名称
  useConnectionPooling: true
}); 
  
db.query = function(sql, callback){ 
  
  if (!sql) { 
    callback(); 
    return; 
  } 
  pool.query(sql, function(err, rows, fields) { 
   if (err) { 
    console.log(err); 
    callback(err, null); 
    return; 
   }; 
  
   callback(null, rows, fields); 
  }); 
} 
module.exports = db; 