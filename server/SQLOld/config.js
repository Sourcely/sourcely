var mysql = require('mysql');
var Bookshelf = require('bookshelf');

var connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : 'none'
});

connection.connect();

SQL.knex.schema.hasTable('categories').then(function(exists) {
  if (!exists) {
    return SQL.knex.schema.createTable('categories', function(t) {
      t.increments('category_id').primary();
      t.string('category', 100);
    });
  }
});

SQL.knex.schema.hasTable('articles').then(function(exists) {
  if (!exists) {
    return SQL.knex.schema.createTable('articles', function(t) {
      t.increments('article_id').primary();
      t.string('title', 100);
      t.string('category', 100);
      t.date('date');
      t.text('description');
/*      t.integer('categories_id').unsigned()
        .references('category_id').inTable('categories')
        .onDelete('CASCADE');
*/    });
  }
});

SQL.knex.schema.hasTable('sources').then(function(exists) {
  if (!exists) {
    return SQL.knex.schema.createTable('sources', function(t) {
      t.increments('source_id').primary();
      t.string('source', 100);
      t.string('category', 100);
      t.string('article', 100);
      t.string('link', 500);
      t.date('date');
    });
  }
});

SQL.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    return SQL.knex.schema.createTable('users', function(t) {
      t.increments('id').primary();
      t.text('userName');
      t.text('email');
      t.text('name');
      t.text('pHash');
      t.text('signUpMethod');
      t.date('signUpDate');
      t.date('recentLogin');
      t.integer('visitCount');
    });
  }
});

module.exports = {'SQLServer': SQL};
