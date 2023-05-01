const { Command } = require("@be-true/server");
const { Article } = require("../domain");

class CreateArticle extends Command {
    code = 'article/CreateArticle'

    async handle(params, { repoArticle }) {
        const article = Article.create(params);
        await repoArticle.persist(article);
        return {}
    }

}

module.exports = {
    CreateArticle
}