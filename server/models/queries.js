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

var User =  MySql.Model.extend({
    tableName: 'users',
    categories: function() {
       return this.hasMany(Category);
    }
});

module.exports = {
    createCategory: function(category){
        Category.forge({category: category}).save().then(console.log("created category "+category));
    },
    createArticle: function(articleTitle, date, description){
        Article.forge({title: artcileTitle, date: date, description: description}).save().then(console.log("created article "+articleTitle));
    },
    createSource: function(titleName, url, date){
        Source.forge({title: titleName, link:url, date: date}).save().then(console.log("created source "+ titleName));
    },
    createUser: function(loginName, email, name, password, signUpMethod, joinDate, lastLogin, numVisits){
        User.forge({userName: loginName, email: email, name: name, pHash: password, signUpMethod: signUpMethod, signUpDate: joinDate, recentLogin: lastLogin, visitCount: numVisits22}).save().then(console.log("created source "+ titleName));
    }
};
