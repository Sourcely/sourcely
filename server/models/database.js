var mysql = require('mysql');
var Bookshelf = require('bookshelf');
var SQL = Bookshelf.initialize({
  client: 'mysql',
  connection: {
    host     : '127.0.0.1',
    user     : 'root',
    password : 'Happy2me',
    database : 'scott',
    charset  : 'utf8'
  }
});

module.exports = {'SQLServer': SQL};