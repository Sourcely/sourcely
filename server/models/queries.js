var MySql = require('../config').SQLServer;

var Category =  MySql.Model.extend({
    tableName: 'categories',
    articles: function() {
        return this.hasMany(Article);
    },
    initialize: function(){},
});

var Article =  MySql.Model.extend({
    tableName: 'articles',
    sources: function() {
       return this.hasMany(Source);
    }
});

var Source =  MySql.Model.extend({
    tableName: 'sources',
    article: function() {
        return this.belongsTo(Article,'source_id');
    }
});

module.exports = {
    createCategory: function(category){
        Category.forge({category: category}).save().then(console.log("created category "+category));
    },
    createArticle: function(articleTitle, date, description){
        Article.forge({title: artcileTitle, date: date, description: description}).save().then(console.log("created article "+articleTitle));
    },
    createSource: function(sourceName, url){
        Source.forge({name: sourceName, url:url}).save().then(console.log("created source "+ name));
    }
};