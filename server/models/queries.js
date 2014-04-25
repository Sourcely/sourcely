var MySql = require('../config').SQLServer;

var Category =  MySql.Model.extend({
    tableName: 'categories',
    articles: function() {
        return this.hasMany(Article);
    },
    initialize: function(){},
});

var Article = MySql.Model.extend({
    tableName: 'articles',
    sources: function() {
       return this.hasMany(Source);
    },
    category: function(){
       return this.belongsTo(Category, 'category_id')
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
    createSource: function(titleName, url, date, categoryID){
        Source.forge({title: titleName, link:url, date: date, categories_id: categoryID}).save().then(console.log("created source "+ titleName));
    },
    Category: Category
};