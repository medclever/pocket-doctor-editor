const { Article } = require('../../Article');

describe('Article.update()', () => {
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
                lang_id: 2,
                title: 'Title',
                necessary: 'Necessary',
                possible: 'Possible',
                must_not: 'Must not',
                important: 'Important',
                text: 'Text',
                active: true,
            }
        ];
        const dataUpdate = { ...data, position: 2 };
        const langPartsUpdate = [
            { ...langParts[0], title: 'Заголовок new' },
            { ...langParts[1], title: 'Title new' }
        ];
        const article = new Article(data, langParts);
        article.update({ data: dataUpdate, langParts: langPartsUpdate });
        const changes = article.getChanges();
        expect(changes.map(i => i.action)).toEqual(['update', 'update', 'update']);
        expect(changes.map(i => i.source)).toEqual(['article', 'article_lang', 'article_lang']);
        expect(changes.map(i => i.params)).toEqual([dataUpdate, langPartsUpdate[0], langPartsUpdate[1]]);
    })
})