var mysql = require('mysql')
var Bookshelf = require('bookshelf')    
var SQL = Bookshelf.initialize({
  client: 'mysql',
  connection: {
    host     : '127.0.0.1',
    user     : 'root',
    password : 'Happy2me'
/*    database : 'myapp_test',
    charset  : 'utf8'*/
  }
});

