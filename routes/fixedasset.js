var express = require('express');
var router = express.Router();
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database :'bim',      // 数据库名称
  useConnectionPooling: true
});

var PAGE_SIZE=5;


router.get('/', function(req, res) {
    var search = req.query.search||'';
    var page = parseInt(req.query.page||1);

    //connection.connect();

    var limit = PAGE_SIZE;
    var offset = PAGE_SIZE*(page-1);

    var sqlstr = 'SELECT * FROM bim_component';
    if(search !== null || search !== undefined || search !== '')
    {
      sqlstr = sqlstr + " WHERE NAME LIKE '%"+search+"%'";
    }

    sqlstr = sqlstr + ' LIMIT '+offset+','+limit;
    var countstr = 'SELECT count(*) AS count FROM bim_component';
    if(search !== null || search !== undefined || search !== '')
    {
      countstr = countstr + " WHERE NAME LIKE '%"+search+"%'";
    }
    var total_count_all = 0;
    connection.query(countstr, function(err, rows, fields) {
      if (err) throw err;
      total_count_all = rows[0].count;
      console.log('total_count_all: ', total_count_all);
    });

    connection.query(sqlstr, function(err, rows, fields) {
      if (err) throw err;
      console.log('The solution is: ', rows[0]);
      console.log('rows.count: ', rows.length);
      var total_count = total_count_all;
        var page_count = Math.floor(total_count/PAGE_SIZE);
        if(total_count%PAGE_SIZE>0){
            page_count++;
        }
        rows = {
            total_count:total_count,
            page_count:page_count,
            next:page<page_count,
            previous:page>1,
            results:rows,
        }
      res.json(rows);
    });

    //connection.end();
});

module.exports = router;



