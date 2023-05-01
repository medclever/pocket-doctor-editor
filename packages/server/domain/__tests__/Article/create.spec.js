const { Article } = require('../../Article');

describe('Article.create()', () => {
    it('Создание', () => {
        const data = {
            id: 1,
            image_id: 1,
            position: 1,
            code: null,
            is_free: true,
        };
        const langParts = [
            {
                id: 1,
                article_id: 1,
                lang_id: 1,
                title: 'Заголовок',
                necessary: 'Необходимо',
                possible: 'Можно',
                must_not: 'Нельзя',
                important: 'Важно',
                text: 'Полезная информация',
                active: true,
            },
            {
                id: 2,
                article_id: 1,
                lang_id: 1,
                title: 'Title',
                necessary: 'Necessary',
                possible: 'Possible',
                must_not: 'Must not',
                important: 'Important',
                text: 'Text',
                active: true,
            }
        ];
        const article = Article.create({ data, langParts });
        const changes = article.getChanges();
        expect(changes.map(i => i.action)).toEqual(['create', 'create', 'create']);
        expect(changes.map(i => i.source)).toEqual(['article', 'article_lang', 'article_lang']);
        expect(changes.map(i => i.params)).toEqual([data, langParts[0], langParts[1]]);
    })
})