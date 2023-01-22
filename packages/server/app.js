const path = require('path');

const { Application, LoggerService, HttpService, AdapterHttpService, StaticService } = require("@be-true/server");
const { DocsService } = require("@be-true/docs");
const { GetArticleList } = require("./commands");

const app = new Application()
    .addService(LoggerService, { config: { pretty: true } })
    .addService(DocsService)
    .addService(HttpService)
    .addService(AdapterHttpService)
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