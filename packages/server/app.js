const path = require('path');
const { Application, LoggerService, HttpService, AdapterHttpService, StaticService } = require("@be-true/server");
const { DocsService } = require("@be-true/docs");
const { SQLiteService } = require("@be-true/sqlite");
const { AdapterWSService } = require("@be-true/ws");

const { ArticleRepository } = require('./repository');
const { CreateArticle, GetArticle, GetArticleList } = require('./command');

const app = new Application()
    .addService(LoggerService, { config: { pretty: true } })
    .addService(DocsService)
    .addService(HttpService)
    .addService(AdapterHttpService)
    .addService(AdapterWSService)
    .addService(SQLiteService, { config: { filename: __dirname + '/../../data/database.db' } })
    .addService(ArticleRepository)
    .addService(StaticService, {
        config: {
            root: path.resolve(__dirname + '/../../.static'),
            prefix: '/'
        }
    })
    .addCommand(new CreateArticle)
    .addCommand(new GetArticleList)
    .addCommand(new GetArticle)
    ;

module.exports = {
    app
};