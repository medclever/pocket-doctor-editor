const { toMapGroup } = require("@be-true/utils");
const { Article } = require("../domain/Article");

class ArticleRepository {
    static service() {
        return {
            name: 'repoArticle',
            deps: ['sqlite'],
        }
    }

    #sqlite;

    constructor({ sqlite }) {
        this.#sqlite = sqlite;
    }

    async getList() {
        const data = await this.#sqlite.all('SELECT * FROM article ORDER BY position ASC');
        const langParts = await this.#sqlite.all('SELECT * FROM article_lang');
        const langPartsMap = toMapGroup(langParts, 'article_id');
        return data.map(data => new Article(data, langPartsMap[data.id]));
    }
}

module.exports = {
    ArticleRepository
}