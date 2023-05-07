const { Command } = require("@be-true/server");

class UpdateArticle extends Command {
    code = 'article/UpdateArticle'

    async handle(params, { repoArticle }) {
        const article = await repoArticle.getById(params.id);
        article.update(params);
        await repoArticle.persist(article);
        return {}
    }

}

module.exports = {
    UpdateArticle
}