var MySql = require('./database').SQLServer;

var Article =  Bookshelf.Model.extend({
    tableName: 'articles',
    addresses: function() {
       return this.hasMany(Source);
    }
});

var Source =  Bookshelf.Model.extend({
    tableName: 'sources',
    country: function() {
        return this.belongsTo(Article,'source_id');
    },
});

module.exports = {
    UserTable: function(){

    }
}