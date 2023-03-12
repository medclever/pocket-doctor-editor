const path = require('path');

const { Application, LoggerService, HttpService, AdapterHttpService, StaticService } = require("@be-true/server");
const { DocsService } = require("@be-true/docs");
const { SQLiteService } = require("@be-true/sqlite");
const { GetArticleList } = require("./command");
const { ArticleRepository } = require('./repository');

const app = new Application()
    .addService(LoggerService, { config: { pretty: true } })
    .addService(DocsService)
    .addService(HttpService)
    .addService(AdapterHttpService)
    .addService(SQLiteService, { config: { filename: __dirname + '/../../data/database.db' } })
    .addService(ArticleRepository)
    .addService(StaticService, {
        config: {
            root: path.resolve(__dirname + '/../../.static'),
            prefix: '/'
        }
    })
    .addCommand(new GetArticleList)
    ;

module.exports = {
    app
};