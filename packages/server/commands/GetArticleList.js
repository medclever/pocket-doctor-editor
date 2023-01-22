const { Command } = require("@be-true/server");

class GetArticleList extends Command {

    code = 'article/GetArticleList'

    async handle(di, params) {
        return [{ id: 1 }, { id: 2 }];
    }

}

module.exports = {
    GetArticleList
}