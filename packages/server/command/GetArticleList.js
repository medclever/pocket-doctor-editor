const { Command } = require("@be-true/server");

class GetArticleList extends Command {

    code = 'article/GetArticleList'

    async handle(params, { repoArticle }) {
        const articles = await repoArticle.getList();
        return articles.map(i => i.presentToList(1));
    }

}

module.exports = {
    GetArticleList
}