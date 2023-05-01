const { toMapGroup } = require("@be-true/utils");
const { Article } = require("../domain");
const { BaseRepository } = require("../base");

class ArticleRepository extends BaseRepository {
    static service() {
        return {
            name: 'repoArticle',
            deps: ['sqlite'],
        }
    }

    async getList() {
        const data = await this._sqlite.all('SELECT * FROM article ORDER BY position ASC');
        const langParts = await this._sqlite.all('SELECT * FROM article_lang');
        const langPartsMap = toMapGroup(langParts, 'article_id');
        return data.map(data => new Article(data, langPartsMap[data.id]));
    }

    async getById(id) {
        const data = await this._sqlite.all(`SELECT * FROM article WHERE id = ${id}`);
        const langParts = await this._sqlite.all(`SELECT * FROM article_lang where article_id = ${id}`);
        return new Article(data[0], langParts);
    }
}

module.exports = {
    ArticleRepository
}