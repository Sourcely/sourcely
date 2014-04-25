var MySql = require('../config').SQLServer;

var Category =  MySql.Model.extend({
    tableName: 'categories',/*,
//for creating foreign keys
    articles: function() {
        return this.hasMany(Article);
    },*/
    initialize: function(){}
});

var Article = MySql.Model.extend({
    tableName: 'articles'/*,
    //for creating foreign keys
    sources: function() {
       return this.hasMany(Source);
    },
    category: function(){
       return this.belongsTo(Category, 'category_id')
    }*/
});

var Source =  MySql.Model.extend({
    tableName: 'sources'/*,
//for creating foreign keys
    article: function() {
        return this.belongsTo(Article,'source_id');
    }*/
});

var querySource = function(){};

var createCategory = function(category){
    Category.forge({category: category}).save().then(console.log("created category "+category));
//        Category.forge({category: category}).save().then(console.log("created category "+category));
}
var createArticle = function(articleTitle, date, description, category){
    Article.forge({title: articleTitle, date: date, description: description, category: category}).save().then(
        new Category({'category': category})
            .fetch()
            .then(function(model) {
                if(!model){
                   createCategory(category); 
                };
            })
        );
//        Article.forge({title: artcileTitle, date: date, description: description}).save().then(console.log("created article "+articleTitle));
}
var createSource = function(source, url, date, category, title, abstract){
    Source.forge({source: source, link:url, date: date, category: category, article: title}).save().then(
        new Article({'title': title})
            .fetch()
            .then(function(model) {
                if(!model){
                   var date = new Date()
                   createArticle(title, date, abstract, category) 
                };
            })
    );
//        Source.forge({title: source, link:url, date: date, categories_id: categoryID}).save().then(console.log("created source "+ source));
}

module.exports = {createCategory: createCategory, createArticle: createArticle, createSource: createSource};