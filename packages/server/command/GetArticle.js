const { Command } = require("@be-true/server");

class GetArticle extends Command {
    code = 'article/GetArticle'

    async handle(params, { repoArticle }) {
        const article = await repoArticle.getById(params.id);
        return article.presentToItem(1);
    }

}

module.exports = {
    GetArticle
}